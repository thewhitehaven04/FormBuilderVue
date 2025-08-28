<script setup lang="ts">
import './globals.css'
import 'primeicons/primeicons.css'
import { Toast } from 'primevue'
</script>

<template>
    <router-view />
    <Toast />
</template>

<style scoped>
.overlay {
    backdrop-filter: brightness(1.3) saturate(0.5);
}
</style>
