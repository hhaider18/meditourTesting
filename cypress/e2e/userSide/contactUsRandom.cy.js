const waitFor = (time = 2000) => cy.wait(time);
import { faker } from "@faker-js/faker";
const generateOPDReq = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number("03#########"),
  city: faker.location.streetAddress(),
});

describe("Free OPD Form Submission", () => {
  it("Submit form for user", function () {
    const users = Array.from({ length: 1 }, () => generateOPDReq());
    users.forEach((user) => {
      cy.visit("https://staging.meditour.global/");
      waitFor();

      cy.contains("button", "Update").should("be.visible").click();
      waitFor();

      cy.contains("Contact Us").should("be.visible").click();
      waitFor();

      // Fill the form
      cy.get('input[placeholder="Your name*"]')
        .clear()
        .type(user.name, { delay: 50 });

      cy.get('input[placeholder="Email*"]')
        .clear()
        .type(user.email, { delay: 50 });

      cy.get('input[placeholder="Phone Number*"]')
        .clear()
        .type(user.phone, { delay: 50 });

      cy.get('input[placeholder="City*"]')
        .clear()
        .type(user.city, { delay: 50 });

      // Optional message field
      cy.get('textarea[placeholder="Your Message"]').type(
        "I need an appointment",
        { delay: 50 }
      );

      // Submit
      cy.contains("button", "Submit").click();
      waitFor();
    });
  });
});
