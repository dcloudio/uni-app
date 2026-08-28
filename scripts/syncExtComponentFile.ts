import fs from 'fs-extra'
import path from 'path'
import { parse } from '@vue/compiler-sfc'
import { sync } from 'fast-glob'

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

type ScriptLang = 'ts' | 'uts'

interface SyncTarget {
  path: string
  componentName: string
  scriptLang: ScriptLang
  context: Record<string, boolean>
  stylePath?: string
}

const uniComponentsPath = resolve('../packages/uni-components')

const PREPROCESS_KEYS = [
  'APP',
  'APP_ANDROID',
  'APP_IOS',
  'APP_HARMONY',
  'H5',
  'WEB',
  'MP',
  'VUE3_VAPOR',
] as const

function createPreContext(
  context: Partial<Record<(typeof PREPROCESS_KEYS)[number], boolean>>
) {
  const preContext = PREPROCESS_KEYS.reduce<Record<string, boolean>>(
    (preContext, key) => {
      preContext[key] = false
      return preContext
    },
    {}
  )
  return { ...preContext, ...context }
}

const syncTargets: SyncTarget[] = [
  {
    path: path.resolve(uniComponentsPath, './lib-x/uniloading'),
    componentName: 'uniloading',
    scriptLang: 'uts',
    context: createPreContext({ MP: true }),
  },
  {
    path: path.resolve(uniComponentsPath, './lib-x-vapor/uniloading'),
    componentName: 'uniloading',
    scriptLang: 'ts',
    context: createPreContext({ MP: true, VUE3_VAPOR: true }),
  },
  {
    path: path.resolve(uniComponentsPath, './src/vue/loading'),
    componentName: 'index-x',
    scriptLang: 'ts',
    context: createPreContext({ WEB: true, H5: true }),
    stylePath: path.resolve(uniComponentsPath, './style-x/loading.css'),
  },
]

const components = [
  {
    originName: 'loading',
    targetName: 'uniloading',
  },
]

export function syncExtComponentFile(apiDirs: string[]) {
  try {
    const { preprocess } = require('../packages/uni-preprocess')
    apiDirs.forEach((apiDir) => {
      components.forEach((component) => {
        const componentDir = `uni-${component.originName}`
        sync(path.join(apiDir, `./${componentDir}/package.json`)).forEach(
          (packageJsonPath) => {
            const componentsDir = path.resolve(packageJsonPath, '../components')
            syncComponent(
              componentsDir,
              component,
              preprocess,
              syncTargets
            )
          }
        )
      })
    })
  } catch (error) {
    console.error('[syncExtComponentFile] sync ext component file error:', error)
  }
}

function syncComponent(
  componentsDir: string,
  component: { originName: string; targetName: string },
  preprocess: (code: string, options: any) => { code: string },
  targets: SyncTarget[]
) {
  if (!fs.existsSync(componentsDir)) {
    return
  }

  const componentRoot = fs.existsSync(
    path.join(componentsDir, component.originName)
  )
    ? path.join(componentsDir, component.originName)
    : componentsDir
  const files = sync(path.join(componentRoot, '**/*'), { onlyFiles: true })
  const originComponentPath = ['.vue', '.uvue']
    .map((ext) => path.join(componentRoot, `${component.originName}${ext}`))
    .find((filePath) => files.includes(filePath))

  targets.forEach((target) => {
    files.forEach((filePath) => {
      const relativePath = path.relative(componentRoot, filePath)
      const { dir, name, ext } = path.parse(relativePath)
      const code = fs.readFileSync(filePath, 'utf8')
      // MP 使用 UniElement 类型，与 APP 的辅助文件实现相同。
      const preprocessContext =
        name === 'useLoadingStyle' && target.context.MP
          ? { ...target.context, APP: true }
          : target.context
      const preprocessedCode = preprocess(code, {
        type: 'auto',
        context: preprocessContext,
      }).code

      if (ext === '.vue' || ext === '.uvue') {
        const isMainComponent = filePath === originComponentPath
        const targetName = isMainComponent ? target.componentName : name
        const targetCode = normalizeScriptLang(
          preprocessedCode,
          target.scriptLang
        )
        const targetFilePath = path.resolve(
          target.path,
          dir,
          `${targetName}.vue`
        )
        const { descriptor, errors } = parse(targetCode, {
          filename: filePath,
        })
        if (errors.length) {
          console.error(
            `[syncExtComponentFile] parse ${filePath} error:`,
            errors
          )
          return
        }

        if (target.stylePath) {
          fs.outputFileSync(
            target.stylePath,
            normalizeTrailingNewline(
              descriptor.styles.map((style) => style.content).join('\n')
            )
          )
          fs.outputFileSync(
            targetFilePath,
            removeStyles(targetCode)
          )
        } else {
          fs.outputFileSync(targetFilePath, targetCode)
        }
        return
      }

      if (ext === '.ts' || ext === '.js' || ext === '.uts') {
        fs.outputFileSync(
          path.resolve(target.path, dir, `${name}.${target.scriptLang}`),
          preprocessedCode
        )
      }
    })
  })
}

function normalizeScriptLang(code: string, scriptLang: ScriptLang) {
  return code.replace(/<script\b([^>]*)>/gi, (_match, attrs: string) => {
    const langPattern = /\s+lang\s*=\s*(['"])[^'"]*\1/i
    const normalizedAttrs = langPattern.test(attrs)
      ? attrs.replace(langPattern, ` lang="${scriptLang}"`)
      : `${attrs} lang="${scriptLang}"`
    return `<script${normalizedAttrs}>`
  })
}

function removeStyles(code: string) {
  return normalizeTrailingNewline(
    code.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
  )
}

function normalizeTrailingNewline(code: string) {
  const newline = code.includes('\r\n') ? '\r\n' : '\n'
  return code.replace(/(?:\r?\n)+$/, newline)
}
