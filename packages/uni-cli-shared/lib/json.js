const fs = require('fs')
const path = require('path')
const stripJsonComments = require('strip-json-comments')
const preprocessor = require('@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/preprocess')
const {
  jsPreprocessOptions
} = require('./platform')

function parseJson (content, preprocess = false) {
  if (typeof content === 'string') {
    if (preprocess) {
      content = preprocessor.preprocess(content, jsPreprocessOptions.context, {
        type: jsPreprocessOptions.type
      })
    }

    content = JSON.parse(stripJsonComments(content))
  }

  content = JSON.stringify(content)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')

  return JSON.parse(content)
}

function getJson (jsonFileName, preprocess = false) {
  const jsonFilePath = path.resolve(process.env.UNI_INPUT_DIR, jsonFileName)
  if (!fs.existsSync(jsonFilePath)) {
    throw new Error(jsonFilePath + ' 不存在')
  }
  try {
    return parseJson(fs.readFileSync(jsonFilePath, 'utf8'), preprocess)
  } catch (e) {
    console.error(jsonFileName + ' 解析失败')
  }
}

module.exports = {
  getJson,
  parseJson
}
