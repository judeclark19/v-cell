const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./" // Specify the base directory of your project
});

// Any custom configuration you want to use
const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"], // Add any setup files here
  moduleNameMapper: {
    // Handle module aliases here
  }
  // Add more custom configurations if needed
};

// createJestConfig is a function that takes your custom configuration and returns the complete configuration
module.exports = createJestConfig(customJestConfig);
