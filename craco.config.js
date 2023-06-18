const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  jest: {
    configure: {
      collectCoverage: true,
      coverageDirectory: 'coverage',
      coveragePathIgnorePatterns: ['/node_modules/'],
      moduleNameMapper: {
        "axios": "axios/dist/node/axios.cjs",
        '^@/(.*)$': '<rootDir>/src/$1',
      },
    },
  },
};
