import { inject } from 'vue'
import { createForm, editForm } from '@/services/forms.ts'
import { useFieldArray, useForm } from 'vee-validate'
import z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

interface IBaseEntry {
    id?: number
    question: string
    isRequired: boolean
}

export interface IOption {
    id?: number
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

export interface IForm {
    title: string | null
    description: string | null
    questions: TQuestion[]
}

const schema = z.object({
    title: z.string().min(8),
    description: z.string().min(8),
    questions: z.array(
        z.object({
            title: z.string().min(8),
        }),
    ),
})

const validationSchema = toTypedSchema(schema)

export const getFormProvider = (formId?: number) => {
    const { values, setFieldValue } = useForm<IForm>({
        validationSchema,
    })
    const questions = useFieldArray<IForm['questions'][number]>('questions')

    const addQuestion = (type: TQuestion['type']) => {
        questions.push({
            type,
            question: '',
            isRequired: true,
            options: [],
        })
    }

    const updateQuestion = (idx: number, updatedRecord: Partial<TQuestion>) => {
        questions.update(idx, { ...questions.fields.value[idx].value, ...updatedRecord })
    }

    const onFormCreate = (onError: () => void, onSuccess: () => void) => {
        if (values.title && values.description) {
            try {
                createForm({
                    title: values.title,
                    description: values.description,
                    questions: values.questions,
                })
                onSuccess()
            } catch {
                onError()
            }
        }

        values.questions = []
        values.title = null
        values.description = null
    }

    const copyQuestion = (idx: number) => {
        questions.insert(idx, questions.fields.value[idx].value)
    }

    const removeQuestion = (idx: number) => {
        questions.remove(idx)
    }

    const onFormEdit = async (onError: () => void, onSuccess: () => void) => {
        try {
            if (formId) {
                await editForm(formId, {
                    title: values.title || '',
                    description: values.description || '',
                    questions: values.questions,
                })
            }
            onSuccess()
        } catch {
            onError()
        }
    }

    return {
        title: values.title,
        description: values.description,
        questions: questions.fields,
        addQuestion,
        updateQuestion,
        copyQuestion,
        removeQuestion,
        onFormCreate,
        onFormEdit,
        setFieldValue
    }
}

export const useFormBuilder = () => {
    const provided = inject<ReturnType<typeof getFormProvider>>('form-builder')

    if (!provided) {
        throw new Error('useFormBuilder must be called below a provider')
    }

    return provided
}
