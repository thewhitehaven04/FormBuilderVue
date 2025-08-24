<script setup lang="ts">
import TextQuestionCreator from '@/features/formBuilder/questionCreators/TextQuestionCreator.vue'
import ChoiceQuestionCreator from '@/features/formBuilder/questionCreators/ChoiceQuestionCreator.vue'
import { Card } from 'primevue'
import { useFormBuilder } from '@/features/formBuilder/useFormBuilder.ts'

const { questions, copyQuestion, updateQuestion, removeQuestion } = useFormBuilder()
</script>

<template>
    <Card class="outer-border">
        <template #content>
            <ul v-if="questions.length > 0">
                <li v-for="(q, idx) in questions" :key="q.key">
                    <TextQuestionCreator
                        v-if="q.value.type === 'oneLine' || q.value.type === 'multiLine'"
                        :type="q.value.type"
                        :is-required="q.value.isRequired"
                        :question="q.value.question"
                        @text-answer-form-change="(value) => updateQuestion(idx, value)"
                        @copy="copyQuestion(idx)"
                        @remove="removeQuestion(idx)"
                    />
                    <ChoiceQuestionCreator
                        v-else
                        :type="q.value.type"
                        :question="q.value.question"
                        :is-required="q.value.isRequired"
                        @choice-question-form-change="
                            (value) => updateQuestion(idx, value)
                        "
                        @copy="copyQuestion(idx)"
                        @remove="removeQuestion(idx)"
                    />
                </li>
            </ul>
            <div v-else>No questions added</div>
        </template>
    </Card>
</template>

<style scoped>
.outer-border {
    border-width: 4px;
    border-style: dot-dash;
}

ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>
