interface ITextAnswer {
    questionId: number
    answer: {
        text: string | null
    }
}

interface IChoiceAnswer {
    questionId: number
    answer: {
        optionId: number | null
    }
}

export interface IAnswerForm {
    answers: (IChoiceAnswer | ITextAnswer)[]
}
