const {
  Parser,
  DomHandler
} = require('stricter-htmlparser2')


module.exports = function parse(sourceCode) {
  const handler = new DomHandler()
  new Parser(handler, {
    xmlMode: false,
    lowerCaseAttributeNames: false,
    recognizeSelfClosing: true,
    lowerCaseTags: false
  }).end(sourceCode)
  return {
    type: 'tag',
    name: 'root',
    attribs: {},
    children: Array.isArray(handler.dom) ? handler.dom : [handler.dom]
  }
}
