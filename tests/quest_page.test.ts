import { test, expect } from '@playwright/test';
import { QuestPage } from '../pages/QuestPage.ts';
import { MainPage } from '../pages/MainPage.ts';
import { QuestConfigurationPage } from '../pages/QuestConfigurationPage.ts';
import { userInfo } from '../assets/test_data.ts';

test.describe("QA Quest page tests", () => {
    let questPage: QuestPage;
    let mainPage: MainPage;
    let questConfigurationPage: QuestConfigurationPage;


    test.beforeEach(async ({ page }) => {
        questPage = new QuestPage(page);
        questConfigurationPage = new QuestConfigurationPage(page);
        mainPage = new MainPage(page);
        await mainPage.open();
        await mainPage.clickStartQuestButton();
        await questConfigurationPage.populateTestQuestNameBox(userInfo.users.user1.name);
        await questConfigurationPage.populateTestQuestDescriptionBox(userInfo.users.user1.text);
        await questConfigurationPage.clickInfiniteQAAdventureButton();
        await questConfigurationPage.clickEmbarkOnTestingButton();
    })

    test("Verify QA Quest Name is visible", async ({ page }) => {
        await questPage.verifyQAQuestName(userInfo.users.user1.name);
    })

    test("Verify QA Adventure description is visible", async ({page})=>{
        await questPage.verifyQAQestDescription(userInfo.users.user1.text);
    })

    test("Verify the display of the default warrior characters", async ({ page }) => {
        await questPage.verifyDefaultWarriorCharactersDisplayed();
    })

    test("verify the default state of progress bar at 30%", async ({page})=>{
        await questPage.verifyInitialProgress();
    })

    test("Verify increasing progress by fixing bugs",async ({page})=>{
        await questPage.verifyInitialProgress();
        await questPage.clickFixBugButton();
        await questPage.verifyProgress("40%")
    })

    test("Verify decreasing progress by finding bugs",async ({page})=>{
        await questPage.verifyInitialProgress();
        await questPage.clickFindBugButton();
        await questPage.verifyProgress("20%")
    })

    test("Verify Victory Alert message", async ({ page }) => {
        for (let i = 0; i < 7; i++) {
            await questPage.clickFixBugButton();
        }
        await questPage.verifyProgress("100%")
        await questPage.verifyVictoryAlert();
    })

    test("Verify Victory Alert OK button", async ({ page }) => {
        for (let i = 0; i < 7; i++) {
            await questPage.clickFixBugButton();
        }
        await questPage.clickVictoryAlertOkButton();
        await questPage.verifyVictoryAlertNotVisible();
    })

    test("Verify Fail Alert Messege", async ({ page }) => {
        for (let i = 0; i < 3; i++) {
            await questPage.clickFindBugButton();
        }
        await questPage.verifyProgress("0%")
        await questPage.verifyFailAlert();
    })

    test("Verify Fail Alert OK button", async ({ page }) => {
        for (let i = 0; i < 3; i++) {
            await questPage.clickFindBugButton();
        }
        await questPage.clickFailAlertOkButton();
        await questPage.verifyFailAlertNotVisible();
    })

    test("Verify initial Bug Bonus field value to be 0", async ({ page }) => {
        await questPage.verifyBugBonusField();
    })

    test("Verify increase Bug Bonus by 10 by clicking Claim Bonus", async ({ page }) => {
        let num = 10;
        for (let i = 0; i<10; i++){
            await questPage.clickClaimBonusButton();
            await questPage.verifyBugBonusFieldIncrease(`${num}`);
            num +=10;
        }
    })

    test("Verify initial Artifact of Quality value to be 0", async ({ page }) => {
        await questPage.verifyArtifactOfQualityField();

    })

    test("Verify increase Artifact of Quality by 1 by clicking Obtain QA Artifact", async ({ page }) => {
        let num = 1;
        for (let i = 0; i < 10; i++) {
            await questPage.clickObtainQAAtrifactButton();
            await questPage.verifyArtifactOfQualityFieldIncrease(`${num}`);
            num += 1;
        }
    })

     test("Verify initial Days Off value to be 0", async ({ page }) => {
        await questPage.verifyDaysOffField();

    })

    test("Verify increase Artifact of Quality by 5 by clicking Obtain QA Artifact", async ({ page }) => {
        let num = 5;
        for (let i = 0; i < 10; i++) {
            await questPage.clickEarnDaysOffButton();
            await questPage.verifyDaysOffFieldIncrease(`${num}`);
            num += 5;
        }
    })

    test("Enter valid custom actions and verify notifications", async ({page})=>{
        let text = "Submit Bug Report"
        await questPage.populateCustomQAActionBox(text);
        await questPage.clickSubmitActionButton();
        await questPage.verifyActionAlertMessage(text);
        await questPage.clickActionAlertOkButton();
        await questPage.verifyActionAlertOkButtonNotVisible();
    })

    test("Enter empty custom actions and verify notifications", async ({page})=>{
        await questPage.populateCustomQAActionBox("");
        await questPage.clickSubmitActionButton();
        await questPage.verifyInvalidActionAlertMessage();
        await questPage.clickActionAlertOkButton();
        await questPage.verifyActionAlertOkButtonNotVisible();
    })

})