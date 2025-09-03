<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LogoutButton from '@/features/app/LogoutButton.vue'
import ThemeSwitcher from '@/features/app/ThemeSwitcher.vue'
import { Button } from 'primevue'
</script>

<template>
    <header class="header">
        <div class="header-content">
            <RouterLink to="/">
                <h1 class="title">Form Builder</h1>
            </RouterLink>
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
    z-index: 1;
    background-color: var(--p-content-background);
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

.link-row > a {
    @media screen and (max-width: 600px) {
        display: none;
    }
}

.title {
    font-size: 20pt;
    font-weight: medium;
    color: var(--p-primary-color);
    filter: brightness(0.8);
    opacity: 0.9;
}

.link-active {
    filter: brightness(0.6);
}
</style>
