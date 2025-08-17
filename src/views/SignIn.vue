<script setup lang="ts">
import { InputText, Button } from 'primevue'
import Card from 'primevue/card';
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="overlay">
    <Card>
      <template #title>Sign in</template>
      <template #subtitle>Sign in with your email address.</template>
      <template #content>
        <form>
          <InputText name="email" type="email" placeholder="Email" />
          <InputText name="password" type="password" placeholder="Password" />
          <Button type="submit">Sign in</Button>
        </form>
      </template>

      <template #footer>
        <div class="footer">
          <div class="row">
            <div>Forgot password?</div>
            <Button variant="link">Reset</Button>
          </div>
          <div class="row">
            <div>No account?</div>
            <Button variant="link">
              <RouterLink to="/sign-up">Sign up</RouterLink>
            </Button>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: stretch;
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

input {
  min-width: 300px;
}
</style>
