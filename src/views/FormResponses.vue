<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import SubmissionTable from '@/features/submissions/SubmissionTable.vue'
import { fetchFormSubmissions } from '@/services/submissions'
import { useFetcher } from '@/services/useFetcher'
import { LoaderCircle } from 'lucide-vue-next'
import { Card } from 'primevue'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const { params } = useRoute()
const formId = Number.parseInt(typeof params.id === 'string' ? params.id : '0')

const { data, isPending, query } = useFetcher(async () => await fetchFormSubmissions(formId))

watch(
    () => params.id,
    () => query(),
    { immediate: true },
)

const columns = computed(() =>
    data.value
        ? [
              ...data.value[0].option_answers.map((oa) => ({
                  header: oa.questions.text,
                  field: oa.question_id.toString(),
              })),
              ...data.value[0].text_answers.map((ta) => ({
                  header: ta.questions.text,
                  field: ta.question_id.toString(),
              })),
          ]
        : [],
)

const rowData = computed(() =>
    data.value
        ? data.value.map((submission) =>
              Object.fromEntries([
                  ...submission.option_answers.map((oa) => [
                      oa.question_id.toString(),
                      oa.option_id.toString(),
                  ]),
                  ...submission.text_answers.map((ta) => [ta.question_id.toString(), ta.text]),
              ]),
          )
        : [],
)
</script>

<template>
    <PageHeader>Submissions</PageHeader>
    <p v-if="!isPending && data?.length && data?.length === 0">
        There are no submissions for this form yet
    </p>
    <div v-else class="container">
        <Card>
            <template #content>
                <LoaderCircle v-if="isPending" class="animate-pulse" />
                <SubmissionTable :columns="columns" :value="rowData" :count="rowData.length" />
            </template>
        </Card>
    </div>
</template>

<style scoped>
.container {
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 100%;
}

h1 {
    padding-top: 8px;
}
</style>
