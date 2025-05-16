import "cypress-file-upload";

const waitFor = (time = 2000) => cy.wait(time);
// const fileName = "education.jpg";

describe("Signup Page Test", () => {
  it("should load the signup page", () => {
    cy.visit("https://staging.meditour.global/");
    waitFor();

    cy.contains("button", "Update").should("be.visible").click();
    waitFor();

    cy.contains("Join as Provider").should("be.visible").click();
    waitFor();

    cy.contains("Donation").should("be.visible").click();
    waitFor();

    cy.get('input[placeholder="Email"]').type("hussain14.cs@gmail.com", {
      delay: 50,
    });
    cy.get('input[placeholder="Password"]').type("Admin@123", { delay: 50 });

    // Toggle password visibility
    cy.get('input[placeholder="Password"]').parent().find("svg").click();

    cy.contains("button", "Login").click();
    waitFor();

    cy.contains("Criteria").should("be.visible").click();
    waitFor();

    cy.contains("p", "Add Criteria").click();
    cy.get("#criteriaName").type("Nasla Container", { delay: 50 });
    cy.get('textarea[placeholder="Description"]').type(
      "This is a sample image"
    );
    waitFor();
    cy.contains("Drop your image here").click(); // or
    cy.get(
      "body > div.MuiModal-root.css-8ndowl > div.MuiBox-root.css-abvv1a > div > form > div:nth-child(3) > div.common_col12__joJzh.donationcriteria_ImgPicker__mK6tQ"
    ).click(); // adjust selector

    cy.get('input[type="file"]')
      .should("exist")
      .attachFile("education.jpg", { force: true });

    cy.contains("button", "Add").click();

    // You can assert if image appears
    // cy.get("img").should("have.attr", "src").and("include", "education.jpg");
  });
});
