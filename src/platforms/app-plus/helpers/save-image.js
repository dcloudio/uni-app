let index = 0

export default function saveImage (base64, dirname, callback) {
  const id = `${Date.now()}${index++}`
  const bitmap = new plus.nativeObj.Bitmap(`bitmap${id}`)
  bitmap.loadBase64Data(base64, function () {
    const format = (base64.match(/data:image\/(\S+?);/) || [null, 'png'])[1].replace('jpeg', 'jpg')
    const tempFilePath = `${dirname}/${id}.${format}`
    bitmap.save(tempFilePath, {
      overwrite: true,
      quality: 100,
      format
    }, function () {
      clear()
      callback(null, tempFilePath)
    }, function (error) {
      clear()
      callback(error)
    })
  }, function (error) {
    clear()
    callback(error)
  })

  function clear () {
    bitmap.clear()
  }
}
