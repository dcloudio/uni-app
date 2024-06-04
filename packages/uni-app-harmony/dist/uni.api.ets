import { IUniError, UTSObject, UniError, UTSJSONObject, string } from './uts'
import { defineAsyncApi, defineSyncApi, defineTaskApi, defineOnApi, defineOffApi, ApiExcutor, ProtocolOptions, ApiOptions, ErrRes } from './uni-api-shared'

import fs from '@ohos.file.fs';
import picker from '@ohos.file.picker';
import image from '@ohos.multimedia.image';
import media from '@ohos.multimedia.media';
import http from '@ohos.net.http';
import { ReadOptions } from '@ohos.file.fs';
import fs1 from '@ohos.file.fs';
import { getEnv, Emitter as Emitter2 } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
import { getRealPath as getRealPath1 } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
import { getRealPath as getRealPath2, Emitter as Emitter1 } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
import { getRealPath } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
import http1 from '@ohos.net.http';
import http2 from '@ohos.net.http';
import { isPlainObject, Emitter } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
import picker1 from '@ohos.file.picker';
import picker2 from '@ohos.file.picker';
export function initUniExtApi(APP_ID: string) {
    type MediaOrientation = 'up' | 'down' | 'left' | 'right' | 'up-mirrored' | 'down-mirrored' | 'left-mirrored' | 'right-mirrored';
    type MediaErrorCode = 1101001 | 1101002 | 1101003 | 1101004 | 1101005 | 1101006 | 1101007 | 1101008 | 1101009 | 1101010;
    interface IMediaError extends IUniError {
        errCode: MediaErrorCode;
    }
    class ChooseImageSuccess extends UTSObject {
        errSubject!: string;
        errMsg!: string;
        tempFilePaths!: Array<string>;
        tempFiles!: Object;
    }
    type ChooseImageFail = IMediaError;
    type ChooseImageSuccessCallback = (callback: ChooseImageSuccess) => void;
    type ChooseImageFailCallback = (callback: ChooseImageFail) => void;
    type ChooseImageCompleteCallback = (callback: Object) => void;
    class ChooseImageCropOptions extends UTSObject {
        width!: number;
        height!: number;
        quality: (number) | null = null;
        resize: (boolean) | null = null;
    }
    class ChooseImageOptions extends UTSObject {
        count: (number) | null = null;
        sizeType: (string[]) | null = null;
        sourceType: (string[]) | null = null;
        extension: (string[]) | null = null;
        crop: (ChooseImageCropOptions) | null = null;
        success: (ChooseImageSuccessCallback) | null = null;
        fail: (ChooseImageFailCallback) | null = null;
        complete: (ChooseImageCompleteCallback) | null = null;
    }
    type ChooseImage = (options: ChooseImageOptions) => void;
    type GetImageInfo = (options: GetImageInfoOptions) => void;
    class GetImageInfoSuccess extends UTSObject {
        width!: number;
        height!: number;
        path!: string;
        orientation: MediaOrientation | null = null;
        type: string | null = null;
    }
    type GetImageInfoFail = IMediaError;
    type GetImageInfoSuccessCallback = (callback: GetImageInfoSuccess) => void;
    type GetImageInfoFailCallback = (callback: GetImageInfoFail) => void;
    type GetImageInfoCompleteCallback = ChooseImageCompleteCallback;
    class GetImageInfoOptions extends UTSObject {
        src!: string.ImageURIString;
        success: (GetImageInfoSuccessCallback) | null = null;
        fail: (GetImageInfoFailCallback) | null = null;
        complete: (GetImageInfoCompleteCallback) | null = null;
    }
    class ChooseVideoSuccess extends UTSObject {
        tempFilePath!: string;
        duration!: number;
        size!: number;
        height!: number;
        width!: number;
    }
    type ChooseVideoFail = IMediaError;
    type ChooseVideoSuccessCallback = (callback: ChooseVideoSuccess) => void;
    type ChooseVideoFailCallback = (callback: ChooseVideoFail) => void;
    type ChooseVideoCompleteCallback = ChooseImageCompleteCallback;
    class ChooseVideoOptions extends UTSObject {
        sourceType: (string[]) | null = null;
        compressed: boolean | null = true;
        maxDuration: number | null = null;
        camera: string | null = null;
        extension: (string[]) | null = null;
        success: (ChooseVideoSuccessCallback) | null = null;
        fail: (ChooseVideoFailCallback) | null = null;
        complete: (ChooseVideoCompleteCallback) | null = null;
    }
    type ChooseVideo = (options: ChooseVideoOptions) => void;
    class GetVideoInfoSuccess extends UTSObject {
        orientation: MediaOrientation | null = null;
        type: string | null = null;
        duration!: number;
        size!: number;
        height!: number;
        width!: number;
        fps: number | null = null;
        bitrate: number | null = null;
    }
    type GetVideoInfoFail = IMediaError;
    type GetVideoInfoSuccessCallback = (callback: GetVideoInfoSuccess) => void;
    type GetVideoInfoFailCallback = (callback: GetVideoInfoFail) => void;
    type GetVideoInfoCompleteCallback = ChooseImageCompleteCallback;
    class GetVideoInfoOptions extends UTSObject {
        src!: string.VideoURIString;
        success: (GetVideoInfoSuccessCallback) | null = null;
        fail: (GetVideoInfoFailCallback) | null = null;
        complete: (GetVideoInfoCompleteCallback) | null = null;
    }
    type GetVideoInfo = (options: GetVideoInfoOptions) => void;
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
    interface chooseMediaSuccessCallbackResult {
        tempFiles: MediaFile[];
    }
    const _getVideoInfo = async (uri: string): Promise<GetVideoInfoSuccess> =>{
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
            throw error as Error;
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
        } as GetVideoInfoSuccess;
    };
    const _getImageInfo = async (uri: string): Promise<GetImageInfoSuccess> =>{
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
        } as GetImageInfoSuccess;
    };
    const _chooseMedia = async (options: ChooseMediaOptions): Promise<chooseMediaSuccessCallbackResult> =>{
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
        } as chooseMediaSuccessCallbackResult;
    };
    const API_GET_IMAGE_INFO = 'getImageInfo';
    const GetImageInfoApiProtocol = new Map<string, ProtocolOptions>([
        [
            'src',
            {
                type: 'string',
                required: true
            }
        ]
    ]);
    const GetImageInfoApiOptions: ApiOptions<GetImageInfoOptions> = {
        formatArgs: new Map<string, Function>([
            [
                'src',
                (src: string, params: GetImageInfoOptions)=>{
                    params.src = getRealPath(src);
                }
            ]
        ])
    };
    const API_CHOOSE_IMAGE = 'chooseImage';
    const ChooseImageApiProtocol = new Map<string, ProtocolOptions>([
        [
            'count',
            {
                type: 'number',
                required: false
            }
        ],
        [
            'sizeType',
            {
                type: 'array',
                required: false
            }
        ],
        [
            'sourceType',
            {
                type: 'array',
                required: false
            }
        ],
        [
            'extension',
            {
                type: 'array',
                required: false
            }
        ]
    ]);
    const ChooseImageApiOptions: ApiOptions<ChooseImageOptions> = {
        formatArgs: new Map<string, Function>([
            [
                'count',
                (count: number, params: ChooseImageOptions)=>{
                    if (count == null) {
                        params.count = 9;
                    }
                }
            ],
            [
                'sizeType',
                (sizeType: string[], params: ChooseImageOptions)=>{
                    if (sizeType == null) {
                        params.sizeType = [
                            'original',
                            'compressed'
                        ];
                    }
                }
            ],
            [
                'sourceType',
                (sourceType: string[], params: ChooseImageOptions)=>{
                    if (sourceType == null) {
                        params.sourceType = [
                            'album',
                            'camera'
                        ];
                    }
                }
            ],
            [
                'extension',
                (extension: string[], params: ChooseImageOptions)=>{
                    if (extension == null) {
                        params.extension = [
                            '*'
                        ];
                    }
                }
            ]
        ])
    };
    const API_GET_VIDEO_INFO = 'getVideoInfo';
    const GetVideoInfoApiProtocol = new Map<string, ProtocolOptions>([
        [
            'src',
            {
                type: 'string',
                required: true
            }
        ]
    ]);
    const GetVideoInfoApiOptions: ApiOptions<GetVideoInfoOptions> = {
        formatArgs: new Map<string, Function>([
            [
                'src',
                (src: string, params: GetVideoInfoOptions)=>{
                    params.src = getRealPath(src);
                }
            ]
        ])
    };
    const API_CHOOSE_VIDEO = 'chooseVideo';
    const ChooseVideoApiProtocol = new Map<string, ProtocolOptions>([
        [
            'sourceType',
            {
                type: 'array',
                required: false
            }
        ],
        [
            'compressed',
            {
                type: 'boolean',
                required: false
            }
        ],
        [
            'maxDuration',
            {
                type: 'number',
                required: false
            }
        ],
        [
            'camera',
            {
                type: 'string',
                required: false
            }
        ],
        [
            'extension',
            {
                type: 'array',
                required: false
            }
        ]
    ]);
    const ChooseVideoApiOptions: ApiOptions<ChooseVideoOptions> = {
        formatArgs: new Map<string, Function>([
            [
                'sourceType',
                (sourceType: string[], params: ChooseVideoOptions)=>{
                    if (sourceType == null) {
                        params.sourceType = [
                            'album',
                            'camera'
                        ];
                    }
                }
            ],
            [
                'compressed',
                (compressed: boolean, params: ChooseVideoOptions)=>{
                    if (compressed == null) {
                        params.compressed = true;
                    }
                }
            ],
            [
                'maxDuration',
                (maxDuration: number, params: ChooseVideoOptions)=>{
                    if (maxDuration == null) {
                        params.maxDuration = 60;
                    }
                }
            ],
            [
                'camera',
                (camera: string, params: ChooseVideoOptions)=>{
                    if (camera == null) {
                        params.camera = 'back';
                    }
                }
            ],
            [
                'extension',
                (extension: string[], params: ChooseVideoOptions)=>{
                    if (extension == null) {
                        params.extension = [
                            '*'
                        ];
                    }
                }
            ]
        ])
    };
    interface TempFileItem {
        path: string;
        size: number;
    }
    const chooseImage: ChooseImage = defineAsyncApi<ChooseImageOptions, ChooseImageSuccess>(API_CHOOSE_IMAGE, (options: ChooseImageOptions, res: ApiExcutor<ChooseImageSuccess>)=>{
        _chooseMedia({
            mimeType: picker1.PhotoViewMIMETypes.IMAGE_TYPE,
            count: options.count!
        } as ChooseMediaOptions).then((chooseMediaRes)=>{
            res.resolve({
                errMsg: '',
                errSubject: 'uni-chooseImage',
                tempFilePaths: chooseMediaRes.tempFiles.map((file)=>file.tempFilePath),
                tempFiles: chooseMediaRes.tempFiles.map((file)=>{
                    return {
                        path: file.tempFilePath,
                        size: file.size
                    } as TempFileItem;
                })
            } as ChooseImageSuccess);
        }, (err: Error)=>{
            res.reject(err.message);
        });
    }, ChooseImageApiProtocol, ChooseImageApiOptions) as ChooseImage;
    const chooseVideo: ChooseVideo = defineAsyncApi<ChooseVideoOptions, ChooseVideoSuccess>(API_CHOOSE_VIDEO, (options: ChooseVideoOptions, res: ApiExcutor<ChooseVideoSuccess>)=>{
        _chooseMedia({
            mimeType: picker2.PhotoViewMIMETypes.VIDEO_TYPE
        } as ChooseMediaOptions).then((chooseMediaRes)=>{
            const file = chooseMediaRes.tempFiles[0];
            res.resolve({
                tempFilePath: file.tempFilePath,
                duration: file.duration,
                size: file.size,
                width: file.width,
                height: file.height
            } as ChooseVideoSuccess);
        }, (err: Error)=>{
            res.reject(err.message);
        });
    }, ChooseVideoApiProtocol, ChooseVideoApiOptions) as ChooseVideo;
    const getImageInfo: GetImageInfo = defineAsyncApi<GetImageInfoOptions, GetImageInfoSuccess>(API_GET_IMAGE_INFO, (options: GetImageInfoOptions, res: ApiExcutor<GetImageInfoSuccess>)=>{
        _getImageInfo(options.src).then((getImageInfoRes)=>{
            res.resolve(getImageInfoRes);
        }, (err: Error)=>{
            res.reject(err.message);
        });
    }, GetImageInfoApiProtocol, GetImageInfoApiOptions) as GetImageInfo;
    const getVideoInfo: GetVideoInfo = defineAsyncApi<GetVideoInfoOptions, GetVideoInfoSuccess>(API_GET_VIDEO_INFO, (options: GetVideoInfoOptions, res: ApiExcutor<GetVideoInfoSuccess>)=>{
        _getVideoInfo(options.src).then((getVideInfoRes)=>{
            res.resolve({
                size: getVideInfoRes.size,
                duration: getVideInfoRes.duration!,
                width: getVideInfoRes.width!,
                height: getVideInfoRes.height!,
                type: getVideInfoRes.type!,
                orientation: getVideInfoRes.orientation!
            } as GetVideoInfoSuccess);
        }, (err: Error)=>{
            res.reject(err.message);
        });
    }, GetVideoInfoApiProtocol, GetVideoInfoApiOptions) as GetVideoInfo;
    type Request<T> = (param: RequestOptions<T>) => RequestTask;
    class RequestOptions extends UTSObject {
        url!: string;
        data: Object | null = null;
        header: UTSJSONObject | null = null;
        method: RequestMethod | null = null;
        timeout: number | null = null;
        dataType: string | null = null;
        responseType: string | null = null;
        sslVerify: boolean | null = null;
        withCredentials: boolean | null = null;
        firstIpv4: boolean | null = null;
        success: RequestSuccessCallback<T> | null = null;
        fail: RequestFailCallback | null = null;
        complete: RequestCompleteCallback | null = null;
    }
    class RequestSuccess extends UTSObject {
        data: T | null = null;
        statusCode!: number;
        header!: Object;
        cookies!: Array<string>;
    }
    type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
    type RequestErrorCode = 5 | 1000 | 100001 | 100002 | 600003 | 600009 | 602001;
    interface RequestFail extends IUniError {
        errCode: RequestErrorCode;
    }
    type RequestSuccessCallback<T> = (option: RequestSuccess<T>) => void;
    type RequestFailCallback = (option: RequestFail) => void;
    type RequestCompleteCallback = (option: Object) => void;
    interface RequestTask {
        abort(): void;
    }
    type UploadFile = (options: UploadFileOptions) => UploadTask;
    class UploadFileOptionFiles extends UTSObject {
        name: string | null = null;
        uri!: string;
        file: Object | null = null;
    }
    class UploadFileSuccess extends UTSObject {
        data!: string;
        statusCode!: number;
    }
    type UploadFileSuccessCallback = (result: UploadFileSuccess) => void;
    interface UploadFileFail extends IUniError {
        errCode: RequestErrorCode;
    }
    type UploadFileFailCallback = (result: UploadFileFail) => void;
    type UploadFileCompleteCallback = (result: Object) => void;
    class UploadFileOptions extends UTSObject {
        url!: string;
        filePath: string | null = null;
        name: string | null = null;
        files: (UploadFileOptionFiles[]) | null = null;
        header: UTSJSONObject | null = null;
        formData: UTSJSONObject | null = null;
        timeout: number | null = null;
        success: UploadFileSuccessCallback | null = null;
        fail: UploadFileFailCallback | null = null;
        complete: UploadFileCompleteCallback | null = null;
    }
    class OnProgressUpdateResult extends UTSObject {
        progress!: number;
        totalBytesSent!: number;
        totalBytesExpectedToSend!: number;
    }
    type UploadFileProgressUpdateCallback = (result: OnProgressUpdateResult) => void;
    interface UploadTask {
        abort(): void;
        onProgressUpdate(callback: UploadFileProgressUpdateCallback): void;
    }
    type DownloadFile = (options: DownloadFileOptions) => DownloadTask;
    class DownloadFileSuccess extends UTSObject {
        tempFilePath!: string;
        statusCode!: number;
    }
    type DownloadFileSuccessCallback = (result: DownloadFileSuccess) => void;
    interface DownloadFileFail extends IUniError {
        errCode: RequestErrorCode;
    }
    type DownloadFileFailCallback = (result: DownloadFileFail) => void;
    type DownloadFileComplete = Object;
    type DownloadFileCompleteCallback = (result: DownloadFileComplete) => void;
    class DownloadFileOptions extends UTSObject {
        url!: string;
        header: UTSJSONObject | null = null;
        filePath: string | null = null;
        timeout: number | null = null;
        success: DownloadFileSuccessCallback | null = null;
        fail: DownloadFileFailCallback | null = null;
        complete: DownloadFileCompleteCallback | null = null;
    }
    class OnProgressDownloadResult extends UTSObject {
        progress!: number;
        totalBytesWritten!: number;
        totalBytesExpectedToWrite!: number;
    }
    type DownloadFileProgressUpdateCallback = (result: OnProgressDownloadResult) => void;
    interface DownloadTask {
        abort(): void;
        onProgressUpdate(callback: DownloadFileProgressUpdateCallback): void;
    }
    const API_REQUEST = 'request';
    const RequestApiProtocol = new Map<string, ProtocolOptions>([
        [
            'url',
            {
                type: 'string',
                required: true
            }
        ],
        [
            'data',
            {
                type: 'object',
                required: false
            }
        ],
        [
            'header',
            {
                type: 'object',
                required: false
            }
        ],
        [
            'method',
            {
                type: 'string',
                required: false
            }
        ],
        [
            'dataType',
            {
                type: 'string',
                required: false
            }
        ],
        [
            'responseType',
            {
                type: 'string',
                required: false
            }
        ],
        [
            'timeout',
            {
                type: 'number',
                required: false
            }
        ],
        [
            'sslVerify',
            {
                type: 'boolean',
                required: false
            }
        ],
        [
            'withCredentials',
            {
                type: 'boolean',
                required: false
            }
        ],
        [
            'firstIpv4',
            {
                type: 'boolean',
                required: false
            }
        ]
    ]);
    const RequestApiOptions: ApiOptions<RequestOptions<Object>> = {
        formatArgs: new Map<string, Function>([
            [
                'url',
                (url: string, params: RequestOptions<Object>)=>{
                    if (url == null) {
                        throw new Error('url is required');
                    }
                }
            ],
            [
                'data',
                (data: object, params: RequestOptions<Object>)=>{
                    if (data == null) {
                        params.data = '';
                    }
                }
            ],
            [
                'method',
                (method: string, params: RequestOptions<Object>)=>{
                    params.method = (method || 'GET').toUpperCase() as RequestMethod;
                }
            ],
            [
                'dataType',
                (dataType: string, params: RequestOptions<Object>)=>{
                    if (dataType == null) {
                        params.dataType = 'json';
                    }
                }
            ],
            [
                'responseType',
                (responseType: string, params: RequestOptions<Object>)=>{
                    if (responseType == null) {
                        params.responseType = 'text';
                    }
                }
            ],
            [
                'timeout',
                (timeout: number, params: RequestOptions<Object>)=>{
                    if (timeout == null) {
                        params.timeout = 60000;
                    }
                }
            ],
            [
                'sslVerify',
                (sslVerify: boolean, params: RequestOptions<Object>)=>{
                    if (sslVerify == null) {
                        params.sslVerify = true;
                    }
                }
            ],
            [
                'withCredentials',
                (withCredentials: boolean, params: RequestOptions<Object>)=>{
                    if (withCredentials == null) {
                        params.withCredentials = false;
                    }
                }
            ],
            [
                'firstIpv4',
                (firstIpv4: boolean, params: RequestOptions<Object>)=>{
                    if (firstIpv4 == null) {
                        params.firstIpv4 = false;
                    }
                }
            ]
        ])
    };
    const API_DOWNLOAD_FILE = 'downloadFile';
    const DownloadFileApiProtocol = new Map<string, ProtocolOptions>([
        [
            'url',
            {
                type: 'string',
                required: true
            }
        ],
        [
            'header',
            {
                type: 'object',
                required: false
            }
        ],
        [
            'timeout',
            {
                type: 'number',
                required: false
            }
        ]
    ]);
    const DownloadFileApiOptions: ApiOptions<DownloadFileOptions> = {
        formatArgs: new Map<string, Function>([
            [
                'url',
                (url: string, params: DownloadFileOptions)=>{
                    if (url == null) {
                        throw new Error('url is required');
                    }
                }
            ]
        ])
    };
    const API_UPLOAD_FILE = 'uploadFile';
    const UploadFileApiProtocol = new Map<string, ProtocolOptions>([
        [
            'url',
            {
                type: 'string',
                required: true
            }
        ],
        [
            'filePath',
            {
                type: 'string',
                required: true
            }
        ],
        [
            'name',
            {
                type: 'string',
                required: false
            }
        ],
        [
            'header',
            {
                type: 'object',
                required: false
            }
        ],
        [
            'formData',
            {
                type: 'object',
                required: false
            }
        ],
        [
            'timeout',
            {
                type: 'number',
                required: false
            }
        ]
    ]);
    const UploadFileApiOptions: ApiOptions<UploadFileOptions> = {
        formatArgs: new Map<string, Function>([
            [
                'url',
                (url: string, params: UploadFileOptions)=>{
                    if (url == null) {
                        throw new Error('url is required');
                    }
                }
            ],
            [
                'filePath',
                (filePath: string, params: UploadFileOptions)=>{
                    if (filePath == null) {
                        throw new Error('filePath is required');
                    }
                    params.filePath = getRealPath1(filePath);
                }
            ],
            [
                'name',
                (name: string, params: UploadFileOptions)=>{
                    if (name == null) {
                        params.name = 'file';
                    }
                }
            ]
        ])
    };
    const cookiesParse = (header: Record<string, string>)=>{
        let cookiesStr = header['Set-Cookie'] || header['set-cookie'];
        let cookiesArr: string[] = [];
        if (!cookiesStr) {
            return [];
        }
        if (cookiesStr[0] === '[' && cookiesStr[cookiesStr.length - 1] === ']') {
            cookiesStr = cookiesStr.slice(1, -1);
        }
        const handleCookiesArr = cookiesStr.split(';');
        for(let i = 0; i < handleCookiesArr.length; i++){
            if (handleCookiesArr[i].indexOf('Expires=') !== -1 || handleCookiesArr[i].indexOf('expires=') !== -1) {
                cookiesArr.push(handleCookiesArr[i].replace(',', ''));
            } else {
                cookiesArr.push(handleCookiesArr[i]);
            }
        }
        cookiesArr = cookiesArr.join(';').split(',');
        return cookiesArr;
    };
    interface IRequestTask {
        abort: Function;
        onHeadersReceived: Function;
        offHeadersReceived: Function;
    }
    class RequestTask1 implements RequestTask {
        private _requestTask: IRequestTask;
        constructor(requestTask: IRequestTask){
            this._requestTask = requestTask;
        }
        abort() {
            this._requestTask.abort();
        }
        onHeadersReceived(callback: Function) {
            this._requestTask.onHeadersReceived(callback);
        }
        offHeadersReceived(callback: Function | null = null) {
            this._requestTask.offHeadersReceived(callback);
        }
    }
    const request = defineTaskApi<RequestOptions<Object>, RequestSuccess<Object>, RequestTask>(API_REQUEST, (args: RequestOptions<Object>, exec: ApiExcutor<RequestSuccess<Object>>)=>{
        let header = args.header, method = args.method, data = args.data, dataType = args.dataType, timeout = args.timeout, url = args.url, responseType = args.responseType;
        let contentType = '';
        const headers = {} as Record<string, Object>;
        if (header) {
            const headerRecord = header as Object as Record<string, string>;
            const headerKeys = Object.keys(headerRecord);
            for(let i = 0; i < headerKeys.length; i++){
                const name = headerKeys[i];
                if (name.toLowerCase() === 'content-type') {
                    contentType = headerRecord[name] as string;
                }
                headers[name.toLowerCase()] = headerRecord[name];
            }
        }
        if (!contentType && method === 'POST') {
            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        if (method === 'GET' && data && isPlainObject(data)) {
            const dataRecord = data as Record<string, Object>;
            url += '?' + Object.keys(dataRecord).map((key)=>{
                return (encodeURIComponent(key) + '=' + encodeURIComponent(dataRecord[key] as string | number | boolean));
            }).join('&');
            data = null;
        } else if (method !== 'GET' && contentType && contentType.indexOf('application/json') === 0 && isPlainObject(data)) {
            data = JSON.stringify(data);
        } else if (method !== 'GET' && contentType && contentType.indexOf('application/x-www-form-urlencoded') === 0 && isPlainObject(data)) {
            const dataRecord = data as Record<string, Object>;
            data = Object.keys(dataRecord).map((key)=>{
                return (encodeURIComponent(key) + '=' + encodeURIComponent(dataRecord[key] as number | string | boolean));
            }).join('&');
        }
        let expectDataType: http.HttpDataType = http.HttpDataType.STRING;
        if (responseType === 'arraybuffer') {
            expectDataType = http.HttpDataType.ARRAY_BUFFER;
        } else if (dataType === 'json') {
            expectDataType = http.HttpDataType.OBJECT;
        } else {
            expectDataType = http.HttpDataType.STRING;
        }
        const httpRequest = http.createHttp();
        const emitter = new Emitter();
        const requestTask: IRequestTask = {
            abort () {
                httpRequest.destroy();
            },
            onHeadersReceived (callback: Function) {
                emitter.on('headersReceive', callback);
            },
            offHeadersReceived (callback: Function | null = null) {
                emitter.off('headersReceive', callback);
            }
        };
        httpRequest.on('headersReceive', (header: Object)=>{});
        httpRequest.request(url, {
            header: headers,
            method: (method || 'GET').toUpperCase() as http.RequestMethod,
            extraData: data,
            expectDataType,
            connectTimeout: timeout ? timeout : undefined,
            readTimeout: timeout ? timeout : undefined
        } as http.HttpRequestOptions, (err, res)=>{
            if (err) {
                exec.reject(err.message);
            } else {
                exec.resolve({
                    data: res.result,
                    statusCode: res.responseCode,
                    header: res.header,
                    cookies: cookiesParse(res.header as Record<string, string>)
                } as RequestSuccess<Object>);
            }
            requestTask.offHeadersReceived();
            httpRequest.destroy();
        });
        return new RequestTask1(requestTask);
    }, RequestApiProtocol, RequestApiOptions) as Request<Object>;
    interface IUploadTask {
        abort: Function;
        onHeadersReceived: Function;
        offHeadersReceived: Function;
        onProgressUpdate: Function;
        offProgressUpdate: Function;
    }
    class UploadTask1 implements UploadTask {
        private _uploadTask: IUploadTask;
        constructor(uploadTask: IUploadTask){
            this._uploadTask = uploadTask;
        }
        abort() {
            this._uploadTask.abort();
        }
        onProgressUpdate(callback: Function) {
            this._uploadTask.onProgressUpdate(callback);
        }
        offProgressUpdate(callback: Function | null = null) {
            this._uploadTask.offProgressUpdate(callback);
        }
        onHeadersReceived(callback: Function) {
            this._uploadTask.onHeadersReceived(callback);
        }
        offHeadersReceived(callback: Function | null = null) {
            this._uploadTask.offHeadersReceived(callback);
        }
    }
    const uploadFile = defineTaskApi<UploadFileOptions, UploadFileSuccess, UploadTask>(API_UPLOAD_FILE, (args: UploadFileOptions, exec: ApiExcutor<UploadFileSuccess>)=>{
        let url = args.url, timeout = args.timeout, header = args.header, formData = args.formData, files = args.files, filePath = args.filePath, name = args.name;
        const headers = {} as Record<string, Object>;
        if (header) {
            const headerRecord = header as Object as Record<string, string>;
            const headerKeys = Object.keys(headerRecord);
            for(let i = 0; i < headerKeys.length; i++){
                const name = headerKeys[i];
                headers[name.toLowerCase()] = headerRecord[name];
            }
        }
        headers['Content-Type'] = 'multipart/form-data';
        const multiFormDataList = [] as Array<http1.MultiFormData>;
        if (formData) {
            const formDataRecord = formData as Object as Record<string, Object>;
            const formDataKeys = Object.keys(formDataRecord);
            for(let i = 0; i < formDataKeys.length; i++){
                const name = formDataKeys[i];
                multiFormDataList.push({
                    name,
                    contentType: 'text/plain',
                    data: String(formDataRecord[name])
                } as http1.MultiFormData);
            }
        }
        if (files && files.length) {
            for(let i = 0; i < files.length; i++){
                const _files_i = files[i], name = _files_i.name, uri = _files_i.uri;
                multiFormDataList.push({
                    name: name || 'file',
                    contentType: 'application/octet-stream',
                    filePath: getRealPath2(uri!)
                } as http1.MultiFormData);
            }
        } else {
            multiFormDataList.push({
                name: name || 'file',
                contentType: 'application/octet-stream',
                filePath: getRealPath2(filePath!)
            } as http1.MultiFormData);
        }
        const httpRequest = http1.createHttp();
        const emitter = new Emitter1();
        const uploadTask: IUploadTask = {
            abort () {
                httpRequest.destroy();
            },
            onHeadersReceived (callback: Function) {
                emitter.on('headersReceive', callback);
            },
            offHeadersReceived (callback: Function | null = null) {
                emitter.off('headersReceive', callback);
            },
            onProgressUpdate (callback: Function) {
                emitter.on('progress', callback);
            },
            offProgressUpdate (callback: Function | null = null) {
                emitter.off('progress', callback);
            }
        };
        httpRequest.on('headersReceive', (header: Object)=>{});
        httpRequest.on('dataSendProgress', (ref)=>{
            let sendSize = ref.sendSize, totalSize = ref.totalSize;
            emitter.emit('progress', {
                progress: Math.floor((sendSize / totalSize) * 100),
                totalBytesSent: sendSize,
                totalBytesExpectedToSend: totalSize
            } as OnProgressUpdateResult);
        });
        httpRequest.request(url, {
            header: headers,
            method: http1.RequestMethod.POST,
            connectTimeout: timeout ? timeout : undefined,
            readTimeout: timeout ? timeout : undefined,
            multiFormDataList,
            expectDataType: http1.HttpDataType.STRING
        } as http1.HttpRequestOptions, (err, res)=>{
            if (err) {
                exec.reject(err.message);
            } else {
                exec.resolve({
                    data: res.result as string,
                    statusCode: res.responseCode
                } as UploadFileSuccess);
            }
            uploadTask.offHeadersReceived();
            uploadTask.offProgressUpdate();
            httpRequest.destroy();
        });
        return new UploadTask1(uploadTask);
    }, UploadFileApiProtocol, UploadFileApiOptions) as UploadFile;
    interface IDownloadTask {
        abort: Function;
        onHeadersReceived: Function;
        offHeadersReceived: Function;
        onProgressUpdate: Function;
        offProgressUpdate: Function;
    }
    class DownloadTask1 implements DownloadTask {
        private _downloadTask: IDownloadTask;
        constructor(downloadTask: IDownloadTask){
            this._downloadTask = downloadTask;
        }
        abort() {
            this._downloadTask.abort();
        }
        onProgressUpdate(callback: Function) {
            this._downloadTask.onProgressUpdate(callback);
        }
        offProgressUpdate(callback: Function | null = null) {
            this._downloadTask.offProgressUpdate(callback);
        }
        onHeadersReceived(callback: Function) {
            this._downloadTask.onHeadersReceived(callback);
        }
        offHeadersReceived(callback: Function | null = null) {
            this._downloadTask.offHeadersReceived(callback);
        }
    }
    const downloadFile = defineTaskApi<DownloadFileOptions, DownloadFileSuccess, DownloadTask>(API_DOWNLOAD_FILE, (args: DownloadFileOptions, exec: ApiExcutor<DownloadFileSuccess>)=>{
        let url = args.url, timeout = args.timeout, header = args.header;
        const httpRequest = http2.createHttp();
        const emitter = new Emitter2();
        const downloadTask: IDownloadTask = {
            abort () {
                httpRequest.destroy();
            },
            onHeadersReceived (callback: Function) {
                emitter.on('headersReceive', callback);
            },
            offHeadersReceived (callback: Function | null = null) {
                emitter.off('headersReceive', callback);
            },
            onProgressUpdate (callback: Function) {
                emitter.on('progress', callback);
            },
            offProgressUpdate (callback: Function | null = null) {
                emitter.off('progress', callback);
            }
        };
        httpRequest.on('headersReceive', (header: Object)=>{});
        httpRequest.on('dataReceiveProgress', (ref)=>{
            let receiveSize = ref.receiveSize, totalSize = ref.totalSize;
            emitter.emit('progress', {
                progress: Math.floor((receiveSize / totalSize) * 100),
                totalBytesWritten: receiveSize,
                totalBytesExpectedToWrite: totalSize
            } as OnProgressDownloadResult);
        });
        const TEMP_PATH = getEnv().TEMP_PATH as string;
        const tempFilePath = TEMP_PATH + '/download/' + Date.now() + '.tmp';
        const stream = fs1.createStreamSync(tempFilePath, 'w+');
        let writePromise = Promise.resolve(0);
        const queueWrite = async (data: ArrayBuffer): Promise<number> =>{
            writePromise = writePromise.then(async (total)=>{
                const length = await stream.write(data);
                return total + length;
            });
            return writePromise;
        };
        httpRequest.on('dataReceive', (data)=>{
            queueWrite(data);
        });
        httpRequest.requestInStream(url, {
            header: header ? header : {} as ESObject,
            method: http2.RequestMethod.GET,
            connectTimeout: timeout ? timeout : undefined,
            readTimeout: timeout ? timeout : undefined
        } as http2.HttpRequestOptions, (err, statusCode)=>{
            if (err) {
                exec.reject(err.message);
            } else {
                writePromise.then(()=>{
                    stream.flushSync();
                    stream.closeSync();
                    exec.resolve({
                        tempFilePath,
                        statusCode
                    } as DownloadFileSuccess);
                });
            }
            downloadTask.offHeadersReceived();
            downloadTask.offProgressUpdate();
            httpRequest.destroy();
        });
        return new DownloadTask1(downloadTask);
    }, DownloadFileApiProtocol, DownloadFileApiOptions) as DownloadFile;
    interface UniExtApi {
        chooseImage: ChooseImage;
        getImageInfo: GetImageInfo;
        chooseVideo: ChooseVideo;
        getVideoInfo: GetVideoInfo;
        request: Request<Object>;
        uploadFile: UploadFile;
        downloadFile: DownloadFile;
    }
    return {
        chooseImage,
        getImageInfo,
        chooseVideo,
        getVideoInfo,
        request,
        uploadFile,
        downloadFile
    } as UniExtApi;
}
