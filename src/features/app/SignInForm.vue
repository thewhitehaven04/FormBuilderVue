<script setup lang="ts">
import { Button, Dialog, Message, IconField, InputIcon } from 'primevue'
import { RouterLink, useRouter } from 'vue-router'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import * as Auth from '@/services/auth.ts'
import FormInput from '@/components/FormInput.vue'

defineEmits(['reset'])

const { push } = useRouter()

const schema = z.object({
    email: z.string().email('Email field must not be empty'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})
const validationSchema = toTypedSchema(schema)
type TSignInSchema = z.infer<typeof schema>

const { handleSubmit } = useForm<TSignInSchema>({
    validationSchema,
})
const isErrorShown = ref(false)

const onSubmit = handleSubmit(async (data) => {
    const { error } = await Auth.signIn({
        password: data.password,
        email: data.email,
    })

    if (!error) {
        await push('/')
    } else {
        isErrorShown.value = true
    }
})
</script>

<template>
    <Dialog
        :visible="true"
        :modal="true"
        :show-header="true"
        :closable="false"
        :draggable="false"
        :maximizable="false"
    >
        <template #header>
            <div>
                <h1>Sign in</h1>
                <p>Sign in with email</p>
            </div>
        </template>
        <template #default>
            <form @submit="onSubmit">
                <IconField>
                    <InputIcon class="pi pi-envelope" />
                    <FormInput name="email" type="email" placeholder="Email" />
                </IconField>
                <IconField>
                    <InputIcon class="pi pi-key" />
                    <FormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                </IconField>
                <Button type="submit">Sign in</Button>
                <Message v-if="isErrorShown" variant="simple" severity="error" size="small"
                    >E-mail or password are incorrect. Please try again.
                </Message>
            </form>
        </template>

        <template #footer>
            <div class="footer">
                <div class="type-selector">
                    <div>Forgot password?</div>
                    <Button type="button" variant="link" @click="$emit('reset')">Reset</Button>
                </div>
                <div class="type-selector">
                    <div>No account?</div>
                    <RouterLink to="/sign-up">
                        <Button variant="link">Sign up</Button>
                    </RouterLink>
                </div>
            </div>
        </template>
    </Dialog>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    width: 100%;
}

.footer {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.content {
    width: 480px;
}

.type-selector {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}
</style>
