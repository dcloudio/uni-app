import { IUniError, UTSObject, UniError, UTSJSONObject, string, AsyncApiSuccessResult, AsyncApiResult } from './uts'
import { defineAsyncApi, defineSyncApi, defineTaskApi, defineOnApi, defineOffApi, ApiExcutor, ProtocolOptions, ApiOptions, ErrRes } from './uni-api-shared'

import fs from '@ohos.file.fs';
import picker from '@ohos.file.picker';
import image from '@ohos.multimedia.image';
import media from '@ohos.multimedia.media';
import promptAction from '@ohos.promptAction';
import { BusinessError } from '@ohos.base';
import { ReadOptions } from '@ohos.file.fs';
import { UniServiceJSBridge, getCurrentPageVm, getPageIdByVm } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
import dataPreferences from '@ohos.data.preferences';
import { getCurrentPage } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
import { getRealPath } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
import picker1 from '@ohos.file.picker';
import picker2 from '@ohos.file.picker';
import promptAction1 from '@ohos.promptAction';
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
    type SetNavigationBarColorErrorCode = 4;
    interface SetNavigationBarColorFail extends IUniError {
        errCode: SetNavigationBarColorErrorCode;
    }
    class SetNavigationBarColorOptions extends UTSObject {
        frontColor!: '#ffffff' | '#000000';
        backgroundColor!: string.ColorString;
        success: SetNavigationBarColorSuccessCallback | null = null;
        fail: SetNavigationBarColorFailCallback | null = null;
        complete: SetNavigationBarColorCompleteCallback | null = null;
    }
    type SetNavigationBarColorSuccess = AsyncApiSuccessResult;
    type SetNavigationBarColorSuccessCallback = (result: SetNavigationBarColorSuccess) => void;
    type SetNavigationBarColorFailCallback = (error: SetNavigationBarColorFail) => void;
    type SetNavigationBarColorComplete = AsyncApiResult;
    type SetNavigationBarColorCompleteCallback = (res: SetNavigationBarColorComplete) => void;
    type SetNavigationBarColor = (options: SetNavigationBarColorOptions) => void;
    type SetNavigationBarTitleErrorCode = 4;
    interface SetNavigationBarTitleFail extends IUniError {
        errCode: SetNavigationBarTitleErrorCode;
    }
    class SetNavigationBarTitleOptions extends UTSObject {
        title!: string;
        success: SetNavigationBarTitleSuccessCallback | null = null;
        fail: SetNavigationBarTitleFailCallback | null = null;
        complete: SetNavigationBarTitleCompleteCallback | null = null;
    }
    type SetNavigationBarTitleSuccess = AsyncApiSuccessResult;
    type SetNavigationBarTitleSuccessCallback = (result: SetNavigationBarTitleSuccess) => void;
    type SetNavigationBarTitleFailCallback = (error: SetNavigationBarTitleFail) => void;
    type SetNavigationBarTitleComplete = AsyncApiResult;
    type SetNavigationBarTitleCompleteCallback = (res: SetNavigationBarTitleComplete) => void;
    type SetNavigationBarTitle = (options: SetNavigationBarTitleOptions) => void;
    const FRONT_COLORS = [
        '#ffffff',
        '#000000'
    ];
    const API_SET_NAVIGATION_BAR_COLOR = 'setNavigationBarColor';
    const SetNavigationBarColorProtocol = new Map<string, ProtocolOptions>([
        [
            'frontColor',
            {
                type: 'string',
                required: true,
                validator (frontColor: Object) {
                    if (FRONT_COLORS.indexOf(frontColor as string) === -1) {
                        return `invalid frontColor "${frontColor}"`;
                    }
                    return;
                }
            }
        ],
        [
            'backgroundColor',
            {
                type: 'string',
                required: true
            }
        ]
    ]);
    const API_SET_NAVIGATION_BAR_TITLE = 'setNavigationBarTitle';
    const SetNavigationBarTitleProtocol = new Map<string, ProtocolOptions>([
        [
            'title',
            {
                type: 'string',
                required: true
            }
        ]
    ]);
    interface TitleNView {
        titleText: string;
        autoBackButton?: boolean;
    }
    interface BackButton {
        color?: string;
    }
    interface PlusWebviewWebviewTitleNViewStyles {
        backgroundColor?: string;
        titleColor?: string;
        titleNView?: TitleNView;
        backButton?: BackButton;
    }
    interface Webview {
        getStyle: () => PlusWebviewWebviewTitleNViewStyles | null;
        setStyle: (style: PlusWebviewWebviewTitleNViewStyles) => void;
    }
    interface $page {
        statusBarStyle: 'dark' | 'light';
    }
    interface Page {
        $getAppWebview: () => Webview | null;
        $page: $page;
    }
    const getWebview = (page: Page): Webview | null =>{
        const webview = page.$getAppWebview();
        return webview;
    };
    const setNavigationBarColor: SetNavigationBarColor = defineAsyncApi<SetNavigationBarColorOptions, SetNavigationBarColorSuccess>(API_SET_NAVIGATION_BAR_COLOR, (options: SetNavigationBarColorOptions, res: ApiExcutor<SetNavigationBarColorSuccess>)=>{
        const page = getCurrentPage() as Page;
        if (!page) {
            return res.reject(`getCurrentPages is empty`);
        }
        const webview = getWebview(page);
        if (webview) {
            const styles: PlusWebviewWebviewTitleNViewStyles = {};
            if (options.frontColor) {
                styles.titleColor = options.frontColor;
            }
            if (options.backgroundColor) {
                styles.backgroundColor = options.backgroundColor;
            }
            const statusBarStyle = options.frontColor === '#000000' ? 'dark' : 'light';
            page.$page.statusBarStyle = statusBarStyle;
            const style = webview.getStyle();
            if (style && style.titleNView) {
                if (style.titleNView.autoBackButton) {
                    styles.backButton = styles.backButton || {};
                    styles.backButton.color = options.frontColor;
                }
                webview.setStyle({
                    titleNView: styles as TitleNView
                } as PlusWebviewWebviewTitleNViewStyles);
            }
            res.resolve();
        } else {
            res.reject();
        }
    }, SetNavigationBarColorProtocol) as SetNavigationBarColor;
    const setNavigationBarTitle: SetNavigationBarTitle = defineAsyncApi<SetNavigationBarTitleOptions, SetNavigationBarTitleSuccess>(API_SET_NAVIGATION_BAR_TITLE, (options: SetNavigationBarTitleOptions, res: ApiExcutor<SetNavigationBarTitleSuccess>)=>{
        const page = getCurrentPage() as Page;
        if (!page) {
            return res.reject(`getCurrentPages is empty`);
        }
        const webview = getWebview(page);
        if (webview) {
            const style = webview.getStyle();
            if (style && style.titleNView) {
                webview.setStyle({
                    titleNView: {
                        titleText: options.title
                    } as TitleNView
                } as PlusWebviewWebviewTitleNViewStyles);
            }
            res.resolve();
        } else {
            res.reject();
        }
    }, SetNavigationBarTitleProtocol) as SetNavigationBarTitle;
    type PageScrollToErrorCode = 4;
    interface PageScrollToFail extends IUniError {
        errCode: PageScrollToErrorCode;
    }
    type PageScrollToSuccess = AsyncApiSuccessResult;
    type PageScrollToSuccessCallback = (result: PageScrollToSuccess) => void;
    type PageScrollToFailCallback = (result: PageScrollToFail) => void;
    type PageScrollToComplete = AsyncApiResult;
    type PageScrollToCompleteCallback = (result: PageScrollToComplete) => void;
    class PageScrollToOptions extends UTSObject {
        scrollTop: number | null = null;
        selector: string | null = null;
        offsetTop: number | null = null;
        duration: number | null = null;
        success: PageScrollToSuccessCallback | null = null;
        fail: PageScrollToFailCallback | null = null;
        complete: PageScrollToCompleteCallback | null = null;
    }
    type PageScrollTo = (options: PageScrollToOptions) => Promise<PageScrollToSuccess> | null;
    const API_PAGE_SCROLL_TO = 'pageScrollTo';
    const PageScrollToProtocol = new Map<string, ProtocolOptions>([
        [
            'scrollTo',
            {
                type: 'number'
            }
        ],
        [
            'selector',
            {
                type: 'string'
            }
        ],
        [
            'duration',
            {
                type: 'number'
            }
        ]
    ]);
    const PageScrollToApiOptions: ApiOptions<PageScrollToOptions> = {
        formatArgs: new Map<string, number>([
            [
                'duration',
                300
            ]
        ])
    };
    const pageScrollTo: PageScrollTo = defineAsyncApi<PageScrollToOptions, PageScrollToSuccess>(API_PAGE_SCROLL_TO, (options: PageScrollToOptions, res: ApiExcutor<PageScrollToSuccess>)=>{
        const pageId = getPageIdByVm(getCurrentPageVm()!)! as number;
        UniServiceJSBridge.invokeViewMethod(API_PAGE_SCROLL_TO, options, pageId, res.resolve);
    }, PageScrollToProtocol, PageScrollToApiOptions) as PageScrollTo;
    type PromptErrorCode = 1 | 1001;
    interface IPromptError extends IUniError {
        errCode: PromptErrorCode;
    }
    class ShowToastSuccess extends UTSObject {
    }
    type ShowToastFail = IPromptError;
    type ShowToastSuccessCallback = (res: ShowToastSuccess) => void;
    type ShowToastFailCallback = (res: ShowToastFail) => void;
    type ShowToastCompleteCallback = (res: Object) => void;
    class ShowToastOptions extends UTSObject {
        title!: string;
        icon: "success" | "error" | "fail" | "exception" | "loading" | "none" | null = null;
        image: string.ImageURIString | null = null;
        mask: boolean | null = null;
        duration: number | null = null;
        position: "top" | "center" | "bottom" | null = null;
        success: ShowToastSuccessCallback | null = null;
        fail: ShowToastFailCallback | null = null;
        complete: ShowToastCompleteCallback | null = null;
    }
    type ShowToast = (options: ShowToastOptions) => void;
    type HideToast = () => void;
    class ShowLoadingSuccess extends UTSObject {
    }
    type ShowLoadingFail = IPromptError;
    type ShowLoadingSuccessCallback = (res: ShowLoadingSuccess) => void;
    type ShowLoadingFailCallback = (res: ShowLoadingFail) => void;
    type ShowLoadingCompleteCallback = (res: Object) => void;
    class ShowLoadingOptions extends UTSObject {
        title!: string;
        mask: boolean | null = null;
        success: ShowLoadingSuccessCallback | null = null;
        fail: ShowLoadingFailCallback | null = null;
        complete: ShowLoadingCompleteCallback | null = null;
    }
    type ShowLoading = (options: ShowLoadingOptions) => void;
    type HideLoading = () => void;
    class ShowModalSuccess extends UTSObject {
        confirm!: boolean;
        cancel!: boolean;
        content: string | null = null;
    }
    type ShowModalFail = IPromptError;
    type ShowModalSuccessCallback = (res: ShowModalSuccess) => void;
    type ShowModalFailCallback = (res: ShowModalFail) => void;
    type ShowModalCompleteCallback = (res: Object) => void;
    class ShowModalOptions extends UTSObject {
        title: string | null = null;
        content: string | null = null;
        showCancel: boolean | null = true;
        cancelText: string | null = null;
        cancelColor: string.ColorString | null = null;
        confirmText: string | null = null;
        confirmColor: string.ColorString | null = null;
        editable: boolean | null = false;
        placeholderText: string | null = null;
        success: ShowModalSuccessCallback | null = null;
        fail: ShowModalFailCallback | null = null;
        complete: ShowModalCompleteCallback | null = null;
    }
    type ShowModal = (options: ShowModalOptions) => void;
    class ShowActionSheetSuccess extends UTSObject {
        tapIndex: number | null = null;
    }
    class Popover extends UTSObject {
        top!: number;
        left!: number;
        width!: number;
        height!: number;
    }
    type ShowActionSheetFail = IPromptError;
    type ShowActionSheetSuccessCallback = (res: ShowActionSheetSuccess) => void;
    type ShowActionSheetFailCallback = (res: ShowActionSheetFail) => void;
    type ShowActionSheetCompleteCallback = (res: Object) => void;
    class ShowActionSheetOptions extends UTSObject {
        title: string | null = null;
        alertText: string | null = null;
        itemList!: string[];
        itemColor: string.ColorString | null = null;
        popover: Popover | null = null;
        success: ShowActionSheetSuccessCallback | null = null;
        fail: ShowActionSheetFailCallback | null = null;
        complete: ShowActionSheetCompleteCallback | null = null;
    }
    type ShowActionSheet = (options: ShowActionSheetOptions) => void;
    const API_SHOW_TOAST = 'showToast';
    const ShowToastProtocol = new Map<string, ProtocolOptions>([
        [
            'title',
            {
                type: 'string',
                required: true
            }
        ],
        [
            'duration',
            {
                type: 'number'
            }
        ]
    ]);
    const ShowToastApiOptions: ApiOptions<ShowToastOptions> = {
        formatArgs: new Map<string, Function | string | number>([
            [
                "title",
                ""
            ],
            [
                "duration",
                1500
            ]
        ])
    };
    const API_HIDE_TOAST = 'hideToast';
    const PRIMARY_COLOR = '#007aff';
    const API_SHOW_MODAL = 'showModal';
    const ShowModalProtocol = new Map<string, ProtocolOptions>([
        [
            "title",
            {
                type: "string"
            }
        ],
        [
            "content",
            {
                type: "string"
            }
        ],
        [
            "showCancel",
            {
                type: "boolean"
            }
        ],
        [
            "cancelText",
            {
                type: "string"
            }
        ],
        [
            "cancelColor",
            {
                type: "string"
            }
        ],
        [
            "confirmText",
            {
                type: "string"
            }
        ],
        [
            "confirmColor",
            {
                type: "string"
            }
        ]
    ]);
    const ShowModalApiOptions: ApiOptions<ShowModalOptions> = {
        formatArgs: new Map<string, Function | string | boolean>([
            [
                "title",
                ""
            ],
            [
                "content",
                ""
            ],
            [
                "placeholderText",
                ""
            ],
            [
                "showCancel",
                true
            ],
            [
                "editable",
                false
            ],
            [
                "cancelColor",
                "#000000"
            ],
            [
                "confirmColor",
                PRIMARY_COLOR
            ]
        ])
    };
    const API_SHOW_ACTION_SHEET = 'showActionSheet';
    const ShowActionSheetProtocol = new Map<string, ProtocolOptions>([
        [
            "title",
            {
                type: "string"
            }
        ],
        [
            "itemList",
            {
                type: "array",
                required: true
            }
        ],
        [
            "itemColor",
            {
                type: "string"
            }
        ]
    ]);
    const ShowActionSheetApiOptions: ApiOptions<ShowActionSheetOptions> = {
        formatArgs: new Map<string, string>([
            [
                "itemColor",
                "#000000"
            ]
        ])
    };
    const API_SHOW_LOADING = 'showLoading';
    const ShowLoadingProtocol = new Map<string, ProtocolOptions>([
        [
            'title',
            {
                type: 'string'
            }
        ],
        [
            'mask',
            {
                type: 'boolean'
            }
        ]
    ]);
    const ShowLoadingApiOptions: ApiOptions<ShowLoadingOptions> = {
        formatArgs: new Map<string, Function | string | boolean>([
            [
                "title",
                ""
            ],
            [
                "mask",
                false
            ]
        ])
    };
    const API_HIDE_LOADING = 'hideLoading';
    const showToast: ShowToast = defineAsyncApi<ShowToastOptions, ShowToastSuccess>(API_SHOW_TOAST, (options: ShowToastOptions, res: ApiExcutor<ShowToastSuccess>)=>{
        try {
            promptAction.showToast({
                message: options.title,
                duration: options.duration!
            } as promptAction.ShowToastOptions);
            res.resolve({} as ShowToastSuccess);
        } catch (error) {
            let message = (error as BusinessError).message;
            res.reject(message);
        }
    }, ShowToastProtocol, ShowToastApiOptions) as ShowToast;
    const hideToast: HideToast = defineAsyncApi(API_HIDE_TOAST, (_, res: ApiExcutor<Object>)=>{
        res.reject('hideToast is not supported on HarmonyOS');
    }) as HideToast;
    const showModal: ShowModal = defineAsyncApi<ShowModalOptions, ShowModalSuccess>(API_SHOW_MODAL, async (args: ShowModalOptions, res: ApiExcutor<ShowModalSuccess>)=>{
        const modalRes = await new Promise<ShowModalSuccess>((resolve, reject)=>{
            const confirmButton: AlertDialogButtonOptions = {
                value: args.confirmText ?? '确定',
                fontColor: args.confirmColor!,
                action: ()=>{
                    resolve({
                        "confirm": true
                    } as ShowModalSuccess);
                }
            };
            const cancelButton: AlertDialogButtonOptions = {
                value: args.cancelText ?? '取消',
                fontColor: args.cancelColor ?? '#000000',
                action: ()=>{
                    resolve({
                        "cancel": true
                    } as ShowModalSuccess);
                }
            };
            const buttons: Array<AlertDialogButtonOptions> = [];
            if (args.showCancel) {
                buttons.push(cancelButton);
            }
            buttons.push(confirmButton);
            AlertDialog.show({
                title: args.title ?? '',
                message: args.content ?? '',
                autoCancel: false,
                alignment: DialogAlignment.Center,
                buttons,
                cancel: ()=>{
                    resolve({
                        'cancel': true
                    } as ShowModalSuccess);
                }
            } as AlertDialogParamWithOptions);
        });
        if (modalRes.confirm) {
            modalRes.cancel = false;
        }
        if (modalRes.cancel) {
            modalRes.confirm = false;
        }
        modalRes.content = null;
        res.resolve(modalRes as ShowModalSuccess);
    }, ShowModalProtocol, ShowModalApiOptions) as ShowModal;
    const showActionSheet: ShowActionSheet = defineAsyncApi<ShowActionSheetOptions, ShowActionSheetSuccess>(API_SHOW_ACTION_SHEET, async (options: ShowActionSheetOptions, res: ApiExcutor<ShowActionSheetSuccess>)=>{
        const actionItemList = options.itemList.filter(Boolean);
        if (actionItemList.length === 0) {
            return;
        }
        type ActionMenuButtons = [promptAction1.Button, promptAction1.Button?, promptAction1.Button?, promptAction1.Button?, promptAction1.Button?, promptAction1.Button?];
        const actionMenuButtons: ActionMenuButtons = [
            {
                text: actionItemList[0],
                color: options.itemColor!
            }
        ];
        actionItemList.slice(1).forEach((item)=>{
            actionMenuButtons.push({
                text: item,
                color: options.itemColor!
            } as promptAction1.Button);
        });
        promptAction1.showActionMenu({
            title: options.title,
            buttons: actionMenuButtons
        } as promptAction1.ActionMenuOptions).then((showACtionSheetRes)=>{
            res.resolve({
                tapIndex: showACtionSheetRes.index
            } as ShowActionSheetSuccess);
        }).catch((e: Error)=>{
            if (e.message === 'cancel') {
                res.reject('cancel');
                return;
            }
            res.reject(e.message);
        });
    }, ShowActionSheetProtocol, ShowActionSheetApiOptions) as ShowActionSheet;
    const showLoading: ShowLoading = defineAsyncApi<ShowLoadingOptions, ShowLoadingSuccess>(API_SHOW_LOADING, async (options: ShowLoadingOptions, res: ApiExcutor<ShowLoadingSuccess>)=>{
        res.reject('showLoading is not supported on HarmonyOS');
    }, ShowLoadingProtocol, ShowLoadingApiOptions) as ShowLoading;
    const hideLoading: HideLoading = ()=>defineAsyncApi(API_HIDE_LOADING, (options: Object, res: ApiExcutor<Object>)=>{
            res.reject('hideLoading is not supported on HarmonyOS');
        });
    class SetStorageSuccess extends UTSObject {
    }
    type SetStorageSuccessCallback = (res: SetStorageSuccess) => void;
    type SetStorageFailCallback = (res: UniError) => void;
    type SetStorageCompleteCallback = (res: Object) => void;
    class SetStorageOptions extends UTSObject {
        key!: string;
        data!: Object;
        success: SetStorageSuccessCallback | null = null;
        fail: SetStorageFailCallback | null = null;
        complete: SetStorageCompleteCallback | null = null;
    }
    type SetStorage = (options: SetStorageOptions) => void;
    type SetStorageSync = (key: string, data: Object) => void;
    class GetStorageSuccess extends UTSObject {
        data: Object | null = null;
    }
    type GetStorageSuccessCallback = (res: GetStorageSuccess) => void;
    type GetStorageFailCallback = (res: UniError) => void;
    type GetStorageCompleteCallback = (res: Object) => void;
    class GetStorageOptions extends UTSObject {
        key!: string;
        success: GetStorageSuccessCallback | null = null;
        fail: GetStorageFailCallback | null = null;
        complete: GetStorageCompleteCallback | null = null;
    }
    type GetStorage = (options: GetStorageOptions) => void;
    type GetStorageSync = (key: string) => Object | null;
    class GetStorageInfoSuccess extends UTSObject {
        keys!: Array<string>;
        currentSize!: number;
        limitSize!: number;
    }
    type GetStorageInfoSuccessCallback = (res: GetStorageInfoSuccess) => void;
    type GetStorageInfoFailCallback = (res: UniError) => void;
    type GetStorageInfoCompleteCallback = (res: Object) => void;
    class GetStorageInfoOptions extends UTSObject {
        success: GetStorageInfoSuccessCallback | null = null;
        fail: GetStorageInfoFailCallback | null = null;
        complete: GetStorageInfoCompleteCallback | null = null;
    }
    type GetStorageInfo = (options: GetStorageInfoOptions) => void;
    type GetStorageInfoSync = () => GetStorageInfoSuccess;
    class RemoveStorageSuccess extends UTSObject {
    }
    type RemoveStorageSuccessCallback = (res: RemoveStorageSuccess) => void;
    type RemoveStorageFailCallback = (res: UniError) => void;
    type RemoveStorageCompleteCallback = (res: Object) => void;
    class RemoveStorageOptions extends UTSObject {
        key!: string;
        success: RemoveStorageSuccessCallback | null = null;
        fail: RemoveStorageFailCallback | null = null;
        complete: RemoveStorageCompleteCallback | null = null;
    }
    type RemoveStorage = (options: RemoveStorageOptions) => void;
    type RemoveStorageSync = (key: string) => void;
    class ClearStorageSuccess extends UTSObject {
    }
    type ClearStorageSuccessCallback = (res: ClearStorageSuccess) => void;
    type ClearStorageFailCallback = (res: UniError) => void;
    type ClearStorageCompleteCallback = (res: Object) => void;
    class ClearStorageOptions extends UTSObject {
        success: ClearStorageSuccessCallback | null = null;
        fail: ClearStorageFailCallback | null = null;
        complete: ClearStorageCompleteCallback | null = null;
    }
    type ClearStorage = (option?: ClearStorageOptions | null) => void;
    type ClearStorageSync = () => void;
    const API_GET_STORAGE = 'getStorage';
    const API_GET_STORAGE_SYNC = 'getStorageSync';
    const API_SET_STORAGE = 'setStorage';
    const API_SET_STORAGE_SYNC = 'setStorageSync';
    const API_REMOVE_STORAGE = 'removeStorage';
    const API_REMOVE_STORAGE_SYNC = 'removeStorageSync';
    const API_CLEAR_STORAGE = 'clearStorage';
    const API_CLEAR_STORAGE_SYNC = 'clearStorageSync';
    const API_GET_STORAGE_INFO = 'getStorageInfo';
    const API_GET_STORAGE_INFO_SYNC = 'getStorageInfoSync';
    const parseStorageValue = (value: string): Object =>{
        try {
            return JSON.parse(value).data;
        } catch (e) {
            return value;
        }
    };
    const stringifyStorageValue = (value: Object): string =>{
        return JSON.stringify({
            type: typeof value,
            data: value
        } as ESObject);
    };
    let store: dataPreferences.Preferences | null = null;
    const createStore = (): dataPreferences.Preferences =>{
        if (store) {
            return store;
        }
        store = dataPreferences.getPreferencesSync(getContext(), {
            name: `storage.${APP_ID}`
        } as dataPreferences.Options);
        return store;
    };
    const getStorageSync = defineSyncApi<Object>(API_GET_STORAGE_SYNC, (key: string)=>{
        const storeValue = createStore().getSync(key, '');
        if (!storeValue) {
            return '';
        }
        return parseStorageValue(storeValue as string);
    }) as GetStorageSync;
    const getStorage = defineAsyncApi<GetStorageOptions, GetStorageSuccess>(API_GET_STORAGE, (args: GetStorageOptions, exec: ApiExcutor<GetStorageSuccess>)=>{
        createStore().get(args.key, '').then((storeValue)=>{
            if (!storeValue) {
                return exec.reject('data not found');
            }
            let value: Object;
            try {
                value = parseStorageValue(storeValue as string);
            } catch (error) {
                exec.reject('data parse error');
                return;
            }
            exec.resolve({
                data: value
            } as GetStorageSuccess);
        });
    }) as GetStorage;
    const setStorageSync = defineSyncApi<void>(API_SET_STORAGE_SYNC, (key: string, value: Object)=>{
        createStore().putSync(key, stringifyStorageValue(value));
    }) as SetStorageSync;
    const setStorage = defineAsyncApi<SetStorageOptions, SetStorageSuccess>(API_SET_STORAGE, (args: SetStorageOptions, exec: ApiExcutor<SetStorageSuccess>)=>{
        createStore().put(args.key, stringifyStorageValue(args.data)).then(()=>{
            exec.resolve({} as ESObject);
        }, (error: Error)=>{
            exec.reject(error.message);
        });
    }) as SetStorage;
    const removeStorageSync = defineSyncApi<void>(API_REMOVE_STORAGE_SYNC, (key: string)=>{
        createStore().deleteSync(key);
    }) as RemoveStorageSync;
    const removeStorage = defineAsyncApi<RemoveStorageOptions, RemoveStorageSuccess>(API_REMOVE_STORAGE, (args: RemoveStorageOptions, exec: ApiExcutor<RemoveStorageSuccess>)=>{
        createStore().delete(args.key).then(()=>{
            exec.resolve({} as ESObject);
        }, (error: Error)=>{
            exec.reject(error.message);
        });
    }) as RemoveStorage;
    const clearStorageSync = defineSyncApi<void>(API_CLEAR_STORAGE_SYNC, ()=>{
        createStore().clearSync();
    }) as ClearStorageSync;
    const clearStorage = defineAsyncApi<ClearStorageOptions, ClearStorageSuccess>(API_CLEAR_STORAGE, (args: ClearStorageOptions, exec: ApiExcutor<ClearStorageSuccess>)=>{
        createStore().clear().then(()=>{
            exec.resolve({} as ESObject);
        }, (error: Error)=>{
            exec.reject(error.message);
        });
    }) as ClearStorage;
    const getStorageInfoSync = defineSyncApi<GetStorageInfoSuccess>(API_GET_STORAGE_INFO_SYNC, ()=>{
        const allData = createStore().getAllSync();
        return {
            keys: Object.keys(allData),
            currentSize: 0,
            limitSize: 0
        } as GetStorageInfoSuccess;
    }) as GetStorageInfoSync;
    const getStorageInfo = defineAsyncApi<GetStorageInfoOptions, GetStorageInfoSuccess>(API_GET_STORAGE_INFO, (args: GetStorageInfoOptions, exec: ApiExcutor<GetStorageInfoSuccess>)=>{
        createStore().getAll().then((allData)=>{
            exec.resolve({
                keys: Object.keys(allData),
                currentSize: 0,
                limitSize: 0
            } as GetStorageInfoSuccess);
        });
    }) as GetStorageInfo;
    interface UniExtApi {
        chooseImage: ChooseImage;
        getImageInfo: GetImageInfo;
        chooseVideo: ChooseVideo;
        getVideoInfo: GetVideoInfo;
        setNavigationBarColor: SetNavigationBarColor;
        setNavigationBarTitle: SetNavigationBarTitle;
        pageScrollTo: PageScrollTo;
        showToast: ShowToast;
        hideToast: HideToast;
        showLoading: ShowLoading;
        hideLoading: HideLoading;
        showModal: ShowModal;
        showActionSheet: ShowActionSheet;
        setStorage: SetStorage;
        setStorageSync: SetStorageSync;
        getStorage: GetStorage;
        getStorageSync: GetStorageSync;
        getStorageInfo: GetStorageInfo;
        getStorageInfoSync: GetStorageInfoSync;
        removeStorage: RemoveStorage;
        removeStorageSync: RemoveStorageSync;
        clearStorage: ClearStorage;
        clearStorageSync: ClearStorageSync;
    }
    return {
        chooseImage,
        getImageInfo,
        chooseVideo,
        getVideoInfo,
        setNavigationBarColor,
        setNavigationBarTitle,
        pageScrollTo,
        showToast,
        hideToast,
        showLoading,
        hideLoading,
        showModal,
        showActionSheet,
        setStorage,
        setStorageSync,
        getStorage,
        getStorageSync,
        getStorageInfo,
        getStorageInfoSync,
        removeStorage,
        removeStorageSync,
        clearStorage,
        clearStorageSync
    } as UniExtApi;
}
