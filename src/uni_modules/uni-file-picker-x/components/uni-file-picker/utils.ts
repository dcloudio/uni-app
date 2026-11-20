/**
 * 统一的文件项数据结构。选择、回显、上传过程中均使用该结构。
 */
export type UniFilePickerFile = {
  /** 文件名，包含后缀 */
  name : string,
  /** 文件本地路径 */
  path : string,
  /** 文件大小，单位字节 */
  size : number,
  /** 文件类型 image / video / audio / file */
  fileType : string,
  /** 文件可访问路径 */
  url : string,
  /** 文件 uuid，用于匹配上传进度与列表项 */
  uuid ?: number | null,
  /** 文件后缀，小写，不含点 */
  extname ?: string,
  /** 上传到云存储的路径 */
  cloudPath ?: string,
  /** 视频缩略图临时路径 */
  thumbTempFilePath ?: string,
  /** 图片信息，仅图片类型有值 */
  image ?: UTSJSONObject | null,
  /** 视频信息，仅视频类型有值 */
  video ?: UTSJSONObject | null,
  /** 上传状态 ready / success / error */
  status ?: string,
  /** 上传进度 0 - 100 */
  progress ?: number,
  /** 错误信息 */
  errMsg ?: string,
  /** 云文件 ID */
  fileID ?: string,
  /** 上传服务商 */
  provider ?: string,
  /** 上传进度条索引 */
  index ?: number
}

/**
 * 选择文件返回的临时文件结构，屏蔽各 choose API 的差异
 */
export type UniFilePickerTempFile = {
  /** 文件名，包含后缀 */
  name : string,
  /** 文件本地路径 */
  path : string,
  /** 文件大小，单位字节 */
  size : number,
  /** 文件类型 image / video / audio / file */
  fileType : string,
  /** 视频时长，单位秒 */
  duration ?: number,
  /** 视频/图片宽度 */
  width ?: number,
  /** 视频/图片高度 */
  height ?: number,
  /** 视频缩略图临时路径 */
  thumbTempFilePath ?: string
}

/**
 * 选择文件统一返回结构
 */
export type UniFilePickerChooseResult = {
  /** 文件本地路径列表 */
  tempFilePaths : string[],
  /** 文件列表 */
  tempFiles : UniFilePickerTempFile[]
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
 * 解析文件名与后缀
 * @param name 文件名
 * @returns 名称与后缀对象
 */
export const get_file_ext = (name : string) : UTSJSONObject => {
  const last_len = name.lastIndexOf('.')
  const len = name.length
  return {
    name: name.substring(0, last_len),
    ext: name.substring(last_len + 1, len)
  } as UTSJSONObject
}

/**
 * 将 fileExtname 统一为字符串数组
 * @param fileExtname 后缀，支持数组或逗号分隔字符串
 * @returns 后缀数组
 */
export const get_extname = (fileExtname : string[] | string) : string[] => {
  if (Array.isArray(fileExtname)) {
    return fileExtname as string[]
  }
  const extname = (fileExtname as string).replace(/(\[|\])/g, '')
  return extname.split(',')
}

/**
 * 根据后缀过滤文件
 * @param res 选择返回结果
 * @param _extname 允许的后缀，为空时不过滤
 * @returns 过滤后的路径与文件
 */
export const filter_files_by_extname = (res : UniFilePickerChooseResult, _extname : string[]) : UniFilePickerChooseResult => {
  if (_extname == null || _extname.length === 0) {
    return res
  }
  const filePaths : string[] = []
  const files : UniFilePickerTempFile[] = []
  res.tempFiles.forEach((v : UniFilePickerTempFile) => {
    const fileFullName = get_file_ext(v.name)
    const extname = ((fileFullName['ext'] as string) ?? '').toLowerCase()
    if (_extname.indexOf(extname) !== -1) {
      files.push(v)
      filePaths.push(v.path)
    }
  })
  return { tempFilePaths: filePaths, tempFiles: files }
}

/**
 * 获取图片信息
 * @param filepath 图片路径
 * @returns 图片信息
 */
export function get_file_info(filepath : string) : Promise<UTSJSONObject> {
  return new Promise<UTSJSONObject>((resolve, reject) => {
    uni.getImageInfo({
      src: filepath,
      success(res) {
        resolve({
          width: res.width,
          height: res.height,
          location: res.path
        } as UTSJSONObject)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

/**
 * 将选择到的临时文件封装为统一的文件数据结构
 * @param file 临时文件
 * @param type 文件类型 image / video / other
 * @returns 统一的文件数据
 */
export const get_file_data = async (file : UniFilePickerTempFile, type : string = 'image') : Promise<UniFilePickerFile> => {
  const fileFullName = get_file_ext(file.name)
  const extname = ((fileFullName['ext'] as string) ?? '').toLowerCase()
  const filedata : UniFilePickerFile = {
    name: file.name,
    path: file.path,
    url: file.path,
    size: file.size,
    fileType: file.fileType,
    extname: extname,
    thumbTempFilePath: file.thumbTempFilePath ?? '',
    cloudPath: '',
    status: 'ready',
    progress: 0,
    errMsg: '',
    image: null,
    video: null
  }
  if (type === 'image') {
    filedata.image = await get_file_info(file.path)
  }
  return filedata
}