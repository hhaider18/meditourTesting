const waitFor = (time = 2000) => cy.wait(time);

describe("Hospital", () => {
  it("Hospital Dashboard must display - looped", () => {
    const timesToRun = 3;

    for (let i = 0; i < timesToRun; i++) {
      cy.log(`Running iteration #${i + 1}`);

      cy.visit("https://staging.meditour.global/");
      waitFor();
      cy.contains("button", "Cancel").should("be.visible").click();
      waitFor();

      cy.contains("Join as Provider").should("be.visible").click();
      cy.url().should("include", "/joinVender");
      cy.contains("Hospitals & Clinics").should("be.visible").click();
      cy.url().should("include", "/hospital/login");

      cy.get('input[placeholder="Email"]').type("main-hosp11323@gmail.com", {
        delay: 50,
      });
      cy.get('input[placeholder="Password"]').type("Admin@123", {
        delay: 50,
      });

      cy.get('input[placeholder="Password"]').parent().find("svg").click();
      cy.get("button").contains("Login").click();
      waitFor();

      // Add logout step if needed
      cy.contains("Logout").should("be.visible").click();
      cy.url().should("include", "/hospital/login");

      waitFor(1000);
    }
  });
});
