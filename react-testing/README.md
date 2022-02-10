# React Testing

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Run `npm start` to start the application.  
Run `npm test` to test the application.  

This is a repository that showcases how to write unit tests, integration tests, and end-to-end (E2E) tests using Jest, React Testing Library, and Cypress.
- [Jest](https://jestjs.io/) is a JS testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) is a React testing library used with Jest
- [Pupeteer](https://github.com/puppeteer/puppeteer) is a library that provides a Chrome API to run E2E tests

### Jest
Jest will pick up any tests as defined under https://create-react-app.dev/docs/running-tests/. In this project, I am defining my tests under __tests__ folders. To run the tests, execute ```npm test```.

### react-test-renderer
[react-test-renderer](https://reactjs.org/docs/test-renderer.html) is a package that provides a React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.

It is helpful for snapshot testing. Snapshot tests are a very useful tool whenever you want to make sure your UI does not change unexpectedly. Read more here https://jestjs.io/docs/snapshot-testing.

The test case "Renderer tree matches todo.test.js.snap" is an example of snapshot testing using the react-test-renderer library.