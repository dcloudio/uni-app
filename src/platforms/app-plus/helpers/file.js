function getBase64 (path) {
  return new Promise(function (resolve, reject) {
    // H5+ 沙箱外路径在iOS无法使用 plus.io 读取
    function onError () {
      const bitmap = new plus.nativeObj.Bitmap(`bitmap_${Date.now()}_${Math.random()}}`)
      bitmap.load(path, function () {
        resolve(bitmap.toBase64Data())
        bitmap.clear()
      }, function (err) {
        bitmap.clear()
        reject(err)
      })
    }
    plus.io.resolveLocalFileSystemURL(path, function (entry) {
      entry.file(function (file) {
        var fileReader = new plus.io.FileReader()
        fileReader.onload = function (data) {
          resolve(data.target.result)
        }
        fileReader.onerror = onError
        fileReader.readAsDataURL(file)
      }, onError)
    }, onError)
  })
}

function download (url) {
  return new Promise(function (resolve, reject) {
    if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
      resolve(url)
      return
    }
    plus.downloader.createDownload(url, {
      filename: '_doc/uniapp_temp/download/'
    }, function (d, status) {
      if (status === 200) {
        resolve(d.filename)
      } else {
        reject(new Error('network fail'))
      }
    }).start()
  })
}

export function getSameOriginUrl (url) {
  return download(url).then(function (url) {
    // WKWebView
    if (window.webkit && window.webkit.messageHandlers) {
      return getBase64(url)
    }
    return plus.io.convertLocalFileSystemURL(url)
  })
}
