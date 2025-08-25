<script setup lang="ts">
import { Button, Card, Checkbox, Divider } from 'primevue'
import { Copy, X } from 'lucide-vue-next'

const { title, isRequired } = defineProps<{ title: string; isRequired: boolean }>()
defineEmits<{
    (e: 'copy'): void
    (e: 'remove'): void
    (e: 'required-change', value: boolean): void
}>()

defineSlots<{
    content(): never
}>()
</script>

<template>
    <Card>
        <template #title>
            <div class="title-row">
                <h1>
                    {{ title }}
                </h1>
                <Button variant="text" size="small" @click="$emit('remove')">
                    <X />
                </Button>
            </div>
        </template>
        <Divider layout="horizontal" />
        <template #content>
            <slot name="content" />
        </template>
        <template #footer>
            <div class="actions">
                <label>
                    <Checkbox
                        name="isRequired"
                        :default-value="isRequired"
                        binary
                        @value-change="$emit('required-change', $event)"
                    />
                    Required
                </label>
                <Button type="button" variant="outlined" size="small" @click="$emit('copy')">
                    <Copy />
                </Button>
            </div>
        </template>
    </Card>
</template>

<style scoped>
h1 {
    font-size: 14pt;
    font-weight: 400;
}

.title-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 8px;
}
</style>
