const path = require("path");

const PATHS = {
    dist: path.resolve(__dirname, "../dist/"),
    static: path.resolve(__dirname, "../static"),
    build: path.resolve(__dirname, "../build/"),
    src: path.resolve(__dirname, "../src/"),
    entry: path.resolve(__dirname, "../src/index.js")
};

module.exports = PATHS;