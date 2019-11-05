const transformJson = require('./json-transformer')
const transformWxml = require('./wxml-transformer')
const transformWxss = require('./wxss-transformer')
const transformJs = require('./js-transformer')

module.exports = function transformFile(input, out, options) {
  const filepath = input.replace('.wxml', '')

  const [usingComponentsCode] = transformJson(filepath + '.json')

  const [templateCode, wxsCode = ''] = transformWxml(filepath + '.wxml')

  const styleCode = transformWxss(filepath + '.wxss') || ''
  const scriptCode = transformJs(filepath + '.js', usingComponentsCode, options)

  return `
<template>
${templateCode}
</template>
${wxsCode}
<script>
${scriptCode}
</script>
<style>
${styleCode}
</style>
`
}
