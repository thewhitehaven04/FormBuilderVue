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

const { defineField, errors, submitCount } = useFormContext<TAnswerForm>()
const [check, checkProps] = defineField(`questions[${props.idx}].answer.options`)
</script>

<template>
    <Panel>
        <template #header>
            {{ question }}
        </template>
        <Fieldset legend="Answers">
            <div class="option-group">
                <label v-for="option in options" :key="option.id">
                    <Checkbox
                        v-bind="checkProps"
                        :value="option.id"
                        v-model="check"
                        :invalid="!!errors[`questions[${props.idx}]`] && submitCount > 0"
                    />
                    {{ option.text }}
                </label>
            </div>
        </Fieldset>
        <ErrorMessage :fieldName="`questions[${props.idx}]`" />
    </Panel>
</template>

<style scoped>
.option-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>
