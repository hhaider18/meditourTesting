const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1366, // Width in pixels
    viewportHeight: 768, // Height in pixels
    scrollBehavior: "center",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
  },
});

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
//   reporter: "mochawesome",
//   reporterOptions: {
//     reportDir: "cypress/reports",
//     overwrite: false,
//     html: true,
//     json: true,
//   },
// });
