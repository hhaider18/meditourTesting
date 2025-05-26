const waitFor = (time = 2000) => cy.wait(time);
import { faker } from "@faker-js/faker";
const generateOPDReq = () => ({
  name: faker.person.fullName(),
  phone: faker.phone.number("03#########"),
  email: faker.internet.email(),
  description: faker.location.streetAddress(),
});

describe("Free OPD Form Submission", () => {
  before(() => {
    cy.visit("https://staging.meditour.global/");
    waitFor();

    cy.contains("button", "Update").should("be.visible").click();
    waitFor();

    cy.contains("button", "Free OPD").should("be.visible").click();
    waitFor();
  });
  it("Submit form for", function () {
    const users = Array.from({ length: 2 }, () => generateOPDReq());
    users.forEach((user) => {
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
