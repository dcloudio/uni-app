const path = require('path')

const Service = require('@vue/cli-service')

const {
  initCustomScript
} = require('@dcloudio/uni-cli-shared/lib/package')
const uniI18n = require('@dcloudio/uni-cli-i18n')

module.exports = function custom (argv) {
  const script = argv._[1]
  if (!script) {
    console.error(uniI18n.__('pluginUni.pleaseConfigScriptName'))
    process.exit(0)
  }

  const scriptOptions = initCustomScript(script, path.resolve(process.cwd(), 'package.json'))
  if (scriptOptions && scriptOptions.title) {
    // console.log('>' + scriptOptions.title)
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
    clean: false,
    subpackage: argv.subpackage,
    plugin: argv.plugin
  }).catch(err => {
    console.error(err)
    process.exit(1)
  })
}
