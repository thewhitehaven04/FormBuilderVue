<script setup lang="ts">
import type { IColumn } from '@/features/submissions/types'
import { DataTable, Column, Button } from 'primevue'
import { RouterLink } from 'vue-router'

defineProps<{
    columns: IColumn[]
    count: number
}>()
</script>

<template>
    <DataTable
        show-gridlines
        striped-rows
        paginator
        :rows="10"
        table-style="min-width: 400px"
        scrollable
        size="large"
    >
        <Column key="submitted_by" field="Submitted by" header="Submitted by" />
        <Column v-for="col in $props.columns" :key="col.field" :field="String(col.field)">
            <template v-if="col.type === 'singleChoice' || col.type === 'multipleChoice'" #header>
                <Button variant="link" v-slot="props" as-child>
                    <RouterLink
                        :to="`question/${col.field}/${col.type === 'singleChoice' ? 'single-choice' : 'multiple-choice'}/breakdown`"
                        :class="props.class"
                        >{{ col.header }}</RouterLink
                    >
                </Button>
            </template>
            <template #header v-else>
                <span class="header">{{ col.header }}</span>
            </template>
        </Column>
        <template #footer> Total submissions: {{ $props.count }} </template>
    </DataTable>
</template>

<style scoped>
.header {
    font-weight: bold;
}

a {
    font-weight: bold;
}
</style>
