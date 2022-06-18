module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: ['**/src/**/*.{[jt]s?(x),vue}', '!**/node_modules/**', '!**/vendor/**'],
  moduleNameMapper: {
    '\\.(css|sass|scss|less)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '@utils/(.*)$': '<rootDir>/src/utils/$1',
    '@utils(.*)$': '<rootDir>/src/utils',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['.eslintrc.js'],
  testURL: 'http://localhost/',
};
