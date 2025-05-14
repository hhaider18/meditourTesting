describe("Login Travel agency", () => {
  it("should login the travel agency", () => {
    cy.request(
      "https://medi-tour-86152928b53d.herokuapp.com/user/getRegisteredCompanies"
    ).then((response) => {
      expect(response.status).to.eq(200); // Status 200 OK
      // expect(response.body).to.have.length(18); // 10 users
      const company = response.body.companies[0].company;
      expect(company).to.have.property("name", "Adam Donations"); // Optional: check value
    });
  });
});
