import { supabase } from '@/services/supabase.ts'
import { useUserStore } from '@/stores/user.ts'

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
  return await supabase.auth.signInWithPassword({
    email: request.email,
    password: request.password,
  })
}

supabase.auth.onAuthStateChange(async (event, session) => {
  const user = useUserStore()
  if (event === 'SIGNED_IN') {
    user.setToken({
      userId: session?.user.id ?? null,
      name: session?.user.user_metadata.name ?? null,
      lastName: session?.user.user_metadata.lastName ?? null,
      email: session?.user.email ?? null
    })
  }
  if (event === 'SIGNED_OUT') {
    user.resetUser()
  }
  if (event === 'TOKEN_REFRESHED') {
    user.setToken(session?.access_token)
  }
})
