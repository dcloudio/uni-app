import fs from 'fs'
import path from 'path'
import {
  type IndependentSubPackage,
  normalizePagePath,
  normalizePath,
  readIndependentSubPackages,
  relativeFile,
  resolveAppVue,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import type {
  EmittedFile,
  OutputAsset,
  OutputBundle,
  OutputChunk,
} from 'rollup'
import type { Plugin } from 'vite'
import type { UniMiniProgramPluginOptions } from '../plugin'
import {
  parseIndependentRoot,
  withIndependentRoot,
  withoutIndependentRoot,
} from './independentUtils'
import { virtualPagePath } from './entry'

const INDEPENDENT_MAIN_PREFIX = '\0uni:mp-independent-main'
const APP_FACTORY_PREFIX = '\0uni:mp-app-factory'
const INDEPENDENT_PAGES_PREFIX = '\0uni:mp-independent-pages'
const INDEPENDENT_PAGE_PREFIX = '\0uni:mp-independent-page'
const VUE_EXPORT_HELPER_ID = '\0plugin-vue:export-helper'

export function uniIndependentSubpackagePlugin(
  options: UniMiniProgramPluginOptions
): Plugin {
  const inputDir = process.env.UNI_INPUT_DIR
  const platform = process.env.UNI_PLATFORM as UniApp.PLATFORM
  const global = options.global
  const alias = options.vite?.alias || {}
  const styleExtname = options.style.extname
  const pagesJsonFile = normalizePath(path.resolve(inputDir, 'pages.json'))
  let independentPackages: IndependentSubPackage[] = []
  let independentRoots = new Set<string>()
  let independentRootsSignature = ''
  return {
    name: 'uni:mp-independent-subpackage',
    enforce: 'pre',
    buildStart() {
      if (fs.existsSync(pagesJsonFile)) {
        this.addWatchFile(pagesJsonFile)
      }
      independentPackages = readIndependentSubPackages(inputDir, platform)
      independentRoots = new Set(independentPackages.map(({ root }) => root))
      independentRootsSignature = stringifyIndependentRoots(independentPackages)
    },
    watchChange(id) {
      if (normalizeFileId(id) !== pagesJsonFile) {
        return
      }
      const nextIndependentPackages = tryReadIndependentSubPackages(
        inputDir,
        platform
      )
      if (!nextIndependentPackages) {
        return
      }
      const nextIndependentRootsSignature = stringifyIndependentRoots(
        nextIndependentPackages
      )
      if (nextIndependentRootsSignature !== independentRootsSignature) {
        this.error(
          `独立分包 root 列表发生变化，需要重启当前构建。当前：${formatIndependentRoots(
            independentRootsSignature
          )}；最新：${formatIndependentRoots(nextIndependentRootsSignature)}。`
        )
      }
    },
    async resolveId(id, importer) {
      const explicitRoot = parseIndependentRoot(id)
      if (explicitRoot && independentRoots.has(explicitRoot)) {
        const idWithoutRoot = withoutIndependentRoot(id)
        if (idWithoutRoot === VUE_EXPORT_HELPER_ID) {
          return id
        }
        const resolved = await this.resolve(
          idWithoutRoot,
          importer && withoutIndependentRoot(importer)
        )
        if (resolved && !resolved.external) {
          return {
            ...resolved,
            id: withIndependentRoot(resolved.id, explicitRoot),
          }
        }
        const aliased = resolveIndependentAlias(idWithoutRoot, alias)
        if (aliased) {
          return withIndependentRoot(aliased, explicitRoot)
        }
      }
      const root = parseIndependentMainRoot(id)
      if (root && independentRoots.has(root)) {
        return id
      }
      const appFactoryRoot = parseAppFactoryRoot(id)
      if (appFactoryRoot && independentRoots.has(appFactoryRoot)) {
        return id
      }
      const pagesRoot = parseIndependentPagesRoot(id)
      if (pagesRoot && independentRoots.has(pagesRoot)) {
        return id
      }
      const pageInfo = parseIndependentPageInfo(id)
      if (pageInfo && independentRoots.has(pageInfo.root)) {
        return id
      }
      const importerRoot = importer && parseIndependentRoot(importer)
      if (
        importerRoot &&
        independentRoots.has(importerRoot) &&
        shouldResolveIndependentDependency(id)
      ) {
        const importerWithoutRoot = withoutIndependentRoot(importer)
        const resolved = await this.resolve(id, importerWithoutRoot, {
          skipSelf: false,
        })
        if (resolved && !resolved.external) {
          validateIndependentDependency({
            root: importerRoot,
            source: id,
            importer: importerWithoutRoot,
            resolvedId: resolved.id,
            inputDir,
          })
          if (shouldPropagateIndependentRoot(id)) {
            return {
              ...resolved,
              id: withIndependentRoot(resolved.id, importerRoot),
            }
          }
        }
      }
    },
    load(id) {
      const explicitRoot = parseIndependentRoot(id)
      if (
        explicitRoot &&
        independentRoots.has(explicitRoot) &&
        withoutIndependentRoot(id) === VUE_EXPORT_HELPER_ID
      ) {
        return {
          code: generateVueExportHelperCode(),
          map: { mappings: '' },
        }
      }
      const root = parseIndependentMainRoot(id)
      if (root && independentRoots.has(root)) {
        return {
          code: generateIndependentMainCode(root),
          map: { mappings: '' },
        }
      }
      const appFactoryRoot = parseAppFactoryRoot(id)
      if (appFactoryRoot && independentRoots.has(appFactoryRoot)) {
        const mainFilename = resolveMainPathOnce(inputDir)
        this.addWatchFile(mainFilename)
        const appVueFilename = resolveAppVue(inputDir)
        if (fs.existsSync(appVueFilename)) {
          this.addWatchFile(appVueFilename)
        }
        const mainPath = withIndependentRoot(mainFilename, appFactoryRoot)
        return {
          code: `export { createApp } from ${JSON.stringify(mainPath)}\n`,
          map: { mappings: '' },
        }
      }
      const pagesRoot = parseIndependentPagesRoot(id)
      if (pagesRoot && independentRoots.has(pagesRoot)) {
        this.addWatchFile(path.resolve(inputDir, 'pages.json'))
        return {
          code: generateIndependentPagesCode(
            independentPackages,
            platform,
            pagesRoot
          ),
          map: { mappings: '' },
        }
      }
      const pageInfo = parseIndependentPageInfo(id)
      if (pageInfo && independentRoots.has(pageInfo.root)) {
        const filepath = normalizePath(path.resolve(inputDir, pageInfo.page))
        if (fs.existsSync(filepath)) {
          this.addWatchFile(filepath)
        }
        return {
          code: `import MiniProgramPage from ${JSON.stringify(
            withIndependentRoot(filepath, pageInfo.root)
          )}
${global}.createPage(MiniProgramPage)`,
          map: { mappings: '' },
        }
      }
    },
    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        independentPackages.forEach((pkg) => {
          emitIndependentBootstrap(
            (file) => this.emitFile(file),
            bundle,
            pkg.root
          )
          injectIndependentBootstrap(bundle, pkg.root)
          relocateIndependentStyleChunks(bundle, pkg.root)
          processIndependentStyles(
            (file) => this.emitFile(file),
            bundle,
            pkg,
            styleExtname
          )
          validateIndependentJsReferences(bundle, pkg.root)
        })
      },
    },
  }
}

function emitIndependentBootstrap(
  emitFile: (emittedFile: EmittedFile) => string,
  bundle: OutputBundle,
  root: string
) {
  const fileName = resolveIndependentBootstrapFilename(root)
  if (bundle[fileName]) {
    return
  }
  emitFile({
    type: 'asset',
    fileName,
    source: "require('./main.js');\n",
  })
}

function injectIndependentBootstrap(bundle: OutputBundle, root: string) {
  const bootstrapFilename = resolveIndependentBootstrapFilename(root)
  Object.keys(bundle).forEach((name) => {
    const file = bundle[name]
    if (file.type !== 'chunk' || !shouldInjectBootstrap(file, root)) {
      return
    }
    const requireCode = `require('${relativeFile(
      file.fileName,
      bootstrapFilename
    )}');\n`
    if (!file.code.startsWith(requireCode)) {
      file.code = requireCode + file.code
    }
  })
}

function shouldInjectBootstrap(chunk: OutputChunk, root: string) {
  const fileName = normalizePath(chunk.fileName)
  const normalizedRoot = normalizePath(root).replace(/\/$/, '')
  return (
    fileName.endsWith('.js') &&
    fileName.startsWith(`${normalizedRoot}/`) &&
    !fileName.startsWith(`${normalizedRoot}/common/`)
  )
}

function resolveIndependentBootstrapFilename(root: string) {
  return `${normalizePath(root).replace(/\/$/, '')}/common/index.js`
}

function relocateIndependentStyleChunks(bundle: OutputBundle, root: string) {
  Object.keys(bundle).forEach((name) => {
    const file = bundle[name]
    if (
      !isOutputChunk(file) ||
      !file.fileName.endsWith('.js') ||
      !isInIndependentOutputRoot(file.fileName, root)
    ) {
      return
    }
    file.code = replaceStaticRequire(file.code, (source) => {
      const resolved = resolveLocalOutputFilename(file.fileName, source)
      if (
        !resolved ||
        isInIndependentOutputRoot(resolved, root) ||
        !isRelocatableStyleChunk(bundle[resolved], resolved)
      ) {
        return source
      }
      const targetFilename = resolveIndependentCommonChunkFilename(
        root,
        path.basename(resolved)
      )
      if (!bundle[targetFilename]) {
        bundle[targetFilename] = {
          ...bundle[resolved],
          fileName: targetFilename,
        } as OutputChunk
      }
      return relativeFile(file.fileName, targetFilename)
    })
  })
}

function validateIndependentJsReferences(bundle: OutputBundle, root: string) {
  Object.keys(bundle).forEach((name) => {
    const file = bundle[name]
    if (
      !isOutputChunk(file) ||
      !file.fileName.endsWith('.js') ||
      !isInIndependentOutputRoot(file.fileName, root)
    ) {
      return
    }
    replaceStaticRequire(file.code, (source) => {
      const resolved = resolveLocalOutputFilename(file.fileName, source)
      if (resolved && !isInIndependentOutputRoot(resolved, root)) {
        throw new Error(
          `独立分包 "${root}" 的 JS 不能引用 root 外产物：${file.fileName} -> ${source}（${resolved}）。请将依赖移动到 "${root}" 内，或等待后续自动处理 root 外依赖。`
        )
      }
      return source
    })
  })
}

function replaceStaticRequire(
  code: string,
  replacer: (source: string) => string
) {
  return code.replace(
    /\brequire\(\s*(['"])([^'"]+)\1\s*\)/g,
    (match, quote: string, source: string) => {
      const nextSource = replacer(source)
      return nextSource === source
        ? match
        : `require(${quote}${nextSource}${quote})`
    }
  )
}

function resolveLocalOutputFilename(importer: string, source: string) {
  if (!source.startsWith('.')) {
    return
  }
  return normalizePath(path.join(path.dirname(importer), source))
}

function isRelocatableStyleChunk(
  file: OutputBundle[string] | undefined,
  filename: string
) {
  return (
    isOutputChunk(file) &&
    /(?:^|\/)[^/]+\.vue_vue_type_style_.*\.js$/.test(filename)
  )
}

function resolveIndependentCommonChunkFilename(root: string, filename: string) {
  return `${normalizeIndependentRoot(root)}/common/${normalizePath(filename)}`
}

function tryReadIndependentSubPackages(
  inputDir: string,
  platform: UniApp.PLATFORM
) {
  try {
    return readIndependentSubPackages(inputDir, platform)
  } catch {
    return
  }
}

function stringifyIndependentRoots(packages: IndependentSubPackage[]) {
  return packages
    .map(({ root }) => root)
    .sort()
    .join('\n')
}

function formatIndependentRoots(signature: string) {
  return signature ? signature.split('\n').join(', ') : '无'
}

function resolveIndependentAlias(
  id: string,
  alias: UniMiniProgramPluginOptions['vite']['alias']
) {
  if (Array.isArray(alias)) {
    for (const item of alias) {
      if (typeof item.find === 'string' && item.find === id) {
        return item.replacement
      }
    }
    return
  }
  return alias[id]
}

function processIndependentStyles(
  emitFile: (emittedFile: EmittedFile) => string,
  bundle: OutputBundle,
  independentPackage: IndependentSubPackage,
  extname: string
) {
  const root = normalizeIndependentRoot(independentPackage.root)
  const globalStyleFilename = resolveIndependentGlobalStyleFilename(
    root,
    extname
  )
  const hasGlobalStyle = emitIndependentGlobalStyle(
    emitFile,
    bundle,
    root,
    extname,
    globalStyleFilename
  )

  validateIndependentStyleAssets(bundle, root, extname)
  if (hasGlobalStyle) {
    injectIndependentGlobalStyle(
      bundle,
      independentPackage,
      extname,
      globalStyleFilename
    )
    validateIndependentStyleAssets(bundle, root, extname)
  }
}

function emitIndependentGlobalStyle(
  emitFile: (emittedFile: EmittedFile) => string,
  bundle: OutputBundle,
  root: string,
  extname: string,
  globalStyleFilename: string
) {
  const existedGlobalStyle = bundle[globalStyleFilename]
  if (isOutputAsset(existedGlobalStyle)) {
    validateIndependentStyleReferences(
      root,
      globalStyleFilename,
      existedGlobalStyle.source.toString(),
      extname
    )
    return true
  }

  const appStyleFilename = resolveAppStyleFilename(extname)
  const appStyle = bundle[appStyleFilename]
  if (!isOutputAsset(appStyle)) {
    return false
  }
  const source = rebaseStyleReferences(
    appStyle.source.toString(),
    appStyleFilename,
    globalStyleFilename
  )
  validateIndependentStyleReferences(root, globalStyleFilename, source, extname)
  emitFile({
    type: 'asset',
    fileName: globalStyleFilename,
    source,
  })
  return true
}

function injectIndependentGlobalStyle(
  bundle: OutputBundle,
  independentPackage: IndependentSubPackage,
  extname: string,
  globalStyleFilename: string
) {
  const pageStyleFilenames = resolveIndependentPageStyleFilenames(
    independentPackage,
    extname
  )
  pageStyleFilenames.forEach((filename) => {
    const asset = bundle[filename]
    if (!isOutputAsset(asset)) {
      return
    }
    const importCode = `@import "${relativeFile(
      filename,
      globalStyleFilename
    )}";\n`
    const source = asset.source.toString()
    if (!source.includes(importCode.trim())) {
      asset.source = importCode + source
    }
  })
}

function validateIndependentStyleAssets(
  bundle: OutputBundle,
  root: string,
  extname: string
) {
  Object.keys(bundle).forEach((filename) => {
    const asset = bundle[filename]
    if (
      !isOutputAsset(asset) ||
      !filename.endsWith(extname) ||
      !isInIndependentOutputRoot(filename, root)
    ) {
      return
    }
    validateIndependentStyleReferences(
      root,
      normalizePath(filename),
      asset.source.toString(),
      extname
    )
  })
}

function resolveIndependentPageStyleFilenames(
  independentPackage: IndependentSubPackage,
  extname: string
) {
  const root = normalizeIndependentRoot(independentPackage.root)
  return independentPackage.pages.map((page) => {
    return `${normalizePath(path.join(root, page))}${extname}`
  })
}

function validateIndependentStyleReferences(
  root: string,
  filename: string,
  source: string,
  extname: string
) {
  replaceStyleReferences(source, (reference) => {
    const resolved = resolveStyleReferenceFilename(filename, reference)
    if (!resolved) {
      return reference
    }
    const appStyleFilename = resolveAppStyleFilename(extname)
    if (resolved.filename === appStyleFilename) {
      throw new Error(
        `独立分包 "${root}" 的样式不能引用主包 ${appStyleFilename}：${filename} -> ${reference}。请改为引用 "${resolveIndependentGlobalStyleFilename(
          root,
          extname
        )}"。`
      )
    }
    if (!isInIndependentOutputRoot(resolved.filename, root)) {
      throw new Error(
        `独立分包 "${root}" 的样式不能引用 root 外资源：${filename} -> ${reference}。请将该资源移动到 "${root}" 内，或等待后续自动处理 root 外依赖。`
      )
    }
    return reference
  })
}

function rebaseStyleReferences(
  source: string,
  fromFilename: string,
  toFilename: string
) {
  return replaceStyleReferences(source, (reference) => {
    const resolved = resolveStyleReferenceFilename(fromFilename, reference)
    if (!resolved || reference.trim().startsWith('/')) {
      return reference
    }
    return relativeFile(toFilename, resolved.filename) + resolved.suffix
  })
}

function replaceStyleReferences(
  source: string,
  replacer: (reference: string) => string
) {
  return source
    .replace(
      /@import\s+(?:"([^"]+)"|'([^']+)'|(?!url\s*\()([^;\s]+))/gi,
      (match, doubleQuote: string, singleQuote: string, raw: string) =>
        replaceStyleReference(
          match,
          doubleQuote || singleQuote || raw,
          replacer
        )
    )
    .replace(
      /\burl\(\s*(?:"([^"]*)"|'([^']*)'|([^'")]*?))\s*\)/gi,
      (match, doubleQuote: string, singleQuote: string, raw: string) =>
        replaceStyleReference(
          match,
          doubleQuote || singleQuote || raw,
          replacer
        )
    )
}

function replaceStyleReference(
  match: string,
  reference: string,
  replacer: (reference: string) => string
) {
  const nextReference = replacer(reference.trim())
  return nextReference === reference.trim()
    ? match
    : match.replace(reference, nextReference)
}

function resolveStyleReferenceFilename(filename: string, reference: string) {
  if (isExternalStyleReference(reference)) {
    return
  }
  const { pathname, suffix } = splitStyleReference(reference)
  if (!pathname) {
    return
  }
  const resolvedFilename = pathname.startsWith('/')
    ? normalizePath(pathname).replace(/^\/+/, '')
    : normalizePath(path.join(path.dirname(filename), pathname))
  return {
    filename: resolvedFilename,
    suffix,
  }
}

function splitStyleReference(reference: string) {
  const match = reference.match(/^([^?#]*)([?#].*)?$/)
  return {
    pathname: match ? match[1] : reference,
    suffix: (match && match[2]) || '',
  }
}

function isExternalStyleReference(reference: string) {
  const normalized = reference.trim()
  return (
    !normalized ||
    normalized.startsWith('#') ||
    normalized.startsWith('//') ||
    normalized.startsWith('var(') ||
    /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(normalized)
  )
}

function isInIndependentOutputRoot(filename: string, root: string) {
  const normalizedFilename = normalizePath(filename)
  const normalizedRoot = normalizeIndependentRoot(root)
  return (
    normalizedFilename === normalizedRoot ||
    normalizedFilename.startsWith(`${normalizedRoot}/`)
  )
}

function isOutputAsset(
  file: OutputBundle[string] | undefined
): file is OutputAsset {
  return !!file && file.type === 'asset'
}

function isOutputChunk(
  file: OutputBundle[string] | undefined
): file is OutputChunk {
  return !!file && file.type === 'chunk'
}

function resolveAppStyleFilename(extname: string) {
  return `app${extname}`
}

function resolveIndependentGlobalStyleFilename(root: string, extname: string) {
  return `${normalizeIndependentRoot(root)}/common/main${extname}`
}

function normalizeIndependentRoot(root: string) {
  return normalizePath(root).replace(/\/$/, '')
}

function generateIndependentPagesCode(
  independentPackages: IndependentSubPackage[],
  platform: UniApp.PLATFORM,
  root: string
) {
  const independentPackage = independentPackages.find(
    (pkg) => pkg.root === root
  )
  if (!independentPackage) {
    return ''
  }
  const imports = independentPackage.pages
    .map((page) => normalizePath(path.join(root, page)))
    .map((page) => normalizePagePath(page, platform))
    .filter((page): page is string => !!page)
    .map((page) => {
      return `import(${JSON.stringify(virtualPagePath(page, root))})`
    })
  return `if(!Math){
${imports.join('\n')}
}`
}

function validateIndependentDependency({
  root,
  source,
  importer,
  resolvedId,
  inputDir,
}: {
  root: string
  source: string
  importer: string
  resolvedId: string
  inputDir: string
}) {
  const normalizedInputDir = normalizePath(inputDir)
  const importerFile = normalizeFileId(importer)
  if (!isInIndependentRoot(importerFile, normalizedInputDir, root)) {
    return
  }
  const resolvedFile = normalizeFileId(withoutIndependentRoot(resolvedId))
  if (
    !isProjectFile(resolvedFile, normalizedInputDir) ||
    isAllowedProjectDependency(resolvedFile, normalizedInputDir) ||
    isInIndependentRoot(resolvedFile, normalizedInputDir, root)
  ) {
    return
  }
  throw new Error(
    `独立分包 "${root}" 不能引用 root 外依赖：${normalizePath(
      path.relative(normalizedInputDir, resolvedFile)
    )}。来源：${normalizePath(
      path.relative(normalizedInputDir, importerFile)
    )} -> ${source}。请将该依赖移动到 "${root}" 内，或等待后续自动处理 root 外依赖。`
  )
}

function isProjectFile(filename: string, inputDir: string) {
  return filename === inputDir || filename.startsWith(`${inputDir}/`)
}

function isAllowedProjectDependency(filename: string, inputDir: string) {
  return (
    filename.includes('/node_modules/') ||
    filename === resolveMainPathOnce(inputDir)
  )
}

function isInIndependentRoot(filename: string, inputDir: string, root: string) {
  const normalizedRoot = normalizePath(root).replace(/\/$/, '')
  const rootDir = `${inputDir}/${normalizedRoot}`
  return filename === rootDir || filename.startsWith(`${rootDir}/`)
}

function normalizeFileId(id: string) {
  return normalizePath(id).split('?')[0]
}

function shouldResolveIndependentDependency(id: string) {
  if (parseIndependentRoot(id)) {
    return false
  }
  if (/^uni(?:Page|Component):\/\//.test(id)) {
    return false
  }
  if (/^(?:plugin|dynamicLib|ext|data|https?):/.test(id)) {
    return false
  }
  return true
}

function shouldPropagateIndependentRoot(id: string) {
  if (parseIndependentRoot(id)) {
    return false
  }
  if (/^(?:plugin|dynamicLib|ext|data|https?):/.test(id)) {
    return false
  }
  if (/[?&](?:url|raw)\b/.test(id)) {
    return false
  }
  if (/\.(?:css|scss|sass|less|styl)(?:$|[?#&])/.test(id)) {
    return false
  }
  return true
}

function generateIndependentMainCode(root: string) {
  const encodedRoot = encodeURIComponent(root)
  return `import ${JSON.stringify(withIndependentRoot('uni-mp-runtime', root))}
import { createApp as createUserApp } from ${JSON.stringify(
    `${APP_FACTORY_PREFIX}?root=${encodedRoot}`
  )}
import ${JSON.stringify(`${INDEPENDENT_PAGES_PREFIX}?root=${encodedRoot}`)}

const __uniSubpackageRoot = ${JSON.stringify(root)}
const __uniGlobal = typeof globalThis !== 'undefined' ? globalThis : global
try {
  __uniGlobal.__uniSubpackageRoot = __uniSubpackageRoot
  createUserApp().app.mount('#app')
} finally {
  __uniGlobal.__uniSubpackageRoot = ''
}
`
}

function generateVueExportHelperCode() {
  return `export default (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
}
`
}

function parseIndependentMainRoot(id: string) {
  return parseVirtualRoot(id, INDEPENDENT_MAIN_PREFIX)
}

function parseAppFactoryRoot(id: string) {
  return parseVirtualRoot(id, APP_FACTORY_PREFIX)
}

function parseIndependentPagesRoot(id: string) {
  return parseVirtualRoot(id, INDEPENDENT_PAGES_PREFIX)
}

function parseIndependentPageInfo(id: string) {
  if (!id.startsWith(INDEPENDENT_PAGE_PREFIX)) {
    return
  }
  const query = parseVirtualQuery(id)
  const root = query.get('root')
  const page = query.get('page')
  if (root && page) {
    return { root, page }
  }
}

function parseVirtualRoot(id: string, prefix: string) {
  if (!id.startsWith(prefix)) {
    return
  }
  const queryIndex = id.indexOf('?')
  if (queryIndex === -1) {
    return
  }
  const query = id.slice(queryIndex + 1)
  return new URLSearchParams(query).get('root') || undefined
}

function parseVirtualQuery(id: string) {
  const queryIndex = id.indexOf('?')
  return new URLSearchParams(queryIndex === -1 ? '' : id.slice(queryIndex + 1))
}
