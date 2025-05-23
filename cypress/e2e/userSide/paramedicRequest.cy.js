const waitFor = (time = 2000) => cy.wait(time);

const users = [
  {
    name: "Tindu",
    email: "tindu@example.com",
    number: "03226624682",
    address: "Johar town lahore",
    gender: "male",
    date: 15,
    time: "15:00",
    area: "Johar Town",
    city: "Lahore",
    schedule: "other",
    specifySchedule: "i am good",
    remarks: "i need helper urgently",
  },
  {
    name: "Areeba",
    email: "areeba@example.com",
    number: "03001234567",
    address: "Model Town Lahore",
    gender: "female",
    date: 16,
    time: "10:30",
    area: "Model Town",
    city: "Lahore",
    schedule: "day",
    specifySchedule: "",
    remarks: "please assign a female helper",
  },
  {
    name: "Ali",
    email: "ali@example.com",
    number: "03451234567",
    address: "DHA Karachi",
    gender: "male",
    date: 18,
    time: "20:00",
    area: "DHA",
    city: "Karachi",
    schedule: "night",
    specifySchedule: "",
    remarks: "need overnight assistance",
  },
  {
    name: "Sara",
    email: "sara@example.com",
    number: "03111234567",
    address: "Gulberg Lahore",
    gender: "female",
    date: 20,
    time: "12:00",
    area: "Gulberg",
    city: "Lahore",
    schedule: "other",
    specifySchedule: "weekends only",
    remarks: "require weekend service",
  },
];
describe("Paramedics form request", () => {
  before(() => {
    cy.visit("https://staging.meditour.global/");
    // cy.pause(); // DEBUG: Check if the page is fully loaded
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
  });
  it("submit the paramedics request form", () => {
    users.forEach((user) => {
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
