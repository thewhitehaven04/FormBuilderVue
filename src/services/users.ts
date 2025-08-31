import type { TUpdateUserFormDto } from '@/features/profile/validation'
import { supabase } from '@/services/supabase'
import * as Auth from './auth'

async function fetchUserData() {
    const userId = (await Auth.fetchUserData()).data.user?.id
    if (userId) {
        return (await supabase.from('users').select('*').eq('id', userId).single().throwOnError())
            .data
    }
    throw new Error('User not found')
}

async function updateUserData(form: TUpdateUserFormDto) {
    await supabase
        .from('users')
        .update({
            last_name: form.lastName,
            first_name: form.name,
        })
        .eq('id', form.id)
        .throwOnError()
}

export { fetchUserData, updateUserData }
