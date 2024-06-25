import picker from '@ohos.file.picker'
import fs from '@ohos.file.fs'
import media from '@ohos.multimedia.media'
import image from '@ohos.multimedia.image'

export interface MediaFile {
  fileType: 'video' | 'image'
  tempFilePath: string
  size: number
  width?: number
  height?: number
  duration?: number
  thumbTempFilePath?: string
}

export interface chooseMediaOptions {
  mimeType:
    | picker.PhotoViewMIMETypes.VIDEO_TYPE
    | picker.PhotoViewMIMETypes.IMAGE_TYPE
  count?: number
}

export interface chooseMediaSuccessCallbackResult {
  tempFiles: MediaFile[]
}

export interface VideoInfo {
  size: number
  orientation?:
    | 'up'
    | 'down'
    | 'left'
    | 'right'
    | 'up-mirrored'
    | 'down-mirrored'
    | 'left-mirrored'
    | 'right-mirrored'
  type?: string
  duration?: number
  height?: number
  width?: number
}

export async function _getVideoInfo(uri: string): Promise<VideoInfo> {
  const file = await fs.open(uri, fs.OpenMode.READ_ONLY)
  const avMetadataExtractor = await media.createAVMetadataExtractor()
  let metadata: media.AVMetadata | null = null
  let size: number = 0
  try {
    size = (await fs.stat(file.fd)).size
    avMetadataExtractor.dataSrc = {
      fileSize: size,
      callback: (buffer: ArrayBuffer, length: number, pos?: number) => {
        return fs.readSync(file.fd, buffer, {
          offset: pos,
          length,
        })
      },
    }
    metadata = await avMetadataExtractor.fetchMetadata()
  } catch (error) {
    throw error
  } finally {
    await avMetadataExtractor.release()
    await fs.close(file)
  }

  const videoOrientationArr = [
    'up',
    'right',
    'down',
    'left',
  ] as VideoInfo['orientation'][]
  return {
    size: size,
    duration: metadata.duration ? Number(metadata.duration) / 1000 : undefined,
    width: metadata.videoWidth ? Number(metadata.videoWidth) : undefined,
    height: metadata.videoHeight ? Number(metadata.videoHeight) : undefined,
    type: metadata.mimeType,
    orientation: metadata.videoOrientation
      ? videoOrientationArr[Number(metadata.videoOrientation) / 90]
      : undefined,
  }
}

export interface ImageInfo {
  path: string
  orientation:
    | 'up'
    | 'down'
    | 'left'
    | 'right'
    | 'up-mirrored'
    | 'down-mirrored'
    | 'left-mirrored'
    | 'right-mirrored'
  height: number
  width: number
}

export async function _getImageInfo(uri: string): Promise<ImageInfo> {
  const file = await fs.open(uri, fs.OpenMode.READ_ONLY)
  const imageSource = image.createImageSource(file.fd)
  const imageInfo = await imageSource.getImageInfo()
  const orientation = await imageSource.getImageProperty(
    image.PropertyKey.ORIENTATION
  )
  let orientationNum = 0
  if (typeof orientation === 'string') {
    const matched = orientation.match(/^Unknown value (\d)$/)
    if (matched && matched[1]) {
      orientationNum = Number(matched[1])
    } else if (/^\d$/.test(orientation)) {
      orientationNum = Number(orientation)
    }
  } else if (typeof orientation === 'number') {
    orientationNum = orientation
  }
  let orientationStr: ImageInfo['orientation'] = 'up'
  switch (orientationNum) {
    case 2:
      orientationStr = 'up-mirrored'
      break
    case 3:
      orientationStr = 'down'
      break
    case 4:
      orientationStr = 'down-mirrored'
      break
    case 5:
      orientationStr = 'left-mirrored'
      break
    case 6:
      orientationStr = 'right'
      break
    case 7:
      orientationStr = 'right-mirrored'
      break
    case 8:
      orientationStr = 'left'
      break
    case 0:
    case 1:
    default:
      orientationStr = 'up'
      break
  }
  return {
    path: uri,
    width: imageInfo.size.width,
    height: imageInfo.size.height,
    orientation: orientationStr,
  }
}

/**
 *
 * 注意
 * - 使用系统picker，无需申请权限
 * - 仅支持选图片或视频，不能混选
 *
 * 差异项记录
 * - 鸿蒙的PhotoViewPicker可以选择视频、图片。PhotoViewPicker不支持sizeType参数、maxDuration参数。
 * - PhotoViewPicker进行媒体文件选择时相机按钮无法屏蔽，因此不支持sourceType参数。
 *
 * 关键文档参考：
 * - [用户文件uri介绍](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/user-file-uri-intro-0000001821000049)
 * - [系统能力使用说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/syscap-0000001774120846-V5)
 * - [requestPermissions标签](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/module-configuration-file-0000001820879553-V5#ZH-CN_TOPIC_0000001881258481__requestpermissions%E6%A0%87%E7%AD%BE)
 * - [向用户申请授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/request-user-authorization-0000001774279718-V5)
 * - [应用/服务签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing-0000001587684945#section9786111152213)，ohos.permission.READ_IMAGEVIDEO权限需要自助签名方可使用
 * - [AVMetadataExtractor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-media-0000001821001557#ZH-CN_TOPIC_0000001811157018__avmetadataextractor11)
 */

export async function _chooseMedia(
  options: chooseMediaOptions
): Promise<chooseMediaSuccessCallbackResult> {
  const photoSelectOptions = new picker.PhotoSelectOptions()
  const mimeType = options.mimeType
  photoSelectOptions.MIMEType = mimeType
  photoSelectOptions.maxSelectNumber = options.count || 9
  const photoPicker = new picker.PhotoViewPicker()
  const photoSelectResult = await photoPicker.select(photoSelectOptions)

  const uris = photoSelectResult.photoUris

  if (mimeType !== picker.PhotoViewMIMETypes.VIDEO_TYPE) {
    return {
      tempFiles: uris.map((uri) => {
        const file = fs.openSync(uri, fs.OpenMode.READ_ONLY)
        const stat = fs.statSync(file.fd)
        fs.closeSync(file)
        return {
          fileType: 'image',
          tempFilePath: uri,
          size: stat.size,
        }
      }),
    }
  }
  const tempFiles: MediaFile[] = []
  for (let i = 0; i < uris.length; i++) {
    const uri = uris[i]
    const videoInfo = await _getVideoInfo(uri)
    tempFiles.push({
      fileType: 'video',
      tempFilePath: uri,
      size: videoInfo.size,
      duration: videoInfo.duration,
      width: videoInfo.width,
      height: videoInfo.height,
    })
  }
  return {
    tempFiles,
  }
}
