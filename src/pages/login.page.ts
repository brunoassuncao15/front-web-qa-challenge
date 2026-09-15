import {Page, Locator} from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByTestId('login-email');
        this.passwordInput = page.getByTestId('login-password');
        this.submitButton = page.getByTestId('login-submit');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async validateLoginSuccess() {
        const welcomeMessage = this.page.getByText('Welcome back!');
        const signedInMessage = this.page.getByText(/signed in as/i);

        return [welcomeMessage, signedInMessage];
    }

    async validateLoginFailure() {
        const errorMessage = this.page.getByText('Invalid credentials');
        return errorMessage;
    }
}