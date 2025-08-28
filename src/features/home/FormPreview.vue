<script setup lang="ts">
import { Panel, InputIcon, Button, OverlayBadge } from 'primevue'
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
    <Panel>
        <template #header>
            <div class="header">
                <h2>{{ title }}</h2>
                <p>{{ description }}</p>
            </div>
        </template>
        <template #footer>
            <div class="actions">
                <Button size="small" v-slot="props" as-child>
                    <RouterLink :to="`/form/${id}/answers`">
                        <OverlayBadge
                            :value="responseCount.toString()"
                            severity="danger"
                            size="small"
                        >
                            <InputIcon class="pi pi-comments" :class="props.class" />
                        </OverlayBadge>
                    </RouterLink>
                </Button>
                <Button size="small" v-slot="props" as-child>
                    <RouterLink :to="`form/${id}`">
                        <InputIcon class="pi pi-pencil" :class="props.class" />
                    </RouterLink>
                </Button>
                <Button size="small" @click="$emit('remove')" icon="pi pi-trash"/>
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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
}

a {
    display: block;
    height: 100%;
}

</style>
