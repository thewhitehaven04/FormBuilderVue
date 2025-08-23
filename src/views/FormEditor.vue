<script setup lang="ts">
import QuestionEditor from '@/features/formBuilder/QuestionEditor.vue'
import Sidebar from '@/features/formBuilder/Sidebar.vue'
import FormEditor from '@/features/formBuilder/FormEditor.vue'
import { getFormProvider } from '@/features/formBuilder/useFormBuilder.ts'
import { provide, watch } from 'vue'
import { useFetcher } from '@/services/useFetcher.ts'
import { fetchForm } from '@/services/forms.ts'
import { useRoute } from 'vue-router'

const { params } = useRoute()
const { data, query } = useFetcher(async () => await fetchForm(Number.parseInt(params.id ?? '0')))

const providerValue = getFormProvider()
query()

watch(
    () => data.value,
    (fetchedData) => {
        if (fetchedData) {
            providerValue.title.value = fetchedData.title
            providerValue.description.value = fetchedData.description
            providerValue.questions.value = fetchedData.questions.map((q) => ({
                type: q.question_type,
                isRequired: !!q.is_required,
                question: q.text,
                id: q.id,
                options: q.options.map((option) => ({
                    id: option.id,
                    text: option.text,
                })),
            }))
        }
    },
)

provide('form-builder', providerValue)
</script>

<template>
    <div class="type-selector">
        <Sidebar type="edit" v-once />
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
