const waitFor = (time = 2000) => cy.wait(time);
// const searchTerm = "Amlodipine";
describe("Add test from JSON", () => {
  before(() => {
    cy.visit("https://staging.meditour.global/");
    // cy.pause(); // DEBUG: Check if the page is fully loaded
    waitFor();
    cy.contains("button", "Update").should("be.visible").click();
    waitFor();
    cy.contains("Join as Provider").should("be.visible").click();
    waitFor();
    cy.contains("Laboratory").should("be.visible").click();
    waitFor();
    cy.get('input[placeholder="Email"]').type("hussain14.cs@gmail.com", {
      delay: 50,
    });
    cy.get('input[placeholder="Password"]').type("Admin@123", {
      delay: 50,
    });

    // Debug before clicking the eye icon
    cy.get('input[placeholder="Password"]').parent().find("svg").debug(); // DEBUG: Check if the eye icon selector is correct
    cy.get("button").contains("Login").click();
    waitFor();
    cy.contains("Tests").click();
    waitFor();
    cy.fixture("labtests").then((data) => {
      cy.wrap(data).as("testData");
    });
  });

  it("should add the test", function () {
    this.testData.forEach((tests) => {
      cy.get("button").contains("+ Add Test").click();
      waitFor();

      cy.get('input[placeholder="Search Test"]')
        .clear()
        .type(tests.searchTerm)
        .should("have.value", tests.searchTerm);

      cy.wait(1000);

      cy.get("div.styles_searchResults__RW1ud", { timeout: 10000 })
        .should("be.visible")
        .contains(tests.searchTerm)
        .click();

      waitFor();
      cy.get("body").click(0, 0);
      waitFor();

      cy.get('[role="combobox"]').eq(0).click();
      cy.get('[role="option"]').contains(tests.specimenType).click();
      waitFor();

      cy.get('input[placeholder="Actual Price"]').type(tests.actualPrice);
      waitFor();
      cy.get('input[placeholder="MediTour Price"]').type(tests.meditourPrice);
      waitFor();

      cy.get('textarea[placeholder="Test Description"]').type(
        tests.description
      );
      waitFor();

      cy.contains("Save").click();
      waitFor();

      // 🔍 Check if toast appears
      cy.get("body").then(($body) => {
        const toastExists = $body.find(".Toastify__toast-body").length > 0;

        if (toastExists) {
          const message = $body.find(".Toastify__toast-body").text();
          if (message.includes("A test with this name already exists.")) {
            cy.log("⚠️ Test already exists. Skipping to next.");
            cy.contains("Tests").click();
            waitFor();
            return; // Go to next item in loop
          }
        }

        // ✅ Else block: test was added successfully
        cy.log("✅ Test added successfully.");
        cy.contains("Tests").click(); // Reset for next test
        waitFor();
      });
    });
  });
});
