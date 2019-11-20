function makeMap (str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

let partialIdentifier = false
module.exports = {
  isUnaryTag: makeMap(
    'image,area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
    'link,meta,param,source,track,wbr'
  ),
  getPartialIdentifier () {
    if (!partialIdentifier) {
      partialIdentifier = {
        'UNI_COMPILER_VERSION': require('../package.json').version
      }
      Object.keys(process.env).forEach(name => {
        if (name.indexOf('UNI_') === 0) {
          partialIdentifier[name] = process.env[name]
        }
      })
    }
    return partialIdentifier
  }
}
