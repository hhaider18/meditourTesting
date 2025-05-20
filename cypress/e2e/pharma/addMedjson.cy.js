const waitFor = (time = 2000) => cy.wait(time);
// const searchTerm = "Amlodipine";
describe("Add mediciens from JSON", () => {
  before(() => {
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
    cy.get("button").contains("Login").click();
    waitFor();
    cy.fixture("medicines").then((data) => {
      cy.wrap(data).as("medData");
    });
  });

  it("should add the medicine", function () {
    this.medData.forEach((meds) => {
      cy.get("button").contains(" + Add").click();
      waitFor();

      cy.get('input[placeholder="Search Here"]').type(meds.searchTerm);
      waitFor();
      cy.get("ul > li").first().click();
      waitFor();
      cy.get("body").click(0, 0);
      waitFor();
      cy.get('input[placeholder="Brand"]').type(meds.brand);
      waitFor();
      cy.get("#productType").select(meds.productType);
      cy.get("#productType").should("have.value", meds.productType);
      waitFor();
      cy.get('input[placeholder="Strength"]').type(meds.strength);
      waitFor();
      cy.get('input[placeholder="Pack Size"]').type(meds.packSize);
      waitFor();
      cy.get('input[placeholder="Content"]').type(meds.content);
      waitFor();
      cy.get('input[placeholder="T.P Price"]').type(meds.tpPrice);
      waitFor();
      cy.get('input[placeholder="M.R.P Price"]').type(meds.mrpPrice);
      waitFor();
      cy.get(".styles_imagePicker__CiqCe").click();
      cy.get('input[type="file"]').attachFile(`medicines/${meds.image}`);
      // Optional: assert image is uploaded/displayed
      cy.contains("Upload Photos").should("be.visible");
      waitFor();

      cy.contains("Save").click();
    });
  });
});
