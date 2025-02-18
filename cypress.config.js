const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1366, // Width in pixels
    viewportHeight: 768, // Height in pixels
  },
});
