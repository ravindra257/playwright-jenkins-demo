
import { Locator, Page } from '@playwright/test';
import { HelperBase } from './helperBase';

export class NavigationPage extends HelperBase {

    // readonly page: Page
    // readonly locator: Locator
    constructor(page: Page){
        super(page)
    }
    async formLayoutsPage(){
        // await this.page.getByText('Forms').click()
        await this.selectGroupMenuItem('Forms')
        await this.waitForSomeSeconds(3);
        this.page.getByText('Form Layouts').click
    }
    async datePickerPage(){
       await this.selectGroupMenuItem('Form')
        // await this.page.waitForTimeout(4000);
        await this.page.getByText('Datepicker').click()
    }
    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }
    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }
    async tooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

   private async selectGroupMenuItem(formMenu: string){
        const groupMenuItem = await this.page.getByTitle(formMenu)
        const isExpanded = await groupMenuItem.getAttribute('aria-expanded')
        if(isExpanded == "false")
            groupMenuItem.click()
    }

    async formPage(){
    await this.clickButton(this.page.getByText('Forms'));
    await this.clickButton(this.page.getByText('Practice Form'));
    }
}
