const {
  error
} = require('@vue/cli-shared-utils')

const Service = require('@vue/cli-service')

const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd(), {
  inlineOptions: require('./vue.config.js')
})

service.run('build', {
  name: 'index',
  watch: process.env.UNI_WATCH === 'true',
  target: 'lib',
  formats: process.env.UNI_WATCH === 'true' ? 'umd' : 'umd-min',
  entry: './lib/' + process.env.UNI_PLATFORM + '/main.js'
}).catch(err => {
  error(err)
  process.exit(1)
})
