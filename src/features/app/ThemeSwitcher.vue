<script setup lang="ts">
import { Button } from 'primevue'
import { computed, onUnmounted, ref } from 'vue'
import { Sun, Moon, Cog } from 'lucide-vue-next'
import { DARK_MODE_SELECTOR_CLASS } from '@/main.ts'

const themes = ['system', 'light', 'dark'] as const
const LS_THEME_PREFERENCE_KEY = 'formAppThemePreference'

const lsPreference = localStorage.getItem(LS_THEME_PREFERENCE_KEY)
const themeIndex = ref(lsPreference ? Number.parseInt(lsPreference) : 0)

const themePreference = computed(() => themes[themeIndex.value])

const toggleThemePreference = (): void => {
    themeIndex.value = (themeIndex.value + 1) % 3
    if (themePreference.value === 'dark') {
        document.documentElement.classList.add(DARK_MODE_SELECTOR_CLASS)
    } else {
        document.documentElement.classList.remove(DARK_MODE_SELECTOR_CLASS)
    }
}

onUnmounted(() => {
    localStorage.setItem(LS_THEME_PREFERENCE_KEY, themeIndex.value.toString())
})
</script>

<template>
    <Button size="small" variant="text" @click="toggleThemePreference">
        <Sun v-if="themePreference === 'light'" />
        <Moon v-if="themePreference === 'dark'" />
        <Cog v-if="themePreference === 'system'" />
    </Button>
</template>

<style scoped></style>
