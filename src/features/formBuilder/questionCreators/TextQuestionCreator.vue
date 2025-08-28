<script setup lang="ts">
import { Textarea } from 'primevue'
import type { IOneLineQuestion } from '@/features/formBuilder/useFormBuilder.ts'

const props = defineProps<{
    type: 'oneLine' | 'multiLine'
    isRequired: boolean
    question: string
}>()

defineEmits<{
    (e: 'text-answer-form-change', value: Partial<IOneLineQuestion>): void
}>()
</script>

<template>
    <Textarea
        name="question"
        type="text"
        :default-value="props.question"
        placeholder="Question"
        @value-change="(value) => $emit('text-answer-form-change', { text: value })"
    />
</template>

<style scoped>
textarea {
    width: 100%;
    min-width: 100px;
    resize: vertical;
}
</style>
