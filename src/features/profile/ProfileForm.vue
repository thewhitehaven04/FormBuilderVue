<script setup lang="ts">
import { Card, Button, InputText, IconField, InputIcon } from 'primevue'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { CheckCircle2, LoaderCircle, Pencil, CircleX } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { fetchUserData } from '@/services/auth.ts'
import { useFetcher } from '@/services/useFetcher.ts'
import type { User } from '@supabase/supabase-js'

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

const { query, data, isPending, isFetching, hasError } = useFetcher<User>(
  async () => (await fetchUserData()).data.user,
)

const onSubmit = handleSubmit((data) => {
  toggleIsEditing()
})

query()

const [name, nameProps] = defineField('name')
const [lastName, lastNameProps] = defineField('lastName')

watch(data, (prev, curr) => {
  if (curr) {
    console.log(curr)
    name.value = curr.user_metadata.firstName
    lastName.value = curr.user_metadata.lastName
  }
})
</script>

<template>
  <Card class="card">
    <template #title>
      <div class="title">
        Profile
        <div class="form-top-row">
          <Button v-if="isEditing" form="profile" type="submit" variant="text">
            <CheckCircle2 />
          </Button>
          <Pencil v-else @click="toggleIsEditing" />
        </div>
      </div>
    </template>
    <template #content>
      <div v-if="!isPending" class="form-content">
        <form id="profile" @submit="onSubmit">
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
        <Button type="reset">
          <CircleX />
          Reset changes
        </Button>
      </div>
      <LoaderCircle v-else />
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
}

.form-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 600px;
  gap: 16px;
}

.form-top-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

button,
input {
  width: 100%;
}
</style>
