const waitFor = (time = 2000) => cy.wait(time);
describe("Button Click Test", () => {
  it("clicks the treatment button and submits the form", () => {
    // Visit the page and debug to check initial state
    cy.visit("https://staging.meditour.global/");
    // cy.pause(); // DEBUG: Check if the page is fully loaded
    waitFor();
    cy.contains("button", "Update").should("be.visible").click();
    waitFor();
    cy.contains("Log In").should("be.visible").click();
    cy.url().should("include", "/user/login");
    cy.get('input[placeholder="Email"]').type("hussain14.cs@gmail.com", {
      delay: 100,
    });
    cy.get('input[placeholder="Password"]').type("Admin@123", {
      delay: 100,
    });

    // Debug before clicking the eye icon
    cy.get('input[placeholder="Password"]').parent().find("svg").debug(); // DEBUG: Check if the eye icon selector is correct
    cy.get('input[placeholder="Password"]').parent().find("svg").click();

    cy.contains("Login").click();
    // cy.pause(); // DEBUG: Verify if login was successful
    waitFor();
    // Ensure successful login
    cy.url().should("not.include", "/user/login");
    cy.contains("Hussain").should("be.visible").click();
    cy.wait(1000);
    cy.contains("Order History").click();
    cy.wait(1000);
    cy.contains("Rizvi Laboratories").should("be.visible");
    cy.wait(1000);
    cy.contains("View Details").should("be.visible").click();
    cy.wait(1000);
    cy.contains("Download Result").should("be.visible").click();

    // Wait for some time to let the PDF open
    // cy.wait(1000); // Adjust time based on PDF loading

    // // Visit the site again
    // cy.visit("https://staging.meditour.global/");
  });
});
