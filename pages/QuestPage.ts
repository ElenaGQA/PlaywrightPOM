import { Page, Locator, expect } from "@playwright/test";
import { CreateTracingOptions } from "trace_events";

export class QuestPage {
    private page: Page;
    readonly QA_QUEST_PAGE_NAME: Locator;
    readonly QA_QUEST_DESCRIPTION: Locator;
    readonly PROGRESS_BAR: Locator;
    readonly WARRIOR_LIST: Locator;
    readonly BUG_BONUS_FIELD: Locator;
    readonly ARTIFACT_OF_QUALITY_FIELD: Locator;
    readonly DAYS_OFF_FIELD: Locator;
    readonly FIX_BUG_BUTTON: Locator;
    readonly FIND_BUG_BUTTON: Locator;
    readonly CLAIM_BONUS_BUTTON: Locator;
    readonly OBRAIN_QA_ARTIFACT_BUTTON: Locator;
    readonly EARN_DAYS_OFF_BUTTON: Locator;
    readonly VICTORY_ALERT_MESSAGE: Locator;
    readonly VICTORY_ALERT_OK_BUTTON: Locator;
    readonly FAIL_ALERT_MESSAGE: Locator;
    readonly FAIL_ALERT_OK_BUTTON: Locator;
    readonly CUSTOM_QA_ACTION_BOX: Locator;
    readonly SUBMIT_ACTION_BUTTON: Locator;
    readonly SUBMIT_ACTION_ALERT: Locator;
    readonly SUBMIT_ACTION_ALERT_OK_BUTTON: Locator;

    constructor(page: Page) {
        this.page = page;
        this.QA_QUEST_PAGE_NAME = this.page.locator("#questName");
        this.QA_QUEST_DESCRIPTION = this.page.locator("#questDescription");
        this.PROGRESS_BAR = this.page.locator("#progressBarFill");
        this.WARRIOR_LIST = this.page.locator('ul > li');
        this.BUG_BONUS_FIELD = this.page.locator("#goldCount");
        this.ARTIFACT_OF_QUALITY_FIELD = this.page.locator("#artifactCount");
        this.DAYS_OFF_FIELD = this.page.locator("#honorCount");
        this.FIX_BUG_BUTTON = this.page.getByRole('button', { name: "Fix Bug" });
        this.FIND_BUG_BUTTON = this.page.getByRole('button', { name: "Find Bug" });
        this.CLAIM_BONUS_BUTTON = this.page.getByRole('button', { name: "Claim Bonus" });
        this.OBRAIN_QA_ARTIFACT_BUTTON = this.page.getByRole('button', { name: "Obtain QA Artifact" });
        this.EARN_DAYS_OFF_BUTTON = this.page.getByRole('button', { name: "Earn Days Off" });
        this.VICTORY_ALERT_MESSAGE = this.page.locator("#customAlertMessage");
        this.VICTORY_ALERT_OK_BUTTON = this.page.getByRole('button', { name: "Aye, I Shall Comply!" });
        this.FAIL_ALERT_MESSAGE = this.page.locator("#customAlertMessage");
        this.FAIL_ALERT_OK_BUTTON = this.page.getByRole('button', { name: "Aye, I Shall Comply!" });
        this.CUSTOM_QA_ACTION_BOX = this.page.locator("#customInput");
        this.SUBMIT_ACTION_BUTTON = this.page.getByRole('button', { name: "Submit Action" });
        this.SUBMIT_ACTION_ALERT = this.page.locator("#customAlertMessage")
        this.SUBMIT_ACTION_ALERT_OK_BUTTON = this.page.getByRole('button', { name: "Aye, I Shall Comply!" });
    }

    async verifyQAQuestName(name: string) {
        await expect(this.QA_QUEST_PAGE_NAME).toBeVisible();
        await expect(this.QA_QUEST_PAGE_NAME).toHaveText(`QA Quest: ${name}`);
    }

    async verifyQAQestDescription(text: string) {
        await expect(this.QA_QUEST_DESCRIPTION).toBeVisible();
        await expect(this.QA_QUEST_DESCRIPTION).toHaveText(text);

    }

    async verifyDefaultWarriorCharactersDisplayed() {
        const warriorTexts = await this.WARRIOR_LIST.allTextContents();
        await expect(warriorTexts).toContain("Warrior 1: Bug Hunter");
        await expect(warriorTexts).toContain("Warrior 2: Code Guardian");
        await expect(warriorTexts).toContain("Warrior 3: Test Mage");
    }


    async verifyInitialProgress() {
        await expect(this.PROGRESS_BAR).toContainText("30%");
    }

    async verifyProgress(num: string) {
        await expect(this.PROGRESS_BAR).toContainText(num);
    }

    async verifyVictoryAlert() {
        await expect(this.VICTORY_ALERT_MESSAGE).toContainText("Victory! All defects vanquished!")
    }

    async clickVictoryAlertOkButton() {
        await this.VICTORY_ALERT_OK_BUTTON.click();
    }

    async verifyVictoryAlertNotVisible() {
        await expect(this.VICTORY_ALERT_MESSAGE).not.toBeVisible();
    }

    async verifyFailAlert() {
        await expect(this.FAIL_ALERT_MESSAGE).toContainText("Quest Failed! The bugs have taken over. ")
    }

    async clickFailAlertOkButton() {
        await this.FAIL_ALERT_OK_BUTTON.click();
    }

    async verifyFailAlertNotVisible() {
        await expect(this.FAIL_ALERT_MESSAGE).not.toBeVisible();
    }

    async clickFixBugButton() {
        await this.FIX_BUG_BUTTON.click();
    }

    async clickFindBugButton() {
        await this.FIND_BUG_BUTTON.click();
    }

    async clickClaimBonusButton() {
        await this.CLAIM_BONUS_BUTTON.click();
    }

    async clickObtainQAAtrifactButton() {
        await this.OBRAIN_QA_ARTIFACT_BUTTON.click();
    }

    async clickEarnDaysOffButton() {
        await this.EARN_DAYS_OFF_BUTTON.click();
    }

    async verifyBugBonusField() {
        await expect(this.BUG_BONUS_FIELD).toContainText("0")
    }

    async verifyBugBonusFieldIncrease(num: string) {
        await expect(this.BUG_BONUS_FIELD).toContainText(num)
    }

    async verifyArtifactOfQualityField() {
        await expect(this.ARTIFACT_OF_QUALITY_FIELD).toContainText("0")
    }

    async verifyArtifactOfQualityFieldIncrease(num: string) {
        await expect(this.ARTIFACT_OF_QUALITY_FIELD).toContainText(num)
    }

    async verifyDaysOffField() {
        await expect(this.DAYS_OFF_FIELD).toContainText("0");
    }

    async verifyDaysOffFieldIncrease(num: string) {
        await expect(this.DAYS_OFF_FIELD).toContainText(num);
    }

    async populateCustomQAActionBox(text: string) {
        await this.CUSTOM_QA_ACTION_BOX.fill(text);
        await expect(this.CUSTOM_QA_ACTION_BOX).toHaveValue(text);
        await expect(this.CUSTOM_QA_ACTION_BOX).toBeVisible();
    }

    async clickSubmitActionButton() {
        await this.SUBMIT_ACTION_BUTTON.click();
    }

    async verifyActionAlertMessage(text: string) {
        await expect(this.SUBMIT_ACTION_ALERT).toContainText("You have performed the action:");
        await expect(this.SUBMIT_ACTION_ALERT).toContainText(text);
    }

    async verifyInvalidActionAlertMessage() {
        await expect(this.SUBMIT_ACTION_ALERT).toContainText(" Please enter a valid action.");

    }

    async clickActionAlertOkButton() {
        await this.SUBMIT_ACTION_ALERT_OK_BUTTON.click();
    }

    async verifyActionAlertOkButtonNotVisible() {
        await expect(this.SUBMIT_ACTION_ALERT_OK_BUTTON).not.toBeVisible();

    }
}