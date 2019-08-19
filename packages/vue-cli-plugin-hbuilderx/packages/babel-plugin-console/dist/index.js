const METHODS = ['error', 'warn', 'info', 'log', 'debug']
const FORMAT_LOG = '__f__'
module.exports = function({
  types: t
}) {

  return {
    visitor: {
      CallExpression(path, state) {

        const opts = state.opts

        if (path.node.callee.object &&
          path.node.callee.object.name === 'console' &&
          METHODS.includes(path.node.callee.property.name)) {
          if (path.node.callee.property.name === 'debug') { //console.debug=>console.log
            path.node.callee.property.name = 'log'
          }

          let file = state.file.opts.filename
          if (file) {
            if (opts && opts.file) {
              file = opts.file(file)
            }
            if (file) {
              const args = path.node.arguments
              const arg = args[0]
              if (
                arg &&
                arg.type === 'CallExpression' &&
                arg.callee.name === FORMAT_LOG
              ) {
                return
              }
              args.push({
                type: 'StringLiteral',
                value: ` at ${file}:${path.node.loc.start.line}`
              })
              path.node.arguments = [
                t.callExpression(
                  t.identifier(FORMAT_LOG),
                  args
                )
              ]
            }
          }
        }

      }
    }
  }
}
