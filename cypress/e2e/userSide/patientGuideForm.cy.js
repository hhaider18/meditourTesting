const waitFor = (time = 2000) => cy.wait(time);
const repeatCount = 1;

const names = ["Hussain Haider", "Zair Ali"];
const phoneNumbers = ["03226624682", "03217251807"];
const emails = ["hussain14.cs@gmail.com", "zairali22@gmail.com"];

describe("Free OPD Form Submission", () => {
  names.forEach((name, index) => {
    const phone = phoneNumbers[index];
    const email = emails[index];

    for (let i = 1; i <= repeatCount; i++) {
      it(`Submit form for ${name} | ${phone} | ${email} - Iteration #${i}`, () => {
        cy.visit("https://staging.meditour.global/");
        waitFor();

        cy.contains("button", "Update").should("be.visible").click();
        waitFor();

        cy.contains("Patient Guide").should("be.visible").click();
        waitFor();
        // Fill the form
        // Fill the form fields
        cy.get('input[placeholder=" Write here..."]')
          .eq(0)
          .clear()
          .type(name, { delay: 100 }); // Name
        waitFor();
        cy.get('input[placeholder=" Write here..."]')
          .eq(1)
          .clear()
          .type(phone, { delay: 100 }); // Phone
        waitFor();
        cy.get('input[placeholder=" Write here..."]')
          .eq(2)
          .clear()
          .type(email, { delay: 100 }); // Email
        waitFor();
        cy.get('textarea[placeholder=" Write here..."]')
          .clear()
          .type("I need an appointment", { delay: 100 }); // Message
        waitFor();
        // Submit
        cy.contains("button", "Submit").click();
        waitFor();
      });
    }
  });
});
