import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const users = JSON.parse(readFileSync(new URL('../fixtures/users.json', import.meta.url), 'utf-8')) as any[];
const posts = JSON.parse(readFileSync(new URL('../fixtures/posts.json', import.meta.url), 'utf-8')) as any[];

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

  test('Blogs page loads and shows posts list (mocked)', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/posts', route => {
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(posts) });
    });

    await page.goto('/blogs');
    await expect(page.getByText('Welcome to Blog Manager')).toBeVisible();
    // Check for our fixture posts in the UI
    await expect(page.getByText(posts[0].title)).toBeVisible();
    await expect(page.getByText(posts[1].title)).toBeVisible();
  });

  test('Add Blog form post (POST intercepted and verified)', async ({ page }) => {
    // intercept POST to JSONPlaceholder and respond with the created entity
    let payload: any = null;
    await page.route('https://jsonplaceholder.typicode.com/posts', async (route, request) => {
      if (request.method() === 'POST') {
        const body = await request.postDataJSON();
        payload = body;
        route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({ id: 101, ...body }) });
      } else {
        route.continue();
      }
    });

    await page.goto('/blogs/add');
    // Fill the form
    await page.fill('#titleInput', 'Blog Post Title');
    await page.fill('#bodyInput', 'Blog body content');
    await page.click('.submitBtn');

    // confirm it shows saved alert as implemented in the UI
    await expect(page.getByText('Saved Successfully')).toBeVisible();
    // ensure we intercepted the payload and it's the form values
    expect(payload).toEqual({ title: 'Blog Post Title', body: 'Blog body content' });
  });

  test('Edit Blog modal updates post (PUT intercepted and verified)', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/posts', route => {
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(posts) });
    });

    let payload: any = null;
    await page.route('https://jsonplaceholder.typicode.com/posts/*', async (route, request) => {
      if (request.method() === 'PUT') {
        const body = await request.postDataJSON();
        payload = body;
        route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ id: 1, ...body }) });
      } else {
        route.continue();
      }
    });

    await page.goto('/blogs');
    // click the first Edit button
    await page.getByRole('button', { name: 'Edit' }).first().click();
    // update values
    await page.fill('#editTitle', 'Edited Title');
    await page.fill('#editBody', 'Edited body content');
    await page.getByRole('button', { name: 'Save' }).click();
    // verify updated title is visible in the list
    await expect(page.getByText('Edited Title')).toBeVisible();
    expect(payload).toEqual({ title: 'Edited Title', body: 'Edited body content' });
  });

  test('Delete Blog modal removes post (DELETE intercepted and verified)', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/posts', route => {
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(posts) });
    });

    let deletedId: number | null = null;
    await page.route('https://jsonplaceholder.typicode.com/posts/*', async (route, request) => {
      if (request.method() === 'DELETE') {
        const segments = request.url().split('/');
        const id = Number(segments[segments.length - 1]);
        deletedId = id;
        route.fulfill({ status: 200 });
      } else {
        route.continue();
      }
    });

    await page.goto('/blogs');
    // click the first Delete button on the list
    await page.getByRole('button', { name: 'Delete' }).first().click();
    // modal should open; click Delete inside dialog
    const dialog = page.getByRole('dialog').first();
    await dialog.getByRole('button', { name: 'Delete' }).click();
    // the first post card should be removed from DOM (title not visible in card)
    const titleLocator = page.locator('h5.card-title', { hasText: posts[0].title });
    await expect(titleLocator).not.toBeVisible();
    expect(deletedId).toBe(posts[0].id);
  });
});
