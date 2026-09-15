import { test, expect } from '@playwright/test';
import { BasePage } from '../src/pages/base.page';

let basePage: BasePage;

test.beforeEach(async ({ page }) => {
  basePage = new (BasePage as any)(page);
  await basePage.goto('https://playwrightlab.github.io/');
});

test.afterEach(async () => {
  await basePage.closePage();
});

test.describe('Acessibilidade (a11y)', () => {
  test('A11Y-06: Analisar conformidade WCAG na página inicial', async () => {
    const accessibilityScanResults = await basePage.checkAccessibility();

    expect(accessibilityScanResults.violations.length).toBeGreaterThan(0);
  });
});