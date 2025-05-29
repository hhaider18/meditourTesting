describe("Login - Mock POST API with cy.intercept()", () => {
  it("should login successfully with mocked response", () => {
    // Step 1: Mock the POST /api/login request
    cy.intercept(
      "POST",
      "https://medi-tour-86152928b53d.herokuapp.com/user/login",
      (req) => {
        // Optional: assert request payload
        expect(req.body).to.have.property("email", "hussain14.cs@gmail.com");
        expect(req.body).to.have.property("password", "Admin@123");

        // Step 2: Send a fake success response
        req.reply({
          statusCode: 200,
          body: {
            // token: "fake-jwt-token",
            user: { name: "Hussain", email: "hussain14.cs@gmail.com" },
          },
        });
      }
    ).as("loginRequest");

    // Step 3: Visit the login page
    cy.visit("https://staging.meditour.global");

    cy.contains("Cancel").should("be.visible").click();
    cy.contains("Log In").should("be.visible").click();
    // Step 4: Fill the login form and submit
    cy.get("[placeholder='Email']").type("hussain14.cs@gmail.com", {
      delay: 50,
    });
    cy.get("[placeholder='Password']").type("Admin@123", {
      delay: 50,
    });
    cy.contains("Login").click();

    // Step 5: Wait for the API call and check UI
    cy.wait("@loginRequest");
    cy.contains("Hussain").should("be.visible");
  });
});
