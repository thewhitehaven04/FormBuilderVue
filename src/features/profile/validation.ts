import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const schema = z.object({
    id: z.string(),
    name: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string()
})

export type TUpdateUserFormDto = z.infer<typeof schema>
export const validationSchema = toTypedSchema(schema)