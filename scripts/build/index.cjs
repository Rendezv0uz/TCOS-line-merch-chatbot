// @ts-check

const fs = require('fs/promises');
const path = require('path');
const { rimraf } = require('rimraf');
const { outputDir, inputDir } = require('./constants.cjs');
const {
  processHtml,
  processCss,
  processDataJson,
} = require('./process-src.cjs');
const { copyFile } = require('./utils.cjs');

const recursiveProcess = async (folder = inputDir) => {
  let files = await fs.readdir(folder, { withFileTypes: true });
  if (folder === inputDir) {
    files = files.filter(
      (file) => !(file.isDirectory() && file.name === 'assets')
    );
  }
  if (files.length === 0) return;
  for (const file of files) {
    const filePath = path.join(folder, file.name);
    if (file.isDirectory()) {
      await recursiveProcess(filePath);
    } else if (file.isFile()) {
      const ext = path.extname(file.name).toLowerCase();
      if (file.name === 'data.json') {
        await processDataJson(filePath);
        continue;
      }
      if (ext === '.html') {
        await processHtml(filePath);
      } else if (ext === '.css') {
        await processCss(filePath);
      } else {
        await copyFile(
          filePath,
          path.join(outputDir, path.relative(inputDir, folder), file.name)
        );
      }
    }
  }
};

const EXTRA_FILES = ['/assets/realproduct/tshirt/shirtsize.svg'];

async function main() {
  await rimraf(outputDir); // Clean output directory
  await recursiveProcess();
  for (const extraFiles of EXTRA_FILES) {
    await copyFile(
      path.join(inputDir, extraFiles),
      path.join(outputDir, extraFiles)
    );
  }
}

main();
