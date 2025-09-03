<script setup lang="ts">
import { logout } from '@/services/auth.ts'
import { Button } from 'primevue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = async () => {
    await logout()
    router.push('/sign-in')
}
</script>

<template>
    <Button @click="handleLogout" variant="text" icon="pi pi-sign-out" />
</template>

<style scoped></style>
