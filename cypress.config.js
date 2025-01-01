const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

      preprocessor.addCucumberPreprocessorPlugin(on, config);

      on("file:preprocessor",
      createBundler({
        plugins: [createEsbuildPlugin.default(config)],
      }));

      allureWriter(on, config);

      return config;

    },
    env: {
      allureResultsPath: "allure-results",
      allureReuseAfterSpec: true,
      allure: true
    },

    specPattern: [
      "**/*.feature",
    ],
    baseUrl: "http://localhost:7081",
  },
})