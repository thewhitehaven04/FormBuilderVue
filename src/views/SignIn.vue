<script setup lang="ts">
import { InputText, Button } from 'primevue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="overlay">
    <Card>
      <template #title>Sign in</template>
      <template #subtitle>Sign in with your email address.</template>
      <form>
        <InputText name="email" type="email" placeholder="Email" />
        <InputText name="password" type="password" placeholder="Password" />
        <Button type="submit">Sign in</Button>
      </form>

      <div class="footer">
        <div class="row">
          <span>Forgot password?</span>
          <Button variant="link">Reset</Button>
        </div>
        <div class="row">
          <span>No account?</span>
          <RouterLink to="/sign-up">Sign up</RouterLink>
        </div>
      </div>
    </Card>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: end;
}

form {
  display: contents;
}

.overlay {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
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
