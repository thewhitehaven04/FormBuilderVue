<script setup lang="ts">
import ErrorMessage from '@/components/ErrorMessage.vue'
import { type TAnswerForm } from '@/features/response/validation'
import { Panel, InputText } from 'primevue'
import { useFormContext } from 'vee-validate'

const props = defineProps<{
    idx: number
    question: string
}>()

const { defineField } = useFormContext<TAnswerForm>()
const [textAnswer, textAnswerProps] = defineField(`questions[${props.idx}].answer.text`)
</script>

<template>
    <Panel>
        <template #header>
            {{ question }}
        </template>
        <template #default>
            <InputText
                v-bind="textAnswerProps"
                v-model="textAnswer"
                placeholder="Answer"
                :name="`questions[${props.idx}].answer.text`"
            />
            <ErrorMessage :fieldName="`questions[${props.idx}].answer.text`" />
        </template>
    </Panel>
</template>

<style scoped>
input {
    width: 100%;
}
</style>
