<script setup lang="ts">
import { logout } from '@/services/auth.ts'
import { LucideLogOut } from 'lucide-vue-next'
import { Button } from 'primevue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
    logout()
    router.push('/sign-in')
}
</script>

<template>
    <Button @click="handleLogout" variant="text">
        <LucideLogOut />
    </Button>
</template>

<style scoped></style>
