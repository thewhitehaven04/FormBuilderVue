<script setup lang="ts">
import { Textarea, Checkbox, RadioButton, InputText, Button } from 'primevue'
import { useFieldArray, useForm } from 'vee-validate'
import { CircleMinus } from 'lucide-vue-next'
import QuestionCreator from '@/features/formBuilder/questionCreators/QuestionCreator.vue'
import type {
    IMultipleChoiceQuestion,
    ISingleChoiceQuestion,
} from '@/features/formBuilder/useFormBuilder.ts'
import { watch } from 'vue'

const props = defineProps<{
    type: 'singleChoice' | 'multipleChoice'
    question: string
    isRequired: boolean
}>()

const emit = defineEmits<{
    (
        e: 'choice-question-form-change',
        value: Partial<ISingleChoiceQuestion | IMultipleChoiceQuestion>,
    ): void
}>()

type TOption = {
    type: (typeof props)['type']
    text: string
}

const { defineField } = useForm({
    initialValues: {
        options: [] as TOption[],
    },
})

const { push, fields, remove, update } = useFieldArray<TOption>('options')

const [options] = defineField('options')

watch(
    () => options,
    ({ value }) => {
        emit('choice-question-form-change', {
            options: value.map((option) => ({ text: option.text })),
        })
    },
)
</script>

<template>
    <QuestionCreator
        :title="
            props.type === 'singleChoice' ? 'Single choice question' : 'Multiple choice question'
        "
        :is-required="props.isRequired"
    >
        <template #content>
            <div class="content">
                <Textarea
                    name="question"
                    type="text"
                    :default-value="props.question"
                    @value-change="
                        (value) => $emit('choice-question-form-change', { question: value })
                    "
                />
                <ul>
                    <li v-for="(option, idx) in fields" class="option-row" :key="option.key">
                        <Checkbox v-if="option.value.type === 'singleChoice'" disabled />
                        <RadioButton v-else disabled />
                        <InputText type="text" @valueChange="(val) => update(idx, val)" />
                        <Button
                            type="button"
                            size="small"
                            variant="text"
                            @click="remove(option.key as number)"
                        >
                            <CircleMinus />
                        </Button>
                    </li>
                </ul>
                <Button
                    type="button"
                    variant="outlined"
                    @click="push({ type: props.type, text: '' })"
                    >Add answer option
                </Button>
            </div>
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
