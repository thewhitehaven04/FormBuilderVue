<script setup lang="ts"></script>

<template>
    <div class="error-container">
        <span class="icon pi pi-exclamation-triangle" />
        <p>You have no access to this resource</p>
    </div>
</template>

<style scoped>
.error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    height: 100vh;
    width: 100vw;
}

.icon {
    font-size: 64px
}

p {
    font-size: 24px
}
</style>
