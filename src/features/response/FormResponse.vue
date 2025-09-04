<script setup lang="ts">
import { useFetcher } from '@/services/useFetcher.ts'
import { fetchForm } from '@/services/forms.ts'
import { useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { typedSchema, type TAnswerForm } from '@/features/response/validation'
import OneLineResponse from '@/features/response/OneLineResponse.vue'
import MultiLineResponse from '@/features/response/MultiLineResponse.vue'
import SingleChoiceResponse from '@/features/response/SingleChoiceResponse.vue'
import MultipleChoiceResponse from '@/features/response/MultipleChoiceResponse.vue'
import { Card, Button, useToast } from 'primevue'
import { submitResponse } from '@/services/submissions'
import { formatTimer } from '@/features/response/helpers'

const { formId } = defineProps<{ formId: number }>()
const { data } = useFetcher(async () => await fetchForm(formId), [formId])
const router = useRouter()
const toast = useToast()

const { handleSubmit, setValues, isSubmitting } = useForm<TAnswerForm>({
    validationSchema: typedSchema,
})

const timer = ref<null | number>(null)
let intervalId: NodeJS.Timeout

const isSubmissionDisabled = computed(() => !!data.value?.timer && timer.value === 0)

watch(
    () => data.value,
    (data) => {
        setValues({
            questions: (data?.questions
                .toSorted((a, b) => a.order - b.order)
                .map((q) => ({
                    type: q.question_type,
                    isRequired: q.is_required,
                    questionId: q.id,
                    answer:
                        q.question_type === 'oneLine' || q.question_type === 'multiLine'
                            ? {
                                  text: null,
                              }
                            : q.question_type === 'singleChoice'
                              ? {
                                    option: null,
                                }
                              : {
                                    options: [],
                                },
                })) || []) as TAnswerForm['questions'],
        })
    },
)

watch(
    () => data.value,
    (data) => {
        timer.value = data?.timer ?? 0

        intervalId = setInterval(() => {
            if (timer.value && timer.value > 0) {
                timer.value--
            } else {
                clearInterval(intervalId)
            }
        }, 1000)
    },
    {
        once: true,
    },
)

const onSubmit = handleSubmit(async (data) => {
    try {
        await submitResponse({ formId, ...data })
        toast.add({
            severity: 'success',
            summary: 'You have successfully responded to the form',
            life: 5000,
        })
        router.push('/')
    } catch {
        toast.add({
            severity: 'error',
            summary: 'Unable to submit the form. Try again later',
            life: 5000,
        })
    }
})
</script>

<template>
    <div class="content">
        <Card class="card">
            <template #title>
                {{ data?.title }}
            </template>
            <template #subtitle>
                <p>{{ data?.description }}</p>
            </template>
            <template #content>
                <form id="response-form" @submit="onSubmit" @submit.prevent>
                    <ProgressSpinner v-if="!data" />
                    <TransitionGroup v-else appear name="list" tag="ul">
                        <li v-for="(question, idx) in data.questions" :key="question.id">
                            <OneLineResponse
                                :idx="idx"
                                v-if="question.question_type === 'oneLine'"
                                :question="question.text"
                            />
                            <MultiLineResponse
                                :idx="idx"
                                v-else-if="question.question_type === 'multiLine'"
                                :question="question.text"
                            />
                            <SingleChoiceResponse
                                :idx="idx"
                                v-else-if="question.question_type === 'singleChoice'"
                                :question="question.text"
                                :options="question.options"
                            />
                            <MultipleChoiceResponse
                                :idx="idx"
                                v-else-if="question.question_type === 'multipleChoice'"
                                :question="question.text"
                                :options="question.options"
                            />
                        </li>
                    </TransitionGroup>
                </form>
            </template>
            <template #footer>
                <div class="footer"></div>
            </template>
        </Card>
        <Card>
            <template #content>
                <div class="timer-container">
                    <div v-if="timer" class="timer">{{ formatTimer(timer) }}</div>
                    <Button
                        type="submit"
                        form="response-form"
                        :label="!isSubmitting ? 'Submit' : undefined"
                        :icon="isSubmitting ? 'pi pi-spinner-dotted' : undefined"
                        :disabled="isSubmissionDisabled"
                    />
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped>
ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    align-items: stretch;
}

button {
    min-width: 96px;
}

.content {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 250px;
    align-items: start;
    column-gap: 16px;
}

.footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.timer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100px;
}

.timer {
    font-size: 16pt;
    font-weight: 500;
}

.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 1.4s ease;
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
