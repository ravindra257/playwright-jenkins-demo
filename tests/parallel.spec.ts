// tests/independent-tests.spec.ts
import { test, expect } from '@playwright/test';

// Enable parallel execution for tests in this file
test.describe.configure({ mode: 'parallel' });

test.skip('test 1', async ({ page }) => {
  // Runs in parallel with test 2 and 3
  await page.goto("/");
});

test.skip('test 2', async ({ page }) => {
  // Runs in parallel with test 1 and 3
});

test.skip('test 3', async ({ page }) => {
  // Runs in parallel with test 1 and 2
});