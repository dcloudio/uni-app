'use strict'

var css = require('css')
var util = require('./lib/util')
var validateItem = require('./lib/validator').validate
var shorthandParser = require('./lib/shorthand-parser')

// padding & margin shorthand parsing
function convertLengthShorthand (rule, prop) {
  for (var i = 0; i < rule.declarations.length; i++) {
    var declaration = rule.declarations[i]
    if (declaration.property === prop) {
      var values =  declaration.value.split(/\s+/)
      // values[0] = values[0] || 0
      values[1] = values[1] || values[0]
      values[2] = values[2] || values[0]
      values[3] = values[3] || values[1]
      rule.declarations.splice(i, 1)
      rule.declarations.splice(i, 0, {type: 'declaration', property: prop + '-left', value: values[3], position: declaration.position})
      rule.declarations.splice(i, 0, {type: 'declaration', property: prop + '-bottom', value: values[2], position: declaration.position})
      rule.declarations.splice(i, 0, {type: 'declaration', property: prop + '-right', value: values[1], position: declaration.position})
      rule.declarations.splice(i, 0, {type: 'declaration', property: prop + '-top', value: values[0], position: declaration.position})
      // break
    }
  }
}

/**
 * Parse `<style>` code to a JSON Object and log errors & warnings
 *
 * @param {string} code
 * @param {function} done which will be called with
 * - err:Error
 * - data.jsonStyle{}: `classname.propname.value`-like object
 * - data.log[{line, column, reason}]
 */
function parse(code, done) {
  var ast, err, jsonStyle = {}, log = []

  // css parse
  ast = css.parse(code, {silent: true})

  // catch syntax error
  if (ast.stylesheet.parsingErrors && ast.stylesheet.parsingErrors.length) {
    err = ast.stylesheet.parsingErrors
    err.forEach(function (error) {
      log.push({line: error.line, column: error.column, reason: error.toString().replace('Error', 'ERROR')})
    })
  }

  // walk all
  /* istanbul ignore else */
  if (ast && ast.type === 'stylesheet' && ast.stylesheet &&
      ast.stylesheet.rules && ast.stylesheet.rules.length) {
    ast.stylesheet.rules.forEach(function (rule) {
      var type = rule.type
      var ruleResult = {}
      var ruleLog = []

      if (type === 'rule') {
        if (rule.declarations && rule.declarations.length) {
          rule.declarations = shorthandParser(rule.declarations)
          // padding & margin shorthand parsing
          convertLengthShorthand(rule, 'padding')
          convertLengthShorthand(rule, 'margin')

          rule.declarations.forEach(function (declaration) {
            var subType = declaration.type
            var name, value, line, column, subResult, camelCasedName

            /* istanbul ignore if */
            if (subType !== 'declaration') {
              return
            }

            name = declaration.property
            value = declaration.value

            // validate declarations and collect them to result
            camelCasedName = util.hyphenedToCamelCase(name)
            subResult = validateItem(camelCasedName, value)

            /* istanbul ignore else */
            if (typeof subResult.value === 'number' || typeof subResult.value === 'string') {
              ruleResult[camelCasedName] = subResult.value
            }
            if (subResult.log) {
              subResult.log.line = declaration.position.start.line
              subResult.log.column = declaration.position.start.column
              ruleLog.push(subResult.log)
            }
          })

          rule.selectors.forEach(function (selector) {
            if (selector.match(/^\.[A-Za-z0-9_\-:]+$/)) {
              var className = selector.slice(1)

              // handle pseudo class
              var pseudoIndex = className.indexOf(':')
              if (pseudoIndex > -1) {
                var pseudoCls = className.slice(pseudoIndex)
                className = className.slice(0, pseudoIndex)
                var pseudoRuleResult = {}
                Object.keys(ruleResult).forEach(function (prop) {
                  pseudoRuleResult[prop + pseudoCls] = ruleResult[prop]
                })
                ruleResult = pseudoRuleResult
              }

              // merge style
              Object.keys(ruleResult).forEach(function (prop) {
                // handle transition
                if (prop.indexOf('transition') === 0 && prop !== 'transition') {
                  var realProp = prop.replace('transition', '')
                  realProp = realProp[0].toLowerCase() + realProp.slice(1)
                  jsonStyle['@TRANSITION'] = jsonStyle['@TRANSITION'] || {}
                  jsonStyle['@TRANSITION'][className] = jsonStyle['@TRANSITION'][className] || {}
                  jsonStyle['@TRANSITION'][className][realProp] = ruleResult[prop]
                }

                jsonStyle[className] = jsonStyle[className] || {}
                jsonStyle[className][prop] = ruleResult[prop]
              })
            }
            else {
              log.push({
                line: rule.position.start.line,
                column: rule.position.start.column,
                reason: 'ERROR: Selector `' + selector + '` is not supported. Weex only support single-classname selector'
              })
            }
          })
          log = log.concat(ruleLog)
        }
      }
      /* istanbul ignore else */
      else if (type === 'font-face') {
        /* istanbul ignore else */
        if (rule.declarations && rule.declarations.length) {
          rule.declarations.forEach(function (declaration) {
            /* istanbul ignore if */
            if (declaration.type !== 'declaration') {
              return
            }
            var name = util.hyphenedToCamelCase(declaration.property)
            var value = declaration.value
            if (name === 'fontFamily' && '\"\''.indexOf(value[0]) > -1) { // FIXME: delete leading and trailing quotes
              value = value.slice(1, value.length - 1)
            }
            ruleResult[name] = value
          })
          if (!jsonStyle['@FONT-FACE']) {
            jsonStyle['@FONT-FACE'] = []
          }
          jsonStyle['@FONT-FACE'].push(ruleResult)
        }
      }
    })
  }

  done(err, {jsonStyle: jsonStyle, log: log})
}

/**
 * Validate a JSON Object and log errors & warnings
 *
 * @param {object} json
 * @param {function} done which will be called with
 * - err:Error
 * - data.jsonStyle{}: `classname.propname.value`-like object
 * - data.log[{reason}]
 */
function validate(json, done) {
  var log = []
  var err

  try {
    json = JSON.parse(JSON.stringify(json))
  }
  catch (e) {
    err = e
    json = {}
  }

  Object.keys(json).forEach(function (selector) {
    var declarations = json[selector]

    Object.keys(declarations).forEach(function (name) {
      var value = declarations[name]
      var result = validateItem(name, value)

      if (typeof result.value === 'number' || typeof result.value === 'string') {
        declarations[name] = result.value
      }
      else {
        delete declarations[name]
      }

      if (result.log) {
        log.push(result.log)
      }
    })
  })

  done(err, {
    jsonStyle: json,
    log: log
  })
}

module.exports = {
  parse: parse,
  validate: validate,
  validateItem: validateItem,
  util: util
}
