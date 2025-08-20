<script setup lang="ts">
import { Button, Divider } from 'primevue'
import { useFormBuilder } from '@/features/formBuilder/useFormBuilder.ts'

const { addQuestion, onFormSave } = useFormBuilder()
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
        <Button size="small" variant="outlined" @click="onFormSave()">Save form</Button>
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
