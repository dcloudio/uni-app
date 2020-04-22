const path = require('path')
const alias = require('@rollup/plugin-alias')
const replace = require('@rollup/plugin-replace')
const nodeResolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const terser = require('rollup-plugin-terser')
const requireContext = require('../lib/rollup-plugin-require-context')

process.env.UNI_PLATFORM = 'quickapp-vue'

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
  entries: [{
    find: 'uni-core',
    replacement: resolve('src/core')
  }, {
    find: 'uni-platform',
    replacement: resolve('src/platforms/quickapp-vue')
  }, {
    find: 'uni-platforms',
    replacement: resolve('src/platforms')
  }, {
    find: 'uni-shared',
    replacement: resolve('src/shared/index.js')
  }, {
    find: 'uni-helpers',
    replacement: resolve('src/core/helpers')
  }, {
    find: 'uni-invoke-api',
    replacement: resolve('src/platforms/quickapp-vue/service/invoke-api')
  }, {
    find: 'uni-service-api',
    replacement: resolve('src/platforms/quickapp-vue/service/api')
  }, {
    find: 'uni-api-protocol',
    replacement: resolve('src/core/helpers/protocol')
  }]
}),
nodeResolve(),
requireContext(),
commonjs(),
replace({
  __PLATFORM__: JSON.stringify(process.env.UNI_PLATFORM),
  __PLATFORM_TITLE__: '快应用(Vue)版'
})
]

// if (process.env.NODE_ENV === 'production') {
plugins.push(terser.terser())
// }

module.exports = function (type) {
  let input = ''

  if (type === 'bridge') {
    input = 'src/platforms/quickapp-vue/runtime/bridge.js'
  } else if (type === 'app') {
    input = 'src/platforms/quickapp-vue/runtime/app.js'
  } else if (type === 'page') {
    input = 'src/platforms/quickapp-vue/runtime/page.js'
  }

  return {
    input,
    plugins,
    external
  }
}
