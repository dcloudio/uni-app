const fs = require('fs')
const path = require('path')

const {
  getJson
} = require('./json')

function parseThemeByJsonStr (jsonStr, keys, theme) {
  if (jsonStr.indexOf('@') === -1) {
    return jsonStr
  }
  keys.forEach(key => {
    jsonStr = jsonStr.replace(new RegExp('@' + key, 'g'), theme[key])
  })
  return jsonStr
}

function hasTheme (themeLocation = '') {
  const themeJsonPath = path.join(process.env.UNI_INPUT_DIR, themeLocation || 'theme.json')
  return fs.existsSync(themeJsonPath)
}

function darkmode () {
  return !!(global.uniPlugin.options || {}).darkmode
}

let themeConfig = {}

module.exports = {
  getTheme: () => themeConfig,
  darkmode,
  hasTheme,
  initTheme (manifestJson = {}) {
    const platform = process.env.UNI_PLATFORM
    const themeLocation = (manifestJson[platform] || {}).themeLocation
    if (!hasTheme(themeLocation)) {
      return
    }
    if (darkmode()) {
      return
    }
    try {
      themeConfig = getJson(themeLocation || 'theme.json', true)
      global.uniPlugin.defaultTheme = themeConfig.light
    } catch (e) {
      console.error(e)
    }
  },
  parseTheme (json) {
    const theme = global.uniPlugin.defaultTheme
    if (!theme) {
      return json
    }
    const keys = Object.keys(theme)
    if (!keys.length) {
      return json
    }
    if (typeof json === 'string') {
      return parseThemeByJsonStr(json, keys, theme)
    }
    return JSON.parse(parseThemeByJsonStr(JSON.stringify(json), keys, theme))
  }
}
