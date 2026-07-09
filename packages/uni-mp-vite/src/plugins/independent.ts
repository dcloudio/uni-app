import path from 'path'
import {
  PAGES_JSON_JS,
  normalizePath,
  relativeFile,
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
  INDEPENDENT_SUBPACKAGE_PLUGIN_NAME,
  UNI_MP_RUNTIME_ID,
  VUE_EXPORT_HELPER_ID,
  getIndependentRootByFilename,
  getIndependentRoots,
  getIndependentSubPackages,
  isAppPagesJson,
  isInIndependentRoot,
  normalizeIndependentRoot,
  parseIndependentMainRoot,
  parseIndependentRoot,
  withIndependentRoot,
  withoutIndependentRoot,
} from './independentUtils'
import { resolveIndependentMainPath } from './independentMain'

const INDEPENDENT_RUNTIME_FLAG = '__UNI_MP_INDEPENDENT_RUNTIME__'

export function uniIndependentSubpackagePlugin(
  options: UniMiniProgramPluginOptions
): Plugin {
  const inputDir = process.env.UNI_INPUT_DIR
  const alias = options.vite?.alias || {}
  const styleExtname = options.style.extname
  return {
    name: INDEPENDENT_SUBPACKAGE_PLUGIN_NAME,
    enforce: 'pre',
    async resolveId(id, importer) {
      const independentRoots = getIndependentRoots()
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
      const importerRoot = resolveImporterIndependentRoot(importer, inputDir)
      if (
        importer &&
        importerRoot &&
        independentRoots.has(importerRoot) &&
        shouldResolveIndependentDependency(id)
      ) {
        const importerWithoutRoot = withoutIndependentRoot(importer)
        const resolved = await this.resolve(id, importerWithoutRoot, {
          skipSelf: true,
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
      const independentRoots = getIndependentRoots()
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
          code: generateIndependentMainCode(root, inputDir),
          map: { mappings: '' },
        }
      }
    },
    transform(code, id) {
      const root = parseIndependentRoot(id)
      if (
        root &&
        getIndependentRoots().has(root) &&
        isMiniProgramRuntimeId(withoutIndependentRoot(id)) &&
        code.includes(INDEPENDENT_RUNTIME_FLAG)
      ) {
        return {
          code: code.replace(
            new RegExp(`\\b${INDEPENDENT_RUNTIME_FLAG}\\b`, 'g'),
            'true'
          ),
          map: { mappings: '' },
        }
      }
    },
    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        getIndependentSubPackages().forEach((pkg) => {
          emitIndependentBootstrap(
            (file) => this.emitFile(file),
            bundle,
            pkg.root
          )
          injectIndependentBootstrap(bundle, pkg.root)
          relocateIndependentStyleChunks(bundle, pkg.root)
          validateIndependentStyleAssets(bundle, pkg.root, styleExtname)
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
          `独立分包 "${root}" 的 JS 不能引用 root 外产物：${file.fileName} -> ${source}（${resolved}）。请将依赖移动到 "${root}" 内。`
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
        `独立分包 "${root}" 的样式不能引用主包 ${appStyleFilename}：${filename} -> ${reference}。请将公共样式移动到 "${root}" 内。`
      )
    }
    if (!isInIndependentOutputRoot(resolved.filename, root)) {
      throw new Error(
        `独立分包 "${root}" 的样式不能引用 root 外资源：${filename} -> ${reference}。请将该资源移动到 "${root}" 内。`
      )
    }
    return reference
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

function resolveImporterIndependentRoot(
  importer: string | undefined,
  inputDir: string | undefined
) {
  if (!importer) {
    return
  }
  return (
    parseIndependentRoot(importer) ||
    getIndependentRootByFilename(withoutIndependentRoot(importer), inputDir)
  )
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
    )} -> ${source}。请将该依赖移动到 "${root}" 内。`
  )
}

function isProjectFile(filename: string, inputDir: string) {
  return filename === inputDir || filename.startsWith(`${inputDir}/`)
}

function isAllowedProjectDependency(filename: string, inputDir: string) {
  // pages.json 是 app 级配置文件，允许独立分包读取；实际模块仍会追加 root query，避免产物落到主包 common。
  return (
    filename.includes('/node_modules/') || isAppPagesJson(filename, inputDir)
  )
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

function isMiniProgramRuntimeId(id: string) {
  return normalizePath(id).split('?')[0].endsWith('/uni.mp.esm.js')
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

function generateIndependentMainCode(
  root: string,
  inputDir: string | undefined
) {
  const independentMainPath = resolveIndependentMainPath(inputDir, root)
  let hasUniCloudSpace = false
  if (process.env.UNI_CLOUD_PROVIDER) {
    const spaces = JSON.parse(process.env.UNI_CLOUD_PROVIDER)
    if (Array.isArray(spaces) && spaces.length) {
      hasUniCloudSpace = true
    }
  }
  const imports = [
    `import { createIndependentSubpackageApp } from ${JSON.stringify(
      withIndependentRoot(UNI_MP_RUNTIME_ID, root)
    )}`,
    `import { createSSRApp } from ${JSON.stringify(
      withIndependentRoot('vue', root)
    )}`,
    `import ${JSON.stringify(withIndependentRoot(PAGES_JSON_JS, root))}`,
  ]
  if (hasUniCloudSpace) {
    imports.push(
      `import ${JSON.stringify(
        withIndependentRoot('@dcloudio/uni-cloud', root)
      )}`
    )
  }
  if (independentMainPath) {
    // 独立分包 main 仅用于配置当前 root 的 Vue app（如 app.use/provide）。
    // 不复用 app main 的 app.component 收集逻辑，避免多个独立分包全局组件互相污染。
    imports.push(
      `import { createApp as createIndependentApp } from ${JSON.stringify(
        withIndependentRoot(independentMainPath, root)
      )}`
    )
  }
  const setupCode = independentMainPath ? 'createIndependentApp(app)\n' : ''
  return `${imports.join(
    '\n'
  )}\n\nconst app = createSSRApp({})\n${setupCode}app.mount('#app', ${JSON.stringify(
    root
  )}, { independent: true, createApp: createIndependentSubpackageApp })
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
