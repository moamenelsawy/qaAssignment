import { test, expect } from './fixtures/fixtureQAformPage';
import * as tdata from "../tests/testData/testdataV0.1.json"  

test.describe.parallel('ExtensiveTestSuite', () => {
  

test('AddNewQuestionOnEmptyList', async ({ page, baseURL, qaForm}) => {
    // Go to the main page.
  await page.goto(tdata.baseURL);
    //click on Remove button
  await qaForm.removeQestBtn.click(); 
  await expect (qaForm.noQuestAlert).toBeVisible;
    //create a multiple Q/A(s) 
  await qaForm.submitNewQuestion(tdata.questBody,tdata.answerBody);
  const newQ ='Question no.2 What about your first oscar?'
  const newA ='Answer no.2 yea what about it..'
  await qaForm.submitNewQuestion(newQ,newA);
  //validate no. of questions shown in the side bar 
  await expect (qaForm.sidebarText).toContainText('2');
  //Validate sort & remove buttons are displayed again
  await expect (qaForm.sortBtn).toBeVisible();
  await expect (qaForm.removeQestBtn).toBeVisible();
});

test('CheckEmptyTextFieldsValidations', async ({page,baseURL,qaForm}) =>{
    // Go to the main page.
    await page.goto(tdata.baseURL);
    //Fill in the answer input field only and click create question
    await qaForm.typeAnswer(tdata.answerBody);
    await qaForm.clickCreateQBtn();
    //Validate the question isn't added to the list
    var questionsList = await page.$$('.question__question');
    expect (questionsList.length).toBe(1);
    await expect (qaForm.sidebarText).toContainText('1');
    //Fill in the question field only and click creatte question
    await qaForm.typeAnswer('');
    await qaForm.typeQuestion(tdata.questBody);
    await qaForm.clickCreateQBtn();
    expect (questionsList.length).toBe(1);
    await expect (qaForm.sidebarText).toContainText('1');
}
);

test('fillTxtFieldsWithEmptySpaces',async ({page,baseURL,qaForm}) => {
    // Go to the main page
    await page.goto(tdata.baseURL);
    //fill in the question input with empty space
    await qaForm.typeQuestion('   ');
    //fill in the answer input with empty space
    await qaForm.typeAnswer('   ');
    //click create question button
    await qaForm.clickCreateQBtn();
    //validate Q/A isn't accepted by the system 
    const questionsList = await page.$$('.question__question');
    expect (questionsList.length).toBe(1);
    expect (qaForm.sidebarText).toContainText('2');

});

test('ValdiatePageContents',async ({page, baseURL,qaForm}) => {
    // Go to the main page
    await page.goto(tdata.baseURL);
    //Validate title
    await expect (qaForm.pageTitle).toBeVisible();
    expect (qaForm.pageTitle).toHaveText(tdata.pageTitleText);
    expect (qaForm.createdQestHeader).toHaveText(tdata.header1Text);
    expect (qaForm.createNewQHeader).toHaveText(tdata.header2Text);
    expect (qaForm.sidebarText).toHaveText(tdata.initialSidebarText);
    expect (qaForm.questionTxt).toHaveText(tdata.initalQuestbody);
    await qaForm.questionTxt.click();
    await expect (qaForm.answerTxt).toHaveText(tdata.initalAnswerBody);
    //Taking a screenshot of the current page view, can be found in test-results folder
    await page.screenshot({path: 'screenshot/visibleWindow.png'})

});

test('ValdiateHoverTooltips',async ({page, baseURL,qaForm}) => {
  // Go to the main page
  await page.goto(tdata.baseURL);
  //Hover over the 1st header and validate the tool tip text
  await qaForm.createdQestHeader.hover();
  await expect (qaForm.createdQestToolTip).toBeVisible();
  await expect (qaForm.createdQestToolTip).toHaveText(tdata.tooltip1Txt);
  //Hover over the 2nd header and validate the tool tip text
  await qaForm.createNewQHeader.hover();
  await expect (qaForm.createNewQTooltip).toBeVisible();
  await expect (qaForm.createNewQTooltip).toHaveText(tdata.tooltip2Txt);
  
});

});