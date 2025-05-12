const waitFor = (time = 2000) => cy.wait(time);

const emails = [
  "main-hosp11323@gmail.com",
  "hussain14.cs@gmail.com",
  // "clinic-user99@gmail.com",
];

const repeatCount = 10; // How many times to run each email

describe("Hospital Login Loop with Multiple Emails and Iterations", () => {
  emails.forEach((email) => {
    for (let i = 1; i <= repeatCount; i++) {
      it(`Login & Logout [${email}] - Iteration #${i}`, () => {
        cy.visit("https://staging.meditour.global/");
        waitFor();
        cy.contains("button", "Update").should("be.visible").click();
        waitFor();

        cy.contains("Join as Provider").should("be.visible").click();
        cy.url().should("include", "/joinVender");
        cy.contains("Hospitals & Clinics").should("be.visible").click();
        cy.url().should("include", "/hospital/login");

        cy.get('input[placeholder="Email"]').type(email, { delay: 50 });
        cy.get('input[placeholder="Password"]').type("Admin@123", {
          delay: 50,
        });
        cy.get('input[placeholder="Password"]').parent().find("svg").click();
        cy.get("button").contains("Login").click();
        waitFor();

        // Logout
        cy.contains("Logout").should("be.visible").click();
        cy.url().should("include", "/hospital/login");

        waitFor(1000);
      });
    }
  });
});
