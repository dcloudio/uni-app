import fs from 'fs'
import path from 'path'
import { parseJson } from './json'
import { addLeadingSlash, normalizeStyles, once } from '@dcloudio/uni-shared'
import { getPlatformManifestJson } from './manifest'

export function hasThemeJson(themeLocation: string) {
  if (!fs.existsSync(themeLocation)) {
    return false
  }
  return true
}

export const parseThemeJson = (themeLocation: string = 'theme.json') => {
  if (!themeLocation || !process.env.UNI_INPUT_DIR) {
    return {}
  }
  themeLocation = path.join(process.env.UNI_INPUT_DIR, themeLocation)
  if (!hasThemeJson(themeLocation)) {
    return {}
  }
  const jsonStr = fs.readFileSync(themeLocation, 'utf8')
  return parseJson(jsonStr, true) as UniApp.ThemeJson
}

const SCHEME_RE = /^([a-z-]+:)?\/\//i
const DATA_RE = /^data:.*,.*/
function normalizeFilepath(filepath: string) {
  if (
    !(SCHEME_RE.test(filepath) || DATA_RE.test(filepath)) &&
    filepath.indexOf('/') !== 0
  ) {
    return addLeadingSlash(filepath)
  }
  return filepath
}

const parseThemeJsonIconPath = (
  themeConfig: UniApp.ThemeJson,
  curPathThemeJsonKey: string
) => {
  if (themeConfig.light?.[curPathThemeJsonKey]) {
    themeConfig.light[curPathThemeJsonKey] = normalizeFilepath(
      themeConfig.light[curPathThemeJsonKey]
    )
  }
  if (themeConfig.dark?.[curPathThemeJsonKey]) {
    themeConfig.dark[curPathThemeJsonKey] = normalizeFilepath(
      themeConfig.dark[curPathThemeJsonKey]
    )
  }
}

function normalizeUniConfigThemeJsonIconPath(
  themeConfig: UniApp.ThemeJson,
  pagesJson: UniApp.PagesJson
) {
  // 处理 tabbar 下 list -> item -> iconPath、selectedIconPath; midButton -> backgroundImage 路径 / 不开头的情况
  const tabBar = pagesJson.tabBar
  if (tabBar && tabBar.list && tabBar.list.length) {
    tabBar.list.forEach((item) => {
      if (item.iconPath && item.iconPath.indexOf('@') === 0) {
        parseThemeJsonIconPath(themeConfig, item.iconPath.replace(/^@/, ''))
      }

      if (item.selectedIconPath && item.selectedIconPath.indexOf('@') === 0) {
        parseThemeJsonIconPath(
          themeConfig,
          item.selectedIconPath.replace(/^@/, '')
        )
      }
    })

    const midButtonBackgroundImage = tabBar.midButton?.backgroundImage
    if (
      midButtonBackgroundImage &&
      midButtonBackgroundImage.indexOf('@') === 0
    ) {
      parseThemeJsonIconPath(
        themeConfig,
        midButtonBackgroundImage.replace(/^@/, '')
      )
    }
  }

  return themeConfig
}

const getPagesJson = (inputDir: string) => {
  const pagesFilename = path.join(inputDir, 'pages.json')
  if (!fs.existsSync(pagesFilename)) {
    return {
      pages: [],
      globalStyle: { navigationBar: {} },
    } as UniApp.PagesJson
  }
  const jsonStr = fs.readFileSync(pagesFilename, 'utf8')
  return parseJson(jsonStr, true) as UniApp.PagesJson
}

export const normalizeThemeConfigOnce = once(
  (manifestJsonPlatform: Record<string, any> = {}) => {
    const themeConfig = parseThemeJson(manifestJsonPlatform.themeLocation)
    if (process.env.UNI_INPUT_DIR) {
      normalizeUniConfigThemeJsonIconPath(
        themeConfig,
        getPagesJson(process.env.UNI_INPUT_DIR)
      )
    }
    return themeConfig
  }
)

export function initTheme<T extends object>(
  manifestJson: Record<string, any>,
  pagesJson: T
) {
  const platform =
    process.env.UNI_PLATFORM === 'app' ? 'app-plus' : process.env.UNI_PLATFORM
  const manifestPlatform = getPlatformManifestJson(manifestJson, platform) || {}
  const themeConfig = normalizeThemeConfigOnce(manifestPlatform)
  return normalizeStyles(pagesJson, themeConfig)
}

// TODO
export class ThemeSassParser {
  _index = 0
  _input = ''
  _theme: Record<string, Record<string, any>>

  constructor() {
    this._theme = {}
  }

  parse(input: string) {
    this._index = 0
    this._input = input
    this._theme = {}
    this._theme['light'] = {}
    this._theme['dark'] = {}
    this.parseVariable()
    return this._theme
  }

  parseVariable() {
    this.skipWhiteSpaceAndComments()

    this.consume('$')
    this.skipWhiteSpaceAndComments()
    let key = this.parseString()
    this.skipWhiteSpaceAndComments()
    this.consume(':')
    this.skipWhiteSpace()
    const value = this.parseVariableValue()
    if (Array.isArray(value)) {
      this.pushThemeValue(key, value)
    }
    this.consume(';')
    this.skipWhiteSpaceAndComments()
    if (this._index < this._input.length) {
      this.parseVariable()
    }
  }

  parseVariableValue(): any {
    switch (this.currentChar) {
      case 'l':
        return this.parseFunction()
      default:
        return this.skipOtherValue()
    }
  }

  parseFunction() {
    let functionName = ''
    while (this.currentChar != '(') {
      functionName += this.currentChar
      if (this._index + 1 < this._input.length) {
        ++this._index
      } else {
        break
      }
    }
    if (functionName != 'light-dark') {
      return this.skipOtherValue()
    }

    let valuePair = new Array<string>(2)
    valuePair[0] = ''
    valuePair[1] = ''

    this.consume('(')
    let index = 0
    // TODO rgb?
    while (this.currentChar != ')') {
      valuePair[index] += this.currentChar
      if (this.currentChar === ',') {
        index++
      }
      ++this._index
    }
    this.consume(')')

    valuePair[0] = valuePair[0].trim()
    valuePair[1] = valuePair[1].trim()

    return valuePair
  }

  skipOtherValue() {
    while (this.currentChar != ';') {
      if (this._index + 1 < this._input.length) {
        ++this._index
      } else {
        break
      }
    }
  }

  parseString(): string {
    let str = ''
    while (this.currentChar != ':') {
      if (this.currentChar == '\\') {
        str += this.currentChar
        if (this._index + 1 < this._input.length) {
          str += this._input[++this._index]
        }
      }
      str += this.currentChar
      if (this._index + 1 < this._input.length) {
        ++this._index
      } else {
        break
      }
    }
    return str
  }

  pushThemeValue(key: string, valuePair: string[]) {
    this._theme['light'][key] = valuePair[0]
    this._theme['dark'][key] = valuePair[1]
  }

  consume(expected: string) {
    if (this.currentChar != expected) {
      throw new Error(
        'Unexpected character ' +
          expected +
          ' index=' +
          this._index +
          ' ' +
          this.currentChar
      )
    }
    ++this._index
  }

  get currentChar(): string {
    if (this._index >= this._input.length) {
      throw new Error('Unexpected end of input')
    }
    return this._input[this._index]
  }

  skipWhiteSpaceAndComments() {
    while (this._index < this._input.length) {
      const c = this._input[this._index]
      if (this.isspace(c)) {
        ++this._index
      } else if (c == '/') {
        this.skipComment()
      } else {
        break
      }
    }
  }

  skipComment() {
    if (this.currentChar != '/') {
      return
    }

    this.consume('/')
    let nextChar = this.currentChar
    if (nextChar == '/') {
      // Single line comment
      while (
        // @ts-expect-error
        this.currentChar !== '\n' &&
        this._index < this._input.length - 1
      ) {
        ++this._index
      }
      this.skipWhiteSpace()
    } else if (nextChar === '*') {
      // Multi-line comment
      while (true) {
        if (this._index + 1 >= this._input.length) {
          throw new Error('Unterminated multi-line comment')
        }
        ++this._index
        // @ts-expect-error
        if (this.currentChar === '*' && this._input[this._index + 1] === '/') {
          this._index += 2
          break
        }
      }
      this.skipWhiteSpace()
    } else {
      throw new Error('Invalid comment')
    }
  }

  skipWhiteSpace() {
    while (
      this._index < this._input.length &&
      this.isspace(this._input[this._index])
    ) {
      ++this._index
    }
  }

  isspace(str: string): boolean {
    return str == ' ' || str == '\n' || str == '\r' || str == "'"
  }
}
