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

        cy.contains("button", "Free OPD").should("be.visible").click();
        waitFor();
        // Fill the form
        cy.get('input[placeholder="Name"]').clear().type(name, { delay: 50 });
        cy.get('input[placeholder="Phone Number"]')
          .clear()
          .type(phone, { delay: 50 });
        cy.get('input[placeholder=" Email(Optional)"]')
          .clear()
          .type(email, { delay: 50 });

        // Optional message field
        cy.get('textarea[placeholder=" Message(Optional)"]').type(
          "I need an appointment",
          { delay: 50 }
        );

        // Submit
        cy.contains("button", "Submit").click();
        waitFor();
      });
    }
  });
});
