import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type TUserData = {
  userId: string | null
  name: string | null
  lastName: string | null
  email: string | null
}
const LS_KEY = 'sb-louvwylhdehsenaidave-auth-token'

export const useUserStore = defineStore('user', () => {
  const storedData = JSON.parse(localStorage.getItem(LS_KEY))
  const data = ref({
    userId: storedData.user.id ?? null,
    name: storedData.user.identities[0].identity_data.firstName ?? null,
    lastName: storedData.user.identities[0].identity_data.lastName ?? null,
    email: storedData.user.email ?? null,
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
