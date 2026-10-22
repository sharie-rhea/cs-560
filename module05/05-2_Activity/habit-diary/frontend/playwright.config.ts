import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'npm run build && VITE_API_URL=http://localhost:3001 npm run preview',
      url: 'http://localhost:4173',
      reuseExistingServer: false,
    },
    {
      command: 'rm -f test_habit_diary.db && DB_PATH=test_habit_diary.db npm run migrate && PORT=3001 DB_PATH=test_habit_diary.db npm run dev',
      url: 'http://localhost:3001/api/activity-types',
      cwd: '../backend',
      reuseExistingServer: false,
    },
  ],
})
