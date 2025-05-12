const waitFor = (time = 2000) => cy.wait(time);

const emails = [
  "main-hosp11323@gmail.com",
  "hussain14.cs@gmail.com",
  // "clinic-user99@gmail.com",
];

const repeatCount = 1; // How many times to run each email

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
        // Add Treatment
        cy.contains("Treatments or Surgery").should("be.visible").click();
        waitFor();

        //   waitFor();
        // Expand "AESTHETIC TREATMENTS""
        cy.contains("AESTHETIC TREATMENTS")

          .parent() // move to the container holding icon + label
          .find("img.style_iconMedium__PLCRg")
          .click({ force: true });
        waitFor();
        cy.contains("Laser Hair Removal").should("be.visible").click();
        waitFor();

        cy.get("body").then(($body) => {
          if ($body.find('button:contains("View")').length > 0) {
            cy.contains("View")
              .scrollIntoView()
              .should("be.visible")
              .click({ force: true });
            waitFor();
            cy.get(
              'svg path[d="M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z"]'
            )
              .parents("svg")
              .click({ force: true });
          }
        });

        // ADD TREATMENT FLOW
        //   cy.contains("+ Add").should("be.visible").click();
        //   cy.contains("AESTHETIC TREATMENTS")
        //     .parent() // get the container holding the label and the arrow
        //     // .find("")
        //     .find('svg[data-testid="ChevronRightIcon"]') // target the arrow
        //     .click({ force: true }); // force click in case it's not in the viewport

        //   waitFor();

        //   waitFor(); // wait for animation to expand

        //   // Check nested checkboxes
        //   cy.contains("Laser Hair Removal")
        //     .parent()
        //     .find('input[type="checkbox"]')
        //     .check({ force: true });
        //   //   waitFor();
        //   // Click the Add button by class at the bottom
        //   cy.get("button.style_addbtn__Ilfel").eq(1).click({ force: true });

        //   cy.contains("Sleeve Gastrectomy")
        //     .parent()
        //     .find('input[type="checkbox"]')
        //     .check({ force: true });

        //   cy.contains("BPD/DS")
        //     .parent()
        //     .find('input[type="checkbox"]')
        //     .check({ force: true });

        //   cy.contains("BARIATRIC SURGERY").click();

        // Logout
        cy.contains("Logout").should("be.visible").click();

        cy.url().should("include", "/hospital/login");

        waitFor(1000);
      });
    }
  });
});
