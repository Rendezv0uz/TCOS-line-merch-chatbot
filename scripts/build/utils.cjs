const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * @param {Buffer} fileContent
 */
function getHashFromFile(fileContent) {
  const hash = crypto.createHash('md5').update(fileContent).digest('hex');
  return hash;
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(src);
    const writeStream = fs.createWriteStream(dest);
    readStream
      .pipe(writeStream)
      .on('finish', () => {
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

function normalizePath(path) {
  return path.replace(/\\/g, '/');
}

module.exports = {
  getHashFromFile,
  copyFile,
  normalizePath,
};
