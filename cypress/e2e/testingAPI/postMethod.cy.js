describe("Login API Test", () => {
  it("should login successfully and return token & user", () => {
    cy.request({
      method: "POST",
      url: "https://medi-tour-86152928b53d.herokuapp.com/user/login", // 🔁 Change this to your actual endpoint
      body: {
        email: "hussain14.cs@gmail.com",
        password: "Admin@123",
      },
    }).then((response) => {
      // ✅ Console pe response check karne ke liye
      console.log(response);
      // ✅ Check response status
      expect(response.status).to.eq(200);

      // ✅ Check token exists
      expect(response.body).to.have.property("token");

      // ✅ Check user data
      expect(response.body.user).to.have.property(
        "email",
        "hussain14.cs@gmail.com"
      );
      expect(response.body.user).to.have.property(
        "password",
        "$2a$10$4xjD0lyyCVYvkmMRe9PxyecXdoCv9t9z6L6.UQnnmEQn4nE1EoUKe"
      );
      expect(response.body.user.address).to.have.property(
        "address",
        "Johar Town, Lahore, Pakistan"
      );
    });
  });
});
