<script setup lang="ts">
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { changePassword } from '@/services/auth.ts'
import { Message, InputText, Card, Button } from 'primevue'
import { CircleX } from 'lucide-vue-next'

const schema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters long'),
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
      <div class="title">Change password</div>
    </template>
    <template #content>
      <div class="content">
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
          <div class="controls">
            <Button type="submit">Change password</Button>
            <Button type="reset">
              <CircleX />
              Reset
            </Button>
          </div>
        </form>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.card {
  max-width: 680px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.controls {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 32px;
}

.controls button {
  width: 100%;
}

.content {
  max-width: 600px;
  width: 100%;
  min-width: 350px;
}

.title {
  height: 40px;
}

.input-row {
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

input {
  width: 100%;
}
</style>
