import { Page, BrowserContext, expect, Locator } from "@playwright/test";
import { names } from "unique-names-generator";

export default class ActionsWrapper {
	public page: Page;
	constructor(page: Page, public context: BrowserContext) {
		this.page = page;
	}

	async goto(url: string) {
		await this.page.goto(url, {
			waitUntil: "domcontentloaded"
		});
	}

	async clickLinkTextByText(text: string){
		const element = this.page.getByRole('link').getByText(text,{exact: true}).first();
		await element.waitFor({state:'visible'})
		await element.click();
	}
	async clickButtonByLabel(label: string){
		const element = this.page.getByRole('button').getByText(label);
		await element.waitFor({state:'visible'})
		await element.click();
	}
	async typeTextFieldValueByElementName(name: string, value: string){
		const element = this.page.locator(`input[name='${name}']`)
		await element.waitFor({state:'visible'})
		await element.fill(value)
	}
	async typeTextFieldValueByElementID(id: string, value: string){
		const element = this.page.locator(`input[id='${id}']`)
		await element.waitFor({state:'visible'})
		await element.fill(value)
	}
	async verifyPageHeader(text: string){
		const element = this.page.getByRole('heading').getByText(text,{exact: true});
		await element.waitFor({state:'visible'})
		expect(element,'Header does not diplayed')
	}
	async verifyPageLogo(name: string){
		const element = this.page.getByRole('img',{name: name})
		await element.waitFor({state:'visible'})
		expect(element,'Page logo does not diplayed')
	}
	async verifyBodyText(text: string){
		const element = this.page.getByText(text);
		await element.waitFor({state:'visible'})
		expect(element,'Body Text does not diplayed')
	}
	async browserNavigateBack(){
		this.page.goBack({timeout: 3000, waitUntil:'domcontentloaded'});
	}
	async selectFromDropdownByDropdownValue(value: string, elementID: string){
		const elementDropdown = this.page.locator(`#${elementID}`)
		await elementDropdown.waitFor({state:'visible'})
		await elementDropdown.selectOption(value)
	}
	async selectFromDropdownByDropdownValueByName(value: string, name: string){
		const elementDropdown = this.page.locator(`select[name='${name}']`)
		await elementDropdown.waitFor({state:'visible'})
		await elementDropdown.selectOption(value)
	}
	async getCreatedAccountID(){
		const element = this.page.locator(`#newAccountId`)
		await element.waitFor({state:'visible'})
		return await element.textContent()
	}
	async getAccountIDFromAccountsTable(){
		const element = this.page.getByRole('table').getByRole('link').first()
		await element.waitFor({state:'visible'})
		return await element.textContent()
	}
	async getAccountBalanceFromAccountsTable(accountID: string){
		const element = this.page.getByRole('link',{name:accountID}).locator('//parent::td//following-sibling::td').first();
		await element.waitFor({state:'visible'})
		return await element.textContent()
	}
	async getAccountAvailableAmountFromAccountsTable(accountID: string){
		const element = this.page.getByRole('link',{name:accountID}).locator('//parent::td//following-sibling::td').last();
		await element.waitFor({state:'visible'})
		return await element.textContent()
	}
}
