const path = require('path')
const alias = require('rollup-plugin-alias')
const replace = require('rollup-plugin-replace')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const terser = require('rollup-plugin-terser')
const requireContext = require('../lib/rollup-plugin-require-context')

process.env.UNI_PLATFORM = 'quickapp'

const external = []

const resolve = dir => path.resolve(__dirname, '../', dir)

function replaceModuleImport (str) {
  return str.replace(
    /require\s*\(\s*(['"])@([\w$_][\w$-.]*?)\1\)/gm,
    (e, r, p) => `$app_require$(${r}@app-module/${p}${r})`
  ).replace(
    /import\s+([\w${}]+?)\s+from\s+(['"])@([\w$_][\w$-.]*?)\2/gm,
    (e, r, p, t) => `var ${r} = $app_require$(${p}@app-module/${t}${p})`
  )
}

const plugins = [{
  name: 'replaceModuleImport',
  transform (source) {
    return {
      code: replaceModuleImport(source)
    }
  }
},
alias({
  'uni-core': resolve('src/core'),
  'uni-platform': resolve('src/platforms/' + process.env.UNI_PLATFORM),
  'uni-platforms': resolve('src/platforms'),
  'uni-shared': resolve('src/shared/index.js'),
  'uni-helpers': resolve('src/core/helpers'),
  'uni-invoke-api': resolve('src/platforms/quickapp/service/invoke-api'),
  'uni-service-api': resolve('src/platforms/quickapp/service/api'),
  'uni-api-protocol': resolve('src/core/helpers/protocol')
}),
nodeResolve(),
requireContext(),
commonjs(),
replace({
  __PLATFORM__: JSON.stringify(process.env.UNI_PLATFORM),
  __PLATFORM_TITLE__: '快应用'
})
]

// if (process.env.NODE_ENV === 'production') {
plugins.push(terser.terser())
// }

module.exports = function (type) {
  let input = ''

  if (type === 'bridge') {
    input = 'src/platforms/quickapp/runtime/bridge.js'
  } else if (type === 'app') {
    input = 'src/platforms/quickapp/runtime/app.js'
  } else if (type === 'page') {
    input = 'src/platforms/quickapp/runtime/page.js'
  }

  return {
    input,
    plugins,
    external
  }
}
