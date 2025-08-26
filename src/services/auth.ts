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

async function signUp(request: TSignupRequestDto) {
    return await supabase.auth.signUp({
        email: request.email,
        password: request.password,
        options: {
            data: {
                firstName: request.firstName,
                lastName: request.lastName
            }
        }
    })
}

async function signIn(request: TSigninRequestDto) {
    const data = await supabase.auth.signInWithPassword({
        email: request.email,
        password: request.password
    })
    return data
}

async function resetPassword(request: { email: string }) {
    return await supabase.auth.resetPasswordForEmail(request.email)
}

async function changePassword(request: TChangePasswordFormDto) {
    return await supabase.auth.updateUser({ password: request.password })
}

async function fetchUserData() {
    return await supabase.auth.getUser()
}

async function logout() {
    return await supabase.auth.signOut()
}

export { logout, fetchUserData, changePassword, resetPassword, signIn, signUp }

supabase.auth.onAuthStateChange(async (event, session) => {
    const user = useUserStore()
    if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        user.setUser({
            userId: session?.user.id ?? null,
            name: session?.user.user_metadata.name ?? null,
            lastName: session?.user.user_metadata.lastName ?? null,
            email: session?.user.email ?? null
        })
    } else if (event === 'SIGNED_OUT') {
        user.logout()
    }
})
