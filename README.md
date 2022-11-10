# Installation of playwrite
Requirements to run tests: 
Playwright
VisualStudio code
Node.js
A running https server

- Download VS code via https://code.visualstudio.com/
- Download Node.js via https://nodejs.org/en/
- Follow the instruction on this page to downlaod playwrite https://playwright.dev/docs/intro and make sure to include in your installation desktop chromimum and safari browsers. 
- Install the playwrite extension to your VS code plus an extension to the run the https server like https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer 

## Testsuite structure: 
Please refer to the test summary document https://docs.google.com/document/d/15Em6m_rrLJ6PXbpMzegxv5xsiUxmS8hyaQHitvZkWFg/edit?usp=sharing 

## Running tests:
- Clone or download the project in zip file
- open it with VS code
- Run the http server (if you have downloaded the live surver extension you will find a 'Go Live' button on the bottom right edge of your window click on it and it will simply start the server)
- Double check the baseURL variable if it's matching the server local address in your browser you can find it in /Users/momenelsawy/Downloads/qa-engineer-assignment-master/tests/testData/testdataV0.1.json 

For execution there are 2 modes. 
1) to run headless simply by typing the terminal 
npx playwright test
2) or headed with browsers are shown 
npx playwrite test --headed

and for turning on tracing for extra logs in execution 
npx playwrite test --trace on

The current configs are allowing 6 parallel workers to run on 2 browsers. 3 retries for failure with screenshots and videos

##Reports
A detailed http report will be displayed after each run
test-results folder contains all the screenshots and videos from previous runs.
Footer
