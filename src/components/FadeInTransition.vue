<template>
    <Transition
        name="fade"
        appear
        enter-from-class="fade-enter-from"
        enter-to-class="fade-enter-to"
        enter-active-class="fade-enter-active"
        leave-from-class="fade-leave-from"
        leave-to-class="fade-leave-to"
        leave-active-class="fade-leave-active"
    >
        <slot />
    </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-leave-from,
.fade-enter-to {
    opacity: 1;
}
</style>
