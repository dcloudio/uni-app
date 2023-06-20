const Path = require('path')
const { parse } = require('acorn')
const walk = require('acorn-walk')

function stripHeadAndTailChar (str) {
  return str.substring(1, str.length - 1)
}

function extract (code) {
  return new Promise((resolve, reject) => {
    const ast = parse(code, {
      sourceType: 'module'
    })
    const res = []
    walk.simple(ast, {
      CallExpression (node) {
        const {
          start,
          end,
          callee,
          arguments: argNodes
        } = node
        let args = []
        if (
          callee.type === 'MemberExpression' &&
          callee.object.name === 'require' &&
          callee.property.name === 'context'
        ) {
          args = argNodes.map(a => a.value)
          res.push({
            start,
            end,
            args
          })
        }
      }
    })

    resolve(res)
  })
}

module.exports = async function extractArgs (code, baseDirname) {
  const data = await extract(code)

  return data.map(r => {
    const { start, end, args } = r
    const [
      rawDirname = '',
      rawRecursive,
      rawRegexp
    ] = args

    const dirname = Path.join(baseDirname, rawDirname)
    const recursive = rawRecursive
    const regexp = rawRegexp

    return {
      dirname,
      recursive,
      regexp,
      start,
      end
    }
  })
}
