<script setup lang="ts">
import { ref } from 'vue'
import ResetPasswordForm from '@/features/app/ResetPasswordForm.vue'
import SignInForm from '@/features/app/SignInForm.vue'

const isResetModalShown = ref(false)

const handleReset = () => {
    isResetModalShown.value = false
}
</script>

<template>
    <SignInForm @reset="handleReset" />
    <ResetPasswordForm :visible="isResetModalShown" />
</template>
