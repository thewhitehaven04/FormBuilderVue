import { inject, ref } from 'vue'
import { nanoid } from 'nanoid'
import { saveForm } from '@/services/forms.ts'

interface IBaseEntry {
    id: string
    question: string
    isRequired: boolean
}

export interface IOneLineQuestion extends IBaseEntry {
    type: 'oneLine'
}

export interface IMultiLineQuestion extends IBaseEntry {
    type: 'multiLine'
}

export interface IOption {
    text: string
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

type TFormProviderDefaultValues = {
    title: string | null
    description: string | null
    question: TQuestion[]
}

export const getFormProvider = (
    defaults: TFormProviderDefaultValues = {
        title: null,
        description: null,
        question: [],
    },
) => {
    const title = ref<string | null>(defaults.title)
    const description = ref<string | null>(defaults.description)
    const questions = ref<TQuestion[]>(defaults.question)

    const addQuestion = (type: TQuestion['type']) => {
        if (type === 'oneLine' || type === 'multiLine') {
            questions.value.push({ id: nanoid(), type, question: '', isRequired: true })
        } else if (type === 'singleChoice' || type === 'multipleChoice') {
            questions.value.push({
                id: nanoid(),
                type,
                question: '',
                isRequired: true,
                options: [],
            })
        }
    }

    const updateQuestion = (updatedRecord: Partial<TQuestion> & { id: string }) => {
        const i = questions.value.findIndex((entry) => entry.id === updatedRecord.id)
        questions.value[i] = { ...questions.value[i], ...updatedRecord }
    }

    const onFormSave = (onError: () => void, onSuccess: () => void) => {
        questions.value = []
        title.value = ''
        description.value = ''

        if (title.value && description.value) {
            try {
                saveForm({
                    title: title.value,
                    description: description.value,
                    questions: questions.value,
                })
                onSuccess()
            } catch {
                onError()
            }
        }
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

    return {
        title,
        subtitle: description,
        questions,
        addQuestion,
        updateQuestion,
        copyQuestion,
        removeQuestion,
        onFormSave,
    }
}

export const useFormBuilder = () => {
    const provided = inject<ReturnType<typeof getFormProvider>>('form-builder')

    if (!provided) {
        throw new Error('useFormBuilder must be called below a provider')
    }

    return provided
}
