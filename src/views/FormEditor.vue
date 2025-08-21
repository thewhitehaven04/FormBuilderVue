<script setup lang="ts">
import QuestionEditor from '@/features/formBuilder/QuestionEditor.vue'
import Sidebar from '@/features/formBuilder/Sidebar.vue'
import FormEditor from '@/features/formBuilder/FormEditor.vue'
import { getFormProvider } from '@/features/formBuilder/useFormBuilder.ts'
import { onMounted, provide } from 'vue'
import { useFetcher } from '@/services/useFetcher.ts'
import { fetchForm } from '@/services/forms.ts'
import { useRoute } from 'vue-router'
import type { TQuestion } from '@/features/formBuilder/useFormBuilder.ts'

const { params } = useRoute()
const { data, query } = useFetcher(async () => await fetchForm(Number.parseInt(params.id ?? '0')))

const providerValue = getFormProvider({
    description: data.value?.description ?? null,
    question: (data.value?.questions.map((q) => ({
        id: q.id,
        question: q.text,
        isRequired: !!q.is_required,
        options: q.options.map((option) => ({ text: option.text })),
    })) || []) as unknown as TQuestion[],
    title: data.value?.title ?? null,
})
onMounted(query)
provide('form-builder', providerValue)
</script>

<template>
    <div class="type-selector">
        <Sidebar v-once />
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
