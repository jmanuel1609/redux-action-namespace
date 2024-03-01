module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
  "transformIgnorePatterns": ["node_modules/(?!(serialize-error)/)"],
}
