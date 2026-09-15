import { test, expect } from '@playwright/test';
import { PaylabPage } from '../src/paylab.page';

let paylabPage: PaylabPage;

test.beforeEach(async ({ page }) => {
  paylabPage = new PaylabPage(page);
  await paylabPage.goto();
});

test.afterEach(async () => {
  await paylabPage.closePage();
});

test.describe('Usuários', () => {
  test('USR-03: Valida a funcionalidade de busca e atualização da tabela.', async () => {
    await paylabPage.searchUser('Nora Jones');
    const userRow = await paylabPage.verifyUserVisible('Nora Jones');

    await expect(userRow).toBeVisible();
    await expect(userRow).not.toBeEmpty();
  });

  test('USR-05: Valida a reordenação por clique nos cabeçalhos da tabela.', async () => {
    await paylabPage.sortByName();
    await paylabPage.sortByName();

    const userRow = await paylabPage.verifyUserVisible('Alice Johnson');
    const userRow2 = await paylabPage.verifyUserVisible('Oscar Wilde');

    await expect(userRow).toHaveCount(0);
    await expect(userRow2).toBeVisible();
  });

  test('USR-08: Valida a funcionalidade de deletar um usuário na tabela.', async () => {
    const deletedUserRow = await paylabPage.deleteUser('Bob Smith', '2');

    await expect(deletedUserRow).toHaveCount(0);
  });
});