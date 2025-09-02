<script setup lang="ts">
import { Panel, Button, OverlayBadge } from 'primevue'
import { RouterLink } from 'vue-router'

const { id, title, description, responseCount } = defineProps<{
    id: number
    title: string
    description: string | null
    responseCount: number
}>()

defineEmits<{
    (e: 'remove'): void
    (e: 'share'): void
}>()
</script>

<template>
    <Panel>
        <template #header>
            <div class="header">
                <h2>{{ title }}</h2>
                <p>{{ description }}</p>
            </div>
        </template>
        <template #footer>
            <div class="actions">
                <OverlayBadge :value="responseCount.toString()" severity="danger" size="small">
                    <Button size="small" variant="text" v-slot="props" as-child>
                        <RouterLink :to="`/form/${id}/answers`" :class="props.class">
                            <span class="pi pi-comments" />
                        </RouterLink>
                    </Button>
                </OverlayBadge>
                <Button size="small" variant="text" v-slot="props" as-child>
                    <RouterLink :to="`form/${id}`" :class="props.class">
                        <div class="pi pi-pencil" />
                    </RouterLink>
                </Button>
                <Button size="small" variant="text" v-slot="props" as-child>
                    <span class="pi pi-trash" :class="props.class" @click="$emit('remove')" />
                </Button>
                <Button size="small" variant="text" v-slot="props" as-child>
                    <span class="pi pi-share-alt" :class="props.class" @click="$emit('share')" />
                </Button>
            </div>
        </template>
    </Panel>
</template>

<style scoped>
h2 {
    text-wrap: pretty;
    font-size: 16pt;
}

.header {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.actions {
    display: grid;
    grid-template-columns : repeat(3, min-content) 1fr;
    gap: 16px;
}

.actions > *:last-of-type {
    justify-self: end;
}
</style>
