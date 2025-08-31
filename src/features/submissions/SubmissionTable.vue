<script setup lang="ts">
import type { IColumn } from '@/features/submissions/types'
import { DataTable, Column } from 'primevue'

defineProps<{
    columns: IColumn[]
    count: number
}>()
</script>

<template>
    <DataTable show-gridlines striped-rows paginator :rows="10" table-style="min-width: 400px" scrollable>
        <Column key="submitted_by" field="Submitted by" header="Submitted by" />
        <Column
            v-for="col in $props.columns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
        />
        <template #footer> Total submissions: {{ $props.count }} </template>
    </DataTable>
</template>
