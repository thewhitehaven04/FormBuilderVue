<script setup lang="ts">
import AppHeader from '@/features/app/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <div class="body-wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
.body-wrapper {
  margin-top: var(--m-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
