<script setup lang="ts">
import TextQuestionCreator from '@/features/formBuilder/questionCreators/TextQuestionCreator.vue'
import ChoiceQuestionCreator from '@/features/formBuilder/questionCreators/ChoiceQuestionCreator.vue'
import { Card } from 'primevue'
import { useFormBuilder } from '@/features/formBuilder/useFormBuilder.ts'

const { questions, copyQuestion, updateQuestion } = useFormBuilder()
</script>

<template>
    <Card>
        <template #content>
            <ul v-if="!!questions.length">
                <li v-for="q in questions" :key="q.id">
                    <TextQuestionCreator
                        v-if="q.type === 'oneLine' || q.type === 'multiLine'"
                        :type="q.type"
                        :is-required="q.isRequired"
                        :question="q.question"
                        @text-answer-form-change="(value) => updateQuestion({ id: q.id, ...value })"
                        @copy="copyQuestion(q.id)"
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
                    />
                </li>
            </ul>
            <div v-else>
               No questions added
            </div>
        </template>
    </Card>
</template>

<style scoped>
.container {
    width: 600px;
}
</style>
