# Lab8_Starter
Yang Lu

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)  
-- We put build and test together, and made it triggered by push operation (when a pull request is merged, it's a push). The pipeline should first check the code error and code style then build the project and run the tests.

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
Yes. I can test whether the message is processed correctly before sending it and mock the receiver and test whether if it's correctly processed the message before showing to the user as we want. Although I can also create tests to test the end to end message function that is not in the category of unit test.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
Yes, I will, as long as we have a max message length limit. I will use unit test to test the function which implement this max message length feature

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
It will run without UI, it will not open an browser window. But I can look at the console.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
I will use the async keyword followed by a function to click the img element in the header and wait.
