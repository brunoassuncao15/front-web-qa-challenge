import {Page, Locator, expect} from '@playwright/test';

export class PaylabPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly userRows: Locator;
    readonly nameHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByPlaceholder('Search users...');
        this.userRows = page.locator('table tbody tr');
        this.nameHeader = page.getByRole('columnheader', { name: /name/i });
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

    async closePage() {
        await this.page.close();
    }
}