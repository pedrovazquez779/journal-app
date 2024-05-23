module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    // transformIgnorePatterns: ['/node_modules/(?!@firebase)'], // <- Required to solve issues with firebase library.
    transformIgnorePatterns: [], // <- Required to solve issues with firebase library. Node modules are ignored, that way transpilation in Firebase is avoided
}