<script setup lang="ts">
import { Message } from 'primevue'
import { useFormContext } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps<{ fieldName: string }>()

const { errors, submitCount } = useFormContext()

const showError = computed(() => !!errors.value[props.fieldName] && submitCount.value > 0)
</script>

<template>
    <Message v-show="showError" severity="error" :name="props.fieldName">{{
        errors[props.fieldName]
    }}</Message>
</template>
