<script setup lang="ts">
import { logout } from '@/services/auth.ts'
import { LucideLogOut } from 'lucide-vue-next'
import { Button } from 'primevue'

const handleLogout = () => {
  logout()
}
</script>

<template>
  <Button @click="handleLogout" variant="text">
    <LucideLogOut />
  </Button>
</template>

<style scoped></style>
