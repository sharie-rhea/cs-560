<script setup lang="ts">
import EntryForm from './components/EntryForm.vue'
import EntryList from './components/EntryList.vue'
</script>

<template>
  <v-app>
    <v-app-bar color="primary" density="compact">
      <v-app-bar-title>Habit Diary</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container class="py-6">
        <EntryForm />
        <EntryList />
      </v-container>
    </v-main>
  </v-app>
</template>
