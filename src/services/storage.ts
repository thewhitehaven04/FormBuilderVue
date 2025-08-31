import { supabase } from '@/services/supabase'

async function updateAvatar(userId: string, file: Blob) {
    return await supabase.storage.from('profileImages').upload(`public/${userId}`, file, {
        upsert: true,
        cacheControl: '0',
    })
}

async function removeAvatar(userId: string) {
    return await supabase.storage.from('profileImages').remove([`public/${userId}`])
}

export { updateAvatar, removeAvatar }
