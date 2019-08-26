#!/usr/bin/env node

const path = require('path')

const {
  error
} = require('@vue/cli-shared-utils')

const {
  initCustomScript
} = require('@dcloudio/uni-cli-shared/lib/package')

const Service = require('@vue/cli-service')

const yargsParser = require('yargs-parser')
const argv = yargsParser(process.argv.slice(2))
if (argv._[0] === 'custom') {
  const script = argv._[1]
  if (!script) {
    console.error(`请指定 package.json->uni-app->scripts 下的 script 名称`)
    process.exit(0)
  }
  const scriptOptions = initCustomScript(script, path.resolve(process.cwd(), 'package.json'))
  if (scriptOptions && scriptOptions.title) {
    // console.log('>' + scriptOptions.title)
  }
} else {
  console.error(`uniapp-cli custom script`)
  process.exit(0)
}

// @vue/cli-service/lib/Service.js
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())

const command = (
  process.env.NODE_ENV === 'development' &&
    process.env.UNI_PLATFORM === 'h5'
) ? 'uni-serve'
  : 'uni-build'

service.run(command, {
  watch: process.env.NODE_ENV === 'development',
  minimize: process.env.UNI_MINIMIZE === 'true',
  clean: false
}).catch(err => {
  error(err)
  process.exit(1)
})
