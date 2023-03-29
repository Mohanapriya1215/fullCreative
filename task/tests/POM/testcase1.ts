import { expect, Locator, Page } from "@playwright/test";

export class TrelloBoardPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    //selectors
    loginLink = '[class="Buttonsstyles__Button-sc-1jwidxo-0 kTwZBr"]';
    emailField = '[id="user"]';
    continueButton = 'input[id="login"]';
    passwordField = 'input[name="password"]';
    loginButton = 'button[id="login-submit"]';
    createButton = '[data-testid="header-create-menu-button"]';
    createBoardSubMenu = '[data-testid="header-create-board-button"]';
    title = '[data-testid="create-board-title-input"]';
    createBoardButton = '[data-testid="create-board-submit-button"]';
    listTitle = '[placeholder="Enter list title…"]';
    addList = 'input[value="Add list"]';
    addCardLink = 'a[class="open-card-composer js-open-card-composer"]';
    cardTitle = 'textarea[placeholder="Enter a title for this card…"]';
    addCard = 'input[value="Add card"]';
    addedCard = 'span[class="list-card-title js-card-name"]';
    dropField = 'div[class="list js-list-content"]';
    cardListTitle = '//span[@class="list-card-title js-card-name"]/ancestor::div[@class="list js-list-content"]/div/textarea';
    profile = 'button[data-testid="header-member-menu-button"]';
    profileLogout = 'button[data-testid="account-menu-logout"] span';
    accountLogout = 'button[id="logout-submit"] span span';




    ///////
    async findLocators(selectors: string): Promise<Locator> {
        await this.page.waitForSelector(selectors);
        return this.page.locator(selectors)
    }
    async navigateToLoginPage() {
        await (await this.findLocators(this.loginLink)).click()
        await this.page.waitForURL('https://trello.com/login');
    }
    async verifyTheURL(url: RegExp) {
        await expect(this.page).toHaveURL(url);
        await this.page.waitForLoadState();
    }
    async loginToTheApplication(email: string, password: string) {
        await (await this.findLocators(this.emailField)).fill(email);
        await (await this.findLocators(this.continueButton)).click();
        await (await this.findLocators(this.passwordField)).fill(password);
        await (await this.findLocators(this.loginButton)).click();
        await this.page.waitForLoadState();
    }
    async createNewBoard(boardTitle: string) {
        await (await this.findLocators(this.createButton)).click();
        await (await this.findLocators(this.createBoardSubMenu)).click();
        await (await this.findLocators(this.title)).fill(boardTitle);
        await (await this.findLocators(this.createBoardButton)).click();
        await this.page.waitForLoadState();
    }

    async createListinBoard(listName: string) {
        await (await this.findLocators(this.listTitle)).fill(listName);
        await (await this.findLocators(this.addList)).click();
    }

    async createCardInList(cardName: string) {
        await (await this.findLocators(this.addCardLink)).first().click();
        await (await this.findLocators(this.cardTitle)).fill(cardName);
        await (await this.findLocators(this.addCard)).click();
    }
    async dragAndDropTheCard() {
        await this.page.locator(this.addedCard)
            .dragTo(this.page.locator(this.dropField).nth(1));
    }

    async verifyListNameOfAddedCard(listName: string) {
        const navigatedListName = (await this.findLocators(this.cardListTitle))
        expect(navigatedListName).toHaveText(listName);
    }

    async findCoordinatesOfAddedCard() {
        const box = await (await this.findLocators(this.addedCard)).boundingBox();
        console.log(`The X coordinate:${box?.x} and Y coordinate:${box?.y}`);
    }

    async logOutFromApplication() {
        await (await this.findLocators(this.profile)).click();
        await (await this.findLocators(this.profileLogout)).click();
        await this.page.waitForTimeout(4000);
        await (await this.findLocators(this.accountLogout)).click();
    }



}

