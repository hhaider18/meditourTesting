describe("Signup Page Test", () => {
  it("should load the signup page", () => {
    cy.visit("https://meditour.global");
    // cy.pause(); // DEBUG: Check if the page is fully loaded

    cy.contains("Join As a Provider").should("be.visible").click();
    cy.url().should("include", "/joinVender");
    cy.contains("Hotel").should("be.visible").click();
    cy.url().should("include", "/hotel/login");

    cy.get('input[placeholder="Email"]').type("hussain14.cs@gmail.com", {
      delay: 50,
    });
    cy.get('input[placeholder="Password"]').type("Admin@123", {
      delay: 50,
    });

    // Debug before clicking the eye icon
    cy.get('input[placeholder="Password"]').parent().find("svg").debug(); // DEBUG: Check if the eye icon selector is correct
    cy.get('input[placeholder="Password"]').parent().find("svg").click();

    cy.get("button").contains("Login").click();
    cy.wait(2000);
    cy.contains("Property").should("be.visible").click();
    cy.url().should("include", "/Property");
    cy.wait(2000);
    cy.get("button").contains("+ Add").click();
    cy.get("button").contains("Get Started").click();
    cy.contains("House").should("be.visible").click();
    cy.contains("Camp").click();
    cy.contains("Container").should("be.visible").click();
    cy.get('input[placeholder="Property Name"]').type("Nasla Container", {
      delay: 50,
    });
    cy.get('input[placeholder="Contact Number"]').type("03226624682", {
      delay: 50,
    });
    cy.get('input[placeholder="Search location..."]').type("Johar Town", {
      delay: 200,
    });

    // Wait until suggestions appear
    cy.wait(2000);

    // Select first suggestion
    cy.get(".pac-item").first().click();

    // Force blur to trigger change event
    // cy.get('input[placeholder="Address"]').blur();

    // Verify the field is now filled
    cy.get('input[placeholder="Address"]').should("not.have.value", "");
    cy.contains("How many people can stay here?").should("be.visible");
    // Beds wale `+` button ko click karega
    cy.contains("Beds")
      .parent() // To Parent container locate
      .find("button") // Us container ke andar button dhundega
      .contains("+") // "+" wale button ko locate karega
      .as("bedsPlus");

    for (let i = 0; i < 6; i++) {
      cy.get("@bedsPlus").click();
    }
    // Guests wale `+` button ko click karega
    cy.contains("Guests")
      .parent() // Guests ka parent locate karega
      .find("button") // Uske andar button locate karega
      .contains("+")
      .as("guestsPlus");

    for (let i = 0; i < 6; i++) {
      cy.get("@guestsPlus").click();
    }
    cy.contains("Bathrooms")
      .parent() // Bathroom ka parent locate karega
      .find("button") // Uske andar button locate karega
      .contains("+")
      .as("bathroomsPlus");

    for (let i = 0; i < 1; i++) {
      cy.get("@bathroomsPlus").click();
    }

    cy.contains("p", "Attached") // "Attached" likha hua p tag dhundho
      .parent() // Uska parent locate karo (jo radio button wrap karta hai)
      .click(); // Click karo (isse radio select ho jayega)

    cy.get('input[placeholder="Property Name"]').type("Nasla Container", {
      delay: 50,
    });
    // cy.contains("Some details about your property...")
    //   .parent()
    //   .find("textarea")
    //   .type("Located in the heart of the city with scenic views.", {
    //     delay: 50,
    //   });

    cy.contains("Next").click();
  });
});
