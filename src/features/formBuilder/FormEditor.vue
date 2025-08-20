<script setup lang="ts">
import { InputText } from 'primevue'
import { useFormBuilder } from '@/features/formBuilder/useFormBuilder.ts'
import { Card } from 'primevue'

const { title, subtitle } = useFormBuilder()
</script>

<template>
    <Card>
        <template #title>
            <InputText placeholder="Title" v-model="title" />
        </template>
        <template #subtitle>
            <InputText placeholder="Description" v-model="subtitle" />
        </template>
    </Card>
</template>

<style scoped></style>
