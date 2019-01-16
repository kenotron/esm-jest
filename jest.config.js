module.exports = {
  transform: {
    '\\.m?js$': '<rootDir>/node_modules/esm/esm.js'
  },
  moduleNameMapper: {
    '^anotherRoot/(.*)$': '<rootDir>/lib/anotherRoot/$1'
  },
  transformIgnorePatterns: []
};
