<script setup lang="ts">
import { computed } from "vue";
import type { Book } from "@/types";

const props = withDefaults(
  defineProps<{
    book: Book;
    // essentially an enum for status
    readingStatus: "not-started" | "in-progress" | "completed";
    clickable?: boolean;
  }>(),
  {
  	// default to not clickable
    clickable: false,
  },
);

const emit = defineEmits<{
  click: [book: Book];
}>();

const progressPercentage = computed(() => {
  if (props.book.total_pages === 0) return 0;
  return Math.round((props.book.current_page / props.book.total_pages) * 100);
});

const statusColor = computed(() => {
  switch (props.readingStatus) {
    case "not-started":
      return "grey";
    case "in-progress":
      return "var(--primary)";
    case "completed":
      return "success";
    default:
      return "grey";
  }
});

const cardAriaLabel = computed(() =>
  props.clickable
    ? `View details for ${props.book.title} by ${props.book.author}`
    : undefined,
);

const getImageUrl = (bookId: number) => {
  return new URL(`../assets/covers/${bookId}.jpg`, import.meta.url).href;
};

function handleClick() {
  if (props.clickable) {
    emit("click", props.book);
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
  <!-- 
	  role: makes sure screenreaders recognize this is a clickable element (on the BookList view)
	  tabindex: enables keyboard navigation
	  aria-label: label to describe clicking shows more details
	  v-on: mouse click, enter, and space all move to BookDetail (space does not scroll the page)
	  NOTE: this must be done with v-on to prevent hover and pointer effects on the non-clickable version
  -->
  <v-card
    :class="{ 'cursor-pointer': clickable }"
    :hover="clickable"
    height="100%"
    width="100%"
    class="d-flex flex-column rounded-card"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    :aria-label="cardAriaLabel"
    v-on="
      clickable
        ? { click: handleClick, 'keydown.enter.space.prevent': handleClick }
        : {}
    "
  >
    <div class="d-flex flex-row flex-grow-1">
      <!-- top section: book details and cover -->
      <div class="d-flex flex-row flex-grow-1 pa-0 align-left">
        <!-- left column: book details (title and author)-->
        <div class="d-flex flex-column flex-grow-1" style="min-width: 0">
          <v-card-title class="text-wrap">{{ props.book.title }}</v-card-title>
          <v-card-subtitle class="text-wrap"
            >by {{ props.book.author }}</v-card-subtitle
          >
        </div>
        <!-- 
			right column: cover
			the cover is decorative and the title and author are already available
			in text, hide from screenreaders
		-->
        <div class="book-cover-container flex-shrink-0 elevation-2 rounded">
          <v-img
            :src="getImageUrl(book.id)"
            cover
            height="100%"
            width="100px"
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>
    </div>

    <!-- bottom : status -->
    <div class="mt-4">
      <!-- Not Started ... XX pages -->
      <div
        v-if="readingStatus == 'not-started'"
        class="text-grey px-4 pb-4 pt-2"
      >
        Not Started
        <span class="float-right text-black"
          >{{ props.book.total_pages }} pages</span
        >
      </div>

      <!-- Finished: MM/DD/YYYY ... XX pages -->
      <div v-else-if="readingStatus == 'completed'" class="px-4 pb-4 pt-2">
        <b>Finished:</b>
        {{
          props.book.completion_date == null
            ? "N/A"
            : formatDate(props.book.completion_date)
        }}
        <v-icon
          icon="mdi-check-circle"
          :color="statusColor"
          size="small"
          class="mr-1"
        />
        <span class="float-right ml-auto"
          >{{ props.book.total_pages }} pages</span
        >
      </div>
    </div>

    <!-- XX/XX pages ... XX% with progress bar underneath -->
    <div v-if="readingStatus == 'in-progress'" class="px-4 pb-4 pt-2">
      <div>
        {{ props.book.current_page }}/{{ props.book.total_pages }} pages
        <span class="float-right font-weight-bold"
          >{{ progressPercentage }}%</span
        >
      </div>
      <v-progress-linear
        :model-value="progressPercentage"
        :color="statusColor"
        height="8"
        rounded
      />
    </div>
  </v-card>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.rounded-card {
  border-radius: 1em;
}

.book-cover-container {
  margin: 1em 1em 0em 1em;
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;
}
</style>
