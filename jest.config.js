/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: "ts-jest",
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    testEnvironment: "node",
    roots: ["<rootDir>/test"],
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"],
    coverageDirectory: "coverage_dir",
    coverageReporters: ["html"],
};
