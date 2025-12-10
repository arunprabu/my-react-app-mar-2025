import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const users = JSON.parse(readFileSync(new URL('../fixtures/users.json', import.meta.url), 'utf-8')) as any[];

test.describe('My React App | E2E', () => {
  test('Home page and navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /React App Demo/i })).toBeVisible();
    // navigation to Netflix (scope to header nav to avoid duplicates in footer)
    await page.locator('nav').getByRole('link', { name: /Netflix/i }).click();
    await expect(page.getByRole('heading', { name: /Welcome to Netflix/i })).toBeVisible();
  });

  test('Employees page loads and shows employees list (mocked)', async ({ page }) => {
    // Intercept network request to jsonplaceholder and return the fixture
    await page.route('https://jsonplaceholder.typicode.com/users', route => {
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(users) });
    });

    await page.goto('/employees');

    // wait for the content to render
    await expect(page.getByText('Welcome to Employee Manager')).toBeVisible();
    // Check for our fixtures in the UI
    await expect(page.getByText('Leanne Graham')).toBeVisible();
    await expect(page.getByText('Ervin Howell')).toBeVisible();
  });

  test('Add Employee form post (POST intercepted and verified)', async ({ page }) => {
    // intercept POST to JSONPlaceholder and respond with the created entity
    let payload: any = null;
    await page.route('https://jsonplaceholder.typicode.com/users', async (route, request) => {
      if (request.method() === 'POST') {
        const body = await request.postDataJSON();
        payload = body;
        route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({ id: 101, ...body }) });
      } else {
        route.continue();
      }
    });

    await page.goto('/employees/add');
    // Fill the form
    await page.fill('#nameInput', 'John Doe');
    await page.fill('#phoneInput', '1234567890');
    await page.fill('#emailInput', 'john@example.com');
    await page.click('.submitBtn');

    // confirm it shows saved alert as implemented in the UI
    await expect(page.getByText('Saved Successfully')).toBeVisible();
    // ensure we intercepted the payload and it's the form values
    expect(payload).toEqual({ employeeName: 'John Doe', phone: '1234567890', email: 'john@example.com' });
  });

  test('Spotify playlist: add a song to playlist', async ({ page }) => {
    await page.goto('/spotify');
    // Add first track (scope add button within the Audio Tracks card)
    await page.getByRole('heading', { name: /Audio Tracks/i }).locator('..').getByRole('button', { name: '+' }).first().click();
    // Verify playlist shows the song title in MyPlaylist and scoped list item
    const playlistHeading = page.getByRole('heading', { name: /My Playlist/i });
    await expect(playlistHeading).toBeVisible();
    await expect(playlistHeading.locator('..').getByRole('listitem')).toBeVisible();
  });
});
