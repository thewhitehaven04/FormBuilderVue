<script setup lang="ts">
import { Card, Divider, Button } from 'primevue'
import { RouterLink } from 'vue-router'

const { id, title, description, responseCount } = defineProps<{
    id: number
    title: string
    description: string | null
    responseCount: number
}>()

defineEmits<{
    (e: 'remove'): void
}>()
</script>

<template>
    <Card>
        <template #title>
            <h2>{{ title }}</h2>
        </template>
        <template #content>
            <p>{{ description }}</p>
        </template>
        <template #footer>
            <div class="actions">
                <RouterLink :to="`/form/${id}/answers`">
                    <Button
                        variant="text"
                        size="large"
                        badge-severity="danger"
                        :badge="responseCount.toString()"
                        icon="pi pi-comments"
                    />
                </RouterLink>
                <Divider layout="vertical" />
                <RouterLink :to="`form/${id}`">
                    <Button variant="text" size="large" icon="pi pi-pencil" />
                </RouterLink>
                <Divider layout="vertical" />
                <Button variant="text" size="large" @click="$emit('remove')" icon="pi pi-trash" />
            </div>
        </template>
    </Card>
</template>

<style scoped>
h2 {
    text-wrap: pretty;
    font-size: 16pt;
}

.actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
}
.actions > a, .actions > button {
    width: 100%;
}
</style>
