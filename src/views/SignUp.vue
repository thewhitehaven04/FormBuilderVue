<script setup lang="ts">
import Card from 'primevue/card'
import { Button, InputText, Message } from 'primevue'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { signUp } from '@/services/auth.ts'
import router from '@/router'
import { ref } from 'vue'

const signUpSchema = z.object({
  name: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email({
    error: 'Email address is required',
  }),
  password: z.string().min(8, { error: 'Password must be at least 8 characters' }),
  confirm: z.string().min(8, { error: 'Confirmation must match the password' }),
})

type TFormSchema = z.infer<typeof signUpSchema>

const { defineField, errors, handleSubmit } = useForm<TFormSchema>({
  validationSchema: signUpSchema,
})

const [name, nameProps] = defineField('name')
const [lastName, lastNameProps] = defineField('lastName')
const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')
const [confirmPassword, confirmPasswordProps] = defineField('confirm')

const isSuccessMessageShown = ref(false)

const onSubmit = handleSubmit(async (data) => {
  const result = await signUp({
    email: data.email,
    lastName: data.lastName,
    firstName: data.name,
    password: data.password,
  })
  console.log('event handler engaged')
  if (!result.error) {
    isSuccessMessageShown.value = true
    setTimeout(() => {
      router.push('/sign-in')
    }, 5000)
  }
})
</script>

<template>
  <div class="overlay">
    <Card>
      <template #title>Register</template>
      <template #subtitle>Sign up with your email address.</template>
      <template #content>
        <form @submit="onSubmit">
          <div class="input-container">
            <InputText
              type="text"
              name="name"
              placeholder="Name"
              v-model="name"
              v-bind="nameProps"
            />
            <Message v-if="!!errors.name" severity="error" variant="simple"
              >{{ errors.name }}}
            </Message>
          </div>
          <div class="input-container">
            <InputText
              type="text"
              name="lastname"
              placeholder="Last name"
              v-model="lastName"
              v-bind="lastNameProps"
            />
            <Message v-if="!!errors.lastName" severity="error" variant="simple"
              >{{ errors.lastName }}}
            </Message>
          </div>
          <div class="input-container">
            <InputText
              type="email"
              name="email"
              placeholder="Email"
              v-model="email"
              v-bind="emailProps"
            />
            <Message v-if="!!errors.email" severity="error" variant="simple"
              >{{ errors.email }}}
            </Message>
          </div>

          <div class="input-container">
            <InputText
              type="password"
              name="password"
              placeholder="Password"
              v-model="password"
              v-bind="passwordProps"
            />
            <Message v-if="!!errors.password" severity="error" variant="simple"
              >{{ errors.password }}}
            </Message>
          </div>

          <div class="input-container">
            <InputText
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              v-model="confirmPassword"
              v-bind="confirmPasswordProps"
            />
            <Message v-if="!!errors.confirm" severity="error" variant="simple"
              >{{ errors.confirm }}}
            </Message>
          </div>
          <Button type="submit">Sign up</Button>
          <Message v-if="isSuccessMessageShown" severity="success" variant="success">
            The sign-up is successful. Transfering you to login page...
          </Message>
        </form>
      </template>
      <template #footer>
        <div class="footer">
          <Button type="reset" variant="outlined">Reset</Button>
          <div class="footer-row">
            Already got an account?
            <RouterLink to="/sign-in">Sign in</RouterLink>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;
}

.footer {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: stretch;
}

input {
  min-width: 300px;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: start;
  background-color: white;
  border-radius: 16px;
}

.footer-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
