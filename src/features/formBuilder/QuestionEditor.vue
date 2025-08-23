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
                <li v-for="q in questions" :key="q.id">
                    <TextQuestionCreator
                        v-if="q.type === 'oneLine' || q.type === 'multiLine'"
                        :type="q.type"
                        :is-required="q.isRequired"
                        :question="q.question"
                        @text-answer-form-change="(value) => updateQuestion({ id: q.id, ...value })"
                        @copy="copyQuestion(q.id)"
                        @remove="removeQuestion(q.id)"
                    />
                    <ChoiceQuestionCreator
                        v-else
                        :type="q.type"
                        :question="q.question"
                        :is-required="q.isRequired"
                        @choice-question-form-change="
                            (value) => updateQuestion({ id: q.id, ...value })
                        "
                        @copy="copyQuestion(q.id)"
                        @remove="removeQuestion(q.id)"
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
