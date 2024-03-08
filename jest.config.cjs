
module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx|mjs|ts|cjs)$': 'babel-jest'
  },
  transformIgnorePatterns: ["node_modules/(?!(serialize-error|lodash.update)/)"],
};
