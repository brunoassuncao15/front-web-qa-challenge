import { test, expect } from '@playwright/test';
import { UsersPage } from '../src/pages/users.page';
import { urls, users } from '../src/data';

let usersPage: UsersPage;

test.beforeEach(async ({ page }) => {
  usersPage = new UsersPage(page);
  await usersPage.goto(urls.base);
});

test.afterEach(async () => {
  await usersPage.closePage();
});

test.describe('Responsividade', () => {
    test('RSP-02: Executa a jornada crítica em emulação móvel para validar usabilidade em telas reduzidas.', async () => {
        await usersPage.goto();
        await usersPage.viewportSize(390, 844); // Emulação de dispositivo móvel (iPhone 12)

        const createdUserRow = await usersPage.createUser(
          users.newUser.name,
          users.newUser.email,
          users.newUser.role,
        );
        await expect(createdUserRow).toBeVisible();
        await expect(createdUserRow).not.toBeEmpty();
    });
});
