describe("Signup Page Test", () => {
  it("should load the signup page", () => {
    cy.visit("https://meditour.global");
    // cy.pause(); // DEBUG: Check if the page is fully loaded

    cy.contains("Join As a Provider").should("be.visible").click();
    cy.url().should("include", "/joinVender");
    cy.contains("Hotel").should("be.visible").click();
    cy.url().should("include", "/hotel/login");

    cy.get('input[placeholder="Email"]').type("hussain14.cs@gmail.com", {
      delay: 50,
    });
    cy.get('input[placeholder="Password"]').type("Admin@123", {
      delay: 50,
    });

    // Debug before clicking the eye icon
    cy.get('input[placeholder="Password"]').parent().find("svg").debug(); // DEBUG: Check if the eye icon selector is correct
    cy.get('input[placeholder="Password"]').parent().find("svg").click();

    cy.get("button").contains("Login").click();
    cy.contains("Property").should("be.visible").click();
    cy.url().should("include", "/Property");
    cy.wait(2000);
    cy.get("button").contains("+ Add").click();
    cy.get("button").contains("Get Started").click();
    cy.contains("House").should("be.visible").click();
  });
});
