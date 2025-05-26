const waitFor = (time = 2000) => cy.wait(time);
describe("Free OPD Form Submission", () => {
  before(() => {
    cy.visit("https://staging.meditour.global/");
    waitFor();
    cy.contains("button", "Update").should("be.visible").click();
    waitFor();
    cy.contains("button", "Free OPD").should("be.visible").click();
    waitFor();
    cy.fixture("OPDForm").then((data) => {
      cy.wrap(data).as("usersData");
    });
  });
  it("Submit form for OPD from JSON file", function () {
    this.usersData.forEach((user) => {
      // Fill the form
      cy.get('input[placeholder="Name"]')
        .clear()
        .type(user.name, { delay: 50 });
      cy.get('input[placeholder="Phone Number"]')
        .clear()
        .type(user.phone, { delay: 50 });
      cy.get('input[placeholder=" Email(Optional)"]')
        .clear()
        .type(user.email, { delay: 50 });

      // Optional message field
      cy.get('textarea[placeholder=" Message(Optional)"]').type(
        user.description,
        { delay: 50 }
      );
      // Submit
      cy.contains("button", "Submit").click();
      waitFor();
    });
  });
});
