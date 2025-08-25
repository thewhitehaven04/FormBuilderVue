import { computed, inject } from 'vue'
import { createForm, deleteForm, editForm } from '@/services/forms.ts'
import { useFieldArray, useForm } from 'vee-validate'
import z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

interface IBaseQuestion {
    id?: number
    text: string
    isRequired: boolean
    isDeleted: boolean
}

export interface IOption {
    id?: number
    text: string
    isDeleted?: boolean
}

export interface IOneLineQuestion extends IBaseQuestion {
    type: 'oneLine'
    options: IOption[]
}

export interface IMultiLineQuestion extends IBaseQuestion {
    type: 'multiLine'
    options: IOption[]
}

export interface ISingleChoiceQuestion extends IBaseQuestion {
    type: 'singleChoice'
    options: IOption[]
}

export interface IMultipleChoiceQuestion extends IBaseQuestion {
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
    const { values, setFieldValue, setValues } = useForm<IForm>({
        validationSchema,
    })
    const questions = useFieldArray<IForm['questions'][number]>('questions')

    const addQuestion = (type: TQuestion['type']) => {
        questions.push({
            type,
            text: '', 
            isRequired: true,
            options: [],
            isDeleted: false
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

        _reset()
    }

    const _reset = () => {
        setValues({
            title: null,
            description: null,
            questions: [],
        })
    }

    const onFormDelete = () => {
        if (formId) {
            deleteForm([formId])
            _reset()
        }
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
                await editForm(
                    formId,
                    {
                        title: values.title || '',
                        description: values.description || '',
                        questions: values.questions,
                    },
                )
            }
            onSuccess()
        } catch {
            onError()
        }
    }

    const filteredQuestions = computed(() => questions.fields.value.filter((q) => !q.value.isDeleted))

    return {
        title: values.title,
        description: values.description,
        questions: filteredQuestions,
        addQuestion,
        updateQuestion,
        copyQuestion,
        removeQuestion,
        onFormCreate,
        onFormEdit,
        onFormDelete,
        setFieldValue,
    }
}

export const useFormBuilder = () => {
    const provided = inject<ReturnType<typeof getFormProvider>>('form-builder')

    if (!provided) {
        throw new Error('useFormBuilder must be called below a provider')
    }

    return provided
}
