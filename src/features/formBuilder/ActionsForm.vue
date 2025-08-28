<script setup lang="ts">
import { Button, Divider, useToast } from 'primevue'
import { useFormBuilder } from '@/features/formBuilder/useFormBuilder.ts'
import { useRoute, useRouter, RouterLink } from 'vue-router'

const { addQuestion, onFormCreate, onFormEdit, onFormDelete } = useFormBuilder()
const toast = useToast()
const { push } = useRouter()
const { params } = useRoute()

defineProps<{
    type: 'create' | 'edit'
}>()

const onSaveSuccess = () => {
    toast.add({
        severity: 'success',
        summary: 'The form has been successfully saved',
    })
}

const onSaveError = () => {
    toast.add({
        severity: 'error',
        summary: 'Unable to save the form. Try again later',
    })
}

const handleFormDelete = () => {
    onFormDelete()
    push('/')
}
</script>

<template>
    <section>
        <h1>Form elements</h1>
        <ul>
            <li>
                <Button variant="text" size="small" @click="addQuestion('oneLine')">
                    One-line answer
                </Button>
            </li>
            <li>
                <Button variant="text" size="small" @click="addQuestion('multiLine')">
                    Multi-line answer
                </Button>
            </li>
            <li>
                <Button variant="text" size="small" @click="addQuestion('singleChoice')">
                    Single choice
                </Button>
            </li>
            <li>
                <Button variant="text" size="small" @click="addQuestion('multipleChoice')">
                    Multiple choice
                </Button>
            </li>
        </ul>
    </section>
    <Divider type="solid" />
    <section>
        <h1>Actions</h1>
        <Button
            v-if="type === 'create'"
            size="small"
            variant="outlined"
            severity="success"
            @click="onFormCreate(onSaveError, onSaveSuccess)"
            label="Save form"
            icon="pi pi-save"
            icon-pos="left"
        />
        <Button
            v-else
            size="small"
            variant="outlined"
            severity="success"
            @click="onFormEdit(onSaveError, onSaveSuccess)"
            label="Save changes"
            icon="pi pi-save"
        />
        <Button
            v-if="type === 'edit'"
            size="small"
            variant="outlined"
            severity="danger"
            @click="handleFormDelete"
            icon="pi pi-trash"
            icon-pos="left"
            label="Delete form"
        />
        <RouterLink :to="`/respond/${params.id}`">
            <Button
                v-if="type === 'edit'"
                size="small"
                variant="outlined"
                severity="info"
                label="Respond"
                icon="pi pi-reply"
            />
        </RouterLink>
    </section>
</template>

<style scoped>
ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
}

section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
}

a {
    display: block;
}

a > button {
    width: 100%;
}

h1 {
    font-size: 16pt;
    font-weight: 600;
}
</style>
