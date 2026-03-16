import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
// dotenv.config({ path: `.env.local` });
// require('dotenv').config();
require('dotenv').config({
  path: `.env.${process.env.TEST_ENV || 'local'}`, // Defaults to local
});

// const env = process.env.ENV || 'local';

// const baseUrls = {
//   prod: 'https://prod.example.com',
//   qa: 'https://qa.example.com',
//   stage: 'https://stage.example.com',
// };
/**
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig({
  testDir: './tests',
  timeout: 1 * 60 * 1000,
  // Assertion timeout
  expect: {
    timeout: 30000},
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  workers: 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'json-test-report.json' }],
    ['junit', { outputFile: 'junit-test-report.xml' }],
    ['allure-playwright'],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: process.env.ENV == 'staging' ? 'https://staging.example.com' : 'https://www.example.com',
    // baseURL: 'https://playwright.dev/',
    // baseURL: baseUrls[env],
    baseURL: process.env.BASE_URL,
    testIdAttribute: 'data-tab-item',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: false,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'off',
    actionTimeout: 45000,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
   
    // trace: 'on-first-retry',
    browserName: 'chromium',
     viewport: null,
    launchOptions: {
      // 1
      args: ["--start-maximized"],
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] ,
        //  viewport: null, 
        // launchOptions: {
        //   // Pass the --start-maximized argument
        //   args: ['--start-maximized'], 
        // },
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // {
    //   name: 'stage',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     baseURL: 'https://staging.example.com', // Staging URL
    //     // retries: 2,
    //   },
    // },
    // {
    //   name: 'production',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     baseURL: 'https://production.example.com', // Production URL
    //     // retries: 0,
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
