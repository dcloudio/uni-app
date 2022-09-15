import { TEMP_PATH_BASE } from '../service/api/constants'

export function getFileName(path: string) {
  const array = path.split('/')
  return array[array.length - 1]
}

export function getExtName(path: string) {
  const array = path.split('.')
  return array.length > 1 ? '.' + array[array.length - 1] : ''
}

function getBase64(path: string): Promise<string> {
  return new Promise(function (resolve, reject) {
    // H5+ 沙箱外路径在iOS无法使用 plus.io 读取
    function onError() {
      const bitmap = new plus.nativeObj.Bitmap!(
        `bitmap_${Date.now()}_${Math.random()}}`
      )
      bitmap.load(
        path,
        function () {
          resolve(bitmap.toBase64Data())
          bitmap.clear()
        },
        function (err) {
          bitmap.clear()
          reject(err)
        }
      )
    }
    plus.io.resolveLocalFileSystemURL(
      path,
      function (entry) {
        ;(entry as unknown as PlusIoFileEntry).file(function (file) {
          var fileReader = new plus.io.FileReader!()
          fileReader.onload = function (data) {
            resolve((data.target as unknown as PlusIoFileReader).result!)
          }
          fileReader.onerror = onError
          fileReader.readAsDataURL(file)
        }, onError)
      },
      onError
    )
  })
}

function download(url: string): Promise<string> {
  return new Promise(function (resolve, reject) {
    if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
      resolve(url)
      return
    }
    plus.downloader
      .createDownload(
        url,
        {
          filename: `${TEMP_PATH_BASE}/download/`,
        },
        function (d, status) {
          if (status === 200) {
            resolve(d.filename!)
          } else {
            reject(new Error('network fail'))
          }
        }
      )
      .start()
  })
}

export function getSameOriginUrl(url: string) {
  return download(url).then(function (url) {
    // WKWebView
    interface WindowExt extends Window {
      webkit?: { messageHandlers: any }
    }
    const g = window as WindowExt
    if (g.webkit && g.webkit.messageHandlers) {
      return getBase64(url)
    }
    return plus.io.convertLocalFileSystemURL(url)
  })
}
