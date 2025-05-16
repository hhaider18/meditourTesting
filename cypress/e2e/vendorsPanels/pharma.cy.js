const waitFor = (time = 2000) => cy.wait(time);
const searchTerm = "Amlodipine";
describe("Signup Page Test", () => {
  it("should load the signup page", () => {
    cy.visit("https://staging.meditour.global/");
    // cy.pause(); // DEBUG: Check if the page is fully loaded
    waitFor();
    cy.contains("button", "Update").should("be.visible").click();
    waitFor();
    cy.contains("Join as Provider").should("be.visible").click();
    waitFor();
    cy.contains("Pharmaceutical").should("be.visible").click();
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
    cy.get("button").contains(" + Add").click();
    waitFor();
    // Type into the search input
    // Type something in the input to trigger the list
    cy.get('input[placeholder="Search Here"]').type(searchTerm);
    waitFor();
    // Wait for options to appear and select the first one
    cy.get("ul > li") // 👈 adjust selector if needed
      .first()
      .click();
    waitFor();
    cy.get("body").click(0, 0); // Click at top-left to simulate user clicking outside
    waitFor();
    cy.get('input[placeholder="Brand"]').type("Pepsi");
    waitFor();
    cy.get("#productType").select("Tablet");
    cy.get("#productType").should("have.value", "Tablet");
    waitFor();
    cy.get('input[placeholder="Strength"]').type("Pepsi");
    waitFor();
    cy.get('input[placeholder="Pack Size"]').type("Pepsi");
    waitFor();
    cy.get('input[placeholder="Content"]').type("Pepsi");
    waitFor();
    cy.get('input[placeholder="T.P Price"]').type("Pepsi");
    waitFor();
    cy.get('input[placeholder="M.R.P Price"]').type("Pepsi");
    waitFor();
    // Click the parent div to reveal the hidden file input if necessary
    cy.get(".styles_imagePicker__CiqCe").click();

    // Now upload the image using the hidden input
    cy.get('input[type="file"]').attachFile("education.jpg");

    // Optional: assert image is uploaded/displayed
    cy.contains("Upload Photos").should("be.visible");
    waitFor();

    cy.contains("Save").click();
  });
});
