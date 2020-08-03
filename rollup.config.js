import path from 'path'
import ts from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'

if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.')
}

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))
const buildOptions = require(resolve(`build.json`))

const configs = []

Object.keys(buildOptions.input).forEach(name => {
  configs.push(
    createConfig(name, {
      file: resolve(buildOptions.input[name]),
      format: `es`
    })
  )
})

export default configs

function createConfig(entryFile, output, plugins = []) {
  const shouldEmitDeclarations = process.env.TYPES != null

  const tsPlugin = ts({
    check: process.env.NODE_ENV === 'production',
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: output.sourcemap,
        declaration: shouldEmitDeclarations,
        declarationMap: shouldEmitDeclarations
      },
      exclude: ['**/__tests__', 'test-dts']
    }
  })

  const external = [
    '@vue/shared',
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]

  return {
    input: resolve(entryFile),
    external,
    plugins: [
      nodeResolve(),
      json({
        namedExports: false
      }),
      tsPlugin,
      createReplacePlugin(buildOptions),
      ...plugins
    ],
    output,
    onwarn: (msg, warn) => {
      // if (!/Circular/.test(msg)) {
      warn(msg)
      // }
    },
    treeshake: {
      moduleSideEffects(id) {
        if (id.endsWith('polyfill.ts')) {
          console.log('[WARN]:sideEffects[' + id + ']')
          return true
        }
        return false
      }
    }
  }
}

function createReplacePlugin(buildOptions) {
  const replacements = {
    __DEV__: `(process.env.NODE_ENV !== 'production')`
  }
  if (buildOptions.replacements) {
    Object.assign(replacements, buildOptions.replacements)
  }

  Object.keys(replacements).forEach(key => {
    if (key in process.env) {
      replacements[key] = process.env[key]
    }
  })
  return replace(replacements)
}
