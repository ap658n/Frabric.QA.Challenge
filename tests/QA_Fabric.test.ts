import { test } from '../core/base/baseTest';
import { DataGenerator } from '../core/helper/dataGenerator';
import { data } from '../core/helper/propertyData';
import * as Data from '../test-data/userRegistration.json'


test.describe("CHALLENGE - Para Bank", async () => {
  test.describe.configure({ mode: 'default' });

  test.beforeEach('Given user has test data, valid url and already in the Para Bank page.', async ({ home, baseURL }) => {
    await test.step('When user navigated to QA Practice site.', async () => {
      await home.navigateToParaBankSite(baseURL);
    });
    await test.step('Then Para Bank logo should be displayed.', async () => {
      await home.verifyPageLogo();
    })

  })
  test('TC001-As a user I should be able to perform end to end flow from create user > create savings > transfer amounts > verfiy transaction. @TC001 @e2e @QA', async ({ home, registerUser, userAccount, findTransactionsAPI }) => {
    const firstName = DataGenerator.generateFirstName();
    const lastName = DataGenerator.generateLastName();
    const phoneNumber = DataGenerator.generatePhoneNumber(Data.TC001['user.address'].country);
    const username = DataGenerator.generateTimeStamp('YYMMDDhhmm');
    const password = 'Passn0w@';
    await test.step('When user navigated to Registration page.', async () => {
      await home.navigateToRegistrationPage();
      await registerUser.validateUserRegistrationPage();
    })
    await test.step('And user filled all required fields .', async () => {
      await registerUser.enterFirstName(firstName)
      await registerUser.enterLastName(lastName)
      await registerUser.enterAddress(Data.TC001['user.address'].address)
      await registerUser.enterCity(Data.TC001['user.address'].city)
      await registerUser.enterState(Data.TC001['user.address'].state)
      await registerUser.enterZipCode(Data.TC001['user.address'].zipCode)
      await registerUser.enterPhoneNumber(phoneNumber)
      await registerUser.enterSSN(Data.TC001['user.address'].ssn)
      await registerUser.enterUsername(username)
      await registerUser.enterPassword(password)
      await registerUser.enterConfirmPassword(data.getProperty('created_password'))
    })
    await test.step('And user proceed to user registration.', async () => {
      await registerUser.clickRegister()
    })
    await test.step('Then system should display created account page.', async () => {
      await userAccount.validateUserAccountPage()
    })
    await test.step('And navigates to global menu.', async () => {
      await home.navigateToHomePageFromNavHeader()
      await home.navigateToAboutPageFromNavHeader()
      await home.navigateToContactPageFromNavHeader()
      await home.navigateToAboutUsPageFromGlobalMenu()
      await home.navigateToServicesPageFromGlobalMenu()
      await home.navigateToProductsPageFromGlobalMenu()
      await home.navigateToLocationsPageFromGlobalMenu()
      await home.navigateToAdministrationPageFromGlobalMenu()
    })
    await test.step('When user navigates to Accounts Overview.', async () => {
      await userAccount.navigateToAccountsOverview()
    })
    await test.step('Then user gets initial account.', async () => {
      await userAccount.getInitialAccountID()
      await userAccount.getInitialAccountBalance(data.getProperty('init_account'))
      await userAccount.getInitialAccountAvailableAmount(data.getProperty('init_account'))
    })
    await test.step('When user navigates to open new account.', async () => {
      await userAccount.navigateToOpenNewAccount()
    })
    await test.step('And user creates new savings account.', async () => {
      await userAccount.selectAccountType(Data.TC001['user.account'].type)
      await userAccount.selectAccountNumber(data.getProperty('init_account'))
      await userAccount.proceedToOpenNewAccount()
      await userAccount.verifyAccountCreatedSuccessfully()
    })

    await test.step('When user navigates to Accounts Overview.', async () => {
      await userAccount.navigateToAccountsOverview()
    })
    await test.step('And validate Accounts balance.', async () => {
      await userAccount.verifyAccountBalance(data.getProperty('init_account'), '$415.50')
      await userAccount.verifyAccountBalance(data.getProperty('new_account'), '$100.00')
    })
    await test.step('Then validate Accounts available amount.', async () => {
      await userAccount.verifyAccountAvailableAmount(data.getProperty('init_account'), '$415.50')
      await userAccount.verifyAccountAvailableAmount(data.getProperty('new_account'), '$100.00')
    })
    await test.step('When user navigates to Transfer Funds.', async () => {
      await userAccount.navigateToTransferFunds()
    })
    await test.step('And user transfer amount from new account to old account.', async () => {
      await userAccount.transferAmount(data.getProperty('new_account'), data.getProperty('init_account'), '2.00')
    })
    await test.step('Then user should verify new balance in accounts overview.', async () => {
      await userAccount.navigateToAccountsOverview()
      await userAccount.verifyAccountBalance(data.getProperty('new_account'), '$98.00')
      await userAccount.verifyAccountAvailableAmount(data.getProperty('new_account'), '$98.00')
      await userAccount.verifyAccountBalance(data.getProperty('init_account'), '$417.50')
      await userAccount.verifyAccountAvailableAmount(data.getProperty('init_account'), '$417.50')
    })
    await test.step('When user navigates to Bill Pay.', async () => {
      await userAccount.navigateToBillPay()
    })
    await test.step('And user Pay Bills.', async () => {
      await userAccount.enterPayeeName(Data.TC001['user.bills']['payee.name'])
      await userAccount.enterPayeeAddress(Data.TC001['user.bills'].address)
      await userAccount.enterPayeeCity(Data.TC001['user.bills'].city)
      await userAccount.enterPayeeState(Data.TC001['user.bills'].state)
      await userAccount.enterPayeeZipCode(Data.TC001['user.bills'].zipCode)
      await userAccount.enterPayeePhone(Data.TC001['user.bills'].phone)
      await userAccount.enterPayeeAccount(Data.TC001['user.bills'].account)
      await userAccount.enterPayeeVerifyAccount(Data.TC001['user.bills']['verify.account '])
      await userAccount.enterPayeeAmountToPay(Data.TC001['user.bills'].amount)
      await userAccount.selectBillPayAccountNumber(data.getProperty('new_account'))
    })
    await test.step('Then user proceed to send payment.', async () => {
      await userAccount.proceedToSendPayment()
    })
    await test.step('And user verify send payment details.', async () => {
      await userAccount.verifySendPaymentSuccessfully(Data.TC001['user.bills'].amount,data.getProperty('new_account'))
    })
    await test.step('And user should verify new balance in accounts overview.', async () => {
      await userAccount.navigateToAccountsOverview()
      await userAccount.verifyAccountBalance(data.getProperty('new_account'), '$88.00')
      await userAccount.verifyAccountAvailableAmount(data.getProperty('new_account'), '$88.00')
      await userAccount.verifyAccountBalance(data.getProperty('init_account'), '$417.50')
      await userAccount.verifyAccountAvailableAmount(data.getProperty('init_account'), '$417.50')
    })
    await test.step('When user verify transactions via API', async () => {
      await findTransactionsAPI.getAndVerifyTransactions(data.getProperty('new_account'),'10')
    })
    
    await test.step('When user proceed to logout.', async () => {
      await userAccount.proceedToUserLogout()
    })
    await test.step('Then user should be redirectd to login page.', async () => {
      await home.verifyCustomerLogInHeading()
    })

  })
});