<script setup lang="ts">
import Card from 'primevue/card'
import { Button, InputText, Message } from 'primevue'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { signUp } from '@/services/auth.ts'
import router from '@/router'
import { ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'

const schema = z.object({
    name: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email('Email field must not be empty'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm: z.string().min(8, 'Confirmation must match the password'),
})

type TFormSchema = z.infer<typeof schema>
const signUpSchema = toTypedSchema(schema)

const { defineField, errors, handleSubmit, handleReset, submitCount } =
    useForm<TFormSchema>({
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
        <Card class="card">
            <template #title>Register</template>
            <template #subtitle>Sign up with your email address.</template>
            <template #content>
                <form id="form" @submit="onSubmit" @reset="handleReset()">
                    <div class="input-container">
                        <InputText
                            type="text"
                            name="name"
                            placeholder="Name"
                            v-model="name"
                            v-bind="nameProps"
                            required
                        />
                        <Message
                            v-if="!!errors.name && submitCount > 0"
                            severity="error"
                            variant="simple"
                            size="small"
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
                            required
                        />
                        <Message
                            v-if="!!errors.lastName && submitCount > 0"
                            severity="error"
                            variant="simple"
                            size="small"
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
                            required
                        />
                        <Message
                            v-if="!!errors.email && submitCount > 0"
                            severity="error"
                            variant="simple"
                            size="small"
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
                            required
                        />
                        <Message
                            v-if="!!errors.password && submitCount > 0"
                            severity="error"
                            variant="simple"
                            size="small"
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
                            required
                        />
                        <Message
                            v-if="!!errors.confirm && submitCount > 0"
                            severity="error"
                            variant="simple"
                            size="small"
                            >{{ errors.confirm }}}
                        </Message>
                    </div>
                    <Button type="submit">Sign up</Button>
                    <Message
                        v-if="isSuccessMessageShown && submitCount > 0"
                        severity="success"
                        variant="simple"
                        size="small"
                    >
                        The sign-up is successful. Check your e-mail to confirm
                        the registration. Transferring you to sign-in page...
                    </Message>
                </form>
            </template>
            <template #footer>
                <div class="footer">
                    <Button
                        type="reset"
                        form="form"
                        variant="outlined"
                        @reset="handleReset"
                        >Reset</Button
                    >
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
    width: 100%;
}

.card {
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: var(--p-xl);
}

.input-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 48px;
    width: 100%;
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
