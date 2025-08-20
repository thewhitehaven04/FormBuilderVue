<script setup lang="ts">
import { Card, Tabs, TabList, Tab, TabPanels, TabPanel } from 'primevue'
import ActionsForm from '@/features/formBuilder/ActionsForm.vue'
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
                            <ActionsForm />
                        </TabPanel>
                        <TabPanel value="preferences">
                            <div>Hello world</div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </section>
        </template>
    </Card>
</template>

<style scoped>
.content {
    width: 400px;
}

</style>
