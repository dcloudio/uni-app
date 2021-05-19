import { extend } from '@vue/shared'

function getInt(name: string, defaultValue?: number) {
  return function (value: number | undefined, params: any) {
    if (value) {
      params[name] = Math.round(value)
    } else if (typeof defaultValue !== 'undefined') {
      params[name] = defaultValue
    }
  }
}

const formatWidth = getInt('width')
const formatHeight = getInt('height')

//#region getImageDataOptions
export const API_CANVAS_GET_IMAGE_DATA = 'canvasGetImageData'
export type API_TYPE_CANVAS_GET_IMAGE_DATA = typeof uni.canvasGetImageData
export const CanvasGetImageDataOptions: ApiOptions<API_TYPE_CANVAS_GET_IMAGE_DATA> =
  {
    formatArgs: {
      x: getInt('x'),
      y: getInt('y'),
      width: formatWidth,
      height: formatHeight,
    },
  }
export const CanvasGetImageDataProtocol: ApiProtocol<API_TYPE_CANVAS_GET_IMAGE_DATA> =
  {
    canvasId: {
      type: String,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  }
//#endregion

//#region putImageData
export const API_CANVAS_PUT_IMAGE_DATA = 'canvasPutImageData'
export type API_TYPE_CANVAS_PUT_IMAGE_DATA = typeof uni.canvasPutImageData
export const CanvasPutImageDataOptions = CanvasGetImageDataOptions
export const CanvasPutImageDataProtocol: ApiProtocol<API_TYPE_CANVAS_PUT_IMAGE_DATA> =
  /*#__PURE__*/ extend(
    {
      data: {
        type: Uint8ClampedArray as any,
        required: true,
      },
    },
    CanvasGetImageDataProtocol,
    {
      height: {
        type: Number,
      },
    }
  )
//#endregion

//#region toTempFilePath
const fileTypes = {
  PNG: 'png',
  JPG: 'jpg',
  JPEG: 'jpg',
}
export const API_CANVAS_TO_TEMP_FILE_PATH = 'canvasToTempFilePath'
export type API_TYPE_CANVAS_TO_TEMP_FILE_PATH = typeof uni.canvasToTempFilePath
export const CanvasToTempFilePathOptions: ApiOptions<API_TYPE_CANVAS_TO_TEMP_FILE_PATH> =
  {
    formatArgs: {
      x: getInt('x', 0),
      y: getInt('y', 0),
      width: formatWidth,
      height: formatHeight,
      destWidth: getInt('destWidth'),
      destHeight: getInt('destHeight'),
      fileType(value, params) {
        value = (value || '').toUpperCase()
        let type = fileTypes[value as keyof typeof fileTypes]
        if (!type) {
          type = fileTypes.PNG
        }
        params.fileType = type
      },
      quality(value, params) {
        params.quality = value && value > 0 && value < 1 ? value : 1
      },
    },
  }
export const CanvasToTempFilePathProtocol: ApiProtocol<API_TYPE_CANVAS_TO_TEMP_FILE_PATH> =
  {
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    destWidth: Number,
    destHeight: Number,
    canvasId: {
      type: String,
      required: true,
    },
    fileType: String,
    quality: Number,
  }
//#endregion

export const DrawCanvasProtocol: ApiProtocol<any> = {
  canvasId: {
    type: String,
    required: true,
  },
  actions: {
    type: Array,
    required: true,
  },
  reserve: {
    type: Boolean,
    default: false,
  },
}
