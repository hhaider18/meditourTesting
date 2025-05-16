const waitFor = (time = 2000) => cy.wait(time);
const repeatCount = 1;

const users = [
  {
    name: "Hussain Haider",
    phone: "03226624682",
    email: "hussain14.cs@gmail.com",
  },
  {
    name: "Zair Ali",
    phone: "03217251807",
    email: "zairali22@gmail.com",
  },
];

describe("Free OPD Form Submission", () => {
  users.forEach((user) => {
    for (let i = 1; i <= repeatCount; i++) {
      it(`Submit form for ${user.name} | ${user.phone} | ${user.email} - Iteration #${i}`, () => {
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
          .type(user.name, { delay: 100 }); // Name
        waitFor();
        cy.get('input[placeholder=" Write here..."]')
          .eq(1)
          .clear()
          .type(user.phone, { delay: 100 }); // Phone
        waitFor();
        cy.get('input[placeholder=" Write here..."]')
          .eq(2)
          .clear()
          .type(user.email, { delay: 100 }); // Email
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
