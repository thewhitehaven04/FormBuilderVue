<script setup lang="ts">
import { Card, Textarea, Checkbox, Divider, RadioButton, InputText } from 'primevue'
import type { IOneLineEntryRequest } from '@/stores/formBuilder.ts'
import { useFieldArray } from 'vee-validate'
import { CircleMinus, Copy } from 'lucide-vue-next'

const initialValues = defineProps<{
    type: 'singleChoice' | 'multipleChoice'
    question: string
    isRequired: boolean
}>()

defineEmits<{
    (e: 'choice-question-form-change', value: Partial<IOneLineEntryRequest>): void
    (e: 'copy'): void
}>()

const options = useFieldArray<{ type: typeof initialValues.type; text: string }>('options')
</script>

<template>
    <Card>
        <template #header>
            <div class="title-row">
                <span>{{
                    initialValues.type === 'singleChoice'
                        ? 'Single choice question'
                        : 'Multiple choice question'
                }}</span>
                <div class="actions">
                    <Checkbox
                        name="isRequired"
                        defaultvalue="{{initialValues.isRequired}}"
                        @value-change="
                            (value) => $emit('choice-question-form-change', { isRequired: value })
                        "
                    />
                    <Button type="button" variant="text">
                        <Copy />
                    </Button>
                </div>
            </div>
        </template>
        <Divider layout="horizontal" />

        <template #content>
            <Textarea
                name="question"
                type="text"
                default-value="{{initialValues.question}}"
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
                @click="options.push({ type: initialValues.type, text: '' })"
                >Add answer option
            </Button>
        </template>
    </Card>
</template>

<style scoped>
.option-row {
    display: flex;
    flex-direction: row;
    gap: 4px;
    width: 100%;
}
</style>
