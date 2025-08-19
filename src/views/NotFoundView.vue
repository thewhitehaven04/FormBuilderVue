<script setup lang="ts">
import { ShieldQuestionMark } from 'lucide-vue-next'
</script>

<template>
    <div class="container">
        <ShieldQuestionMark size="48" />
        <h1>This page does not exist</h1>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
}
</style>
