# React Testing

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Run `yarn start` to start the application.  
Run `yarn test` to test the application.  

This is a repository that showcases how to write unit tests, integration tests, and end-to-end (E2E) tests using Jest, React Testing Library, and Cypress.
- [Jest](https://jestjs.io/) is a JS testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) is a React testing library used with Jest
- [Cypress](https://www.cypress.io/) is a library that provides a Chrome API to run E2E tests

### Unit vs integration vs E2E Tests
Unit Test: Fully isolated tests that test a single functionality. You want to write a bunch of these tests in your application. The `todo.test.js` has examples of unit tests. 

Integration Test: Testing multiple units of code, resulting in one larger test. Has multiple assertions. These types of tests have dependencies, so it can test a function that calls a function. You want to write a good amount of these tests in your application. The `todo-list.test.js` file has examples of integration tests.

E2E Tests: Full flow of the application, from start to end of user interactions. You want to write a few of these tests in your application.

### Jest
Jest will pick up any tests as defined under https://create-react-app.dev/docs/running-tests/. In this project, I am defining my tests under __tests__ folders. To run the tests, execute ```yarn test```.

### react-test-renderer
[react-test-renderer](https://reactjs.org/docs/test-renderer.html) is a package that provides a React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.

It is helpful for snapshot testing. Snapshot tests are a very useful tool whenever you want to make sure your UI does not change unexpectedly. Read more here https://jestjs.io/docs/snapshot-testing.

The test case "Renderer tree matches todo.test.js.snap" is an example of snapshot testing using the react-test-renderer library.

### Cypress
To run Cypress, execute `yarn run cypress open`. This will open a new window with the E2E tests. When you run a test on Cypress, you can see in real-time that the user events are being executed on the Chrome browser.

Finding components on the UI using Cypress may be a pain, but thankfully Cypress UI integrates something called the "Selector Playground". Find more information on how to use this feature here https://www.youtube.com/watch?v=rNd047wXtwo.
