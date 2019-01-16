module.exports = {
  transform: {
    '\\.m?jsx?$': 'esm'
  },
  moduleNameMapper: {
    '^anotherRoot/(.*)$': '<rootDir>/lib/anotherRoot/$1'
  },
  transformIgnorePatterns: []
};
