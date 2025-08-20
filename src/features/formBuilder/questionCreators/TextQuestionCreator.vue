<script setup lang="ts">
import { Card, Textarea, Checkbox, Divider, Button } from 'primevue'
import { Copy } from 'lucide-vue-next'
import type { IOneLineEntryRequest } from '@/features/formBuilder/useFormBuilder.ts'

const initialValues = defineProps<{
    type: 'oneLine' | 'multiLine'
    question: string
    isRequired: boolean
}>()

defineEmits<{
    (e: 'text-answer-form-change', value: Partial<IOneLineEntryRequest>): void
    (e: 'copy'): void
}>()
</script>

<template>
    <Card>
        <template #header>
            <div class="title-row">
                <span>{{
                    initialValues.type === 'oneLine' ? 'One-line question' : 'Multiline question'
                }}</span>
                <div class="actions">
                    <Checkbox
                        name="isRequired"
                        defaultvalue="{{initialValues.isRequired}}"
                        @value-change="
                            (value) => $emit('text-answer-form-change', { isRequired: value })
                        "
                    />
                    <Button type="button" variant="text">
                        <Copy />
                    </Button>
                </div>
            </div>
        </template>
        <Divider layout="horizontal" />
        <template #content>
            <Textarea
                name="question"
                type="text"
                default-value="{{initialValues.question}}"
                @value-change="(value) => $emit('text-answer-form-change', { question: value })"
            />
        </template>
    </Card>
</template>

<style scoped>
.title-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.actions {
    display: flex;
    flex-direction: row;
    gap: 8px;
}
</style>
