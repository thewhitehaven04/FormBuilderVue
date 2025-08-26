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

const { defineField, errors, submitCount } = useFormContext<TAnswerForm>()
const [answer, answerProps] = defineField(`questions[${props.idx}].answer.option`)
</script>

<template>
    <Panel>
        <template #header>
            {{ question }}
        </template>
        <Fieldset legend="Answers">
            <div class="radio-group">
                <label v-for="option in options" :key="option.id">
                    <RadioButton
                        :invalid="!!errors[`questions[${props.idx}]`] && submitCount > 0"
                        v-bind="answerProps"
                        v-model="answer"
                        :value="option.id"
                    />
                    {{ option.text }}
                </label>
            </div>
        </Fieldset>
        <ErrorMessage :fieldName="`questions[${props.idx}]`" />
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
