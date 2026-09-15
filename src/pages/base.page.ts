import { AxeBuilder } from '@axe-core/playwright';
import { Page } from '@playwright/test';

export abstract class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(path: string = ''): Promise<void> {
        await this.page.goto(path);
    }

    async checkAccessibility() {
        const results = await new AxeBuilder({ page: this.page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        return results;
    }

    async closePage() {
        await this.page.close();
    }
}