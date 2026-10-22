<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      Journal Entries
      <v-spacer />
      <v-select
        v-model="filter"
        label="Filter by Activity"
        :items="filterOptions"
        density="compact"
        style="max-width: 200px"
        hide-details
        clearable
        @update:model-value="handleFilter"
      />
    </v-card-title>
    <v-card-text>
      <v-progress-linear v-if="store.loading" indeterminate />
      <v-alert v-else-if="store.error" type="error" class="mb-4">
        {{ store.error }}
      </v-alert>
      <v-data-table
        v-if="!store.loading && !store.error"
        :headers="headers"
        :items="store.entries"
        :items-per-page="10"
        class="elevation-1"
      >
        <template #item.activity_type="{ item }">
          <v-chip :color="getActivityColor(item.activity_type)" size="small">
            {{ item.activity_type }}
          </v-chip>
        </template>

        <template #item.description="{ item }">
          <div class="text-wrap">{{ item.description }}</div>
        </template>

        <template #item.actions="{ item }">
          <v-btn
            icon="mdi-delete"
            variant="text"
            color="error"
            size="small"
            @click="handleDelete(item.id)"
          />
        </template>

        <template #no-data>
          <v-alert type="info" class="ma-4">
            No entries found. Add your first journal entry above!
          </v-alert>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useEntriesStore } from '@/stores/entries'

const store = useEntriesStore()
const filter = ref<string | null>(null)

const filterOptions = computed(() => ['All', ...store.activityTypes])

const headers = [
  {
    title: 'Activity Type',
    key: 'activity_type',
    sortable: true,
    width: '180px'
  },
  {
    title: 'Date',
    key: 'date',
    sortable: true,
    width: '140px'
  },
  {
    title: 'Description',
    key: 'description',
    sortable: false
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
    align: 'end' as const,
    width: '100px'
  }
]

const activityColors: Record<string, string> = {
  Networking: 'blue',
  'Skill Building': 'green',
  'Interview Prep': 'orange',
  'Job Application': 'purple',
  Reflection: 'teal',
}

function getActivityColor(type: string): string {
  return activityColors[type] || 'grey'
}

function handleFilter(value: string | null) {
  const activityType = value === 'All' ? undefined : value || undefined
  store.fetchEntries(activityType)
}

async function handleDelete(id: number) {
  await store.deleteEntry(id)
}

onMounted(() => {
  store.fetchActivityTypes()
  store.fetchEntries()
})
</script>
