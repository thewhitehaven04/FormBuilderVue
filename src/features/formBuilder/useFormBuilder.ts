import { inject, ref } from 'vue'
import { nanoid } from 'nanoid'
import { createForm } from '@/services/forms.ts'

interface IBaseEntry {
    id: number
    question: string
    isRequired: boolean
}

export interface IOption {
    id: number
    text: string
}

export interface IOneLineQuestion extends IBaseEntry {
    type: 'oneLine'
    options: IOption[]
}

export interface IMultiLineQuestion extends IBaseEntry {
    type: 'multiLine'
    options: IOption[]
}

export interface ISingleChoiceQuestion extends IBaseEntry {
    type: 'singleChoice'
    options: IOption[]
}

export interface IMultipleChoiceQuestion extends IBaseEntry {
    type: 'multipleChoice'
    options: IOption[]
}

export type TQuestion =
    | IOneLineQuestion
    | IMultiLineQuestion
    | IMultipleChoiceQuestion
    | ISingleChoiceQuestion

export const getFormProvider = () => {
    const title = ref<string | null>(null)
    const description = ref<string | null>(null)
    const questions = ref<TQuestion[]>([])

    const addQuestion = (type: TQuestion['type']) => {
        questions.value.push({
            id: nanoid(),
            type,
            question: '',
            isRequired: true,
            options: [],
        })
    }

    const updateQuestion = (updatedRecord: Partial<TQuestion> & { id: string }) => {
        const i = questions.value.findIndex((entry) => entry.id === updatedRecord.id)
        questions.value[i] = { ...questions.value[i], ...updatedRecord }
    }

    const onFormCreate = (onError: () => void, onSuccess: () => void) => {
        if (title.value && description.value) {
            try {
                createForm({
                    title: title.value,
                    description: description.value,
                    questions: questions.value,
                })
                onSuccess()
            } catch {
                onError()
            }
        }

        questions.value = []
        title.value = ''
        description.value = ''
    }

    const copyQuestion = (entryId: string) => {
        const i = questions.value.findIndex((entry) => entry.id === entryId)
        questions.value = [
            ...questions.value.slice(0, i),
            { ...questions.value[i], id: nanoid() },
            ...questions.value.slice(i),
        ]
    }

    const removeQuestion = (entryId: string) => {
        questions.value = questions.value.filter((entry) => entry.id !== entryId)
    }

    const onFormEdit = () => {
        // placeholder
    }

    return {
        title,
        description,
        questions,
        addQuestion,
        updateQuestion,
        copyQuestion,
        removeQuestion,
        onFormCreate,
        onFormEdit,
    }
}

export const useFormBuilder = () => {
    const provided = inject<ReturnType<typeof getFormProvider>>('form-builder')

    if (!provided) {
        throw new Error('useFormBuilder must be called below a provider')
    }

    return provided
}
