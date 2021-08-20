export default {
    testPathIgnorePatterns: ["/node_modules/", "/dist/", "/.cache/"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
    }
}