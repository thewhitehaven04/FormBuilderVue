<script setup lang="ts">
import { InputText, Button, Message } from 'primevue'
import Card from 'primevue/card'
import { RouterLink } from 'vue-router'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { signIn } from '@/services/auth.ts'
import router from '@/router'
import { ref } from 'vue'
import ResetPasswordForm from '@/features/app/ResetPasswordForm.vue'

const schema = z.object({
    email: z.string().email('Email field must not be empty'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})
const validationSchema = toTypedSchema(schema)
type TSignInSchema = z.infer<typeof schema>

const { handleSubmit, defineField } = useForm<TSignInSchema>({
    validationSchema,
})

const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')

const isResetModalShown = ref(false)
const isErrorShown = ref(false)

const onSubmit = handleSubmit(async (data) => {
    const { error } = await signIn({
        password: data.password,
        email: data.email,
    })

    if (!error) {
        await router.push('/')
    } else {
        isErrorShown.value = true
    }
})

const handleReset = () => {
    isResetModalShown.value = true
}
</script>

<template>
    <div class="overlay">
        <Card class="card">
            <template #title>Sign in</template>
            <template #subtitle>Sign in with your email address.</template>
            <template #content>
                <form @submit="onSubmit">
                    <InputText
                        name="email"
                        type="email"
                        placeholder="Email"
                        v-model="email"
                        v-bind="emailProps"
                    />
                    <InputText
                        name="password"
                        type="password"
                        placeholder="Password"
                        v-model="password"
                        v-bind="passwordProps"
                    />
                    <Button type="submit">Sign in</Button>
                    <Message
                        v-if="isErrorShown"
                        variant="simple"
                        severity="error"
                        size="small"
                        >E-mail or password are incorrect. Please try again.
                    </Message>
                </form>
            </template>

            <template #footer>
                <div class="footer">
                    <div class="row">
                        <div>Forgot password?</div>
                        <Button
                            type="button"
                            variant="link"
                            @click="handleReset"
                            >Reset</Button
                        >
                    </div>
                    <div class="row">
                        <div>No account?</div>
                        <RouterLink to="/sign-up">
                            <Button variant="link">Sign up</Button>
                        </RouterLink>
                    </div>
                </div>
            </template>
        </Card>
        <ResetPasswordForm v-if="isResetModalShown" />
    </div>
</template>

<style scoped>
.footer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 16px;
}

.row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
}

form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
}

.overlay {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;
}

.message-footer {
    height: 24px;
    vertical-align: center;
}

.card {
    min-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

input {
    min-width: 300px;
}
</style>
