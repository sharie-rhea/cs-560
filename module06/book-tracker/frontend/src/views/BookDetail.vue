<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useBooksStore } from "@/stores/books";
import BookCard from "@/components/BookCard.vue";
import JournalEntryDialog from "@/components/JournalEntryDialog.vue";
import type { Book, JournalEntry, NewJournalEntry } from "@/types";

const route = useRoute();
const store = useBooksStore();

const showJournalDialog = ref(false);
const editingEntry = ref<JournalEntry | null>(null);
const deleteConfirmDialog = ref(false);
const deleteEntryId = ref<number | null>(null);
const snackbar = ref(false);
const snackbarMessage = ref("");
const snackbarColor = ref("success");

const bookId = computed(() => Number(route.params.id));

const sortedEntries = computed(() => {
  return [...store.journalEntries].sort((a, b) => {
    // show most recent entry first
    return new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime();
  });
});

function getReadingStatus(
  book: Book,
): "not-started" | "in-progress" | "completed" {
  if (book.current_page === 0) {
    return "not-started";
  } else if (book.current_page >= book.total_pages) {
    return "completed";
  }
  return "in-progress";
}

onMounted(async () => {
  await store.fetchBook(bookId.value);
  await store.fetchJournalEntries(bookId.value);
});

function showSuccess(message: string) {
  snackbarMessage.value = message;
  snackbarColor.value = "success";
  snackbar.value = true;
}

function openAddDialog() {
  editingEntry.value = null;
  showJournalDialog.value = true;
}

function openEditDialog(entry: JournalEntry) {
  editingEntry.value = entry;
  showJournalDialog.value = true;
}

function confirmDelete(entryId: number) {
  deleteEntryId.value = entryId;
  deleteConfirmDialog.value = true;
}

async function handleAddEntry(entry: NewJournalEntry) {
  await store.createJournalEntry(entry);
  showSuccess("Journal entry added successfully!");
}

async function handleUpdateEntry(id: number, entry: Partial<NewJournalEntry>) {
  await store.updateJournalEntry(id, entry, bookId.value);
  showSuccess("Journal entry updated successfully!");
}

async function handleDeleteEntry() {
  if (deleteEntryId.value !== null) {
    await store.deleteJournalEntry(deleteEntryId.value, bookId.value);
    deleteConfirmDialog.value = false;
    deleteEntryId.value = null;
    showSuccess("Journal entry deleted successfully!");
  }
}

function formatDate(dateStr: string): string {
  // format is MM/DD/YYYY
  if (!dateStr) return "N/A";
  const [year, month, day] = dateStr.split("-");
  return `${month}/${day}/${year}`;
}

</script>

<template>
  <v-container>
    <!-- show bar while loading -->
    <v-progress-linear
      v-if="store.loading"
      indeterminate
      color="var(--primary)"
      class="mb-4"
    />

    <!-- same BookCard that was clicked to get here, just not clickable -->
    <template v-if="store.currentBook">
      <BookCard
        :book="store.currentBook"
        :clickable="false"
        :reading-status="getReadingStatus(store.currentBook)"
        class="mb-6"
      />

      <div class="d-flex justify-space-between align-center mb-4">
        <h2 class="text-h5">Journal Entries</h2>
        <v-btn
          class="text-white"
          color="var(--primary)"
          rounded="xl"
          prepend-icon="mdi-plus"
          @click="openAddDialog"
        >
          Add Entry
        </v-btn>
      </div>

      <v-card
        v-if="sortedEntries.length === 0"
        class="text-center pa-6"
        color="var(--primary-surface)"
      >
        <v-icon icon="mdi-notebook-outline" size="48" color="var(--primary)" />
        <p class="text-body-1 mt-4">No journal entries yet</p>
        <p class="text-body-2">Add an entry to track your reading thoughts!</p>
      </v-card>

      <div v-if="sortedEntries.length != 0" class="primary-surface-container">
        <v-card v-for="entry in sortedEntries" :key="entry.id" class="mb-3">
          <v-card-text>
            <div class="d-flex justify-space-between align-start">
              <div class="flex-grow-1">
                <div class="d-flex align-center mb-2">
                  <v-chip
                    size="small"
                    color="var(--primary)"
                    variant="outlined"
                    class="mr-2"
                  >
                    Page {{ entry.page_number }}
                  </v-chip>
                  <span class="text-caption text-medium-emphasis">
                    {{ formatDate(entry.entry_date) }}
                  </span>
                </div>
                <p v-if="entry.thoughts" class="text-body-1">
                  {{ entry.thoughts }}
                </p>
                <p v-else class="text-body-2 text-grey font-italic">No notes</p>
              </div>
              <div class="d-flex">
                <!-- aria labels for screenreader explanations on icon-only buttons -->
                <v-btn
                  icon="mdi-pencil-outline"
                  variant="text"
                  size="small"
                  color="var(--primary)"
                  @click="openEditDialog(entry)"
                  aria-label="Edit journal entry."
                />
                <v-btn
                  icon="mdi-delete-outline"
                  variant="text"
                  size="small"
                  color="error"
                  @click="confirmDelete(entry.id)"
                  aria-label="Delete journal entry."
                />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <JournalEntryDialog
        v-model="showJournalDialog"
        :book-id="bookId"
        :total-pages="store.currentBook.total_pages"
        :entry="editingEntry"
        @save="handleAddEntry"
        @update="handleUpdateEntry"
      />

      <!-- Delete Confirmation Dialog -->
      <v-dialog v-model="deleteConfirmDialog" max-width="400">
        <v-card>
          <v-card-title>Delete Entry</v-card-title>
          <v-card-text>
            Are you sure you want to delete this journal entry? This action
            cannot be undone.
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              variant="outlined"
              rounded="xl"
              @click="deleteConfirmDialog = false"
              >Cancel</v-btn
            >
            <v-btn
              variant="flat"
              rounded="xl"
              color="error"
              @click="handleDeleteEntry"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 
		aria-live polite announces the snackbar notif but does not interrupt and
		waits until current text has finished reading 
	  -->
      <v-snackbar
        v-model="snackbar"
        :color="snackbarColor"
        :timeout="3000"
        aria-live="polite"
      >
        {{ snackbarMessage }}
        <template #actions>
          <v-btn variant="text" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
    </template>
  </v-container>
</template>
