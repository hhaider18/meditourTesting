import { faker } from "@faker-js/faker";
const waitFor = (time = 2000) => cy.wait(time);

// Generate the rest of the medicine fields using faker
const generateFakerFields = () => ({
  brand: faker.company.name(),
  productType: faker.helpers.arrayElement(["Tablet", "Capsule", "Syrup"]),
  strength: `${faker.number.int({ min: 5, max: 500 })}mg`,
  packSize: `${faker.number.int({ min: 1, max: 100 })}`,
  content: faker.commerce.productDescription(),
  tpPrice: faker.number
    .float({ min: 10, max: 500, precision: 0.01 })
    .toString(),
  mrpPrice: faker.number
    .float({ min: 20, max: 600, precision: 0.01 })
    .toString(),
  image: "ebak.png",
});

describe("Add medicines using JSON + Faker", () => {
  before(() => {
    cy.visit("https://staging.meditour.global/");
    waitFor();
    cy.contains("button", "Update").click();
    waitFor();
    cy.contains("Join as Provider").click();
    waitFor();
    cy.contains("Pharmaceutical").click();
    waitFor();

    cy.get('input[placeholder="Email"]').type("hussain14.cs@gmail.com", {
      delay: 50,
    });
    cy.get('input[placeholder="Password"]').type("Admin@123", { delay: 50 });
    cy.get('input[placeholder="Password"]').parent().find("svg").click();
    cy.get("button").contains("Login").click();
    waitFor();

    cy.fixture("medicines/medicineSearch").then((data) => {
      cy.wrap(data).as("searchTerms");
    });
  });

  it("should add medicines with JSON searchTerm and Faker fields", function () {
    this.searchTerms.forEach((item) => {
      const fakerFields = generateFakerFields();
      const meds = {
        searchTerm: item.searchTerm, // from JSON
        ...fakerFields, // rest from faker
      };

      cy.get("button").contains(" + Add").click();
      waitFor();

      cy.get('input[placeholder="Search Here"]').type(meds.searchTerm);
      waitFor();
      cy.get("ul > li").first().click();
      waitFor();
      cy.get("body").click(0, 0);
      waitFor();

      cy.get('input[placeholder="Brand"]').type(meds.brand);
      cy.get("#productType").select(meds.productType);
      cy.get('input[placeholder="Strength"]').type(meds.strength);
      cy.get('input[placeholder="Pack Size"]').type(meds.packSize);
      cy.get('input[placeholder="Content"]').type(meds.content);
      cy.get('input[placeholder="T.P Price"]').type(meds.tpPrice);
      cy.get('input[placeholder="M.R.P Price"]').type(meds.mrpPrice);

      cy.get(".styles_imagePicker__CiqCe").click();
      cy.get('input[type="file"]').attachFile(`medicines/${meds.image}`);
      cy.contains("Upload Photos").should("be.visible");
      waitFor();
      cy.pause();
      cy.contains("Save").click();
      waitFor();
    });
  });
});
