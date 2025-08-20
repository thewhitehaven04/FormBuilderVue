<script setup lang="ts">
import { InputText, Textarea } from 'primevue'
import { useFormBuilder } from '@/features/formBuilder/useFormBuilder.ts'
import { Card } from 'primevue'

const { title, subtitle } = useFormBuilder()
</script>

<template>
    <Card class="editor">
        <template #title>
            <InputText placeholder="Title" v-model="title" />
        </template>
        <template #subtitle>
            <Textarea placeholder="Description" v-model="subtitle"  />
        </template>
    </Card>
</template>

<style scoped>
.editor {
    display: flex;
    flex-direction: column;
}

input, textarea {
    min-width: 450px;
    width: 100%;
}

textarea {
    min-height: 75px;
    resize: vertical;
}
</style>
