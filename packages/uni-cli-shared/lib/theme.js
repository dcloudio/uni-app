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

const themeJsonPath = path.join(process.env.UNI_INPUT_DIR, 'theme.json')

function hasTheme () {
  return fs.existsSync(themeJsonPath)
}

function darkmode () {
  return !!(global.uniPlugin.options || {}).darkmode
}

module.exports = {
  darkmode,
  hasTheme,
  initTheme () {
    if (!hasTheme()) {
      return
    }
    if (darkmode()) {
      return
    }
    try {
      const theme = getJson('theme.json', true)
      global.uniPlugin.defaultTheme = theme.light
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
