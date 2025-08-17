import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userId = null
  const email = null

  const isLoggedIn = computed(() => userId !== null)

  return {
    userId,
    email,
    isLoggedIn,
  }
})
