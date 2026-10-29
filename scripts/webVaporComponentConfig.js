const fs = require('fs-extra')
const path = require('path')
const { sync } = require('fast-glob')
const { parse } = require('@babel/parser')
const { hyphenate } = require('@vue/shared')

// 两阶段可能从不同仓库启动；统一读取 next 的配置，并以 next 为相对路径基准。
function resolveWebVaporSourceDir(nextDir) {
  const envFile = path.resolve(nextDir, '.env')
  const env = fs.existsSync(envFile)
    ? require('dotenv').parse(fs.readFileSync(envFile))
    : {}
  // 专用配置优先，保留原有 Web 同步变量；原生 UNI_EXT_API_DIR 不参与选择。
  const configuredDir =
    (process.env.UNI_APP_WEB_COMPONENTS_DIR ??
      env.UNI_APP_WEB_COMPONENTS_DIR) ||
    (process.env.UNI_APP_EXT_API_DIR ?? env.UNI_APP_EXT_API_DIR)
  const sourceDir = path.resolve(
    nextDir,
    configuredDir || '../uni-app/src/uni_modules'
  )
  // 仅默认源码缺失时允许沿用已提交产物，显式配置错误不能静默回退。
  if (
    configuredDir &&
    !fs.statSync(sourceDir, { throwIfNoEntry: false })?.isDirectory()
  ) {
    throw new Error(`Web 组件源码目录不存在或不是目录：${sourceDir}`)
  }
  return sourceDir
}

// 从已有组件入口读取公开导出，避免再手工维护一份旧 Web 组件名单。
function resolveWebVaporFrameworkComponents(nextDir) {
  const entries = [
    'packages/uni-components/src/vue/index-x-vapor.ts',
    'packages/uni-h5/src/view/components/index-vapor.ts',
  ]
  const components = new Set()
  for (const entry of entries) {
    const file = path.resolve(nextDir, entry)
    const ast = parse(fs.readFileSync(file, 'utf8'), {
      sourceType: 'module',
      plugins: ['typescript'],
    })
    const defaults = new Set()
    for (const node of ast.program.body) {
      if (node.type === 'ImportDeclaration' && node.importKind !== 'type') {
        for (const specifier of node.specifiers) {
          if (specifier.type === 'ImportDefaultSpecifier') {
            defaults.add(specifier.local.name)
          }
        }
      }
    }
    for (const node of ast.program.body) {
      if (node.type !== 'ExportNamedDeclaration' || node.exportKind === 'type')
        continue
      for (const specifier of node.specifiers) {
        if (
          specifier.type === 'ExportSpecifier' &&
          specifier.local.type === 'Identifier' &&
          specifier.exported.type === 'Identifier' &&
          (node.source
            ? specifier.local.name === 'default'
            : defaults.has(specifier.local.name))
        ) {
          components.add(hyphenate(specifier.exported.name))
        }
      }
    }
  }
  return [...components].sort()
}

function resolveWebVaporComponentModules(extApiDir, includeExcluded = false) {
  const modules = new Map()
  for (const packageJson of sync('uni-*/package.json', {
    absolute: true,
    cwd: extApiDir,
  }).sort()) {
    const json = fs.readJsonSync(packageJson)
    // 启用名单仅接受 DOM2 配置；web: false 只进入完整名单，供框架排除静态导入。
    const options = json.uni_modules?.components?.web
    if (
      !(includeExcluded && options === false) &&
      options !== 'dom2' &&
      (!options || typeof options !== 'object' || Array.isArray(options))
    ) {
      continue
    }
    modules.set(path.dirname(packageJson), options)
  }
  return modules
}

function resolveWebVaporComponents(extApiDir, includeExcluded = false) {
  const components = new Map()
  for (const [moduleDir, options] of resolveWebVaporComponentModules(
    extApiDir,
    includeExcluded
  )) {
    const moduleName = path.basename(moduleDir)
    // 同步前为 .uvue，框架编译读取的副本为 .vue。
    for (const fileName of sync('components/**/*.{uvue,vue}', {
      cwd: moduleDir,
    }).sort()) {
      const componentName = path.basename(fileName, path.extname(fileName))
      if (path.basename(path.dirname(fileName)) !== componentName) continue
      // 与 customElements 的筛选规则一致，include 优先于 exclude。
      if (
        !includeExcluded &&
        (Array.isArray(options.include)
          ? !options.include.includes(componentName)
          : Array.isArray(options.exclude) &&
            options.exclude.includes(componentName))
      ) {
        continue
      }
      if (components.has(componentName)) {
        throw new Error(`Web Vapor 组件 ${componentName} 存在重复定义`)
      }
      const source = path.posix.join(moduleName, fileName.replace(/\\/g, '/'))
      const componentDir = path.dirname(path.resolve(moduleDir, fileName))
      // 保持 global/index/element 的查找顺序，同名模块优先使用标准 TS 文件。
      const elementFile = [
        'global.ts',
        'global.uts',
        'global.uts.ts',
        'index.ts',
        'index.uts',
        'index.uts.ts',
        'element.ts',
        'element.uts',
        'element.uts.ts',
      ].find((file) => fs.existsSync(path.resolve(componentDir, file)))
      components.set(componentName, {
        source,
        elementSource: elementFile
          ? path.posix.join(path.posix.dirname(source), elementFile)
          : undefined,
      })
    }
  }
  return components
}

exports.resolveWebVaporComponents = resolveWebVaporComponents
exports.resolveWebVaporComponentModules = resolveWebVaporComponentModules
exports.resolveWebVaporFrameworkComponents = resolveWebVaporFrameworkComponents
exports.resolveWebVaporSourceDir = resolveWebVaporSourceDir
