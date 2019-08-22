#!/usr/bin/env node

// TODO 暂时处理安装目录包含特殊符号，导致 H5 预览资源加载失败的问题。
const matchSymbol = __dirname.match(/[()]/)
if (matchSymbol) {
  console.error(`编译失败：HBuilderX 安装目录不能包括 ${matchSymbol[0]} 等特殊字符`)
  process.exit(0)
}

const path = require('path')

const {
  error
} = require('@vue/cli-shared-utils')

const Service = require('@vue/cli-service')

process.env.UNI_INPUT_DIR = path.resolve(process.env.UNI_INPUT_DIR)
process.env.UNI_OUTPUT_DIR = path.resolve(process.env.UNI_OUTPUT_DIR)

// @vue/cli-service/lib/Service.js
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())

service.run((process.env.NODE_ENV === 'development' && process.env.UNI_PLATFORM === 'h5') ? 'uni-serve' : 'uni-build', {
  watch: process.env.NODE_ENV === 'development',
  minimize: process.env.UNI_MINIMIZE === 'true',
  clean: false
}).catch(err => {
  error(err)
  process.exit(1)
})
