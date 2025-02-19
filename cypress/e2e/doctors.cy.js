describe("Signup Page Test", () => {
  it("should load the signup page", () => {
    cy.visit("https://meditour.global");
    // cy.pause(); // DEBUG: Check if the page is fully loaded

    cy.contains("Log In").should("be.visible").click();
    cy.url().should("include", "/user/login");
    cy.get('input[placeholder="Email"]').type("wesabe1096@ikowat.com", {
      delay: 50,
    });
    cy.get('input[placeholder="Password"]').type("Admin@123", {
      delay: 50,
    });

    // Debug before clicking the eye icon
    cy.get('input[placeholder="Password"]').parent().find("svg").debug(); // DEBUG: Check if the eye icon selector is correct
    cy.get('input[placeholder="Password"]').parent().find("svg").click();

    cy.contains("Login").click();
    cy.contains("Services").should("be.visible").click();
    cy.wait(2000);
    cy.contains("Doctors").should("be.visible").click();
    cy.url().should("include", "/doctor/Selection");
    cy.wait(1000);
    cy.contains("Doctors").should("be.visible").click();
    cy.url().should("include", "/doctor");
    cy.wait(2000);
    cy.get('input[placeholder="Search...."]').type("Zubair{enter}");
    cy.wait(2000);
    cy.contains("zubair").should("be.visible").click();
    cy.url().should("include", "/DoctorDetail");
    cy.wait(4000);
    cy.contains("Appointment").should("be.visible").click();

    cy.url().should("include", "/DoctorAppoinmentPay");
    cy.contains("Appointment Type").should("be.visible"); // Ensure section is visible
    cy.contains("Clinic").should("be.visible").click();
    cy.wait(2000);
    cy.contains("Continue").should("be.visible").click();
    cy.wait(2000);
    cy.contains("Payment").should("be.visible"); // Ensure section is visible
    cy.contains("International").should("be.visible").click();
    cy.contains("PAYMENT").should("be.visible").click();
    cy.wait(2000);
    //CARD PAYMENT
    cy.url().should("include", "/paymentDetail");
    cy.get('[data-testid="card"]', { timeout: 20000 }).should(
      "have.class",
      "p-Tab--selected"
    );
    cy.contains("Card number").should("be.visible");
    cy.get('input[placeholder="1234 1234 1234 1234"]').type(
      "5555 5555 5555 4444",
      {
        delay: 50,
      }
    );
    cy.contains("Expiration date").should("be.visible");
    cy.get('input[placeholder="MM / YY"]').type("02 / 22", {
      delay: 50,
    });
    cy.contains("Security code").should("be.visible");
    cy.get('input[placeholder="CVC"]').type("123", {
      delay: 50,
    });
    cy.contains("Country").should("be.visible");
    cy.get("#country").select("Pakistan");
    // cy.get("body").debug();
  });
});
