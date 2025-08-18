<script setup lang="ts">
import ProfileForm from '@/features/profile/ProfileForm.vue'
import ChangePasswordForm from '@/features/profile/ChangePasswordForm.vue'
</script>

<template>
  <div class="two-column">
    <ProfileForm />
    <ChangePasswordForm />
  </div>
</template>

<style scoped>
.two-column {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: start;
  gap: 36px;
}
</style>
