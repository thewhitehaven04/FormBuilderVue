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
    <div class="body-wrapper">
        <AppHeader />
        <main>
            <div class="container">
                <div class="button-wrapper">
                    <Button variant="text" @click="goBack">
                        <CircleArrowLeftIcon />
                        Back
                    </Button>
                </div>
                <RouterView />
            </div>
        </main>
    </div>
</template>

<style scoped>
.body-wrapper {
    margin-top: var(--m-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 375px;
    position: relative;
    padding-bottom: 4px;
    height: 100vh;
    width: 100vw;
}

main {
    width: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1440px;
    padding-bottom: 2px;
}

.button-wrapper {
    position: sticky;
    top: 0px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 8px;
}
</style>
