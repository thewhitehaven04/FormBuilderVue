<script setup lang="ts">
import { Checkbox, Panel, Fieldset } from 'primevue'
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
const [check, checkProps] = defineField(`questions[${props.idx}].answer.options`)
</script>

<template>
    <Panel>
        <template #header>
            {{ question }}
        </template>
        <Fieldset>
            <label v-for="option in options" :key="option.id">
                <Checkbox v-bind="checkProps" :value="option.id" v-model="check" />
                {{ option.text }}
            </label>
        </Fieldset>
        <ErrorMessage :fieldName="`questions[${props.idx}].answer.options`" />
    </Panel>
</template>

<style module>
.option-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>
