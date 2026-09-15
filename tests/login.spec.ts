import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

test.afterEach(async () => {
  await loginPage.closePage();
});

test.describe('Login', () => {
    test('LOG-01: Fazer login com credenciais válidas', async () => {
        await loginPage.login('test@playlab.com', 'Password123');

        const [welcomeMessage, signedInMessage] = await loginPage.validateLoginSuccess();
        await expect(welcomeMessage).toBeVisible();
        await expect(signedInMessage).toBeVisible();
    });

    test('LOG-02: Tentar login com credenciais inválidas', async () => {
        await loginPage.login('invalid@playlab.com', 'InvalidPassword123');

        const errorMessage = await loginPage.validateLoginFailure();
        await expect(errorMessage).toBeVisible();
    });
});
