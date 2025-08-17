<script setup lang="ts">
import Card from 'primevue/card'
import { Button, InputText } from 'primevue'
</script>

<template>
  <div class="overlay">
    <Card>
      <template #title>Register</template>
      <template #subtitle>Sign up with your email address.</template>
      <template #content>
        <form>
          <InputText type="text" name="name" placeholder="Name" />
          <InputText type="text" name="lastname" placeholder="Last name" />
          <InputText type="email" name="email" placeholder="Email" />
          <InputText type="password" name="password" placeholder="Password" />
          <InputText type="password" name="confirm" placeholder="Confirm Password" />
          <Button type="submit">Sign up</Button>
        </form>
      </template>
      <template #footer>
        <div class="footer">
          <Button type="reset" variant="outlined">Reset</Button>
          <div class="footer-row">
            Already got an account?
            <RouterLink to="/sign-in">Sign in</RouterLink>
          </div>
        </div>
      </template>
    </Card>
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

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: stretch;
}

input {
  min-width: 300px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: start;
  background-color: white;
  border-radius: 16px;
}

.footer-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
