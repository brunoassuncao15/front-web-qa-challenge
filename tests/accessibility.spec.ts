import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { UsersPage } from '../src/pages/users.page';

let usersPage: UsersPage;

test.beforeEach(async ({ page }) => {
  usersPage = new UsersPage(page);
  await usersPage.goto();
});

test.afterEach(async () => {
  await usersPage.closePage();
});

test.describe('Acessibilidade (a11y)', () => {
  test('A11Y-06: Analisar conformidade WCAG na página inicial', async () => {
    const accessibilityScanResults = await usersPage.checkAccessibility();

    expect(accessibilityScanResults.violations.length).toBeGreaterThan(0);
  });
});