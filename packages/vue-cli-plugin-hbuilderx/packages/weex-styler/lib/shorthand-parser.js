function generateDeclaration (property, value, important, position) {
  return {
    type: 'declaration',
    property,
    value: value + (important ? ' !important' : ''),
    position
  }
}

function clearImportant (value) {
  var newValue = value.replace(/\s*!important/g, '')
  return {
    value: newValue,
    important: value !== newValue
  }
}

function transition (declaration) {
  var CHUNK_REGEXP = /^([a-z-_]\S*)(\s+[\d.]+m?s)?(\s+[a-z-_]\S*)?(\s+[\d.]+m?s)?/
  var { value, important } = clearImportant(declaration.value)
  var values = value.replace(/(\d)\s*,\s*/g, '$1#').split(',')
  var position = declaration.position
  var result = []
  var map = {
    'transition-property': [],
    'transition-duration': [],
    'transition-timing-function': [],
    'transition-delay': []
  }
  if (values.length) {
    for (var i1 = 0; i1 < values.length; i1++) {
      var match = values[i1].trim().match(CHUNK_REGEXP)
      if (!match) {
        return []
      }
      map['transition-property'].push(match[1] || 'all')
      map['transition-duration'].push((match[2] || '0s').trim())
      map['transition-timing-function'].push((match[3] || 'ease').trim().replace(/#/g, ', '))
      map['transition-delay'].push((match[4] || '0s').trim())
    }
    for (var key in map) {
      var value = map[key]
      value = value.find(item => item !== value[0]) ? value.join(', ') : value[0]
      result.push(generateDeclaration(key, value, important, position))
    }
  }
  return result
}

function margin (declaration) {
  var { value, important } = clearImportant(declaration.value)
  var position = declaration.position
  var splitResult = value.split(/\s+/)
  var result = []
  switch (splitResult.length) {
    case 1:
      splitResult.push(splitResult[0], splitResult[0], splitResult[0])
      break
    case 2:
      splitResult.push(splitResult[0], splitResult[1])
      break
    case 3:
      splitResult.push(splitResult[1])
      break
  }
  result.push(
    generateDeclaration('margin-top', splitResult[0], important, position),
    generateDeclaration('margin-right', splitResult[1], important, position),
    generateDeclaration('margin-bottom', splitResult[2], important, position),
    generateDeclaration('margin-left', splitResult[3], important, position)
  )
  return result
}

function border (declaration) {
  var { value, important } = clearImportant(declaration.value)
  var property = declaration.property
  var position = declaration.position
  var splitResult = value.replace(/\s*,\s*/g, ',').split(/\s+/)
  var result = [/^[\d\.]+\S*$/, /^(solid|dashed|dotted)$/, /\S+/].map(item => {
    var index = splitResult.findIndex(str => item.test(str))
    return index < 0 ? null : splitResult.splice(index, 1)[0]
  })
  if (splitResult.length) {
    return declaration
  }
  return [
    generateDeclaration(property + '-width', (result[0] || '0').trim(), important, position),
    generateDeclaration(property + '-style', (result[1] || 'solid').trim(), important, position),
    generateDeclaration(property + '-color', (result[2] || '#000000').trim(), important, position)
  ]
}

function borderProperty (declaration) {
  var { value, important } = clearImportant(declaration.value)
  var position = declaration.position
  var property = declaration.property.split('-')[1]
  var splitResult = value.replace(/\s*,\s*/g, ',').split(/\s+/)
  var result = []
  switch (splitResult.length) {
    case 1:
      return declaration
    case 2:
      splitResult.push(splitResult[0], splitResult[1])
      break
    case 3:
      splitResult.push(splitResult[1])
      break
  }
  result.push(
    generateDeclaration('border-top-' + property, splitResult[0], important, position),
    generateDeclaration('border-right-' + property, splitResult[1], important, position),
    generateDeclaration('border-bottom-' + property, splitResult[2], important, position),
    generateDeclaration('border-left-' + property, splitResult[3], important, position)
  )
  return result
}

function borderRadius (declaration) {
  var { value, important } = clearImportant(declaration.value)
  var position = declaration.position
  var splitResult = value.split(/\s+/)
  var result = []
  if (value.includes('/')) {
    return declaration
  }
  switch (splitResult.length) {
    case 1:
      return declaration
    case 2:
      splitResult.push(splitResult[0], splitResult[1])
      break
    case 3:
      splitResult.push(splitResult[1])
      break
  }
  result.push(
    generateDeclaration('border-top-left-radius', splitResult[0], important, position),
    generateDeclaration('border-top-right-radius', splitResult[1], important, position),
    generateDeclaration('border-bottom-right-radius', splitResult[2], important, position),
    generateDeclaration('border-bottom-left-radius', splitResult[3], important, position)
  )
  return result
}

function flexFlow (declaration) {
  var { value, important } = clearImportant(declaration.value)
  var position = declaration.position
  var splitResult = value.split(/\s+/)
  var result = [/^(column|column-reverse|row|row-reverse)$/, /^(nowrap|wrap|wrap-reverse)$/].map(item => {
    var index = splitResult.findIndex(str => item.test(str))
    return index < 0 ? null : splitResult.splice(index, 1)[0]
  })
  if (splitResult.length) {
    return declaration
  }
  return [
    generateDeclaration('flex-direction', result[0] || 'column', important, position),
    generateDeclaration('flex-wrap', result[1] || 'nowrap', important, position)
  ]
}

function font (declaration) {
  var { value, important } = clearImportant(declaration.value)
  var position = declaration.position
  var splitResult = value.replace(/,\s*/g, ',').replace(/\s*\/\s*/, '/').replace(/['"].+?['"]/g, str => str.replace(/\s+/g, '#')).split(/\s+/)
  var result = []
  var styleValues = ['normal', 'italic', 'oblique']
  result.push(generateDeclaration('font-style', styleValues[Math.max(0, styleValues.indexOf(splitResult[0]))], important, position))
  var weight = splitResult.slice(0, -2).find(str => /normal|bold|lighter|bolder|\d+/.test(str))
  if (weight) {
    result.push(generateDeclaration('font-weight', weight, important, position))
  }
  splitResult = splitResult.slice(-2)
  if (/[\d\.]+\S*(\/[\d\.]+\S*)?/.test(splitResult[0])) {
    var [size, height] = splitResult[0].split('/')
    result.push(
      generateDeclaration('font-size', size, important, position),
      generateDeclaration('line-height', height || 'normal', important, position),
      generateDeclaration('font-family', splitResult[1].replace(/#/g, ' '), important, position)
    )
    return result
  }
  return []
}

function background (declaration) {
  var { value, important } = clearImportant(declaration.value)
  var position = declaration.position
  if (/^#?\S+$/.test(value) || /^rgba?(.+)$/.test(value)) {
    return generateDeclaration('background-color', value, important, position)
  } else if (/^linear-gradient(.+)$/.test(value)) {
    return generateDeclaration('background-image', value, important, position)
  } else {
    return declaration
  }
}

var parserCollection = {
  transition,
  margin,
  border,
  'border-top': border,
  'border-right': border,
  'border-bottom': border,
  'border-left': border,
  'border-style': borderProperty,
  'border-width': borderProperty,
  'border-color': borderProperty,
  'border-radius': borderRadius,
  'flex-flow': flexFlow,
  font,
  background
}

module.exports = function (declarations) {
  return declarations.reduce((result, declaration) => {
    var parser = parserCollection[declaration.property]
    if (parser) {
      return result.concat(parser(declaration))
    } else {
      result.push(declaration)
      return result
    }
  }, [])
}
