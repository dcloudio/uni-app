const fs = require('fs')
const Path = require('path')

function readDirRecursive (dir) {
  return fs.statSync(dir).isDirectory()
    ? Array.prototype.concat(
      ...fs.readdirSync(dir).map(f => readDirRecursive(Path.join(dir, f)))
    )
    : dir
}

function readDir (dir, recursive) {
  const isDirectory = fs.statSync(dir).isDirectory()
  if (recursive) {
    return readDirRecursive(dir)
  } else if (isDirectory) {
    const files = fs.readdirSync(dir)
    if (files) {
      return files.map(file => Path.resolve(dir, file))
    }
  } else {
    return [ dir ]
  }
}

module.exports = function resolveRequireModules (baseDirname = './', recursive = false, regexp = /^\.\//) {
  let files = readDir(baseDirname, recursive)
  if (!Array.isArray(files)) {
    files = [files]
  }
  files = files.map(file => {
    const fileAbsolutePath = `./${Path.relative(baseDirname, file)}`
    return fileAbsolutePath
  })
  return files.filter(file => regexp.test(file.replace(/\\/g, '/')))
}
