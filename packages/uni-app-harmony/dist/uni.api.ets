import { IUniError, UTSObject, UniError, UTSJSONObject, string, AsyncApiSuccessResult, AsyncApiResult, ComponentPublicInstance, ComponentInternalInstance } from './uts'
import { defineAsyncApi, defineSyncApi, defineTaskApi, defineOnApi, defineOffApi, ApiExcutor, ProtocolOptions, ApiOptions, ErrRes } from './uni-api-shared'

import bundleManager from '@ohos.bundle.bundleManager';
import deviceInfo from '@ohos.deviceInfo';
import display from '@ohos.display';
import fs from '@ohos.file.fs';
import picker from '@ohos.file.picker';
import image from '@ohos.multimedia.image';
import media from '@ohos.multimedia.media';
import http from '@ohos.net.http';
import promptAction from '@ohos.promptAction';
import { BusinessError as BusinessError1 } from '@ohos.base';
import { BusinessError } from '@ohos.base';
import I18n from '@ohos.i18n';
import I18n1 from '@ohos.i18n';
import I18n2 from '@ohos.i18n';
import { ReadOptions } from '@ohos.file.fs';
import { UTSHarmony as UTSHarmony1 } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
import { UTSHarmony as UTSHarmony2, getCurrentPage } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
import { UTSHarmony as UTSHarmony3 } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
import { UTSHarmony } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
import dataPreferences from '@ohos.data.preferences';
import deviceInfo1 from '@ohos.deviceInfo';
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
import { plus } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
import promptAction1 from '@ohos.promptAction';
import { resolveComponentInstance, isFunction, getCurrentPageVm, getPageIdByVm, addIntersectionObserver, removeIntersectionObserver } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
import { weex } from "../../../resources/rawfile/uni-app/uni-app-harmony-framework-dev";
import harmonyWindowType from '@ohos.window';
export function initUniExtApi(APP_ID: string) {
    type SetClipboardData = (options: SetClipboardDataOptions) => void;
    class SetClipboardDataSuccess extends UTSObject {
    }
    type SetClipboardDataSuccessCallback = (result: SetClipboardDataSuccess) => void;
    type SetClipboardDataFail = UniError;
    type SetClipboardDataFailCallback = (result: SetClipboardDataFail) => void;
    type SetClipboardDataComplete = Object;
    type SetClipboardDataCompleteCallback = (result: SetClipboardDataComplete) => void;
    class SetClipboardDataOptions extends UTSObject {
        data!: string;
        showToast: boolean | null = null;
        success: SetClipboardDataSuccessCallback | null = null;
        fail: SetClipboardDataFailCallback | null = null;
        complete: SetClipboardDataCompleteCallback | null = null;
    }
    type GetClipboardData = (options: GetClipboardDataOptions) => void;
    class GetClipboardDataSuccess extends UTSObject {
        data!: string;
    }
    type GetClipboardDataSuccessCallback = (result: GetClipboardDataSuccess) => void;
    type GetClipboardDataFail = UniError;
    type GetClipboardDataFailCallback = (result: GetClipboardDataFail) => void;
    type GetClipboardDataComplete = Object;
    type GetClipboardDataCompleteCallback = (result: GetClipboardDataComplete) => void;
    class GetClipboardDataOptions extends UTSObject {
        success: GetClipboardDataSuccessCallback | null = null;
        fail: GetClipboardDataFailCallback | null = null;
        complete: GetClipboardDataCompleteCallback | null = null;
    }
    const API_GET_CLIPBOARD_DATA = 'getClipboardData';
    const API_SET_CLIPBOARD_DATA = 'setClipboardData';
    const SetClipboardDataApiOptions: ApiOptions<SetClipboardDataOptions> = {
        formatArgs: new Map<string, boolean>([
            [
                'showToast',
                true
            ]
        ])
    };
    const SetClipboardDataProtocol = new Map<string, ProtocolOptions>([
        [
            'data',
            {
                type: 'string',
                required: true
            }
        ],
        [
            'showToast',
            {
                type: 'boolean'
            }
        ]
    ]);
    interface ClipboardModuleGetStringOptions {
        result: string;
        data: string;
    }
    interface ClipboardModule {
        getString(callback: (ret: ClipboardModuleGetStringOptions) => void): void;
        setString(data: string): void;
    }
    const getClipboardData: GetClipboardData = defineAsyncApi<GetClipboardDataOptions, GetClipboardDataSuccess>(API_GET_CLIPBOARD_DATA, (_: GetClipboardDataOptions, res: ApiExcutor<GetClipboardDataSuccess>)=>{
        const clipboard: ClipboardModule = weex.requireModule('clipboard');
        clipboard.getString((ret)=>{
            if (ret.result === 'success') {
                res.resolve({
                    data: ret.data
                } as GetClipboardDataSuccess);
            } else {
                res.reject('getClipboardData:fail');
            }
        });
    }) as GetClipboardData;
    const setClipboardData: SetClipboardData = defineAsyncApi<SetClipboardDataOptions, SetClipboardDataSuccess>(API_SET_CLIPBOARD_DATA, (options: SetClipboardDataOptions, res: ApiExcutor<SetClipboardDataSuccess>)=>{
        const clipboard: ClipboardModule = weex.requireModule('clipboard');
        clipboard.setString(options.data);
        res.resolve();
    }, SetClipboardDataProtocol, SetClipboardDataApiOptions) as SetClipboardData;
    type CreateIntersectionObserver = (component: Object, options: CreateIntersectionObserverOptions) => IntersectionObserver;
    interface CreateIntersectionObserverOptions {
        thresholds?: (Object[]) | null;
        initialRatio?: number | null;
        observeAll?: boolean | null;
    }
    class ObserveNodeRect extends UTSObject {
        left!: number;
        right!: number;
        top!: number;
        bottom!: number;
    }
    class ObserveResult extends UTSObject {
        intersectionRatio!: number;
        intersectionRect!: Object;
        boundingClientRect!: ObserveNodeRect;
        relativeRect!: ObserveNodeRect;
        time!: number;
    }
    type ObserveCallback = (result: ObserveResult) => void;
    interface IntersectionObserver {
        relativeTo(selector: string, margins?: Object): IntersectionObserver;
        relativeToViewport(margins?: Object): IntersectionObserver;
        observe(targetSelector: string, callback: ObserveCallback): void;
        disconnect(): void;
    }
    interface AddIntersectionObserverArgs {
        reqId: number;
        component: ComponentPublicInstance;
        options: ServiceIntersectionObserverOptions;
        callback: ObserveCallback;
    }
    interface RemoveIntersectionObserverArgs {
        reqId: number;
        component: ComponentPublicInstance;
    }
    interface RequestComponentObserverOptions {
        selector?: string;
        rootMargin?: string;
        relativeToSelector?: string;
    }
    interface ServiceIntersectionObserverOptions extends CreateIntersectionObserverOptions, RequestComponentObserverOptions {
    }
    interface Margins {
        bottom?: number;
        left?: number;
        right?: number;
        top?: number;
    }
    const defaultOptions = {
        thresholds: [
            0
        ],
        initialRatio: 0,
        observeAll: false
    } as CreateIntersectionObserverOptions;
    let reqComponentObserverId = 1;
    const normalizeRootMargin = (margins: Margins | null = {})=>{
        if (!margins) margins = {};
        const top = Number(margins.top) || 0;
        const right = Number(margins.right) || 0;
        const bottom = Number(margins.bottom) || 0;
        const left = Number(margins.left) || 0;
        return `${top}px ${right}px ${bottom}px ${left}px`;
    };
    class ServiceIntersectionObserver {
        private _reqId?: number;
        private _pageId: number;
        private _component: ComponentPublicInstance;
        private _options: ServiceIntersectionObserverOptions;
        constructor(component: ComponentPublicInstance, options: CreateIntersectionObserverOptions | null = null){
            this._pageId = getPageIdByVm(component)!;
            this._component = component;
            if (options) {
                if (typeof options.thresholds === 'undefined') options.thresholds = defaultOptions.thresholds;
                if (typeof options.initialRatio === 'undefined') options.initialRatio = defaultOptions.initialRatio;
                if (typeof options.observeAll === 'undefined') options.observeAll = defaultOptions.observeAll;
            }
            this._options = (options ?? defaultOptions) as ServiceIntersectionObserverOptions;
        }
        relativeTo(selector: string, margins: Margins | null = null) {
            this._options.relativeToSelector = selector;
            this._options.rootMargin = normalizeRootMargin(margins);
            return this;
        }
        relativeToViewport(margins: Margins | null = null) {
            this._options.relativeToSelector = undefined;
            this._options.rootMargin = normalizeRootMargin(margins);
            return this;
        }
        observe(selector: string, callback: ObserveCallback) {
            if (!isFunction(callback)) {
                return;
            }
            this._options.selector = selector;
            this._reqId = reqComponentObserverId++;
            addIntersectionObserver({
                reqId: this._reqId,
                component: this._component,
                options: this._options,
                callback
            } as AddIntersectionObserverArgs, this._pageId);
        }
        disconnect() {
            this._reqId && removeIntersectionObserver({
                reqId: this._reqId,
                component: this._component
            } as RemoveIntersectionObserverArgs, this._pageId);
        }
    }
    const createIntersectionObserver = defineSyncApi<CreateIntersectionObserver>('createIntersectionObserver', (context: ComponentPublicInstance | null, options: CreateIntersectionObserverOptions | null = null)=>{
        let _options: ComponentPublicInstance | CreateIntersectionObserverOptions | null = options;
        context = resolveComponentInstance(context);
        if (context && !getPageIdByVm(context)) {
            _options = context;
            context = null;
        }
        if (context) {
            return new ServiceIntersectionObserver(context as ComponentPublicInstance, _options as CreateIntersectionObserverOptions);
        }
        return new ServiceIntersectionObserver(getCurrentPageVm()!, _options as CreateIntersectionObserverOptions);
    });
    class GetAppBaseInfoOptions extends UTSObject {
        filter: Array<string> | null = null;
    }
    class GetAppBaseInfoResult extends UTSObject {
        appId: string | null = null;
        appName: string | null = null;
        appVersion: string | null = null;
        appVersionCode: string | null = null;
        appLanguage: string | null = null;
        language: string | null = null;
        version: string | null = null;
        appWgtVersion: string | null = null;
        hostLanguage: string | null = null;
        hostVersion: string | null = null;
        hostName: string | null = null;
        hostPackageName: string | null = null;
        hostSDKVersion: string | null = null;
        hostTheme: string | null = null;
        isUniAppX: boolean | null = null;
        uniCompileVersion: string | null = null;
        uniCompilerVersion: string | null = null;
        uniPlatform: 'app' | 'web' | 'mp-weixin' | 'mp-alipay' | 'mp-baidu' | 'mp-toutiao' | 'mp-lark' | 'mp-qq' | 'mp-kuaishou' | 'mp-jd' | 'mp-360' | 'quickapp-webview' | 'quickapp-webview-union' | 'quickapp-webview-huawei' | null = null;
        uniRuntimeVersion: string | null = null;
        uniCompileVersionCode: number | null = null;
        uniCompilerVersionCode: number | null = null;
        uniRuntimeVersionCode: number | null = null;
        packageName: string | null = null;
        bundleId: string | null = null;
        signature: string | null = null;
        appTheme: 'light' | 'dark' | 'auto' | null = null;
    }
    type GetAppBaseInfo = (options?: GetAppBaseInfoOptions | null) => GetAppBaseInfoResult;
    const API_GET_APP_BASE_INFO = 'getAppBaseInfo';
    const getBundleInfoOnce = ()=>{
        let bundleInfo: bundleManager.BundleInfo | null = null;
        return (): bundleManager.BundleInfo =>{
            if (bundleInfo) {
                return bundleInfo;
            }
            bundleInfo = bundleManager.getBundleInfoForSelfSync(bundleManager.BundleFlag.GET_BUNDLE_INFO_DEFAULT);
            return bundleInfo;
        };
    };
    const getBundleInfo = getBundleInfoOnce();
    interface IAppBaseInfoAppVersion {
        name: string;
        code: string;
    }
    const getAppBaseInfo: GetAppBaseInfo = defineSyncApi<GetAppBaseInfoResult>(API_GET_APP_BASE_INFO, (): GetAppBaseInfoResult =>{
        const appVersion: IAppBaseInfoAppVersion = UTSHarmony.getAppVersion();
        const appLanguage = I18n.System.getAppPreferredLanguage();
        const uniCompilerVersion: string = UTSHarmony.getUniCompilerVersion();
        const uniRuntimeVersion: string = UTSHarmony.getUniRuntimeVersion();
        return {
            appId: UTSHarmony.getAppId() as string,
            appLanguage,
            appName: UTSHarmony.getAppName() as string,
            appTheme: UTSHarmony.getAppTheme() as string,
            appVersion: appVersion.name,
            appVersionCode: appVersion.code,
            appWgtVersion: appVersion.name,
            hostLanguage: I18n.System.getSystemLanguage(),
            isUniAppX: UTSHarmony.isUniAppX() as boolean,
            packageName: getBundleInfo().name,
            uniCompilerVersion: uniCompilerVersion,
            uniCompilerVersionCode: parseFloat(uniCompilerVersion),
            uniRuntimeVersion: uniRuntimeVersion,
            uniRuntimeVersionCode: parseFloat(uniRuntimeVersion),
            uniPlatform: 'app'
        } as GetAppBaseInfoResult;
    }) as GetAppBaseInfo;
    class GetDeviceInfoOptions extends UTSObject {
        filter!: Array<string>;
    }
    class GetDeviceInfoResult extends UTSObject {
        brand: string | null = null;
        deviceBrand: string | null = null;
        deviceId: string | null = null;
        model: string | null = null;
        deviceModel: string | null = null;
        deviceType: string | null = null;
        deviceOrientation: string | null = null;
        devicePixelRatio: string | null = null;
        system: string | null = null;
        platform: string | null = null;
        isRoot: boolean | null = null;
        isSimulator: boolean | null = null;
        isUSBDebugging: boolean | null = null;
        osName: 'ios' | 'android' | 'harmony' | 'macos' | 'windows' | 'linux' | null = null;
        osVersion: string | null = null;
        osLanguage: string | null = null;
        osTheme: 'light' | 'dark' | null = null;
        osAndroidAPILevel: number | null = null;
        romName: string | null = null;
        romVersion: string | null = null;
    }
    type GetDeviceInfo = (options?: GetDeviceInfoOptions | null) => GetDeviceInfoResult;
    const API_GET_DEVICE_INFO = 'getDeviceInfo';
    const getDeviceInfo: GetDeviceInfo = defineSyncApi<GetDeviceInfoResult>(API_GET_DEVICE_INFO, (): GetDeviceInfoResult =>{
        return {
            deviceBrand: deviceInfo.brand,
            deviceId: '',
            deviceModel: deviceInfo.productModel,
            deviceOrientation: 'portrait',
            devicePixelRatio: vp2px(1) + '',
            deviceType: deviceInfo.deviceType === 'tablet' ? 'pad' : deviceInfo.deviceType,
            osLanguage: I18n1.System.getSystemLanguage(),
            osTheme: UTSHarmony1.getOsTheme() as string,
            osVersion: deviceInfo.buildVersion + '',
            osName: 'harmony',
            platform: 'app',
            romName: deviceInfo.distributionOSName,
            romVersion: deviceInfo.distributionOSVersion,
            system: deviceInfo.osFullName
        } as GetDeviceInfoResult;
    }) as GetDeviceInfo;
    type GetSystemInfo = (options: GetSystemInfoOptions) => void;
    type GetSystemInfoSync = () => GetSystemInfoResult;
    type GetWindowInfo = () => GetWindowInfoResult;
    class SafeArea extends UTSObject {
        left!: number;
        right!: number;
        top!: number;
        bottom!: number;
        width!: number;
        height!: number;
    }
    class SafeAreaInsets extends UTSObject {
        left!: number;
        right!: number;
        top!: number;
        bottom!: number;
    }
    class GetSystemInfoResult extends UTSObject {
        SDKVersion!: string;
        appId!: string;
        appLanguage!: string;
        appName!: string;
        appVersion!: string;
        appVersionCode!: string;
        appWgtVersion: string | null = null;
        brand!: string;
        browserName!: string;
        browserVersion!: string;
        deviceId!: string;
        deviceBrand!: string;
        deviceModel!: string;
        deviceType!: 'phone' | 'pad' | 'tv' | 'watch' | 'pc' | 'undefined' | 'car' | 'vr' | 'appliance';
        devicePixelRatio!: number;
        deviceOrientation!: 'portrait' | 'landscape';
        language!: string;
        model: string | null = null;
        osName!: 'ios' | 'android' | 'harmony' | 'macos' | 'windows' | 'linux';
        osVersion!: string;
        osLanguage!: string;
        osTheme: 'light' | 'dark' | null = null;
        pixelRatio!: number;
        platform!: 'ios' | 'android' | 'harmony' | 'mac' | 'windows' | 'linux';
        screenWidth!: number;
        screenHeight!: number;
        statusBarHeight!: number;
        system!: string;
        safeArea!: SafeArea;
        safeAreaInsets!: SafeAreaInsets;
        ua!: string;
        uniCompileVersion!: string;
        uniCompilerVersion!: string;
        uniPlatform!: 'app' | 'web' | 'mp-weixin' | 'mp-alipay' | 'mp-baidu' | 'mp-toutiao' | 'mp-lark' | 'mp-qq' | 'mp-kuaishou' | 'mp-jd' | 'mp-360' | 'quickapp-webview' | 'quickapp-webview-union' | 'quickapp-webview-huawei';
        uniRuntimeVersion!: string;
        uniCompileVersionCode!: number;
        uniCompilerVersionCode!: number;
        uniRuntimeVersionCode!: number;
        version!: string;
        romName!: string;
        romVersion!: string;
        windowWidth!: number;
        windowHeight!: number;
        windowTop!: number;
        windowBottom!: number;
        osAndroidAPILevel: number | null = null;
        appTheme: 'light' | 'dark' | 'auto' | null = null;
    }
    type GetSystemInfoSuccessCallback = (result: GetSystemInfoResult) => void;
    type GetSystemInfoFail = UniError;
    type GetSystemInfoFailCallback = (result: GetSystemInfoFail) => void;
    type GetSystemInfoComplete = Object;
    type GetSystemInfoCompleteCallback = (result: GetSystemInfoComplete) => void;
    class GetSystemInfoOptions extends UTSObject {
        success: GetSystemInfoSuccessCallback | null = null;
        fail: GetSystemInfoFailCallback | null = null;
        complete: GetSystemInfoCompleteCallback | null = null;
    }
    class GetWindowInfoResult extends UTSObject {
        pixelRatio!: number;
        screenWidth!: number;
        screenHeight!: number;
        windowWidth!: number;
        windowHeight!: number;
        statusBarHeight!: number;
        windowTop!: number;
        windowBottom!: number;
        safeArea!: SafeArea;
        safeAreaInsets!: SafeAreaInsets;
        screenTop!: number;
    }
    const API_GET_SYSTEM_INFO = 'getSystemInfo';
    const API_GET_SYSTEM_INFO_SYNC = 'getSystemInfoSync';
    const API_GET_WINDOW_INFO = 'getWindowInfo';
    const parseDeviceType = (deviceType: string): 'phone' | 'pad' | 'tv' | 'watch' | 'pc' | 'undefined' | 'car' | 'vr' | 'appliance' =>{
        switch(deviceType){
            case 'phone':
                return 'phone';
            case 'tablet':
                return 'pad';
            case '2in1':
                return 'pc';
            case 'tv':
                return 'tv';
            case 'car':
                return 'car';
            case 'wearable':
                return 'watch';
            default:
                return 'undefined';
        }
    };
    const internalGetWindowInfo = (): GetWindowInfoResult =>{
        const pixelRatio = vp2px(1);
        const avoidArea: harmonyWindowType.AvoidArea = UTSHarmony2.getAvoidArea();
        const defaultDisplay = display.getDefaultDisplaySync();
        const currentPage: ESObject = getCurrentPage();
        const navigationBarHeight = currentPage.$page.meta.navigationBar.type === 'default' ? 56 : 0;
        const tabBarHeight = currentPage.$.__isTabBar ? 50 : 0;
        const screenWidth = px2vp(defaultDisplay.width);
        const screenHeight = px2vp(defaultDisplay.height);
        const safeAreaTopSize = px2vp(avoidArea.topRect.top + avoidArea.topRect.height) + navigationBarHeight;
        const safeAreaBottomSize = px2vp(avoidArea.bottomRect.height) + tabBarHeight;
        const safeAreaLeftSize = px2vp(avoidArea.leftRect.left + avoidArea.leftRect.width);
        const safeAreaRightSize = px2vp(avoidArea.rightRect.width);
        const safeAreaInsets: SafeAreaInsets = {
            top: safeAreaTopSize,
            right: safeAreaRightSize,
            bottom: safeAreaBottomSize,
            left: safeAreaLeftSize
        };
        const safeArea: SafeArea = {
            top: safeAreaInsets.top,
            right: screenWidth - safeAreaRightSize,
            bottom: screenHeight - safeAreaBottomSize,
            left: safeAreaInsets.left,
            width: screenWidth - safeAreaLeftSize - safeAreaRightSize,
            height: screenHeight - safeAreaTopSize - safeAreaBottomSize
        };
        return {
            pixelRatio,
            screenTop: 0,
            screenWidth,
            screenHeight,
            windowTop: 0,
            windowBottom: 0,
            windowWidth: safeArea.width,
            windowHeight: safeArea.height,
            safeAreaInsets,
            safeArea,
            statusBarHeight: safeAreaTopSize
        };
    };
    const getWindowInfo: GetWindowInfo = defineSyncApi<GetWindowInfoResult>(API_GET_WINDOW_INFO, (): GetWindowInfoResult =>{
        return internalGetWindowInfo();
    }) as GetWindowInfo;
    interface ISystemInfoAppVersion {
        name: string;
        code: string;
    }
    const internalGetSystemInfo = (): GetSystemInfoResult =>{
        const appVersion: ISystemInfoAppVersion = UTSHarmony2.getAppVersion();
        const appLanguage = I18n2.System.getAppPreferredLanguage();
        const uniCompilerVersion: string = UTSHarmony2.getUniCompilerVersion();
        const uniCompilerVersionCode: number = parseFloat(uniCompilerVersion);
        const uniRuntimeVersion: string = UTSHarmony2.getUniRuntimeVersion();
        const windowInfo = internalGetWindowInfo();
        const pixelRatio = windowInfo.pixelRatio;
        const safeArea = windowInfo.safeArea;
        const safeAreaInsets = windowInfo.safeAreaInsets;
        const screenHeight = windowInfo.screenHeight;
        const screenWidth = windowInfo.screenWidth;
        const statusBarHeight = windowInfo.statusBarHeight;
        const windowBottom = windowInfo.windowBottom;
        const windowHeight = windowInfo.windowHeight;
        const windowTop = windowInfo.windowTop;
        const windowWidth = windowInfo.windowWidth;
        return {
            appId: UTSHarmony2.getAppId() as string,
            appLanguage,
            appName: UTSHarmony2.getAppName() as string,
            appTheme: UTSHarmony2.getAppTheme() as string,
            appVersion: appVersion.name,
            appVersionCode: appVersion.code,
            appWgtVersion: appVersion.name,
            uniCompilerVersion: uniCompilerVersion,
            uniCompilerVersionCode: uniCompilerVersionCode,
            uniRuntimeVersion: uniRuntimeVersion,
            uniRuntimeVersionCode: parseFloat(uniRuntimeVersion),
            uniPlatform: 'app',
            deviceBrand: deviceInfo1.brand,
            deviceId: '',
            deviceModel: deviceInfo1.productModel,
            deviceOrientation: 'portrait',
            devicePixelRatio: vp2px(1),
            deviceType: parseDeviceType(deviceInfo1.deviceType),
            osLanguage: I18n2.System.getSystemLanguage(),
            osTheme: UTSHarmony2.getOsTheme() as string,
            osVersion: deviceInfo1.buildVersion + '',
            osName: 'harmony',
            romName: deviceInfo1.distributionOSName,
            romVersion: deviceInfo1.distributionOSVersion,
            system: deviceInfo1.osFullName,
            pixelRatio,
            safeArea,
            safeAreaInsets,
            screenHeight,
            screenWidth,
            statusBarHeight,
            windowBottom,
            windowHeight,
            windowTop,
            windowWidth,
            SDKVersion: '',
            browserName: '',
            browserVersion: '',
            ua: '',
            language: appLanguage,
            brand: deviceInfo1.brand,
            model: '',
            platform: 'harmony',
            uniCompileVersion: uniCompilerVersion,
            uniCompileVersionCode: uniCompilerVersionCode,
            version: ''
        } as GetSystemInfoResult;
    };
    const getSystemInfoSync: GetSystemInfoSync = defineSyncApi<GetSystemInfoResult>(API_GET_SYSTEM_INFO_SYNC, (): GetSystemInfoResult =>{
        return internalGetSystemInfo();
    }) as GetSystemInfoSync;
    const getSystemInfo: GetSystemInfo = defineAsyncApi<GetSystemInfoOptions, GetSystemInfoResult>(API_GET_SYSTEM_INFO, (options: GetSystemInfoOptions, exec: ApiExcutor<GetSystemInfoResult>)=>{
        try {
            exec.resolve(internalGetSystemInfo());
        } catch (error) {
            exec.reject((error as Error).message);
        }
    }) as GetSystemInfo;
    type MakePhoneCall = (options: MakePhoneCallOptions) => void;
    class MakePhoneCallSuccess extends UTSObject {
    }
    class UniError1 extends UTSObject {
        errSubject!: string;
        errCode!: number;
        errMsg!: string;
        data: object | null = null;
        cause: Object | null = null;
    }
    type MakePhoneCallSuccessCallback = (result: MakePhoneCallSuccess) => void;
    type MakePhoneCallFail = UniError1;
    type MakePhoneCallFailCallback = (result: MakePhoneCallFail) => void;
    type MakePhoneCallComplete = Object;
    type MakePhoneCallCompleteCallback = (result: MakePhoneCallComplete) => void;
    class MakePhoneCallOptions extends UTSObject {
        phoneNumber!: string;
        success: MakePhoneCallSuccessCallback | null = null;
        fail: MakePhoneCallFailCallback | null = null;
        complete: MakePhoneCallCompleteCallback | null = null;
    }
    const API_MAKE_PHONE_CALL = 'makePhoneCall';
    const MakePhoneCallProtocol = new Map<string, ProtocolOptions>([
        [
            'phoneNumber',
            {
                type: 'string',
                required: true
            }
        ]
    ]);
    const isPromise = (res: Object)=>{
        if ((typeof res === "object" || typeof res === "function") && typeof (res as Promise<void>).then === "function") {
            return true;
        }
        return false;
    };
    const makePhoneCall: MakePhoneCall = defineAsyncApi<MakePhoneCallOptions, MakePhoneCallSuccess>(API_MAKE_PHONE_CALL, (options: MakePhoneCallOptions, res: ApiExcutor<MakePhoneCallSuccess>)=>{
        const dialRes = plus.device.dial(options.phoneNumber) as Object as Promise<void>;
        if (isPromise(dialRes)) {
            dialRes.then(res.resolve).catch((err: BusinessError<void>)=>{
                res.reject(err.message);
            });
        } else {
            res.resolve();
        }
    }, MakePhoneCallProtocol) as MakePhoneCall;
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
        let cookiesArr: string[] = [];
        const handleCookiesArr = (header['Set-Cookie'] || header['set-cookie'] || []) as string[];
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
            let message = (error as BusinessError1).message;
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
    type Rpx2px = (number: number) => number;
    const API_RPX2PX = 'rpx2px';
    const EPS = 1e-4;
    const rpx2px: Rpx2px = defineSyncApi<number>(API_RPX2PX, (number: number): number =>{
        const windowStage: harmonyWindowType.WindowStage = UTSHarmony3.getWindowStage();
        const mainWindow: harmonyWindowType.Window = windowStage.getMainWindowSync();
        const windowWidthInPx: number = mainWindow.getWindowProperties().windowRect.width;
        const windowWidthInVp: number = px2vp(windowWidthInPx);
        let result = (number / 750) * windowWidthInVp;
        if (result < 0) {
            result = -result;
        }
        result = Math.floor(result + EPS);
        if (result == 0) {
            if (windowWidthInPx == windowWidthInVp) {
                result = 1;
            } else {
                result = 0.5;
            }
        }
        return number < 0 ? -result : result;
    }) as Rpx2px;
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
        getClipboardData: GetClipboardData;
        setClipboardData: SetClipboardData;
        createIntersectionObserver: CreateIntersectionObserver;
        getAppBaseInfo: GetAppBaseInfo;
        getDeviceInfo: GetDeviceInfo;
        getSystemInfo: GetSystemInfo;
        getSystemInfoSync: GetSystemInfoSync;
        getWindowInfo: GetWindowInfo;
        makePhoneCall: MakePhoneCall;
        chooseImage: ChooseImage;
        getImageInfo: GetImageInfo;
        chooseVideo: ChooseVideo;
        getVideoInfo: GetVideoInfo;
        request: Request<Object>;
        uploadFile: UploadFile;
        downloadFile: DownloadFile;
        showToast: ShowToast;
        hideToast: HideToast;
        showLoading: ShowLoading;
        hideLoading: HideLoading;
        showModal: ShowModal;
        showActionSheet: ShowActionSheet;
        rpx2px: Rpx2px;
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
        getClipboardData,
        setClipboardData,
        createIntersectionObserver,
        getAppBaseInfo,
        getDeviceInfo,
        getSystemInfo,
        getSystemInfoSync,
        getWindowInfo,
        makePhoneCall,
        chooseImage,
        getImageInfo,
        chooseVideo,
        getVideoInfo,
        request,
        uploadFile,
        downloadFile,
        showToast,
        hideToast,
        showLoading,
        hideLoading,
        showModal,
        showActionSheet,
        rpx2px,
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
