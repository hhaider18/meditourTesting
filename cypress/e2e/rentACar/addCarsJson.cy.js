const waitFor = (time = 2000) => cy.wait(time);
describe("add cars from JSON file", () => {
  before(() => {
    cy.visit("https://staging.meditour.global/");
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

    cy.get('input[placeholder="Password"]').parent().find("svg").click();
    cy.get("button").contains("Login").click();
    cy.contains("Vehicle Details").click();
    waitFor();
    cy.fixture("vehicles").then((data) => {
      cy.wrap(data).as("vehiclesData");
    });
  });

  it("Add vehicles from fixture", function () {
    this.vehiclesData.forEach((vehicle) => {
      cy.get("button").contains("+ Add Car").click();
      waitFor();

      cy.get('input[placeholder="Registration Number"]').type(
        vehicle.regNumber
      );
      waitFor();
      cy.get('input[placeholder="Owner Name"]').type(vehicle.oName);
      waitFor();
      cy.get('input[placeholder="Mobile No."]').type(vehicle.mobileNo);
      waitFor();
      cy.get('input[placeholder="Email"]').type(vehicle.email);
      waitFor();
      cy.get('input[placeholder="NIC No"]').type(vehicle.nicNo);
      waitFor();
      cy.get('input[placeholder="Per Day Rent"]').type(vehicle.perDayRent);
      waitFor();
      cy.get('input[placeholder="Vehicle Name "]').type(vehicle.vehicleName);
      waitFor();

      cy.get('[role="combobox"]').eq(0).click();
      cy.get('[role="option"]').contains(vehicle.vehicleType).click();
      waitFor();

      cy.get('input[placeholder="Model Year"]').type(vehicle.year);
      waitFor();
      cy.get('input[placeholder="Vehicle Color"]').type(vehicle.vColor);
      waitFor();

      cy.get('[role="combobox"]').eq(1).click();
      cy.get('[role="option"]').contains(vehicle.seats).click();
      waitFor();

      cy.get('input[placeholder="Chassis Number"]').type(vehicle.cNumber);
      waitFor();

      cy.get(".VehicleDetail_imagePicker__lXdRu").click();
      cy.get('input[type="file"]').attachFile(vehicle.images);
      waitFor();

      cy.contains("Save").click();
      waitFor();
    });
  });
});
