<template>
  <v-card class="mb-6">
    <v-card-title>Add Journal Entry</v-card-title>
    <v-card-text>
      <v-form ref="formRef" @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.date"
              label="Date"
              type="date"
              :rules="[rules.required]"
              required
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="form.activity_type"
              label="Activity Type"
              :items="store.activityTypes"
              :rules="[rules.required]"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="form.description"
              label="Description"
              rows="3"
              :rules="[rules.required]"
              required
            />
          </v-col>
        </v-row>
        <v-btn type="submit" color="primary" :loading="submitting" class="mt-8">
          Add Entry
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useEntriesStore } from '@/stores/entries'

const store = useEntriesStore()
const formRef = ref<{ validate: () => Promise<{ valid: boolean }>; resetValidation: () => void }>()
const submitting = ref(false)

const form = reactive({
  date: new Date().toISOString().split('T')[0] as string,
  activity_type: null as string | null,
  description: '',
})

const rules = {
  required: (v: string | null) => !!v || 'This field is required',
}

async function handleSubmit() {
  const { valid } = await formRef.value!.validate()
  if (!valid) return

  submitting.value = true
  const success = await store.createEntry({
    date: form.date,
    activity_type: form.activity_type!,
    description: form.description,
  })
  submitting.value = false

  if (success) {
    form.date = new Date().toISOString().split('T')[0]!
    form.activity_type = null
    form.description = ''
    formRef.value!.resetValidation()
  }
}
</script>
