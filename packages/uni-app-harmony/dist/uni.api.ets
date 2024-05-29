import { IUniError, UTSObject, UTSJSONObject, string } from './uts'
import { defineAsyncApi } from './uni.api'
import picker from '@ohos.file.picker';
import image from '@ohos.multimedia.image';
import media from '@ohos.multimedia.media';
import fs, { ReadOptions } from '@ohos.file.fs';
import { isFunction } from "./uni-app-harmony-framework-dev.js";
import picker1 from '@ohos.file.picker';
import picker2 from '@ohos.file.picker';
export type MediaOrientation = 'up' | 'down' | 'left' | 'right' | 'up-mirrored' | 'down-mirrored' | 'left-mirrored' | 'right-mirrored';
export type MediaErrorCode = 1101001 | 1101002 | 1101003 | 1101004 | 1101005 | 1101006 | 1101007 | 1101008 | 1101009 | 1101010;
export interface IMediaError extends IUniError {
    errCode: MediaErrorCode;
}
export class ChooseImageSuccess extends UTSObject {
    errSubject!: string;
    errMsg!: string;
    tempFilePaths!: Array<string>;
    tempFiles!: Object;
}
export type ChooseImageFail = IMediaError;
export type ChooseImageSuccessCallback = (callback: ChooseImageSuccess) => void;
export type ChooseImageFailCallback = (callback: ChooseImageFail) => void;
export type ChooseImageCompleteCallback = (callback: Object) => void;
export class ChooseImageCropOptions extends UTSObject {
    width!: number;
    height!: number;
    quality: (number) | null = null;
    resize: (boolean) | null = null;
}
export class ChooseImageOptions extends UTSObject {
    count: (number) | null = null;
    sizeType: (string[]) | null = null;
    sourceType: (string[]) | null = null;
    extension: (string[]) | null = null;
    crop: (ChooseImageCropOptions) | null = null;
    success: (ChooseImageSuccessCallback) | null = null;
    fail: (ChooseImageFailCallback) | null = null;
    complete: (ChooseImageCompleteCallback) | null = null;
}
export type ChooseImage = (options: ChooseImageOptions) => void;
export class PreviewImageSuccess extends UTSObject {
    errSubject!: string;
    errMsg!: string;
}
export class LongPressActionsSuccessData extends UTSObject {
    tapIndex!: number;
    index!: number;
}
export class LongPressActionsOptions extends UTSObject {
    itemList!: string[];
    itemColor: string | null = null;
    success: ((result: LongPressActionsSuccessData) => void) | null = null;
    fail: ((result: Object) => void) | null = null;
    complete: ((result: Object) => void) | null = null;
}
export type PreviewImageFail = IMediaError;
export type PreviewImageSuccessCallback = (callback: PreviewImageSuccess) => void;
export type PreviewImageFailCallback = (callback: PreviewImageFail) => void;
export type PreviewImageCompleteCallback = ChooseImageCompleteCallback;
export class PreviewImageOptions extends UTSObject {
    current: Object | null = null;
    urls!: Array<string.ImageURIString>;
    indicator: string | null = null;
    loop: boolean | null = null;
    longPressActions: LongPressActionsOptions | null = null;
    success: (PreviewImageSuccessCallback) | null = null;
    fail: (PreviewImageFailCallback) | null = null;
    complete: (PreviewImageCompleteCallback) | null = null;
}
export type PreviewImage = (options: PreviewImageOptions) => void;
export type ClosePreviewImage = (options: ClosePreviewImageOptions) => void;
export class ClosePreviewImageSuccess extends UTSObject {
    errMsg!: string;
}
export type ClosePreviewImageFail = IMediaError;
export type ClosePreviewImageSuccessCallback = (callback: ClosePreviewImageSuccess) => void;
export type ClosePreviewImageFailCallback = (callback: ClosePreviewImageFail) => void;
export type ClosePreviewImageCompleteCallback = ChooseImageCompleteCallback;
export class ClosePreviewImageOptions extends UTSObject {
    success: (ClosePreviewImageSuccessCallback) | null = null;
    fail: (ClosePreviewImageFailCallback) | null = null;
    complete: (ClosePreviewImageCompleteCallback) | null = null;
}
export type GetImageInfo = (options: GetImageInfoOptions) => void;
export class GetImageInfoSuccess extends UTSObject {
    width!: number;
    height!: number;
    path!: string;
    orientation: string | null = null;
    type: string | null = null;
}
export type GetImageInfoFail = IMediaError;
export type GetImageInfoSuccessCallback = (callback: GetImageInfoSuccess) => void;
export type GetImageInfoFailCallback = (callback: GetImageInfoFail) => void;
export type GetImageInfoCompleteCallback = ChooseImageCompleteCallback;
export class GetImageInfoOptions extends UTSObject {
    src!: string.ImageURIString;
    success: (GetImageInfoSuccessCallback) | null = null;
    fail: (GetImageInfoFailCallback) | null = null;
    complete: (GetImageInfoCompleteCallback) | null = null;
}
export type SaveImageToPhotosAlbum = (options: SaveImageToPhotosAlbumOptions) => void;
export class SaveImageToPhotosAlbumSuccess extends UTSObject {
    path!: string;
}
export type SaveImageToPhotosAlbumFail = IMediaError;
export type SaveImageToPhotosAlbumSuccessCallback = (callback: SaveImageToPhotosAlbumSuccess) => void;
export type SaveImageToPhotosAlbumFailCallback = (callback: SaveImageToPhotosAlbumFail) => void;
export type SaveImageToPhotosAlbumCompleteCallback = ChooseImageCompleteCallback;
export class SaveImageToPhotosAlbumOptions extends UTSObject {
    filePath!: string.ImageURIString;
    success: (SaveImageToPhotosAlbumSuccessCallback) | null = null;
    fail: (SaveImageToPhotosAlbumFailCallback) | null = null;
    complete: (SaveImageToPhotosAlbumCompleteCallback) | null = null;
}
export type CompressImage = (options: CompressImageOptions) => void;
export class CompressImageSuccess extends UTSObject {
    tempFilePath!: string;
}
export type CompressImageFail = IMediaError;
export type CompressImageSuccessCallback = (callback: CompressImageSuccess) => void;
export type CompressImageFailCallback = (callback: CompressImageFail) => void;
export type CompressImageCompleteCallback = ChooseImageCompleteCallback;
export class CompressImageOptions extends UTSObject {
    src!: string.ImageURIString;
    quality: number | null = null;
    rotate: number | null = null;
    width: string | null = null;
    height: string | null = null;
    compressedHeight: number | null = null;
    compressedWidth: number | null = null;
    success: (CompressImageSuccessCallback) | null = null;
    fail: (CompressImageFailCallback) | null = null;
    complete: (CompressImageCompleteCallback) | null = null;
}
export class ChooseVideoSuccess extends UTSObject {
    tempFilePath!: string;
    duration!: number;
    size!: number;
    height!: number;
    width!: number;
}
export type ChooseVideoFail = IMediaError;
export type ChooseVideoSuccessCallback = (callback: ChooseVideoSuccess) => void;
export type ChooseVideoFailCallback = (callback: ChooseVideoFail) => void;
export type ChooseVideoCompleteCallback = ChooseImageCompleteCallback;
export class ChooseVideoOptions extends UTSObject {
    sourceType: (string[]) | null = null;
    compressed: boolean | null = true;
    maxDuration: number | null = null;
    camera: string | null = null;
    extension: (string[]) | null = null;
    success: (ChooseVideoSuccessCallback) | null = null;
    fail: (ChooseVideoFailCallback) | null = null;
    complete: (ChooseVideoCompleteCallback) | null = null;
}
export type ChooseVideo = (options: ChooseVideoOptions) => void;
export class GetVideoInfoSuccess extends UTSObject {
    orientation: string | null = null;
    type: string | null = null;
    duration!: number;
    size!: number;
    height!: number;
    width!: number;
    fps: number | null = null;
    bitrate: number | null = null;
}
export type GetVideoInfoFail = IMediaError;
export type GetVideoInfoSuccessCallback = (callback: GetVideoInfoSuccess) => void;
export type GetVideoInfoFailCallback = (callback: GetVideoInfoFail) => void;
export type GetVideoInfoCompleteCallback = ChooseImageCompleteCallback;
export class GetVideoInfoOptions extends UTSObject {
    src!: string.VideoURIString;
    success: (GetVideoInfoSuccessCallback) | null = null;
    fail: (GetVideoInfoFailCallback) | null = null;
    complete: (GetVideoInfoCompleteCallback) | null = null;
}
export type GetVideoInfo = (options: GetVideoInfoOptions) => void;
export class SaveVideoToPhotosAlbumSuccess extends UTSObject {
}
export type SaveVideoToPhotosAlbumFail = IMediaError;
export type SaveVideoToPhotosAlbumSuccessCallback = (callback: SaveVideoToPhotosAlbumSuccess) => void;
export type SaveVideoToPhotosAlbumFailCallback = (callback: SaveVideoToPhotosAlbumFail) => void;
export type SaveVideoToPhotosAlbumCompleteCallback = ChooseImageCompleteCallback;
export class SaveVideoToPhotosAlbumOptions extends UTSObject {
    filePath!: string.VideoURIString;
    success: (SaveVideoToPhotosAlbumSuccessCallback) | null = null;
    fail: (SaveVideoToPhotosAlbumFailCallback) | null = null;
    complete: (SaveVideoToPhotosAlbumCompleteCallback) | null = null;
}
export type SaveVideoToPhotosAlbum = (options: SaveVideoToPhotosAlbumOptions) => void;
export class CompressVideoSuccess extends UTSObject {
    tempFilePath!: string;
    size!: number;
}
export type CompressVideoFail = IMediaError;
export type CompressVideoSuccessCallback = (callback: CompressVideoSuccess) => void;
export type CompressVideoFailCallback = (callback: CompressVideoFail) => void;
export type CompressVideoCompleteCallback = ChooseImageCompleteCallback;
export class CompressVideoOptions extends UTSObject {
    src!: string.VideoURIString;
    quality: string | null = null;
    bitrate: number | null = null;
    fps: number | null = null;
    resolution: number | null = null;
    success: (CompressVideoSuccessCallback) | null = null;
    fail: (CompressVideoFailCallback) | null = null;
    complete: (CompressVideoCompleteCallback) | null = null;
}
export type CompressVideo = (options: CompressVideoOptions) => void;
export function initUniExtApi(APP_ID: string) {
    const API_CHOOSE_IMAGE = 'chooseImage';
    const API_CHOOSE_VIDEO = 'chooseVideo';
    const API_GET_IMAGE_INFO = 'getImageInfo';
    const API_GET_VIDEO_INFO = 'getVideoInfo';
    interface MediaFile {
        fileType: 'video' | 'image';
        tempFilePath: string;
        size: number;
        width?: number;
        height?: number;
        duration?: number;
        thumbTempFilePath?: string;
    }
    interface ChooseMediaOptions {
        mimeType: picker.PhotoViewMIMETypes.VIDEO_TYPE | picker.PhotoViewMIMETypes.IMAGE_TYPE;
        count?: number;
    }
    interface ChooseMediaSuccessCallbackResult {
        tempFiles: MediaFile[];
    }
    interface VideoInfo {
        size: number;
        orientation?: MediaOrientation;
        type?: string;
        duration?: number;
        height?: number;
        width?: number;
    }
    const _getVideoInfo = async (uri: string): Promise<VideoInfo> =>{
        const file = await fs.open(uri, fs.OpenMode.READ_ONLY);
        const avMetadataExtractor = await media.createAVMetadataExtractor();
        let metadata: media.AVMetadata | null = null;
        let size: number = 0;
        try {
            size = (await fs.stat(file.fd)).size;
            avMetadataExtractor.dataSrc = {
                fileSize: size,
                callback: (buffer: ArrayBuffer, length: number, pos: number | null = null)=>{
                    return fs.readSync(file.fd, buffer, {
                        offset: pos,
                        length
                    } as ReadOptions);
                }
            };
            metadata = await avMetadataExtractor.fetchMetadata();
        } catch (error) {
            throw (error as Error);
        } finally{
            await avMetadataExtractor.release();
            await fs.close(file);
        }
        const videoOrientationArr = [
            'up',
            'right',
            'down',
            'left'
        ] as MediaOrientation[];
        return {
            size: size,
            duration: metadata.duration ? Number(metadata.duration) / 1000 : undefined,
            width: metadata.videoWidth ? Number(metadata.videoWidth) : undefined,
            height: metadata.videoHeight ? Number(metadata.videoHeight) : undefined,
            type: metadata.mimeType,
            orientation: metadata.videoOrientation ? videoOrientationArr[Number(metadata.videoOrientation) / 90] : undefined
        };
    };
    interface ImageInfo {
        path: string;
        orientation: MediaOrientation;
        height: number;
        width: number;
    }
    const _getImageInfo = async (uri: string): Promise<ImageInfo> =>{
        const file = await fs.open(uri, fs.OpenMode.READ_ONLY);
        const imageSource = image.createImageSource(file.fd);
        const imageInfo = await imageSource.getImageInfo();
        const orientation = await imageSource.getImageProperty(image.PropertyKey.ORIENTATION);
        let orientationNum = 0;
        if (typeof orientation === 'string') {
            const matched = orientation.match(/^Unknown value (\d)$/);
            if (matched && matched[1]) {
                orientationNum = Number(matched[1]);
            } else if (/^\d$/.test(orientation)) {
                orientationNum = Number(orientation);
            }
        } else if (typeof orientation === 'number') {
            orientationNum = orientation;
        }
        let orientationStr: MediaOrientation = 'up';
        switch(orientationNum){
            case 2:
                orientationStr = 'up-mirrored';
                break;
            case 3:
                orientationStr = 'down';
                break;
            case 4:
                orientationStr = 'down-mirrored';
                break;
            case 5:
                orientationStr = 'left-mirrored';
                break;
            case 6:
                orientationStr = 'right';
                break;
            case 7:
                orientationStr = 'right-mirrored';
                break;
            case 8:
                orientationStr = 'left';
                break;
            case 0:
            case 1:
            default:
                orientationStr = 'up';
                break;
        }
        return {
            path: uri,
            width: imageInfo.size.width,
            height: imageInfo.size.height,
            orientation: orientationStr
        };
    };
    const _chooseMedia = async (options: ChooseMediaOptions): Promise<ChooseMediaSuccessCallbackResult> =>{
        const photoSelectOptions = new picker.PhotoSelectOptions();
        const mimeType = options.mimeType;
        photoSelectOptions.MIMEType = mimeType;
        photoSelectOptions.maxSelectNumber = options.count || 9;
        const photoPicker = new picker.PhotoViewPicker();
        const photoSelectResult = await photoPicker.select(photoSelectOptions);
        const uris = photoSelectResult.photoUris;
        if (mimeType !== picker.PhotoViewMIMETypes.VIDEO_TYPE) {
            return {
                tempFiles: uris.map((uri)=>{
                    const file = fs.openSync(uri, fs.OpenMode.READ_ONLY);
                    const stat = fs.statSync(file.fd);
                    fs.closeSync(file);
                    return {
                        fileType: 'image',
                        tempFilePath: uri,
                        size: stat.size
                    } as MediaFile;
                })
            };
        }
        const tempFiles: MediaFile[] = [];
        for(let i = 0; i < uris.length; i++){
            const uri = uris[i];
            const videoInfo = await _getVideoInfo(uri);
            tempFiles.push({
                fileType: 'video',
                tempFilePath: uri,
                size: videoInfo.size,
                duration: videoInfo.duration,
                width: videoInfo.width,
                height: videoInfo.height
            } as MediaFile);
        }
        return {
            tempFiles
        };
    };
    const chooseImage: ChooseImage = defineAsyncApi<ChooseImageOptions, ChooseImageSuccess>(API_CHOOSE_IMAGE, (params, ref)=>{
        let resolve = ref.resolve, reject = ref.reject;
        _chooseMedia({
            mimeType: picker1.PhotoViewMIMETypes.IMAGE_TYPE,
            count: params.count
        } as ChooseMediaOptions).then((res)=>{
            console.log(isFunction('a'));
            return {
                errSubject: 'chooseImage',
                errMsg: 'chooseImage:ok',
                tempFilePaths: res.tempFiles.map((file)=>file.tempFilePath),
                tempFiles: res.tempFiles.map((file)=>{
                    return {
                        path: file.tempFilePath,
                        size: file.size
                    } as UTSJSONObject;
                })
            } as ChooseImageSuccess;
        }).then(resolve, reject);
    });
    const chooseVideo: ChooseVideo = defineAsyncApi<ChooseVideoOptions, ChooseVideoSuccess>(API_CHOOSE_VIDEO, (_, ref)=>{
        let resolve = ref.resolve, reject = ref.reject;
        _chooseMedia({
            mimeType: picker2.PhotoViewMIMETypes.VIDEO_TYPE
        } as ChooseMediaOptions).then((res)=>{
            const file = res.tempFiles[0];
            return {
                tempFilePath: file.tempFilePath,
                duration: file.duration,
                size: file.size,
                width: file.width,
                height: file.height
            } as ChooseVideoSuccess;
        }).then(resolve, reject);
    });
    const getImageInfo: GetImageInfo = defineAsyncApi<GetImageInfoOptions, GetImageInfoSuccess>(API_GET_IMAGE_INFO, (ref: GetImageInfoOptions, ref1)=>{
        let src = ref.src, resolve = ref1.resolve, reject = ref1.reject;
        _getImageInfo(src).then(resolve, reject);
    });
    const getVideoInfo: GetVideoInfo = defineAsyncApi<GetVideoInfoOptions, GetVideoInfoSuccess>(API_GET_VIDEO_INFO, (ref: GetVideoInfoOptions, ref1)=>{
        let src = ref.src, resolve = ref1.resolve, reject = ref1.reject;
        _getVideoInfo(src).then((res)=>{
            return {
                size: res.size,
                duration: res.duration!,
                width: res.width!,
                height: res.height!,
                type: res.type!,
                orientation: res.orientation!
            } as GetVideoInfoSuccess;
        }).then(resolve, reject);
    });
    interface UniExtApi {
        chooseImage: ChooseImage;
        getImageInfo: GetImageInfo;
        chooseVideo: ChooseVideo;
        getVideoInfo: GetVideoInfo;
    }
    return {
        chooseImage,
        getImageInfo,
        chooseVideo,
        getVideoInfo
    } as UniExtApi;
}
