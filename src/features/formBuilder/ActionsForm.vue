<script setup lang="ts">
import { Button, Divider, useToast } from 'primevue'
import { useFormBuilder } from '@/features/formBuilder/useFormBuilder.ts'

const { addQuestion, onFormSave } = useFormBuilder()
const toast = useToast()

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
        <Button size="small" variant="outlined" @click="onFormSave(onSaveSuccess, onSaveError)"
            >Save form</Button
        >
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
    gap: 8px;
}

h1 {
    font-size: 18pt;
    font-weight: 600;
}
</style>
