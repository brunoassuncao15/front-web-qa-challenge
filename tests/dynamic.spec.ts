import { test, expect } from '@playwright/test';
import { DynamicContentPage } from '../src/pages/dynamic-content.page';

let dynamicContentPage: DynamicContentPage;

test.beforeEach(async ({ page }) => {
  dynamicContentPage = new DynamicContentPage(page);
  await dynamicContentPage.goto('https://playwrightlab.github.io/');
});

test.afterEach(async () => {
  await dynamicContentPage.closePage();
});

test.describe('Componentes Dinâmicos', () => {
  test('DYN-01: Aguardar carregamento de elemento assíncrono sem sleep', async () => {

    const dynamicContent = await dynamicContentPage.loadContentClick();
    
    await expect(dynamicContent).toBeVisible();
    await expect(dynamicContent).toHaveText(/content loaded successfully!/i);
  });
});