import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { JournalEntry } from '@/types/entry'

const API_BASE = '/api'

export const useEntriesStore = defineStore('entries', () => {
  const entries = ref<JournalEntry[]>([])
  const activityTypes = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchActivityTypes() {
    try {
      const response = await fetch(`${API_BASE}/activity-types`)
      activityTypes.value = await response.json()
    } catch (e) {
      error.value = 'Failed to fetch activity types'
    }
  }

  async function fetchEntries(activityType?: string) {
    loading.value = true
    error.value = null
    try {
      const url = activityType
        ? `${API_BASE}/entries?activity_type=${encodeURIComponent(activityType)}`
        : `${API_BASE}/entries`
      const response = await fetch(url)
      entries.value = await response.json()
    } catch (e) {
      error.value = 'Failed to fetch entries'
    } finally {
      loading.value = false
    }
  }

  async function createEntry(entry: { date: string; activity_type: string; description: string }) {
    error.value = null
    try {
      const response = await fetch(`${API_BASE}/entries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      })
      if (!response.ok) throw new Error('Failed to create entry')
      const newEntry = await response.json()
      entries.value.unshift(newEntry)
      return true
    } catch (e) {
      error.value = 'Failed to create entry'
      return false
    }
  }

  async function deleteEntry(id: number) {
    error.value = null
    try {
      const response = await fetch(`${API_BASE}/entries/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete entry')
      entries.value = entries.value.filter((e) => e.id !== id)
      return true
    } catch (e) {
      error.value = 'Failed to delete entry'
      return false
    }
  }

  return {
    entries,
    activityTypes,
    loading,
    error,
    fetchActivityTypes,
    fetchEntries,
    createEntry,
    deleteEntry,
  }
})
