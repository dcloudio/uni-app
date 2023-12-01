#!/usr/bin/env node
const { performance } = require('perf_hooks')
global.__vite_start_time = performance.now()
const debugIndex = process.argv.findIndex((arg) => /^(?:-d|--debug)$/.test(arg))
const filterIndex = process.argv.findIndex((arg) =>
  /^(?:-f|--filter)$/.test(arg)
)
if (debugIndex > 0) {
  let value = process.argv[debugIndex + 1]
  if (!value || value.startsWith('-')) {
    value = 'vite:*,uni:*'
  }
  process.env.DEBUG = value

  if (filterIndex > 0) {
    const filter = process.argv[filterIndex + 1]
    if (filter && !filter.startsWith('-')) {
      process.env.VITE_DEBUG_FILTER = filter
    }
  }
}
// uni-cli-shared 引入了 @vue/compiler-core，需要提前设置NODE_ENV，才能保证 @vue/compiler-core 加载的是对应环境的代码
if (
  process.argv[2] === 'build' &&
  !process.argv.some((arg) => /^(?:-w|--watch)$/.test(arg))
) {
  process.env.NODE_ENV = 'production'
}
require('../dist/cli/index.js')
