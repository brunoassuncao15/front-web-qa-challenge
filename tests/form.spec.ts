import { test, expect } from '@playwright/test';
import { FormPage } from '../src/pages/form.page';
import { urls, formData } from '../src/data';

let formPage: FormPage;

test.beforeEach(async ({ page }) => {
  formPage = new FormPage(page);
  await formPage.goto(urls.base);
});

test.afterEach(async () => {
  await formPage.closePage();
});

test.describe('Componente formulario', () => {
    test('FRM-01: Submeter o formulário com dados válidos.', async () => {
        await formPage.fillForm(
          formData.valid.name,
          formData.valid.email,
          formData.valid.password,
          formData.valid.subscribe,
        );

        const successMessage = await formPage.verifySuccessMessage();
        await expect(successMessage).toBeVisible();
    });

    test('FRM-02: Valida o bloqueio de envio e a presença das mensagens de erro para campos obrigatórios.', async () => {
        await formPage.submitForm();
        await formPage.verifyErrorMessages();

        const { nameError, emailError, passwordError } = await formPage.verifyErrorMessages();
        await expect(nameError).toBeVisible();
        await expect(emailError).toBeVisible();
        await expect(passwordError).toBeVisible();
    });
});
