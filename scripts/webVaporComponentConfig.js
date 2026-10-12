const fs = require('fs-extra')
const path = require('path')
const { sync } = require('fast-glob')

function resolveWebVaporComponents(extApiDir, includeExcluded = false) {
  const components = new Map()
  for (const packageJson of sync('uni-*/package.json', {
    absolute: true,
    cwd: extApiDir,
  }).sort()) {
    const json = fs.readJsonSync(packageJson)
    // 对象形式是 DOM2 组件的筛选配置；true、false 保持原有语义。
    const options = json.uni_modules?.components?.web
    if (
      options !== 'dom2' &&
      (!options || typeof options !== 'object' || Array.isArray(options))
    ) {
      continue
    }
    const moduleDir = path.dirname(packageJson)
    const moduleName = path.basename(moduleDir)
    for (const fileName of sync('components/**/*.uvue', {
      cwd: moduleDir,
    }).sort()) {
      const componentName = path.basename(fileName, '.uvue')
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
      const elementFile = ['global.uts', 'index.uts'].find((file) =>
        fs.existsSync(path.resolve(componentDir, file))
      )
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
