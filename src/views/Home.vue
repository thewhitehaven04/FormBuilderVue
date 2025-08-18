<script setup lang="ts">


import { useUserStore } from '@/stores/user.ts'
import AppHeader from '@/components/AppHeader.vue'

const userStore = useUserStore()

</script>

<template>
  <AppHeader/>
</template>

<style scoped>

</style>
