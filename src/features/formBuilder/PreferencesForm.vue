<script setup lang="ts">
import FormInput from '@/components/FormInput.vue'
</script>

<template>
    <label>
        Timer
        <FormInput name="timer" type="number" min="0" class="timer" />
    </label>
</template>

<style scoped>
.timer {
    width: 100px;
}

label {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>
