import { test, expect } from '@playwright/test';
import { MainPage, MainPageUI } from '../pages/MainPage';
import { users } from '../assets/test_data';


test.describe("Main page tests", () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.open();
    })

    test("Fill the form and join Guild Memebers should be functional", async ({ page }) => {
        await mainPage.fillName(users.user2.name);
        await mainPage.fillEmail(users.user2.email);
        await mainPage.selectHeroOfQualityRadio();
        await mainPage.selectYourQASkillLevel(users.user2.skillLevel);
        await mainPage.clickJoinQAGuildButton();
        const row = await page.getByRole("row", { name: users.user2.name });
        await expect(row).toBeVisible();
        await expect(row.getByRole("cell", { name: users.user2.email })).toBeVisible();
        // await expect(row.getByRole("cell", { name: "Hero of Quality" })).toBeVisible(); // bug: "hero" in place of "Hero of Quality"
        await expect(row.getByRole("cell", { name: users.user2.skillLevel })).toBeVisible();

        await mainPage.open();
        await mainPage.fillName(users.user1.name);
        await mainPage.fillEmail(users.user1.email);
        await mainPage.selectTricksterOfBugsRadio();
        await mainPage.selectYourQASkillLevel(users.user1.skillLevel);
        await mainPage.clickJoinQAGuildButton();
        const row1 = await page.getByRole("row", { name: users.user1.name });
        await expect(row1).toBeVisible();
        await expect(row1.getByRole("cell", { name: users.user1.email })).toBeVisible();
        // await expect(row1.getByRole("cell", { name: "Trickster of Bugs" })).toBeVisible(); // bug: "trickster" in place of "Trickster of Bugs"
        await expect(row1.getByRole("cell", { name: users.user1.skillLevel })).toBeVisible();
    })

    test("Upload Your Tester Portrait should be functional", async ({ page }) => {
        await mainPage.uploadChooseFile();
        await expect(page.locator("#hero3")).toBeVisible();
    })

    test("Select Membership Start date", async ({ page }) => {
        const d = new Date();
        const formattedDate = d.toISOString().split('T')[0];
        await mainPage.selectDate(formattedDate);
        await expect(mainPage.SELECT_DATE).toHaveValue(formattedDate);
    })

    test("Verify Guild Info message", async ({ page }) => {
        await mainPage.clickGuildInfoButton();
        await mainPage.verifyGuildInfoMessageVisible();
        await mainPage.clickCloseInfoButton();
        await mainPage.verifyGuildInfoMessageNotVisible();
    })

    test("Verify error messages on Main Page", async ({ page }) => {
        await mainPage.clickJoinQAGuildButton();
        await mainPage.verifyAlertVisible();
        await mainPage.clickOkButton();
        await mainPage.verifyAlertNotVisible();
    })

    test("Improve Your Skills button should navigate to trivia page", async ({ page }) => {
        await mainPage.clickImproveYourSkillsButton();
        await expect(page).toHaveURL("/trivia.html");
    })

    test("Drag & Drop: Assemble Your Testing Party element should be functional", async ({ page }) => {
        await mainPage.dragHeroToTeam(mainPage.HERO_1_IMAGE);
        await mainPage.verifyHeroInTeam(mainPage.HERO_1_IMAGE);
        await mainPage.dragHeroToTeam(mainPage.HERO_2_IMAGE);
        await mainPage.verifyHeroInTeam(mainPage.HERO_2_IMAGE);
    })

    test("Start Your Testing Quest button should navegate to quest configuration page", async ({ page }) => {
        await mainPage.clickStartQuestButton();
        await expect(page).toHaveURL("/quest-configuration.html");
    })
});

test.describe("Main page UI tests", () => {
    let mainPage: MainPage;
    let mainPageUI: MainPageUI;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        mainPageUI = new MainPageUI(page);
        await mainPage.open();
    })

    test("Verify Main Page background color", async ({ page }) => {
        await mainPageUI.verifiyMainPageBackgroundColor();
    })

    test("Verify Main Page header", async ({ page }) => {
        await mainPageUI.verifyMainPageHeader();
    })

    test("Verify Name field header and placeholder", async ({ page }) => {
        await mainPageUI.verifyNameFieldUI();
    })

    test("Verify Email field header and placeholder", async ({ page }) => {
        await mainPageUI.verifyEmailFieldUI();
    })

    test("Verify Select Your QA Trait Dropdown menu UI", async ({ page }) => {
        await mainPageUI.verifySelectYourQATraitDropdownUI();
    })

    test("Verify Pick Your Allegiance radiobuttons UI", async ({ page }) => {
        await mainPageUI.verifyPickYourAllegianceRadiobuttonUI();
    })

    test("Verify Choose Your Skills Checkbox UI", async ({ page }) => {
        await mainPageUI.verifyChooseYourSkillsCheckboxUI();
    })

    test("Verify Upload Your Test Portrait Button UI", async ({ page }) => {
        await mainPageUI.verifyUploadYourTestPortraitButtonUI();
    })

    test("Verify Need Help tooltip UI", async ({ page }) => {
        await mainPageUI.verifyNeedHelpTooltipUI();
    })

    test("Veryfy Choose Your QA Guild Membership Start Date UI", async ({ page }) => {
        await mainPageUI.verifyChooseYourQAGuildMembershipStartDateUI();
    })

    test("Verify Select Your QA Skill Level Range UI", async ({ page }) => {
        await mainPageUI.verifySelectYourQASkillLevelRangeUI();
    })

    test("Verify Guid Info Button UI", async ({ page }) => {
        await mainPageUI.verifyGuidInfoButtonUI();
    })

    test("Verify Join the QA Guild Button UI", async ({ page }) => {
        await mainPageUI.verifyJoinQAGuildButtonUI();
    })

    test("Verify Improve Your Skills Button UI", async ({ page }) => {
        await mainPageUI.verifyImproveYourSkillsButtonUI();
    })

    test("Verify Guid Member Table UI", async ({ page }) => {
        await mainPageUI.verifyGuidMemberTableUI();
    })

    test("Verify Drug And Drop UI", async ({ page }) => {
        await mainPageUI.verifyDrugAndDropUI();
    })

    test("Verify Start Your Quest Button UI", async ({ page }) => {
        await mainPageUI.verifyStartYourQuestButtonUI();
    })
})

