import {Page, Locator} from '@playwright/test';

export class UsersPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly userRows: Locator;
    readonly nameHeader: Locator;
    readonly addUserButton: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator
    readonly roleSelect: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByPlaceholder('Search users...');
        this.userRows = page.locator('table tbody tr');
        this.nameHeader = page.getByRole('columnheader', { name: /name/i });
        this.addUserButton = page.getByRole('button', { name: /add user/i });
        this.nameInput = page.getByTestId('new-user-name');
        this.emailInput = page.getByTestId('new-user-email');
        this.roleSelect = page.getByTestId('new-user-role');
        this.submitButton = page.getByTestId('modal-confirm');
    }

    async goto() {
        await this.page.goto('https://playwrightlab.github.io/');
    }

    async searchUser(name: string) {
        await this.searchInput.fill(name);
    }

    async sortByName() {
        await this.nameHeader.click();
    }

    async verifyUserVisible(userName: string) {
        const userRow = this.userRows.filter({ hasText: userName });
        return userRow;
    }

    async deleteUser(userName: string, id: string) {
        const userRow = this.userRows.filter({ hasText: userName });
        const deleteButton = userRow.getByTestId(`delete-${id}`);
        await deleteButton.click();

        return userRow;
    }

    async createUser(name: string, email: string, role: string) {
        const addUserButton = this.addUserButton;
        await addUserButton.click();

        const nameInput = this.nameInput;
        const emailInput = this.emailInput;
        const roleSelect = this.roleSelect;
        const submitButton = this.submitButton;

        await nameInput.fill(name);
        await emailInput.fill(email);
        await roleSelect.selectOption(role);
        await submitButton.click();

        const searchInput = this.searchInput;
        await searchInput.fill(name);

        const userRow = this.userRows.filter({ hasText: name });
        return userRow;
    }

    async viewportSize(width: number, height: number) {
        return this.page.setViewportSize({ width, height });
    }

    async closePage() {
        await this.page.close();
    }
}