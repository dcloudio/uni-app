import fs from 'fs'
import path from 'path'
import { parseJson } from './json'
import { addLeadingSlash, normalizeStyles, once } from '@dcloudio/uni-shared'
import { getPlatformManifestJsonOnce } from './manifest'

const NAVIGATION_BAR_BACKGROUND_COLOR_KEY = 'navigationBarBackgroundColor'
const NAVIGATION_BAR_TEXT_STYLE_KEY = 'navigationBarTextStyle'
const TAB_BAR_BACKGROUND_COLOR_KEY = 'tabBarBackgroundColor'
const TAB_BAR_BORDER_COLOR_KEY = 'tabBarBorderColor'

const DEFAULT_THEME: UniApp.ThemeJson = {
  light: {
    [NAVIGATION_BAR_BACKGROUND_COLOR_KEY]: '#FFFFFF',
    [NAVIGATION_BAR_TEXT_STYLE_KEY]: 'black',
    [TAB_BAR_BACKGROUND_COLOR_KEY]: '#FFFFFF',
    [TAB_BAR_BORDER_COLOR_KEY]: 'rgba(0, 0, 0, 0.33)',
  },
  dark: {
    [NAVIGATION_BAR_BACKGROUND_COLOR_KEY]: '#1C1C1E',
    [NAVIGATION_BAR_TEXT_STYLE_KEY]: 'white',
    [TAB_BAR_BACKGROUND_COLOR_KEY]: '#1C1C1E',
    [TAB_BAR_BORDER_COLOR_KEY]: 'rgba(255, 255, 255, 0.33)',
  },
}

function isDefaultThemeEnabled(
  platform: UniApp.PLATFORM,
  manifestJsonPlatform?: Record<string, any>
) {
  return (
    ['h5', 'web', 'app', 'app-android', 'app-ios', 'app-harmony'].includes(
      platform
    ) &&
    (manifestJsonPlatform || getPlatformManifestJsonOnce()).darkmode === true
  )
}

export function normalizeThemeConfig(
  themeConfig: UniApp.ThemeJson,
  manifestJsonPlatform?: Record<string, any>,
  platform: UniApp.PLATFORM = process.env.UNI_PLATFORM
) {
  if (!isDefaultThemeEnabled(platform, manifestJsonPlatform)) {
    return themeConfig
  }
  // 分别补齐明暗主题，保留用户已配置的变量。
  return {
    ...themeConfig,
    light: { ...DEFAULT_THEME.light, ...themeConfig.light },
    dark: { ...DEFAULT_THEME.dark, ...themeConfig.dark },
  }
}

export function initDefaultTheme(
  pagesJson: Record<string, any>,
  platform: UniApp.PLATFORM = process.env.UNI_PLATFORM
) {
  if (!isDefaultThemeEnabled(platform)) {
    return
  }
  // 只补齐全局缺省值，页面及平台的显式配置继续按原有规则覆盖。
  const globalStyle = (pagesJson.globalStyle ||= {})
  globalStyle.navigationBarBackgroundColor ??= `@${NAVIGATION_BAR_BACKGROUND_COLOR_KEY}`
  globalStyle.navigationBarTextStyle ??= `@${NAVIGATION_BAR_TEXT_STYLE_KEY}`
  const tabBar = pagesJson.tabBar
  if (tabBar) {
    // 显式毛玻璃效果沿用原有的半透明背景计算。
    if (!tabBar.blurEffect || tabBar.blurEffect === 'none') {
      tabBar.backgroundColor ??= `@${TAB_BAR_BACKGROUND_COLOR_KEY}`
    }
    if (tabBar.borderStyle == null && tabBar.borderColor == null) {
      // App X 原生使用 borderColor；Web 避免默认 borderColor 覆盖动态设置的 borderStyle。
      const borderKey =
        process.env.UNI_APP_X === 'true' &&
        platform !== 'h5' &&
        platform !== 'web'
          ? 'borderColor'
          : 'borderStyle'
      tabBar[borderKey] = `@${TAB_BAR_BORDER_COLOR_KEY}`
    }
  }
}

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
  return parseJson(jsonStr, true, themeLocation) as UniApp.ThemeJson
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
  return parseJson(jsonStr, true, pagesFilename) as UniApp.PagesJson
}

export const normalizeThemeConfigOnce = once(
  (manifestJsonPlatform = getPlatformManifestJsonOnce()) => {
    const themeConfig = normalizeThemeConfig(
      parseThemeJson(manifestJsonPlatform.themeLocation),
      manifestJsonPlatform
    )
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
  const themeConfig = normalizeThemeConfigOnce(manifestJson)
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
