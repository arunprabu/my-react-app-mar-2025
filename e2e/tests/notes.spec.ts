import { test, expect } from '@playwright/test';

test.describe('Notes page | E2E', () => {
  test.beforeEach(async ({ page }) => {
    // clear notes storage to ensure test isolation; clear first then navigate
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.goto('/notes');
    await expect(page.getByRole('heading', { name: /Notes/i })).toBeVisible();
  });

  test('Add a note and verify list and localStorage', async ({ page }) => {
    await page.goto('/notes');
    await page.getByTestId('note-title').fill('E2E Note 1');
    await page.getByTestId('note-content').fill('Content for note 1');
    await page.click('[data-testid="add-note-button"]');
    await expect(page.getByText('E2E Note 1')).toBeVisible();
    const raw = await page.evaluate(() => localStorage.getItem('notes'));
    expect(raw).toBeTruthy();
    const arr = JSON.parse(raw as string);
    expect(arr.some((n: any) => n.title === 'E2E Note 1')).toBeTruthy();
  });

  test('Edit a note and verify update', async ({ page }) => {
    await page.goto('/notes');
    // Ensure we have at least one note to edit
    if (!(await page.getByText('E2E Note 1').isVisible())) {
      await page.getByTestId('note-title').fill('E2E Note 1');
      await page.getByTestId('note-content').fill('Content for note 1');
      await page.click('[data-testid="add-note-button"]');
      await expect(page.getByText('E2E Note 1')).toBeVisible();
    }
    // Edit first visible note
    const firstEdit = page.locator('[data-testid^="edit-note-"]').first();
    await firstEdit.click();
    // Change title
    const firstSave = page.locator('[data-testid^="save-note-"]').first();
    const titleInput = page.locator('[data-testid^="edit-note-title-"]').first();
    await titleInput.fill('E2E Note 1 - Updated');
    await firstSave.click();
    await expect(page.getByText('E2E Note 1 - Updated')).toBeVisible();
    const raw = await page.evaluate(() => localStorage.getItem('notes'));
    const arr = JSON.parse(raw as string);
    expect(arr.some((n: any) => n.title === 'E2E Note 1 - Updated')).toBeTruthy();
  });

  test('Delete a note', async ({ page }) => {
    await page.goto('/notes');
    // Add a note quickly then delete
    await page.getByTestId('note-title').fill('E2E Note To Delete');
    await page.getByTestId('note-content').fill('Delete me');
    await page.click('[data-testid="add-note-button"]');
    await expect(page.getByText('E2E Note To Delete')).toBeVisible();
    // Delete it
    const deleteButton = page.locator('[data-testid^="delete-note-"]').first();
    await deleteButton.click();
    await expect(page.getByText('E2E Note To Delete')).not.toBeVisible();
  });

  test('Notes persist after reload', async ({ page }) => {
    await page.goto('/notes');
    await page.getByTestId('note-title').fill('E2E Persist Note');
    await page.getByTestId('note-content').fill('Persist me');
    await page.getByTestId('add-note-button').click();
    await expect(page.getByText('E2E Persist Note')).toBeVisible();
    await page.reload();
    await expect(page.getByText('E2E Persist Note')).toBeVisible();
  });
});
