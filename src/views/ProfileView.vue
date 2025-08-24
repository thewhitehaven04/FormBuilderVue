<script setup lang="ts">
import ChangePasswordForm from '@/features/profile/ChangePasswordForm.vue'
import ProfileForm from '@/features/profile/ProfileForm.vue'
</script>

<template>
    <div class="profile">
        <ProfileForm />
        <ChangePasswordForm />
    </div>
</template>

<style scoped>
.profile {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 8px;
    width: 100%;

    @media screen and (min-width: 1024px) {
        flex-direction: row;
        justify-content: flex-start;
        align-items: start;
        gap: 36px;
        width: 100%;
    }
}
</style>
