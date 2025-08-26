import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const oneLineType = z.object({
    type: z.literal('oneLine'),
    isRequired: z.boolean(),
    questionId: z.number(),
    answer: z.object({
        text: z.string().min(1, 'Answer field must not be empty').or(z.null()),
    }),
})

const multiLineType = z.object({
    type: z.literal('multiLine'),
    isRequired: z.boolean(),
    questionId: z.number(),
    answer: z.object({
        text: z.string().min(60, 'Give a detailed answer (at least 60 characters)').or(z.null()),
    }),
})
const singleChoice = z.object({
    type: z.literal('singleChoice'),
    isRequired: z.boolean(),
    questionId: z.number(),
    answer: z.object({
        option: z.number().nullable(),
    }),
})
const multipleChoice = z.object({
    type: z.literal('multipleChoice'),
    isRequired: z.boolean(),
    questionId: z.number(),
    answer: z.object({
        options: z.array(z.number()),
    }),
})

const schema = z.object({
    questions: z.array(
        z
            .discriminatedUnion('type', [oneLineType, multiLineType, singleChoice, multipleChoice])
            .refine(({ type, answer, isRequired }) => {
                if (isRequired) {
                    if (type === 'singleChoice') {
                        return answer.option != undefined
                    } else if (type === 'multipleChoice') {
                        return answer.options.length > 0
                    } else {
                        return !!answer.text && answer.text.length > 0
                    }
                } else {
                    return true
                }
            }, 'This question is required'),
    ),
})

type TAnswerForm = z.infer<typeof schema>
const typedSchema = toTypedSchema(schema)

export { typedSchema, type TAnswerForm }
