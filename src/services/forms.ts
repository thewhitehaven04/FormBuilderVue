import type { TQuestion } from '@/features/formBuilder/useFormBuilder.ts'
import { supabase } from '@/services/supabase.ts'

export interface IFormCreateRequest {
    title: string
    description: string
    questions: TQuestion[]
}

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
        console.log('iteration')
        const { data: q } = await supabase
            .from('questions')
            .insert({
                form_id: created.id,
                is_required: question.isRequired,
                text: question.question,
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
                    text: q.question,
                    is_required: q.isRequired,
                    form_id: created.id,
                })),
        )
        .throwOnError()
}

async function fetchForms({
    skip,
    count,
    text,
    isAscending,
}: {
    skip: number
    count: number
    text?: string
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

async function deleteForm(id: number) {
    await supabase.from('forms').delete().eq('id', id).throwOnError()
}

export { createForm, fetchForms, fetchForm, deleteForm }
