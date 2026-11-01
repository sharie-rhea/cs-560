<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useBooksStore } from "@/stores/books";
import BookCard from "@/components/BookCard.vue";
import type { Book } from "@/types";

const router = useRouter();
const store = useBooksStore();

// compute filtered list for each book status once the store loads
const bookSections = computed(() => [
  {
    title: "In Progress",
    status: "in-progress" as const,
    books: store.books.filter((b) => getReadingStatus(b) === "in-progress"),
  },
  {
    title: "Not Started",
    status: "not-started" as const,
    books: store.books.filter((b) => getReadingStatus(b) === "not-started"),
  },
  {
    title: "Completed",
    status: "completed" as const,
    books: store.books.filter((b) => getReadingStatus(b) === "completed"),
  },
]);

onMounted(() => {
  store.fetchBooks();
});

function handleBookClick(book: { id: number }) {
  router.push({ name: "book-detail", params: { id: book.id } });
}

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
</script>
<template>
  <v-container>
    <!-- progress bar while loading data -->
    <v-progress-linear
      v-if="store.loading"
      indeterminate
      color="primary"
      class="mb-4"
    />

    <!-- don't show anything until the store finishes loading -->
    <div v-if="!store.loading">
      <!-- template is used just for vue conditional rendering -->
      <template v-for="section in bookSections" :key="section.status">
        <div v-if="section.books.length > 0">
          <h2>{{ section.title }}</h2>
          <div class="primary-surface-container mb-10 pa-4 rounded">
            <v-row>
              <!-- key helps vue track DOM elements for efficiently reordering/deletion/addition -->
              <v-col
                v-for="book in section.books"
                :key="book.id"
                cols="12"
                sm="6"
                md="4"
              >
                <book-card
                  :book="book"
                  :clickable="true"
                  :reading-status="section.status"
                  @click="handleBookClick"
                />
              </v-col>
            </v-row>
          </div>
        </div>
      </template>

      <!-- handle case where there are no books at all -->
      <v-card
        v-if="store.books.length === 0"
        class="text-center pa-6"
        color="var(--primary-surface)"
      >
        <v-icon icon="mdi-bookshelf" size="48" color="var(--primary)" />
        <p class="text-body-1 mt-4">No books found in your library!</p>
      </v-card>
    </div>
  </v-container>
</template>
