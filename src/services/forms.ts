import type { TQuestion } from '@/features/formBuilder/useFormBuilder.ts'
import { supabase } from '@/services/supabase.ts'

export interface IFormCreateRequest {
    title: string
    description: string
    questions: TQuestion[]
}

type TFormEditRequest = IFormCreateRequest

// refactor this later to use Postgres functions, because supabase client API has no support for transactions
async function createForm(form: IFormCreateRequest) {
    const { data: created } = await supabase
        .from('forms')
        .insert({
            title: form.title,
            description: form.description,
        })
        .select('*')
        .single()
        .throwOnError()

    for (const question of form.questions) {
        const { data: q } = await supabase
            .from('questions')
            .insert({
                form_id: created.id,
                is_required: question.isRequired,
                question_type: question.type,
                text: question.text,
            })
            .select('*')
            .single()
            .throwOnError()

        if (question.type === 'singleChoice' || question.type === 'multipleChoice') {
            await supabase
                .from('options')
                .insert(
                    question.options.map((opt) => ({
                        text: opt.text,
                        question_id: q.id,
                    })),
                )
                .throwOnError()
        }
    }
    supabase
        .from('questions')
        .insert(
            form.questions
                .filter((q) => q.type === 'oneLine' || q.type === 'multiLine')
                .map((q) => ({
                    text: q.text,
                    is_required: q.isRequired,
                    form_id: created.id,
                })),
        )
        .throwOnError()
}

async function editForm(formId: number, form: TFormEditRequest, optionsToDelete: number[], questionsToDelete: number[]) {
    supabase
        .from('forms')
        .update({
            title: form.description,
            description: form.description,
        })
        .eq('id', formId)
        .throwOnError()

    supabase
        .from('questions')
        .upsert(
            form.questions.map((q) => ({
                id: q.id,
                form_id: formId,
                is_required: q.isRequired,
                question_type: q.type,
                text: q.text,
            })),
        )
        .throwOnError()

    for (const question of form.questions) {
        if (question.id) {
            await supabase
                .from('options')
                .upsert(
                    question.options.map((opt) => ({
                        ...opt,
                        question_id: question.id ?? 0
                    })),
                )
                .throwOnError()
        }
    }

    deleteOptions(optionsToDelete)
    deleteQuestions(questionsToDelete)
}

async function fetchForms({
    skip,
    count,
    text,
    isAscending,
}: {
    skip: number
    count: number
    text: string | null
    isAscending: boolean
}) {
    if (!text) {
        return (
            await supabase
                .from('forms')
                .select('*, questions(*)')
                .order('created_at', {
                    ascending: isAscending,
                })
                .range(skip, skip + count)
                .throwOnError()
        ).data
    }
    return (
        await supabase
            .from('forms')
            .select('*, questions(*)')
            .order('created_at', {
                ascending: isAscending,
            })
            .like('title', `*${text}*`)
            .range(skip, skip + count)
            .throwOnError()
    ).data
}

async function fetchForm(id: number) {
    return (
        await supabase
            .from('forms')
            .select('*, questions(*, options(*))')
            .eq('id', id)
            .single()
            .throwOnError()
    ).data
}

async function deleteForm(id: number[]) {
    await supabase.from('forms').delete().in('id', id).throwOnError()
}

async function deleteOptions(optionId: number[]) {
    supabase.from('options').delete().in('id', optionId).throwOnError()
}

async function deleteQuestions(questionId: number[]) {
    supabase.from('questions').delete().in('id', questionId).throwOnError()
}

export { createForm, fetchForms, fetchForm, deleteForm, editForm, deleteOptions, deleteQuestions }
