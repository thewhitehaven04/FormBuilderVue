<script setup lang="ts">
import { useField } from 'vee-validate'
import type { InputTextProps } from 'primevue'

const props = defineProps<InputTextProps>()

const { value, handleBlur, handleReset, handleChange } = useField<string>(() => props.name || '')
</script>

<template>
    <InputText
        v-model="value"
        @blur="handleBlur"
        @reset="handleReset"
        @change="handleChange"
    />
</template>

<style scoped></style>
