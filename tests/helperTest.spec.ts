import { test } from '@playwright/test';
import { HelperBase } from '../page-objects/helperBase';

test('UI Actions Example', async ({ page }) => {

  const helper = new HelperBase(page);

  await page.goto(process.env.DEMO_URL);



  // Click Button
  await helper.clickButton(page.getByText('Elements'));
  await helper.clickButton(page.getByText('Text Box'));

  // Enter Text
  await helper.enterText('#userName', 'admin');

  // Checkbox
  await helper.clickButton(page.getByText('Check Box'));
  await helper.setCheckbox(page.getByLabel('Select Home'), true);

 // Radio Button
  await helper.clickButton(page.getByText('Radio Button'));
  await helper.selectRadioButton('#yesRadio');

  // Table
  await helper.clickButton(page.getByText('Web Tables'));
  const firstName = await helper.getParticularCellValue('//table[contains(@class, "table-striped")]', 'Cierra', 'Email');
  console.info(firstName);

  // Select Dropdown
  await page.goto(process.env.DEMO_URL+'select-menu');
  await helper.selectDropdownValue('#withOptGroup', 'Group 1, option 1');
  await page.waitForTimeout(2000)
  await helper.selectDropdownByLabel('#oldSelectMenu', 'Blue');
  

  // Tooltip
  await helper.clickButton(page.getByText('Tool Tips'));
  await page.waitForTimeout(3000)
  await helper.validateTooltip('#toolTipButton', 'You hovered over the Button', '[role="tooltip"]');

   // Slider (move to 70%)
  await helper.clickButton(page.getByText('Slider'));
  await helper.setSliderValue('#slider', 72);
  

  /*Dialog*/
  await page.goto(process.env.ALERT_URL);
  await helper.clickButton(page.getByText('Prompt Alert'));
  await page.waitForTimeout(3000)
  await helper.setupGenericDialogHandler('enter your name');
   // await helper.clickButton(page.getByText('Alerts, Frame & Windows'));
  // await helper.clickButton(page.getByRole('link', { name: 'Alerts' }));
  // await helper.clickButton('#promtButton');
  // await helper.handleDialog('accept', 'Please enter your name');
  // await helper.clickButton('#deleteBtn');

 
});
