module.exports = function(source, map) {
  return `import 'uni-pages';
UniViewJSBridge.publishHandler('webviewReady')
`
}
