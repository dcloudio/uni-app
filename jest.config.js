module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./scripts/setupJestEnv.ts'],
  globals: {
    __X__: false,
    __DEV__: false,
    __TEST__: true,
    __NODE_JS__: true,
    __VERSION__: require('./package.json').version,
    __BROWSER__: false,
    __GLOBAL__: false,
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    // source-map
    __PLATFORM_WEB__: false,
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: ['packages/*/src/**/*.ts'],
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '@dcloudio/uts-darwin-arm64': '<rootDir>/packages/uts-darwin-arm64',
    '@dcloudio/uts-darwin-x64': '<rootDir>/packages/uts-darwin-x64',
    '@dcloudio/uts-win32-ia32-msvc': '<rootDir>/packages/uts-win32-ia32-msvc',
    '@dcloudio/uts-win32-x64-msvc': '<rootDir>/packages/uts-win32-x64-msvc',
    '@dcloudio/uts-linux-x64-gnu': '<rootDir>/packages/uts-linux-x64-gnu',
    '@dcloudio/uni-platform': "<rootDir>/packages/uni-app-plus/src/platform/index.ts",
    '^@dcloudio/(.*?)$': '<rootDir>/packages/$1/src',
  },
  rootDir: __dirname,
  testMatch: [
    '<rootDir>/packages/**/__tests__/**/*spec.[jt]s?(x)',
    '<rootDir>/packages/**/*spec.[jt]s?(x)',
  ],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.[jt]sx?$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json'
    }]
  },
}
