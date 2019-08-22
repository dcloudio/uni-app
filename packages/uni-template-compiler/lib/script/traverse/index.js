const t = require('@babel/types')

const babelTraverse = require('@babel/traverse').default

const {
  VAR_ROOT,
  IDENTIFIER_FOR,
  IDENTIFIER_ATTR,
  IDENTIFIER_METHOD,
  IDENTIFIER_FILTER,
  IDENTIFIER_CLASS,
  IDENTIFIER_STYLE,
  IDENTIFIER_EVENT,
  IDENTIFIER_GLOBAL,
  PREFIX_ATTR,
  PREFIX_GLOBAL,
  PREFIX_METHOD,
  PREFIX_FILTER,
  PREFIX_FOR,
  PREFIX_CLASS,
  PREFIX_STYLE,
  PREFIX_EVENT
} = require('../../constants')

const {
  getInItIfStatement,
  getDataExpressionStatement
} = require('./statements')

const visitor = require('./visitor')

function reIdentifier (identifierArray) {
  const identifierOpts = {
    [IDENTIFIER_FOR]: {
      prefix: PREFIX_FOR,
      id: 0
    },
    [IDENTIFIER_METHOD]: {
      prefix: PREFIX_METHOD,
      id: 0
    },
    [IDENTIFIER_FILTER]: {
      prefix: PREFIX_FILTER,
      id: 0
    },
    [IDENTIFIER_CLASS]: {
      prefix: PREFIX_CLASS,
      id: 0
    },
    [IDENTIFIER_STYLE]: {
      prefix: PREFIX_STYLE,
      id: 0
    },
    [IDENTIFIER_EVENT]: {
      prefix: PREFIX_EVENT,
      id: 0
    },
    [IDENTIFIER_GLOBAL]: {
      prefix: PREFIX_GLOBAL,
      id: 0
    },
    [IDENTIFIER_ATTR]: {
      prefix: PREFIX_ATTR,
      id: 0
    }
  }
  // TODO order
  identifierArray.forEach(identifier => {
    if (Array.isArray(identifier)) {
      let opts = false
      identifier.forEach(stringLiteral => {
        const key = t.isStringLiteral(stringLiteral) ? 'value' : 'name'
        if (opts === false) {
          opts = identifierOpts[stringLiteral[key]]
          stringLiteral[key] = `${opts.prefix + opts.id++}`
        } else {
          stringLiteral[key] = `${opts.prefix + (opts.id - 1)}`
        }
      })
    } else {
      const key = t.isStringLiteral(identifier) ? 'value' : 'name'
      const opts = identifierOpts[identifier[key]]
      identifier[key] = `${opts.prefix + opts.id++}`
    }
  })
}

module.exports = function traverse (ast, state) {
  const identifierArray = []
  const blockStatementBody = []
  const objectPropertyArray = []
  const initExpressionStatementArray = []

  babelTraverse(ast, visitor, undefined, {
    scoped: [],
    context: VAR_ROOT,
    options: state.options,
    errors: state.errors,
    tips: state.tips,
    identifierArray: identifierArray,
    propertyArray: objectPropertyArray,
    declarationArray: blockStatementBody,
    initExpressionStatementArray: initExpressionStatementArray
  })

  if (initExpressionStatementArray.length) {
    blockStatementBody.push(getInItIfStatement(initExpressionStatementArray))
  }

  if (objectPropertyArray.length) {
    blockStatementBody.push(getDataExpressionStatement(objectPropertyArray))
  }

  reIdentifier(identifierArray)

  return t.withStatement(
    t.thisExpression(),
    t.blockStatement(blockStatementBody)
  )
}
