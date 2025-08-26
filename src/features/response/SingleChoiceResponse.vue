<script setup lang="ts">
import { RadioButton, Panel, Fieldset } from 'primevue'
import type { IOption } from '@/features/formBuilder/useFormBuilder.ts'
import { useFormContext } from 'vee-validate'
import type { TAnswerForm } from '@/features/response/validation'
import ErrorMessage from '@/components/ErrorMessage.vue'

const props = defineProps<{
    idx: number
    question: string
    options: IOption[]
}>()

const { defineField } = useFormContext<TAnswerForm>()
const [answer, answerProps] = defineField(`questions[${props.idx}].answer.option`)

</script>

<template>
    <Panel>
        <template #header>
            {{ question }}
        </template>
        <Fieldset class="radio-group">
            <label v-for="option in options" :key="option.id">
                <RadioButton v-bind="answerProps" v-model="answer" :value="option.id" />
                {{ option.text }}
            </label>
        </Fieldset>
        <ErrorMessage :fieldName="`questions[${props.idx}].answer.options`" />
    </Panel>
</template>

<style scoped>
.panel {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
}

.radio-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>
