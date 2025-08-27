<script setup lang="ts">
import { getFormSubmissions } from '@/services/forms'
import { useFetcher } from '@/services/useFetcher'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import FormResponse from '@/features/response/FormResponse.vue'
import { Button } from 'primevue'

const { params } = useRoute()
const formId = Number.parseInt(typeof params.id === 'string' ? params.id : '0')

const { data, query } = useFetcher(async () => await getFormSubmissions(formId))

watch(
    () => params.id,
    () => query(),
    { immediate: true },
)

const hasSubmissions = computed(() => (data?.value?.data.length ?? 0) > 0)
</script>

<template>
    <div v-if="hasSubmissions">
        <p>You have already submitted a response to this form.</p>
        <Button as-child>
            <RouterLink to="/">Go back</RouterLink>
        </Button>
    </div>
    <FormResponse v-else :form-id="formId" />
</template>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}

p {
    font-size: 18pt;
}
</style>
