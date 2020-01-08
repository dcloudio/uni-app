const path = require('path')
const hash = require('hash-sum')
const qs = require('querystring')
const plugin = require('./plugin')
const selectBlock = require('./select')
const loaderUtils = require('loader-utils')
const { attrsToQuery } = require('./codegen/utils')
const { parse } = require('@vue/component-compiler-utils')
const genStylesCode = require('./codegen/styleInjection')
const { genHotReloadCode } = require('./codegen/hotReload')
const genCustomBlocksCode = require('./codegen/customBlocks')
const componentNormalizerPath = require.resolve('./runtime/componentNormalizer')
const { NS } = require('./plugin')

let errorEmitted = false
let modules // h5 平台摇树优化时,需要保留编译器原始modules(因为框架内代码不需要modules,开发者代码需要)
function loadTemplateCompiler (loaderContext) {
  try {
    return require('vue-template-compiler')
  } catch (e) {
    if (/version mismatch/.test(e.toString())) {
      loaderContext.emitError(e)
    } else {
      loaderContext.emitError(new Error(
        `[vue-loader] vue-template-compiler must be installed as a peer dependency, ` +
        `or a compatible compiler implementation must be passed via options.`
      ))
    }
  }
}

module.exports = function (source) {
  const loaderContext = this

  if (!errorEmitted && !loaderContext['thread-loader'] && !loaderContext[NS]) {
    loaderContext.emitError(new Error(
      `vue-loader was used without the corresponding plugin. ` +
      `Make sure to include VueLoaderPlugin in your webpack config.`
    ))
    errorEmitted = true
  }

  const stringifyRequest = r => loaderUtils.stringifyRequest(loaderContext, r)

  const {
    target,
    request,
    minimize,
    sourceMap,
    rootContext,
    resourcePath,
    resourceQuery
  } = loaderContext

  const rawQuery = resourceQuery.slice(1)
  const inheritQuery = `&${rawQuery}`
  const incomingQuery = qs.parse(rawQuery)
  const options = loaderUtils.getOptions(loaderContext) || {}

  const isServer = target === 'node'
  const isShadow = !!options.shadowMode
  const isProduction = options.productionMode || minimize || process.env.NODE_ENV === 'production'
  const filename = path.basename(resourcePath)
  const context = rootContext || process.cwd()
  const sourceRoot = path.dirname(path.relative(context, resourcePath))

  const descriptor = parse({
    source,
    compiler: options.compiler || loadTemplateCompiler(loaderContext),
    filename,
    sourceRoot,
    needMap: sourceMap,
    isAppService: options.isAppService,
    isAppView: options.isAppView,
    isAppNVue: options.isAppNVue
  })

  if (options.isH5TreeShaking) { // 摇树优化逻辑(框架组件移除样式,禁用 modules)
    const isWin = /^win/.test(process.platform)

    const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)
    // fixed by xxxxxx
    if(!modules && options.compilerOptions && options.compilerOptions.modules){
        modules = options.compilerOptions.modules
    }
    const sourcePath = normalizePath(require('@dcloudio/uni-h5/path').src)
    if (normalizePath(this.resourcePath).indexOf(sourcePath) === 0) {
      descriptor.styles.length = 0
      options.compilerOptions && (delete options.compilerOptions.modules)
    } else if(options.compilerOptions){
      options.compilerOptions.modules = modules
    }
  }

  // if the query has a type field, this is a language block request
  // e.g. foo.vue?type=template&id=xxxxx
  // and we will return early
  if (incomingQuery.type) {
    return selectBlock(
      descriptor,
      loaderContext,
      incomingQuery,
      !!options.appendExtension
    )
  }

  // module id for scoped CSS & hot-reload
  const rawShortFilePath = path
    .relative(context, resourcePath)
    .replace(/^(\.\.[\/\\])+/, '')

  const shortFilePath = rawShortFilePath.replace(/\\/g, '/') + resourceQuery

  const id = hash(
    isProduction
      ? (shortFilePath + '\n' + source)
      : shortFilePath
  )

  // feature information
  const hasScoped = descriptor.styles.some(s => s.scoped)
  const hasFunctional = descriptor.template && descriptor.template.attrs.functional
  const needsHotReload = (
    !isServer &&
    !isProduction &&
    (descriptor.script || descriptor.template) &&
    options.hotReload !== false
  )

  // template
  // fixed by xxxxxx (recyclable,auto components)
  let recyclable
  let templateImport = `var render, staticRenderFns, recyclableRender, components`
  let templateRequest
  if (descriptor.template) {
    // fixed by xxxxxx
    recyclable = options.isAppNVue && !!(descriptor.template.attrs && descriptor.template.attrs.recyclable)
    const src = descriptor.template.src || resourcePath
    const idQuery = `&id=${id}`
    const scopedQuery = hasScoped ? `&scoped=true` : ``
    const attrsQuery = attrsToQuery(descriptor.template.attrs)
    const query = `?vue&type=template${idQuery}${scopedQuery}${attrsQuery}${inheritQuery}`
    const request = templateRequest = stringifyRequest(src + query)
    // fixed by xxxxxx (auto components)
    templateImport = `import { render, staticRenderFns, recyclableRender, components } from ${request}`
  }

  // script
  let scriptImport = `var script = {}`
  if (descriptor.script) {
    const src = descriptor.script.src || resourcePath
    const attrsQuery = attrsToQuery(descriptor.script.attrs, 'js')
    const query = `?vue&type=script${attrsQuery}${inheritQuery}`
    const request = stringifyRequest(src + query)
    scriptImport = (
      `import script from ${request}\n` +
      `export * from ${request}` // support named exports
    )
  }

  let renderjsImport = `var renderjs`
  if((options.isAppView || options.isH5) && descriptor.renderjs){
    const src = descriptor.renderjs.src || resourcePath
    const attrsQuery = attrsToQuery(descriptor.renderjs.attrs, 'js')
    const query = `?vue&type=renderjs${attrsQuery}${inheritQuery}`
    const request = stringifyRequest(src + query)
    renderjsImport = (
      `import renderjs from ${request}\n` +
      `renderjs.__module = '${descriptor.renderjs.attrs.module}'\n` +
      `export * from ${request}` // support named exports
    )
  }


  // styles
  let stylesCode = ``
  // fixed by xxxxxx 仅限 view 层
  if (!options.isAppService && descriptor.styles.length) {
    stylesCode = genStylesCode(
      loaderContext,
      descriptor.styles,
      id,
      resourcePath,
      stringifyRequest,
      needsHotReload,
      isServer || isShadow // needs explicit injection?
    )
  }
  // fixed by xxxxxx (injectStyles,auto components)
  let code = `
${templateImport}
${renderjsImport}
${scriptImport}
${stylesCode}

/* normalize component */
import normalizer from ${stringifyRequest(`!${componentNormalizerPath}`)}
var component = normalizer(
  script,
  render,
  staticRenderFns,
  ${hasFunctional ? `true` : `false`},
  ${options.isAppNVue ? `null`: (/injectStyles/.test(stylesCode) ? `injectStyles` : `null`)},
  ${hasScoped ? JSON.stringify(id) : `null`},
  ${isServer ? JSON.stringify(hash(request)) : `null`},
  ${isShadow ? `true` : `false`},
  components,
  renderjs
)
  `.trim() + `\n`

  if (descriptor.customBlocks && descriptor.customBlocks.length) {
    code += genCustomBlocksCode(
      descriptor.customBlocks,
      resourcePath,
      resourceQuery,
      stringifyRequest
    )
  }

  if (needsHotReload) {
    code += `\n` + genHotReloadCode(id, hasFunctional, templateRequest)
  }
  // fixed by xxxxxx (app-nvue injectStyles)
  if (options.isAppNVue && /injectStyles/.test(stylesCode)) {
    code +=`\ninjectStyles.call(component)`
  }
  // Expose filename. This is used by the devtools and Vue runtime warnings.
  if (!isProduction) {
    // Expose the file's full path in development, so that it can be opened
    // from the devtools.
    code += `\ncomponent.options.__file = ${JSON.stringify(rawShortFilePath.replace(/\\/g, '/'))}`
  } else if (options.exposeFilename) {
    // Libraies can opt-in to expose their components' filenames in production builds.
    // For security reasons, only expose the file's basename in production.
    code += `\ncomponent.options.__file = ${JSON.stringify(filename)}`
  }
  if (recyclable) { // fixed by xxxxxx app-plus recyclable
    code += `\nrecyclableRender && (component.options["@render"] = recyclableRender)` // fixed by xxxxxx
  }
  code += `\nexport default component.exports`
  // console.log(code)
  return code
}

module.exports.VueLoaderPlugin = plugin
