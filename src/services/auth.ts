import { supabase } from '@/services/supabase.ts'
import { useUserStore } from '@/stores/user.ts'
import type { TChangePasswordFormDto } from '@/features/profile/ChangePasswordForm.vue'

export type TSignupRequestDto = {
  email: string
  password: string
  firstName: string
  lastName: string
}

export type TSigninRequestDto = {
  email: string
  password: string
}

export const signUp = async (request: TSignupRequestDto) => {
  return await supabase.auth.signUp({
    email: request.email,
    password: request.password,
    options: {
      data: {
        firstName: request.firstName,
        lastName: request.lastName,
      },
    },
  })
}

export const signIn = async (request: TSigninRequestDto) => {
  const data = await supabase.auth.signInWithPassword({
    email: request.email,
    password: request.password,
  })
  return data
}

export const resetPassword = async (request: { email: string }) => {
  return await supabase.auth.resetPasswordForEmail(request.email)
}

export const changePassword = async (request: TChangePasswordFormDto) => {
  return await supabase.auth.updateUser({ password: request.password })
}

export const fetchUserData = async () => {
  return await supabase.auth.getUser()
}

export const logout = async () => {
  return await supabase.auth.signOut()
}

supabase.auth.onAuthStateChange(async (event, session) => {
  const user = useUserStore()
  if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
    user.setUser({
      userId: session?.user.id ?? null,
      name: session?.user.user_metadata.name ?? null,
      lastName: session?.user.user_metadata.lastName ?? null,
      email: session?.user.email ?? null,
    })
  } else if (event === 'SIGNED_OUT') {
    user.logout()
  } else if (event === 'TOKEN_REFRESHED') {
    user.setToken(session?.access_token)
  }
})
