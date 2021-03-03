import path from 'path'
import ts from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.')
}

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = (p) => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))

// ensure TS checks only once for each build
let hasTSChecked = false

const configs = []
const buildOptions = require(resolve(`build.json`))
Object.keys(buildOptions.input).forEach((name) => {
  const files = buildOptions.input[name]
  if (Array.isArray(files)) {
    files.forEach((file) => {
      configs.push(
        createConfig(name, {
          file: resolve(file),
          format: file.includes('.cjs.') ? 'cjs' : 'es',
          exports: 'auto',
        })
      )
    })
  } else {
    configs.push(
      createConfig(name, {
        file: resolve(buildOptions.input[name]),
        format: (buildOptions.output && buildOptions.output.format) || `es`,
        exports: 'auto',
      })
    )
  }
})
export default configs

function createConfig(entryFile, output, plugins = []) {
  const shouldEmitDeclarations = process.env.TYPES != null && !hasTSChecked

  const tsPlugin = ts({
    check: process.env.NODE_ENV === 'production' && !hasTSChecked,
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: output.sourcemap,
        declaration: shouldEmitDeclarations,
        declarationMap: shouldEmitDeclarations,
      },
      exclude: ['**/__tests__', 'test-dts'],
    },
  })

  // we only need to check TS and generate declarations once for each build.
  // it also seems to run into weird issues when checking multiple times
  // during a single build.
  hasTSChecked = true

  const external = [
    '@vue/shared',
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...(buildOptions.external || []),
  ]

  return {
    input: resolve(entryFile),
    external,
    plugins: [
      createAliasPlugin(buildOptions),
      nodeResolve(),
      commonjs(),
      json({
        namedExports: false,
      }),
      tsPlugin,
      createReplacePlugin(buildOptions),
      ...plugins,
    ],
    output,
    onwarn: (msg, warn) => {
      // if (!/Circular/.test(msg)) {
      warn(msg)
      // }
    },
    treeshake:
      buildOptions.treeshake === false
        ? false
        : {
            moduleSideEffects(id) {
              if (id.endsWith('polyfill.ts')) {
                console.log('[WARN]:sideEffects[' + id + ']')
                return true
              }
              return false
            },
          },
  }
}

function createAliasPlugin(buildOptions) {
  return alias(buildOptions.alias || {})
}

function createReplacePlugin(buildOptions) {
  const replacements = {
    __DEV__: `(process.env.NODE_ENV !== 'production')`,
    __TEST__: false,
  }
  if (buildOptions.replacements) {
    Object.assign(replacements, buildOptions.replacements)
  }

  Object.keys(replacements).forEach((key) => {
    if (key in process.env) {
      replacements[key] = process.env[key]
    }
  })
  return replace(replacements)
}
