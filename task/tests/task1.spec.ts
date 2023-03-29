import { test, expect } from "@playwright/test";
import { TrelloBoardPage } from "./POM/testcase1";
let trelloboardpage: TrelloBoardPage;
test.describe('Trello board task', () => {

    test('Login to the application', async ({ page }) => {

        await page.goto('https://trello.com/');
        await page.waitForLoadState();
        trelloboardpage = new TrelloBoardPage(page);
        await trelloboardpage.navigateToLoginPage();
        await trelloboardpage.verifyTheURL(/.*login/);
        await trelloboardpage.loginToTheApplication('mohanaprakash15@gmail.com', 'Priya@12.')
        await trelloboardpage.createNewBoard('QA tasks')
        await trelloboardpage.createListinBoard('List A');
        await trelloboardpage.createListinBoard('List B');
        await trelloboardpage.createCardInList('testcase1');
        await trelloboardpage.dragAndDropTheCard();
        await trelloboardpage.verifyListNameOfAddedCard('List B');
        await trelloboardpage.findCoordinatesOfAddedCard();
        await trelloboardpage.logOutFromApplication();
        


    })
})