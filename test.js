const path = require("path");

console.log(__dirname);
console.log(path.join(__dirname, "client/build/index.html"));
console.log(__dirname);
console.log(path.resolve(__dirname, "client", "build", "index.html"));