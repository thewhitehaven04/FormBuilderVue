<script setup lang="ts">
import { useFetcher } from '@/services/useFetcher.ts'
import { fetchForm } from '@/services/forms.ts'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { useForm } from 'vee-validate'
import type { IAnswerForm } from '@/features/response/types.ts'
import { LoaderCircle } from 'lucide-vue-next'
import OneLineResponse from '@/features/response/OneLineResponse.vue'
import MultiLineResponse from '@/features/response/MultiLineResponse.vue'
import SingleChoiceResponse from '@/features/response/SingleChoiceResponse.vue'
import MultipleChoiceResponse from '@/features/response/MultipleChoiceResponse.vue'
import { Card } from 'primevue'

const { params } = useRoute()
const paramsId = Number.parseInt(typeof params.id === 'string' ? params.id : '0')

const { data, query, isPending } = useFetcher(async () => await fetchForm(paramsId))

watch(
    () => params.id,
    () => {
        query()
    },
    { immediate: true },
)

const { handleSubmit } = useForm<IAnswerForm>({
    initialValues: {
        answers:
            data.value?.questions.map((q) => ({
                questionId: q.id,
                answer: { optionId: null, text: null },
            })) || [],
    },
})
</script>

<template>
    <Card>
        <template #title>
            {{ data?.title }}
        </template>
        <template #subtitle>
            <p>{{ data?.description }}</p>
        </template>
        <template #content>
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
        </template>
    </Card>
</template>

<style scoped></style>
