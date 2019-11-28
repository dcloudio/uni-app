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

module.exports = function transformFile(input, options) {

  const {
    template: templateExtname,
    style: styleExtname
  } = options.extname

  const filepath = input.replace(templateExtname, '')
  const deps = [
    filepath + templateExtname
  ]

  const [usingComponentsCode] = transformJsonFile(filepath + '.json', deps)

  const [templateCode, wxsCode = ''] = transformTemplateFile(filepath + templateExtname)

  const styleCode = transformStyleFile(filepath + styleExtname, options, deps) || ''
  const scriptCode = transformScriptFile(filepath + '.js', usingComponentsCode, options, deps)

  return [
    `<template>
${templateCode}
</template>
${wxsCode}
<script>
${scriptCode}
</script>
<style>
${styleCode}
</style>`,
    deps
  ]
}
