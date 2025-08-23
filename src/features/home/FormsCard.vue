<script setup lang="ts">
import { Card, InputText, Select } from 'primevue'
import { ref, watch } from 'vue'
import { Loader } from 'lucide-vue-next'
import { useFetcher } from '@/services/useFetcher.ts'
import { deleteForm, fetchForms } from '@/services/forms.ts'
import FormPreview from '@/features/home/FormPreview.vue'
import debounce from 'debounce'

const options = [
    { label: 'Newest first', value: false },
    { label: 'Oldest first', value: false },
]
const searchQuery = ref('')
const activeOptions = ref(options[1].value)

const { data, query, isPending } = useFetcher(
    async () =>
        await fetchForms({
            skip: 0,
            count: 3,
            text: searchQuery.value,
            isAscending: activeOptions.value,
        }),
)

watch([searchQuery, activeOptions], () => query())

const handleRemove = (formId: number) => {
    deleteForm(formId)
    query()
}
</script>

<template>
    <Card class="card">
        <template #title>
            <div class="title">
                <InputText type="text" v-model="searchQuery" placeholder="Search" />
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
                <Loader v-if="isPending" animate-pulse="true" />
                <div v-else class="grid">
                    <FormPreview
                        v-for="form in data"
                        :key="form.id"
                        :title="form.title"
                        :description="form.description"
                        :id="form.id"
                        :response-count="1"
                        @remove="handleRemove(form.id)"
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
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    width: 100%;
    height: 100%;
}
</style>
