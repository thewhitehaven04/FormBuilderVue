<script setup lang="ts">
import {
    Card,
    Button,
    IconField,
    InputIcon,
    FileUpload,
    Image,
    type FileUploadSelectEvent,
} from 'primevue'
import { useForm } from 'vee-validate'
import { ref, watch } from 'vue'
import { useFetcher } from '@/services/useFetcher.ts'
import { AtSign, ClipboardList } from 'lucide-vue-next'
import { getFormCount } from '@/services/forms.ts'
import { getAvatarPath } from '@/features/profile/helpers'
import FormInput from '@/components/FormInput.vue'
import { validationSchema, type TUpdateUserFormDto } from '@/features/profile/validation'
import { removeAvatar, updateAvatar } from '@/services/storage'
import { fetchUserData, updateUserData } from '@/services/users'

const isEditing = ref(false)

const toggleIsEditing = () => (isEditing.value = !isEditing.value)

const { setValues, handleSubmit, handleReset, values } = useForm<TUpdateUserFormDto>({
    validationSchema,
})

const getUserData = async () => {
    const [userData, formsCreated] = await Promise.all([fetchUserData(), getFormCount()])
    const avatar = await getAvatarPath(userData.id)
    return { userData, formsCreated, avatar }
}

const { query, data } = useFetcher(async () => await getUserData())

query()
const onProfileUpdateSubmit = handleSubmit(async (data) => {
    await updateUserData(data)
    toggleIsEditing()
})

const onReset = () => {
    handleReset()
    toggleIsEditing()
}

watch(
    data,
    (data) => {
        setValues({
            id: data?.userData.id,
            name: data?.userData.first_name,
            lastName: data?.userData.last_name,
            email: data?.userData.email,
        })
    },
    { immediate: true },
)

/** TODO: add toasts to indicate failure */
const handleUpload = async (evt: FileUploadSelectEvent) => {
    await updateAvatar(values.id, evt.files[0] as Blob)
    query()
}

const handleRemove = async () => {
    removeAvatar(values.id)
    query()
}
</script>

<template>
    <Card class="card">
        <template #title>
            <div class="title">
                Profile
                <div class="form-top-row">
                    <template v-if="isEditing">
                        <Button
                            form="profile"
                            type="submit"
                            size="large"
                            variant="text"
                            icon="pi pi-check"
                        />
                        <Button
                            :disabled="!isEditing"
                            form="profile"
                            type="reset"
                            size="large"
                            variant="text"
                            icon="pi pi-times"
                        />
                    </template>
                    <Button
                        v-else
                        variant="text"
                        @click="toggleIsEditing"
                        size="large"
                        icon="pi pi-pencil"
                    />
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
                                <img :src="data.avatar" class="avatar-image" alt="preview" />
                            </div>
                        </template>
                        <template #preview="slotProps">
                            <img :src="data.avatar" alt="preview" :style="slotProps.style" />
                        </template>
                    </Image>
                    <IconField>
                        <InputIcon class="pi pi-user" />
                        <FormInput
                            type="text"
                            name="name"
                            placeholder="Name"
                            :disabled="!isEditing"
                        />
                    </IconField>
                    <IconField>
                        <InputIcon class="pi pi-user" />
                        <FormInput
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            :disabled="!isEditing"
                        />
                    </IconField>
                </form>
                <div class="read-only-row">
                    <AtSign />
                    <div>{{ data?.userData.email }}</div>
                </div>
                <div class="read-only-row">
                    <ClipboardList />
                    <div>Forms created: {{ data?.formsCreated }}</div>
                </div>
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
