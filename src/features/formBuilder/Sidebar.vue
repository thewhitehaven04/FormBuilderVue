<script setup lang="ts">
import { Card, Tabs, TabList, Tab, TabPanels, TabPanel } from 'primevue'
import ActionsForm from '@/features/formBuilder/ActionsForm.vue'
import PreferencesForm from '@/features/formBuilder/PreferencesForm.vue'

const { type } = defineProps<{
    type: 'create' | 'edit'
}>()
</script>

<template>
    <Card class="content">
        <template #content>
            <section>
                <Tabs value="builder">
                    <TabList>
                        <Tab value="builder">Builder</Tab>
                        <Tab value="preferences">Preferences</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel value="builder">
                            <ActionsForm :type="type" />
                        </TabPanel>
                        <TabPanel value="preferences">
                            <PreferencesForm />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </section>
        </template>
    </Card>
</template>

<style scoped>
.content {
    min-width: 270px;
    min-height: 410px;
    transition-property: height;
    transition-duration: 0.25s;
    transition-timing-function: ease-in-out;
    position: sticky;
    top: 50px;
}
</style>
