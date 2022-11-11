const fs = require('fs')
const path = require('path')
const { parseJson, getJson } = require('./json')

let themeConfig = {}

function parseThemeByJsonStr (jsonStr, keys, theme) {
  if (jsonStr.indexOf('@') === -1) {
    return jsonStr
  }
  keys.forEach(key => {
    jsonStr = jsonStr.replace(new RegExp('@' + key, 'g'), $1 => {
      return theme[key] || $1
    })
  })
  return jsonStr
}

function hasTheme (themeLocation = 'theme.json') {
  const themeJsonPath = path.join(process.env.UNI_INPUT_DIR, themeLocation)
  return fs.existsSync(themeJsonPath)
}

function darkmode () {
  return !!(global.uniPlugin.options || {}).darkmode
}

module.exports = {
  getTheme: () => themeConfig,
  darkmode,
  hasTheme,
  initTheme (manifestJson = {}) {
    const platform = process.env.UNI_PLATFORM
    const themeLocation = (manifestJson[platform] || {}).themeLocation || 'theme.json'
    if (!hasTheme(themeLocation)) {
      return
    }
    if (darkmode()) {
      return
    }
    try {
      themeConfig = Object.keys(themeConfig).length ? themeConfig : getJson(themeLocation, true)
      global.uniPlugin.defaultTheme = themeConfig.light
    } catch (e) {
      console.error(e)
    }
  },
  parseTheme (json, _theme) {
    const theme = themeConfig[_theme] || global.uniPlugin.defaultTheme
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
  },
  copyMiniProgramThemeJson (platformOptions, vueOptions) {
    const themeLocation = platformOptions.themeLocation || 'theme.json'
    if (hasTheme(themeLocation)) {
      platformOptions.themeLocation = themeLocation
      return {
        from: path.resolve(process.env.UNI_INPUT_DIR, platformOptions.themeLocation),
        to: path.resolve(process.env.UNI_OUTPUT_DIR, platformOptions.themeLocation),
        transform: content => JSON.stringify(parseJson(content.toString(), true))
      }
    }
  }
}
