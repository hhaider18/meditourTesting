const waitFor = (time = 2000) => cy.wait(time);
const repeatCount = 1;

const users = [
  {
    name: "Hussain Haider",
    phone: "03226624682",
    email: "hussain14.cs@gmail.com",
    city: "Lahore",
  },
  //   {
  //     name: "Zair Ali",
  //     phone: "03217251807",
  //     email: "zairali22@gmail.com",
  //     city: "Islamabad",
  //   },
];

describe("Free OPD Form Submission", () => {
  users.forEach((user) => {
    for (let i = 1; i <= repeatCount; i++) {
      it(`Submit form for ${user.name} | ${user.phone} | ${user.email} | ${user.city} - Iteration #${i}`, () => {
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
    }
  });
});
