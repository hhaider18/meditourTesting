const waitFor = (time = 5000) => cy.wait(time);

describe("My First Test", () => {
  it("Launch Browser and Navigate", () => {
    cy.visit("https://staging.meditour.global/");

    cy.viewport("ipad-2");
    cy.contains("button", "Update").should("be.visible").click();
    // cy.get(
    //   "#root > div:nth-child(2) > div > div:nth-child(1) > div > div > svg"
    // ).click();
    waitFor();
    cy.viewport("iphone-x");
    waitFor();
    cy.viewport(1024, 768); // Custom size

    waitFor();
    cy.viewport("macbook-11");
    waitFor();
    cy.viewport(2560, 894); // Custom size
    // waitFor();
    // cy.get(
    //   "#root > div:nth-child(2) > div > div:nth-child(1) > div > div > svg"
    // ).click();
  });
});
// | Device Name       | Width × Height | Usage Example                   |
// | ----------------- | -------------- | ------------------------------- |
// | `"macbook-15"`    | 1440 × 900     | `cy.viewport("macbook-15");`    |
// | `"macbook-13"`    | 1280 × 800     | `cy.viewport("macbook-13");`    |
// | `"macbook-11"`    | 1366 × 768     | `cy.viewport("macbook-11");`    |
// | `"ipad-2"`        | 768 × 1024     | `cy.viewport("ipad-2");`        |
// | `"ipad-mini"`     | 768 × 1024     | `cy.viewport("ipad-mini");`     |
// | `"iphone-6+"`     | 414 × 736      | `cy.viewport("iphone-6+");`     |
// | `"iphone-6"`      | 375 × 667      | `cy.viewport("iphone-6");`      |
// | `"iphone-5"`      | 320 × 568      | `cy.viewport("iphone-5");`      |
// | `"iphone-4"`      | 320 × 480      | `cy.viewport("iphone-4");`      |
// | `"iphone-x"`      | 375 × 812      | `cy.viewport("iphone-x");`      |
// | `"samsung-s10"`   | 360 × 760      | `cy.viewport("samsung-s10");`   |
// | `"samsung-note9"` | 414 × 846      | `cy.viewport("samsung-note9");` |

// Preset	width	height
// ipad-2         768	1024
// ipad-mini	    768	1024
// iphone-3	      320	480
// iphone-4	      320	480
// iphone-5	      320	568
// iphone-6	      375	667
// iphone-6+	    414	736
// iphone-7	      375	667
// iphone-8	      375	667
// iphone-x	      375	812
// iphone-xr	    414	896
// iphone-se2	    375	667
// macbook-11	    1366	768
// macbook-13	    1280	800
// macbook-15	    1440	900
// macbook-16	    1536	960
// samsung-note9	414	846
// samsung-s10	  360	760
