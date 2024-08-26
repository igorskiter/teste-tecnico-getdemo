module.default = {
  preset: "ts-jest",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "node",
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  moduleNameMapper: {
    "^@/controllers(.*)$": "<rootDir>/src/controllers/$1",
    "^@/(.*)$": "<rootDir>/src/$1"
  },
}