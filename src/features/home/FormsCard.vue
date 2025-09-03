<script setup lang="ts">
import {
    Card,
    InputText,
    Select,
    IconField,
    InputIcon,
    Button,
    ProgressSpinner,
    useToast,
} from 'primevue'
import { ref } from 'vue'
import { useFetcher } from '@/services/useFetcher.ts'
import { deleteForm, fetchForms } from '@/services/forms.ts'
import FormPreview from '@/features/home/FormPreview.vue'
import { RouterLink } from 'vue-router'
import { buildLink } from '@/features/home/helpers'

const options = [
    { label: 'Newest first', value: false },
    { label: 'Oldest first', value: true },
]
const searchQuery = ref(null)
const activeOptions = ref(options[1].value)

const toast = useToast()

const { data, isPending, refetch } = useFetcher(
    async () =>
        await fetchForms({
            skip: 0,
            count: 10,
            text: searchQuery.value,
            isAscending: activeOptions.value,
        }),
    [searchQuery, activeOptions],
)

const handleRemove = (formId: number) => {
    deleteForm([formId])
    refetch()
}

const handleShare = async (formId: number) => {
    await navigator.clipboard.writeText(buildLink(`respond/${formId}`))
    toast.add({
        severity: 'success',
        summary: 'Link copied to clipboard',
        life: 5000,
    })
}
</script>

<template>
    <Card class="card">
        <template #title>
            <div class="title">
                <IconField>
                    <InputIcon class="pi pi-search" />
                    <InputText type="text" v-model="searchQuery" placeholder="Search" />
                </IconField>
                <Select
                    :options="options"
                    option-label="label"
                    option-value="value"
                    v-model="activeOptions"
                    placeholder="Order by"
                />
            </div>
        </template>
        <template #content>
            <div class="content">
                <ProgressSpinner v-if="isPending" />
                <div class="no-forms-container" v-else-if="data?.length === 0">
                    <span>You haven't created any forms yet</span>
                    <RouterLink to="/new-form">
                        <Button type="button" size="large"> Create the first one </Button>
                    </RouterLink>
                </div>
                <div v-else class="grid">
                    <FormPreview
                        v-for="form in data"
                        :key="form.id"
                        :title="form.title"
                        :description="form.description"
                        :id="form.id"
                        :response-count="form.submissions[0].count"
                        @remove="handleRemove(form.id)"
                        @share="handleShare(form.id)"
                    />
                </div>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.card {
    width: 100%;
}

.title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.content {
    width: 100%;
    min-height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 16px;
    width: 100%;
    height: 100%;
}

.no-forms-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
}
</style>
