const qs = require('querystring')
const { attrsToQuery } = require('./utils')

module.exports = function genCustomBlocksCode (
  blocks,
  resourcePath,
  resourceQuery,
  stringifyRequest
) {
  return `\n/* custom blocks */\n` + blocks.map((block, i) => {
    const src = block.attrs.src || resourcePath
    const attrsQuery = attrsToQuery(block.attrs)
    const issuerQuery = block.attrs.src ? `&issuerPath=${qs.escape(resourcePath)}` : ''
    const inheritQuery = resourceQuery ? `&${resourceQuery.slice(1)}` : ''
    const query = `?vue&type=custom&index=${i}&blockType=${qs.escape(block.type)}${issuerQuery}${attrsQuery}${inheritQuery}`
    return (
      `import block${i} from ${stringifyRequest(src + query)}\n` +
      `if (typeof block${i} === 'function') block${i}(component)`
    )
  }).join(`\n`) + `\n`
}
