const waitFor = (time = 2000) => cy.wait(time);
const searchTerm = "Amlodipine";
describe("Signup Page Test", () => {
  it("should load the signup page", () => {
    cy.visit("https://staging.meditour.global/");
    // cy.pause(); // DEBUG: Check if the page is fully loaded
    waitFor();
    cy.contains("button", "Update").should("be.visible").click();
    waitFor();
    cy.contains("Join as Provider").should("be.visible").click();
    waitFor();
    cy.contains("Rent a Car").should("be.visible").click();
    waitFor();
    cy.get('input[placeholder="Email"]').type("cewis63555@dcbin.com", {
      delay: 50,
    });
    cy.get('input[placeholder="Password"]').type("Admin@123", {
      delay: 50,
    });

    // Debug before clicking the eye icon
    cy.get('input[placeholder="Password"]').parent().find("svg").debug(); // DEBUG: Check if the eye icon selector is correct
    cy.get('input[placeholder="Password"]').parent().find("svg").click();

    cy.get("button").contains("Login").click();
    waitFor();
    cy.contains("Vehicle Details").click();
    waitFor();
    cy.get("button").contains("+ Add Car").click();
    waitFor();
    // ADD VEHICLE FORM DATA
    cy.get('input[placeholder="Registration Number"]').type("LEV-1122");
    waitFor();
    cy.get('input[placeholder="Owner Name"]').type("Hussain Haider");
    waitFor();
    cy.get('input[placeholder="Mobile No."]').type("03226624682");
    waitFor();
    cy.get('input[placeholder="Email"]').type("hussain14.cs@gmail.com");
    waitFor();
    cy.get('input[placeholder="NIC No"]').type("3440264589875");
    waitFor();
    cy.get('input[placeholder="Per Day Rent"]').type("4500");
    waitFor();
    cy.get('input[placeholder="Vehicle Name "]').type("Toyota Crolla");
    waitFor();
    // Step 1: Dropdown ko click karo
    cy.get('[role="combobox"]').eq(0).click();

    // Step 2: Dropdown option ko select karo (jaise "Car")
    cy.get('[role="option"]').contains("Sedan").click();
    waitFor();
    cy.get('input[placeholder="Model Year"]').type("2020");
    waitFor();
    waitFor();
    cy.get('input[placeholder="Vehicle Color"]').type("White");
    waitFor();
    cy.get('[role="combobox"]').eq(1).click();

    // Step 2: Dropdown option ko select karo (jaise "Car")
    cy.get('[role="option"]').contains("4 Seats (e.g., Compact Car)").click();
    waitFor();
    cy.get('input[placeholder="Chassis Number"]').type("12345678901234567");
    waitFor();
    // Click the parent div to reveal the hidden file input if necessary
    cy.get(".VehicleDetail_imagePicker__lXdRu").click();

    // Now upload the image using the hidden input
    cy.get('input[type="file"]').attachFile(["94167a.jpg", "altis 1.png"]);

    // Optional: assert image is uploaded/displayed
    cy.contains("Upload Photos").should("be.visible");
    waitFor();

    cy.contains("Save").click();
    waitFor();
    // cy.contains("Save").click();
    // waitFor();
    // cy.get(".styles_deleteIcon__l5II\\+").eq(1).click(); // 0-based index
    // waitFor();
    // cy.contains("Yes Delete").click();
    // waitFor();
    // cy.contains("Logout").click();
  });
});
