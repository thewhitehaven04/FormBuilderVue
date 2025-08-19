<script setup lang="ts">
import { InputText } from 'primevue'
import { resetPassword } from '@/services/auth.ts'

const email = defineModel('email', { type: String })
const isSuccessMessageShown = ref(false)

const handleReset = () => {
    resetPassword({ email })
}
</script>

<template>
    <Dialog title="Reset password">
        <InputText type="password" v-model="email" />
        <Button type="button" @click="handleReset">Reset</Button>
        <Message v-if="isSuccessMessageShown" severity="success" size="small"
            >Success! Check your E-mail</Message
        >
    </Dialog>
</template>

<style scoped></style>
