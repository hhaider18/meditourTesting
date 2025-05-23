const waitFor = (time = 2000) => cy.wait(time);
describe("Button Click Test", () => {
  it("clicks the treatment button and submits the form", () => {
    // Visit the page and debug to check initial state
    cy.visit("https://staging.meditour.global/");
    // cy.pause(); // DEBUG: Check if the page is fully loaded
    cy.contains("button", "Update").should("be.visible").click();
    waitFor();
    cy.contains("Join as Provider").should("be.visible").click();
    waitFor();
    cy.url().should("include", "/joinVender");
    waitFor();
    cy.contains("Laboratory").should("be.visible").click();
    cy.url().should("include", "/laboratory/login");

    cy.get('input[placeholder="Email"]').type("hussain14.cs@gmail.com", {
      delay: 50,
    });
    cy.get('input[placeholder="Password"]').type("Admin@123", {
      delay: 50,
    });

    // Debug before clicking the eye icon
    cy.get('input[placeholder="Password"]').parent().find("svg").debug(); // DEBUG: Check if the eye icon selector is correct
    cy.get('input[placeholder="Password"]').parent().find("svg").click();
    waitFor();
    cy.get("button").contains("Login").click();
    waitFor();
    cy.contains("Profile").should("be.visible").click();
    cy.url().should("include", "/laboratory/LaborteryProfile");
    waitFor();
    cy.get(
      "/html/body/div[2]/div[1]/div/div[2]/div[2]/div[2]/div[2]/svg/path"
    ).click();
  });
});
