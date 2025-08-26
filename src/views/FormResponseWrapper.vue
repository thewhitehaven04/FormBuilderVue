<script setup lang="ts">
import { getFormSubmissions } from '@/services/forms'
import { useFetcher } from '@/services/useFetcher'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import FormResponse from '@/features/response/FormResponse.vue'
const { params } = useRoute()
const formId = Number.parseInt(typeof params.id === 'string' ? params.id : '0')

const { data, query } = useFetcher(async () => await getFormSubmissions(formId))

watch(
    () => params.id,
    () => query(),
    { immediate: true },
)

const hasSubmissions = computed(() => (data?.value?.count ?? 0) > 0)
</script>

<template>
    <div v-if="hasSubmissions">
        <p>You have already submitted a response to this form</p>
        <RouterLink to="/">Go back</RouterLink>
    </div>
    <FormResponse :form-id="formId" />
</template>
