<script setup lang="ts">
import { InputText } from 'primevue'
import { useField } from 'vee-validate'

const props = defineProps<{ name: string }>()

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