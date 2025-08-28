<script setup lang="ts">
import type { IColumn } from '@/features/submissions/types'
import { DataTable, Column } from 'primevue'

defineProps<{
    columns: IColumn[]
    count: number
}>()
</script>

<template>
    <DataTable scrollable>
        <Column key="submitted_by" field="Submitted by" header="Submitted by"/>
        <Column
            v-for="col in $props.columns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
        />
        <template #footer> There are {{ $props.count }} submissions in total </template>
    </DataTable>
</template>
