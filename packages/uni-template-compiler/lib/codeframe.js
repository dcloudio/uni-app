var range = 2

function generateCodeFrame (
  source,
  start,
  end
) {
  source = source.replace(/\r\n/g, '\n') // 替换\r\n 为 \n
  if (start === void 0) start = 0
  if (end === void 0) end = source.length

  var lines = source.split(/\n/) // 替换\r?\n 为 \n，不然 length 对不上，导致死循环
  var count = 0
  var res = []
  for (var i = 0; i < lines.length; i++) {
    count += lines[i].length + 1
    if (count >= start) {
      for (var j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) {
          continue
        }
        res.push(('' + (j + 1) + (repeat$1(' ', 3 - String(j + 1).length)) + '|  ' + (lines[j])))
        var lineLength = lines[j].length
        if (j === i) {
          // push underline
          var pad = start - (count - lineLength) + 1
          var length = end > count ? lineLength - pad : end - start
          res.push('   |  ' + repeat$1(' ', pad) + repeat$1('^', length))
        } else if (j > i) {
          if (end > count) {
            var length$1 = Math.min(end - count, lineLength)
            res.push('   |  ' + repeat$1('^', length$1))
          }
          count += lineLength + 1
        }
      }
      break
    }
  }
  return res.join('\n')
}

function repeat$1 (str, n) {
  var result = ''
  if (n > 0) {
        while (true) { // eslint-disable-line
      if (n & 1) {
        result += str
      }
      n >>>= 1
      if (n <= 0) {
        break
      }
      str += str
    }
  }
  return result
}

module.exports = generateCodeFrame
