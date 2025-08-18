<script setup lang="ts">
import { Card, IconField, Button } from 'primevue'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { CheckCircle2, LoaderCircle } from 'lucide-vue-next'
import { ref } from 'vue'
import { fetchUserData } from '@/services/auth.ts'
import { useFetcher } from '@/services/useFetcher.ts'

const schema = z.object({
  name: z.string().min(1),
  lastName: z.string().min(1),
})

type TChangeMetadataDto = z.infer<typeof schema>
const validationSchema = toTypedSchema(schema)

const isEditing = ref(false)

const { defineField, handleSubmit, handleReset } = useForm<TChangeMetadataDto>({
  validationSchema,
})

const [name, nameProps] = defineField('name')
const [lastName, lastNameProps] = defineField('lastName')

const { query, data, isPending, isFetching, hasError } = useFetcher(
  async () => (await fetchUserData()).data.user,
)

query()
</script>

<template>
  <Card class="card">
    <template #title>
      <div class="form-top-row">
        <Button form="profile" type="submit" variant="text">
          <CheckCircle2 />
        </Button>
      </div>
    </template>
    <template #content>
      <div v-if="!isPending" class="form-content">
        <form id="profile">
          <IconField v-if="isEditing" type="text" name="name" v-model="name" v-bind="nameProps" />
          <span v-else>{{ name }}</span>
          <IconField
            v-if="isEditing"
            type="text"
            name="lastName"
            v-model="lastName"
            v-bind="lastNameProps"
          />
          <span v-else>{{ lastName }}</span>
        </form>
        <Button type="reset"></Button>
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
  max-width: 720px;
}

.form-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.form-top-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
