describe("Button Click Test", () => {
  it("clicks the treatment button", () => {
    // Visit the page
    cy.visit("https://meditour.global");
    cy.contains("Log In").should("be.visible");
    cy.contains("Log In").click();
    // Locate the button by its CSS selector and click it

    cy.url().should("include", "/user/login");
    cy.get('input[placeholder="Email"]').type("wesabe1096@ikowat.com", {
      delay: 100,
    });
    cy.get('input[placeholder="Password"]').type("Admin@123", {
      delay: 100,
    });
    cy.get(
      'svg path[d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"]'
    ).click();
    cy.wait(1000);
    cy.contains("Login").click();
    cy.wait(2000);
    // cy.get("header").should("be.visible");
    // Replace the selector with the correct one for your button
    // cy.contains("Find Treatments").should("be.visible");
    cy.contains("Find Treatments").click();
    // You can add assertions to verify the result after clicking the button
    cy.url().should("include", "/treatment"); // Example: Check if the user is redirected after clicking the button
    // cy.contains("Medical Treatments").should("be.visible");
    cy.wait(2000);
    cy.contains("Kidney Transplant").click();
    cy.url().should("includes", "/Details");
    cy.contains("About Kidney Transplant").should("be.visible");

    // Ensure the form is visible
    cy.contains("Get Free Consultancy").should("be.visible");

    // Fill out the form fields
    cy.get('input[placeholder="Enter Name"]').type("Hussain Haider", {
      delay: 100,
    });
    cy.get('input[placeholder="Enter Phone Number"]').type("1234567890", {
      delay: 100,
    });
    cy.get('input[placeholder="Enter Email"]').clear({ delay: 100 });
    cy.get('input[placeholder="Enter Email"]').type("hussain44@gmail.com", {
      delay: 100,
    });
    cy.contains("Kidney Transplant").should("be.visible");
    cy.get('textarea[placeholder="Enter Description"]').type(
      "This is a test description.",
      { delay: 200 }
    );
    // Adjust accordingly

    // Submit the form
    cy.wait(1000);
    cy.contains("Submit").click();
    cy.wait(1000);
    // cy.contains("Ali Hussain").should("be.visible");
    cy.contains("Ali Hussain").click();
    cy.wait(2000);
    cy.contains("Logout").click(); // Click on the menu item with text "Settings"
  });
});
