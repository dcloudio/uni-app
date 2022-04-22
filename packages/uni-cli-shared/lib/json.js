const fs = require('fs')
const path = require('path')
const stripJsonComments = require('strip-json-comments')
const uniI18n = require('@dcloudio/uni-cli-i18n')

function parseJson (content, preprocess = false) {
  if (typeof content === 'string') {
    if (preprocess) {
      const preprocessor = require('@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/preprocess')
      const {
        jsPreprocessOptions
      } = require('./platform')
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
    throw new Error(jsonFilePath + ' ' + uniI18n.__('cliShared.doesNotExist'))
  }
  try {
    return parseJson(fs.readFileSync(jsonFilePath, 'utf8'), preprocess)
  } catch (e) {
    throw new Error(jsonFileName + uniI18n.__('cliShared.parseJsonFailed') + '\n' + e.message)
  }
}

module.exports = {
  getJson,
  parseJson
}
