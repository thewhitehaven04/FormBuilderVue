import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const oneLineType = z.object({
    type: z.literal('oneLine'),
    isRequired: z.boolean(),
    questionId: z.number(),
    answer: z.object({
        text: z.string().nullable(),
    }),
})

const multiLineType = z.object({
    type: z.literal('multiLine'),
    isRequired: z.boolean(),
    questionId: z.number(),
    answer: z.object({
        text: z.string().nullable(),
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
            .refine(({ type, answer }) => {
                if (type === 'singleChoice') {
                    return answer.option != undefined
                } else if (type === 'multipleChoice') {
                    return answer.options.length > 0
                } else {
                    return answer.text.length > 0
                }
            }, 'Answer all required questions'),
    ),
})

type TAnswerForm = z.infer<typeof schema>
const typedSchema = toTypedSchema(schema)

export { typedSchema, type TAnswerForm }
