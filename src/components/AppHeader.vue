<script setup lang="ts">
import { LogOut } from 'lucide-vue-next'
</script>

<template>
  <header class="header">
    <h1 class="title">Form Builder</h1>

    <div>
      <RouterLink to="/home">Main</RouterLink>
      <RouterLink to="/new-form">New form</RouterLink>
      <RouterLink to="/profile">Main</RouterLink>

      <Button>
        <LogOut />
      </Button>
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
  padding-inline: 32px;
  padding-block: 16px;
}

.title {
  font-size: 36px;
  font-weight: bold;
}
</style>
