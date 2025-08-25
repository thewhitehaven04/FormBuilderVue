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

    const { data: q } = await supabase
        .from('questions')
        .insert(
            form.questions
                .filter((q) => q.type === 'oneLine' || q.type === 'multiLine')
                .map((q) => ({
                    text: q.text,
                    is_required: q.isRequired,
                    question_type: q.type,
                    form_id: created.id,
                })),
        )
        .select('*')
        .single()
        .throwOnError()
    for (const question of form.questions) {
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
}

async function editForm(formId: number, form: TFormEditRequest) {
    await supabase
        .from('forms')
        .update({
            title: form.title,
            description: form.description,
        })
        .eq('id', formId)
        .throwOnError()

    await supabase
        .from('questions')
        .insert(
            form.questions
                .filter((q) => !q.id && !q.isDeleted)
                .map((q) => ({
                    form_id: formId,
                    is_required: q.isRequired,
                    question_type: q.type,
                    text: q.text,
                })),
        )
        .throwOnError()

    await supabase
        .from('questions')
        .upsert(
            form.questions
                .filter((q) => q.id != null && !q.isDeleted)
                .map((q) => ({
                    id: q.id,
                    form_id: formId,
                    is_required: q.isRequired,
                    question_type: q.type,
                    text: q.text,
                })),
        )
        .throwOnError()

    await deleteQuestions(
        form.questions.filter((q) => q.isDeleted && q.id !== undefined).map((q) => q.id as number),
   )

    for (const question of form.questions) {
        if (question.id) {
            await supabase.from('options').insert(
                question.options
                    .filter((opt) => !opt.id)
                    .map((opt) => ({
                        text: opt.text,
                        question_id: question.id ?? 0,
                    })),
            )
            await supabase.from('options').upsert(
                question.options
                    .filter((opt) => opt.id != null)
                    .map((opt) => ({
                        id: opt.id,
                        question_id: question.id ?? 0,
                        text: opt.text,
                    })),
                { onConflict: 'id' },
            )
            await deleteOptions(
                question.options.filter((opt) => opt.isDeleted).map((opt) => opt as number),
            )
        }
    }
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
                    ascending: false,
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
    await supabase.from('options').delete().in('id', optionId).throwOnError()
}

async function deleteQuestions(questionId: number[]) {
    await supabase.from('questions').delete().in('id', questionId).throwOnError()
}

async function getFormCount() {
    return (await supabase.from('forms').select('*', { count: 'exact' })).count
}

export {
    createForm,
    fetchForms,
    fetchForm,
    deleteForm,
    editForm,
    deleteOptions,
    deleteQuestions,
    getFormCount,
}
