<script setup lang="ts">
import {
    Card,
    Button,
    InputText,
    IconField,
    InputIcon,
    FileUpload,
    Image,
    type FileUploadSelectEvent,
    Avatar,
    type FileUploadRemoveEvent,
} from 'primevue'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref, watch } from 'vue'
import { fetchUserData } from '@/services/auth.ts'
import { useFetcher } from '@/services/useFetcher.ts'
import { format } from 'date-fns'
import {
    CheckCircle2,
    Pencil,
    AtSign,
    ClipboardList,
    CircleX,
    ClipboardCheck,
} from 'lucide-vue-next'
import { getFormCount } from '@/services/forms.ts'
import { supabase } from '@/services/supabase'
import { getAvatarPath } from '@/features/profile/helpers'

const schema = z.object({
    name: z.string().min(1),
    lastName: z.string().min(1),
})

type TChangeMetadataDto = z.infer<typeof schema>
const validationSchema = toTypedSchema(schema)

const isEditing = ref(false)

const toggleIsEditing = () => {
    isEditing.value = !isEditing.value
}

const { defineField, handleSubmit, handleReset } = useForm<TChangeMetadataDto>({
    validationSchema,
})

const getUserData = async () => {
    const [userData, formsCreated] = await Promise.all([
        (await fetchUserData()).data,
        await getFormCount(),
    ])
    if (userData.user) {
        const avatar = await getAvatarPath(userData.user.id)
        return { userData, formsCreated, avatar }
    }
}

const { query, data } = useFetcher(async () => await getUserData())

query()
const onProfileUpdateSubmit = handleSubmit(() => toggleIsEditing())

const onReset = () => {
    handleReset()
    toggleIsEditing()
}

const [name, nameProps] = defineField('name')
const [lastName, lastNameProps] = defineField('lastName')

watch(
    data,
    (data) => {
        const user = data?.userData.user
        if (user) {
            name.value = user.user_metadata.firstName
            lastName.value = user.user_metadata.lastName
        }
    },
    { immediate: true },
)

const handleUpload = async (evt: FileUploadSelectEvent) => {
    if (data.value?.userData.user) {
        await supabase.storage
            .from('profileImages')
            .upload(`public/${data.value?.userData.user.id}`, evt.files[0] as Blob, {
                upsert: true,
            })
    }
    query()
}

const handleRemove = async () => {
    await supabase.storage.from('profileImages').remove([`public/${data.value?.userData.user.id}`])
    query()
}
</script>

<template>
    <Card class="card">
        <template #title>
            <div class="title">
                Profile
                <div class="form-top-row">
                    <Button
                        v-if="isEditing"
                        form="profile"
                        type="submit"
                        variant="text"
                        size="small"
                    >
                        <CheckCircle2 />
                    </Button>
                    <Button v-else variant="text" @click="toggleIsEditing" size="small">
                        <Pencil />
                    </Button>
                </div>
            </div>
        </template>
        <template #content>
            <div class="form-content">
                <form id="profile" @submit="onProfileUpdateSubmit" @reset="onReset">
                    <div class="avatar-controls">
                        <FileUpload
                            mode="basic"
                            @remove-uploaded-file="handleRemove"
                            custom-upload
                            accept="image/*"
                            @select="handleUpload($event)"
                            :choose-label="data?.avatar ? 'Update' : 'Upload'"
                            auto
                        />
                        <Button
                            v-if="data?.avatar"
                            @click="handleRemove"
                            severity="danger"
                            label="Remove"
                            icon="pi pi-trash"
                        />
                    </div>
                    <Image v-if="data?.avatar" preview>
                        <template #image>
                            <div class="image-wrapper">
                                <img :src="data.avatar" class="avatar-image" alt="preview"/>
                            </div>
                        </template>
                        <template #preview="slotProps">
                            <img :src="data.avatar" alt="preview" :style="slotProps.style" />
                        </template>
                    </Image>
                    <IconField>
                        <InputIcon class="pi pi-user" />
                        <InputText
                            type="text"
                            name="name"
                            placeholder="Name"
                            v-model="name"
                            v-bind="nameProps"
                            :disabled="!isEditing"
                        />
                    </IconField>
                    <IconField>
                        <InputIcon class="pi pi-user" />
                        <InputText
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            v-model="lastName"
                            v-bind="lastNameProps"
                            :disabled="!isEditing"
                        />
                    </IconField>
                </form>
                <div class="read-only-row">
                    <AtSign />
                    <div>{{ data?.userData.user?.email }}</div>
                </div>
                <div class="read-only-row">
                    <ClipboardList />
                    <div>Forms created: {{ data?.formsCreated }}</div>
                </div>
                <div class="read-only-row">
                    <ClipboardCheck />
                    <div>
                        Registration date:
                        {{
                            data?.userData.user?.created_at
                                ? format(data?.userData.user.created_at, 'dd.mm.yyyy, HH:MM:SS')
                                : null
                        }}
                    </div>
                </div>
                <Button :disabled="!isEditing" form="profile" type="reset">
                    <CircleX />
                    Reset
                </Button>
            </div>
        </template>
    </Card>
</template>

<style scoped>
form {
    display: contents;
}

.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 768px;
}

.read-only-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
}

.form-content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    max-width: 600px;
    width: 100%;
    min-width: 350px;
    gap: 16px;
}

.form-top-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: 40px;
}

.title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

button,
input {
    width: 100%;
}

.avatar-controls {
    display: flex;
    flex-direction: row;
    gap: 8px;
}

.avatar-image {
    width: 300px;
    height: 300px;
    object-fit: cover;
    clip-path: circle(50%);
}

.image-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
</style>
