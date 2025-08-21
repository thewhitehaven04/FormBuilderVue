<script setup lang="ts">
import { Textarea } from 'primevue'
import type { IOneLineQuestion } from '@/features/formBuilder/useFormBuilder.ts'
import QuestionCreator from '@/features/formBuilder/questionCreators/QuestionCreator.vue'

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
    <QuestionCreator
        :title="props.type === 'oneLine' ? 'One-line question' : 'Multiline question'"
        :is-required="props.isRequired"
    >
        <template #content>
            <Textarea
                name="question"
                type="text"
                :default-value="props.question"
                placeholder="Question"
                @value-change="(value) => $emit('text-answer-form-change', { question: value })"
            />
        </template>
    </QuestionCreator>
</template>

<style scoped>

textarea {
    width: 100%;
    resize: vertical;
}
</style>
