//firsttest.js

describe("My First Test", () => {
  it("Launch Browser and Navigate", () => {
    cy.visit("https://www.browserstack.com/");

    cy.title().should(
      "eq",
      "Most Reliable App & Cross Browser Testing Platform | BrowserStack"
    );
  });
});
