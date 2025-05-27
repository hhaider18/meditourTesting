const waitFor = (time = 2000) => cy.wait(time);

const emails = "main-hosp11323@gmail.com";
//   "hussain14.cs@gmail.com",
//   "clinic-user99@gmail.com"

const repeatCount = 1; // How many times to run each email

describe("Hospital Login Loop with Multiple Emails and Iterations", () => {
  before(() => {
    cy.visit("https://staging.meditour.global/");
    waitFor();
    cy.contains("button", "Update").should("be.visible").click();
    waitFor();

    cy.contains("Join as Provider").should("be.visible").click();
    cy.url().should("include", "/joinVender");
    cy.contains("Hospitals & Clinics").should("be.visible").click();
    cy.url().should("include", "/hospital/login");

    cy.get('input[placeholder="Email"]').type(emails, { delay: 50 });
    cy.get('input[placeholder="Password"]').type("Admin@123", {
      delay: 50,
    });
    cy.get('input[placeholder="Password"]').parent().find("svg").click();
    cy.get("button").contains("Login").click();
    waitFor();
    // Add Treatment
    cy.contains("Treatments or Surgery").should("be.visible").click();
    waitFor();
    cy.fixture("treatments").then((data) => {
      cy.wrap(data).as("treatmentData");
    });
  });

  it("Add Treatments", function () {
    this.treatmentData.forEach((treatments) => {
      // --------------------------ADD TREATMENT FLOW-----------------------------
      cy.contains("+ Add").should("be.visible").click();
      cy.contains(treatments.categoryName)
        .scrollIntoView()
        .should("be.visible")
        .then(($el) => {
          cy.wrap($el)
            .parent()
            .find('svg[data-testid="ChevronRightIcon"]')
            .should("exist")
            .click({ force: true });
        });

      waitFor(); // wait for animation to expand

      // Check nested checkboxes
      cy.contains(treatments.categoryName)
        .parent()
        .find('input[type="checkbox"]')
        .check({ force: true });
      waitFor();
      // Click the Add button by class at the bottom
      cy.get("button.style_addbtn__Ilfel").eq(1).click({ force: true });

      // Logout
      // cy.contains("Logout").should("be.visible").click();

      // cy.url().should("include", "/hospital/login");
    });
  });
});
