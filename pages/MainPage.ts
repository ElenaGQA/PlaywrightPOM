import { Page, Locator, expect } from "@playwright/test";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class MainPage {
    private page: Page;
    readonly NAME_INPUT_BOX: Locator;
    readonly EMAIL_INPUT_BOX: Locator;
    readonly SELECT_YOUR_QA_TRAIT_OPTION: Locator;
    readonly HERO_OF_QUALITY_RADIO: Locator;
    readonly TRICKSTER_OF_BUGS_RADIO: Locator;
    readonly AUTOMATION_SPEED_CHECKBOX: Locator;
    readonly BUG_FIXING_TOUCH_CHECKBOX: Locator;
    readonly ADVANCED_DEBUGGING_GADGETS_CHECKBOX: Locator;
    readonly CHOOSE_FILE_BUTTON: Locator;
    readonly SELECT_YOUR_QA_SKILL_LEVEL_RANGE: Locator;
    readonly SELECT_DATE: Locator;
    readonly GUILD_INFO_BUTTON: Locator;
    readonly GUILD_INFO_MESSAGE: Locator;
    readonly CLOSE_GUILD_INFO_BUTTON: Locator;
    readonly JOIN_QA_GUILD_BUTTON: Locator;
    readonly MISSING_FIELDS_ALLERT: Locator;
    readonly MISSING_FIELDS_OK_BUTTON: Locator;
    readonly IMPROVE_YOUR_SKILLS_BUTTON: Locator;
    readonly HERO_1_IMAGE: Locator;
    readonly HERO_2_IMAGE: Locator;
    readonly IMAGES_DROP_ZONE: Locator;
    readonly START_YOUR_QUEST_BUTTON: Locator;

    constructor(page: Page) {
        this.page = page;
        this.NAME_INPUT_BOX = this.page.getByTestId("name-input");
        this.EMAIL_INPUT_BOX = this.page.getByTestId("email-input");
        this.SELECT_YOUR_QA_TRAIT_OPTION = this.page.getByTestId("superpower-select");
        this.HERO_OF_QUALITY_RADIO = this.page.getByTestId('hero-radio');
        this.TRICKSTER_OF_BUGS_RADIO = this.page.getByTestId('trickster-radio');
        this.AUTOMATION_SPEED_CHECKBOX = this.page.getByTestId('speed-checkbox');
        this.BUG_FIXING_TOUCH_CHECKBOX = this.page.getByTestId('healing-checkbox');
        this.ADVANCED_DEBUGGING_GADGETS_CHECKBOX = this.page.getByTestId('tech-checkbox');
        this.CHOOSE_FILE_BUTTON = this.page.getByTestId('photo-upload');
        this.SELECT_YOUR_QA_SKILL_LEVEL_RANGE = this.page.getByTestId('level-range');
        this.SELECT_DATE = this.page.getByTestId('date-input');
        this.GUILD_INFO_BUTTON = this.page.getByTestId('guild-info-button');
        this.GUILD_INFO_MESSAGE = this.page.getByText('Welcome to Legion QA!')
        this.CLOSE_GUILD_INFO_BUTTON = this.page.getByTestId('close-info-button')
        this.JOIN_QA_GUILD_BUTTON = this.page.getByTestId("join-guild-button");
        this.MISSING_FIELDS_ALLERT = this.page.getByText('By the decree of the');
        this.MISSING_FIELDS_OK_BUTTON = this.page.getByRole('button', { name: 'Aye, I Shall Comply!' });
        this.IMPROVE_YOUR_SKILLS_BUTTON = this.page.getByTestId('improve-skills-button')
        this.HERO_1_IMAGE = this.page.getByTestId("hero1-image");
        this.HERO_2_IMAGE = this.page.getByTestId("hero2-image");
        this.IMAGES_DROP_ZONE = this.page.getByTestId("team-area");
        this.START_YOUR_QUEST_BUTTON = this.page.getByTestId('start-quest-button');
    }

    async open() {
        await this.page.goto('/');
    }

    async fillName(name: string) {
        await this.NAME_INPUT_BOX.fill(name);
        await expect(this.NAME_INPUT_BOX).toHaveValue(name);
        await expect(this.NAME_INPUT_BOX).toBeVisible();
    }

    async fillEmail(email: string) {
        await this.EMAIL_INPUT_BOX.fill(email);
        await expect(this.EMAIL_INPUT_BOX).toHaveValue(email);
        await expect(this.EMAIL_INPUT_BOX).toBeVisible();
    }

    async selectYourQATraitStressTestingStrength() {
        await this.SELECT_YOUR_QA_TRAIT_OPTION.selectOption("super_strength");
        await expect(this.SELECT_YOUR_QA_TRAIT_OPTION).toHaveValue("super_strength");
    }

    async selectHeroOfQualityRadio() {
        await this.HERO_OF_QUALITY_RADIO.check();
        await expect(this.HERO_OF_QUALITY_RADIO).toBeChecked();
    }

    async selectTricksterOfBugsRadio() {
        await this.TRICKSTER_OF_BUGS_RADIO.check();
        await expect(this.TRICKSTER_OF_BUGS_RADIO).toBeChecked();
    }


    async uploadChooseFile() {
        const filePath = path.resolve(__dirname, "../assets/dwarf.jpeg");
        await this.CHOOSE_FILE_BUTTON.setInputFiles(filePath);
    }

    async selectDate(date: string) {
        await this.SELECT_DATE.evaluate((el, date) => {
            (el as HTMLInputElement).value = date;
            el.dispatchEvent(new Event('input'));
            el.dispatchEvent(new Event("change"));
        }, date);
    }

    async selectYourQASkillLevel(newLevel: number) {
        await this.SELECT_YOUR_QA_SKILL_LEVEL_RANGE.evaluate((slider, level) => {
            (slider as HTMLInputElement).value = level.toString();
            slider.dispatchEvent(new Event("input"));
        }, newLevel);
        const value = await this.SELECT_YOUR_QA_SKILL_LEVEL_RANGE.inputValue();
        expect(value).toBe(newLevel.toString());
    }

    async clickGuildInfoButton() {
        await this.GUILD_INFO_BUTTON.click();
    }

    async verifyGuildInfoMessageVisible() {
        await expect(this.GUILD_INFO_MESSAGE).toBeVisible();
    }

    async clickCloseInfoButton() {
        await this.CLOSE_GUILD_INFO_BUTTON.click();
    }

    async verifyGuildInfoMessageNotVisible() {
        await expect(this.GUILD_INFO_MESSAGE).not.toBeVisible();
    }

    async clickJoinQAGuildButton() {
        await this.JOIN_QA_GUILD_BUTTON.click();
    }

    async verifyAlertVisible() {
        await expect(this.MISSING_FIELDS_ALLERT).toBeVisible();
    }

    async clickOkButton() {
        await this.MISSING_FIELDS_OK_BUTTON.click();
    }

    async verifyAlertNotVisible() {
        await expect(this.MISSING_FIELDS_ALLERT).not.toBeVisible();
    }

    async clickImproveYourSkillsButton() {
        await this.IMPROVE_YOUR_SKILLS_BUTTON.click();
    }

    async dragHeroToTeam(hero: Locator) {
        await hero.dragTo(this.IMAGES_DROP_ZONE);
    }

    async verifyHeroInTeam(hero: Locator) {
        await expect(this.IMAGES_DROP_ZONE.locator(`#${await hero.getAttribute("id")}`)).toBeVisible();
    }

    async clickStartQuestButton() {
        await this.START_YOUR_QUEST_BUTTON.click();
    }
}


export class MainPageUI {
    private page: Page;
    readonly MAIN_PAGE_BACKGROUND_COLOR: Locator;
    readonly MAIN_PAGE_HEADER: Locator;
    readonly FORM_HEADER: Locator;
    readonly NAME_HEADER: Locator;
    readonly NAME_INPUT_BOX: Locator;
    readonly EMAIL_HEADER: Locator;
    readonly EMAIL_INPUT_BOX: Locator;
    readonly SELECT_YOUR_QA_TRAIT_HEADER: Locator;
    readonly SELECT_YOUR_QA_TRAIT_OPTION: Locator;
    readonly BUG_HUNTERS_EYE_OPTION: Locator;
    readonly STEALTH_TESTING_OPTION: Locator;
    readonly STRESS_TESTING_STRENGTH_OPTION: Locator;
    readonly USER_MIND_READING_OPTION: Locator;
    readonly PICK_YOUR_ALLEGIANCE_HEADER: Locator;
    readonly HERO_OF_QUALITY_RADIO: Locator;
    readonly HERO_OF_QUALITY_RADIO_TEXT: Locator;
    readonly TRICKSTER_OF_BUGS_RADIO: Locator;
    readonly TRICKSTER_OF_BUGS_RADIO_TEXT: Locator;
    readonly CHOOSE_YOUR_SKILLS_HEADER: Locator;
    readonly AUTOMATION_SPEED_CHECKBOX: Locator;
    readonly BUG_FIXING_TOUCH_CHECKBOX: Locator;
    readonly ADVANCED_DEBUGGING_GADGETS_CHECKBOX: Locator;
    readonly UPLOAD_YOUR_TESTER_PORTRAIT_HEADER: Locator;
    readonly CHOOSE_FILE_BUTTON: Locator;
    readonly NEED_HELP_TOOLTIP: Locator;
    readonly NEED_HELP_TOOLTIPTEXT: Locator;
    readonly CHOOSE_YOUR_QA_GUILD_M_START_DATE: Locator;
    readonly DATE_INPUT: Locator;
    readonly SELECT_YOUR_QA_SKILL_LEVEL: Locator;
    readonly SELECT_YOUR_QA_SKILL_LEVEL_RANGE: Locator;
    readonly SELECT_YOUR_QA_SKILL_LEVEL_VALUE: Locator;
    readonly GUILD_INFO_BUTTON: Locator;
    readonly JOIN_QA_GUILD_BUTTON: Locator;
    readonly IMPROVE_YOUR_SKILLS_BUTTON: Locator;
    readonly GUILD_MEMBERS_HEADER: Locator;
    readonly TESTER_ALIAS_CELL: Locator;
    readonly SCROLL_EMAIL_CELL: Locator;
    readonly ALLEGIANCE_CELL: Locator;
    readonly QA_SKILL_LEVEL_CELL: Locator;
    readonly BUGSLAYER_ELDRIC_CELL: Locator;
    readonly ELDRIC_EMAIL_CELL: Locator;
    readonly ELDRIC_ALLEGIANCE_CELL: Locator;
    readonly ELDRIC_SKILL_LEVEL_CELL: Locator;
    readonly NYX_THE_DEBUGER_CELL: Locator;
    readonly NYX_EMAIL_CELL: Locator;
    readonly NYX_ALLEGIANCE_CELL: Locator;
    readonly NYX_SKILL_LEVEL_CELL: Locator;
    readonly DRAG_AND_DROP_HEADER: Locator;
    readonly DRAG_AND_DROP_AREA: Locator;
    readonly START_YOUR_QUEST_BUTTON: Locator;

    constructor(page: Page) {
        this.page = page;
        this.MAIN_PAGE_BACKGROUND_COLOR = this.page.locator("body");
        this.MAIN_PAGE_HEADER = this.page.getByRole('heading', { name: 'Legion QA Guild Signup' });
        this.FORM_HEADER = this.page.getByRole('heading', { name: 'Join the QA Guild' });
        this.NAME_HEADER = this.page.getByText('Your Tester Alias:');
        this.NAME_INPUT_BOX = this.page.getByTestId("name-input");
        this.EMAIL_HEADER = this.page.getByText('Scroll (Email for Bug Alerts');
        this.EMAIL_INPUT_BOX = this.page.getByTestId("email-input");
        this.SELECT_YOUR_QA_TRAIT_HEADER = this.page.getByText('Select Your QA Trait:');
        this.SELECT_YOUR_QA_TRAIT_OPTION = this.page.getByTestId("superpower-select");
        this.PICK_YOUR_ALLEGIANCE_HEADER = this.page.getByText('Pick Your Allegiance:');
        this.HERO_OF_QUALITY_RADIO = this.page.getByTestId('hero-radio');
        this.TRICKSTER_OF_BUGS_RADIO = this.page.getByTestId('trickster-radio');
        this.CHOOSE_YOUR_SKILLS_HEADER = this.page.getByText('Choose Your Skills:');
        this.AUTOMATION_SPEED_CHECKBOX = this.page.getByTestId('speed-checkbox');
        this.BUG_FIXING_TOUCH_CHECKBOX = this.page.getByTestId('healing-checkbox');
        this.ADVANCED_DEBUGGING_GADGETS_CHECKBOX = this.page.getByTestId('tech-checkbox');
        this.UPLOAD_YOUR_TESTER_PORTRAIT_HEADER = this.page.getByText('Upload Your Tester Portrait:');
        this.CHOOSE_FILE_BUTTON = this.page.getByTestId('photo-upload');
        this.NEED_HELP_TOOLTIP = this.page.getByTestId('tooltip');
        this.NEED_HELP_TOOLTIPTEXT = this.page.locator('.tooltiptext');
        this.CHOOSE_YOUR_QA_GUILD_M_START_DATE = this.page.getByText('Choose Your QA Guild');
        this.DATE_INPUT = this.page.getByTestId('date-input');
        this.SELECT_YOUR_QA_SKILL_LEVEL = this.page.getByText('Select Your QA Skill Level:');
        this.SELECT_YOUR_QA_SKILL_LEVEL_RANGE = this.page.getByTestId('level-range');
        this.SELECT_YOUR_QA_SKILL_LEVEL_VALUE = this.page.locator('#skillLevelValue');
        this.GUILD_INFO_BUTTON = this.page.getByTestId('guild-info-button');
        this.JOIN_QA_GUILD_BUTTON = this.page.getByTestId("join-guild-button");
        this.IMPROVE_YOUR_SKILLS_BUTTON = this.page.getByTestId('improve-skills-button');
        this.GUILD_MEMBERS_HEADER = this.page.getByRole('heading', { name: 'Guild Members' });
        this.TESTER_ALIAS_CELL = this.page.getByRole('cell', { name: 'Tester Alias' });
        this.SCROLL_EMAIL_CELL = this.page.getByRole('cell', { name: 'Scroll (Email)' });
        this.ALLEGIANCE_CELL = this.page.getByRole('cell', { name: 'Allegiance' });
        this.QA_SKILL_LEVEL_CELL = this.page.getByRole('cell', { name: 'QA Skill Level' });
        this.BUGSLAYER_ELDRIC_CELL = this.page.getByRole('cell', { name: 'Bugslayer Eldric' });
        this.ELDRIC_EMAIL_CELL = this.page.getByRole('cell', { name: 'eldric@realmwatchers.com' });
        this.ELDRIC_ALLEGIANCE_CELL = this.page.getByRole('cell', { name: 'Hero of Quality' });
        this.ELDRIC_SKILL_LEVEL_CELL = this.page.getByRole('cell', { name: '85' });
        this.NYX_THE_DEBUGER_CELL = this.page.getByRole('cell', { name: 'Nyx the Debugger' });
        this.NYX_EMAIL_CELL = this.page.getByRole('cell', { name: 'nyx@chaosinc.com' });
        this.NYX_ALLEGIANCE_CELL = this.page.getByRole('cell', { name: 'Trickster of Bugs' });
        this.NYX_SKILL_LEVEL_CELL = this.page.getByRole('cell', { name: '72' });
        this.DRAG_AND_DROP_HEADER = this.page.getByRole('heading', { name: 'Drag & Drop: Assemble Your' });
        this.DRAG_AND_DROP_AREA = this.page.getByTestId('team-area')
        this.START_YOUR_QUEST_BUTTON = this.page.getByTestId('start-quest-button');
    }

    async verifiyMainPageBackgroundColor() {
        await expect(this.MAIN_PAGE_BACKGROUND_COLOR).toHaveCSS("background-image", "linear-gradient(to right, rgb(243, 217, 177), rgb(224, 159, 62))");
    }

    async verifyMainPageHeader() {
        await expect(this.MAIN_PAGE_HEADER).toBeVisible();
        await expect(this.MAIN_PAGE_HEADER).toHaveText("Legion QA Guild Signup");
    }

    async verifyFormHeader() {
        await expect(this.FORM_HEADER).toBeVisible();
        await expect(this.FORM_HEADER).toHaveText("Join the QA Guild");
    }

    async verifyNameFieldUI() {
        await expect(this.NAME_HEADER).toBeVisible();
        await expect(this.NAME_HEADER).toHaveText("Your Tester Alias:");
        await expect(this.NAME_INPUT_BOX).toHaveAttribute('placeholder', 'Enter your tester alias');
    }

    async verifyEmailFieldUI() {
        await expect(this.EMAIL_HEADER).toBeVisible();
        await expect(this.EMAIL_HEADER).toHaveText("Scroll (Email for Bug Alerts!):");
        await expect(this.EMAIL_INPUT_BOX).toHaveAttribute('placeholder', 'Enter your scroll (email)');
    }

    async verifySelectYourQATraitDropdownUI() {
        await expect(this.SELECT_YOUR_QA_TRAIT_HEADER).toBeVisible();
        await expect(this.SELECT_YOUR_QA_TRAIT_HEADER).toHaveText("Select Your QA Trait:");
        const dropdown = this.SELECT_YOUR_QA_TRAIT_OPTION;
        await dropdown.selectOption({ label: "Bug Hunter's Eye" });
        await dropdown.selectOption({ label: "Stealth Testing" });
        await dropdown.selectOption({ label: "Stress Testing Strength" });
        await dropdown.selectOption({ label: "User Mind Reading" });
    }

    async verifyPickYourAllegianceRadiobuttonUI() {
        await expect(this.PICK_YOUR_ALLEGIANCE_HEADER).toBeVisible();
        await expect(this.PICK_YOUR_ALLEGIANCE_HEADER).toHaveText("Pick Your Allegiance:");
        await expect(this.HERO_OF_QUALITY_RADIO).toBeVisible();
        await expect(this.HERO_OF_QUALITY_RADIO).toHaveAttribute('aria-label', 'Hero of Quality');
        await expect(this.TRICKSTER_OF_BUGS_RADIO).toBeVisible();
        await expect(this.TRICKSTER_OF_BUGS_RADIO).toHaveAttribute('aria-label', 'Trickster of Bugs');

    }

    async verifyChooseYourSkillsCheckboxUI() {
        await expect(this.CHOOSE_YOUR_SKILLS_HEADER).toBeVisible();
        await expect(this.CHOOSE_YOUR_SKILLS_HEADER).toHaveText("Choose Your Skills:");
        await expect(this.AUTOMATION_SPEED_CHECKBOX).toBeVisible();
        await expect(this.AUTOMATION_SPEED_CHECKBOX).toHaveAttribute('aria-label', 'Automation Speed');
        await expect(this.BUG_FIXING_TOUCH_CHECKBOX).toBeVisible();
        await expect(this.BUG_FIXING_TOUCH_CHECKBOX).toHaveAttribute('aria-label', 'Bug Fixing Touch');
        await expect(this.ADVANCED_DEBUGGING_GADGETS_CHECKBOX).toBeVisible();
        await expect(this.ADVANCED_DEBUGGING_GADGETS_CHECKBOX).toHaveAttribute('aria-label', 'Advanced Debugging Gadgets');
    }

    async verifyUploadYourTestPortraitButtonUI() {
        await expect(this.UPLOAD_YOUR_TESTER_PORTRAIT_HEADER).toBeVisible();
        await expect(this.UPLOAD_YOUR_TESTER_PORTRAIT_HEADER).toHaveText("Upload Your Tester Portrait:");
        await expect(this.CHOOSE_FILE_BUTTON).toBeVisible();
    }

    async verifyNeedHelpTooltipUI() {
        await this.NEED_HELP_TOOLTIP.hover();
        await expect(this.NEED_HELP_TOOLTIPTEXT).toBeVisible();
        await expect(this.NEED_HELP_TOOLTIPTEXT).toHaveText('Enter your tester details, pick a side, and select your skills to join!');
    }

    async verifyChooseYourQAGuildMembershipStartDateUI() {
        await expect(this.CHOOSE_YOUR_QA_GUILD_M_START_DATE).toBeVisible();
        await expect(this.CHOOSE_YOUR_QA_GUILD_M_START_DATE).toHaveText("Choose Your QA Guild Membership Start Date:");
        await expect(this.DATE_INPUT).toBeVisible();
    }

    async verifySelectYourQASkillLevelRangeUI() {
        await expect(this.SELECT_YOUR_QA_SKILL_LEVEL).toBeVisible();
        await expect(this.SELECT_YOUR_QA_SKILL_LEVEL).toHaveText("Select Your QA Skill Level: ");
        await expect(this.SELECT_YOUR_QA_SKILL_LEVEL_RANGE).toBeVisible();
        await expect(this.SELECT_YOUR_QA_SKILL_LEVEL_VALUE).toHaveText("50");
    }

    async verifyGuidInfoButtonUI() {
        await expect(this.GUILD_INFO_BUTTON).toBeVisible();
        await expect(this.GUILD_INFO_BUTTON).toHaveText("Guild Info");
        await expect(this.GUILD_INFO_BUTTON).toHaveCSS("background-color", "rgb(26, 188, 156)");

    }

    async verifyJoinQAGuildButtonUI() {
        await expect(this.JOIN_QA_GUILD_BUTTON).toBeVisible();
        await expect(this.JOIN_QA_GUILD_BUTTON).toHaveText("Join the QA Guild!");
        await expect(this.JOIN_QA_GUILD_BUTTON).toHaveCSS("background-color", "rgb(26, 188, 156)");
    }

    async verifyImproveYourSkillsButtonUI() {
        await expect(this.IMPROVE_YOUR_SKILLS_BUTTON).toBeVisible();
        await expect(this.IMPROVE_YOUR_SKILLS_BUTTON).toHaveText("Improve your skills");
        await expect(this.IMPROVE_YOUR_SKILLS_BUTTON).toHaveCSS("background-color", "rgb(26, 188, 156)");
    }

    async verifyGuidMemberTableUI() {
        await expect(this.GUILD_MEMBERS_HEADER).toBeVisible();
        await expect(this.GUILD_MEMBERS_HEADER).toHaveText("Guild Members");
        await expect(this.TESTER_ALIAS_CELL).toBeVisible();
        await expect(this.TESTER_ALIAS_CELL).toHaveText("Tester Alias");
        await expect(this.TESTER_ALIAS_CELL).toHaveCSS("background-color", "rgb(138, 44, 10)");
        await expect(this.SCROLL_EMAIL_CELL).toBeVisible();
        await expect(this.SCROLL_EMAIL_CELL).toHaveText("Scroll (Email)");
        await expect(this.SCROLL_EMAIL_CELL).toHaveCSS("background-color", "rgb(138, 44, 10)");
        await expect(this.ALLEGIANCE_CELL).toBeVisible();
        await expect(this.ALLEGIANCE_CELL).toHaveText("Allegiance");
        await expect(this.ALLEGIANCE_CELL).toHaveCSS("background-color", "rgb(138, 44, 10)");
        await expect(this.QA_SKILL_LEVEL_CELL).toBeVisible();
        await expect(this.QA_SKILL_LEVEL_CELL).toHaveText("QA Skill Level");
        await expect(this.QA_SKILL_LEVEL_CELL).toHaveCSS("background-color", "rgb(138, 44, 10)");
        await expect(this.BUGSLAYER_ELDRIC_CELL).toBeVisible();
        await expect(this.BUGSLAYER_ELDRIC_CELL).toHaveText("Bugslayer Eldric");
        await expect(this.ELDRIC_EMAIL_CELL).toBeVisible();
        await expect(this.ELDRIC_EMAIL_CELL).toHaveText("eldric@realmwatchers.com");
        await expect(this.ELDRIC_ALLEGIANCE_CELL).toBeVisible();
        await expect(this.ELDRIC_ALLEGIANCE_CELL).toHaveText("Hero of Quality");
        await expect(this.ELDRIC_SKILL_LEVEL_CELL).toBeVisible();
        await expect(this.ELDRIC_SKILL_LEVEL_CELL).toHaveText("85");
        await expect(this.NYX_THE_DEBUGER_CELL).toBeVisible();
        await expect(this.NYX_THE_DEBUGER_CELL).toHaveText("Nyx the Debugger");
        await expect(this.NYX_EMAIL_CELL).toBeVisible();
        await expect(this.NYX_EMAIL_CELL).toHaveText("nyx@chaosinc.com");
        await expect(this.NYX_ALLEGIANCE_CELL).toBeVisible();
        await expect(this.NYX_ALLEGIANCE_CELL).toHaveText("Trickster of Bugs");
        await expect(this.NYX_SKILL_LEVEL_CELL).toBeVisible();
        await expect(this.NYX_SKILL_LEVEL_CELL).toHaveText("72");
    }

    async verifyDrugAndDropUI() {
        await expect(this.DRAG_AND_DROP_HEADER).toBeVisible();
        await expect(this.DRAG_AND_DROP_HEADER).toHaveText("Drag & Drop: Assemble Your Testing Party!");
        await expect(this.DRAG_AND_DROP_AREA).toBeVisible();
        await expect(this.DRAG_AND_DROP_AREA).toHaveText("Drag testers here:")
    }

    async verifyStartYourQuestButtonUI() {
        await expect(this.START_YOUR_QUEST_BUTTON).toBeVisible();
        await expect(this.START_YOUR_QUEST_BUTTON).toHaveText("Start Your Testing Quest");
        await expect(this.START_YOUR_QUEST_BUTTON).toHaveCSS("background-color", "rgb(26, 188, 156)");
    }

}




