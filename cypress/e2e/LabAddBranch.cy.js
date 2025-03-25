const waitFor = (time = 2000) => cy.wait(time);
describe("Signup Page Test", () => {
  it("should load the signup page", () => {
    cy.visit("https://staging.meditour.global/");
    // cy.pause(); // DEBUG: Check if the page is fully loaded
    waitFor();
    cy.contains("button", "Update").should("be.visible").click();
    waitFor();
    cy.contains("Join as Provider").should("be.visible").click();
    cy.url().should("include", "/joinVender");
    waitFor();
    cy.contains("Laboratory").should("be.visible").click();
    cy.url().should("include", "/laboratory/login");
    waitFor();
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
    waitFor();
    cy.contains("Manage Branches").should("be.visible").click();
    cy.url().should("include", "/laboratory/branches");
    waitFor();
    cy.get("button").contains("+ Add Branch").click();
    cy.get('input[placeholder="Branch Code"]').type("Branch-002", {
      delay: 50,
    });
    cy.get("#react-select-2-input").type("123 Main Street", { force: true }); // Type the address text

    // Wait for suggestions to load (optional)
    cy.wait(1000);

    // Select the first address suggestion from the autocomplete dropdown
    cy.get(".pac-item").first().click({ force: true });
    cy.get('input[placeholder="Branch Code"]').type("Branch-002", {
      delay: 50,
    });
    cy.get('input[placeholder="Phone"]').type("+923226624682", {
      delay: 50,
    });
    waitFor();
    cy.get('input[placeholder="Email"]').type("hussain44@gmail.com", {
      delay: 50,
    });
    cy.contains("Save").click();
  });
});
