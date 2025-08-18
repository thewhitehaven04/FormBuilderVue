<script setup lang="ts">
import { logout } from '@/services/auth.ts'
import { LucideLogOut } from 'lucide-vue-next'

const handleLogout = () => {
  logout()
}
</script>

<template>
  <Button @click="handleLogout">
    <LucideLogOut />
  </Button>
</template>

<style scoped></style>
