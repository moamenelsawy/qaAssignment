
import { test, expect } from './fixtures/fixtureQAformPage'; 
import * as tdata from "./testData/testdataV0.1.json"  


//Config execution to be parallel 
test.describe.serial('MVP-HappyFlows',() => {
 

  test('AddNewQuestion', async ({ page, baseURL, qaForm}) => {

  // Go to the main page.
  await page.goto(tdata.baseURL);
  //fill in the Q/A fields and submit the question
  await qaForm.typeQuestion(tdata.questBody);
  await qaForm.typeAnswer(tdata.answerBody);
  await qaForm.clickCreateQBtn();
  //validate no. of questions updated
  await expect (qaForm.sidebarTxt()).toContainText(tdata.totalQuestionsCount);
  //Validate the newly created question added to the list.
  const allQuestions = page.locator("[class = 'question__question']:nth-child(1)");
  await expect(allQuestions).toHaveText([tdata.initalQuestbody, tdata.questBody]);

  //open the newly added question at the bottom of the list
  const questionsList = await page.$$('.question__question');
  const lastQuestion = questionsList[questionsList.length-1];
  await lastQuestion.click();
  //validate the correct answer text is visible
  await expect (page.getByText(tdata.answerBody)).toBeVisible();
});

test('SortQuestionsList', async ({ page, baseURL, qaForm}) => {
  // Go to the main page.
  await page.goto(tdata.baseURL);
  //create multiple new Q/A 
  await qaForm.submitNewQuestion(tdata.questBody,tdata.answerBody);
  await qaForm.submitNewQuestion(tdata.extraQ1,'Answer for question A');
  await qaForm.submitNewQuestion(tdata.extraQ2,'Second place that is correct');
  //click on Sort button
  await qaForm.clickSortBtn();
  //Validating the new order of questions 
  const allQuestions = page.locator("[class = 'question__question']:nth-child(1)");
  await expect(allQuestions).toHaveText([tdata.extraQ1,tdata.extraQ2,tdata.initalQuestbody, tdata.questBody]);


});

test('RemoveQuestionsList', async ({ page, baseURL, qaForm}) => {
  // Go to the main page.
  await page.goto(tdata.baseURL);
  //click on Remove button
  await qaForm.clickRemoveQuestBtn();
  //validate the empty list alert is displayed and sorting, Remove buttons are gone 
  await expect (qaForm.noQuestAlert).toBeVisible();
  await expect (qaForm.sortBtn).toBeHidden();
  await expect (qaForm.removeQestBtn).toBeHidden();
  //Validate the sidebar text is update correcty with the empty state
  await expect (qaForm.sidebarText).toHaveText(tdata.noQestionsSideBarTxt);
});

});
