<script setup lang="ts">
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { changePassword } from '@/services/auth.ts'

const schema = z.object({
  password: z.string().required().min(8, 'Password must be at least 8 characters long'),
})
const passwordChangeFormSchema = toTypedSchema(schema)
export type TChangePasswordFormDto = z.infer<typeof schema>

const { defineField, submitCount, errors, handleSubmit, handleReset } =
  useForm<TChangePasswordFormDto>({
    validationSchema: passwordChangeFormSchema,
  })

const [password, passwordProps] = defineField('password')

const onSubmit = handleSubmit((data) => {
  changePassword(data)
})
</script>

<template>
  <Card class="card">
    <template #title>
      <h1>Change password</h1>
    </template>
    <template #content>
      <form @submit="onSubmit" @reset="handleReset()">
        <div class="input-row">
          <InputText
            placeholder="New password"
            name="new"
            type="password"
            v-model="password"
            v-bind="passwordProps"
          />
          <Message
            v-if="submitCount > 0 && !!errors.password"
            variant="simple"
            size="small"
            severity="error"
          >
            {{ errors.password }}
          </Message>
        </div>
        <Button type="submit">Change password</Button>
        <Button type="reset">Reset</Button>
      </form>
    </template>
  </Card>
</template>

<style scoped>
.card {
  max-width: 720px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

form {
  display: contents;
}

.input-row {
  width: 56px;
}

input,
button {
  width: 100%;
}
</style>
