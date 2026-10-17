<script setup lang="ts">
import { Play, Pause, Heart } from "lucide-vue-next";
import type { AudioFile } from "@/types";

interface Props {
  track: AudioFile;
  isPlaying?: boolean;
  isLast?: boolean;
  isFavorited?: boolean;
}

// Props: Data flows DOWN from parent to child
// - The parent component passes data to this component via props
// - Props are read-only in the child component (this component cannot modify them)
// - This ensures a single source of truth for data
const props = withDefaults(defineProps<Props>(), {
  isPlaying: false,
  isLast: false,
  isFavorited: false,
});

// Events: Communication flows UP from child to parent
// - When something happens in this component (like a button click), we emit events
// - The parent component listens for these events and can update its state accordingly
// - This maintains Vue's unidirectional data flow: "props down, events up"
const emit = defineEmits<{
  play: [track: AudioFile];
  toggleFavorite: [trackId: string];
}>();

const handlePlay = () => {
  emit("play", props.track);
};

const handleToggleFavorite = () => {
  // TODO: Emit the 'toggleFavorite' event with the track's id
  // - The trackId should be the id from props.track
  // - Hint: Look at the handlePlay function above for an example of using emit()
  // - Hint: To see what fields are available on props.track, check the AudioFile
  //   type definition in src/types/index.ts

  // when handleToggleFavorite is triggered (by clicking the heart icon)
  // emit the "toggleFavorite" event with the corresponding track id
  emit("toggleFavorite", props.track.id);
};
</script>

<template>
  <v-list-item
    :class="[
      isPlaying ? 'bg-purple-50' : '',
      !isLast ? 'border-b border-gray-100' : '',
      'py-4',
    ]"
  >
    <!--
    TODO: Wrap the title text below in a v-list-item-title element
    - Wrap {{ track.title }} in a <v-list-item-title> tag
    - Add the classes 'font-medium text-gray-900' to the element
    -->

    <!-- set element, use classes to set font and color to match the figma prototype -->
    <v-list-item-title class="font-medium text-gray-900">{{
      track.title
    }}</v-list-item-title>

    <!--
    TODO: Wrap the artist text below in a v-list-item-subtitle element
    - Wrap {{ track.artist }} in a <v-list-item-subtitle> tag
    - Add the classes 'text-sm text-gray-500' to the element
    -->

    <!-- set element, use classes to set font and color to match the figma prototype -->
    <v-list-item-subtitle class="text-sm text-gray-500">{{
      track.artist
    }}</v-list-item-subtitle>

    <template #append>
      <div class="flex items-center gap-2 ml-2">
        <!-- Favorite Button -->
        <!--
        TODO: Implement the Favorite Button
        - Uncomment the favorite button code below
        - Add a click handler: @click="handleToggleFavorite"
        - The button should toggle the favorite state when clicked
        -->

        <!-- trigger the handleToggleFavorite event on click -->
        <v-btn
          @click="handleToggleFavorite"
          :icon="true"
          size="small"
          variant="text"
          color="grey-lighten-2"
        >
          <Heart
            :size="20"
            :fill="isFavorited ? 'currentColor' : 'none'"
            :class="isFavorited ? 'text-green-600' : 'text-gray-400'"
          />
        </v-btn>

        <!-- Play/Pause Button -->
        <!--
        TODO: Add the following properties to the v-btn below:
        - size="small"
        - rounded="circle"
        - color: Set the button color dynamically based on the playing state
          * If the track is playing, use 'primary'
          * If the track is not playing, use 'grey-lighten-2'
          * Hint: Use the ternary operator (condition ? valueIfTrue : valueIfFalse)
          * Note: Use :color (with a colon) instead of color because you're binding
            a JavaScript expression, not a static string. The colon is shorthand for
            v-bind:color and tells Vue to evaluate the value as JavaScript.
        -->

        <!-- add the small and circle properties, set the color to primary when track is
			playing and gray when not playing using JS expression -->
        <v-btn
          @click="handlePlay"
          :icon="true"
          size="small"
          rounded="circle"
          :color="isPlaying ? 'primary' : 'grey-lighten-2'"
        >
          <Pause v-if="isPlaying" :size="16" />
          <Play v-else :size="16" />
        </v-btn>
      </div>
    </template>
  </v-list-item>
</template>
