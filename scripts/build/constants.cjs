const path = require('path');

const inputDir = path.join(process.cwd(), './src');
const outputDir = path.join(process.cwd(), './dist');
const assetPrefix = '/assets';

module.exports = {
  inputDir,
  outputDir,
  assetPrefix,
};
