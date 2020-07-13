const Path = require("path");
const glob = require("glob");
const apiFiles = glob.sync(Path.resolve(__dirname, "./data/") + "/*.JSON", {
  nodir: true
});

let data = [];


apiFiles.forEach(filePath => {
  const fs = require('fs')
  let api = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  data.push(api);
});
module.exports = () => ({
  data: data
})