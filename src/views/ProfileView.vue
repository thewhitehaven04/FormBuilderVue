<script setup lang="ts">
import ChangePasswordForm from '@/features/profile/ChangePasswordForm.vue'
import ProfileForm from '@/features/profile/ProfileForm.vue'
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
    width: 100%;
}
</style>
