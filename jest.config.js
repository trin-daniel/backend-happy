const { compilerOptions } = require('./tsconfig.json')
const { pathsToModuleNameMapper } = require('ts-jest/utils')

module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*-protocols.ts',
    '!**/protocols/**',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/main/**/*.ts',
    '!<rootDir>/src/infra/database/helpers/sql-helper.ts'
  ],
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  transform: { '.+\\.ts$': 'ts-jest' },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src' })
}
