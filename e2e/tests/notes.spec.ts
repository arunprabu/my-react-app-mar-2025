import { test, expect } from '@playwright/test';

test.describe('Notes page | E2E', () => {
  test('Add a note and verify list and localStorage', async ({ page }) => {
    await page.goto('/notes');
    await page.fill('#noteTitle', 'E2E Note 1');
    await page.fill('#noteContent', 'Content for note 1');
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
      await page.fill('#noteTitle', 'E2E Note 1');
      await page.fill('#noteContent', 'Content for note 1');
      await page.click('[data-testid="add-note-button"]');
      await expect(page.getByText('E2E Note 1')).toBeVisible();
    }
    // Edit first visible note
    const firstEdit = page.getByRole('button', { name: /Edit/i }).first();
    await firstEdit.click();
    // Change title
    const firstSave = page.getByRole('button', { name: /Save/i }).first();
    const titleInput = page.locator('input[id^="editTitle-"]').first();
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
    await page.fill('#noteTitle', 'E2E Note To Delete');
    await page.fill('#noteContent', 'Delete me');
    await page.click('[data-testid="add-note-button"]');
    await expect(page.getByText('E2E Note To Delete')).toBeVisible();
    // Delete it
    const deleteButton = page.getByRole('button', { name: /Delete/i }).filter({ hasText: 'Delete' }).first();
    await deleteButton.click();
    await expect(page.getByText('E2E Note To Delete')).not.toBeVisible();
  });

  test('Notes persist after reload', async ({ page }) => {
    await page.goto('/notes');
    await page.fill('#noteTitle', 'E2E Persist Note');
    await page.fill('#noteContent', 'Persist me');
    await page.click('[data-testid="add-note-button"]');
    await expect(page.getByText('E2E Persist Note')).toBeVisible();
    await page.reload();
    await expect(page.getByText('E2E Persist Note')).toBeVisible();
  });
});
