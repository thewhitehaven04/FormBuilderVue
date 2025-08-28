import type { fetchFormSubmissions } from '@/services/submissions'

type TFormSubmissions = Awaited<ReturnType<typeof fetchFormSubmissions>>

function getColumns(submissions: TFormSubmissions) {
    const questions = new Set<string>()
    submissions.forEach((sub) => {
        sub.text_answers.forEach((ta) => {
            questions.add(ta.questions.text)
        })
        sub.option_answers.forEach((ta) => {
            questions.add(ta.questions.text)
        })
    })
    return [...questions]
}

function getData(columns: string[], submissions: TFormSubmissions) {
    const data: Array<Record<string, unknown>> = []
    for (const submission of submissions) {
        const obj: Record<string, unknown> = {}
        obj['Submitted by'] = `${submission.users.first_name} ${submission.users.last_name}`
        for (const column of columns) {
            const textAnswer = submission.text_answers.find((ta) => ta.questions.text === column)
            const optionAnswers = submission.option_answers.filter(
                (ta) => ta.questions.text === column,
            )
            obj[column] = textAnswer
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
