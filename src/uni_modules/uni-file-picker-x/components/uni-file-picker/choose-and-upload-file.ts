import {
  UniFilePickerFile,
  UniFilePickerTempFile,
  UniFilePickerChooseResult
} from './utils'

/**
 * 选择文件参数，屏蔽各 choose API 的差异，由组件根据文件类型选择对应的 API
 */
export type UniFilePickerChooseOptions = {
  /** 选择类型 image / video / all / mix，分别对应 chooseImage / chooseVideo / chooseFile / chooseMedia */
  type ?: string,
  /** 最多可选择的文件个数 */
  count ?: number,
  /** 是否压缩所选文件，仅 chooseImage / chooseMedia 生效 */
  sizeType ?: string[],
  /** 选择来源，album 从相册选择，camera 使用相机，默认 ['album'] */
  sourceType ?: string[],
  /** 根据文件扩展名过滤 */
  extension ?: string[],
  /** 相册选择模式 custom / system，默认 system（系统相册） */
  albumMode ?: string,
  /** 摄像头 front / back */
  camera ?: string,
  /** 拍摄视频最长时长，单位秒 */
  maxDuration ?: number,
  /** chooseMedia 的媒体类型 image / video / mix */
  mediaType ?: string[],
  /** 是否压缩所选视频，默认 false */
  compressed ?: boolean,
  /** 屏幕方向，仅 Android chooseMedia / chooseVideo 生效 */
  pageOrientation ?: string
}

/**
 * 根据本地路径获取文件名
 * @param path 本地路径
 * @returns 文件名
 */
function getFileName(path : string) : string {
  const index = path.lastIndexOf('/')
  return index === -1 ? path : path.substring(index + 1)
}

/**
 * 选择图片，App 平台默认打开系统相册
 * @param opts 选择参数
 * @returns 统一的文件选择结果
 */
export function chooseImage(opts : UniFilePickerChooseOptions) : Promise<UniFilePickerChooseResult> {
  return new Promise<UniFilePickerChooseResult>((resolve, reject) => {
    const options : ChooseImageOptions = {
      count: opts.count,
      sizeType: opts.sizeType,
      sourceType: opts.sourceType ?? ['album'],
      extension: opts.extension,
      // #ifdef APP
      albumMode: (opts.albumMode ?? 'system') as ChooseImageAlbumMode,
      pageOrientation: opts.pageOrientation != null && opts.pageOrientation != '' ? (opts.pageOrientation as ChooseImagePageOrientation) : null,
      // #endif
      success: (res : ChooseImageSuccess) => {
        const tempFiles : UniFilePickerTempFile[] = []
        res.tempFiles.forEach((f : ChooseImageTempFile) => {
          tempFiles.push({
            name: f.name != null && f.name != '' ? f.name : getFileName(f.path),
            path: f.path,
            size: f.size,
            fileType: 'image'
          })
        })
        resolve({ tempFilePaths: res.tempFilePaths, tempFiles })
      },
      fail: (err) => {
        reject(err.errMsg)
      }
    }
    uni.chooseImage(options)
  })
}

/**
 * 选择视频，App 平台默认打开系统相册
 * @param opts 选择参数
 * @returns 统一的文件选择结果
 */
export function chooseVideo(opts : UniFilePickerChooseOptions) : Promise<UniFilePickerChooseResult> {
  return new Promise<UniFilePickerChooseResult>((resolve, reject) => {
    const options : ChooseVideoOptions = {
      sourceType: opts.sourceType ?? ['album'],
      compressed: opts.compressed ?? false,
      maxDuration: opts.maxDuration,
      camera: opts.camera != null ? (opts.camera as 'front' | 'back') : null,
      extension: opts.extension,
      // #ifdef APP
      albumMode: (opts.albumMode ?? 'system') as ChooseVideoAlbumMode,
      pageOrientation: opts.pageOrientation != null && opts.pageOrientation != '' ? (opts.pageOrientation as ChooseVideoPageOrientation) : null,
      // #endif
      success: (res : ChooseVideoSuccess) => {
        const path = res.tempFilePath
        const tempFiles : UniFilePickerTempFile[] = [{
          name: getFileName(path),
          path: path,
          size: res.size,
          fileType: 'video',
          duration: res.duration,
          width: res.width,
          height: res.height
        }]
        resolve({ tempFilePaths: [path], tempFiles })
      },
      fail: (err) => {
        reject(err.errMsg)
      }
    }
    uni.chooseVideo(options)
  })
}

/**
 * 选择图片或视频（混合），仅 App 平台支持
 * @param opts 选择参数
 * @returns 统一的文件选择结果
 */
export function chooseMedia(opts : UniFilePickerChooseOptions) : Promise<UniFilePickerChooseResult> {
  return new Promise<UniFilePickerChooseResult>((resolve, reject) => {
    // #ifdef APP
    const options : ChooseMediaOptions = {
      count: opts.count,
      mediaType: opts.mediaType ?? ['image', 'video'],
      sourceType: opts.sourceType ?? ['album'],
      maxDuration: opts.maxDuration,
      camera: opts.camera != null ? (opts.camera as 'front' | 'back') : null,
      sizeType: opts.sizeType,
      pageOrientation: opts.pageOrientation != null && opts.pageOrientation != '' ? (opts.pageOrientation as ChooseMediaPageOrientation) : null,
      success: (res : ChooseMediaSuccess) => {
        const tempFiles : UniFilePickerTempFile[] = []
        res.tempFiles.forEach((f : ChooseMediaTempFile) => {
          tempFiles.push({
            name: getFileName(f.tempFilePath),
            path: f.tempFilePath,
            size: f.byteSize ?? f.size,
            fileType: f.fileType,
            duration: f.duration ?? 0,
            width: f.width ?? 0,
            height: f.height ?? 0,
            thumbTempFilePath: f.thumbTempFilePath ?? ''
          })
        })
        resolve({ tempFilePaths: tempFiles.map<string>((f : UniFilePickerTempFile) : string => f.path), tempFiles })
      },
      fail: (err) => {
        reject(err.errMsg)
      }
    }
    uni.chooseMedia(options)
    // #endif
    // #ifndef APP
    reject('chooseMedia 仅支持 App 平台')
    // #endif
  })
}

/**
 * 选择任意文件
 * @param opts 选择参数
 * @returns 统一的文件选择结果
 */
export function chooseFile(opts : UniFilePickerChooseOptions) : Promise<UniFilePickerChooseResult> {
  return new Promise<UniFilePickerChooseResult>((resolve, reject) => {
    const options : ChooseFileOptions = {
      count: opts.count,
      type: 'all',
      extension: opts.extension,
      sizeType: opts.sizeType,
      success: (res : ChooseFileSuccess) => {
        const tempFiles : UniFilePickerTempFile[] = []
        res.tempFiles.forEach((f : ChooseFileTempFile) => {
          tempFiles.push({
            name: f.name,
            path: f.path,
            size: f.size,
            fileType: f.type ?? 'file'
          })
        })
        const paths = res.tempFilePaths ?? tempFiles.map<string>((f : UniFilePickerTempFile) : string => f.path)
        resolve({ tempFilePaths: paths, tempFiles })
      },
      fail: (err) => {
        reject(err.errMsg)
      }
    }
    // #ifndef APP
    options.sourceType = opts.sourceType ?? ['album']
    // #endif
    uni.chooseFile(options)
  })
}

/**
 * 根据文件类型自动匹配对应的 choose API
 * @param opts 选择参数
 * @returns 统一的文件选择结果
 */
export function chooseAndUploadFile(opts : UniFilePickerChooseOptions) : Promise<UniFilePickerChooseResult> {
  if (opts.type === 'image') {
    return chooseImage(opts)
  }
  if (opts.type === 'video') {
    return chooseVideo(opts)
  }
  if (opts.type === 'mix') {
    return chooseMedia(opts)
  }
  return chooseFile(opts)
}

/**
 * 单个文件上传结果
 */
export type UniFilePickerUploadResult = {
  /** 该文件在文件列表中的索引 */
  index : number,
  /** 上传成功后的云文件 ID，失败时为空字符串 */
  fileID : string,
  /** 错误信息，成功时为空字符串 */
  errMsg : string
}

/**
 * 批量上传文件到云存储，最多同时上传 max 个。
 * 不直接修改传入的文件对象，只返回每个文件的上传结果，由调用方通过响应式数组更新状态。
 * @param files 待上传文件
 * @param max 最大并发数
 * @param onUploadProgress 上传进度回调
 * @returns 每个文件的上传结果
 */
export function uploadCloudFiles(files : UniFilePickerFile[], max : number = 5, onUploadProgress ?: (res : UTSJSONObject) => void) : Promise<UniFilePickerUploadResult[]> {
  const len = files.length
  const results : UniFilePickerUploadResult[] = []
  if (len == 0) {
    return Promise.resolve(results)
  }
  return new Promise<UniFilePickerUploadResult[]>((resolve) => {
    let nextIndex = 0
    let finished = 0
    const launch = () => {
      if (nextIndex >= len) {
        return
      }
      const fileItem = files[nextIndex++]
      uniCloud.uploadFile({
        filePath: fileItem.path,
        cloudPath: fileItem.cloudPath ?? '',
        cloudPathAsRealPath: true,
        onUploadProgress: (res) => {
          if (onUploadProgress != null) {
            onUploadProgress({
              index: fileItem.index ?? 0,
              loaded: res.loaded,
              total: res.total
            } as UTSJSONObject)
          }
        }
      }).then((res) => {
        results.push({
          index: fileItem.index ?? 0,
          fileID: res.fileID,
          errMsg: ''
        } as UniFilePickerUploadResult)
        finished++
        if (finished >= len) {
          resolve(results)
        } else {
          launch()
        }
      }).catch((err) => {
        results.push({
          index: fileItem.index ?? 0,
          fileID: '',
          errMsg: 'request:fail'
        } as UniFilePickerUploadResult)
        finished++
        if (finished >= len) {
          resolve(results)
        } else {
          launch()
        }
      })
    }
    const initial = Math.min(max, len)
    for (let i = 0; i < initial; i++) {
      launch()
    }
  })
}