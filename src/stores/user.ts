import { defineStore } from 'pinia'
import { computed } from 'vue'

type TUserData = {
  userId: string | null
  name: string | null
  lastName: string | null
  email: string | null
}

export const useUserStore = defineStore('user', () => {
  const data: TUserData = {
    userId: null,
    name: null,
    lastName: null,
    email: null,
  }
  let accessToken: string | null = null

  const isLoggedIn = computed(() => data.userId !== null)

  const setToken = (token: string) => {
    accessToken = token
  }

  const setUser = (user: TUserData) => {
    data = user
  }
  const resetUser = () => {
    data.userId = null
    data.email = null
    data.lastName = null
    data.name = null
  }

  const logout = () => {
    data.userId = null
    data.email = null
    data.name = null
    data.lastName = null
  }

  return {
    data,
    isLoggedIn,
    logout,
    setToken,
    setUser,
    resetUser,
  }
})
