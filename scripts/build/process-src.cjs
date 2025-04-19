// @ts-check

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const cheerio = require('cheerio');
const postcss = require('postcss');
const postcssUrl = require('postcss-url');

const { inputDir, outputDir, assetPrefix } = require('./constants.cjs');
const { processImage } = require('./process-image.cjs');

/**
 *
 * @param {string} url
 */
const startsWithAssetPrefix = (url) => {
  return url.startsWith(assetPrefix) || url.startsWith(`.${assetPrefix}`);
};

/**
 *
 * @param {string} file
 */
async function processHtml(file) {
  const html = fs.readFileSync(file, 'utf-8');
  const $ = cheerio.load(html);
  const imgTags = $('img').toArray();

  for (const el of imgTags) {
    const src = $(el).attr('src');
    if (src && startsWithAssetPrefix(src)) {
      const newSrc = await processImage(src); // write optimized, return new path
      $(el).attr('src', newSrc);
    }
  }

  const newHtml = $.html();
  const outPath = path.join(outputDir, path.relative(inputDir, file));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, newHtml);
}

/**
 * @param {string} file
 */
async function processCss(file) {
  const css = fs.readFileSync(file, 'utf-8');
  const result = await postcss([
    postcssUrl({
      url: async (asset) => {
        if (startsWithAssetPrefix(asset.url)) {
          return await processImage(asset.url);
        }
        return asset.url;
      },
    }),
  ]).process(css, { from: undefined });

  const outPath = path.join(outputDir, path.relative(inputDir, file));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, result.css);
}

const ASSET_REGEX = /"(\/assets.*)"/g;

/**
 *
 * @param {string} file
 */
async function processDataJson(file) {
  const json = fs.readFileSync(file, 'utf-8');
  let newJson = json.split('\n');
  for (let i = 0; i < newJson.length; i++) {
    const line = newJson[i];
    const match = line.match(ASSET_REGEX);
    if (match !== null && match[0] !== undefined) {
      const path = JSON.parse(match[0]);
      const newPath = await processImage(path);
      newJson[i] = line.replace(path, newPath);
    }
  }
  const outContent = newJson.join('\n');
  const outPath = path.join(outputDir, path.relative(inputDir, file));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, outContent);
}

module.exports = {
  processHtml,
  processCss,
  processDataJson,
};
