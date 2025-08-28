<script setup lang="ts">
import './globals.css'
import 'primeicons/primeicons.css'
import { Toast } from 'primevue'
</script>

<template>
    <div class="overlay">
        <router-view />
        <Toast />
    </div>
div</template>

<style scoped>
.overlay {
    backdrop-filter: brightness(1.3) saturate(0.5);
}
</style>
