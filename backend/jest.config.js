module.exports = {
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json', 'vue'],
    // transform: {
    //   '^.+\\.vue$': 'vue-jest',
    //   '^.+\\.js$': 'babel-jest'
    // },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    },
    testMatch: [
        
      '**/tests/unit/**/*.test.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
    //   '**/src/**/*.test.(js|jsx|ts|tsx)'
    ],
    transformIgnorePatterns: [
        "/node_modules/(?!axios)"
    ],
    verbose: true,
    forceExit: true,
    resetMocks: true,
    restoreMocks: true,
    clearMocks:true,
  };
  