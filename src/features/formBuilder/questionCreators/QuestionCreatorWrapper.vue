<script setup lang="ts">
import { Button, Panel, Checkbox } from 'primevue'

const { title, isRequired } = defineProps<{ title: string; isRequired: boolean }>()

defineEmits<{
    (e: 'copy'): void
    (e: 'remove'): void
    (e: 'required-change', value: boolean): void
    (e: 'go-up-the-order'): void
    (e: 'go-down-the-order'): void
}>()
</script>

<template>
    <Panel>
        <template #header>
            <div class="title-row">
                <h1>
                    {{ title }}
                </h1>
            </div>
        </template>
        <template #icons>
            <Button
                variant="text"
                size="small"
                @click="$emit('go-up-the-order')"
                icon="pi pi-arrow-up"
            />
            <Button
                variant="text"
                size="small"
                @click="$emit('go-down-the-order')"
                icon="pi pi-arrow-down"
            />
            <Button variant="text" size="small" @click="$emit('remove')" icon="pi pi-times" />
        </template>
        <template #default>
            <slot />
        </template>
        <template #footer>
            <div class="actions">
                <Button
                    type="button"
                    variant="text"
                    size="small"
                    @click="$emit('copy')"
                    icon="pi pi-copy"
                />
                <label>
                    <Checkbox
                        name="isRequired"
                        :default-value="isRequired"
                        binary
                        @value-change="$emit('required-change', $event)"
                    />
                    Required
                </label>
            </div>
        </template>
    </Panel>
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
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    gap: 8px;
}

.content {
    display: grid;
    grid-template-rows: 1fr 48px;
}

.reorder-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
}
</style>
