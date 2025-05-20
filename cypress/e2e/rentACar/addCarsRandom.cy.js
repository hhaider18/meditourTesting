const waitFor = (time = 2000) => cy.wait(time);
import { faker } from "@faker-js/faker";
const generateVehicle = () => ({
  regNumber: faker.vehicle.vrm(),
  oName: faker.person.fullName(),
  mobileNo: `03${faker.string.numeric(9)}`,
  email: faker.internet.email(),
  nicNo: faker.string.numeric(13),
  perDayRent: faker.number.int({ min: 1000, max: 6000 }).toString(),
  vehicleName: faker.vehicle.vehicle(),
  vehicleType: "Sedan", // static ya faker se bhi
  year: faker.date.past({ years: 10 }).getFullYear().toString(),
  vColor: faker.color.human(),
  seats: "4 Seats (e.g., Compact Car)",
  cNumber: faker.string.numeric(17),
  images: ["94167a.jpg", "altis 1.png"],
});

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
    const vehicles = Array.from({ length: 1 }, () => generateVehicle()); // creating 3 vehicles

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
