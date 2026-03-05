const {
  readFileSync,
  readdirSync
} = require('fs')
const {
  extname,
  resolve
} = require('path')

module.exports = async function (globalConfig, projectConfig) {

  const describeRE = /describe\(["|'](.*)["|']/
  const testsRE = /test\(["|'](.*)["|']/g

  function parse(content) {
    const describes = content.match(describeRE)
    if (!describes) {
      return
    }
    const describe = describes[1]
    const tests = []
    let test
    while (test = testsRE.exec(content)) {
      tests.push(test[1])
    }
    return {
      describe,
      tests
    }
  }

  function parseDescribes() {
    const dir = resolve(__dirname, 'uni_modules/uts-tests/utssdk')
    const describes = []
    readdirSync(dir).forEach(file => {
      if (extname(file) === '.uts') {
        describes.push(parse(readFileSync(resolve(dir, file), 'utf8')))
      }
    })
    return describes
  };

  global.describes = parseDescribes();
};