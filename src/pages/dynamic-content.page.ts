import {Page, Locator} from '@playwright/test';
import { BasePage } from './base.page';

export class DynamicContentPage extends BasePage {
    readonly loadContentButton: Locator;
    readonly dynamicContent: Locator;


    constructor(page: Page) {
        super(page);
        this.loadContentButton = page.getByRole('button', { name: /load content/i });
        this.dynamicContent = page.getByTestId('loaded-data');
    }

    async loadContentClick() {
        await this.page.route('**/*', (route) => {
            const url = route.request().url();
            if (url.includes('click.php') || url.includes('bsotrck') || url.includes('boldastrosafe') || !url.includes('playwrightlab.github.io')) {
                if (url !== 'https://playwrightlab.github.io/index.html' && url !== 'https://playwrightlab.github.io/index.html') {
                  return route.abort();
                }
            }
            return route.continue();
        });

        await this.page.addInitScript(() => {
            window.open = () => null;
        });
            
        await this.loadContentButton.click();

        await this.loadContentButton.click({ force: true });

        const dynamicContent = await this.dynamicContent;
        return dynamicContent;
    }
}