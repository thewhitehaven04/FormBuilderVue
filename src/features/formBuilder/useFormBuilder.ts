import { inject, ref } from 'vue'
import { nanoid } from 'nanoid'

interface IBaseEntry {
    id: string
    question: string
    isRequired: boolean
}

export interface IOneLineEntryRequest extends IBaseEntry {
    type: 'oneLine'
}

export interface IMultiLineEntryRequest extends IBaseEntry {
    type: 'multiLine'
}

export interface IOption {
    text: string
}

export interface ISingleChoiceEntryRequest extends IBaseEntry {
    type: 'singleChoice'
    options: IOption[]
}

export interface IMultipleChoiceEntryRequest extends IBaseEntry {
    type: 'multipleChoice'
    options: IOption[]
}

type TEntry =
    | IOneLineEntryRequest
    | IMultiLineEntryRequest
    | IMultipleChoiceEntryRequest
    | ISingleChoiceEntryRequest

export const getFormProvider = () => {
    const title = ref<string | null>(null)
    const subtitle = ref<string | null>(null)
    const questions = ref<TEntry[]>([])

    const addQuestion = (type: TEntry['type']) => {
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

    const updateQuestion = (updatedRecord: Partial<TEntry> & { id: string }) => {
        const i = questions.value.findIndex((entry) => entry.id === updatedRecord.id)
        questions.value[i] = { ...questions.value[i], ...updatedRecord }
    }

    const onFormSave = () => {
        questions.value = []
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
        subtitle,
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
