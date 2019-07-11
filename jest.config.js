module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testMatch": [
        "<rootDir>/src/**/*.(test).{js,jsx,ts,tsx}",
        "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
      ]
  }