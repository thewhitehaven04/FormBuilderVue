import { supabase } from '@/services/supabase'

export async function getAvatarPath(userId: string): Promise<string | null> {
    const doesExist = (await supabase.storage.from('profileImages').exists(`public/${userId}`)).data
    if (doesExist) {
        return supabase.storage.from('profileImages').getPublicUrl(`public/${userId}`).data.publicUrl
    }
    return new Promise((resolve) => resolve(null))
}
