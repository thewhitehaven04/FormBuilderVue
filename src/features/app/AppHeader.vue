<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import LogoutButton from '@/features/app/LogoutButton.vue'
import ThemeSwitcher from '@/features/app/ThemeSwitcher.vue'
import { Button } from 'primevue'
</script>

<template>
    <header class="header">
        <div class="header-content">
            <h1 class="title">Form Builder</h1>
            <div class="link-row">
                <RouterLink to="/" exactActiveClass="link-active">
                    <Button variant="text" size="small">Home</Button>
                </RouterLink>
                <RouterLink to="/new-form" exactActiveClass="link-active">
                    <Button variant="text" size="small">New form</Button>
                </RouterLink>
                <RouterLink to="/profile" exactActiveClass="link-active">
                    <Button variant="text" size="small">Profile</Button>
                </RouterLink>
                <LogoutButton />
                <ThemeSwitcher />
            </div>
        </div>
    </header>
</template>

<style scoped>
.header {
    position: sticky;
    top: 0;
    box-shadow: 0px 2px 4px 0.6px rgba(0, 0, 0, 0.15);
    width: 100%;
    padding-block: var(--p-md);
    padding-inline: var(--p-lg);
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.header-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 1440px;
    width: 100%;
}

h1 {
    margin: 0;
    padding: 0;
}

.link-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
}

.title {
    font-size: 36px;
    font-weight: bold;
}

.link-active {
    filter: brightness(0.6);
}
</style>
