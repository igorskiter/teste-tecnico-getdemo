export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.app.json" }],
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/"
  ],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx"
  ],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
    "^@/components(.*)$": "<rootDir>/components/$1",
    "^@/features(.*)$": "<rootDir>/features/$1",
    "^@/interfaces(.*)$": "<rootDir>/interfaces/$1",
    "^@/lib(.*)$": "<rootDir>/lib/$1",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};