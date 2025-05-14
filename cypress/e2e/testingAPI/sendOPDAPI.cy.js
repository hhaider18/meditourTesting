const repeatCount = 3;
describe("send OPD request", () => {
  for (let i = 1; i <= repeatCount; i++) {
    it("should send the OPD request for the user", () => {
      cy.request({
        method: "POST",
        url: "https://medi-tour-86152928b53d.herokuapp.com/user/opdRequest",
        body: {
          name: "Hussain King",
          phone: "+923095963799",
          email: "hussain14.cs@gmail.com",
          message: "this is hussain",
        },
      }).then((response) => {
        console.log(response);
        // ✅ Check response status
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("message");
        expect(response.body.opdRequest).to.have.property(
          "name",
          "Hussain King"
        );
        expect(response.body.opdRequest).to.have.property("status", "pending");
      });
    });
  }
});
