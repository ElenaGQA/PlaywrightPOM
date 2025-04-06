import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage.ts';
import { QuestConfigurationPage } from '../pages/QuestConfigurationPage.ts';
import { userInfo, dropdownOptions } from '../assets/test_data.ts';
import { verify } from 'crypto';

test.describe("QA Adventure Configuration page tests", () => {
    let mainPage: MainPage;
    let questConfigurationPage: QuestConfigurationPage;


    test.beforeEach(async ({ page }) => {
        questConfigurationPage = new QuestConfigurationPage(page);
        mainPage = new MainPage(page);
        await mainPage.open();
        await mainPage.clickStartQuestButton();
    })

    test("Verify page title and page UI", async ({page})=>{
        await questConfigurationPage.verifyQAAdventurePageName();
        await questConfigurationPage.verifyColorInfiniteQAAdventureButton();
    })

    test("QA adventure page fields should be functional", async ({ page }) => {
        await questConfigurationPage.populateTestQuestNameBox(userInfo.users.user1.name);
        await questConfigurationPage.populateTestQuestDescriptionBox(userInfo.users.user1.text);
        await questConfigurationPage.selectComplexityLevelDropdown(dropdownOptions.NoobQA);
        await questConfigurationPage.selectComplexityLevelDropdown(dropdownOptions.SeniorQA);
        await questConfigurationPage.selectComplexityLevelDropdown(dropdownOptions.TestNinja);
        await questConfigurationPage.selectComplexityLevelDropdown(dropdownOptions.QAManager);
        await questConfigurationPage.selectQuestTypeRadioBugInvistigation();
        await questConfigurationPage.selectQuestTypeRadioRegressionBattle();
        await questConfigurationPage.selectQuestTypeRadioExplaratoryTesting();
        await questConfigurationPage.populateQuestExecutionDurationBox(16);
        await questConfigurationPage.selectBugBountyRewardDropdown(dropdownOptions.GoldenBugCoins);
        await questConfigurationPage.selectBugBountyRewardDropdown(dropdownOptions.LegendaryDebugingTool);
        await questConfigurationPage.selectBugBountyRewardDropdown(dropdownOptions.QAHonorPoints);
        await questConfigurationPage.selectTestingTeamSizeRange(2);
    })

    test("Populate QA adventure page and verify Quest alert messege", async ({ page }) => {
        await questConfigurationPage.populateTestQuestNameBox(userInfo.users.user2.name);
        await questConfigurationPage.populateTestQuestDescriptionBox(userInfo.users.user2.text);
        await questConfigurationPage.selectComplexityLevelDropdown(dropdownOptions.TestNinja);
        await questConfigurationPage.selectQuestTypeRadioBugInvistigation();
        await questConfigurationPage.populateQuestExecutionDurationBox(6);
        await questConfigurationPage.selectBugBountyRewardDropdown(dropdownOptions.LegendaryDebugingTool);
        await questConfigurationPage.selectTestingTeamSizeRange(9);
        await questConfigurationPage.clickInfiniteQAAdventureButton();
        await questConfigurationPage.verifyQAAdventureAlert("Prepare thyself for an epic QA adventure!");
        await questConfigurationPage.verifyQAAdventureAlert(userInfo.users.user2.name);
        await questConfigurationPage.verifyQAAdventureAlert(userInfo.users.user2.text);
    })

    test("Reconsider thy testing strategy button should be functional", async ({ page }) => {
        await questConfigurationPage.clickInfiniteQAAdventureButton();
        await questConfigurationPage.verifyQAAdventureAlert("Prepare thyself for an epic QA adventure!");
        await questConfigurationPage.clickReconsiderTheTestingStrategyButton();
        await questConfigurationPage.verifyQAAdventurePageName();
    })

    test ("Embark on testing button redirects to quest page", async ({page})=>{
        await questConfigurationPage.clickInfiniteQAAdventureButton();
        await questConfigurationPage.verifyQAAdventureAlert("Prepare thyself for an epic QA adventure!");
        await questConfigurationPage.clickEmbarkOnTestingButton();
        await questConfigurationPage.verifyRedirectToQAQestPage();
    })

});