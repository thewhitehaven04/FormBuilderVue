<script setup lang="ts">
import TextQuestionCreator from '@/features/formBuilder/questionCreators/TextQuestionCreator.vue'
import ChoiceQuestionCreator from '@/features/formBuilder/questionCreators/ChoiceQuestionCreator.vue'
import { Card } from 'primevue'
import { useFormBuilder, type TQuestion } from '@/features/formBuilder/useFormBuilder.ts'
import QuestionCreatorWrapper from '@/features/formBuilder/questionCreators/QuestionCreatorWrapper.vue'
import FadeInTransition from '@/components/FadeInTransition.vue'

const { questions, copyQuestion, updateQuestion, removeQuestion } = useFormBuilder()

const handleGoUp = (idx: number) => {
    questions.swap(idx, idx - 1)
}

const handleGoDown = (idx: number) => {
    questions.swap(idx, idx + 1)
}

const TITLE_MAP: Record<TQuestion['type'], string> = {
    multiLine: 'Multi-line question',
    oneLine: 'One-line question',
    singleChoice: 'Single choice question',
    multipleChoice: 'Multiple choice question',
}
</script>

<template>
    <Card class="outer-border">
        <template #content>
            <div v-if="questions.fields.value.length > 0" class="content">
                <TransitionGroup name="list" tag="ul">
                    <li v-for="(q, idx) in questions.fields.value" :key="q.key">
                        <FadeInTransition>
                            <QuestionCreatorWrapper
                                :title="TITLE_MAP[q.value.type]"
                                :is-required="q.value.isRequired"
                                @required-change="updateQuestion(idx, { isRequired: $event })"
                                @go-down-the-order="handleGoDown(idx)"
                                @go-up-the-order="handleGoUp(idx)"
                                @remove="removeQuestion(idx)"
                                @copy="copyQuestion(idx)"
                            >
                                <ChoiceQuestionCreator
                                    v-if="
                                        q.value.type === 'singleChoice' ||
                                        q.value.type === 'multipleChoice'
                                    "
                                    :type="q.value.type"
                                    :question="q.value.text"
                                    :is-required="q.value.isRequired"
                                    :idx="idx"
                                    @choice-question-form-change="
                                        (value) => updateQuestion(idx, value)
                                    "
                                />
                                <TextQuestionCreator
                                    v-else
                                    :type="q.value.type"
                                    :is-required="q.value.isRequired"
                                    :question="q.value.text"
                                    @text-answer-form-change="(value) => updateQuestion(idx, value)"
                                />
                            </QuestionCreatorWrapper>
                        </FadeInTransition>
                    </li>
                </TransitionGroup>
            </div>
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

.list-move,
.list-enter-active,
.list-leave-active {
    transform-origin: top center;
    transition: all 0.27s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

.list-enter-to,
.list-leave-from {
    opacity: 1;
    transform: scale(1);
}

.list-leave-active {
    position: absolute;
}
</style>
