<script setup lang="ts">
</script>

<template>
  <div class="overlay">
    <section class="section">
      <div>placeholder</div>
    </section>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: start;
  background-color: white;
  border-radius: 16px;
}
</style>
