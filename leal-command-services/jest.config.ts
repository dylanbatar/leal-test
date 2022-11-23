import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/framework/**',
    '!<rootDir>/src/**/*-ports.ts',
    '!**/ports/**',
    '!**/test/**',
    '!**/config/**'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  setupFiles: ['dotenv/config'],
  preset: 'ts-jest'
};

export default config;
