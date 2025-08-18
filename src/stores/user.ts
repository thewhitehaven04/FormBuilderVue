import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type TUserData = {
  userId: string | null
  name: string | null
  lastName: string | null
  email: string | null
}

export const useUserStore = defineStore('user', () => {
  const data = ref({
    userId: null,
    name: null,
    lastName: null,
    email: null,
  })
  const isLoggedIn = computed(() => data.value.userId !== null)

  const setUser = (user: TUserData) => {
    data.value = user
  }
  const logout = () => {
    data.value.userId = null
    data.value.email = null
    data.value.lastName = null
    data.value.name = null
  }

  return {
    data,
    isLoggedIn,
    logout,
    setUser,
  }
})
