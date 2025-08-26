<script setup lang="ts">
import ErrorMessage from '@/components/ErrorMessage.vue'
import { type TAnswerForm } from '@/features/response/validation'
import { Textarea, Panel } from 'primevue'
import { useFormContext } from 'vee-validate'

const props = defineProps<{
    idx: number
    question: string
}>()

const { defineField, errors, submitCount } = useFormContext<TAnswerForm>()

const [textAnswer, textAnswerProps] = defineField(`questions[${props.idx}].answer.text`)
</script>

<template>
    <Panel>
        <template #header>
            {{ question }}
        </template>
        <template #default>
            <Textarea
                v-bind="textAnswerProps"
                v-model="textAnswer"
                :name="`questions[${props.idx}].answer.text`"
                placeholder="A long, descriptive answer..."
                :invalid="!!errors[`questions[${props.idx}]`] && submitCount > 0"
            />
            <ErrorMessage :fieldName="`questions[${props.idx}].answer.text`" />
        </template>
    </Panel>
</template>

<style scoped>
textarea {
    resize: vertical;
    width: 100%;
}
</style>
