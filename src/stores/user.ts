import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { User } from '@supabase/supabase-js'

type TUserData = {
    userId: string | null
    name: string | null
    lastName: string | null
    email: string | null
}

const LS_KEY = 'sb-louvwylhdehsenaidave-auth-token'

export const useUserStore = defineStore('user', () => {
    const storageDataString = localStorage.getItem(LS_KEY) ?? null
    let userStorageData: User | null = null
    if (storageDataString) {
        userStorageData = JSON.parse(storageDataString)
    }

    const data = ref({
        userId: userStorageData?.user?.id ?? null,
        name:
            userStorageData?.user?.identities[0].identity_data.firstName ??
            null,
        lastName:
            userStorageData?.user?.identities[0].identity_data.lastName ?? null,
        email: userStorageData?.user?.email ?? null,
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
