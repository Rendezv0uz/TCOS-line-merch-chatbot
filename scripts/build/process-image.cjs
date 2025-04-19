const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { inputDir, outputDir } = require('./constants.cjs');
const { getHashFromFile, copyFile, normalizePath } = require('./utils.cjs');

/**
 * @type {Map<string, string>}
 */
const imagesUrlMap = new Map();

/**
 *
 * @param {string} srcPath
 * @returns {Promise<string>}
 */
async function processImage(srcPath) {
  if (imagesUrlMap.has(srcPath)) {
    return imagesUrlMap.get(srcPath);
  }
  const inputPath = path.join(inputDir, srcPath);
  const fileContent = fs.readFileSync(inputPath);
  const hash = getHashFromFile(fileContent);

  let outputSrc = path.dirname(srcPath) + '/' + hash + path.extname(srcPath);
  let outputPath = path.join(outputDir, outputSrc);

  // console.log(`Processing image: ${srcPath} -> ${outputSrc}`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  // check if the file can be processed
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    if (
      metadata.format &&
      (metadata.format === 'jpeg' || metadata.format === 'png')
    ) {
      outputSrc = outputSrc.replace(/\.jpe?g|\.png$/i, '.webp');
      outputPath = path.join(outputDir, outputSrc);
      await image.resize(640).webp({ quality: 80 }).toFile(outputPath);

      imagesUrlMap.set(srcPath, outputSrc);
      return outputSrc;
    }
  } catch (error) {
    console.error(err);
  }

  // if the file cannot be processed, copy it to the output directory
  await copyFile(inputPath, outputPath);
  imagesUrlMap.set(srcPath, outputSrc);
  return outputSrc;
}

module.exports = {
  processImage,
};
