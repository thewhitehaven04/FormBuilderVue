import { inject, ref } from 'vue'
import { createForm, deleteForm, deleteQuestions, editForm } from '@/services/forms.ts'
import { useFieldArray, useForm } from 'vee-validate'
import z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

interface IBaseQuestion {
    id?: number
    text: string
    isRequired: boolean
}

export interface IOption {
    id?: number
    text: string
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
    timer: number | null
}

const schema = z.object({
    title: z.string().min(8),
    description: z.string().min(8),
    questions: z.array(
        z.object({
            title: z.string().min(8),
        }),
    ),
    timer: z.number().nullable()
})

const validationSchema = toTypedSchema(schema)

export const getFormProvider = (formId?: number) => {
    const { values, setFieldValue, setValues } = useForm<IForm>({
        validationSchema,
        initialValues: {
            title: null,
            description: null,
            questions: [],
            timer: null
        }
    })
    const deletedQuestionIds = ref<number[]>([])
    const questions = useFieldArray<IForm['questions'][number]>('questions')

    const addQuestion = (type: TQuestion['type']) => {
        questions.push({
            type,
            text: '',
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
                    timer: values.timer,
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
            timer: null
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
        const questionId = questions.fields.value[idx].value.id
        questions.remove(idx)
        if (questionId) {
            deletedQuestionIds.value.push(idx)
        }
    }

    const onFormEdit = async (onError: () => void, onSuccess: () => void) => {
        try {
            if (formId) {
                await editForm(formId, {
                    title: values.title || '',
                    description: values.description || '',
                    questions: values.questions,
                    timer: values.timer
                })
                await deleteQuestions(deletedQuestionIds.value)
            }
            onSuccess()
        } catch {
            onError()
        }
    }

    return {
        title: values.title,
        description: values.description,
        timer: values.timer,
        questions: questions.fields,
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
