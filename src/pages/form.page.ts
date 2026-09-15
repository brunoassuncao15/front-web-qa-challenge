import {Page, Locator} from '@playwright/test';
import { BasePage } from './base.page';

export class FormPage extends BasePage {
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly checkboxInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.nameInput = page.getByTestId('input-fullname');
        this.emailInput = page.getByTestId('input-email');
        this.passwordInput = page.getByTestId('input-password');
        this.checkboxInput = page.getByTestId('check-terms');
        this.submitButton = page.getByRole('button', { name: /register/i });
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async fillForm(name: string, email: string, password: string, acceptTerms: boolean) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        if (acceptTerms) {
            await this.checkboxInput.check();
        }

        await this.submitForm();
    }

    async verifySuccessMessage() {
        const successMessage = this.page.getByText('Registration successful! Welcome aboard.');
        return successMessage;
    }

    async verifyErrorMessages() {
        const nameError = this.page.getByTestId('error-fullname');
        const emailError = this.page.getByTestId('error-email');
        const passwordError = this.page.getByTestId('error-password');
        
        return { nameError, emailError, passwordError };
    }
}