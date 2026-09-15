import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { urls, credentials } from '../src/data';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto(urls.login);
});

test.afterEach(async () => {
  await loginPage.closePage();
});

test.describe('Login', () => {
    test('LOG-01: Fazer login com credenciais válidas', async () => {
        await loginPage.login(credentials.valid.email, credentials.valid.password);
        
        const [welcomeMessage, signedInMessage] = await loginPage.validateLoginSuccess();
        await expect(welcomeMessage).toBeVisible();
        await expect(signedInMessage).toBeVisible();
    });

    test('LOG-02: Tentar login com credenciais inválidas', async () => {
        await loginPage.login(credentials.invalid.email, credentials.invalid.password);

        const errorMessage = await loginPage.validateLoginFailure();
        await expect(errorMessage).toBeVisible();
    });
});
