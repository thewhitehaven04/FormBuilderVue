<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { getChart } from '@/features/questionAnswersBreakdown/helpers'
import { fetchAnswers } from '@/services/submissions'
import { useFetcher } from '@/services/useFetcher'
import { Card, ProgressSpinner } from 'primevue'
import Chart from 'primevue/chart'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const { params } = useRoute()
const questionId = Number.parseInt(typeof params.questionId === 'string' ? params.questionId : '0')

const { data, isPending, query } = useFetcher(async () => await fetchAnswers(questionId))

watch(
    () => questionId,
    () => query(),
    { immediate: true },
)

const stats = computed(() => getChart(data.value))
</script>

<template>
    <Card>
        <template #title>
            Single choice answer distribution breakdown
        </template>
        <template #subtitle>
            {{ data ? `Question: ${data[0].questions.text}` : null }}
        </template>
        <template #content>
            <ProgressSpinner v-if="isPending" />
            <Chart
                type="pie"
                :data="stats"
                :options="{
                    responsive: true,
                    maintainAspectRatio: false,
                    resizeDelay: 100,
                }"
                class="chart-wrapper"
            />
        </template>
    </Card>
</template>

<style scoped>
.chart-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 450px;
}
</style>
