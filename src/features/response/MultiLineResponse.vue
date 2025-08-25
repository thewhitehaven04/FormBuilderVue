<script setup lang="ts">
import { Textarea, Panel } from 'primevue'
import { useFormContext } from 'vee-validate'

const props = defineProps<{
    idx: number
    question: string
}>()

const { defineField } = useFormContext()

const [textAnswer, textAnswerProps] = defineField(`answer[${props.idx}].text`)
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
                :name="`answer[${props.idx}].text`"
            />
        </template>
    </Panel>
</template>

<style scoped></style>
