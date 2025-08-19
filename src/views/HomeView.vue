<script setup lang="ts">
import AppHeader from '@/features/app/AppHeader.vue'
import { useRouter } from 'vue-router'
import { CircleArrowLeftIcon } from 'lucide-vue-next'
import { Button } from 'primevue'

const router = useRouter()

const goBack = () => {
    router.back()
}
</script>

<template>
    <AppHeader />
    <div class="body-wrapper">
        <div class="button-wrapper">
            <Button variant="text" @click="goBack">
                <CircleArrowLeftIcon />
                Back
            </Button>
        </div>
        <RouterView />
    </div>
</template>

<style scoped>
.body-wrapper {
    margin-top: var(--m-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 375px;
    width: 100%;
    max-width: 1440px;
}

.button-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
}
</style>
