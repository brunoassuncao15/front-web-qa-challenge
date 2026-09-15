import { test, expect } from '@playwright/test';
import { UsersPage } from '../src/pages/users.page';

let usersPage: UsersPage;

test.beforeEach(async ({ page }) => {
  usersPage = new UsersPage(page);
  await usersPage.goto();
});

test.afterEach(async () => {
  await usersPage.closePage();
});

test.describe('Responsividade', () => {
    test('RSP-02: Executa a jornada crítica em emulação móvel para validar usabilidade em telas reduzidas.', async () => {
        await usersPage.goto();
        await usersPage.viewportSize(390, 844); // Emulação de dispositivo móvel (iPhone 12)

        const createdUserRow = await usersPage.createUser('Bruno Teste', 'bruno.teste@example.com', 'viewer');
        await expect(createdUserRow).toBeVisible();
        await expect(createdUserRow).not.toBeEmpty();
    });
});
