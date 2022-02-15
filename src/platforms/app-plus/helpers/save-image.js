let index = 0

export default function saveImage (dataURL, dirname, callback) {
  const id = `${Date.now()}${index++}`
  const array = dataURL.split(',')
  const scheme = array[0]
  const base64 = array[1]
  const format = (scheme.match(/data:image\/(\S+?);/) || [null, 'png'])[1].replace('jpeg', 'jpg')
  const fileName = `${id}.${format}`
  const tempFilePath = `${dirname}/${fileName}`

  const i = dirname.indexOf('/')
  const basePath = dirname.substring(0, i)
  const dirPath = dirname.substring(i + 1)
  plus.io.resolveLocalFileSystemURL(basePath, function (entry) {
    entry.getDirectory(dirPath, {
      create: true,
      exclusive: false
    }, function (entry) {
      entry.getFile(fileName, {
        create: true,
        exclusive: false
      }, function (entry) {
        entry.createWriter(function (writer) {
          writer.onwrite = function () {
            callback(null, tempFilePath)
          }
          writer.onerror = callback
          writer.seek(0)
          writer.writeAsBinary(base64)
        }, callback)
      }, callback)
    }, callback)
  }, callback)
}
