import type { TAnswerForm } from '@/features/response/validation'
import { supabase } from '@/services/supabase'

async function submitResponse({ formId, questions }: TAnswerForm & { formId: number }) {
    const submission = (
        await supabase
            .from('submissions')
            .insert({
                form_id: formId,
            })
            .select('*')
            .single()
            .throwOnError()
    ).data

    await Promise.all([
        supabase.from('text_answers').insert(
            questions
                .filter((q) => q.type === 'multiLine' || q.type === 'oneLine')
                .map((q) => ({
                    question_id: q.questionId,
                    submission_id: submission.id,
                    text: q.answer.text,
                })),
        ),
        supabase.from('option_answers').insert(
            questions
                .filter((q) => q.type === 'singleChoice')
                .map((q) => ({
                    question_id: q.questionId,
                    submission_id: submission.id,
                    option_id: q.answer.option,
                })),
        ),
        supabase
            .from('option_answers')
            .insert(
                questions
                    .filter((q) => q.type === 'multipleChoice')
                    .flatMap((q) =>
                        q.answer.options.map((optionId) => ({
                            question_id: q.questionId,
                            submission_id: submission.id,
                            option_id: optionId,
                        })),
                    ),
            )
            .throwOnError(),
    ])
}

export { submitResponse }
