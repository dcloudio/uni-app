const fs = require('fs-extra')
const path = require('path')
const { format, resolveConfig } = require('prettier')
const { camelize, capitalize } = require('@vue/shared')
const { preprocess } = require('../packages/uni-cli-shared/lib/preprocess')
const {
  parseSfc,
  removeSfcStyles,
  syncExtApiDir,
} = require('./syncExtComponentFile')
const {
  resolveWebVaporComponents,
  resolveWebVaporComponentModules,
  resolveWebVaporSourceDir,
} = require('./webVaporComponentConfig')

async function prepareWebVaporComponents({
  extApiDir,
  componentsDir,
  componentsEntryOutput,
  styleDir,
  context,
}) {
  const components = [...resolveWebVaporComponents(extApiDir)].sort(
    ([a], [b]) => a.localeCompare(b)
  )
  const enabledModules = new Set(
    components.map(([, component]) => component.source.split('/')[0])
  )
  // 同步完整配置而非仅启用组件；已有副本也参与，以清理源码移除后的失效组件。
  const moduleNames = new Set(
    [
      ...resolveWebVaporComponentModules(extApiDir, true).keys(),
      ...resolveWebVaporComponentModules(componentsDir, true).keys(),
    ].map((moduleDir) => path.basename(moduleDir))
  )
  for (const name of moduleNames) {
    const sourceDir = path.resolve(extApiDir, name)
    const outputDir = path.resolve(componentsDir, name)
    const sourcePackage = path.join(sourceDir, 'package.json')
    if (
      fs.existsSync(sourcePackage) &&
      (enabledModules.has(name) ||
        !fs.existsSync(path.join(outputDir, 'package.json')))
    ) {
      syncExtApiDir(sourceDir, outputDir)
    } else {
      // 禁用或移除组件时只更新组件目录和配置，不清空已有 API、页面副本。
      const sourceComponents = path.join(sourceDir, 'components')
      const outputComponents = path.join(outputDir, 'components')
      if (fs.existsSync(sourceComponents)) {
        syncExtApiDir(sourceComponents, outputComponents)
      } else {
        fs.removeSync(outputComponents)
      }
      if (fs.existsSync(sourcePackage)) {
        // 禁用组件的配置单独复制，与整目录同步时使用相同的 LF 换行。
        fs.writeFileSync(
          path.join(outputDir, 'package.json'),
          fs.readFileSync(sourcePackage, 'utf8').replace(/\r\n/g, '\n')
        )
      }
    }
  }

  const prettierConfig = await resolveConfig(styleDir)
  const componentNames = new Set(components.map(([name]) => name))
  if (fs.existsSync(styleDir)) {
    for (const file of fs.readdirSync(styleDir)) {
      if (
        path.extname(file) === '.css' &&
        // Button 暂用旧 Web 实现，样式由框架维护，不能按内网组件名单清理。
        // TODO 切换 App 共用 Button 后删除此豁免；启用时下方提取会覆盖同名 CSS。
        file !== 'button.css' &&
        !componentNames.has(path.basename(file, '.css'))
      ) {
        fs.removeSync(path.resolve(styleDir, file))
      }
    }
  }
  for (const [componentName, component] of components) {
    const fileName = path.resolve(
      componentsDir,
      component.source.replace(/\.uvue$/, '.vue')
    )
    const sourceCode = fs.readFileSync(fileName, 'utf8')
    // 与框架编译采用同一预处理器和完整上下文，依次处理模板、脚本和样式条件。
    const code = preprocess(
      preprocess(sourceCode, context, { type: 'html' }),
      context,
      { type: 'js' }
    )
    const { descriptor, errors } = parseSfc(code, fileName)
    if (errors.length) throw errors[0]
    const unsupportedStyle = descriptor.styles.find(
      (style) => Object.keys(style.attrs).length
    )
    if (unsupportedStyle) {
      throw new Error(
        `${fileName} 仅支持不带属性的 <style>，不支持以下属性：${Object.keys(
          unsupportedStyle.attrs
        ).join(', ')}`
      )
    }
    const styleOutput = path.resolve(styleDir, `${componentName}.css`)
    fs.outputFileSync(
      styleOutput,
      format(descriptor.styles.map((style) => style.content).join('\n'), {
        ...(prettierConfig || {}),
        filepath: styleOutput,
      })
    )
  }

  await writeFormattedFile(
    componentsEntryOutput,
    [
      '// 此文件由 Web Vapor 框架构建前同步脚本自动生成，请勿手动修改。',
      '',
      "export * from '../../../../../uni-components/src/vue/index-x-vapor'",
      "export { UniElement, UniElement as UniElementImpl } from '../../../../../uni-components/src/helpers/UniElement'",
      '',
      ...components.flatMap(([name, component]) => {
        const exportName = capitalize(camelize(name))
        const exports = [
          `export { default as ${exportName} } from '@dcloudio/uni-ext-component/${component.source}'`,
        ]
        if (component.elementSource) {
          const elementName = `Uni${exportName}Element`
          exports.push(
            `export { ${elementName}, ${elementName} as ${elementName}Impl } from '@dcloudio/uni-ext-component/${component.elementSource}'`
          )
        }
        return exports
      }),
      '',
    ].join('\n')
  )
}

async function syncWebVaporComponents() {
  const extApiDir = resolveWebVaporSourceDir(path.resolve(__dirname, '..'))
  // 没有外部源码时沿用仓库中的生成文件，普通包构建不强制依赖外部仓库。
  if (!fs.existsSync(extApiDir)) return
  const {
    initScopedPreContext,
  } = require('../packages/uni-cli-shared/dist/preprocess/context')
  const context = initScopedPreContext('h5', {}, 'web', true).preUVueContext
  context.VUE3_VAPOR = true
  await prepareWebVaporComponents({
    extApiDir,
    componentsDir: path.resolve(__dirname, '../uni-ext-api/uni_modules'),
    componentsEntryOutput: path.resolve(
      __dirname,
      '../packages/uni-h5/src/x/view/components/index-vapor.ts'
    ),
    styleDir: path.resolve(
      __dirname,
      '../packages/uni-components/style-x-vapor'
    ),
    context,
  })
}

/** @returns {import('vite').Plugin} */
function webVaporComponentStylesPlugin(componentsDir) {
  const files = new Set(
    [...resolveWebVaporComponents(componentsDir).values()].map((component) =>
      path
        .resolve(componentsDir, component.source.replace(/\.uvue$/, '.vue'))
        .replace(/\\/g, '/')
    )
  )
  return {
    name: 'uni:web-vapor-component-styles',
    enforce: 'pre',
    transform(code, id) {
      // CSS 已单独生成，编译时移除组件样式；共享源码副本保留样式供其他模式使用。
      if (files.has(id.replace(/\\/g, '/')))
        return { code: removeSfcStyles(code), map: null }
    },
  }
}

async function writeFormattedFile(output, code) {
  const formatted = format(code, {
    ...(await resolveConfig(output)),
    filepath: output,
  })
  if (!fs.existsSync(output) || fs.readFileSync(output, 'utf8') !== formatted)
    fs.outputFileSync(output, formatted)
}

exports.prepareWebVaporComponents = prepareWebVaporComponents
exports.syncWebVaporComponents = syncWebVaporComponents
exports.webVaporComponentStylesPlugin = webVaporComponentStylesPlugin
