const waitFor = (time = 2000) => cy.wait(time);
describe("Paramedics form request", () => {
  before(() => {
    cy.visit("https://staging.meditour.global/");
    waitFor();
    cy.contains("button", "Update").click();
    waitFor();
    cy.contains("Log In").click();
    cy.get('input[placeholder="Email"]').type("hocenor752@heweek.com", {
      delay: 100,
    });
    cy.get('input[placeholder="Password"]').type("Admin@123", {
      delay: 100,
    });

    // Debug before clicking the eye icon
    cy.get('input[placeholder="Password"]').parent().find("svg").debug(); // DEBUG: Check if the eye icon selector is correct
    cy.get('input[placeholder="Password"]').parent().find("svg").click();

    cy.contains("Login").click();
    // cy.pause(); // DEBUG: Verify if login was successful
    waitFor();
    cy.contains("Services").click();
    waitFor();
    cy.contains("Home Services").click();
    waitFor();
    cy.contains("Nurses").click();
    waitFor();
    cy.fixture("paramedicsForms").then((data) => {
      cy.wrap(data).as("usersData");
    });
  });

  it("Add paramedics request form", function () {
    this.usersData.forEach((user) => {
      cy.get('input[placeholder="Enter your name"]')
        .clear()
        .type(user.name, { delay: 50 });

      cy.get('input[placeholder="Enter your email"]')
        .clear()
        .type(user.email, { delay: 50 });
      waitFor();
      cy.get('input[placeholder="Enter your contact number"]')
        .clear()
        .type(user.number, { delay: 50 });
      waitFor();
      cy.get('input[placeholder="Enter your address"]')
        .clear()
        .type(user.address, { delay: 50 });
      waitFor();
      cy.get(`input[type="radio"][name="gender"][value="${user.gender}"]`)
        .check()
        .should("be.checked");
      waitFor();
      // Step 1: Click on the calendar icon to open date picker
      cy.get("img.datePicker_DateImg__Ew8Cm")
        .scrollIntoView()
        .should("be.visible")
        .click();

      cy.get("button.MuiButtonBase-root").contains(user.date).click();
      // Click the time picker input field using placeholder
      cy.get('input[placeholder="hh:mm"]')
        .clear()
        .type(user.time, { delay: 50 });
      waitFor();
      cy.get('input[placeholder="Enter your area"]')
        .clear()
        .type(user.area, { delay: 50 });
      waitFor();
      cy.get('input[placeholder="Enter your city"]')
        .clear()
        .type(user.city, { delay: 50 });
      waitFor();
      // Select the radio button
      cy.get(`input[type="radio"][name="schedule"][value="${user.schedule}"]`)
        .should("exist")
        .check();

      // If "Other" is selected, the additional input should be visible
      if (user.schedule === "other") {
        cy.get('input[placeholder="Enter your schedule"]')
          .and("be.visible")
          .type(user.specifySchedule, { delay: 50 });
      }
      cy.get('textarea[placeholder="Write your remarks here..."]')
        .clear()
        .type(user.remarks, { delay: 50 });
      waitFor();
      cy.contains("button", "Submit").click();
      waitFor();
    });
  });
});
