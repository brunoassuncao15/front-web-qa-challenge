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

test.describe('Usuários', () => {
  test('USR-03: Valida a funcionalidade de busca e atualização da tabela.', async () => {
    await usersPage.searchUser(users.searchNames.nora);
    const userRow = await usersPage.verifyUserVisible(users.searchNames.nora);

    await expect(userRow).toBeVisible();
    await expect(userRow).not.toBeEmpty();
  });

  test('USR-05: Valida a reordenação por clique nos cabeçalhos da tabela.', async () => {
    await usersPage.sortByName();
    await usersPage.sortByName();

    const userRow = await usersPage.verifyUserVisible(users.searchNames.alice);
    const userRow2 = await usersPage.verifyUserVisible(users.searchNames.oscar);

    await expect(userRow).toHaveCount(0);
    await expect(userRow2).toBeVisible();
  });

  test('USR-08: Valida a funcionalidade de deletar um usuário na tabela.', async () => {
    const deletedUserRow = await usersPage.deleteUser(users.searchNames.bob, '2');

    await expect(deletedUserRow).toHaveCount(0);
  });
});