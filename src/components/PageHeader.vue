<script setup lang="ts">
defineSlots<{ default: string }>()
</script>

<template>
    <div>
        <h1 class="header">
            <slot />
        </h1>
    </div>
</template>

<style scoped>
h1 {
    font-size: 20pt;
}

div {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    margin-block: var(--m-sm);
}
</style>
