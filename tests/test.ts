import { expect, test, type Page } from '@playwright/test';

test.describe("todo list", () => {
	test.beforeEach(async ({ page }) => {
	  // Go to the starting url before each test.
	  await page.goto("/");
	});

	async function addTodo(page: Page) {
		await page.getByRole('textbox').click();
		await page.getByRole('textbox').fill('test1');
		await page.getByRole('button', { name: 'Add' }).click();
	}

	test('todo page has expected h2', async ({ page }) => {
		await page.goto('/');
		expect(await page.textContent('h2')).toBe('TODO List');
	});

	test('add todo', async ({ page }) => {
		await addTodo(page);
		expect(await page.getByLabel('test1')).toBeVisible();

		//for temp
		//await page.getByLabel('test1').check();
	});

	test('click todo checkbox', async ({ page }) => {
		await addTodo(page);

		await page.getByLabel('test1').check();
		expect(await page.getByLabel('test1').isChecked()).toBeTruthy();
		await page.getByLabel('test1').uncheck();
		expect(await page.getByLabel('test1').isChecked()).toBeFalsy();
	});

	test('edit todo', async ({ page }) => {
		await addTodo(page);

		await page.getByRole('button', { name: 'Edit' }).nth(1).click();
		expect(await page.getByRole('button', { name: 'Save' })).toBeVisible();
		expect(await page.getByLabel('test1')).toBeNaN;

		await page.getByRole('textbox').nth(1).click();
		await page.getByRole('textbox').nth(1).fill('test2');
		await page.getByRole('button', { name: 'Save' }).click();
		expect(await page.getByText('test2')).toBeVisible;
	});

	test('delete todo', async ({ page }) => {
		await addTodo(page);

		await page.getByRole('button', { name: 'Delete' }).nth(1).click();
		expect(await page.getByLabel('test1')).toBeNaN;
	});
});
