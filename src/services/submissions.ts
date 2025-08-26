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
        await supabase
            .from('text_answers')
            .insert(
                questions
                    .filter((q) => q.type === 'multiLine' || q.type === 'oneLine')
                    .map((q) => ({
                        question_id: q.questionId,
                        submission_id: submission.id,
                        text: q.answer.text as string,
                    })),
            )
            .throwOnError(),
        await supabase
            .from('option_answers')
            .insert(
                questions
                    .filter((q) => q.type === 'singleChoice')
                    .map((q) => ({
                        question_id: q.questionId,
                        submission_id: submission.id,
                        option_id: q.answer.option as number,
                    })),
            )
            .throwOnError(),
        await supabase
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
