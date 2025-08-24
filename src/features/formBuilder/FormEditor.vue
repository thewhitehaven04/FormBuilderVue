<script setup lang="ts">
import { InputText, Textarea } from 'primevue'
import { Card } from 'primevue'
import { useFormContext } from 'vee-validate'
import type { IForm } from '@/features/formBuilder/useFormBuilder.ts'

const { defineField } = useFormContext<IForm>()

const [title, titleProps] = defineField('title')
const [description, descriptionProps] = defineField('description')
</script>

<template>
    <Card class="editor">
        <template #title>
            <InputText placeholder="Title" v-model="title" v-bind="titleProps" />
        </template>
        <template #subtitle>
            <Textarea placeholder="Description" v-model="description" v-bind="descriptionProps"/>
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
