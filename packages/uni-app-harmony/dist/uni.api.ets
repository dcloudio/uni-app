import { IUniError, UTSObject, UniError, UTSJSONObject, string } from './uts'
import { defineAsyncApi, defineSyncApi, defineTaskApi, defineOnApi, defineOffApi, ApiExcutor, ProtocolOptions, ApiOptions, ErrRes } from './uni-api-shared'

import fs from '@ohos.file.fs';
import picker from '@ohos.file.picker';
import image from '@ohos.multimedia.image';
import media from '@ohos.multimedia.media';
import http from '@ohos.net.http';
import { API_UPLOAD_FILE, UploadFileOptions as UploadFileOptions1, UploadFileProtocol, defineTaskApi as defineTaskApi1, hasOwn, getRealPath as getRealPath1, Emitter as Emitter1 } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
import { ReadOptions } from '@ohos.file.fs';
import fs1 from '@ohos.file.fs';
import { getEnv, Emitter as Emitter2, API_DOWNLOAD_FILE, DownloadFileOptions as DownloadFileOptions1, DownloadFileProtocol, defineTaskApi as defineTaskApi2 } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
import { getRealPath } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
import http1 from '@ohos.net.http';
import http2 from '@ohos.net.http';
import { isPlainObject, API_REQUEST, RequestOptions as RequestOptions1, RequestProtocol, defineTaskApi, Emitter } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
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
    class RequestOptions<T> extends UTSObject {
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
    class RequestSuccess<T> extends UTSObject {
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
    type API_TYPE_REQUEST = (options: RequestOptions<Object>) => RequestTask;
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
    const request = defineTaskApi<API_TYPE_REQUEST>(API_REQUEST, (args, ref)=>{
        let resolve = ref.resolve, reject = ref.reject;
        let header = args.header, method = args.method, data = args.data, dataType = args.dataType, timeout = args.timeout, url = args.url, responseType = args.responseType;
        let contentType;
        const headers = {} as Record<string, Object>;
        for(const name in header){
            if (name.toLowerCase() === 'content-type') {
                contentType = header[name];
            }
            headers[name.toLowerCase()] = header[name];
        }
        if (!contentType && method === 'POST') {
            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        if (method === 'GET' && data && isPlainObject(data)) {
            url += '?' + Object.keys(data).map((key)=>{
                return (encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }).join('&');
            data = undefined;
        } else if (method !== 'GET' && contentType && contentType.indexOf('application/json') === 0 && isPlainObject(data)) {
            data = JSON.stringify(data);
        } else if (method !== 'GET' && contentType && contentType.indexOf('application/x-www-form-urlencoded') === 0 && isPlainObject(data)) {
            data = Object.keys(data).map((key)=>{
                return (encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
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
        const requestTask = {
            abort () {
                httpRequest.destroy();
            },
            onHeadersReceived (callback: Function) {
                emitter.on('headersReceive', callback);
            },
            offHeadersReceived (callback: Function | null = null) {
                emitter.off('headersReceive', callback);
            }
        } as UTSJSONObject;
        httpRequest.on('headersReceive', (header: Object)=>{});
        httpRequest.request(url, {
            header: headers,
            method: (method || 'GET').toUpperCase() as http.RequestMethod,
            extraData: data,
            expectDataType,
            connectTimeout: timeout,
            readTimeout: timeout
        } as UTSJSONObject, (err, res)=>{
            if (err) {
                reject(err.message);
            } else {
                resolve({
                    data: res.result,
                    statusCode: res.responseCode,
                    header: res.header,
                    cookies: cookiesParse(res.header as Record<string, Object>)
                } as UTSJSONObject);
            }
            requestTask.offHeadersReceived();
            httpRequest.destroy();
        });
        return new RequestTask1(requestTask);
    }, RequestProtocol, RequestOptions1);
    type API_TYPE_UPLOAD_FILE = (options: UploadFileOptions) => UploadTask;
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
    const uploadFile = defineTaskApi1<API_TYPE_UPLOAD_FILE>(API_UPLOAD_FILE, (args, ref)=>{
        let resolve = ref.resolve, reject = ref.reject;
        let url = args.url, timeout = args.timeout, header = args.header, formData = args.formData, files = args.files, filePath = args.filePath, name = args.name;
        const headers = {} as Record<string, Object>;
        for(const name in header){
            headers[name.toLowerCase()] = header[name];
        }
        headers['Content-Type'] = 'multipart/form-data';
        const multiFormDataList = [] as Array<http1.MultiFormData>;
        for(const name in formData){
            if (hasOwn(formData, name)) {
                multiFormDataList.push({
                    name,
                    contentType: 'text/plain',
                    data: String(formData[name])
                } as UTSJSONObject);
            }
        }
        if (files && files.length) {
            for(let i = 0; i < files.length; i++){
                const _files_i = files[i], name = _files_i.name, uri = _files_i.uri;
                multiFormDataList.push({
                    name: name || 'file',
                    contentType: 'application/octet-stream',
                    filePath: getRealPath1(uri!)
                } as UTSJSONObject);
            }
        } else {
            multiFormDataList.push({
                name: name || 'file',
                contentType: 'application/octet-stream',
                filePath: getRealPath1(filePath!)
            } as UTSJSONObject);
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
            } as UTSJSONObject);
        });
        httpRequest.request(url, {
            header: headers,
            method: http1.RequestMethod.POST,
            connectTimeout: timeout,
            readTimeout: timeout,
            multiFormDataList,
            expectDataType: http1.HttpDataType.STRING
        } as UTSJSONObject, (err, res)=>{
            if (err) {
                reject(err.message);
            } else {
                resolve({
                    data: res.result as string,
                    statusCode: res.responseCode
                } as UTSJSONObject);
            }
            uploadTask.offHeadersReceived();
            uploadTask.offProgressUpdate();
            httpRequest.destroy();
        });
        return new UploadTask1(uploadTask);
    }, UploadFileProtocol, UploadFileOptions1);
    type API_TYPE_DOWNLOAD_FILE = (options: DownloadFileOptions) => DownloadTask;
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
    const downloadFile = defineTaskApi2<API_TYPE_DOWNLOAD_FILE>(API_DOWNLOAD_FILE, (args, ref)=>{
        let resolve = ref.resolve, reject = ref.reject;
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
            } as UTSJSONObject);
        });
        const TEMP_PATH = getEnv().TEMP_PATH;
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
            header,
            method: http2.RequestMethod.GET,
            connectTimeout: timeout,
            readTimeout: timeout
        } as UTSJSONObject, (err, statusCode)=>{
            if (err) {
                reject(err.message);
            } else {
                writePromise.then(()=>{
                    stream.flushSync();
                    stream.closeSync();
                    resolve({
                        tempFilePath,
                        statusCode
                    } as UTSJSONObject);
                });
            }
            downloadTask.offHeadersReceived();
            downloadTask.offProgressUpdate();
            httpRequest.destroy();
        });
        return new DownloadTask1(downloadTask);
    }, DownloadFileProtocol, DownloadFileOptions1);
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
