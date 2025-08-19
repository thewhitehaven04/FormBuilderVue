<script setup lang="ts">
import { InputText } from 'primevue'
import * as Auth from '@/services/auth.ts'
import { ref } from 'vue'

const email = defineModel('email', { type: String })
const isSuccessMessageShown = ref(false)

const handleReset = () => {
    if (email.value) {
        Auth.resetPassword({ email: email.value })
    }
}

defineProps({
    visible: Boolean,
})
</script>

<template>
    <Dialog title="Reset password" :modal="false" :visible="visible">
        <InputText type="password" v-model="email" />
        <Button type="button" @click="handleReset">Reset</Button>
        <Message v-if="isSuccessMessageShown" severity="success" size="small"
            >Success! Check your E-mail
        </Message>
    </Dialog>
</template>

<style scoped>

form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
}

.footer {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.footer div {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: end;
}

</style>
