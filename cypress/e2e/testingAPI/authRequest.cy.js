describe("GET Authenticated API", () => {
  it("should return user profile", () => {
    cy.request({
      method: "GET",
      url: "https://api.example.com/profile",
      headers: {
        Authorization: "Bearer your_token_here",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("username");
    });
  });
});
