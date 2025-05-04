const isWin = /^win/.test(process.platform)
const normalizePath = path => (isWin ? (path.split(':')[1] || path).replace(/\\/g, '/') : path)

const METHODS = ['error', 'warn', 'info', 'log', 'debug']
const FORMAT_LOG = '__f__'
module.exports = function ({
  types: t
}) {
  return {
    visitor: {
      CallExpression (path, state) {
        const opts = state.opts

        if (path.node.callee.object &&
          path.node.callee.object.name === 'console' &&
          METHODS.includes(path.node.callee.property.name)) {
          if (path.node.callee.property.name === 'debug') { // console.debug=>console.log
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
                value: ` at ${normalizePath(file)}:${path.node.loc.start.line}`
              })
              args.unshift(t.stringLiteral(path.node.callee.property.name))
              const expr = opts && opts.isUniConsole ? t.memberExpression(t.identifier('uni'), t.identifier(
                FORMAT_LOG)) : t.identifier(FORMAT_LOG)
              path.replaceWith(t.callExpression(expr, args))
              // path.node.arguments = [
              //   t.callExpression(
              //     t.identifier(FORMAT_LOG),
              //     args
              //   )
              // ]
            }
          }
        }
      }
    }
  }
}
