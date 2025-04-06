import { Page, Locator, expect } from "@playwright/test";

export class QuestConfigurationPage {
    private page: Page;
    readonly QA_ADVENTURE_PAGE_NAME: Locator;
    readonly TEST_QUEST_NAME_BOX: Locator;
    readonly TEST_QUEST_DESCRIPTION_BOX: Locator;
    readonly COMPLEXITY_LEVEL_DROPDOWN: Locator;
    readonly QUEST_TYPE_RADIO_BUG_INVISTIGATION: Locator;
    readonly QUEST_TYPE_RADIO_REGRESSION_BATTLE: Locator;
    readonly QUEST_TYPE_RADIO_EXPLORATORY_TESTING: Locator;
    readonly QUEST_EXECUTION_DURATION_BOX: Locator;
    readonly BUG_BOUNTY_REWARD_TYPE_DROPDOWN: Locator;
    readonly TESTING_TEAM_SIZE_RANGE: Locator;
    readonly INFINITE_QA_ADVENTURE_BUTTON: Locator;
    readonly QA_ADVENTURE_ALERT: Locator;
    readonly EMBARK_ON_TESTING_BUTTON: Locator;
    readonly RECONSIDER_THY_TESTING_STRATEGY_BUTTON: Locator;
    readonly QA_QUEST_PAGE_NAME: Locator;

    constructor(page: Page) {
        this.page = page;
        this.QA_ADVENTURE_PAGE_NAME = this.page.getByRole('heading', { name: 'QA Adventure Configuration' });
        this.TEST_QUEST_NAME_BOX = this.page.getByRole('textbox', { name: 'Test Quest Name:' });
        this.TEST_QUEST_DESCRIPTION_BOX = this.page.getByRole('textbox', { name: 'Test Quest Description:' })
        this.COMPLEXITY_LEVEL_DROPDOWN = this.page.locator('#questLevel');
        this.QUEST_TYPE_RADIO_BUG_INVISTIGATION = this.page.getByRole('radio', { name: 'Bug Investigation' });
        this.QUEST_TYPE_RADIO_REGRESSION_BATTLE = this.page.getByRole('radio', { name: 'Regression Battle' });
        this.QUEST_TYPE_RADIO_EXPLORATORY_TESTING = this.page.getByRole('radio', { name: 'Exploratory Testing' });
        this.QUEST_EXECUTION_DURATION_BOX = this.page.locator("#questDuration");
        this.BUG_BOUNTY_REWARD_TYPE_DROPDOWN = this.page.locator("#reward");
        this.TESTING_TEAM_SIZE_RANGE = this.page.getByRole('slider', { name: 'Testing Team Size:' });
        this.INFINITE_QA_ADVENTURE_BUTTON = this.page.getByRole('button', { name: 'Initiate QA Adventure' });
        this.QA_ADVENTURE_ALERT = this.page.locator('.custom-alert');
        this.EMBARK_ON_TESTING_BUTTON = this.page.getByRole('button', { name: 'Embark on Testing!' });
        this.RECONSIDER_THY_TESTING_STRATEGY_BUTTON = this.page.getByRole('button', { name: 'Reconsider Thy Testing Strategy' });
        this.QA_QUEST_PAGE_NAME = this.page.locator("#questName");
    }

    async verifyQAAdventurePageName() {
        await expect(this.QA_ADVENTURE_PAGE_NAME).toBeVisible();
        await expect(this.QA_ADVENTURE_PAGE_NAME).toHaveText("QA Adventure Configuration");
    }

    async verifyColorInfiniteQAAdventureButton() {
        await expect(this.INFINITE_QA_ADVENTURE_BUTTON).toHaveCSS("background-color", "rgb(139, 26, 26)");
    }

    async populateTestQuestNameBox(name) {
        await this.TEST_QUEST_NAME_BOX.fill(name);
        await expect(this.TEST_QUEST_NAME_BOX).toHaveValue(name);
        await expect(this.TEST_QUEST_NAME_BOX).toBeVisible();

    }

    async populateTestQuestDescriptionBox(text) {
        await this.TEST_QUEST_DESCRIPTION_BOX.fill(text);
        await expect(this.TEST_QUEST_DESCRIPTION_BOX).toHaveValue(text);
        await expect(this.TEST_QUEST_DESCRIPTION_BOX).toBeVisible();
    }

    async selectComplexityLevelDropdown(option) {
        await this.COMPLEXITY_LEVEL_DROPDOWN.selectOption(option);
        await expect(this.COMPLEXITY_LEVEL_DROPDOWN).toHaveValue(option);
    }

    async selectQuestTypeRadioBugInvistigation() {
        await this.QUEST_TYPE_RADIO_BUG_INVISTIGATION.check();
        await expect(this.QUEST_TYPE_RADIO_BUG_INVISTIGATION).toBeChecked();
    }

    async selectQuestTypeRadioRegressionBattle() {
        await this.QUEST_TYPE_RADIO_REGRESSION_BATTLE.check();
        await expect(this.QUEST_TYPE_RADIO_REGRESSION_BATTLE).toBeChecked();
    }

    async selectQuestTypeRadioExplaratoryTesting() {
        await this.QUEST_TYPE_RADIO_EXPLORATORY_TESTING.check();
        await expect(this.QUEST_TYPE_RADIO_EXPLORATORY_TESTING).toBeChecked();

    }

    async populateQuestExecutionDurationBox(hours: number) {
        await this.QUEST_EXECUTION_DURATION_BOX.fill(hours.toString());
        await expect(this.QUEST_EXECUTION_DURATION_BOX).toHaveValue(hours.toString());
    }

    async selectBugBountyRewardDropdown(option) {
        await this.BUG_BOUNTY_REWARD_TYPE_DROPDOWN.selectOption(option);
        await expect(this.BUG_BOUNTY_REWARD_TYPE_DROPDOWN).toHaveValue(option);

    }

    async selectTestingTeamSizeRange(newSize: number) {
        await this.TESTING_TEAM_SIZE_RANGE.evaluate((slider, size) => {
            (slider as HTMLInputElement).value = size.toString();
            slider.dispatchEvent(new Event("input"));
        }, newSize);

        const value = await this.TESTING_TEAM_SIZE_RANGE.inputValue();
        expect(value).toBe(newSize.toString());
    }

    async clickInfiniteQAAdventureButton() {
        await this.INFINITE_QA_ADVENTURE_BUTTON.click()
    }

    async verifyQAAdventureAlert(text : string) {
        await expect(this.QA_ADVENTURE_ALERT).toContainText(text)
    }

    

    async clickEmbarkOnTestingButton() {
        await this.EMBARK_ON_TESTING_BUTTON.click();
    }

    async clickReconsiderTheTestingStrategyButton() {
        await this.RECONSIDER_THY_TESTING_STRATEGY_BUTTON.click()
    }

    async verifyRedirectToQAQestPage(){
        await expect(this.QA_QUEST_PAGE_NAME).toContainText("QA Quest:")
    }

}

