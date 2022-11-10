import { ElementHandle, Locator, Page } from "@playwright/test";
export default class QAform {

    pageTitle: Locator;
    createdQestHeader: Locator;
    createdQestToolTip: Locator;
    createNewQHeader: Locator;
    createNewQTooltip: Locator;
    sortBtn: Locator;
    removeQestBtn: Locator;
    noQuestAlert: Locator;
    questionInputField: Locator | string[];
    answerInputField: Locator | string[];
    createQuestBtn: Locator;
    sidebarText: Locator;
    questionTxt: Locator;
    answerTxt: Locator;
    questionsList: ElementHandle<SVGElement | HTMLElement>[];
    
    constructor(public page: Page) {
        this.pageTitle = page.locator('.header');
        this.sortBtn = page.locator('.btn-primary');
        this.removeQestBtn = page.locator('.btn-danger');
        this.noQuestAlert = page.locator('.alert-danger');
        this.questionInputField = page.locator('id=question');
        this.answerInputField = page.locator('id=answer');
        this.createQuestBtn = page.locator('.btn-success');
        this.sidebarText = page.locator('.sidebar');
        this.questionTxt = page.locator('.question__question');
        this.answerTxt = page.locator('.question__answer');
        this.createdQestHeader = page.locator('.tooltipped-title__title >> nth=0');
        this.createNewQHeader = page.locator('.tooltipped-title__title >> nth=1');
        this.createdQestToolTip = page.locator('.tooltipped-title__tooltip >> nth=0');
        this.createNewQTooltip = page.locator('.tooltipped-title__tooltip >> nth=1');
        
       
    }
    async typeQuestion(questionTxt: string) {
        await this.questionInputField.fill(questionTxt);
    }
    async typeAnswer(answerTxt: string) {
        await this.answerInputField.fill(answerTxt);
    }
    async clickCreateQBtn() {
        await this.createQuestBtn.click();
    }
    async submitNewQuestion(questionTxt: string, answerTxt: string) {
        await this.typeQuestion(questionTxt);
        await this.typeAnswer(answerTxt);
        await this.clickCreateQBtn();
    }
    sidebarTxt() {
        return this.page.locator('.sidebar');
    }
    async clickSortBtn() {
        await this.sortBtn.click();
    }
    async clickRemoveQuestBtn() {
        await this.removeQestBtn.click();
    }
    
} 