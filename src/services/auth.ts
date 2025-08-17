import { supabase } from '@/services/supabase.ts'

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
