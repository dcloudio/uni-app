let index = 0

type Format = 'jpg' | 'png' | undefined

export function saveImage(
  base64: string,
  dirname: string,
  callback: (error: Error | null, tempFilePath?: string) => void
) {
  const id = `${Date.now()}${index++}`
  const bitmap = new plus.nativeObj.Bitmap!(`bitmap${id}`)
  bitmap.loadBase64Data(
    base64,
    function () {
      const base64Match = base64.match(/data:image\/(\S+?);/) || [null, 'png']
      let format
      if (base64Match[1]) {
        format = base64Match[1].replace('jpeg', 'jpg') as Format
      }
      const tempFilePath = `${dirname}/${id}.${format}`
      bitmap.save(
        tempFilePath,
        {
          overwrite: true,
          quality: 100,
          format,
        },
        function () {
          clear()
          callback(null, tempFilePath)
        },
        function (error) {
          clear()
          callback(error)
        }
      )
    },
    function (error) {
      clear()
      callback(error)
    }
  )

  function clear() {
    bitmap.clear()
  }
}
