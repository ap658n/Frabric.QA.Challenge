import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Set default timeout */
  timeout: 60000, // Test timeout: 60 seconds
  globalTimeout: 300000, // Global timeout: 5 minutes
  use: {
    actionTimeout: 10000, // Action timeout: 10 seconds
    trace: 'on-first-retry',
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['playwright-json-summary-reporter'],
    // ['html'], // other reporters
    // ['dot'],
    ['list'],
    ['json', { outputFile: 'results.json' }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium-qa',
      use: {
        browserName:'chromium',
        baseURL:'https://parabank.parasoft.com/', 
        ...devices['Desktop Chrome'],
        viewport: {width: 1440, height: 900},
        isMobile: false,
      },
        
    },

    {
      name: 'firefox-qa',
      use: {
        browserName:'firefox',
        baseURL:'https://parabank.parasoft.com/', 
        ...devices['Desktop Firefox'],
        viewport: {width: 1440, height: 900},
        isMobile: false,
      },
    },

    {
      name: 'webkit-qa',
      use: {
        browserName:'webkit',
        baseURL:'https://parabank.parasoft.com/', 
        ...devices['Desktop Safari'],
        viewport: {width: 1440, height: 900},
        isMobile: false
      },
    },

   
  ],

});
