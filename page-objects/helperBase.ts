import { Page, Locator, expect, Dialog } from "@playwright/test";

export class HelperBase{

    readonly page: Page
    constructor(page: Page){
        this.page = page

    }
    async waitForSomeSeconds(time: number){
        await this.page.waitForTimeout(time * 1000)
    }
  // ==========================================
  // Private Utility
  // ==========================================

  private getLocator(selector: string | Locator): Locator {
    return typeof selector === 'string'
      ? this.page.locator(selector)
      : selector;
  }

  // ==========================================
  // 1. Enter Text
  // ==========================================

  async enterText(selector: string | Locator, text: string, clear: boolean = true): Promise<void> {
    const locator = this.getLocator(selector);
    await locator.waitFor({ state: 'visible' });

    if (clear) {
      await locator.fill('');
    }

    await locator.fill(text);
  }

  // ==========================================
  // 2. Click Button
  // ==========================================

  async clickButton(selector: string | Locator): Promise<void> {
    const locator = await this.getLocator(selector);
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  // ==========================================
  // 3. Select from Dropdown
  // ==========================================

  async selectDropdownByValue(selector: string | Locator, value: string): Promise<void> {
    const locator = this.getLocator(selector);
    // locator.click();
    await locator.selectOption({ value });
  }

  async selectDropdownByLabel(selector: string | Locator, label: string): Promise<void> {
    const locator = this.getLocator(selector);
    await locator.selectOption({ label });
  }

    async selectDropdownValue(
    dropdownLocator: string | Locator,
    optionText: string
  ) {
    const dropdown = this.getLocator(dropdownLocator);
    await dropdown.click();
    const option = this.page.getByText(optionText, { exact: true });
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  // ==========================================
  // 4. Check / Uncheck Checkbox
  // ==========================================

  async setCheckbox(selector: string | Locator, shouldCheck: boolean): Promise<void> {
    const locator = this.getLocator(selector);
    const isChecked = await locator.isChecked();

    if (shouldCheck && !isChecked) {
      await locator.check();
    }

    else if (!shouldCheck && isChecked) {
      await locator.uncheck();
    }
  }

  // ==========================================
  // 5. Select Value from Web Table
  // ==========================================

  async getParticularCellValue(
  tableSelector: string,
  rowMatchText: string,
  columnHeader: string
): Promise<string> {

  const table = this.getLocator(tableSelector);
  // page.locator(tableSelector);

  //1.Get column index dynamically from header
  // ==========================================
  await this.page.waitForTimeout(2000)
  const headers = table.locator('thead tr th');
  const headerCount = await headers.count();

  let columnIndex = -1;

  for (let i = 0; i < headerCount; i++) {
    const headerText = (await headers.nth(i).innerText()).trim();
    if (headerText === columnHeader) {
      columnIndex = i;
      break;
    }
  }

  if (columnIndex === -1) {
    throw new Error(`Column "${columnHeader}" not found`);
  }

  //2.Find the row containing the match text
  // ==========================================
  const row = table.locator('tbody tr', { hasText: rowMatchText });

  if (await row.count() === 0) {
    throw new Error(`Row containing "${rowMatchText}" not found`);
  }

  // 3️.Get the specific cell value
  // ==========================================
  const cell = row.first().locator('td').nth(columnIndex);

  const value = await cell.innerText();
  return value.trim();
}

  // ==========================================
  // 6. Tooltip Validation
  // ==========================================

  async validateTooltip(
    elementSelector: string | Locator,
    expectedText: string,
    tooltipSelector: string
  ): Promise<void> {
    const element = this.getLocator(elementSelector);

    await element.hover();

    const tooltip = this.page.locator(tooltipSelector);
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveText(expectedText);
  }

  // ==========================================
  // 7. Radio Button
  // ==========================================

  async selectRadioButton(selector: string | Locator): Promise<void> {
    const radio = this.getLocator(selector);
      // Wait until visible
    // await expect(radio).toBeVisible();
    await radio.waitFor({ state: 'visible' });

    // Check if enabled
    const isEnabled = await radio.isEnabled();
    if (!isEnabled) {
      throw new Error('Radio button is disabled');
    }

    // Check if already selected
    if (!(await radio.isChecked())) {
      await radio.check(); 
      console.log('Radio button selected');
    } else {
      console.log('Radio button already selected');
    }
  }

  async validateRadioSelected(selector: string | Locator): Promise<void> {
    const locator = this.getLocator(selector);
    await expect(locator).toBeChecked();
  }

  // ==========================================
  // 8. Dialog Box (Browser Native Dialog)
  // ==========================================

  async handleDialog(
    action: 'accept' | 'dismiss',
    expectedMessage?: string
  ): Promise<void> {

    this.page.once('dialog', async (dialog: Dialog) => {

      if (expectedMessage) {
        expect(dialog.message()).toContain(expectedMessage);
      }

      if (action === 'accept') {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
  }

  async setupGenericDialogHandler(promptDefaultValue: string = 'Default Input'): Promise<void> {
  this.page.on('dialog', async (dialog: Dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    console.log(`Dialog type: ${dialog.type()}`);
    
    switch (dialog.type()) {
      case 'prompt':
        await dialog.accept(promptDefaultValue);
        break;
      case 'confirm':
        // Decide whether to accept (OK) or dismiss (Cancel) based on context
        // This example accepts by default
        await dialog.accept(); 
        break;
      case 'alert':
      case 'beforeunload':
      default:
        await dialog.accept(); // Clicks OK by default
        break;
    }
  });
}

  // ==========================================
  // 9. Slider
  // ==========================================

  // async moveSlider(selector: string | Locator, targetValue: number): Promise<void> {
  //   const slider = this.getLocator(selector);

  //   const boundingBox = await slider.boundingBox();
  //   if (!boundingBox) throw new Error('Slider not visible');

  //   const x = boundingBox.x + (boundingBox.width * targetValue) / 100;
  //   const y = boundingBox.y + boundingBox.height / 2;
  // await this.page.waitForTimeout(3000)

  //   await this.page.mouse.click(x, y);
  // }

  async setSliderValue(sliderLocator: string | Locator,value: number): Promise<void>{
  const slider = this.getLocator(sliderLocator);
  await slider.fill(value.toString());
  await slider.dispatchEvent('change');
    }

}