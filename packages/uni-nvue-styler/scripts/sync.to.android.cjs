/* eslint-disable no-restricted-globals */
// 读取 env.VUEJS_CORE_PATH 变量，找不到抛错
require('dotenv').config();

const vueJsCorePath = process.env.VUEJS_CORE_PATH;
if (!vueJsCorePath) {
  throw new Error('Missing VUEJS_CORE_PATH env variable.');
}

const EXPAND_DIR = 'packages/runtime-core/src/dom/modules/style/parser/expand';

// 复制 src/expand 目录中 ts文件，忽略 index.ts
const fs = require('fs');
const path = require('path');
const directoryPath = path.join(__dirname, '../src/expand');

// 跳过名单
const skipList = ['index.ts', 'flexFlow.ts', 'font.ts'];

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    if (!skipList.includes(file) && file.endsWith('.ts')) {
      const fromPath = path.join(directoryPath, file);

      const toPath = path.join(vueJsCorePath, EXPAND_DIR, file);



      // 读取 fromPath 内容，顶部添加 `const __NODE_JS__ = false` 
      fs.readFile(fromPath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }

        const modifiedData = `const __NODE_JS__ = false\n${data}`;
        // 之后保存到 toPath 目录中
        fs.writeFile(toPath, modifiedData, 'utf8', (err) => {
          if (err) {
            console.error('Error writing file:', err);
            return;
          }

          console.log(`File ${file} has been modified.`);
        });
      })





    }
  });
})