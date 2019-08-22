/*
 * preprocess
 * https://github.com/onehealth/preprocess
 *
 * Copyright (c) 2012 OneHealth Solutions, Inc.
 * Written by Jarrod Overson - http://jarrodoverson.com/
 * Licensed under the Apache 2.0 license.
 */

'use strict'

exports.preprocess = preprocess
exports.preprocessFile = preprocessFile
exports.preprocessFileSync = preprocessFileSync

var path = require('path')

var fs = require('fs')

var os = require('os')

var delim = require('./regexrules')

var XRegExp = require('xregexp')

function preprocessFile (srcFile, destFile, context, callback, options) {
  options = getOptionsForFile(srcFile, options)
  context.src = srcFile

  fs.readFile(srcFile, function (err, data) {
    if (err) return callback(err, data)
    var parsed = preprocess(data, context, options)
    fs.writeFile(destFile, parsed, callback)
  })
}

function preprocessFileSync (srcFile, destFile, context, options) {
  options = getOptionsForFile(srcFile, options)
  context.src = srcFile

  var data = fs.readFileSync(srcFile)
  var parsed = preprocess(data, context, options)
  return fs.writeFileSync(destFile, parsed)
}

function getOptionsForFile (srcFile, options) {
  options = options || {}
  options.srcDir = options.srcDir || path.dirname(srcFile)
  options.type = options.type || getExtension(srcFile)

  return options
}

function getExtension (filename) {
  var ext = path.extname(filename || '').split('.')
  return ext[ext.length - 1]
}

function preprocess (src, context, typeOrOptions) {
  src = src.toString()
  context = context || process.env

  // default values
  var options = {
    fileNotFoundSilentFail: false,
    srcDir: process.cwd(),
    srcEol: getEolType(src),
    type: delim['html']
  }

  // needed for backward compatibility with 2.x.x series
  if (typeof typeOrOptions === 'string') {
    typeOrOptions = {
      type: typeOrOptions
    }
  }

  // needed for backward compatibility with 2.x.x series
  if (typeof context.srcDir === 'string') {
    typeOrOptions = typeOrOptions || {}
    typeOrOptions.srcDir = context.srcDir
  }

  if (typeOrOptions && typeof typeOrOptions === 'object') {
    options.srcDir = typeOrOptions.srcDir || options.srcDir
    options.fileNotFoundSilentFail = typeOrOptions.fileNotFoundSilentFail || options.fileNotFoundSilentFail
    options.srcEol = typeOrOptions.srcEol || options.srcEol
    options.type = delim[typeOrOptions.type] || options.type
  }

  context = copy(context)

  return preprocessor(src, context, options)
}

function preprocessor (src, context, opts, noRestoreEol) {
  src = normalizeEol(src)

  var rv = src

  rv = replace(rv, opts.type.include, processIncludeDirective.bind(null, false, context, opts))

  if (opts.type.extend) {
    rv = replaceRecursive(rv, opts.type.extend, function (startMatches, endMatches, include, recurse) {
      var file = (startMatches[1] || '').trim()
      var extendedContext = copy(context)
      var extendedOpts = copy(opts)
      extendedContext.src = path.join(opts.srcDir, file)
      extendedOpts.srcDir = path.dirname(extendedContext.src)

      var fileContents = getFileContents(extendedContext.src, opts.fileNotFoundSilentFail, context.src)
      if (fileContents.error) {
        return fileContents.contents
      }

      var extendedSource = preprocessor(fileContents.contents, extendedContext, extendedOpts, true).trim()

      if (extendedSource) {
        include = include.replace(/^\n?|\n?$/g, '')
        return replace(extendedSource, opts.type.extendable, recurse(include))
      } else {
        return ''
      }
    })
  }

  if (opts.type.foreach) {
    rv = replaceRecursive(rv, opts.type.foreach, function (startMatches, endMatches, include, recurse) {
      var variable = (startMatches[1] || '').trim()
      var forParams = variable.split(' ')
      if (forParams.length === 3) {
        var contextVar = forParams[2]
        var arrString = getDeepPropFromObj(context, contextVar)
        var eachArr
        if (arrString.match(/\{(.*)\}/)) {
          eachArr = JSON.parse(arrString)
        } else if (arrString.match(/\[(.*)\]/)) {
          eachArr = arrString.slice(1, -1)
          eachArr = eachArr.split(',')
          eachArr = eachArr.map(function (arrEntry) {
            return arrEntry.replace(/\s*(['"])(.*)\1\s*/, '$2')
          })
        } else {
          eachArr = arrString.split(',')
        }

        var replaceToken = new RegExp(XRegExp.escape(forParams[0]), 'g')
        var recursedInclude = recurse(include)

        return Object.keys(eachArr).reduce(function (stringBuilder, arrKey) {
          var arrEntry = eachArr[arrKey]
          return stringBuilder + recursedInclude.replace(replaceToken, arrEntry)
        }, '')
      } else {
        return ''
      }
    })
  }

  if (opts.type.exclude) {
    rv = replaceRecursive(rv, opts.type.exclude, function (startMatches, endMatches, include, recurse) {
      var test = (startMatches[1] || '').trim()
      return testPasses(test, context) ? '' : recurse(include)
    })
  }

  if (opts.type.if) {
    rv = replaceRecursive(rv, opts.type.if, function (startMatches, endMatches, include, recurse) {
      var variant = startMatches[1]
      var test = (startMatches[2] || '').trim()
      switch (variant) {
        case 'if':
        case 'ifdef':
          return testPasses(test, context) ? (padContent(startMatches.input) + recurse(include) + padContent(endMatches.input)) : padContent(startMatches.input + include + endMatches.input)
        case 'ifndef':
          return !testPasses(test, context) ? (padContent(startMatches.input) + recurse(include) + padContent(endMatches.input)) : padContent(startMatches.input + include + endMatches.input)
//      case 'ifdef':
//        return typeof getDeepPropFromObj(context, test) !== 'undefined' ? (padContent(startMatches.input) + recurse(include) + padContent(endMatches.input)) : padContent(startMatches.input + include + endMatches.input) // fixed by xxxxxx
//      case 'ifndef':
//        return typeof getDeepPropFromObj(context, test) === 'undefined' ? (padContent(startMatches.input) + recurse(include) + padContent(endMatches.input)) : padContent(startMatches.input + include + endMatches.input) // fixed by xxxxxx
        default:
          throw new Error('Unknown if variant ' + variant + '.')
      }
    })
  }

  rv = replace(rv, opts.type.echo, function (match, variable) {
    variable = (variable || '').trim()
    // if we are surrounded by quotes, echo as a string
    var stringMatch = variable.match(/^(['"])(.*)\1$/)
    if (stringMatch) return stringMatch[2]

    return getDeepPropFromObj(context, (variable || '').trim())
  })

  rv = replace(rv, opts.type.exec, function (match, name, value) {
    name = (name || '').trim()
    value = value || ''

    var params = value.split(',')
    var stringRegex = /^['"](.*)['"]$/

    params = params.map(function (param) {
      param = param.trim()
      if (stringRegex.test(param)) { // handle string parameter
        return param.replace(stringRegex, '$1')
      } else { // handle variable parameter
        return getDeepPropFromObj(context, param)
      }
    })

    var fn = getDeepPropFromObj(context, name)
    if (!fn || typeof fn !== 'function') return ''

    return fn.apply(context, params)
  })

  rv = replace(rv, opts.type['include-static'], processIncludeDirective.bind(null, true, context, opts))

  if (!noRestoreEol) {
    rv = restoreEol(rv, opts.srcEol)
  }

  return rv
}
var splitRE = /\r?\n/g

function padContent (content) {
  return Array(content.split(splitRE).length).join('\n')
}

function getEolType (source) {
  var eol
  var foundEolTypeCnt = 0

  if (source.indexOf('\r\n') >= 0) {
    eol = '\r\n'
    foundEolTypeCnt++
  }
  if (/\r[^\n]/.test(source)) {
    eol = '\r'
    foundEolTypeCnt++
  }
  if (/[^\r]\n/.test(source)) {
    eol = '\n'
    foundEolTypeCnt++
  }

  if (eol == null || foundEolTypeCnt > 1) {
    eol = os.EOL
  }

  return eol
}

function normalizeEol (source, indent) {
  // only process any kind of EOL if indentation has to be added, otherwise replace only non \n EOLs
  if (indent) {
    source = source.replace(/(?:\r?\n)|\r/g, '\n' + indent)
  } else {
    source = source.replace(/(?:\r\n)|\r/g, '\n')
  }

  return source
}

function restoreEol (normalizedSource, originalEol) {
  if (originalEol !== '\n') {
    normalizedSource = normalizedSource.replace(/\n/g, originalEol)
  }

  return normalizedSource
}

function replace (rv, rule, processor) {
  var isRegex = typeof rule === 'string' || rule instanceof RegExp
  var isArray = Array.isArray(rule)

  if (isRegex) {
    rule = [new RegExp(rule, 'gmi')]
  } else if (isArray) {
    rule = rule.map(function (subRule) {
      return new RegExp(subRule, 'gmi')
    })
  } else {
    throw new Error('Rule must be a String, a RegExp, or an Array.')
  }

  return rule.reduce(function (rv, rule) {
    return rv.replace(rule, processor)
  }, rv)
}

function replaceRecursive (rv, rule, processor) {
  if (!rule.start || !rule.end) {
    throw new Error('Recursive rule must have start and end.')
  }

  var startRegex = new RegExp(rule.start, 'mi')
  var endRegex = new RegExp(rule.end, 'mi')

  function matchReplacePass (content) {
    var matches = XRegExp.matchRecursive(content, rule.start, rule.end, 'gmi', {
      valueNames: ['between', 'left', 'match', 'right']
    })

    var matchGroup = {
      left: null,
      match: null,
      right: null
    }

    return matches.reduce(function (builder, match) {
      switch (match.name) {
        case 'between':
          builder += match.value
          break
        case 'left':
          matchGroup.left = startRegex.exec(match.value)
          break
        case 'match':
          matchGroup.match = match.value
          break
        case 'right':
          matchGroup.right = endRegex.exec(match.value)
          builder += processor(matchGroup.left, matchGroup.right, matchGroup.match, matchReplacePass)
          break
      }
      return builder
    }, '')
  }

  return matchReplacePass(rv)
}

function processIncludeDirective (isStatic, context, opts, match, linePrefix, file) {
  file = (file || '').trim()
  var indent = linePrefix.replace(/\S/g, ' ')
  var includedContext = copy(context)
  var includedOpts = copy(opts)
  includedContext.src = path.join(opts.srcDir, file)
  includedOpts.srcDir = path.dirname(includedContext.src)

  var fileContents = getFileContents(includedContext.src, opts.fileNotFoundSilentFail, context.src)
  if (fileContents.error) {
    return linePrefix + fileContents.contents
  }

  var includedSource = fileContents.contents
  if (isStatic) {
    includedSource = fileContents.contents
  } else {
    includedSource = preprocessor(fileContents.contents, includedContext, includedOpts, true)
  }

  includedSource = normalizeEol(includedSource, indent)

  if (includedSource) {
    return linePrefix + includedSource
  } else {
    return linePrefix
  }
}

function getTestTemplate (test) {
  /* jshint evil:true */
  test = test || 'true'
  test = test.trim()

  // force single equals replacement
  test = test.replace(/([^=!])=([^=])/g, '$1==$2')
  //fixed by xxxxxx
  test = test.replace(/-/g,'_')
  /* eslint-disable no-new-func */
  return new Function('context', 'with (context||{}){ return ( ' + test + ' ); }')
}

function testPasses (test, context) {
  var testFn = getTestTemplate(test)
  try{
    return testFn(context, getDeepPropFromObj)
  }catch(e){}
  return false
}

function getFileContents (path, failSilent, requesterPath) {
  try {
    fs.statSync(path)
  } catch (e) {
    if (failSilent) {
      return {
        error: true,
        contents: path + ' not found!'
      }
    } else {
      var errMsg = path
      errMsg = requesterPath ? errMsg + ' requested from ' + requesterPath : errMsg
      errMsg += ' not found!'
      throw new Error(errMsg)
    }
  }
  return {
    error: false,
    contents: fs.readFileSync(path).toString()
  }
}

function copy (obj) {
  return Object.keys(obj).reduce(function (copyObj, objKey) {
    copyObj[objKey] = obj[objKey]
    return copyObj
  }, {})
}

function getDeepPropFromObj (obj, propPath) {
  propPath.replace(/\[([^\]+?])\]/g, '.$1')
  propPath = propPath.split('.')

  // fast path, no need to loop if structurePath contains only a single segment
  if (propPath.length === 1) {
    return obj[propPath[0]]
  }

  // loop only as long as possible (no exceptions for null/undefined property access)
  propPath.some(function (pathSegment) {
    obj = obj[pathSegment]
    return (obj == null)
  })

  return obj
}
