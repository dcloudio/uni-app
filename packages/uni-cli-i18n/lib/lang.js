function format (lang) {
  const array = lang.split(/[.,]/)[0].split(/[_-]/)
  array[0] = array[0].toLowerCase()
  if (array[0] === 'zh') {
    array[1] = (array[1] || 'CN').toUpperCase()
  }
  array.length = Math.min(array.length, 2)
  return array.join('_')
}

module.exports = {
  format
}
