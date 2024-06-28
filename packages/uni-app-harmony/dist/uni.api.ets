import { IUTSObject, UTSObject, UTSJSONObject } from '@dcloudio/uts-harmony'
import { IUniError, UniError, string, ComponentPublicInstance, ComponentInternalInstance, defineAsyncApi, defineSyncApi, defineTaskApi, defineOnApi, defineOffApi, getUniProvider, getUniProviders, AsyncApiSuccessResult, AsyncApiResult, ApiExecutor, ProtocolOptions, ApiOptions, ApiError, UniProvider } from '@dcloudio/uni-app-harmony'

import abilityAccessCtrl from '@ohos.abilityAccessCtrl';
import Want from '@ohos.app.ability.Want';
import common from '@ohos.app.ability.common';
import bundleManager from '@ohos.bundle.bundleManager';
import deviceInfo from '@ohos.deviceInfo';
import fs from '@ohos.file.fs';
import photoAccessHelper from '@ohos.file.photoAccessHelper';
import picker from '@ohos.file.picker';
import image from '@ohos.multimedia.image';
import media from '@ohos.multimedia.media';
import http from '@ohos.net.http';
import webSocket from '@ohos.net.webSocket';
import promptAction from '@ohos.promptAction';
import { BusinessError as BusinessError1 } from '@ohos.base';
import { BusinessError } from '@ohos.base';
import I18n from '@ohos.i18n';
import I18n1 from '@ohos.i18n';
import I18n2 from '@ohos.i18n';
import { ReadOptions } from '@ohos.file.fs';
import { UTSHarmony as UTSHarmony1 } from "@dcloudio/uni-app-harmony-framework";
import { UTSHarmony as UTSHarmony2, getWindowInfo as internalGetWindowInfo } from "@dcloudio/uni-app-harmony-framework";
import { UTSHarmony as UTSHarmony3 } from "@dcloudio/uni-app-harmony-framework";
import { UTSHarmony } from "@dcloudio/uni-app-harmony-framework";
import { UniServiceJSBridge, getCurrentPageVm as getCurrentPageVm2, getPageIdByVm as getPageIdByVm2 } from "@dcloudio/uni-app-harmony-framework";
import bundleManager1 from '@ohos.bundle.bundleManager';
import { clipboard } from "@dcloudio/uni-app-harmony-framework";
import dataPreferences from '@ohos.data.preferences';
import { device } from "@dcloudio/uni-app-harmony-framework";
import deviceInfo1 from '@ohos.deviceInfo';
import fs1 from '@ohos.file.fs';
import fs2 from '@ohos.file.fs';
import fs3 from '@ohos.file.fs';
import { getCurrentPage as getCurrentPage1, navigator } from "@dcloudio/uni-app-harmony-framework";
import { getCurrentPageVm as getCurrentPageVm1, getPageIdByVm as getPageIdByVm1, isFunction as isFunction1, requestComponentInfo, resolveComponentInstance as resolveComponentInstance1 } from "@dcloudio/uni-app-harmony-framework";
import { getEnv, Emitter as Emitter2 } from "@dcloudio/uni-app-harmony-framework";
import { getOSRuntime, getCurrentPage } from "@dcloudio/uni-app-harmony-framework";
import { getRealPath as getRealPath1 } from "@dcloudio/uni-app-harmony-framework";
import { getRealPath as getRealPath2 } from "@dcloudio/uni-app-harmony-framework";
import { getRealPath as getRealPath3, Emitter as Emitter1 } from "@dcloudio/uni-app-harmony-framework";
import { getRealPath } from "@dcloudio/uni-app-harmony-framework";
import { getResourceStr } from "@dcloudio/uni-app-harmony-framework";
import harmonyWindow from '@ohos.window';
import http1 from '@ohos.net.http';
import http2 from '@ohos.net.http';
import { isPlainObject, Emitter } from "@dcloudio/uni-app-harmony-framework";
import picker1 from '@ohos.file.picker';
import picker2 from '@ohos.file.picker';
import picker3 from '@ohos.file.picker';
import promptAction1 from '@ohos.promptAction';
import { resolveComponentInstance, isFunction, getCurrentPageVm, getPageIdByVm, addIntersectionObserver, removeIntersectionObserver } from "@dcloudio/uni-app-harmony-framework";
export type Rpx2px = (number: number) => number;
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
    const getClipboardData: GetClipboardData = defineAsyncApi<GetClipboardDataOptions, GetClipboardDataSuccess>(API_GET_CLIPBOARD_DATA, (_: GetClipboardDataOptions, res: ApiExecutor<GetClipboardDataSuccess>)=>{
        clipboard.getString((ret: ClipboardModuleGetStringOptions)=>{
            if (ret.result === 'success') {
                res.resolve({
                    data: ret.data
                } as GetClipboardDataSuccess);
            } else {
                res.reject('getClipboardData:fail');
            }
        });
    }) as GetClipboardData;
    const setClipboardData: SetClipboardData = defineAsyncApi<SetClipboardDataOptions, SetClipboardDataSuccess>(API_SET_CLIPBOARD_DATA, (options: SetClipboardDataOptions, res: ApiExecutor<SetClipboardDataSuccess>)=>{
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
    const createIntersectionObserver = defineSyncApi<IntersectionObserver>('createIntersectionObserver', (context: ComponentPublicInstance | null, options: CreateIntersectionObserverOptions | null = null)=>{
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
    }) as CreateIntersectionObserver;
    type CreateSelectorQuery = () => SelectorQuery;
    type SelectorQueryNodeInfoCallback = (result: Object) => void;
    class NodeField extends UTSObject {
        id: boolean | null = null;
        dataset: boolean | null = null;
        rect: boolean | null = null;
        size: boolean | null = null;
        scrollOffset: boolean | null = null;
        properties: string[] | null = null;
        computedStyle: string[] | null = null;
        context: boolean | null = null;
        node: boolean | null = null;
    }
    interface NodesRef {
        boundingClientRect(callback: SelectorQueryNodeInfoCallback | null): SelectorQuery;
        boundingClientRect(): SelectorQuery;
        scrollOffset(callback: SelectorQueryNodeInfoCallback): SelectorQuery;
        fields(fields: NodeField, callback: SelectorQueryNodeInfoCallback): SelectorQuery;
        context(callback: SelectorQueryNodeInfoCallback): SelectorQuery;
        node(callback: (result: Object) => void): SelectorQuery;
    }
    interface SelectorQuery {
        in(component: Object | null): SelectorQuery;
        select(selector: string): NodesRef;
        selectAll(selector: string): NodesRef;
        selectViewport(): NodesRef;
        exec(callback: (result: Array<Object>) => void | null): NodesRef | null;
        exec(): NodesRef | null;
    }
    interface SelectorQueryRequest {
        component: ComponentPublicInstance | undefined | null;
        selector: string;
        single: boolean;
        fields: NodeField;
    }
    class NodesRefImpl implements NodesRef {
        private _selectorQuery: SelectorQueryImpl;
        private _component: ComponentPublicInstance | null | undefined;
        private _selector: string;
        private _single: boolean;
        constructor(selectorQuery: SelectorQueryImpl, component: ComponentPublicInstance | null | undefined, selector: string, single: boolean){
            this._selectorQuery = selectorQuery;
            this._component = component;
            this._selector = selector;
            this._single = single;
        }
        boundingClientRect(callback: SelectorQueryNodeInfoCallback | null = null): SelectorQuery {
            this._selectorQuery._push(this._selector, this._component, this._single, {
                id: true,
                dataset: true,
                rect: true,
                size: true
            } as NodeField, callback);
            return this._selectorQuery;
        }
        fields(fields: NodeField, callback: SelectorQueryNodeInfoCallback): SelectorQuery {
            this._selectorQuery._push(this._selector, this._component, this._single, fields, callback);
            return this._selectorQuery;
        }
        scrollOffset(callback: SelectorQueryNodeInfoCallback): SelectorQuery {
            this._selectorQuery._push(this._selector, this._component, this._single, {
                id: true,
                dataset: true,
                scrollOffset: true
            } as NodeField, callback);
            return this._selectorQuery;
        }
        context(callback: SelectorQueryNodeInfoCallback): SelectorQuery {
            this._selectorQuery._push(this._selector, this._component, this._single, {
                context: true
            } as NodeField, callback);
            return this._selectorQuery;
        }
        node(callback: (result: Object) => void): SelectorQuery {
            this._selectorQuery._push(this._selector, this._component, this._single, {
                node: true
            } as NodeField, callback);
            return this._selectorQuery;
        }
    }
    class SelectorQueryImpl implements SelectorQuery {
        private _page: ComponentPublicInstance;
        private _queue: Array<SelectorQueryRequest>;
        private _component?: ComponentPublicInstance = undefined;
        private _queueCb: Array<SelectorQueryNodeInfoCallback>;
        private _nodesRef?: NodesRef;
        constructor(page: ComponentPublicInstance){
            this._page = page;
            this._queue = [];
            this._queueCb = [];
        }
        exec(callback: ((result: Array<Object>) => void | null) | null = null): NodesRef | null {
            requestComponentInfo(this._page, this._queue, (res: Array<Object>)=>{
                const queueCbs = this._queueCb;
                res.forEach((result: Object, index: number)=>{
                    const queueCb = queueCbs[index];
                    if (isFunction1(queueCb)) {
                        queueCb(result);
                    }
                });
                if (isFunction1(callback)) {
                    callback!(res);
                }
            });
            return this._nodesRef as NodesRef;
        }
        in(component: ComponentPublicInstance | ComponentInternalInstance | null = null): SelectorQuery {
            this._component = resolveComponentInstance1(component);
            return this;
        }
        select(selector: string): NodesRef {
            return this._nodesRef = new NodesRefImpl(this, this._component, selector, true) as NodesRef;
        }
        selectAll(selector: string): NodesRef {
            return this._nodesRef = new NodesRefImpl(this, this._component, selector, false) as NodesRef;
        }
        selectViewport(): NodesRef {
            return this._nodesRef = new NodesRefImpl(this, null, '', true) as NodesRef;
        }
        _push(selector: string, component: ComponentPublicInstance | undefined | null, single: boolean, fields: NodeField, callback: SelectorQueryNodeInfoCallback | null = null) {
            this._queue.push({
                component,
                selector,
                single,
                fields
            } as SelectorQueryRequest);
            callback && this._queueCb.push(callback);
        }
    }
    const createSelectorQuery = defineSyncApi<SelectorQuery>('createSelectorQuery', (context: ComponentInternalInstance | ComponentPublicInstance | null = null)=>{
        context = resolveComponentInstance1(context);
        if (context && !getPageIdByVm1(context)) {
            context = null;
        }
        return new SelectorQueryImpl(context || getCurrentPageVm1()!) as SelectorQuery;
    }) as CreateSelectorQuery;
    class GetAppBaseInfoOptions extends UTSObject {
        filter!: Array<string>;
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
        deviceType: 'phone' | 'pad' | 'tv' | 'watch' | 'pc' | 'undefined' | 'car' | 'vr' | 'appliance' | null = null;
        deviceOrientation: string | null = null;
        devicePixelRatio: number | null = null;
        system: string | null = null;
        platform: 'ios' | 'android' | 'harmony' | 'mac' | 'windows' | 'linux' | null = null;
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
            devicePixelRatio: vp2px(1),
            deviceType: deviceInfo.deviceType === 'tablet' ? 'pad' : deviceInfo.deviceType,
            osLanguage: I18n1.System.getSystemLanguage(),
            osTheme: UTSHarmony1.getOsTheme() as string,
            osVersion: deviceInfo.buildVersion + '',
            osName: 'harmony',
            platform: 'harmony',
            romName: deviceInfo.distributionOSName,
            romVersion: deviceInfo.distributionOSVersion,
            system: deviceInfo.osFullName
        } as GetDeviceInfoResult;
    }) as GetDeviceInfo;
    class GetProviderSuccess extends UTSObject {
        service!: 'payment';
        provider!: string[];
        providers!: UniProvider[];
        errMsg!: string;
    }
    type GetProviderSuccessCallback = (result: GetProviderSuccess) => void;
    type GetProviderFail = UniError;
    type GetProviderFailCallback = (result: GetProviderFail) => void;
    type GetProviderComplete = Object;
    type GetProviderCompleteCallback = (result: GetProviderComplete) => void;
    class GetProviderOptions extends UTSObject {
        service!: 'payment';
        success: GetProviderSuccessCallback | null = null;
        fail: GetProviderFailCallback | null = null;
        complete: GetProviderCompleteCallback | null = null;
    }
    type GetProvider = (options: GetProviderOptions) => void;
    const SupportedProviderServiceList = [
        'oauth',
        'share',
        'payment',
        'push',
        'location'
    ];
    const getProvider: GetProvider = (options: GetProviderOptions): void =>{
        if (!SupportedProviderServiceList.includes(options.service)) {
            const uniError = new UniError('uni-getProvider', -1, 'Parameter service invalid.');
            options.fail?.(uniError);
            options.complete?.(uniError);
        } else {
            const providers = getUniProviders(options.service);
            const result = {
                service: options.service,
                provider: providers.map((provider): string =>{
                    return provider.id;
                }),
                providers,
                errMsg: 'GetProvider:ok'
            } as GetProviderSuccess;
            options.success?.(result);
            options.complete?.(result);
        }
    };
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
    const getWindowInfo: GetWindowInfo = defineSyncApi<GetWindowInfoResult>(API_GET_WINDOW_INFO, (): GetWindowInfoResult =>{
        return internalGetWindowInfo() as GetWindowInfoResult;
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
    const getSystemInfo: GetSystemInfo = defineAsyncApi<GetSystemInfoOptions, GetSystemInfoResult>(API_GET_SYSTEM_INFO, (options: GetSystemInfoOptions, exec: ApiExecutor<GetSystemInfoResult>)=>{
        try {
            exec.resolve(internalGetSystemInfo());
        } catch (error) {
            exec.reject((error as Error).message);
        }
    }) as GetSystemInfo;
    type MakePhoneCall = (options: MakePhoneCallOptions) => void;
    class MakePhoneCallSuccess extends UTSObject {
    }
    type MakePhoneCallSuccessCallback = (result: MakePhoneCallSuccess) => void;
    type MakePhoneCallFail = UniError;
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
    const makePhoneCall: MakePhoneCall = defineAsyncApi<MakePhoneCallOptions, MakePhoneCallSuccess>(API_MAKE_PHONE_CALL, (options: MakePhoneCallOptions, res: ApiExecutor<MakePhoneCallSuccess>)=>{
        const dialRes = device.dial(options.phoneNumber) as Object as Promise<void>;
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
    class PreviewImageSuccess extends UTSObject {
        errSubject!: string;
        errMsg!: string;
    }
    class LongPressActionsSuccessData extends UTSObject {
        tapIndex!: number;
        index!: number;
    }
    class LongPressActionsOptions extends UTSObject {
        itemList!: string[];
        itemColor: string | null = null;
        success: ((result: LongPressActionsSuccessData) => void) | null = null;
        fail: ((result: Object) => void) | null = null;
        complete: ((result: Object) => void) | null = null;
    }
    type PreviewImageFail = IMediaError;
    type PreviewImageSuccessCallback = (callback: PreviewImageSuccess) => void;
    type PreviewImageFailCallback = (callback: PreviewImageFail) => void;
    type PreviewImageCompleteCallback = ChooseImageCompleteCallback;
    class PreviewImageOptions extends UTSObject {
        current: Object | null = null;
        urls!: Array<string.ImageURIString>;
        showmenu: boolean | null = null;
        indicator: string | null = null;
        loop: boolean | null = null;
        longPressActions: LongPressActionsOptions | null = null;
        success: (PreviewImageSuccessCallback) | null = null;
        fail: (PreviewImageFailCallback) | null = null;
        complete: (PreviewImageCompleteCallback) | null = null;
    }
    type PreviewImage = (options: PreviewImageOptions) => void;
    type ClosePreviewImage = (options: ClosePreviewImageOptions) => void;
    class ClosePreviewImageSuccess extends UTSObject {
        errMsg!: string;
    }
    type ClosePreviewImageFail = IMediaError;
    type ClosePreviewImageSuccessCallback = (callback: ClosePreviewImageSuccess) => void;
    type ClosePreviewImageFailCallback = (callback: ClosePreviewImageFail) => void;
    type ClosePreviewImageCompleteCallback = ChooseImageCompleteCallback;
    class ClosePreviewImageOptions extends UTSObject {
        success: (ClosePreviewImageSuccessCallback) | null = null;
        fail: (ClosePreviewImageFailCallback) | null = null;
        complete: (ClosePreviewImageCompleteCallback) | null = null;
    }
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
    type SaveImageToPhotosAlbum = (options: SaveImageToPhotosAlbumOptions) => void;
    class SaveImageToPhotosAlbumSuccess extends UTSObject {
        path!: string;
    }
    type SaveImageToPhotosAlbumFail = IMediaError;
    type SaveImageToPhotosAlbumSuccessCallback = (callback: SaveImageToPhotosAlbumSuccess) => void;
    type SaveImageToPhotosAlbumFailCallback = (callback: SaveImageToPhotosAlbumFail) => void;
    type SaveImageToPhotosAlbumCompleteCallback = ChooseImageCompleteCallback;
    class SaveImageToPhotosAlbumOptions extends UTSObject {
        filePath!: string.ImageURIString;
        success: (SaveImageToPhotosAlbumSuccessCallback) | null = null;
        fail: (SaveImageToPhotosAlbumFailCallback) | null = null;
        complete: (SaveImageToPhotosAlbumCompleteCallback) | null = null;
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
    class SaveVideoToPhotosAlbumSuccess extends UTSObject {
    }
    type SaveVideoToPhotosAlbumFail = IMediaError;
    type SaveVideoToPhotosAlbumSuccessCallback = (callback: SaveVideoToPhotosAlbumSuccess) => void;
    type SaveVideoToPhotosAlbumFailCallback = (callback: SaveVideoToPhotosAlbumFail) => void;
    type SaveVideoToPhotosAlbumCompleteCallback = ChooseImageCompleteCallback;
    class SaveVideoToPhotosAlbumOptions extends UTSObject {
        filePath!: string.VideoURIString;
        success: (SaveVideoToPhotosAlbumSuccessCallback) | null = null;
        fail: (SaveVideoToPhotosAlbumFailCallback) | null = null;
        complete: (SaveVideoToPhotosAlbumCompleteCallback) | null = null;
    }
    type SaveVideoToPhotosAlbum = (options: SaveVideoToPhotosAlbumOptions) => void;
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
    const API_PREVIEW_IMAGE = 'previewImage';
    const PreviewImageApiProtocol = new Map<string, ProtocolOptions>([
        [
            'urls',
            {
                type: 'array',
                required: true
            }
        ],
        [
            'current',
            {
                type: 'string',
                required: false
            }
        ]
    ]);
    const PreviewImageApiOptions: ApiOptions<PreviewImageOptions> = {
        formatArgs: new Map<string, Function>([
            [
                'urls',
                (urls: string[], params: PreviewImageOptions)=>{
                    params.urls = urls.map((url)=>getRealPath(url) as string);
                }
            ]
        ])
    };
    const API_CLOSE_PREVIEW_IMAGE = 'closePreviewImage';
    const API_SAVE_IMAGE_TO_PHOTOS_ALBUM = 'saveImageToPhotosAlbum';
    const SaveImageToPhotosAlbumApiProtocol = new Map<string, ProtocolOptions>([
        [
            'filePath',
            {
                type: 'string',
                required: true
            }
        ]
    ]);
    const API_SAVE_VIDEO_TO_PHOTOS_ALBUM = 'saveVideoToPhotosAlbum';
    const SaveVideoToPhotosAlbumApiProtocol = new Map<string, ProtocolOptions>([
        [
            'filePath',
            {
                type: 'string',
                required: true
            }
        ]
    ]);
    const MediaUniErrors: Map<number, string> = new Map([
        [
            1101001,
            'user cancel'
        ],
        [
            1101002,
            'fail parameter error: parameter.urls should have at least 1 item'
        ],
        [
            1101003,
            "file not find"
        ],
        [
            1101004,
            "Failed to load resource"
        ],
        [
            1101005,
            "No Permission"
        ],
        [
            1101006,
            "save error"
        ],
        [
            1101007,
            "crop error"
        ],
        [
            1101008,
            'camera error'
        ],
        [
            1101009,
            "image output failed"
        ],
        [
            1101010,
            "unexpect error:"
        ]
    ]);
    interface TempFileItem {
        path: string;
        size: number;
    }
    const chooseImage: ChooseImage = defineAsyncApi<ChooseImageOptions, ChooseImageSuccess>(API_CHOOSE_IMAGE, (options: ChooseImageOptions, res: ApiExecutor<ChooseImageSuccess>)=>{
        _chooseMedia({
            mimeType: picker1.PhotoViewMIMETypes.IMAGE_TYPE,
            count: options.count!
        } as ChooseMediaOptions).then((chooseMediaRes)=>{
            const tempFiles = chooseMediaRes.tempFiles;
            if (tempFiles.length === 0) {
                const errMsg = MediaUniErrors.get(1101001) as string;
                res.reject(errMsg, {
                    errCode: 1101001,
                    errMsg
                } as ApiError);
                return;
            }
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
    const chooseVideo: ChooseVideo = defineAsyncApi<ChooseVideoOptions, ChooseVideoSuccess>(API_CHOOSE_VIDEO, (options: ChooseVideoOptions, res: ApiExecutor<ChooseVideoSuccess>)=>{
        _chooseMedia({
            mimeType: picker2.PhotoViewMIMETypes.VIDEO_TYPE
        } as ChooseMediaOptions).then((chooseMediaRes)=>{
            const file = chooseMediaRes.tempFiles[0];
            if (!file) {
                const errMsg = MediaUniErrors.get(1101001) as string;
                res.reject(errMsg, {
                    errCode: 1101001,
                    errMsg
                } as ApiError);
                return;
            }
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
    const getImageInfo: GetImageInfo = defineAsyncApi<GetImageInfoOptions, GetImageInfoSuccess>(API_GET_IMAGE_INFO, (options: GetImageInfoOptions, res: ApiExecutor<GetImageInfoSuccess>)=>{
        _getImageInfo(options.src).then((getImageInfoRes)=>{
            res.resolve(getImageInfoRes);
        }, (err: Error)=>{
            res.reject(err.message);
        });
    }, GetImageInfoApiProtocol, GetImageInfoApiOptions) as GetImageInfo;
    const getVideoInfo: GetVideoInfo = defineAsyncApi<GetVideoInfoOptions, GetVideoInfoSuccess>(API_GET_VIDEO_INFO, (options: GetVideoInfoOptions, res: ApiExecutor<GetVideoInfoSuccess>)=>{
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
    interface IPreviewImageOptions {
        urls: string[];
        current: string;
        showmenu: boolean;
    }
    const previewImage: PreviewImage = defineAsyncApi<PreviewImageOptions, PreviewImageSuccess>(API_PREVIEW_IMAGE, (options: PreviewImageOptions, exec: ApiExecutor<PreviewImageSuccess>)=>{
        interface Page {
            $getAppWebview: Function;
        }
        const currentPage = getCurrentPage() as Page;
        getOSRuntime().previewImage({
            urls: options.urls.map((url)=>getRealPath1(url) as string),
            current: options.current || '',
            showmenu: options.showmenu === false ? false : true
        } as IPreviewImageOptions, currentPage.$getAppWebview().page as Object);
        exec.resolve({
            errSubject: 'uni-previewImage',
            errMsg: ''
        } as PreviewImageSuccess);
    }, PreviewImageApiProtocol, PreviewImageApiOptions) as PreviewImage;
    const closePreviewImage: ClosePreviewImage = defineAsyncApi<ClosePreviewImageOptions, ClosePreviewImageSuccess>(API_CLOSE_PREVIEW_IMAGE, (options: ClosePreviewImageOptions, exec: ApiExecutor<ClosePreviewImageSuccess>)=>{
        getOSRuntime().closePreviewImage();
        exec.resolve({
            errMsg: ''
        } as ClosePreviewImageSuccess);
    }) as ClosePreviewImage;
    const requestPermission = async (): Promise<boolean> =>{
        const context = getContext();
        const atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
        const permissionRequestResult = await atManager.requestPermissionsFromUser(context, [
            'ohos.permission.WRITE_IMAGEVIDEO'
        ]);
        const isGranted = permissionRequestResult.authResults[0] === 0;
        return isGranted;
    };
    const saveResource = async (src: Resource, dest: string)=>{
        const context = getContext();
        const resourceManager = context.resourceManager;
        const srcPath: string = src.params?.[0] as string;
        const destFile = fs1.openSync(dest, fs1.OpenMode.WRITE_ONLY);
        const content = await resourceManager.getRawFileContent(srcPath);
        await fs1.write(destFile.fd, content.buffer);
        await fs1.close(destFile);
    };
    const saveUri = async (src: string, dest: string)=>{
        const srcFile = fs1.openSync(src, fs1.OpenMode.READ_ONLY);
        const destFile = fs1.openSync(dest, fs1.OpenMode.WRITE_ONLY);
        await fs1.copyFile(srcFile.fd, destFile.fd);
        await fs1.close(srcFile);
        await fs1.close(destFile);
    };
    const saveMediaToAlbum = async (fromUri: string, type: 'image' | 'video'): Promise<string> =>{
        const realPath = getResourceStr(fromUri) as string | Resource;
        const context = getContext();
        let fileName = Date.now() + (type === 'image' ? '.png' : '.mp4');
        const isResource = typeof realPath !== 'string';
        if (isResource) {
            if (typeof realPath.params?.[0] === 'string') {
                fileName = realPath.params?.[0].split('/').pop() || fileName;
            }
        } else {
            fileName = realPath.split('/').pop() || fileName;
        }
        const photoSaveOptions = new picker3.PhotoSaveOptions();
        photoSaveOptions.newFileNames = [
            fileName
        ];
        const photoPicker = new picker3.PhotoViewPicker();
        const photoSaveResult = await photoPicker.save(photoSaveOptions);
        const destUri = photoSaveResult[0];
        if (isResource) {
            await saveResource(realPath as Resource, destUri);
        } else {
            await saveUri(realPath as string, destUri);
        }
        const phAccessHelper = photoAccessHelper.getPhotoAccessHelper(context);
        const assetChangeRequest: photoAccessHelper.MediaAssetChangeRequest = photoAccessHelper.MediaAssetChangeRequest.createImageAssetRequest(context, destUri);
        await phAccessHelper.applyChanges(assetChangeRequest);
        return destUri;
    };
    const saveImageToPhotosAlbum: SaveImageToPhotosAlbum = defineAsyncApi<SaveImageToPhotosAlbumOptions, SaveImageToPhotosAlbumSuccess>(API_SAVE_IMAGE_TO_PHOTOS_ALBUM, (options: SaveImageToPhotosAlbumOptions, res: ApiExecutor<SaveImageToPhotosAlbumSuccess>)=>{
        requestPermission().then((isGranted)=>{
            if (!isGranted) {
                const errMsg = MediaUniErrors.get(1101005);
                res.reject(errMsg, {
                    errCode: 1101005,
                    errMsg
                } as ApiError);
                return;
            }
            saveMediaToAlbum(options.filePath, 'image').then((uri)=>{
                res.resolve({
                    path: uri
                } as SaveImageToPhotosAlbumSuccess);
            }, (err: Error)=>{
                res.reject(err.message);
            });
        });
    }, SaveImageToPhotosAlbumApiProtocol) as SaveImageToPhotosAlbum;
    const saveVideoToPhotosAlbum: SaveVideoToPhotosAlbum = defineAsyncApi<SaveVideoToPhotosAlbumOptions, SaveVideoToPhotosAlbumSuccess>(API_SAVE_VIDEO_TO_PHOTOS_ALBUM, (options: SaveVideoToPhotosAlbumOptions, res: ApiExecutor<SaveVideoToPhotosAlbumSuccess>)=>{
        requestPermission().then((isGranted)=>{
            if (!isGranted) {
                const errMsg = MediaUniErrors.get(1101005);
                res.reject(errMsg, {
                    errCode: 1101005,
                    errMsg
                } as ApiError);
                return;
            }
            saveMediaToAlbum(options.filePath, 'video').then((uri)=>{
                res.resolve({} as SaveVideoToPhotosAlbumSuccess);
            }, (err: Error)=>{
                res.reject(err.message);
            });
        });
    }, SaveVideoToPhotosAlbumApiProtocol) as SaveVideoToPhotosAlbum;
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
    const setNavigationBarColor: SetNavigationBarColor = defineAsyncApi<SetNavigationBarColorOptions, SetNavigationBarColorSuccess>(API_SET_NAVIGATION_BAR_COLOR, (options: SetNavigationBarColorOptions, res: ApiExecutor<SetNavigationBarColorSuccess>)=>{
        const page = getCurrentPage1() as Page;
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
            navigator.setStatusBarStyle(statusBarStyle);
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
    const setNavigationBarTitle: SetNavigationBarTitle = defineAsyncApi<SetNavigationBarTitleOptions, SetNavigationBarTitleSuccess>(API_SET_NAVIGATION_BAR_TITLE, (options: SetNavigationBarTitleOptions, res: ApiExecutor<SetNavigationBarTitleSuccess>)=>{
        const page = getCurrentPage1() as Page;
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
                    params.filePath = getRealPath2(filePath);
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
    const request = defineTaskApi<RequestOptions<Object>, RequestSuccess<Object>, RequestTask>(API_REQUEST, (args: RequestOptions<Object>, exec: ApiExecutor<RequestSuccess<Object>>)=>{
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
            expectDataType = http.HttpDataType.STRING;
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
                let data = res.result;
                if (dataType === 'json' && typeof data === 'string') {
                    try {
                        data = JSON.parse(data);
                    } catch (e) {}
                }
                exec.resolve({
                    data,
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
    const extToContentType: Record<string, string> = {
        "3g2": "video/3gpp2",
        "3gp": "video/3gpp",
        "3gpp": "video/3gpp",
        "3mf": "model/3mf",
        "aac": "audio/aac",
        "ac": "application/pkix-attr-cert",
        "adp": "audio/adpcm",
        "adts": "audio/aac",
        "ai": "application/postscript",
        "aml": "application/automationml-aml+xml",
        "amlx": "application/automationml-amlx+zip",
        "amr": "audio/amr",
        "apng": "image/apng",
        "appcache": "text/cache-manifest",
        "appinstaller": "application/appinstaller",
        "appx": "application/appx",
        "appxbundle": "application/appxbundle",
        "asc": "application/pgp-keys",
        "atom": "application/atom+xml",
        "atomcat": "application/atomcat+xml",
        "atomdeleted": "application/atomdeleted+xml",
        "atomsvc": "application/atomsvc+xml",
        "au": "audio/basic",
        "avci": "image/avci",
        "avcs": "image/avcs",
        "avif": "image/avif",
        "aw": "application/applixware",
        "bdoc": "application/bdoc",
        "bin": "application/octet-stream",
        "bmp": "image/bmp",
        "bpk": "application/octet-stream",
        "btf": "image/prs.btif",
        "btif": "image/prs.btif",
        "buffer": "application/octet-stream",
        "ccxml": "application/ccxml+xml",
        "cdfx": "application/cdfx+xml",
        "cdmia": "application/cdmi-capability",
        "cdmic": "application/cdmi-container",
        "cdmid": "application/cdmi-domain",
        "cdmio": "application/cdmi-object",
        "cdmiq": "application/cdmi-queue",
        "cer": "application/pkix-cert",
        "cgm": "image/cgm",
        "cjs": "application/node",
        "class": "application/java-vm",
        "coffee": "text/coffeescript",
        "conf": "text/plain",
        "cpl": "application/cpl+xml",
        "cpt": "application/mac-compactpro",
        "crl": "application/pkix-crl",
        "css": "text/css",
        "csv": "text/csv",
        "cu": "application/cu-seeme",
        "cwl": "application/cwl",
        "cww": "application/prs.cww",
        "davmount": "application/davmount+xml",
        "dbk": "application/docbook+xml",
        "deb": "application/octet-stream",
        "def": "text/plain",
        "deploy": "application/octet-stream",
        "dib": "image/bmp",
        "disposition-notification": "message/disposition-notification",
        "dist": "application/octet-stream",
        "distz": "application/octet-stream",
        "dll": "application/octet-stream",
        "dmg": "application/octet-stream",
        "dms": "application/octet-stream",
        "doc": "application/msword",
        "dot": "application/msword",
        "dpx": "image/dpx",
        "drle": "image/dicom-rle",
        "dsc": "text/prs.lines.tag",
        "dssc": "application/dssc+der",
        "dtd": "application/xml-dtd",
        "dump": "application/octet-stream",
        "dwd": "application/atsc-dwd+xml",
        "ear": "application/java-archive",
        "ecma": "application/ecmascript",
        "elc": "application/octet-stream",
        "emf": "image/emf",
        "eml": "message/rfc822",
        "emma": "application/emma+xml",
        "emotionml": "application/emotionml+xml",
        "eps": "application/postscript",
        "epub": "application/epub+zip",
        "exe": "application/octet-stream",
        "exi": "application/exi",
        "exp": "application/express",
        "exr": "image/aces",
        "ez": "application/andrew-inset",
        "fdf": "application/fdf",
        "fdt": "application/fdt+xml",
        "fits": "image/fits",
        "g3": "image/g3fax",
        "gbr": "application/rpki-ghostbusters",
        "geojson": "application/geo+json",
        "gif": "image/gif",
        "glb": "model/gltf-binary",
        "gltf": "model/gltf+json",
        "gml": "application/gml+xml",
        "gpx": "application/gpx+xml",
        "gram": "application/srgs",
        "grxml": "application/srgs+xml",
        "gxf": "application/gxf",
        "gz": "application/gzip",
        "h261": "video/h261",
        "h263": "video/h263",
        "h264": "video/h264",
        "heic": "image/heic",
        "heics": "image/heic-sequence",
        "heif": "image/heif",
        "heifs": "image/heif-sequence",
        "hej2": "image/hej2k",
        "held": "application/atsc-held+xml",
        "hjson": "application/hjson",
        "hlp": "application/winhlp",
        "hqx": "application/mac-binhex40",
        "hsj2": "image/hsj2",
        "htm": "text/html",
        "html": "text/html",
        "ics": "text/calendar",
        "ief": "image/ief",
        "ifb": "text/calendar",
        "iges": "model/iges",
        "igs": "model/iges",
        "img": "application/octet-stream",
        "in": "text/plain",
        "ini": "text/plain",
        "ink": "application/inkml+xml",
        "inkml": "application/inkml+xml",
        "ipfix": "application/ipfix",
        "iso": "application/octet-stream",
        "its": "application/its+xml",
        "jade": "text/jade",
        "jar": "application/java-archive",
        "jhc": "image/jphc",
        "jls": "image/jls",
        "jp2": "image/jp2",
        "jpe": "image/jpeg",
        "jpeg": "image/jpeg",
        "jpf": "image/jpx",
        "jpg": "image/jpeg",
        "jpg2": "image/jp2",
        "jpgm": "image/jpm",
        "jpgv": "video/jpeg",
        "jph": "image/jph",
        "jpm": "image/jpm",
        "jpx": "image/jpx",
        "js": "text/javascript",
        "json": "application/json",
        "json5": "application/json5",
        "jsonld": "application/ld+json",
        "jsonml": "application/jsonml+json",
        "jsx": "text/jsx",
        "jt": "model/jt",
        "jxr": "image/jxr",
        "jxra": "image/jxra",
        "jxrs": "image/jxrs",
        "jxs": "image/jxs",
        "jxsc": "image/jxsc",
        "jxsi": "image/jxsi",
        "jxss": "image/jxss",
        "kar": "audio/midi",
        "ktx": "image/ktx",
        "ktx2": "image/ktx2",
        "less": "text/less",
        "lgr": "application/lgr+xml",
        "list": "text/plain",
        "litcoffee": "text/coffeescript",
        "log": "text/plain",
        "lostxml": "application/lost+xml",
        "lrf": "application/octet-stream",
        "m1v": "video/mpeg",
        "m21": "application/mp21",
        "m2a": "audio/mpeg",
        "m2v": "video/mpeg",
        "m3a": "audio/mpeg",
        "m4a": "audio/mp4",
        "m4p": "application/mp4",
        "m4s": "video/iso.segment",
        "ma": "application/mathematica",
        "mads": "application/mads+xml",
        "maei": "application/mmt-aei+xml",
        "man": "text/troff",
        "manifest": "text/cache-manifest",
        "map": "application/json",
        "mar": "application/octet-stream",
        "markdown": "text/markdown",
        "mathml": "application/mathml+xml",
        "mb": "application/mathematica",
        "mbox": "application/mbox",
        "md": "text/markdown",
        "mdx": "text/mdx",
        "me": "text/troff",
        "mesh": "model/mesh",
        "meta4": "application/metalink4+xml",
        "metalink": "application/metalink+xml",
        "mets": "application/mets+xml",
        "mft": "application/rpki-manifest",
        "mid": "audio/midi",
        "midi": "audio/midi",
        "mime": "message/rfc822",
        "mj2": "video/mj2",
        "mjp2": "video/mj2",
        "mjs": "text/javascript",
        "mml": "text/mathml",
        "mods": "application/mods+xml",
        "mov": "video/quicktime",
        "mp2": "audio/mpeg",
        "mp21": "application/mp21",
        "mp2a": "audio/mpeg",
        "mp3": "audio/mpeg",
        "mp4": "video/mp4",
        "mp4a": "audio/mp4",
        "mp4s": "application/mp4",
        "mp4v": "video/mp4",
        "mpd": "application/dash+xml",
        "mpe": "video/mpeg",
        "mpeg": "video/mpeg",
        "mpf": "application/media-policy-dataset+xml",
        "mpg": "video/mpeg",
        "mpg4": "video/mp4",
        "mpga": "audio/mpeg",
        "mpp": "application/dash-patch+xml",
        "mrc": "application/marc",
        "mrcx": "application/marcxml+xml",
        "ms": "text/troff",
        "mscml": "application/mediaservercontrol+xml",
        "msh": "model/mesh",
        "msi": "application/octet-stream",
        "msix": "application/msix",
        "msixbundle": "application/msixbundle",
        "msm": "application/octet-stream",
        "msp": "application/octet-stream",
        "mtl": "model/mtl",
        "musd": "application/mmt-usd+xml",
        "mxf": "application/mxf",
        "mxmf": "audio/mobile-xmf",
        "mxml": "application/xv+xml",
        "n3": "text/n3",
        "nb": "application/mathematica",
        "nq": "application/n-quads",
        "nt": "application/n-triples",
        "obj": "model/obj",
        "oda": "application/oda",
        "oga": "audio/ogg",
        "ogg": "audio/ogg",
        "ogv": "video/ogg",
        "ogx": "application/ogg",
        "omdoc": "application/omdoc+xml",
        "onepkg": "application/onenote",
        "onetmp": "application/onenote",
        "onetoc": "application/onenote",
        "onetoc2": "application/onenote",
        "opf": "application/oebps-package+xml",
        "opus": "audio/ogg",
        "otf": "font/otf",
        "owl": "application/rdf+xml",
        "oxps": "application/oxps",
        "p10": "application/pkcs10",
        "p7c": "application/pkcs7-mime",
        "p7m": "application/pkcs7-mime",
        "p7s": "application/pkcs7-signature",
        "p8": "application/pkcs8",
        "pdf": "application/pdf",
        "pfr": "application/font-tdpfr",
        "pgp": "application/pgp-encrypted",
        "pkg": "application/octet-stream",
        "pki": "application/pkixcmp",
        "pkipath": "application/pkix-pkipath",
        "pls": "application/pls+xml",
        "png": "image/png",
        "prc": "model/prc",
        "prf": "application/pics-rules",
        "provx": "application/provenance+xml",
        "ps": "application/postscript",
        "pskcxml": "application/pskc+xml",
        "pti": "image/prs.pti",
        "qt": "video/quicktime",
        "raml": "application/raml+yaml",
        "rapd": "application/route-apd+xml",
        "rdf": "application/rdf+xml",
        "relo": "application/p2p-overlay+xml",
        "rif": "application/reginfo+xml",
        "rl": "application/resource-lists+xml",
        "rld": "application/resource-lists-diff+xml",
        "rmi": "audio/midi",
        "rnc": "application/relax-ng-compact-syntax",
        "rng": "application/xml",
        "roa": "application/rpki-roa",
        "roff": "text/troff",
        "rq": "application/sparql-query",
        "rs": "application/rls-services+xml",
        "rsat": "application/atsc-rsat+xml",
        "rsd": "application/rsd+xml",
        "rsheet": "application/urc-ressheet+xml",
        "rss": "application/rss+xml",
        "rtf": "text/rtf",
        "rtx": "text/richtext",
        "rusd": "application/route-usd+xml",
        "s3m": "audio/s3m",
        "sbml": "application/sbml+xml",
        "scq": "application/scvp-cv-request",
        "scs": "application/scvp-cv-response",
        "sdp": "application/sdp",
        "senmlx": "application/senml+xml",
        "sensmlx": "application/sensml+xml",
        "ser": "application/java-serialized-object",
        "setpay": "application/set-payment-initiation",
        "setreg": "application/set-registration-initiation",
        "sgi": "image/sgi",
        "sgm": "text/sgml",
        "sgml": "text/sgml",
        "shex": "text/shex",
        "shf": "application/shf+xml",
        "shtml": "text/html",
        "sieve": "application/sieve",
        "sig": "application/pgp-signature",
        "sil": "audio/silk",
        "silo": "model/mesh",
        "siv": "application/sieve",
        "slim": "text/slim",
        "slm": "text/slim",
        "sls": "application/route-s-tsid+xml",
        "smi": "application/smil+xml",
        "smil": "application/smil+xml",
        "snd": "audio/basic",
        "so": "application/octet-stream",
        "spdx": "text/spdx",
        "spp": "application/scvp-vp-response",
        "spq": "application/scvp-vp-request",
        "spx": "audio/ogg",
        "sql": "application/sql",
        "sru": "application/sru+xml",
        "srx": "application/sparql-results+xml",
        "ssdl": "application/ssdl+xml",
        "ssml": "application/ssml+xml",
        "stk": "application/hyperstudio",
        "stl": "model/stl",
        "stpx": "model/step+xml",
        "stpxz": "model/step-xml+zip",
        "stpz": "model/step+zip",
        "styl": "text/stylus",
        "stylus": "text/stylus",
        "svg": "image/svg+xml",
        "svgz": "image/svg+xml",
        "swidtag": "application/swid+xml",
        "t": "text/troff",
        "t38": "image/t38",
        "td": "application/urc-targetdesc+xml",
        "tei": "application/tei+xml",
        "teicorpus": "application/tei+xml",
        "text": "text/plain",
        "tfi": "application/thraud+xml",
        "tfx": "image/tiff-fx",
        "tif": "image/tiff",
        "tiff": "image/tiff",
        "toml": "application/toml",
        "tr": "text/troff",
        "trig": "application/trig",
        "ts": "video/mp2t",
        "tsd": "application/timestamped-data",
        "tsv": "text/tab-separated-values",
        "ttc": "font/collection",
        "ttf": "font/ttf",
        "ttl": "text/turtle",
        "ttml": "application/ttml+xml",
        "txt": "text/plain",
        "u3d": "model/u3d",
        "u8dsn": "message/global-delivery-status",
        "u8hdr": "message/global-headers",
        "u8mdn": "message/global-disposition-notification",
        "u8msg": "message/global",
        "ubj": "application/ubjson",
        "uri": "text/uri-list",
        "uris": "text/uri-list",
        "urls": "text/uri-list",
        "vcard": "text/vcard",
        "vrml": "model/vrml",
        "vtt": "text/vtt",
        "vxml": "application/voicexml+xml",
        "war": "application/java-archive",
        "wasm": "application/wasm",
        "wav": "audio/wav",
        "weba": "audio/webm",
        "webm": "video/webm",
        "webmanifest": "application/manifest+json",
        "webp": "image/webp",
        "wgsl": "text/wgsl",
        "wgt": "application/widget",
        "wif": "application/watcherinfo+xml",
        "wmf": "image/wmf",
        "woff": "font/woff",
        "woff2": "font/woff2",
        "wrl": "model/vrml",
        "wsdl": "application/wsdl+xml",
        "wspolicy": "application/wspolicy+xml",
        "x3d": "model/x3d+xml",
        "x3db": "model/x3d+fastinfoset",
        "x3dbz": "model/x3d+binary",
        "x3dv": "model/x3d-vrml",
        "x3dvz": "model/x3d+vrml",
        "x3dz": "model/x3d+xml",
        "xaml": "application/xaml+xml",
        "xav": "application/xcap-att+xml",
        "xca": "application/xcap-caps+xml",
        "xcs": "application/calendar+xml",
        "xdf": "application/xcap-diff+xml",
        "xdssc": "application/dssc+xml",
        "xel": "application/xcap-el+xml",
        "xenc": "application/xenc+xml",
        "xer": "application/patch-ops-error+xml",
        "xfdf": "application/xfdf",
        "xht": "application/xhtml+xml",
        "xhtml": "application/xhtml+xml",
        "xhvml": "application/xv+xml",
        "xlf": "application/xliff+xml",
        "xm": "audio/xm",
        "xml": "text/xml",
        "xns": "application/xcap-ns+xml",
        "xop": "application/xop+xml",
        "xpl": "application/xproc+xml",
        "xsd": "application/xml",
        "xsf": "application/prs.xsf+xml",
        "xsl": "application/xml",
        "xslt": "application/xml",
        "xspf": "application/xspf+xml",
        "xvm": "application/xv+xml",
        "xvml": "application/xv+xml",
        "yaml": "text/yaml",
        "yang": "application/yang",
        "yin": "application/yin+xml",
        "yml": "text/yaml",
        "zip": "application/zip",
        "ico": "image/x-icon",
        "cur": "image/x-icon",
        "avis": "image/avis",
        "m4v": "video/mp4",
        "f4v": "video/mp4",
        "f4p": "video/mp4",
        "flac": "audio/flac",
        "f4a": "audio/mp4",
        "f4b": "audio/mp4",
        "eot": "application/vnd.ms-fontobject",
        "topojson": "application/json",
        "webapp": "application/x-web-app-manifest+json",
        "safariextz": "application/octet-stream",
        "bbaw": "application/x-bb-appworld",
        "crx": "application/x-chrome-extension",
        "oex": "application/x-opera-extension",
        "xpi": "application/x-xpinstall",
        "vcf": "text/vcard",
        "xloc": "text/vnd.rim.location.xloc",
        "htc": "text/x-component"
    };
    const contentTypeToExt: Record<string, string> = {};
    let contentTypeToExtInited = false;
    const initContentTypeToExtOnce = ()=>{
        if (contentTypeToExtInited) {
            return;
        }
        const exts = Object.keys(extToContentType);
        for(let i = 0; i < exts.length; i++){
            const ext = exts[i];
            const contentType = extToContentType[ext] as string;
            if (!contentTypeToExt[contentType]) {
                contentTypeToExt[contentType] = ext;
            }
        }
        contentTypeToExtInited = true;
    };
    const lookupExt = (contentType: string): string | undefined =>{
        initContentTypeToExtOnce();
        return contentTypeToExt[contentType.split(';')[0].trim().toLowerCase()];
    };
    const lookupContentTypeWithUri = (uri: string): string | undefined =>{
        const uriArr = uri.split('.');
        if (uriArr.length <= 1) {
            return undefined;
        }
        const ext = uriArr.pop() as string;
        return lookupContentType(ext);
    };
    const lookupContentType = (ext: string): string | undefined =>{
        return extToContentType[ext.trim().toLowerCase()];
    };
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
    const readFile = (filePath: string): ArrayBuffer =>{
        const readFilePath = getRealPath3(filePath) as string;
        const file = fs2.openSync(readFilePath, fs2.OpenMode.READ_ONLY);
        const stat = fs2.statSync(file.fd);
        const data = new ArrayBuffer(stat.size);
        fs2.readSync(file.fd, data);
        fs2.closeSync(file.fd);
        return data;
    };
    const uploadFile = defineTaskApi<UploadFileOptions, UploadFileSuccess, UploadTask>(API_UPLOAD_FILE, (args: UploadFileOptions, exec: ApiExecutor<UploadFileSuccess>)=>{
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
        try {
            if (files && files.length) {
                for(let i = 0; i < files.length; i++){
                    const _files_i = files[i], name = _files_i.name, uri = _files_i.uri;
                    multiFormDataList.push({
                        name: name || 'file',
                        contentType: lookupContentTypeWithUri(uri) || 'application/octet-stream',
                        data: readFile(uri!)
                    } as http1.MultiFormData);
                }
            } else if (filePath) {
                multiFormDataList.push({
                    name: name || 'file',
                    contentType: lookupContentTypeWithUri(filePath!) || 'application/octet-stream',
                    data: readFile(filePath!)
                } as http1.MultiFormData);
            }
        } catch (error) {
            exec.reject((error as Error).message);
            return new UploadTask1({
                abort: ()=>{},
                onHeadersReceived: (callback: Function)=>{},
                offHeadersReceived: (callback: Function)=>{},
                onProgressUpdate: (callback: Function)=>{},
                offProgressUpdate: (callback: Function)=>{}
            } as IUploadTask);
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
        httpRequest.on('headersReceive', (headers: Object)=>{});
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
    const getPossibleExt = (contentType: string, contentDisposition: string, url: string): string =>{
        const contentDispositionFileNameMatches = contentDisposition.match(/filename="(.*)"/);
        const contentDispositionFileName = contentDispositionFileNameMatches ? contentDispositionFileNameMatches[1] : '';
        const contentDispositionExt = contentDispositionFileName ? contentDispositionFileName.split('.').pop() : '';
        if (contentDispositionExt) {
            return contentDispositionExt;
        }
        const contentTypeExt = lookupExt(contentType);
        if (contentTypeExt) {
            return contentTypeExt;
        }
        const urlExt = url.split('?')[0].split('/').pop()?.split('.')[1];
        return urlExt || '';
    };
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
    const downloadFile = defineTaskApi<DownloadFileOptions, DownloadFileSuccess, DownloadTask>(API_DOWNLOAD_FILE, (args: DownloadFileOptions, exec: ApiExecutor<DownloadFileSuccess>)=>{
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
        let responseContentType = '';
        let responseContentDisposition = '';
        httpRequest.on('headersReceive', (headers: Object)=>{
            const realHeaders = headers as Record<string, string>;
            responseContentType = realHeaders['content-type'] || realHeaders['Content-Type'] || '';
            responseContentDisposition = realHeaders['content-disposition'] || realHeaders['Content-Disposition'] || '';
        });
        httpRequest.on('dataReceiveProgress', (ref)=>{
            let receiveSize = ref.receiveSize, totalSize = ref.totalSize;
            emitter.emit('progress', {
                progress: Math.floor((receiveSize / totalSize) * 100),
                totalBytesWritten: receiveSize,
                totalBytesExpectedToWrite: totalSize
            } as OnProgressDownloadResult);
        });
        const TEMP_PATH = getEnv().TEMP_PATH as string;
        const downloadPath = TEMP_PATH + '/download';
        if (!fs3.accessSync(downloadPath)) {
            fs3.mkdirSync(downloadPath);
        }
        let stream: fs3.Stream;
        let tempFilePath = '';
        let writePromise = Promise.resolve(0);
        const queueWrite = async (data: ArrayBuffer): Promise<number> =>{
            writePromise = writePromise.then(async (total)=>{
                const length = await stream.write(data);
                return total + length;
            });
            return writePromise;
        };
        httpRequest.on('dataReceive', (data)=>{
            const ext = getPossibleExt(responseContentType, responseContentDisposition, url);
            tempFilePath = downloadPath + '/' + Date.now() + (ext ? '.' + ext : '');
            stream = fs3.createStreamSync(tempFilePath, 'w+');
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
                        tempFilePath: 'file://' + tempFilePath,
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
    type OpenAppAuthorizeSetting = (options: OpenAppAuthorizeSettingOptions) => void;
    class OpenAppAuthorizeSettingSuccess extends UTSObject {
        errMsg!: string;
    }
    type OpenAppAuthorizeSettingSuccessCallback = (result: OpenAppAuthorizeSettingSuccess) => void;
    class OpenAppAuthorizeSettingFail extends UTSObject {
        errMsg!: string;
    }
    type OpenAppAuthorizeSettingFailCallback = (result: OpenAppAuthorizeSettingFail) => void;
    class OpenAppAuthorizeSettingComplete extends UTSObject {
        errMsg!: string;
    }
    type OpenAppAuthorizeSettingCompleteCallback = (result: OpenAppAuthorizeSettingComplete) => void;
    class OpenAppAuthorizeSettingOptions extends UTSObject {
        success: OpenAppAuthorizeSettingSuccessCallback | null = null;
        fail: OpenAppAuthorizeSettingFailCallback | null = null;
        complete: OpenAppAuthorizeSettingCompleteCallback | null = null;
    }
    const API_OPEN_APP_AUTHORIZE_SETTING = 'openAppAuthorizeSetting';
    const openAppAuthorizeSetting: OpenAppAuthorizeSetting = defineAsyncApi<OpenAppAuthorizeSettingOptions, OpenAppAuthorizeSettingSuccess>(API_OPEN_APP_AUTHORIZE_SETTING, (options: OpenAppAuthorizeSettingOptions, exec: ApiExecutor<OpenAppAuthorizeSettingSuccess>)=>{
        const want: Want = {
            bundleName: 'com.huawei.hmos.settings',
            abilityName: 'com.huawei.hmos.settings.MainAbility',
            uri: 'application_info_entry',
            parameters: {
                pushParams: bundleManager1.getBundleInfoForSelfSync(bundleManager1.BundleFlag.GET_BUNDLE_INFO_DEFAULT).name
            }
        } as Want;
        const context = getContext() as common.UIAbilityContext;
        context.startAbility(want).then(()=>{
            exec.resolve({
                errMsg: ''
            } as OpenAppAuthorizeSettingSuccess);
        }, (err: Error)=>{
            exec.reject(err.message);
        });
    }) as OpenAppAuthorizeSetting;
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
    const pageScrollTo: PageScrollTo = defineAsyncApi<PageScrollToOptions, PageScrollToSuccess>(API_PAGE_SCROLL_TO, (options: PageScrollToOptions, res: ApiExecutor<PageScrollToSuccess>)=>{
        const pageId = getPageIdByVm2(getCurrentPageVm2()!)! as number;
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
    const showToast: ShowToast = defineAsyncApi<ShowToastOptions, ShowToastSuccess>(API_SHOW_TOAST, (options: ShowToastOptions, res: ApiExecutor<ShowToastSuccess>)=>{
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
    const hideToast: HideToast = defineAsyncApi(API_HIDE_TOAST, (_, res: ApiExecutor<Object>)=>{
        res.reject('hideToast is not supported on HarmonyOS');
    }) as HideToast;
    const showModal: ShowModal = defineAsyncApi<ShowModalOptions, ShowModalSuccess>(API_SHOW_MODAL, async (args: ShowModalOptions, res: ApiExecutor<ShowModalSuccess>)=>{
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
    const showActionSheet: ShowActionSheet = defineAsyncApi<ShowActionSheetOptions, ShowActionSheetSuccess>(API_SHOW_ACTION_SHEET, async (options: ShowActionSheetOptions, res: ApiExecutor<ShowActionSheetSuccess>)=>{
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
    const showLoading: ShowLoading = defineAsyncApi<ShowLoadingOptions, ShowLoadingSuccess>(API_SHOW_LOADING, async (options: ShowLoadingOptions, res: ApiExecutor<ShowLoadingSuccess>)=>{
        res.reject('showLoading is not supported on HarmonyOS');
    }, ShowLoadingProtocol, ShowLoadingApiOptions) as ShowLoading;
    const hideLoading: HideLoading = ()=>defineAsyncApi(API_HIDE_LOADING, (options: Object, res: ApiExecutor<Object>)=>{
            res.reject('hideLoading is not supported on HarmonyOS');
        });
    const API_RPX2PX = 'rpx2px';
    const EPS = 1e-4;
    const rpx2px: Rpx2px = defineSyncApi<number>(API_RPX2PX, (number: number): number =>{
        const windowStage: harmonyWindow.WindowStage = UTSHarmony3.getWindowStage();
        let windowWidthInVp: number = 384;
        let windowWidthInPx: number = 1344;
        if (windowStage) {
            const mainWindow: harmonyWindow.Window = windowStage.getMainWindowSync();
            windowWidthInPx = mainWindow.getWindowProperties().windowRect.width;
            windowWidthInVp = px2vp(windowWidthInPx);
        }
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
    const getStorage = defineAsyncApi<GetStorageOptions, GetStorageSuccess>(API_GET_STORAGE, (args: GetStorageOptions, exec: ApiExecutor<GetStorageSuccess>)=>{
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
        createStore().flush();
    }) as SetStorageSync;
    const setStorage = defineAsyncApi<SetStorageOptions, SetStorageSuccess>(API_SET_STORAGE, (args: SetStorageOptions, exec: ApiExecutor<SetStorageSuccess>)=>{
        createStore().put(args.key, stringifyStorageValue(args.data)).then(()=>{
            createStore().flush();
            exec.resolve({} as ESObject);
        }, (error: Error)=>{
            exec.reject(error.message);
        });
    }) as SetStorage;
    const removeStorageSync = defineSyncApi<void>(API_REMOVE_STORAGE_SYNC, (key: string)=>{
        createStore().deleteSync(key);
        createStore().flush();
    }) as RemoveStorageSync;
    const removeStorage = defineAsyncApi<RemoveStorageOptions, RemoveStorageSuccess>(API_REMOVE_STORAGE, (args: RemoveStorageOptions, exec: ApiExecutor<RemoveStorageSuccess>)=>{
        createStore().delete(args.key).then(()=>{
            createStore().flush();
            exec.resolve({} as ESObject);
        }, (error: Error)=>{
            exec.reject(error.message);
        });
    }) as RemoveStorage;
    const clearStorageSync = defineSyncApi<void>(API_CLEAR_STORAGE_SYNC, ()=>{
        createStore().clearSync();
        createStore().flush();
    }) as ClearStorageSync;
    const clearStorage = defineAsyncApi<ClearStorageOptions, ClearStorageSuccess>(API_CLEAR_STORAGE, (args: ClearStorageOptions, exec: ApiExecutor<ClearStorageSuccess>)=>{
        createStore().clear().then(()=>{
            createStore().flush();
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
    const getStorageInfo = defineAsyncApi<GetStorageInfoOptions, GetStorageInfoSuccess>(API_GET_STORAGE_INFO, (args: GetStorageInfoOptions, exec: ApiExecutor<GetStorageInfoSuccess>)=>{
        createStore().getAll().then((allData)=>{
            exec.resolve({
                keys: Object.keys(allData),
                currentSize: 0,
                limitSize: 0
            } as GetStorageInfoSuccess);
        });
    }) as GetStorageInfo;
    type ConnectSocket = (options: ConnectSocketOptions) => SocketTask;
    class ConnectSocketSuccess extends UTSObject {
        errMsg!: string;
    }
    type ConnectSocketSuccessCallback = (result: ConnectSocketSuccess) => void;
    type ConnectSocketErrorCode = 600009;
    interface ConnectSocketFail extends IUniError {
        errCode: ConnectSocketErrorCode;
    }
    type ConnectSocketFailCallback = (result: ConnectSocketFail) => void;
    type ConnectSocketComplete = Object;
    type ConnectSocketCompleteCallback = (result: ConnectSocketComplete) => void;
    class ConnectSocketOptions extends UTSObject {
        url!: string;
        header: UTSJSONObject | null = null;
        protocols: (string[]) | null = null;
        success: ConnectSocketSuccessCallback | null = null;
        fail: ConnectSocketFailCallback | null = null;
        complete: ConnectSocketCompleteCallback | null = null;
    }
    class GeneralCallbackResult extends UTSObject {
        errMsg!: string;
    }
    type SendSocketMessageErrorCode = 10001 | 10002 | 602001;
    interface SendSocketMessageFail extends IUniError {
        errCode: SendSocketMessageErrorCode;
    }
    class SendSocketMessageOptions extends UTSObject {
        data!: Object;
        success: ((result: GeneralCallbackResult) => void) | null = null;
        fail: ((result: SendSocketMessageFail) => void) | null = null;
        complete: ((result: Object) => void) | null = null;
    }
    class CloseSocketOptions extends UTSObject {
        code: number | null = null;
        reason: string | null = null;
        success: ((result: GeneralCallbackResult) => void) | null = null;
        fail: ((result: GeneralCallbackResult) => void) | null = null;
        complete: ((result: GeneralCallbackResult) => void) | null = null;
    }
    class OnSocketOpenCallbackResult extends UTSObject {
        header!: Object;
    }
    class OnSocketMessageCallbackResult extends UTSObject {
        data!: Object;
    }
    interface SocketTask {
        send(options: SendSocketMessageOptions): void;
        close(options: CloseSocketOptions): void;
        onOpen(callback: (result: OnSocketOpenCallbackResult) => void): void;
        onClose(callback: (result: Object) => void): void;
        onError(callback: (result: GeneralCallbackResult) => void): void;
        onMessage(callback: (result: OnSocketMessageCallbackResult) => void): void;
    }
    class OnSocketErrorCallbackResult extends UTSObject {
        errMsg!: string;
    }
    const API_CONNECT_SOCKET = 'connectSocket';
    const ConnectSocketApiProtocol = new Map<string, ProtocolOptions>([
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
                type: 'boolean',
                required: false
            }
        ],
        [
            'protocols',
            {
                type: 'string[]',
                required: false
            }
        ]
    ]);
    const ConnectSocketApiOptions: ApiOptions<ConnectSocketOptions> = {
        formatArgs: new Map<string, Function>([
            [
                'url',
                (url: string, params: ConnectSocketOptions)=>{
                    if (url == null) {
                        throw new Error('url is required');
                    }
                }
            ]
        ])
    };
    const tryExec = (fn: Function | null | undefined, ...args: Object[])=>{
        if (!fn) {
            return;
        }
        try {
            fn(...args);
        } catch (error) {
            console.error(error);
        }
    };
    class SocketTask1 implements SocketTask {
        private _ws: webSocket.WebSocket;
        constructor(ws: webSocket.WebSocket){
            this._ws = ws;
        }
        send(options: SendSocketMessageOptions) {
            this._ws.send(options.data as string | ArrayBuffer).then((success: boolean)=>{
                if (success) {
                    tryExec(options.success, {} as GeneralCallbackResult);
                } else {
                    tryExec(options.fail, new UniError('send message failed'));
                }
            }, (err: Error)=>{
                tryExec(options.fail, new UniError(err.message));
            });
        }
        close(options: CloseSocketOptions | null = null) {
            this._ws.close({
                code: typeof options?.code === 'number' ? options.code : 1000,
                reason: typeof options?.reason === 'string' ? options.reason : ''
            } as webSocket.WebSocketCloseOptions).then((success: boolean)=>{
                if (success) {
                    this._ws.off('open');
                    this._ws.off('message');
                    this._ws.off('close');
                    this._ws.off('error');
                    tryExec(options?.success, {} as GeneralCallbackResult);
                } else {
                    tryExec(options?.fail, new UniError('close socket failed'));
                }
            }, (err: Error)=>{
                tryExec(options?.fail, new UniError(err.message));
            });
        }
        onMessage(callback: Function) {
            this._ws.on('message', (_, data)=>{
                callback({
                    data
                } as OnSocketMessageCallbackResult);
            });
        }
        onOpen(callback: Function) {
            this._ws.on('open', (_, data)=>{
                callback(data);
            });
        }
        onError(callback: Function) {
            this._ws.on('error', (error)=>{
                callback({
                    errMsg: error.message
                } as OnSocketErrorCallbackResult);
            });
        }
        onClose(callback: Function) {
            this._ws.on('close', (_, data)=>{
                callback(data);
            });
        }
    }
    const connectSocket = defineTaskApi<ConnectSocketOptions, ConnectSocketSuccess, SocketTask>(API_CONNECT_SOCKET, (args: ConnectSocketOptions, exec: ApiExecutor<ConnectSocketSuccess>)=>{
        const ws = webSocket.createWebSocket();
        ws.connect(args.url, {
            header: args.header ? args.header as Object : undefined
        } as webSocket.WebSocketRequestOptions);
        return new SocketTask1(ws);
    }, ConnectSocketApiProtocol, ConnectSocketApiOptions) as ConnectSocket;
    interface UniExtApi {
        getClipboardData: GetClipboardData;
        setClipboardData: SetClipboardData;
        createIntersectionObserver: CreateIntersectionObserver;
        createSelectorQuery: CreateSelectorQuery;
        getAppBaseInfo: GetAppBaseInfo;
        getDeviceInfo: GetDeviceInfo;
        getProvider: GetProvider;
        getSystemInfo: GetSystemInfo;
        getSystemInfoSync: GetSystemInfoSync;
        getWindowInfo: GetWindowInfo;
        makePhoneCall: MakePhoneCall;
        chooseImage: ChooseImage;
        previewImage: PreviewImage;
        closePreviewImage: ClosePreviewImage;
        getImageInfo: GetImageInfo;
        saveImageToPhotosAlbum: SaveImageToPhotosAlbum;
        chooseVideo: ChooseVideo;
        saveVideoToPhotosAlbum: SaveVideoToPhotosAlbum;
        getVideoInfo: GetVideoInfo;
        setNavigationBarColor: SetNavigationBarColor;
        setNavigationBarTitle: SetNavigationBarTitle;
        request: Request<Object>;
        uploadFile: UploadFile;
        downloadFile: DownloadFile;
        openAppAuthorizeSetting: OpenAppAuthorizeSetting;
        pageScrollTo: PageScrollTo;
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
        connectSocket: ConnectSocket;
    }
    return {
        getClipboardData,
        setClipboardData,
        createIntersectionObserver,
        createSelectorQuery,
        getAppBaseInfo,
        getDeviceInfo,
        getProvider,
        getSystemInfo,
        getSystemInfoSync,
        getWindowInfo,
        makePhoneCall,
        chooseImage,
        previewImage,
        closePreviewImage,
        getImageInfo,
        saveImageToPhotosAlbum,
        chooseVideo,
        saveVideoToPhotosAlbum,
        getVideoInfo,
        setNavigationBarColor,
        setNavigationBarTitle,
        request,
        uploadFile,
        downloadFile,
        openAppAuthorizeSetting,
        pageScrollTo,
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
        clearStorageSync,
        connectSocket
    } as UniExtApi;
}
