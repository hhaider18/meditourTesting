const waitFor = (time = 2000) => cy.wait(time);

describe("Add test using dynamic API data", () => {
  before(() => {
    cy.visit("https://staging.meditour.global/");
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
    cy.get('input[placeholder="Password"]').type("Admin@123", { delay: 50 });
    cy.get("button").contains("Login").click();
    waitFor();
    cy.contains("Tests").click();
    waitFor();
  });

  it("should add a new test using data from API", () => {
    cy.request(
      "GET",
      "https://medi-tour-86152928b53d.herokuapp.com/lab/getAllTests"
    ).then((response) => {
      expect(response.status).to.eq(200);

      const testsArray = response.body.data; // ✅ Fix: Access the actual array

      testsArray.forEach((testItem) => {
        const testName = testItem.name;

        const specimenTypes = ["Blood", "Urine", "Saliva"];
        const specimenType =
          specimenTypes[Math.floor(Math.random() * specimenTypes.length)];
        const actualPrice = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
        const meditourPrice = Math.floor(Math.random() * (800 - 50 + 1)) + 50;
        const description = `Auto-generated description for ${testName}`;

        cy.get("button").contains("+ Add Test").click();
        waitFor();

        cy.get('input[placeholder="Search Test"]')
          .clear()
          .type(testName)
          .should("have.value", testName);

        cy.wait(1000);

        cy.get("div.styles_searchResults__RW1ud", { timeout: 10000 })
          .should("be.visible")
          .contains(testName)
          .click();

        cy.get("body").click(0, 0); // 👈 make sure dropdown closes here
        waitFor();
        cy.get('[role="combobox"]').eq(0).click();
        cy.get('[role="option"]').contains(specimenType).click();
        waitFor();

        cy.get('input[placeholder="Actual Price"]').type(
          actualPrice.toString()
        );
        waitFor();
        cy.get('input[placeholder="MediTour Price"]').type(
          meditourPrice.toString()
        );
        waitFor();

        cy.get('textarea[placeholder="Test Description"]').type(description);
        waitFor();

        cy.contains("Save").click();
        waitFor();

        // Toast check
        cy.get("body").then(($body) => {
          const toast = $body.find(".Toastify__toast-body");

          if (toast.length > 0) {
            const message = toast.text().trim();
            if (message.includes("A test with this name already exists.")) {
              cy.log(`⚠️ Test "${testName}" already exists. Skipping.`);
              cy.contains("Tests").click();
              waitFor();
            } else {
              cy.log(`ℹ️ Toast appeared: ${message}`);
              cy.contains("Tests").click();
              waitFor();
            }
          } else {
            cy.log(`✅ Test "${testName}" added successfully.`);
            cy.contains("Tests").click();
            waitFor();
          }
        });
      });
    });
  });
});
