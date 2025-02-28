import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import jscc from 'rollup-plugin-jscc'
import ts from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import generate from "@babel/generator";
import { parse } from '@babel/parser'

if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.')
}

const require = createRequire(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = (p) => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))

// ensure TS checks only once for each build
let hasTSChecked = false

const configs = []

let buildOptions = require(resolve(`build.json`))

function normalizeOutput (file, output = {}) {
  return Object.assign(
    {
      file,
      format: file.includes('.cjs.') ? 'cjs' : 'es',
      exports: 'auto',
      interop: 'auto',
      sourcemap: process.env.ENABLE_SOURCEMAP === 'true',
    },
    output
  )
}

if (!Array.isArray(buildOptions)) {
  buildOptions = [buildOptions]
}
buildOptions.forEach((buildOption) => {
  Object.keys(buildOption.input).forEach((name) => {
    const files = buildOption.input[name]
    if (Array.isArray(files)) {
      files.forEach((file) => {
        configs.push(
          createConfig(
            name,
            normalizeOutput(resolve(file), buildOption.output),
            buildOption
          )
        )
      })
    } else {
      configs.push(
        createConfig(
          name,
          normalizeOutput(resolve(buildOption.input[name]), buildOption.output),
          buildOption
        )
      )
    }
  })
})

export default configs

function resolveTsconfigJson () {
  const tsconfigJsonPath = resolve('tsconfig.json')
  if (
    fs.existsSync(tsconfigJsonPath)
    //  &&
    // require(tsconfigJsonPath).extends === '../../tsconfig.json'
  ) {
    return tsconfigJsonPath
  }
  return path.resolve(__dirname, 'tsconfig.json')
}

function parseExternal (external) {
  const parsed = external === false
    ? []
    : Array.isArray(external)
      ? external
      : [
        'vue',
        '@vue/shared',
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        ...(external || []),
      ]
  return parsed.map((id) => {
    if (typeof id === 'string') {
      return id
    }
    return new RegExp(id.source, id.flags)
  })
}

function createConfig (entryFile, output, buildOption) {
  const shouldEmitDeclarations = process.env.TYPES != null && !hasTSChecked
  const tsOptions = {
    check: !process.env.TRANSPILE_ONLY &&
      (!process.env.CI && process.env.NODE_ENV === 'production' && !hasTSChecked),
    tsconfig: resolveTsconfigJson(),
    cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: output.sourcemap,
        declaration: shouldEmitDeclarations,
        declarationMap: false,
        skipLibCheck: true,
        ...(buildOption.compilerOptions || {}),
      },
      exclude: ['**/__tests__', 'test-dts'],
    },
    useTsconfigDeclarationDir: true,
    clean: false,
    verbosity: 0
  }
  const tsPlugin = ts(tsOptions)

  // we only need to check TS and generate declarations once for each build.
  // it also seems to run into weird issues when checking multiple times
  // during a single build.
  hasTSChecked = true

  const external = parseExternal(buildOption.external)
  let isX = process.env.UNI_APP_X === 'true'
  if (!isX && buildOption.replacements) {
    if (buildOption.replacements.__X__ === 'true') {
      isX = true
    }
  }
  const plugins = [
    createAliasPlugin(buildOption),
    nodeResolve(),
    commonjs(),
    json({
      // namedExports: false,
    }),
    tsPlugin,
    createReplacePlugin(buildOption, output.format),
  ]
  if (buildOption.output?.compact) {
    plugins.push(terser())
  }
  if (process.env.TARGET !== 'uni-push' && process.env.TARGET !== 'uni-stat') {
    plugins.unshift(jscc({
      values: {
        // 该插件限制了不能以__开头
        _NODE_JS_: 0,
        _X_: isX ? 1 : 0,
      },
      exclude: ['**/node_modules/**']
    }))
  }
  if (buildOption.babel) {
    // TODO weex 使用了 buble 编译，暂时先通过 babel 编译一遍，避免 buble 编译失败
    plugins.push(
      getBabelOutputPlugin({
        allowAllFormats: true,
        sourceType: 'module',
        presets: [['@babel/preset-env', { targets: ['iOS 10'] }]],
      })
    )
  }
  if (buildOption.replaceAfterBundled) {
    const replacements = buildOption.replaceAfterBundled
    plugins.push({
      name: 'replace-after-bundled',
      generateBundle (_options, bundles) {
        Object.keys(bundles).forEach((name) => {
          const bundle = bundles[name]
          if (!bundle.code) {
            return
          }
          Object.keys(replacements).forEach((replacement) => {
            bundle.code = bundle.code.replace(
              new RegExp(replacement, 'g'),
              replacements[replacement]
            )
          })
        })
      },
    })
  }

  if (buildOption.importReplacements && buildOption.importReplacements.length > 0) {
    /**
     * importReplacements: [{
     *   module: '@vue/shared',
     *   specifiers: [{
     *     name: 'isIntergerKey',
     *     replaceModule: '@dcloudio/uni-shared', // default is module
     *     replaceName: 'isIntergerKey', // default is name
     *   }],
     * }]
     */
    const importReplacements = buildOption.importReplacements
    plugins.push({
      name: 'replace-import',
      transform (code, id) {
        if (!id.endsWith('.js')) {
          return
        }
        const { program } = parse(code, {
          sourceType: 'module',
        })
        const replacementList = []
        program.body.forEach((node, importIndex) => {
          if (node.type !== 'ImportDeclaration') {
            return
          }
          const importSource = node.source.value
          const replacement = importReplacements.find((replacement) => replacement.module === importSource)
          if (!replacement) {
            return
          }
          const specifiers = node.specifiers
          const replacementSpecifiers = replacement.specifiers
          specifiers.forEach((specifier, specifierIndex) => {
            if (specifier.type !== 'ImportSpecifier') {
              return
            }
            const replacementSpecifier = replacementSpecifiers.find((replacementSpecifier) => replacementSpecifier.name === specifier.imported.name)
            if (!replacementSpecifier) {
              return
            }
            replacementList.push({
              module: importSource,
              importIndex,
              replacementSpecifier,
              specifiers,
              specifier,
              specifierIndex
            })
          })
        })
        if (replacementList.length === 0) {
          return
        }
        replacementList.reverse().forEach((replacement) => {
          const {
            module,
            importIndex,
            replacementSpecifier,
            specifiers,
            specifier,
            specifierIndex,
          } = replacement
          specifiers.splice(specifierIndex, 1)
          const {
            name,
            replaceName,
            replaceModule
          } = replacementSpecifier
          program.body.splice(importIndex, 0, {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: specifier.local,
                imported: {
                  type: 'Identifier',
                  name: replaceName || name
                }
              }
            ],
            source: {
              type: 'StringLiteral',
              value: replaceModule || module,
              raw: replaceModule
            }
          })
        })
        return {
          code: generate.default(program).code,
          map: null
        }
      }
    })
  }

  if (buildOption.textReplacements && buildOption.textReplacements.length > 0) {
    const textReplacements = buildOption.textReplacements
    if (textReplacements.some(textReplacement => !textReplacement.file)) {
      throw new Error('textReplacements must have file field for security reasons')
    }
    plugins.push({
      name: 'replace-text',
      transform (code, id) {
        if (!id.endsWith('.js')) {
          return
        }
        let newCode = code
        textReplacements.forEach(textReplacement => {
          const {
            file,
            find,
            replace
          } = textReplacement
          const fileFull = require.resolve(file)
          if (path.normalize(id) !== path.normalize(fileFull)) {
            return
          }
          if (typeof find === 'string') {
            if (newCode.indexOf(find) === -1) {
              throw new Error('textReplacement not found: ' + find)
            }
            newCode = newCode.replace(find, replace)
          } else {
            const regExp = new RegExp(find.source, find.flags)
            if (!regExp.test(newCode)) {
              throw new Error('textReplacement not found: ' + JSON.stringify(find))
            }
            newCode = newCode.replace(regExp, replace)
          }
        })
        return {
          code: newCode,
          map: null
        }
      }
    })
  }

  return {
    input: resolve(entryFile),
    external,
    plugins,
    output,
    onwarn: (msg, warn) => {
      // if (!/Circular/.test(msg)) {
      warn(msg)
      // }
    },
    treeshake:
      buildOption.treeshake === false
        ? false
        : {
          moduleSideEffects (id) {
            if (id.endsWith('polyfill.ts')) {
              console.log('[WARN]:sideEffects[' + id + ']')
              return true
            }
            return false
          },
        },
  }
}

function createAliasPlugin (buildOption) {
  return alias(buildOption.alias || {})
}

function createReplacePlugin (buildOption, format) {
  const replacements = {
    __DEV__: `(process.env.NODE_ENV !== 'production')`,
    __TEST__: false,
    __NODE_JS__: format === 'cjs',
  }
  // if (process.env.TARGET === 'uni-h5') {
  //   replacements.global = format === 'cjs' ? 'global' : 'window'
  // }
  if (buildOption.replacements) {
    Object.assign(replacements, buildOption.replacements)
  }

  // 注入 __UNI_CONSOLE_WEBVIEW_EVAL_JS_CODE__
  if ('process.env.UNI_CONSOLE_WEBVIEW_EVAL_JS_CODE' in replacements) {
    replacements['process.env.UNI_CONSOLE_WEBVIEW_EVAL_JS_CODE'] = () => {
      return JSON.stringify(
        fs.readFileSync(resolve('dist/__uniwebview.js'), 'utf-8')
      )
    }
  }

  Object.keys(replacements).forEach((key) => {
    if (key in process.env) {
      replacements[key] = process.env[key]
    }
  })
  return replace({ delimiters: ['', ''], values: replacements, preventAssignment: true })
}
