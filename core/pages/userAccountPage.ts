import { BrowserContext, expect, Page } from "@playwright/test";
import ActionsWrapper from "../wrapper/actions";
import { data } from "../helper/propertyData";
import { assert } from "console";
import FindTransactionsAPI from "../webServices/findTransactionsAPI";

export default class UserAccountPage {

    private actions: ActionsWrapper;
    private findTransactionsAPI: FindTransactionsAPI;

    constructor(public readonly page: Page, public readonly context: BrowserContext) {
        this.actions = new ActionsWrapper(page, context);
    }
    private elementsAttribute = {

    }

    async validateUserAccountPage() {
        console.log(`Verify User Registration.`);
        await this.actions.verifyPageHeader('Welcome ' + data.getProperty('created_username'))

    }
    async navigateToOpenNewAccount() {
        console.log(`User navigate to Open New Account.`);
        await this.actions.clickLinkTextByText('Open New Account')
        await this.actions.verifyPageHeader('Open New Account')
    }

    async navigateToAccountsOverview() {
        console.log(`User navigate to Accounts Overview.`);
        await this.actions.clickLinkTextByText('Accounts Overview')
        await this.actions.verifyPageHeader('Accounts Overview')
    }
    async navigateToTransferFunds() {
        console.log(`User navigate to Transfer Funds.`);
        await this.actions.clickLinkTextByText('Transfer Funds')
        await this.actions.verifyPageHeader('Transfer Funds')
    }

    async navigateToBillPay() {
        console.log(`User navigate to Open Bill Pay.`);
        await this.actions.clickLinkTextByText('Bill Pay')
        await this.actions.verifyPageHeader('Bill Payment Service')
    }
    async navigateToFindTransactions() {
        console.log(`User navigate to Find Transactions.`);
        await this.actions.clickLinkTextByText('Find Transactions')
        await this.actions.verifyPageHeader('Find Transactions')
    }
    async navigateToUpdateContactInfo() {
        console.log(`User navigate to Update Contact Info.`);
        await this.actions.clickLinkTextByText('Update Contact Info')
        await this.actions.verifyPageHeader('Update Profile')
    }
    async navigateToRequestLoan() {
        console.log(`User navigate to Request Loan.`);
        await this.actions.clickLinkTextByText('Request Loan')
        await this.actions.verifyPageHeader('Apply for a Loan')
    }
    async proceedToUserLogout() {
        console.log(`User navigate to Log Out.`);
        await this.actions.clickLinkTextByText('Log Out')
    }

    async selectAccountType(accountType: string) {
        console.log(`User select account type ${accountType}.`);
        await this.actions.selectFromDropdownByDropdownValue(accountType, 'type')
    }
    async selectAccountNumber(accountNumber: string) {
        console.log(`User select account number ${accountNumber}.`);
        await this.actions.selectFromDropdownByDropdownValue(accountNumber, 'fromAccountId')
    }
    
    async proceedToOpenNewAccount() {
        console.log('User proceed to open new account.')
        await this.actions.clickButtonByLabel('Open New Account')
    }
    async verifyAccountCreatedSuccessfully() {
        console.log(`Verify Account Opened!`);
        await this.actions.verifyPageHeader('Account Opened!')
        await this.actions.verifyBodyText('Congratulations, your account is now open.')
        const accountID = await this.actions.getCreatedAccountID()
        data.setProperty('new_account', String(accountID))

    }
    async getInitialAccountID() {
        console.log('User get initial account.')
        const accountID = await this.actions.getAccountIDFromAccountsTable()
        data.setProperty('init_account', String(accountID))

    }
    async getInitialAccountBalance(accountID: string) {
        console.log('User get initial account balance.')
        const amount = await this.actions.getAccountBalanceFromAccountsTable(accountID)
        data.setProperty('init_accountBalance', String(amount))

    }
    async getInitialAccountAvailableAmount(accountID: string) {
        console.log('User get initial account available amount.')
        const amount = await this.actions.getAccountAvailableAmountFromAccountsTable(accountID)
        data.setProperty('init_accountAvailableAmount', String(amount))
    }
    async verifyAccountAvailableAmount(accountID: string, expectedAmount: string) {
        console.log(`User verify ${accountID} account available amount`)
        const amount = await this.actions.getAccountAvailableAmountFromAccountsTable(accountID)
        data.setProperty(`${accountID}_availableAmount`, String(amount))
        expect(amount,'Available amount does not match!').toMatch(expectedAmount)
    }
    async verifyAccountBalance(accountID: string, expectedAmount: string) {
        console.log(`User verify ${accountID} account balance.`)
        const amount = await this.actions.getAccountBalanceFromAccountsTable(accountID)
        data.setProperty(`${accountID}_balance`, String(amount))
        expect(amount,'Balance does not match!').toMatch(expectedAmount)
    }
    async transferAmount(accountIDFrom: string, accountIDTo: string, amount: string) {
        console.log(`User transfer amount ${amount} from account ${accountIDFrom} to account ${accountIDTo}.`)
        await this.actions.typeTextFieldValueByElementID('amount',amount)
        await this.actions.selectFromDropdownByDropdownValue(accountIDFrom,'fromAccountId')
        await this.actions.selectFromDropdownByDropdownValue(accountIDTo,'toAccountId')
        await this.actions.clickButtonByLabel('Transfer')
    }

    async enterPayeeName(value: string){
        console.log(`User enter Payee Name ${value}.`);
        await this.actions.typeTextFieldValueByElementName('payee.name',value)
    }
    async enterPayeeAddress(value: string){
        console.log(`User enter Payee Address ${value}.`);
        await this.actions.typeTextFieldValueByElementName('payee.address.street',value)
    }
    async enterPayeeCity(value: string){
        console.log(`User enter Payee City ${value}.`);
        await this.actions.typeTextFieldValueByElementName('payee.address.city',value)
    }
    async enterPayeeState(value: string){
        console.log(`User enter Payee State ${value}.`);
        await this.actions.typeTextFieldValueByElementName('payee.address.state',value)
    }
    async enterPayeeZipCode(value: string){
        console.log(`User enter Payee Zip Code ${value}.`);
        await this.actions.typeTextFieldValueByElementName('payee.address.zipCode',value)
    }
    async enterPayeePhone(value: string){
        console.log(`User enter Payee name ${value}.`);
        await this.actions.typeTextFieldValueByElementName('payee.phoneNumber',value)
    }
    async enterPayeeAccount (value: string){
        console.log(`User enter Payee Account ${value}.`);
        await this.actions.typeTextFieldValueByElementName('payee.accountNumber',value)
    }
    async enterPayeeVerifyAccount(value: string){
        console.log(`User enter Payee Verify Account ${value}.`);
        await this.actions.typeTextFieldValueByElementName('verifyAccount',value)
    }
    async enterPayeeAmountToPay(value: string){
        console.log(`User enter Payee amount to pay ${value}.`);
        await this.actions.typeTextFieldValueByElementName('amount',value)
    }

    async proceedToSendPayment() {
        console.log(`User proceed to send payment.`);
        await this.actions.clickButtonByLabel('Send Payment')
    }
    async verifySendPaymentSuccessfully(amount: string, accountID : string) {
        console.log(`Verify Send Payment Successful`);
        await this.actions.verifyPageHeader('Bill Payment Complete')
        await this.actions.verifyBodyText(`Bill Payment to test in the amount of $${amount} from account ${accountID} was successful.`)
    }
    async selectBillPayAccountNumber(accountNumber: string) {
        console.log(`User select account number ${accountNumber}.`);
        await this.actions.selectFromDropdownByDropdownValueByName(accountNumber, 'fromAccountId')
    }
    
}