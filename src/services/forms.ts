import type { TQuestion } from '@/features/formBuilder/useFormBuilder.ts'
import { supabase } from '@/services/supabase.ts'

export interface IFormCreateRequest {
    title: string
    description: string
    questions: TQuestion[]
}

// refactor this later to use Postgres functions, because supabase client API has no support for transactions
async function saveForm(form: IFormCreateRequest) {
    const { data: created } = await supabase.from('forms').insert({
        title: form.title,
        description: form.description,
    }).select('*').single()

    if (created) {
        for (const question of form.questions) {
            const { data: q } = (
                await supabase.from('questions').insert({
                    form_id: created.id,
                    is_required: question.isRequired,
                    text: question.question,
                }).select('*').single()
            )


            if (q && (question.type === 'singleChoice' || question.type === 'multipleChoice')) {
                await supabase.from('options').insert(
                    question.options.map((opt) => ({
                        text: opt.text,
                        question_id: q?.id,
                    })),
                )
            }
        }
        supabase.from('questions').insert(
            form.questions
                .filter((q) => q.type === 'oneLine' || q.type === 'multiLine')
                .map((q) => ({
                    text: q.question,
                    is_required: q.isRequired,
                    form_id: created.id,
                })),
        )
    } else {
        throw new Error('Unable to create the form')
    }
}

export { saveForm }
