import type { TQuestion } from '@/features/formBuilder/useFormBuilder.ts'
import { fetchUserData } from '@/services/auth'
import { supabase } from '@/services/supabase.ts'

export interface IFormCreateRequest {
    title: string
    description: string
    questions: TQuestion[]
    timer: number | null
}

type TFormEditRequest = IFormCreateRequest

// refactor this later to use Postgres functions, because supabase client API has no support for transactions
async function createForm(form: IFormCreateRequest) {
    const { data: created } = await supabase
        .from('forms')
        .insert({
            title: form.title,
            description: form.description,
            timer: form.timer
        })
        .select('*')
        .single()
        .throwOnError()

    const { data: q } = await supabase
        .from('questions')
        .insert(
            form.questions
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
    await Promise.all([
        await supabase
            .from('forms')
            .update({
                title: form.title,
                description: form.description,
                timer: form.timer,
            })
            .eq('id', formId)
            .throwOnError(),
        await supabase
            .from('questions')
            .insert(
                form.questions
                    .filter((q) => !q.id)
                    .map((q) => ({
                        form_id: formId,
                        is_required: q.isRequired,
                        question_type: q.type,
                        text: q.text,
                    })),
            )
            .throwOnError(),
        await supabase
            .from('questions')
            .upsert(
                form.questions
                    .filter((q) => q.id != null)
                    .map((q) => ({
                        id: q.id,
                        form_id: formId,
                        is_required: q.isRequired,
                        question_type: q.type,
                        text: q.text,
                    })),
            )
            .throwOnError(),
    ])

    for (const question of form.questions) {
        if (question.id) {
            const existingOptions = (
                await supabase
                    .from('options')
                    .select('*')
                    .eq('question_id', question.id)
                    .throwOnError()
            ).data
            const currentOptions = question.options.map((opt) => opt.id)
            const optionsToDelete = existingOptions
                .filter((opt) => !currentOptions.includes(opt.id))
                .map((opt) => opt.id)
            await Promise.all([
                await supabase.from('options').delete().in('id', optionsToDelete).throwOnError(),
                await supabase.from('options').insert(
                    question.options
                        .filter((opt) => !opt.id)
                        .map((opt) => ({
                            text: opt.text,
                            question_id: question.id ?? 0,
                        })),
                ),
                await supabase.from('options').upsert(
                    question.options
                        .filter((opt) => opt.id != null)
                        .map((opt) => ({
                            id: opt.id,
                            question_id: question.id ?? 0,
                            text: opt.text,
                        })),
                    { onConflict: 'id' },
                ),
            ])
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
                .select('*, questions(*), submissions(count)')
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
            .select('*, questions(*), submissions(count)')
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
            .select('*, questions(*, options!options_question_id_fkey(*))')
            .eq('id', id)
            .single()
            .throwOnError()
    ).data
}

async function getFormSubmissions(formId: number) {
    const { data } = await fetchUserData()
    return await supabase
        .from('submissions')
        .select('*')
        .eq('form_id', formId)
        .eq('submitted_by', data.user?.id || '')
        .select('*')
        .throwOnError()
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
    getFormSubmissions
}
