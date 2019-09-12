const path = require('path')

const formatErrors = require('./format-errors')

module.exports = function stringify (errors) {
  return (Array.from(
    new Set(
      errors.map(err => {
        const formatError = formatErrors[err.name]

        if (formatError) {
          const result = formatError(err)
          if (result) {
            if (typeof result === 'string') {
              return result
            } else {
              const file = path.relative(process.env.UNI_INPUT_DIR, err.module.resource).split('?')[0]
              if (file === 'pages.json') {
                result.line = 1
              }
              return `${result.message} at ${file}:${result.line || 1}`
            }
          } else if (result === false) {
            return '' // skip
          }
        }
        return err.message
      })
    )
  )
    .filter(msg => !!msg)
    .join('\n'))
}
