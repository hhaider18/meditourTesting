describe("Button Click Test", () => {
  it("clicks the treatment button and submits the form", () => {
    // Visit the page and debug to check initial state
    cy.visit("https://meditour.global");
    cy.pause(); // DEBUG: Check if the page is fully loaded

    cy.contains("Log In").should("be.visible").click();
    cy.url().should("include", "/user/login");
    cy.get('input[placeholder="Email"]').type("wesabe1096@ikowat.com", {
      delay: 100,
    });
    cy.get('input[placeholder="Password"]').type("Admin@123", {
      delay: 100,
    });

    // Debug before clicking the eye icon
    cy.get('input[placeholder="Password"]').parent().find("svg").debug(); // DEBUG: Check if the eye icon selector is correct
    cy.get('input[placeholder="Password"]').parent().find("svg").click();

    cy.contains("Login").click();
    cy.pause(); // DEBUG: Verify if login was successful

    // Ensure successful login
    cy.url().should("not.include", "/user/login");
    cy.contains("Find Treatments").should("be.visible").click();
    cy.url().should("include", "/treatment");

    // Debug to verify navigation to treatment page
    cy.url().debug(); // DEBUG: Check if the URL is correct
    cy.pause();
    // Click on specific treatment
    cy.contains("Kidney Transplant").should("be.visible").click();
    cy.pause();
    cy.url().should("include", "/Details");
    cy.contains("About Kidney Transplant").should("be.visible");
    cy.pause();
    // Ensure the form is visible
    cy.contains("Get Free Consultancy").should("be.visible");

    // Fill out the form fields
    cy.get('input[placeholder="Enter Name"]').type("Hussain Haider", {
      delay: 100,
    });
    cy.get('input[placeholder="Enter Phone Number"]').type("1234567890", {
      delay: 100,
    });

    cy.get('input[placeholder="Enter Email"]')
      .clear({ delay: 100 })
      .type("hussain44@gmail.com", { delay: 100 });
    cy.get('textarea[placeholder="Enter Description"]').type(
      "This is a test description.",
      { delay: 200 }
    );

    // Debug before form submission
    cy.pause(); // DEBUG: Check form fields before submission

    // Submit the form
    cy.wait(1000);
    cy.contains("Submit").click();

    // Debug to verify form submission success message
    // cy.contains("Your request has been submitted").debug(); // DEBUG: Check submission confirmation
    cy.pause();
    // Logout
    cy.contains("Ali Hussain").should("be.visible").click();
    cy.wait(1000);
    cy.contains("Logout").click();
  });
});
