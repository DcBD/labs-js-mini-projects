module.exports = {
    roots: ["tests"],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testEnvironment: 'jsdom'
};