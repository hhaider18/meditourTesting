describe("Login and send OPD request", () => {
  let token; // to store JWT token

  before(() => {
    // Step 1: Login to get token
    cy.request({
      method: "POST",
      url: "https://medi-tour-86152928b53d.herokuapp.com/user/login", // adjust if needed
      body: {
        email: "vineyeh879@gitated.com",
        password: "Admin@123", // use actual password here
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.token; // adjust if token is in another field
    });
  });
  const repeatCount = 3;
  for (let i = 1; i <= repeatCount; i++) {
    it("should send the OPD request using the token", () => {
      // Step 2: Use token in another request
      cy.request({
        method: "POST",
        url: "https://medi-tour-86152928b53d.herokuapp.com/user/addConsultancyForm",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name: "umer khayyam",
          phone: "+923095963790",
          email: "umer.khayyam900@gmail.com",
          treatment: "Recurrent Pregnancy Loss",
          message: "I wanted to know if the treatment is valid or not",
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("auth", true);
        expect(response.body.freeConsultancy).to.have.property(
          "name",
          "umer khayyam"
        );
      });
    });
  }
});
