<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import LogoutButton from '@/features/app/LogoutButton.vue'
import ThemeSwitcher from '@/features/app/ThemeSwitcher.vue'

const { path } = useRoute()
const lastSegment = computed(() => path.split('/')[-1])
</script>

<template>
    <header class="header">
        <h1 class="title">Form Builder</h1>
        <div class="link-row">
            <RouterLink to="/" style="{ 'link-active': lastSegment === '/home' }">Home </RouterLink>
            <RouterLink to="/new-form" style="{ 'link-active': lastSegment === '/new-form' }"
                >New form
            </RouterLink>
            <RouterLink to="/profile" style="{ 'link-active': lastSegment === '/profile' }"
                >Profile
            </RouterLink>
            <LogoutButton />
            <ThemeSwitcher />
        </div>
    </header>
</template>

<style scoped>
.header {
    position: sticky;
    top: 0;
    box-shadow: 0px 1px 8px 1px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-inline: var(--p-xl);
    padding-block: var(--p-lg);
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
    color: aquamarine;
}
</style>
