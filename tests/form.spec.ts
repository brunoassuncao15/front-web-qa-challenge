import { test, expect } from '@playwright/test';
import { FormsPage } from '../src/pages/forms.page';

let formsPage: FormsPage;

test.beforeEach(async ({ page }) => {
  formsPage = new FormsPage(page);
  await formsPage.goto();
});

test.afterEach(async () => {
  await formsPage.closePage();
});

test.describe('Componente formulario', () => {
    test('FRM-01: Submeter o formulário com dados válidos.', async () => {
        await formsPage.fillForm('Bruno Teste', 'bruno.teste@example.com', 'Senha123', true);

        const successMessage = await formsPage.verifySuccessMessage();
        await expect(successMessage).toBeVisible();
    });

    test('FRM-02: Valida o bloqueio de envio e a presença das mensagens de erro para campos obrigatórios.', async () => {
        await formsPage.submitForm();
        await formsPage.verifyErrorMessages();

        const { nameError, emailError, passwordError } = await formsPage.verifyErrorMessages();
        await expect(nameError).toBeVisible();
        await expect(emailError).toBeVisible();
        await expect(passwordError).toBeVisible();
    });
});
