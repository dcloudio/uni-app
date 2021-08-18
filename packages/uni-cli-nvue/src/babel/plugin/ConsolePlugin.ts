import * as Types from '@babel/types'
import { PluginObj, PluginPass } from '@babel/core'
import { normalizePath } from '@dcloudio/uni-cli-shared'

const METHODS = ['error', 'warn', 'info', 'log', 'debug']
const FORMAT_LOG = '__f__'
module.exports = function ({
  types: t,
}: {
  types: typeof Types
}): PluginObj<
  { opts: { filename?: (filename: string) => string | undefined } } & PluginPass
> {
  return {
    visitor: {
      CallExpression(path, state) {
        let {
          opts,
          file: {
            opts: { filename },
          },
        } = state
        if (!filename) {
          return
        }
        if (opts && opts.filename) {
          filename = opts.filename(filename)
        }
        if (!filename) {
          return
        }
        const { callee, arguments: args, loc } = path.node
        if (!t.isMemberExpression(callee)) {
          return
        }
        const { object, property } = callee
        if (!t.isIdentifier(object) || !t.isIdentifier(property)) {
          return
        }
        if (object.name !== 'console' || !METHODS.includes(property.name)) {
          return
        }
        if (property.name === 'debug') {
          property.name = 'log'
        }
        const arg = args[0]
        if (
          arg &&
          t.isCallExpression(arg) &&
          t.isIdentifier(arg.callee) &&
          arg.callee.name === FORMAT_LOG
        ) {
          return
        }
        args.unshift({
          type: 'StringLiteral',
          value: ` at ${normalizePath(filename)}:${loc!.start.line}`,
        } as Types.StringLiteral)
        args.unshift(t.stringLiteral(property.name))
        path.replaceWith(t.callExpression(t.identifier(FORMAT_LOG), args))
      },
    },
  }
}
