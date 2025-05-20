const waitFor = (time = 2000) => cy.wait(time);

const vehicles = [
  {
    regNumber: "LEV-1122",
    oName: "Hussain Haider",
    mobileNo: "03226624682",
    email: "hussain14.cs@gmail.com",
    nicNo: "3440265985547",
    perDayRent: "4500",
    vehicleName: "Toyota Corolla",
    vehicleType: "Sedan",
    year: "2019",
    vColor: "White",
    seats: "4 Seats (e.g., Compact Car)",
    cNumber: 12233445566778899,
    images: ["94167a.jpg", "altis 1.png"],
  },
  {
    regNumber: "LEV-1123",
    oName: "Javed Ali",
    mobileNo: "03349960578",
    email: "hussain1@gmail.com",
    nicNo: "3440260000000",
    perDayRent: "2300",
    vehicleName: "Suzuki Alto",
    vehicleType: "HatchBacks",
    year: "2023",
    vColor: "White",
    seats: "4 Seats (e.g., Compact Car)",
    cNumber: 12233445566778800,
    images: ["94167a.jpg", "altis 1.png"],
  },
];

describe("Signup Page Test", () => {
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
    waitFor();
  });

  it("Add multiple vehicles after login", () => {
    vehicles.forEach((vehicle) => {
      cy.contains("Vehicle Details").click();
      waitFor();
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
      cy.contains("Upload Photos").should("be.visible");
      waitFor();

      cy.contains("Save").click();
      waitFor();
    });
  });
});
