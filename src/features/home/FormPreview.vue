<script setup lang="ts">
import { Card, Divider, Button } from 'primevue'
import { MessageCircle, Pencil, Trash2 } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const { id, title, description, responseCount } = defineProps<{
    id: number
    title: string
    description: string | null
    responseCount: number
}>()

defineEmits<{
    (e: 'remove', value: { id: number }): void
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
                <Button variant="text" size="small">
                    <MessageCircle />
                </Button>
                <Divider layout="vertical" />
                <RouterLink :to="{ path: `form/${id}` }">
                    <Button variant="text" size="small">
                        <Pencil />
                    </Button>
                </RouterLink>
                <Divider layout="vertical" />
                <Button variant="text" size="small" @click="$emit('remove', { id })">
                    <Trash2 />
                </Button>
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
</style>
