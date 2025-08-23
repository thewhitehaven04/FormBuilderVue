<script setup lang="ts">
import FormEditor from '@/features/formBuilder/FormEditor.vue'
import QuestionEditor from '@/features/formBuilder/QuestionEditor.vue'
import { provide } from 'vue'
import Sidebar from '@/features/formBuilder/Sidebar.vue'
import { getFormProvider } from '@/features/formBuilder/useFormBuilder.ts'

const providerValue = getFormProvider()
provide('form-builder', providerValue)
</script>

<template>
    <div class="type-selector">
        <Sidebar type="create" v-once />
        <div class="editor">
            <FormEditor />
            <QuestionEditor />
        </div>
    </div>
</template>

<style scoped>
.editor {
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: stretch;
}

.type-selector {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    gap: 32px;
    width: 100%;
}
</style>
