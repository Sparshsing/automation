const path = require("path");

module.exports = {
  entry: "./src/background.js", // Input file
  output: {
    filename: "background.bundle.js", // Output file
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  mode: "production",
  target: "webworker", // Ensure compatibility with service workers
};
