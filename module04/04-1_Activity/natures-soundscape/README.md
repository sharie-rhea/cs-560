# Nature Soundscape App

A soothing audio player application that brings the calming sounds of nature to you in a beautifully designed, responsive interface.

## Viewing this README

For the best reading experience, view this file with formatted markdown:

1. Open this project folder in VS Code
2. Open `README.md` in the editor
3. Open the Command Palette:
   - **Mac:** `Cmd + Shift + P`
   - **Windows/Linux (Codio):** `Ctrl + Shift + P`
4. Type "Markdown: Open Preview" and select it
5. The formatted README will open in a new panel

## Running the Code

1. Open a terminal window and navigate to this project directory
2. Install dependencies:
   ```bash
   npm i
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your web browser and navigate to the URL displayed in the terminal (typically `http://localhost:3000`)

## For Students

This project is a Vue 3 audio player application using Vuetify and Tailwind CSS. Your task is to implement the Figma prototype by completing the `AudioTrack` component.

### Getting Started

1. **Open the AudioTrack component**
   - Navigate to `src/components/AudioTrack.vue`
   - This file contains a skeleton with TODO comments guiding you

2. **Complete the TODOs**

   Follow the TODO comments in `AudioTrack.vue` to:
   - Wrap track title and artist in appropriate Vuetify components with styling
   - Configure the Play/Pause button with size, shape, and dynamic color
   - Implement and wire up the Favorite Button functionality
   - Emit the `toggleFavorite` event in the event handler

5. **Testing Your Work**
   - Click on tracks to play/pause them
   - Verify the play/pause icon toggles correctly
   - Ensure the heart counter works correctly
   - Check that track information displays properly
   - Ensure styling matches the design
