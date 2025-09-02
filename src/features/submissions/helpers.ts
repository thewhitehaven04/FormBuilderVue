import type { fetchFormSubmissions } from '@/services/submissions'

type TFormSubmissions = Awaited<ReturnType<typeof fetchFormSubmissions>>

function getColumns(submissions: TFormSubmissions) {
    const questions: {
        text: string
        id: number
        type: 'oneLine' | 'multiLine' | 'singleChoice' | 'multipleChoice'
    }[] = []
    submissions.forEach((sub) => {
        sub.text_answers.forEach((ta) => {
            if (!questions.find((q) => q.id === ta.question_id)) {
                questions.push({
                    text: ta.questions.text,
                    id: ta.question_id,
                    type: ta.questions.question_type,
                })
            }
        })
        sub.option_answers.forEach((oa) => {
            if (!questions.find((q) => q.id === oa.question_id)) {
                questions.push({
                    text: oa.questions.text,
                    id: oa.question_id,
                    type: oa.questions.question_type,
                })
            }
        })
    })
    return questions
}

function getData(columnIds: number[], submissions: TFormSubmissions) {
    const data: Array<Record<string, unknown>> = []
    for (const submission of submissions) {
        const obj: Record<string, unknown> = {}
        obj['Submitted by'] = `${submission.users.first_name} ${submission.users.last_name}`
        for (const id of columnIds) {
            const textAnswer = submission.text_answers.find((ta) => ta.questions.id === id)
            const optionAnswers = submission.option_answers.filter(
                (ta) => ta.questions.id === id,
            )
            obj[id] = textAnswer
                ? textAnswer.text
                : !!optionAnswers.length
                  ? optionAnswers.map((ta) => ta.options.text).join(', ')
                  : 'N/A'
        }
        data.push(obj)
    }

    return data
}

export { getColumns, getData }
