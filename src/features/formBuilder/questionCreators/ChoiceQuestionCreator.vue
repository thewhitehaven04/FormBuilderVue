<script setup lang="ts">
import { Textarea, Checkbox, RadioButton, InputText, Button } from 'primevue'
import { useFieldArray } from 'vee-validate'
import QuestionCreator from '@/features/formBuilder/questionCreators/QuestionCreator.vue'
import {
    type IMultipleChoiceQuestion,
    type IOption,
    type ISingleChoiceQuestion,
} from '@/features/formBuilder/useFormBuilder.ts'

const props = defineProps<{
    idx: number
    type: 'singleChoice' | 'multipleChoice'
    question: string
    isRequired: boolean
}>()

const { push, fields, update, remove } = useFieldArray<IOption>(`questions[${props.idx}].options`)

defineEmits<{
    (
        e: 'choice-question-form-change',
        value: Partial<ISingleChoiceQuestion | IMultipleChoiceQuestion>,
    ): void
}>()

</script>

<template>
    <QuestionCreator
        :title="
            props.type === 'singleChoice' ? 'Single choice question' : 'Multiple choice question'
        "
        :is-required="props.isRequired"
        @required-change="$emit('choice-question-form-change', { isRequired: $event })"
    >
        <template #content>
            <div class="content">
                <Textarea
                    name="question"
                    type="text"
                    :default-value="props.question"
                    @value-change="(value) => $emit('choice-question-form-change', { text: value })"
                />
                <ul>
                    <li
                        v-for="(option, idx) in fields"
                        class="option-row"
                        :key="option.key"
                    >
                        <Checkbox v-if="props.type === 'multipleChoice'" disabled />
                        <RadioButton v-else disabled />
                        <InputText
                            type="text"
                            :name="fields[idx].value.text"
                            :default-value="fields[idx].value.text"
                            @value-change="(value) => update(idx, { text: value ?? '' })"
                        />
                        <Button
                            type="button"
                            size="small"
                            variant="outlined"
                            @click="remove(idx)"
                            icon="pi pi-minus"
                        />
                    </li>
                </ul>
                <Button type="button" variant="outlined" @click="push({ text: '' })"
                    >Add option
                </Button>
            </div>
        </template>
    </QuestionCreator>
</template>

<style scoped>
.option-row {
    display: flex;
    flex-direction: row;
    gap: 8px;
    width: 100%;
}

textarea {
    width: 100%;
    resize: vertical;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

li {
    vertical-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
}

li > input {
    flex: 1;
}

ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>
