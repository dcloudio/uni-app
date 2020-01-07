#!/usr/bin/env node

const path = require('path')
const Program = require('commander')
const migrate = require('../lib')
const pkg = require('../package.json')

Program
  .description('uni-app 转换工具')
  .usage('[options] [input_dir] [output_dir]')
  .option('-v, --version', '版本号')
  .option('-p, --platform [platform]', '可选`mp-weixin`,目前仅支持微信小程序向 uni-app 转换')
  .parse(process.argv)

if (Program.help === undefined) {
  Program.outputHelp()
  process.exit(0)
}

if (Program.version === undefined) {
  console.log(pkg.version)
  process.exit(0)
}

const argsLen = Program.args.length
if (!argsLen) {
  Program.outputHelp()
  process.exit(0)
}

const options = {
  platform: Program.platform || 'mp-weixin'
}


if (argsLen === 1) {
  const inputDir = path.resolve(Program.args[0])
  migrate(inputDir, inputDir, options)
} else if (argsLen > 1) {
  const inputDir = path.resolve(Program.args[0])
  const outDir = path.resolve(Program.args[1])
  migrate(inputDir, outDir, options)
}
