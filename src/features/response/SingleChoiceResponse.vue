<script setup lang="ts">
import { RadioButtonGroup, RadioButton, Panel } from 'primevue'
import type { IOption } from '@/features/formBuilder/useFormBuilder.ts'
import { useFormContext } from 'vee-validate'
import type { IAnswerForm } from '@/features/response/types.ts'

const props = defineProps<{
    idx: number
    question: string
    options: IOption[]
}>()

const { defineField } = useFormContext<IAnswerForm>()
const [radio, radioProps] = defineField(`answers[${props.idx}].answer.optionId`)
</script>

<template>
    <Panel>
        <template #header>
            {{ question }}
        </template>
        <RadioButtonGroup class="option-group">
            <label v-for="option in options" :key="option.id">
                <RadioButton v-model="radio" v-bind="radioProps" :value="option.id" />
                {{ option.text }}
            </label>
        </RadioButtonGroup>
    </Panel>
</template>

<style scoped>
.panel {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
}

.option-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>
