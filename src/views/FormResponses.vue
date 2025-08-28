<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { getColumns, getData } from '@/features/submissions/helpers'
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

const columnNames = computed(() => (data.value ? getColumns(data.value) : []))
const columns = computed(() => columnNames.value.map((name) => ({ field: name, header: name })))
const rowData = computed(() => (data.value ? getData(columnNames.value, data.value) : []))

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
