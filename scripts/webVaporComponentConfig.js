const fs = require('fs-extra')
const path = require('path')
const { sync } = require('fast-glob')

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
      const elementFile = [
        'global.uts',
        'global.uts.ts',
        'index.uts',
        'index.uts.ts',
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
