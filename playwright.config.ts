import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
  },
  projects: [
    /* ================= DESKTOP ================= */
    {
      name: "Desktop Chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Desktop Firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "Desktop Safari",
      use: { ...devices["Desktop Safari"] },
    },

    /* ================= TABLET ================= */
    {
      name: "Tablet Safari Portrait",
      use: { ...devices["iPad (gen 7)"] },
    },
    {
      name: "Tablet Safari Landscape",
      use: { ...devices["iPad (gen 7) landscape"] },
    },
    {
      name: "Tablet Android Portrait",
      use: { ...devices["Galaxy Tab S4"] },
    },
    {
      name: "Tablet Android Landscape",
      use: { ...devices["Galaxy Tab S4 landscape"] },
    },

    /* ================= MOBILE ================= */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },

    /* ================= BRANDED ================= */
    {
      name: "Microsoft Edge",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
      },
    },
    {
      name: "Google Chrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
      },
    },
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3001",
    reuseExistingServer: !process.env.CI,
  },
})
