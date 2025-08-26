<script setup lang="ts">
import { Button, Dialog, InputText, Message, IconField, InputIcon } from 'primevue'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { signUp } from '@/services/auth.ts'
import { User, LucideMail, KeyRound } from 'lucide-vue-next'
import router from '@/router'

const schema = z.object({
    name: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email('Email field must not be empty'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm: z.string().min(8, 'Confirmation must match the password'),
})

type TFormSchema = z.infer<typeof schema>
const signUpSchema = toTypedSchema(schema)

const { defineField, errors, handleSubmit, handleReset, submitCount } = useForm<TFormSchema>({
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
        }, 3000)
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
        content-class="container"
    >
        <template #header>
            <div>
                <h1>Register</h1>
                <p>Sign up with your email address</p>
            </div>
        </template>
        <form id="form" @submit="onSubmit" @reset="handleReset()">
            <div class="input-container">
                <IconField>
                    <InputIcon>
                        <User />
                    </InputIcon>
                    <InputText
                        type="text"
                        name="name"
                        placeholder="Name"
                        v-model="name"
                        v-bind="nameProps"
                        required
                    />
                </IconField>
                <Message
                    v-if="!!errors.name && submitCount > 0"
                    severity="error"
                    variant="simple"
                    size="small"
                    >{{ errors.name }}
                </Message>
            </div>
            <div class="input-container">
                <IconField>
                    <InputIcon>
                        <User />
                    </InputIcon>
                    <InputText
                        type="text"
                        name="lastname"
                        placeholder="Last name"
                        v-model="lastName"
                        v-bind="lastNameProps"
                        required
                    />
                </IconField>
                <Message
                    v-if="!!errors.lastName && submitCount > 0"
                    severity="error"
                    variant="simple"
                    size="small"
                    >{{ errors.lastName }}
                </Message>
            </div>
            <div class="input-container">
                <IconField>
                    <InputIcon>
                        <LucideMail />
                    </InputIcon>
                    <InputText
                        type="email"
                        name="email"
                        placeholder="Email"
                        v-model="email"
                        v-bind="emailProps"
                        required
                    />
                </IconField>
                <Message
                    v-if="!!errors.email && submitCount > 0"
                    severity="error"
                    variant="simple"
                    size="small"
                    >{{ errors.email }}
                </Message>
            </div>

            <div class="input-container">
                <IconField>
                    <InputIcon>
                        <KeyRound />
                    </InputIcon>
                    <InputText
                        type="password"
                        name="password"
                        placeholder="Password"
                        v-model="password"
                        v-bind="passwordProps"
                        required
                    />
                </IconField>
                <Message
                    v-if="!!errors.password && submitCount > 0"
                    severity="error"
                    variant="simple"
                    size="small"
                    >{{ errors.password }}
                </Message>
            </div>

            <div class="input-container">
                <IconField>
                    <InputIcon>
                        <KeyRound />
                    </InputIcon>
                    <InputText
                        type="password"
                        name="confirm"
                        placeholder="Confirm Password"
                        v-model="confirmPassword"
                        v-bind="confirmPasswordProps"
                        required
                    />
                </IconField>
                <Message
                    v-if="!!errors.confirm && submitCount > 0"
                    severity="error"
                    variant="simple"
                    size="small"
                    >{{ errors.confirm }}
                </Message>
            </div>
            <Button type="submit">Sign up</Button>
            <Message
                v-if="isSuccessMessageShown && submitCount > 0"
                severity="success"
                variant="simple"
                size="small"
            >
                The sign-up is successful. Check your e-mail to confirm the registration.
                Transferring you to sign-in page...
            </Message>
        </form>
        <template #footer>
            <Button type="reset" form="form" variant="outlined" @reset="handleReset">Reset</Button>
            <div class="footer-row">
                <span>Already got an account?</span>
                <RouterLink to="/sign-in">
                    <Button variant="link"> Sign in</Button>
                </RouterLink>
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
}

input {
    width: 100%;
}

.input-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 48px;
    width: 100%;
}

.footer-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.content {
    background-color: aquamarine;
    width: 785px;
}
</style>
