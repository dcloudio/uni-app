const path = require('path')

const {
  transformJsonFile
} = require('./json-transformer')
const {
  transformTemplateFile
} = require('./template-transformer')
const {
  transformStyleFile
} = require('./style-transformer')
const {
  transformScriptFile
} = require('./script-transformer')

const pkg = require('../../../package.json')

module.exports = function transformFile(input, options) {

  const {
    template: templateExtname,
    style: styleExtname
  } = options.extname

  const filepath = input.replace(templateExtname, '')
  const deps = [
    filepath + templateExtname
  ]

  const [jsCode, isComponent] = transformJsonFile(filepath + '.json', deps)

  options.isComponent = isComponent
  options.filepath = filepath
  options.filename = path.basename(filepath)

  const [templateCode, wxsCode = '', wxsFiles = []] = transformTemplateFile(filepath + templateExtname, options)

  const styleCode = transformStyleFile(filepath + styleExtname, options, deps) || ''
  const scriptCode = transformScriptFile(filepath + '.js', jsCode, options, deps)

  return [
    `<!-- @dcloudio/uni-migration@${pkg.version} -->
<!-- ${new Date().toLocaleString()} -->
<template>
${templateCode}
</template>
${wxsCode}
<script>
${scriptCode}
</script>
<style platform="mp-weixin">
${styleCode}
</style>`,
    deps,
    wxsFiles
  ]
}
