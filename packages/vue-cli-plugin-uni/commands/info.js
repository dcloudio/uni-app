console.log('uni-app v' + require('../package.json').version)
console.log(require('chalk').bold('\nEnvironment Info:'))
require('envinfo').run({
  System: ['OS', 'CPU'],
  Binaries: ['Node', 'Yarn', 'npm'],
  Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
  npmPackages: '/**/{*vue*,@vue/*/,@dcloudio/*/}',
  npmGlobalPackages: ['@vue/cli']
}, {
  showNotFound: true,
  duplicates: true,
  fullTree: true
}).then(console.log)
