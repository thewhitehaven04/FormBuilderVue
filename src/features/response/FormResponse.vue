<script setup lang="ts">
import { useFetcher } from '@/services/useFetcher.ts'
import { fetchForm } from '@/services/forms.ts'
import { useRouter } from 'vue-router'
import { watch } from 'vue'
import { useForm } from 'vee-validate'
import { typedSchema, type TAnswerForm } from '@/features/response/validation'
import { LoaderCircle } from 'lucide-vue-next'
import OneLineResponse from '@/features/response/OneLineResponse.vue'
import MultiLineResponse from '@/features/response/MultiLineResponse.vue'
import SingleChoiceResponse from '@/features/response/SingleChoiceResponse.vue'
import MultipleChoiceResponse from '@/features/response/MultipleChoiceResponse.vue'
import { Card, Button, useToast } from 'primevue'
import { submitResponse } from '@/services/submissions'

const { formId } = defineProps<{ formId: number }>()
const { data, query } = useFetcher(async () => await fetchForm(formId))
const router = useRouter()
const toast = useToast()

watch(
    () => formId,
    () => query(),
    { immediate: true },
)

const { handleSubmit, setValues, isSubmitting } = useForm<TAnswerForm>({
    validationSchema: typedSchema,
})

watch(
    () => data.value,
    (data) => {
        setValues({
            questions:
                data?.questions.map((q) => ({
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
                })) || [],
        })
    },
)

const onSubmit = handleSubmit(async (data) => {
    try {
        await submitResponse({ formId, ...data })
        router.push('/')
    } catch {
        toast.add({
            severity: 'error',
            summary: 'Unable to submit the form. Try again later',
        })
    }
})
</script>

<template>
    <Card class="card">
        <template #title>
            {{ data?.title }}
        </template>
        <template #subtitle>
            <p>{{ data?.description }}</p>
        </template>
        <template #content>
            <form id="response-form" @submit="onSubmit" @submit.prevent>
                <ul>
                    <LoaderCircle v-if="!data" />
                    <li v-else v-for="(question, idx) in data.questions" :key="question.id">
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
                </ul>
            </form>
        </template>
        <template #footer>
            <Button
                type="submit"
                form="response-form"
                :label="!isSubmitting ? 'Submit' : undefined"
                :icon="isSubmitting ? 'pi pi-spinner-dotted' : undefined"
            />
        </template>
    </Card>
</template>

<style scoped>
ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.card {
    width: 100%;
}
button {
    min-width: 96px;
}
</style>
