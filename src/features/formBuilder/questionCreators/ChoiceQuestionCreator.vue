<script setup lang="ts">
import { Textarea, Checkbox, RadioButton, InputText, Button } from 'primevue'
import { useFieldArray } from 'vee-validate'
import { CircleMinus } from 'lucide-vue-next'
import QuestionCreator from '@/features/formBuilder/questionCreators/QuestionCreator.vue'
import type { IOneLineEntryRequest } from '@/features/formBuilder/useFormBuilder.ts'

const props = defineProps<{
    type: 'singleChoice' | 'multipleChoice'
    question: string
    isRequired: boolean
}>()

defineEmits<{
    (e: 'choice-question-form-change', value: Partial<IOneLineEntryRequest>): void
}>()

const options = useFieldArray<{ type: typeof props.type; text: string }>('options')
</script>

<template>
    <QuestionCreator
        :title="
            props.type === 'singleChoice' ? 'Single choice question' : 'Multiple choice question'
        "
        :is-required="props.isRequired"
    >
        <template #content>
            <Textarea
                name="question"
                type="text"
                :default-value="props.question"
                @value-change="(value) => $emit('choice-question-form-change', { question: value })"
            />
            <ul>
                <li v-for="option in options.fields.value" class="option-row" :key="option.key">
                    <Checkbox v-if="option.value.type === 'singleChoice'" disabled />
                    <RadioButton v-else disabled />
                    <InputText type="text" :value="option.value.text" />
                    <Button
                        type="button"
                        variant="text"
                        @click="options.remove(option.key as number)"
                    >
                        <CircleMinus />
                    </Button>
                </li>
            </ul>
            <Button
                type="button"
                variant="outlined"
                @click="options.push({ type: props.type, text: '' })"
                >Add answer option
            </Button>
        </template>
    </QuestionCreator>
</template>

<style scoped>
.option-row {
    display: flex;
    flex-direction: row;
    gap: 4px;
    width: 100%;
}
</style>
