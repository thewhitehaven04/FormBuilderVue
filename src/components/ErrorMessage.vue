<script setup lang="ts">
import { Message } from 'primevue'
import { useFormContext } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps<{ fieldName: string }>()

const { errors, submitCount } = useFormContext()

const showError = computed(() => !!errors.value[props.fieldName] && submitCount.value > 0)
</script>

<template>
    <div class="wrapper">
        <Message
            v-if="showError"
            size="small"
            variant="simple"
            severity="error"
            :name="props.fieldName"
            >{{ errors[props.fieldName] }}</Message
        >
    </div>
</template>

<style scoped>
.wrapper {
    height: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: end;
}
</style>
