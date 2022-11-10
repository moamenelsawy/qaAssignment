import { test as orgTest } from "@playwright/test"
import QAform from '../POM/QAform'

type pomPage = {
    qaForm: QAform;
}


const extendedTest = orgTest.extend<pomPage>({

    qaForm: async ({ page }, use) => {
        await use(new QAform(page));
    }

})

export const test = extendedTest;
export const expect = extendedTest.expect;

