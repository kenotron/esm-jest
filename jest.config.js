module.exports = {
  transform: {
    '\\.m?js$': 'esm'
  },
  moduleNameMapper: {
    '^anotherRoot/(.*)$': '<rootDir>/lib/anotherRoot/$1'
  }
};
