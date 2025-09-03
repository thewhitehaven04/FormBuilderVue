<script setup lang="ts">
import { Card } from 'primevue'
import FormInput from '@/components/FormInput.vue'
</script>

<template>
    <Card class="editor">
        <template #title>
            <FormInput name="title" placeholder="Title" />
        </template>
        <template #subtitle>
            <FormInput name="description" placeholder="Description" />
        </template>
    </Card>
</template>

<style scoped>
.editor {
    display: flex;
    flex-direction: column;
}

input,
textarea {
    min-width: 450px;
    width: 100%;
}

textarea {
    min-height: 75px;
    resize: vertical;
}
</style>
