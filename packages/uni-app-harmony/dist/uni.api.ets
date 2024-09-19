import Want from '@ohos.app.ability.Want';
import common from '@ohos.app.ability.common';
import wantConstant from '@ohos.app.ability.wantConstant';
import buffer from '@ohos.buffer';
import deviceInfo from '@ohos.deviceInfo';
import fs from '@ohos.file.fs';
import photoAccessHelper from '@ohos.file.photoAccessHelper';
import inputMethod from '@ohos.inputMethod';
import image from '@ohos.multimedia.image';
import connection from '@ohos.net.connection';
import http from '@ohos.net.http';
import webSocket from '@ohos.net.webSocket';
import call from '@ohos.telephony.call';
import radio from '@ohos.telephony.radio';
import webview from '@ohos.web.webview';
import { BusinessError as BusinessError1 } from '@kit.BasicServicesKit';
import { BusinessError as BusinessError10 } from '@ohos.base';
import { BusinessError as BusinessError2 } from '@ohos.base';
import { BusinessError as BusinessError3 } from '@kit.BasicServicesKit';
import { BusinessError as BusinessError4 } from '@kit.BasicServicesKit';
import { BusinessError as BusinessError5 } from '@kit.BasicServicesKit';
import { BusinessError as BusinessError6 } from '@kit.BasicServicesKit';
import { BusinessError as BusinessError7 } from '@kit.BasicServicesKit';
import { BusinessError as BusinessError8 } from '@kit.BasicServicesKit';
import { BusinessError as BusinessError9 } from '@ohos.base';
import { BusinessError } from '@kit.BasicServicesKit';
import { CompressorResponseCode, CompressorResponse, VideoCompressor, CompressQuality } from '@ohos/videocompressor';
import { Emitter as Emitter5, getCurrentMP as getCurrentMP4 } from "@dcloudio/uni-mp-sdk";
import { Emitter } from "@dcloudio/uni-mp-sdk";
import Hash from '@ohos.file.hash';
import I18n from '@ohos.i18n';
import I18n1 from '@ohos.i18n';
import I18n2 from '@ohos.i18n';
import { ListFileOptions } from '@ohos.file.fs';
import { ReadOptions } from '@ohos.file.fs';
import { UTSHarmony as UTSHarmony1 } from "@dcloudio/uni-mp-sdk";
import { UTSHarmony as UTSHarmony10 } from "@dcloudio/uni-mp-sdk";
import { UTSHarmony as UTSHarmony2 } from "@dcloudio/uni-mp-sdk";
import { UTSHarmony as UTSHarmony3 } from "@dcloudio/uni-mp-sdk";
import { UTSHarmony as UTSHarmony4, getDeviceId } from "@dcloudio/uni-mp-sdk";
import { UTSHarmony as UTSHarmony5, Emitter as Emitter1, onNativePageReady } from "@dcloudio/uni-mp-sdk";
import { UTSHarmony as UTSHarmony6 } from "@dcloudio/uni-mp-sdk";
import { UTSHarmony as UTSHarmony7, getWindowInfo as internalGetWindowInfo, getDeviceId as getDeviceId1 } from "@dcloudio/uni-mp-sdk";
import { UTSHarmony as UTSHarmony8 } from "@dcloudio/uni-mp-sdk";
import { UTSHarmony as UTSHarmony9 } from "@dcloudio/uni-mp-sdk";
import { UTSHarmony } from "@dcloudio/uni-mp-sdk";
import { UTSObject, UTSJSONObject } from "@dcloudio/uts-harmony";
import { UniError, IUniError, UniProvider, string, AsyncApiSuccessResult, AsyncApiResult, ApiOptions, ProtocolOptions, defineAsyncApi, ApiExecutor, ApiError, defineSyncApi, getUniProviders, defineTaskApi, getUniProvider } from "@dcloudio/uni-app-harmony";
import Want1 from '@ohos.app.ability.Want';
import { abilityAccessCtrl } from '@kit.AbilityKit';
import { access } from '@kit.ConnectivityKit';
import { audio as audio1 } from '@kit.AudioKit';
import { audio } from '@kit.AudioKit';
import { avSession } from '@kit.AVSessionKit';
import { backgroundTaskManager } from '@kit.BackgroundTasksKit';
import { bundleManager } from '@kit.AbilityKit';
import bundleManager1 from '@ohos.bundle.bundleManager';
import bundleManager2 from '@ohos.bundle.bundleManager';
import { camera } from '@kit.CameraKit';
import { cameraPicker as cameraPicker1 } from '@kit.CameraKit';
import { cameraPicker } from '@kit.CameraKit';
import { clipboard } from "@dcloudio/uni-mp-sdk";
import common1 from '@ohos.app.ability.common';
import common2 from '@ohos.app.ability.common';
import common3 from '@ohos.app.ability.common';
import common4 from '@ohos.app.ability.common';
import { contact } from '@kit.ContactsKit';
import dataPreferences from '@ohos.data.preferences';
import deviceInfo1 from '@ohos.deviceInfo';
import { display } from '@kit.ArkUI';
import { fileIo as fileIo1 } from '@kit.CoreFileKit';
import { fileIo as fileIo2 } from '@kit.CoreFileKit';
import { fileIo as fileIo3 } from '@kit.CoreFileKit';
import { fileIo as fileIo4 } from '@kit.CoreFileKit';
import { fileIo as fs2 } from '@kit.CoreFileKit';
import { fileIo } from '@kit.CoreFileKit';
import fileUri from '@ohos.file.fileuri';
import fs1 from '@ohos.file.fs';
import fs3 from '@ohos.file.fs';
import fs4 from '@ohos.file.fs';
import fs5 from '@ohos.file.fs';
import { geoLocationManager } from '@kit.LocationKit';
import { getAbilityContext as getAbilityContext1 } from "@dcloudio/uni-mp-sdk";
import { getAbilityContext as getAbilityContext10, getCurrentMP as getCurrentMP3 } from "@dcloudio/uni-mp-sdk";
import { getAbilityContext as getAbilityContext3 } from "@dcloudio/uni-mp-sdk";
import { getAbilityContext as getAbilityContext4, getCurrentWindow as getCurrentWindow2 } from "@dcloudio/uni-mp-sdk";
import { getAbilityContext as getAbilityContext5 } from "@dcloudio/uni-mp-sdk";
import { getAbilityContext as getAbilityContext6 } from "@dcloudio/uni-mp-sdk";
import { getAbilityContext as getAbilityContext7 } from "@dcloudio/uni-mp-sdk";
import { getAbilityContext as getAbilityContext8 } from "@dcloudio/uni-mp-sdk";
import { getAbilityContext as getAbilityContext9 } from "@dcloudio/uni-mp-sdk";
import { getAbilityContext } from "@dcloudio/uni-mp-sdk";
import { getCurrentWindow as getCurrentWindow1 } from "@dcloudio/uni-mp-sdk";
import { getCurrentWindow as getCurrentWindow3 } from "@dcloudio/uni-mp-sdk";
import { getCurrentWindow as getCurrentWindow4 } from "@dcloudio/uni-mp-sdk";
import { getCurrentWindow as getCurrentWindow5 } from "@dcloudio/uni-mp-sdk";
import { getCurrentWindow } from "@dcloudio/uni-mp-sdk";
import { getEnv as getEnv1 } from "@dcloudio/uni-mp-sdk";
import { getEnv as getEnv2 } from "@dcloudio/uni-mp-sdk";
import { getEnv as getEnv3, Emitter as Emitter4, getCurrentMP as getCurrentMP2 } from "@dcloudio/uni-mp-sdk";
import { getEnv, getRealPath } from "@dcloudio/uni-mp-sdk";
import { getOSRuntime as getOSRuntime1, onNativePageReady as onNativePageReady2 } from "@dcloudio/uni-mp-sdk";
import { getOSRuntime } from "@dcloudio/uni-mp-sdk";
import { getRealPath as getRealPath1 } from "@dcloudio/uni-mp-sdk";
import { getRealPath as getRealPath2, onNativePageReady as onNativePageReady1 } from "@dcloudio/uni-mp-sdk";
import { getRealPath as getRealPath3, Emitter as Emitter3, getCurrentMP as getCurrentMP1 } from "@dcloudio/uni-mp-sdk";
import { getResourceStr, getAbilityContext as getAbilityContext2 } from "@dcloudio/uni-mp-sdk";
import { getTabBar } from "@dcloudio/uni-mp-sdk";
import harmonyUrl from '@ohos.url';
import harmonyUrl1 from '@ohos.url';
import harmonyWindow from '@ohos.window';
import http1 from '@ohos.net.http';
import http2 from '@ohos.net.http';
import { image as image1 } from '@kit.ImageKit';
import { isPlainObject, Emitter as Emitter2, getCurrentMP } from "@dcloudio/uni-mp-sdk";
import { media as media1 } from '@kit.MediaKit';
import { media } from '@kit.MediaKit';
import media2 from '@ohos.multimedia.media';
import media3 from '@ohos.multimedia.media';
import { notificationManager } from '@kit.NotificationKit';
import photoAccessHelper1 from '@ohos.file.photoAccessHelper';
import photoAccessHelper2 from '@ohos.file.photoAccessHelper';
import photoAccessHelper3 from '@ohos.file.photoAccessHelper';
import photoAccessHelper4 from '@ohos.file.photoAccessHelper';
import { picker, fileIo as fileIo5 } from '@kit.CoreFileKit';
import { promptAction as promptAction1 } from '@kit.ArkUI';
import { promptAction as promptAction2 } from '@kit.ArkUI';
import { promptAction as promptAction4 } from '@kit.ArkUI';
import { promptAction } from '@kit.ArkUI';
import promptAction3 from '@ohos.promptAction';
import promptAction5 from '@ohos.promptAction';
import { scanCore, scanBarcode } from '@kit.ScanKit';
import { startPullDownRefresh as internalStartPullDownRefresh, stopPullDownRefresh as internalStopPullDownRefresh } from "@dcloudio/uni-mp-sdk";
import { systemShare } from '@kit.ShareKit';
import { uni } from "@dcloudio/uni-mp-sdk";
import { uniformTypeDescriptor } from '@kit.ArkData';
import { userAuth } from '@kit.UserAuthenticationKit';
import { wantAgent } from '@kit.AbilityKit';
import { wifiManager } from '@kit.ConnectivityKit';
import { window as window1 } from '@kit.ArkUI';
import { window as window2 } from '@kit.ArkUI';
import { window } from '@kit.ArkUI';
type AddPhoneContact = (options: AddPhoneContactOptions) => void;
class AddPhoneContactSuccess extends UTSObject {
}
class UniError1 extends UTSObject {
    errSubject!: string;
    errCode!: number;
    errMsg!: string;
    data: object | null = null;
    cause: Object | null = null;
}
type AddPhoneContactSuccessCallback = (result: AddPhoneContactSuccess) => void;
type AddPhoneContactFail = UniError1;
type AddPhoneContactFailCallback = (result: AddPhoneContactFail) => void;
type AddPhoneContactComplete = Object;
type AddPhoneContactCompleteCallback = (result: AddPhoneContactComplete) => void;
class AddPhoneContactOptions extends UTSObject {
    photoFilePath: string | null = null;
    nickName: string | null = null;
    lastName: string | null = null;
    middleName: string | null = null;
    firstName: string | null = null;
    remark: string | null = null;
    mobilePhoneNumber: string | null = null;
    weChatNumber: string | null = null;
    addressCountry: string | null = null;
    addressState: string | null = null;
    addressCity: string | null = null;
    addressStreet: string | null = null;
    addressPostalCode: string | null = null;
    organization: string | null = null;
    title: string | null = null;
    workFaxNumber: string | null = null;
    workPhoneNumber: string | null = null;
    hostNumber: string | null = null;
    email: string | null = null;
    url: string | null = null;
    workAddressCountry: string | null = null;
    workAddressState: string | null = null;
    workAddressCity: string | null = null;
    workAddressStreet: string | null = null;
    workAddressPostalCode: string | null = null;
    homeFaxNumber: string | null = null;
    homePhoneNumber: string | null = null;
    homeAddressCountry: string | null = null;
    homeAddressState: string | null = null;
    homeAddressCity: string | null = null;
    homeAddressStreet: string | null = null;
    homeAddressPostalCode: string | null = null;
    success: AddPhoneContactSuccessCallback | null = null;
    fail: AddPhoneContactFailCallback | null = null;
    complete: AddPhoneContactCompleteCallback | null = null;
}
type StartSoterAuthentication = (options: StartSoterAuthenticationOptions) => void;
type SoterAuthMode = 'fingerPrint' | 'facial' | 'speech';
class StartSoterAuthenticationSuccess extends UTSObject {
    errCode!: number;
    authMode!: SoterAuthMode;
    resultJSON: string | null = null;
    resultJSONSignature: string | null = null;
    errMsg!: string;
}
type StartSoterAuthenticationSuccessCallback = (result: StartSoterAuthenticationSuccess) => void;
type StartSoterAuthenticationFail = UniError2;
class UniError2 extends UTSObject {
    errSubject!: string;
    errCode!: number;
    errMsg!: string;
    data: object | null = null;
    cause: Object | null = null;
}
type StartSoterAuthenticationFailCallback = (result: StartSoterAuthenticationFail) => void;
type StartSoterAuthenticationComplete = Object;
type StartSoterAuthenticationCompleteCallback = (result: StartSoterAuthenticationComplete) => void;
class StartSoterAuthenticationOptions extends UTSObject {
    requestAuthModes!: SoterAuthMode[];
    challenge: string | null = null;
    authContent: string | null = null;
    success: StartSoterAuthenticationSuccessCallback | null = null;
    fail: StartSoterAuthenticationFailCallback | null = null;
    complete: StartSoterAuthenticationCompleteCallback | null = null;
}
type CheckIsSupportSoterAuthentication = (options: CheckIsSupportSoterAuthenticationOptions) => void;
class CheckIsSupportSoterAuthenticationSuccess extends UTSObject {
    supportMode!: SoterAuthMode[];
    errMsg!: string;
}
type CheckIsSupportSoterAuthenticationSuccessCallback = (result: CheckIsSupportSoterAuthenticationSuccess) => void;
type CheckIsSupportSoterAuthenticationFail = UniError2;
type CheckIsSupportSoterAuthenticationFailCallback = (result: CheckIsSupportSoterAuthenticationFail) => void;
type CheckIsSupportSoterAuthenticationComplete = Object;
type CheckIsSupportSoterAuthenticationCompleteCallback = (result: CheckIsSupportSoterAuthenticationComplete) => void;
class CheckIsSupportSoterAuthenticationOptions extends UTSObject {
    success: CheckIsSupportSoterAuthenticationSuccessCallback | null = null;
    fail: CheckIsSupportSoterAuthenticationFailCallback | null = null;
    complete: CheckIsSupportSoterAuthenticationCompleteCallback | null = null;
}
type CheckIsSoterEnrolledInDevice = (options: CheckIsSoterEnrolledInDeviceOptions) => void;
class CheckIsSoterEnrolledInDeviceSuccess extends UTSObject {
    isEnrolled!: boolean;
    errMsg!: string;
}
type CheckIsSoterEnrolledInDeviceSuccessCallback = (result: CheckIsSoterEnrolledInDeviceSuccess) => void;
type CheckIsSoterEnrolledInDeviceFail = UniError2;
type CheckIsSoterEnrolledInDeviceFailCallback = (result: CheckIsSoterEnrolledInDeviceFail) => void;
type CheckIsSoterEnrolledInDeviceComplete = Object;
type CheckIsSoterEnrolledInDeviceCompleteCallback = (result: CheckIsSoterEnrolledInDeviceComplete) => void;
class CheckIsSoterEnrolledInDeviceOptions extends UTSObject {
    checkAuthMode!: SoterAuthMode;
    success: CheckIsSoterEnrolledInDeviceSuccessCallback | null = null;
    fail: CheckIsSoterEnrolledInDeviceFailCallback | null = null;
    complete: CheckIsSoterEnrolledInDeviceCompleteCallback | null = null;
}
export type SetClipboardData = (options: SetClipboardDataOptions) => void;
export class SetClipboardDataSuccess extends UTSObject {
}
type SetClipboardDataSuccessCallback = (result: SetClipboardDataSuccess) => void;
type SetClipboardDataFail = UniError;
type SetClipboardDataFailCallback = (result: SetClipboardDataFail) => void;
type SetClipboardDataComplete = Object;
type SetClipboardDataCompleteCallback = (result: SetClipboardDataComplete) => void;
export class SetClipboardDataOptions extends UTSObject {
    data!: string;
    showToast: boolean | null = null;
    success: SetClipboardDataSuccessCallback | null = null;
    fail: SetClipboardDataFailCallback | null = null;
    complete: SetClipboardDataCompleteCallback | null = null;
}
export type GetClipboardData = (options: GetClipboardDataOptions) => void;
export class GetClipboardDataSuccess extends UTSObject {
    data!: string;
}
type GetClipboardDataSuccessCallback = (result: GetClipboardDataSuccess) => void;
type GetClipboardDataFail = UniError;
type GetClipboardDataFailCallback = (result: GetClipboardDataFail) => void;
type GetClipboardDataComplete = Object;
type GetClipboardDataCompleteCallback = (result: GetClipboardDataComplete) => void;
export class GetClipboardDataOptions extends UTSObject {
    success: GetClipboardDataSuccessCallback | null = null;
    fail: GetClipboardDataFailCallback | null = null;
    complete: GetClipboardDataCompleteCallback | null = null;
}
interface ClipboardModuleGetStringOptions {
    result: string;
    data: string;
}
type CreateInnerAudioContext = () => InnerAudioContext;
interface InnerAudioContext {
    duration: number;
    currentTime: number;
    paused: boolean;
    src: string;
    startTime: number;
    buffered: number;
    autoplay: boolean;
    loop: boolean;
    obeyMuteSwitch: boolean;
    volume: number;
    playbackRate?: number;
    pause(): void;
    stop(): void;
    play(): void;
    seek(position: number): void;
    destroy(): void;
    onCanplay(callback: (result: Object) => void): void;
    onPlay(callback: (result: Object) => void): void;
    onPause(callback: (result: Object) => void): void;
    onStop(callback: (result: Object) => void): void;
    onEnded(callback: (result: Object) => void): void;
    onTimeUpdate(callback: (result: Object) => void): void;
    onError(callback: (result: Object) => void): void;
    onWaiting(callback: (result: Object) => void): void;
    onSeeking(callback: (result: Object) => void): void;
    onSeeked(callback: (result: Object) => void): void;
    offCanplay(callback: (result: Object) => void): void;
    offPlay(callback: (result: Object) => void): void;
    offPause(callback: (result: Object) => void): void;
    offStop(callback: (result: Object) => void): void;
    offEnded(callback: (result: Object) => void): void;
    offTimeUpdate(callback: (result: Object) => void): void;
    offError(callback: (result: Object) => void): void;
    offWaiting(callback: (result: Object) => void): void;
    offSeeking(callback: (result: Object) => void): void;
    offSeeked(callback: (result: Object) => void): void;
}
type $OnCallback = Function;
type $On = (eventName: string, callback: $OnCallback) => void;
type $OnceCallback = Function;
type $Once = (eventName: string, callback: $OnceCallback) => void;
type $OffCallback = Function;
type $Off = (eventName: string, callback?: $OffCallback | null) => void;
type $Emit = (eventName: string, args: Object | null) => void;
interface IUniEventEmitter {
    on: (eventName: string, callback: Function) => void;
    once: (eventName: string, callback: Function) => void;
    off: (eventName: string, callback?: Function | null) => void;
    emit: (eventName: string, ...args: (Object | undefined | null)[]) => void;
}
class ExitSuccess extends UTSObject {
    errMsg!: string;
}
type ExitErrorCode = 12001 | 12002;
interface IExitError extends IUniError {
    errCode: ExitErrorCode;
}
type ExitFail = IExitError;
type ExitSuccessCallback = (res: ExitSuccess) => void;
type ExitFailCallback = (res: ExitFail) => void;
type ExitCompleteCallback = (res: Object) => void;
class ExitOptions extends UTSObject {
    success: ExitSuccessCallback | null = null;
    fail: ExitFailCallback | null = null;
    complete: ExitCompleteCallback | null = null;
}
type Exit = (options?: ExitOptions | null) => void;
export class SaveFileSuccess extends UTSObject {
    savedFilePath!: string;
}
type SaveFileSuccessCallback = (res: SaveFileSuccess) => void;
export class SaveFileFail extends UTSObject {
}
type SaveFileFailCallback = (res: SaveFileFail) => void;
type SaveFileCompleteCallback = (res: Object) => void;
export class SaveFileOptions extends UTSObject {
    tempFilePath!: string;
    success: SaveFileSuccessCallback | null = null;
    fail: SaveFileFailCallback | null = null;
    complete: SaveFileCompleteCallback | null = null;
}
export class GetFileInfoSuccess extends UTSObject {
    digest!: string;
    size!: number;
}
type GetFileInfoSuccessCallback = (res: GetFileInfoSuccess) => void;
export class GetFileInfoFail extends UTSObject {
}
type GetFileInfoFailCallback = (res: GetFileInfoFail) => void;
type GetFileInfoCompleteCallback = (res: Object) => void;
export class GetFileInfoOptions extends UTSObject {
    filePath!: string;
    digestAlgorithm: string | null = null;
    success: GetFileInfoSuccessCallback | null = null;
    fail: GetFileInfoFailCallback | null = null;
    complete: GetFileInfoCompleteCallback | null = null;
}
export class GetSavedFileInfoSuccess extends UTSObject {
    size!: number;
    createTime!: number;
}
type GetSavedFileInfoSuccessCallback = (res: GetSavedFileInfoSuccess) => void;
export class GetSavedFileInfoFail extends UTSObject {
}
type GetSavedFileInfoFailCallback = (res: GetSavedFileInfoFail) => void;
type GetSavedFileInfoCompleteCallback = (res: Object) => void;
export class GetSavedFileInfoOptions extends UTSObject {
    filePath!: string;
    success: GetSavedFileInfoSuccessCallback | null = null;
    fail: GetSavedFileInfoFailCallback | null = null;
    complete: GetSavedFileInfoCompleteCallback | null = null;
}
export class RemoveSavedFileSuccess extends UTSObject {
}
type RemoveSavedFileSuccessCallback = (res: RemoveSavedFileSuccess) => void;
export class RemoveSavedFileFail extends UTSObject {
}
type RemoveSavedFileFailCallback = (res: RemoveSavedFileFail) => void;
type RemoveSavedFileCompleteCallback = (res: Object) => void;
export class RemoveSavedFileOptions extends UTSObject {
    filePath!: string;
    success: RemoveSavedFileSuccessCallback | null = null;
    fail: RemoveSavedFileFailCallback | null = null;
    complete: RemoveSavedFileCompleteCallback | null = null;
}
export class SavedFileListItem extends UTSObject {
    filePath!: string;
    size!: number;
    createTime!: number;
}
export class GetSavedFileListSuccess extends UTSObject {
    fileList!: SavedFileListItem[];
}
type GetSavedFileListSuccessCallback = (res: GetSavedFileListSuccess) => void;
export class GetSavedFileListFail extends UTSObject {
}
type GetSavedFileListFailCallback = (res: GetSavedFileListFail) => void;
type GetSavedFileListCompleteCallback = (res: Object) => void;
export class GetSavedFileListOptions extends UTSObject {
    success: GetSavedFileListSuccessCallback | null = null;
    fail: GetSavedFileListFailCallback | null = null;
    complete: GetSavedFileListCompleteCallback | null = null;
}
export type SaveFile = (options?: SaveFileOptions | null) => void;
export type GetFileInfo = (options?: GetFileInfoOptions | null) => void;
export type GetSavedFileInfo = (options?: GetSavedFileInfoOptions | null) => void;
export type RemoveSavedFile = (options?: RemoveSavedFileOptions | null) => void;
export type GetSavedFileList = (options?: GetSavedFileListOptions | null) => void;
type GetAppAuthorizeSetting = () => GetAppAuthorizeSettingResult;
class GetAppAuthorizeSettingResult extends UTSObject {
    albumAuthorized!: 'authorized' | 'denied' | 'not determined' | 'config error';
    bluetoothAuthorized!: 'authorized' | 'denied' | 'not determined' | 'config error';
    cameraAuthorized!: 'authorized' | 'denied' | 'not determined' | 'config error';
    locationAuthorized!: 'authorized' | 'denied' | 'not determined' | 'config error';
    locationAccuracy: 'reduced' | 'full' | 'unsupported' | null = null;
    locationReducedAccuracy: boolean | null = null;
    microphoneAuthorized!: 'authorized' | 'denied' | 'not determined' | 'config error';
    notificationAuthorized!: 'authorized' | 'denied' | 'not determined' | 'config error';
    notificationAlertAuthorized: 'authorized' | 'denied' | 'not determined' | 'config error' | null = null;
    notificationBadgeAuthorized: 'authorized' | 'denied' | 'not determined' | 'config error' | null = null;
    notificationSoundAuthorized: 'authorized' | 'denied' | 'not determined' | 'config error' | null = null;
    phoneCalendarAuthorized: 'authorized' | 'denied' | 'not determined' | null = null;
}
class GetAppBaseInfoOptions extends UTSObject {
    filter!: Array<string>;
}
export class GetAppBaseInfoResult extends UTSObject {
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
    channel: string | null = null;
}
export type GetAppBaseInfo = (options?: GetAppBaseInfoOptions | null) => GetAppBaseInfoResult;
interface IAppBaseInfoAppVersion {
    name: string;
    code: string;
}
type GetBackgroundAudioManager = () => BackgroundAudioManager;
interface BackgroundAudioManager {
    duration: number;
    currentTime: number;
    paused: boolean;
    src: string;
    startTime: number;
    buffered: number;
    title: string;
    epname: string;
    singer: string;
    coverImgUrl: string;
    webUrl: string;
    protocol: string;
    playbackRate?: number;
    play(): void;
    pause(): void;
    seek(position: number): void;
    stop(): void;
    onCanplay(callback: (result: Object) => void): void;
    onPlay(callback: (result: Object) => void): void;
    onPause(callback: (result: Object) => void): void;
    onStop(callback: (result: Object) => void): void;
    onEnded(callback: (result: Object) => void): void;
    onTimeUpdate(callback: (result: Object) => void): void;
    onPrev(callback: (result: Object) => void): void;
    onNext(callback: (result: Object) => void): void;
    onError(callback: (result: Object) => void): void;
    onWaiting(callback: (result: Object) => void): void;
}
interface TempAbilityInfo {
    bundleName: string;
    name: string;
}
class GetDeviceInfoOptions extends UTSObject {
    filter!: Array<string>;
}
export class GetDeviceInfoResult extends UTSObject {
    brand: string | null = null;
    deviceBrand: string | null = null;
    deviceId: string | null = null;
    model: string | null = null;
    deviceModel: string | null = null;
    deviceType: 'phone' | 'pad' | 'tv' | 'watch' | 'pc' | 'undefined' | 'car' | 'vr' | 'appliance' | null = null;
    deviceOrientation: string | null = null;
    devicePixelRatio: number | null = null;
    system: string | null = null;
    platform: 'ios' | 'android' | 'harmonyos' | 'mac' | 'windows' | 'linux' | null = null;
    isRoot: boolean | null = null;
    isSimulator: boolean | null = null;
    isUSBDebugging: boolean | null = null;
    osName: 'ios' | 'android' | 'harmonyos' | 'macos' | 'windows' | 'linux' | null = null;
    osVersion: string | null = null;
    osLanguage: string | null = null;
    osTheme: 'light' | 'dark' | null = null;
    osAndroidAPILevel: number | null = null;
    romName: string | null = null;
    romVersion: string | null = null;
}
export type GetDeviceInfo = (options?: GetDeviceInfoOptions | null) => GetDeviceInfoResult;
type GetNetworkType = (options: GetNetworkTypeOptions) => void;
class GetNetworkTypeSuccess extends UTSObject {
    networkType!: string;
}
type GetNetworkTypeSuccessCallback = (result: GetNetworkTypeSuccess) => void;
type GetNetworkTypeFail = UniError;
type GetNetworkTypeFailCallback = (result: GetNetworkTypeFail) => void;
type GetNetworkTypeComplete = Object;
type GetNetworkTypeCompleteCallback = (result: GetNetworkTypeComplete) => void;
class GetNetworkTypeOptions extends UTSObject {
    success: GetNetworkTypeSuccessCallback | null = null;
    fail: GetNetworkTypeFailCallback | null = null;
    complete: GetNetworkTypeCompleteCallback | null = null;
}
class OnNetworkStatusChangeCallbackResult extends UTSObject {
    isConnected!: boolean;
    networkType!: string;
}
type OnNetworkStatusChangeCallback = (result: OnNetworkStatusChangeCallbackResult) => void;
type OnNetworkStatusChange = (callback: OnNetworkStatusChangeCallback) => void;
type OffNetworkStatusChange = (callback: (result: Object) => void) => void;
interface IUniGetNetworkTypeEventEmitter {
    on: (eventName: string, callback: Function) => void;
    once: (eventName: string, callback: Function) => void;
    off: (eventName: string, callback?: Function) => void;
    emit: (eventName: string, ...args: (Object | undefined | null)[]) => void;
}
export class GetProviderSuccess extends UTSObject {
    service!: 'payment' | 'oauth';
    provider!: string[];
    providers!: UniProvider[];
}
export class GetProviderSyncSuccess extends UTSObject {
    service!: 'payment' | 'location' | 'oauth';
    providerIds!: string[];
    providerObjects!: UniProvider[];
}
export type GetProviderSync = (options: GetProviderSyncOptions) => GetProviderSyncSuccess;
export class GetProviderSyncOptions extends UTSObject {
    service!: 'payment' | 'location' | 'oauth';
}
type GetProviderSuccessCallback = (result: GetProviderSuccess) => void;
type GetProviderFail = IGetProviderFail;
type GetProviderFailCallback = (result: GetProviderFail) => void;
type GetProviderComplete = Object;
type GetProviderCompleteCallback = (result: GetProviderComplete) => void;
export class GetProviderOptions extends UTSObject {
    service!: 'payment' | 'oauth';
    success: GetProviderSuccessCallback | null = null;
    fail: GetProviderFailCallback | null = null;
    complete: GetProviderCompleteCallback | null = null;
}
export type GetProvider = (options: GetProviderOptions) => void;
type ProviderErrorCode = 110600;
interface IGetProviderFail extends IUniError {
    errCode: ProviderErrorCode;
}
type GetRecorderManager = () => RecorderManager;
class RecorderManagerStartOptions extends UTSObject {
    duration: number | null = null;
    sampleRate: number | null = null;
    numberOfChannels: number | null = null;
    encodeBitRate: number | null = null;
    format: 'aac' | 'mp3' | 'PCM' | 'wav' | null = null;
    frameSize: number | null = null;
}
interface RecorderManagerOnStopResult {
    tempFilePath: string;
}
interface RecorderManager {
    start(options: RecorderManagerStartOptions): void;
    pause(): void;
    resume(): void;
    stop(): void;
    onStart(options: (result: Object) => void): void;
    onPause(options: (result: Object) => void): void;
    onStop(options: (result: RecorderManagerOnStopResult) => void): void;
    onFrameRecorded(options: (result: Object) => void): void;
    onError(options: (result: Object) => void): void;
    onResume?: (options: (result: Object) => void) => void;
    onInterruptionBegin?: (options: (result: Object) => void) => void;
    onInterruptionEnd?: (options: (result: Object) => void) => void;
}
type RecorderState = 'pause' | 'resume' | 'start' | 'stop' | 'error' | 'frameRecorded' | 'interruptionBegin' | 'interruptionEnd';
interface Callbacks {
    pause: Function[];
    resume: Function[];
    start: Function[];
    stop: Function[];
    error: Function[];
    frameRecorded: Function[];
    interruptionBegin: Function[];
    interruptionEnd: Function[];
}
interface StateChangeRes extends RecorderManagerOnStopResult {
    errMsg?: string;
    frameBuffer?: ArrayBuffer;
    isLastFrame?: boolean;
}
export type GetSystemInfo = (options: GetSystemInfoOptions) => void;
export type GetSystemInfoSync = () => GetSystemInfoResult;
export type GetWindowInfo = () => GetWindowInfoResult;
export class SafeArea extends UTSObject {
    left!: number;
    right!: number;
    top!: number;
    bottom!: number;
    width!: number;
    height!: number;
}
export class SafeAreaInsets extends UTSObject {
    left!: number;
    right!: number;
    top!: number;
    bottom!: number;
}
export class GetSystemInfoResult extends UTSObject {
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
    osName!: 'ios' | 'android' | 'harmonyos' | 'macos' | 'windows' | 'linux';
    osVersion!: string;
    osLanguage!: string;
    osTheme: 'light' | 'dark' | null = null;
    pixelRatio!: number;
    platform!: 'ios' | 'android' | 'harmonyos' | 'mac' | 'windows' | 'linux';
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
export class GetSystemInfoOptions extends UTSObject {
    success: GetSystemInfoSuccessCallback | null = null;
    fail: GetSystemInfoFailCallback | null = null;
    complete: GetSystemInfoCompleteCallback | null = null;
}
export class GetWindowInfoResult extends UTSObject {
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
interface ISystemInfoAppVersion {
    name: string;
    code: string;
}
class GetSystemSettingResult extends UTSObject {
    bluetoothEnabled: boolean | null = null;
    bluetoothError: string | null = null;
    locationEnabled!: boolean;
    wifiEnabled: boolean | null = null;
    wifiError: string | null = null;
    deviceOrientation!: 'portrait' | 'landscape';
}
type GetSystemSetting = () => GetSystemSettingResult;
export class HideKeyboardSuccess extends UTSObject {
}
export class HideKeyboardFail extends UTSObject {
}
type HideKeyboardSuccessCallback = (res: HideKeyboardSuccess) => void;
type HideKeyboardFailCallback = (res: HideKeyboardFail) => void;
type HideKeyboardCompleteCallback = (res: Object) => void;
export class HideKeyboardOptions extends UTSObject {
    success: HideKeyboardSuccessCallback | null = null;
    fail: HideKeyboardFailCallback | null = null;
    complete: HideKeyboardCompleteCallback | null = null;
}
type HideKeyboard = (options?: HideKeyboardOptions | null) => void;
export type MakePhoneCall = (options: MakePhoneCallOptions) => void;
export class MakePhoneCallSuccess extends UTSObject {
}
type MakePhoneCallSuccessCallback = (result: MakePhoneCallSuccess) => void;
type MakePhoneCallFail = UniError;
type MakePhoneCallFailCallback = (result: MakePhoneCallFail) => void;
type MakePhoneCallComplete = Object;
type MakePhoneCallCompleteCallback = (result: MakePhoneCallComplete) => void;
export class MakePhoneCallOptions extends UTSObject {
    phoneNumber!: string;
    success: MakePhoneCallSuccessCallback | null = null;
    fail: MakePhoneCallFailCallback | null = null;
    complete: MakePhoneCallCompleteCallback | null = null;
}
type MediaOrientation = 'up' | 'down' | 'left' | 'right' | 'up-mirrored' | 'down-mirrored' | 'left-mirrored' | 'right-mirrored';
type MediaErrorCode = 1101001 | 1101002 | 1101003 | 1101004 | 1101005 | 1101006 | 1101007 | 1101008 | 1101009 | 1101010;
interface IMediaError extends IUniError {
    errCode: MediaErrorCode;
}
class ChooseImageTempFile extends UTSObject {
    path!: string;
    size!: number;
    name: string | null = null;
    type: string | null = null;
}
export class ChooseImageSuccess extends UTSObject {
    errSubject!: string;
    errMsg!: string;
    tempFilePaths!: Array<string>;
    tempFiles!: ChooseImageTempFile[];
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
export class PreviewImageOptions extends UTSObject {
    current: Object | null = null;
    urls!: Array<string.ImageURIString>;
    showmenu: boolean | null = null;
    indicator: 'default' | 'number' | 'none' | null = null;
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
type ClosePreviewImageFail = IMediaError;
type ClosePreviewImageSuccessCallback = (callback: ClosePreviewImageSuccess) => void;
type ClosePreviewImageFailCallback = (callback: ClosePreviewImageFail) => void;
type ClosePreviewImageCompleteCallback = ChooseImageCompleteCallback;
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
    orientation: MediaOrientation | null = null;
    type: string | null = null;
}
type GetImageInfoFail = IMediaError;
type GetImageInfoSuccessCallback = (callback: GetImageInfoSuccess) => void;
type GetImageInfoFailCallback = (callback: GetImageInfoFail) => void;
type GetImageInfoCompleteCallback = ChooseImageCompleteCallback;
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
type SaveImageToPhotosAlbumFail = IMediaError;
type SaveImageToPhotosAlbumSuccessCallback = (callback: SaveImageToPhotosAlbumSuccess) => void;
type SaveImageToPhotosAlbumFailCallback = (callback: SaveImageToPhotosAlbumFail) => void;
type SaveImageToPhotosAlbumCompleteCallback = ChooseImageCompleteCallback;
export class SaveImageToPhotosAlbumOptions extends UTSObject {
    filePath!: string.ImageURIString;
    success: (SaveImageToPhotosAlbumSuccessCallback) | null = null;
    fail: (SaveImageToPhotosAlbumFailCallback) | null = null;
    complete: (SaveImageToPhotosAlbumCompleteCallback) | null = null;
}
type CompressImage = (options: CompressImageOptions) => void;
class CompressImageSuccess extends UTSObject {
    tempFilePath!: string;
}
type CompressImageFail = IMediaError;
type CompressImageSuccessCallback = (callback: CompressImageSuccess) => void;
type CompressImageFailCallback = (callback: CompressImageFail) => void;
type CompressImageCompleteCallback = ChooseImageCompleteCallback;
class CompressImageOptions extends UTSObject {
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
type ChooseVideoFail = IMediaError;
type ChooseVideoSuccessCallback = (callback: ChooseVideoSuccess) => void;
type ChooseVideoFailCallback = (callback: ChooseVideoFail) => void;
type ChooseVideoCompleteCallback = ChooseImageCompleteCallback;
export class ChooseVideoOptions extends UTSObject {
    sourceType: (string[]) | null = null;
    compressed: boolean | null = true;
    maxDuration: number | null = null;
    camera: 'front' | 'back' | null = null;
    extension: (string[]) | null = null;
    success: (ChooseVideoSuccessCallback) | null = null;
    fail: (ChooseVideoFailCallback) | null = null;
    complete: (ChooseVideoCompleteCallback) | null = null;
}
export type ChooseVideo = (options: ChooseVideoOptions) => void;
export class GetVideoInfoSuccess extends UTSObject {
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
export class GetVideoInfoOptions extends UTSObject {
    src!: string.VideoURIString;
    success: (GetVideoInfoSuccessCallback) | null = null;
    fail: (GetVideoInfoFailCallback) | null = null;
    complete: (GetVideoInfoCompleteCallback) | null = null;
}
export type GetVideoInfo = (options: GetVideoInfoOptions) => void;
export class SaveVideoToPhotosAlbumSuccess extends UTSObject {
}
type SaveVideoToPhotosAlbumFail = IMediaError;
type SaveVideoToPhotosAlbumSuccessCallback = (callback: SaveVideoToPhotosAlbumSuccess) => void;
type SaveVideoToPhotosAlbumFailCallback = (callback: SaveVideoToPhotosAlbumFail) => void;
type SaveVideoToPhotosAlbumCompleteCallback = ChooseImageCompleteCallback;
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
type CompressVideoFail = IMediaError;
type CompressVideoSuccessCallback = (callback: CompressVideoSuccess) => void;
type CompressVideoFailCallback = (callback: CompressVideoFail) => void;
type CompressVideoCompleteCallback = ChooseImageCompleteCallback;
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
export type ChooseFile = (options: ChooseFileOptions) => void;
export class ChooseFileSuccess extends UTSObject {
    tempFilePaths!: string[];
    tempFiles!: Object;
}
type ChooseFileSuccessCallback = (result: ChooseFileSuccess) => void;
type ChooseFileFail = IMediaError;
type ChooseFileFailCallback = (result: ChooseFileFail) => void;
type ChooseFileComplete = Object;
type ChooseFileCompleteCallback = (result: ChooseFileComplete) => void;
export class ChooseFileOptions extends UTSObject {
    count: number | null = null;
    type: 'image' | 'video' | 'all' | null = null;
    extension: (string[]) | null = null;
    sizeType: Object | null = null;
    sourceType: (string[]) | null = null;
    success: ChooseFileSuccessCallback | null = null;
    fail: ChooseFileFailCallback | null = null;
    complete: ChooseFileCompleteCallback | null = null;
}
type ChooseMediaFileType = 'image' | 'video';
class ChooseMediaTempFile extends UTSObject {
    tempFilePath!: string;
    fileType!: ChooseMediaFileType;
    size!: number;
    duration: number | null = null;
    height: number | null = null;
    width: number | null = null;
    thumbTempFilePath: string | null = null;
}
export class ChooseMediaSuccess extends UTSObject {
    tempFiles!: ChooseMediaTempFile[];
    type!: 'image' | 'video' | 'mix';
}
type ChooseMediaFail = IMediaError;
type ChooseMediaSuccessCallback = (callback: ChooseMediaSuccess) => void;
type ChooseMediaFailCallback = (callback: ChooseMediaFail) => void;
type ChooseMediaCompleteCallback = ChooseImageCompleteCallback;
export class ChooseMediaOptions extends UTSObject {
    count: number | null = null;
    mediaType: (string[]) | null = null;
    sourceType: (string[]) | null = null;
    sizeType: (string[]) | null = null;
    maxDuration: number | null = null;
    camera: 'front' | 'back' | null = null;
    success: (ChooseMediaSuccessCallback) | null = null;
    fail: (ChooseMediaFailCallback) | null = null;
    complete: (ChooseMediaCompleteCallback) | null = null;
}
export type ChooseMedia = (options: ChooseMediaOptions) => void;
interface MediaFile {
    fileType: 'video' | 'image';
    tempFilePath: string;
    size: number;
    width?: number;
    height?: number;
    duration?: number;
    thumbTempFilePath?: string;
}
interface _ChooseMediaOptions {
    mimeType: photoAccessHelper.PhotoViewMIMETypes.VIDEO_TYPE | photoAccessHelper.PhotoViewMIMETypes.IMAGE_TYPE | photoAccessHelper.PhotoViewMIMETypes.IMAGE_VIDEO_TYPE;
    count?: number;
    sourceType?: ('album' | 'camera')[];
}
interface chooseMediaSuccessCallbackResult {
    tempFiles: MediaFile[];
}
type CameraPosition = 'back' | 'front';
interface TempFiles {
    tempFilePath: string;
    size: number;
}
interface TakePhotoRes {
    tempFiles: TempFiles[];
}
interface TakeVideoOptions {
    cameraType?: CameraPosition;
    videoDuration?: number;
}
interface TakeVideoRes {
    path: string;
    duration: number;
    size: number;
    height: number;
    width: number;
    orientation: MediaOrientation;
    type: string;
}
interface IGetImageInfoDownloadOptions {
    url: string;
    success: (res: IGetImageInfoDownloadSuccess) => void;
    fail: (err: IGetImageInfoDownloadFail) => void;
}
interface IGetImageInfoDownloadSuccess {
    tempFilePath: string;
}
interface IGetImageInfoDownloadFail {
    errMsg: string;
}
interface IPreviewImageOptions {
    urls: string[];
    current: string;
    showmenu: boolean;
}
interface ISaveMediaError {
    code: number;
    message: string;
}
interface _CompressImageSuccess {
    size: number;
    tempFilePath: string;
}
interface IFile {
    path: string;
    size: number;
    name: string;
    type: string;
}
type UNI_MEDIA_TYPE = 'image' | 'video' | 'mix';
export type Request<T = Object> = (param: RequestOptions<T>) => RequestTask;
export class RequestOptions<T = Object> extends UTSObject {
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
export class RequestSuccess<T = Object> extends UTSObject {
    data: T | null = null;
    statusCode!: number;
    header!: Object;
    cookies!: Array<string>;
}
type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
type RequestErrorCode = 5 | 1000 | 100001 | 100002 | 600003 | 600008 | 600009 | 602001;
interface RequestFail extends IUniError {
    errCode: RequestErrorCode;
}
type RequestSuccessCallback<T> = (option: RequestSuccess<T>) => void;
type RequestFailCallback = (option: RequestFail) => void;
type RequestCompleteCallback = (option: Object) => void;
export interface RequestTask {
    abort(): void;
}
export type UploadFile = (options: UploadFileOptions) => UploadTask;
class UploadFileOptionFiles extends UTSObject {
    name: string | null = null;
    uri!: string;
    file: Object | null = null;
}
export class UploadFileSuccess extends UTSObject {
    data!: string;
    statusCode!: number;
}
type UploadFileSuccessCallback = (result: UploadFileSuccess) => void;
interface UploadFileFail extends IUniError {
    errCode: RequestErrorCode;
}
type UploadFileFailCallback = (result: UploadFileFail) => void;
type UploadFileCompleteCallback = (result: Object) => void;
export class UploadFileOptions extends UTSObject {
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
export class OnProgressUpdateResult extends UTSObject {
    progress!: number;
    totalBytesSent!: number;
    totalBytesExpectedToSend!: number;
}
type UploadFileProgressUpdateCallback = (result: OnProgressUpdateResult) => void;
export interface UploadTask {
    abort(): void;
    onProgressUpdate(callback: UploadFileProgressUpdateCallback): void;
}
export type DownloadFile = (options: DownloadFileOptions) => DownloadTask;
export class DownloadFileSuccess extends UTSObject {
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
export class DownloadFileOptions extends UTSObject {
    url!: string;
    header: UTSJSONObject | null = null;
    filePath: string | null = null;
    timeout: number | null = null;
    success: DownloadFileSuccessCallback | null = null;
    fail: DownloadFileFailCallback | null = null;
    complete: DownloadFileCompleteCallback | null = null;
}
export class OnProgressDownloadResult extends UTSObject {
    progress!: number;
    totalBytesWritten!: number;
    totalBytesExpectedToWrite!: number;
}
type DownloadFileProgressUpdateCallback = (result: OnProgressDownloadResult) => void;
export interface DownloadTask {
    abort(): void;
    onProgressUpdate(callback: DownloadFileProgressUpdateCallback): void;
}
interface IUniNetworkMPUserAgent {
    fullUserAgent: string;
}
interface IUniNetworkMP {
    on: Function;
    off: Function;
    userAgent: IUniNetworkMPUserAgent;
}
interface IUniRequestEmitter {
    on: (eventName: string, callback: Function) => void;
    once: (eventName: string, callback: Function) => void;
    off: (eventName: string, callback?: Function | null) => void;
    emit: (eventName: string, ...args: (Object | undefined | null)[]) => void;
}
interface IRequestTask {
    abort: Function;
    onHeadersReceived: Function;
    offHeadersReceived: Function;
}
interface IUniUploadFileEmitter {
    on: (eventName: string, callback: Function) => void;
    once: (eventName: string, callback: Function) => void;
    off: (eventName: string, callback?: Function | null) => void;
    emit: (eventName: string, ...args: (Object | undefined | null)[]) => void;
}
interface IUploadTask {
    abort: Function;
    onHeadersReceived: Function;
    offHeadersReceived: Function;
    onProgressUpdate: Function;
    offProgressUpdate: Function;
}
interface IUniDownloadFileEmitter {
    on: (eventName: string, callback: Function) => void;
    once: (eventName: string, callback: Function) => void;
    off: (eventName: string, callback?: Function | null) => void;
    emit: (eventName: string, ...args: (Object | undefined | null)[]) => void;
}
interface IDownloadTask {
    abort: Function;
    onHeadersReceived: Function;
    offHeadersReceived: Function;
    onProgressUpdate: Function;
    offProgressUpdate: Function;
}
export interface UniOAuthProvider extends UniProvider {
    login(options: LoginOptions): void;
    getUserInfo(options: GetUserInfoOptions): void;
}
export type Login = (options: LoginOptions) => void;
class AppleLoginAppleInfo extends UTSObject {
    authorizationCode: string | null = null;
    fullName: Object | null = null;
    identityToken: string | null = null;
    realUserStatus: number | null = null;
    user: string | null = null;
}
export class LoginSuccess extends UTSObject {
    errMsg!: string;
    authResult!: Object;
    code!: string;
    anonymousCode: string | null = null;
    authCode: string | null = null;
    authErrorScope: Object | null = null;
    authSucessScope: (string[]) | null = null;
    appleInfo: AppleLoginAppleInfo | null = null;
}
type LoginSuccessCallback = (result: LoginSuccess) => void;
export type LoginFail = IUniError;
type LoginFailCallback = (result: LoginFail) => void;
type LoginComplete = Object;
type LoginCompleteCallback = (result: LoginComplete) => void;
export class LoginOptions extends UTSObject {
    provider: 'weixin' | 'qq' | 'sinaweibo' | 'xiaomi' | 'apple' | 'univerify' | 'huawei' | null = null;
    scopes: Object | null = null;
    timeout: number | null = null;
    univerifyStyle: UniverifyStyle | null = null;
    onlyAuthorize: boolean | null = null;
    success: LoginSuccessCallback | null = null;
    fail: LoginFailCallback | null = null;
    complete: LoginCompleteCallback | null = null;
}
class UniverifyIconStyles extends UTSObject {
    path!: string;
    width: string | null = null;
    height: string | null = null;
}
class UniverifyPhoneNumStyles extends UTSObject {
    color: string | null = null;
    fontSize: string | null = null;
}
class UniverifySloganStyles extends UTSObject {
    color: string | null = null;
    fontSize: string | null = null;
}
class UniverifyAuthButtonStyles extends UTSObject {
    normalColor: string | null = null;
    highlightColor: string | null = null;
    disabledColor: string | null = null;
    width: string | null = null;
    height: string | null = null;
    textColor: string | null = null;
    title: string | null = null;
    borderRadius: string | null = null;
}
class UniverifyOtherButtonStyles extends UTSObject {
    visible: boolean | null = null;
    normalColor: string | null = null;
    highlightColor: string | null = null;
    width: string | null = null;
    height: string | null = null;
    textColor: string | null = null;
    title: string | null = null;
    borderWidth: string | null = null;
    borderColor: string | null = null;
    borderRadius: string | null = null;
}
class UniverifyPrivacyItemStyles extends UTSObject {
    url!: string;
    title!: string;
}
class UniverifyPrivacyTermsStyles extends UTSObject {
    defaultCheckBoxState: boolean | null = null;
    textColor: string | null = null;
    termsColor: string | null = null;
    prefix: string | null = null;
    suffix: string | null = null;
    fontSize: string | null = null;
    privacyItems: (UniverifyPrivacyItemStyles[]) | null = null;
}
class UniVerifyButtonListItem extends UTSObject {
    provider!: string;
    iconPath!: string;
}
class UniVerifyButtonsStyles extends UTSObject {
    iconWidth: string | null = null;
    list!: UniVerifyButtonListItem[];
}
class UniverifyStyle extends UTSObject {
    fullScreen: boolean | null = null;
    backgroundColor: string | null = null;
    backgroundImage: string | null = null;
    icon: UniverifyIconStyles | null = null;
    phoneNum: UniverifyPhoneNumStyles | null = null;
    slogan: UniverifySloganStyles | null = null;
    authButton: UniverifyAuthButtonStyles | null = null;
    otherLoginButton: UniverifyOtherButtonStyles | null = null;
    privacyTerms: UniverifyPrivacyTermsStyles | null = null;
    buttons: UniVerifyButtonsStyles | null = null;
}
export type GetUserInfo = (options: GetUserInfoOptions) => void;
export class UserInfo extends UTSObject {
    nickName!: string;
    openId: string | null = null;
    avatarUrl!: string;
}
export class GetUserInfoSuccess extends UTSObject {
    userInfo!: UserInfo;
    rawData: string | null = null;
    signature: string | null = null;
    encryptedData: string | null = null;
    iv: string | null = null;
    errMsg!: string;
}
type GetUserInfoSuccessCallback = (result: GetUserInfoSuccess) => void;
export type GetUserInfoFail = IUniError;
type GetUserInfoFailCallback = (result: GetUserInfoFail) => void;
type GetUserInfoComplete = Object;
type GetUserInfoCompleteCallback = (result: GetUserInfoComplete) => void;
export class GetUserInfoOptions extends UTSObject {
    provider: 'weixin' | 'qq' | 'sinaweibo' | 'xiaomi' | 'apple' | 'huawei' | null = null;
    withCredentials: boolean | null = null;
    lang: string | null = null;
    timeout: number | null = null;
    success: GetUserInfoSuccessCallback | null = null;
    fail: GetUserInfoFailCallback | null = null;
    complete: GetUserInfoCompleteCallback | null = null;
}
export type OpenAppAuthorizeSetting = (options: OpenAppAuthorizeSettingOptions) => void;
export class OpenAppAuthorizeSettingSuccess extends UTSObject {
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
export class OpenAppAuthorizeSettingOptions extends UTSObject {
    success: OpenAppAuthorizeSettingSuccessCallback | null = null;
    fail: OpenAppAuthorizeSettingFailCallback | null = null;
    complete: OpenAppAuthorizeSettingCompleteCallback | null = null;
}
export class OpenDocumentSuccess extends UTSObject {
}
export class OpenDocumentFail extends UTSObject {
}
type OpenDocumentSuccessCallback = (res: OpenDocumentSuccess) => void;
type OpenDocumentFailCallback = (res: OpenDocumentFail) => void;
type OpenDocumentCompleteCallback = (res: Object) => void;
type OpenDocumentSupportedTypes = 'doc' | 'xls' | 'ppt' | 'pdf' | 'docx' | 'xlsx' | 'pptx';
export class OpenDocumentOptions extends UTSObject {
    filePath!: string;
    fileType: OpenDocumentSupportedTypes | null = null;
    success: OpenDocumentSuccessCallback | null = null;
    fail: OpenDocumentFailCallback | null = null;
    complete: OpenDocumentCompleteCallback | null = null;
}
type OpenDocument = (options?: OpenDocumentOptions | null) => void;
export interface UniPaymentProvider extends UniProvider {
    requestPayment(options: RequestPaymentOptions): void;
}
type RequestPaymentErrorCode = 700600 | 701100 | 701110 | 700601 | 700602 | 700603 | 700000 | 700604 | 700605 | 700607 | 700608 | 700800 | 700801;
export type RequestPayment = (options: RequestPaymentOptions) => void;
export class RequestPaymentSuccess extends UTSObject {
    data: object | null = null;
}
type RequestPaymentSuccessCallback = (result: RequestPaymentSuccess) => void;
export type RequestPaymentFail = IRequestPaymentFail;
type RequestPaymentFailCallback = (result: RequestPaymentFail) => void;
type RequestPaymentComplete = Object;
interface IRequestPaymentFail extends IUniError {
    errCode: RequestPaymentErrorCode;
}
type RequestPaymentCompleteCallback = (result: RequestPaymentComplete) => void;
export class RequestPaymentOptions extends UTSObject {
    provider!: string;
    orderInfo!: string;
    success: RequestPaymentSuccessCallback | null = null;
    fail: RequestPaymentFailCallback | null = null;
    complete: RequestPaymentCompleteCallback | null = null;
}
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
type Icon = "success" | "error" | "fail" | "exception" | "loading" | "none";
type Position = "top" | "center" | "bottom";
class ShowToastOptions extends UTSObject {
    title!: string;
    icon: Icon | null = null;
    image: string.ImageURIString | null = null;
    mask: boolean | null = null;
    duration: number | null = null;
    position: Position | null = null;
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
interface IShowLoadingOptions {
    title: string;
    mask: boolean;
}
type PullDownRefreshErrorCode = 4;
interface StartPullDownRefreshFail extends IUniError {
    errCode: PullDownRefreshErrorCode;
}
export class StartPullDownRefreshOptions extends UTSObject {
    success: StartPullDownRefreshSuccessCallback | null = null;
    fail: StartPullDownRefreshFailCallback | null = null;
    complete: StartPullDownRefreshCompleteCallback | null = null;
}
export type StartPullDownRefreshSuccess = AsyncApiSuccessResult;
type StartPullDownRefreshSuccessCallback = (result: StartPullDownRefreshSuccess) => void;
type StartPullDownRefreshFailCallback = (result: StartPullDownRefreshFail) => void;
type StartPullDownRefreshComplete = AsyncApiResult;
type StartPullDownRefreshCompleteCallback = (result: StartPullDownRefreshComplete) => void;
type StartPullDownRefresh = (options: StartPullDownRefreshOptions) => void;
type StopPullDownRefresh = () => void;
export type Rpx2px = (number: number) => number;
export class ScanCodeSuccess extends UTSObject {
    result!: string;
    scanType!: string;
}
export class ScanCodeFail extends UTSObject {
}
type ScanCodeSuccessCallback = (res: ScanCodeSuccess) => void;
type ScanCodeFailCallback = (res: ScanCodeFail) => void;
type ScanCodeCompleteCallback = (res: Object) => void;
type ScanCodeSupportedTypes = 'barCode' | 'qrCode' | 'datamatrix' | 'pdf417';
export class ScanCodeOptions extends UTSObject {
    onlyFromCamera: boolean | null = null;
    scanType: ScanCodeSupportedTypes[] | null = null;
    success: ScanCodeSuccessCallback | null = null;
    fail: ScanCodeFailCallback | null = null;
    complete: ScanCodeCompleteCallback | null = null;
}
type ScanCode = (options?: ScanCodeOptions | null) => void;
type UniScanOptionsTypes = 'barCode' | 'qrCode' | 'datamatrix' | 'pdf417';
type UniScanResultTypes = "QR_CODE" | "AZTEC" | "CODABAR" | "CODE_39" | "CODE_93" | "CODE_128" | "DATA_MATRIX" | "EAN_8" | "EAN_13" | "ITF" | "MAXICODE" | "PDF_417" | "RSS_14" | "RSS_EXPANDED" | "UPC_A" | "UPC_E" | "UPC_EAN_EXTENSION" | "WX_CODE" | "CODE_25";
type HarmonyScanResultTypes = scanCore.ScanType.AZTEC_CODE | scanCore.ScanType.CODABAR_CODE | scanCore.ScanType.CODE128_CODE | scanCore.ScanType.CODE39_CODE | scanCore.ScanType.CODE93_CODE | scanCore.ScanType.DATAMATRIX_CODE | scanCore.ScanType.EAN13_CODE | scanCore.ScanType.EAN8_CODE | scanCore.ScanType.ITF14_CODE | scanCore.ScanType.MULTIFUNCTIONAL_CODE | scanCore.ScanType.PDF417_CODE | scanCore.ScanType.QR_CODE | scanCore.ScanType.UPC_A_CODE | scanCore.ScanType.UPC_E_CODE;
export class ShareWithSystemSuccess extends UTSObject {
}
export class ShareWithSystemFail extends UTSObject {
}
type ShareWithSystemSuccessCallback = (res: ShareWithSystemSuccess) => void;
type ShareWithSystemFailCallback = (res: ShareWithSystemFail) => void;
type ShareWithSystemCallback = (res: Object) => void;
export class ShareWithSystemOptions extends UTSObject {
    type: 'text' | 'image' | null = null;
    summary: string | null = null;
    href: string | null = null;
    imageUrl: string | null = null;
    success: ShareWithSystemSuccessCallback | null = null;
    fail: ShareWithSystemFailCallback | null = null;
    complete: ShareWithSystemCallback | null = null;
}
export type ShareWithSystem = (options: ShareWithSystemOptions) => void;
export class SetStorageSuccess extends UTSObject {
}
type SetStorageSuccessCallback = (res: SetStorageSuccess) => void;
type SetStorageFailCallback = (res: UniError) => void;
type SetStorageCompleteCallback = (res: Object) => void;
export class SetStorageOptions extends UTSObject {
    key!: string;
    data!: Object;
    success: SetStorageSuccessCallback | null = null;
    fail: SetStorageFailCallback | null = null;
    complete: SetStorageCompleteCallback | null = null;
}
export type SetStorage = (options: SetStorageOptions) => void;
export type SetStorageSync = (key: string, data: Object) => void;
export class GetStorageSuccess extends UTSObject {
    data: Object | null = null;
}
type GetStorageSuccessCallback = (res: GetStorageSuccess) => void;
type GetStorageFailCallback = (res: UniError) => void;
type GetStorageCompleteCallback = (res: Object) => void;
export class GetStorageOptions extends UTSObject {
    key!: string;
    success: GetStorageSuccessCallback | null = null;
    fail: GetStorageFailCallback | null = null;
    complete: GetStorageCompleteCallback | null = null;
}
export type GetStorage = (options: GetStorageOptions) => void;
export type GetStorageSync = (key: string) => Object | null;
export class GetStorageInfoSuccess extends UTSObject {
    keys!: Array<string>;
    currentSize!: number;
    limitSize!: number;
}
type GetStorageInfoSuccessCallback = (res: GetStorageInfoSuccess) => void;
type GetStorageInfoFailCallback = (res: UniError) => void;
type GetStorageInfoCompleteCallback = (res: Object) => void;
export class GetStorageInfoOptions extends UTSObject {
    success: GetStorageInfoSuccessCallback | null = null;
    fail: GetStorageInfoFailCallback | null = null;
    complete: GetStorageInfoCompleteCallback | null = null;
}
export type GetStorageInfo = (options: GetStorageInfoOptions) => void;
export type GetStorageInfoSync = () => GetStorageInfoSuccess;
export class RemoveStorageSuccess extends UTSObject {
}
type RemoveStorageSuccessCallback = (res: RemoveStorageSuccess) => void;
type RemoveStorageFailCallback = (res: UniError) => void;
type RemoveStorageCompleteCallback = (res: Object) => void;
export class RemoveStorageOptions extends UTSObject {
    key!: string;
    success: RemoveStorageSuccessCallback | null = null;
    fail: RemoveStorageFailCallback | null = null;
    complete: RemoveStorageCompleteCallback | null = null;
}
export type RemoveStorage = (options: RemoveStorageOptions) => void;
export type RemoveStorageSync = (key: string) => void;
export class ClearStorageSuccess extends UTSObject {
}
type ClearStorageSuccessCallback = (res: ClearStorageSuccess) => void;
type ClearStorageFailCallback = (res: UniError) => void;
type ClearStorageCompleteCallback = (res: Object) => void;
export class ClearStorageOptions extends UTSObject {
    success: ClearStorageSuccessCallback | null = null;
    fail: ClearStorageFailCallback | null = null;
    complete: ClearStorageCompleteCallback | null = null;
}
export type ClearStorage = (option?: ClearStorageOptions | null) => void;
export type ClearStorageSync = () => void;
interface UniStorageMP {
    id: string;
}
export type SetTabBarBadgeSuccess = AsyncApiSuccessResult;
type SetTabBarBadgeSuccessCallback = (result: SetTabBarBadgeSuccess) => void;
type SetTabBarErrorCode = 100 | 200;
interface SetTabBarFail extends IUniError {
    errCode: SetTabBarErrorCode;
}
type SetTabBarBadgeFail = SetTabBarFail;
type SetTabBarBadgeFailCallback = (result: SetTabBarBadgeFail) => void;
type SetTabBarBadgeComplete = AsyncApiResult;
type SetTabBarBadgeCompleteCallback = (result: SetTabBarBadgeComplete) => void;
export class SetTabBarBadgeOptions extends UTSObject {
    index!: number;
    text!: string;
    success: SetTabBarBadgeSuccessCallback | null = null;
    fail: SetTabBarBadgeFailCallback | null = null;
    complete: SetTabBarBadgeCompleteCallback | null = null;
}
export type RemoveTabBarBadgeSuccess = AsyncApiSuccessResult;
type RemoveTabBarBadgeSuccessCallback = (result: RemoveTabBarBadgeSuccess) => void;
type RemoveTabBarBadgeFail = SetTabBarFail;
type RemoveTabBarBadgeFailCallback = (result: RemoveTabBarBadgeFail) => void;
type RemoveTabBarBadgeComplete = AsyncApiResult;
type RemoveTabBarBadgeCompleteCallback = (result: RemoveTabBarBadgeComplete) => void;
export class RemoveTabBarBadgeOptions extends UTSObject {
    index!: number;
    success: RemoveTabBarBadgeSuccessCallback | null = null;
    fail: RemoveTabBarBadgeFailCallback | null = null;
    complete: RemoveTabBarBadgeCompleteCallback | null = null;
}
export type SetTabBarItemSuccess = AsyncApiSuccessResult;
type SetTabBarItemSuccessCallback = (result: SetTabBarItemSuccess) => void;
type SetTabBarItemFail = SetTabBarFail;
type SetTabBarItemFailCallback = (result: SetTabBarItemFail) => void;
type SetTabBarItemComplete = AsyncApiResult;
type SetTabBarItemCompleteCallback = (result: SetTabBarItemComplete) => void;
class SetTabBarItemIconFontOptions extends UTSObject {
    text!: string;
    selectedText!: string;
    fontSize: string | null = null;
    color: string | null = null;
    selectedColor: string | null = null;
}
export class SetTabBarItemOptions extends UTSObject {
    index!: number;
    text: string | null = null;
    iconPath: string | null = null;
    selectedIconPath: string | null = null;
    pagePath: string | null = null;
    iconfont: SetTabBarItemIconFontOptions | null = null;
    visible: boolean | null = null;
    success: SetTabBarItemSuccessCallback | null = null;
    fail: SetTabBarItemFailCallback | null = null;
    complete: SetTabBarItemCompleteCallback | null = null;
}
class MidButtonIconFont extends UTSObject {
    text: string | null = null;
    selectedText: string | null = null;
    fontSize: string | null = null;
    color: string | null = null;
    selectedColor: string | null = null;
}
class MidButtonOptions extends UTSObject {
    width: string | null = null;
    height: string | null = null;
    text: string | null = null;
    iconPath: string | null = null;
    iconWidth: string | null = null;
    backgroundImage: string | null = null;
    iconfont: MidButtonIconFont | null = null;
}
export type SetTabBarStyleSuccess = AsyncApiSuccessResult;
type SetTabBarStyleSuccessCallback = (result: SetTabBarStyleSuccess) => void;
type SetTabBarStyleFail = SetTabBarFail;
type SetTabBarStyleFailCallback = (result: SetTabBarStyleFail) => void;
type SetTabBarStyleComplete = AsyncApiResult;
type SetTabBarStyleCompleteCallback = (result: SetTabBarStyleComplete) => void;
export class SetTabBarStyleOptions extends UTSObject {
    color: string | string.ColorString | null = null;
    selectedColor: string | string.ColorString | null = null;
    backgroundColor: string | string.ColorString | null = null;
    backgroundImage: string | null = null;
    backgroundRepeat: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat' | null = null;
    borderColor: string | string.ColorString | null = null;
    borderStyle: 'black' | 'white' | null = null;
    midButton: MidButtonOptions | null = null;
    success: SetTabBarStyleSuccessCallback | null = null;
    fail: SetTabBarStyleFailCallback | null = null;
    complete: SetTabBarStyleCompleteCallback | null = null;
}
export type HideTabBarSuccess = AsyncApiSuccessResult;
type HideTabBarSuccessCallback = (result: HideTabBarSuccess) => void;
type HideTabBarFail = SetTabBarFail;
type HideTabBarFailCallback = (result: HideTabBarFail) => void;
type HideTabBarComplete = AsyncApiResult;
type HideTabBarCompleteCallback = (result: HideTabBarComplete) => void;
export class HideTabBarOptions extends UTSObject {
    animation: boolean | null = null;
    success: HideTabBarSuccessCallback | null = null;
    fail: HideTabBarFailCallback | null = null;
    complete: HideTabBarCompleteCallback | null = null;
}
export type ShowTabBarSuccess = AsyncApiSuccessResult;
type ShowTabBarSuccessCallback = (result: ShowTabBarSuccess) => void;
type ShowTabBarFail = SetTabBarFail;
type ShowTabBarFailCallback = (result: ShowTabBarFail) => void;
type ShowTabBarComplete = AsyncApiResult;
type ShowTabBarCompleteCallback = (result: ShowTabBarComplete) => void;
export class ShowTabBarOptions extends UTSObject {
    animation: boolean | null = null;
    success: ShowTabBarSuccessCallback | null = null;
    fail: ShowTabBarFailCallback | null = null;
    complete: ShowTabBarCompleteCallback | null = null;
}
export type ShowTabBarRedDotSuccess = AsyncApiSuccessResult;
type ShowTabBarRedDotSuccessCallback = (result: ShowTabBarRedDotSuccess) => void;
type ShowTabBarRedDotFail = SetTabBarFail;
type ShowTabBarRedDotFailCallback = (result: ShowTabBarRedDotFail) => void;
type ShowTabBarRedDotComplete = AsyncApiResult;
type ShowTabBarRedDotCompleteCallback = (result: ShowTabBarRedDotComplete) => void;
export class ShowTabBarRedDotOptions extends UTSObject {
    index!: number;
    success: ShowTabBarRedDotSuccessCallback | null = null;
    fail: ShowTabBarRedDotFailCallback | null = null;
    complete: ShowTabBarRedDotCompleteCallback | null = null;
}
export type HideTabBarRedDotSuccess = AsyncApiSuccessResult;
type HideTabBarRedDotSuccessCallback = (result: HideTabBarRedDotSuccess) => void;
type HideTabBarRedDotFail = SetTabBarFail;
type HideTabBarRedDotFailCallback = (result: HideTabBarRedDotFail) => void;
type HideTabBarRedDotComplete = AsyncApiResult;
type HideTabBarRedDotCompleteCallback = (result: HideTabBarRedDotComplete) => void;
export class HideTabBarRedDotOptions extends UTSObject {
    index!: number;
    success: HideTabBarRedDotSuccessCallback | null = null;
    fail: HideTabBarRedDotFailCallback | null = null;
    complete: HideTabBarRedDotCompleteCallback | null = null;
}
export type SetTabBarBadge = (options: SetTabBarBadgeOptions) => void;
export type RemoveTabBarBadge = (options: RemoveTabBarBadgeOptions) => void;
export type SetTabBarItem = (options: SetTabBarItemOptions) => void;
export type SetTabBarStyle = (options: SetTabBarStyleOptions) => void;
export type ShowTabBar = (options?: ShowTabBarOptions | null) => void;
export type HideTabBar = (options?: HideTabBarOptions | null) => void;
export type ShowTabBarRedDot = (options: ShowTabBarRedDotOptions) => void;
export type HideTabBarRedDot = (options: HideTabBarRedDotOptions) => void;
interface ITabBar {
    setTabBarBadge: (options: SetTabBarBadgeOptions) => void;
    removeTabBarBadge: (options: RemoveTabBarBadgeOptions) => void;
    setTabBarItem: (options: SetTabBarItemOptions) => void;
    setTabBarStyle: (options: SetTabBarStyleOptions) => void;
    hideTabBar: () => void;
    showTabBar: () => void;
    showTabBarRedDot: (options: ShowTabBarRedDotOptions) => void;
    hideTabBarRedDot: (options: HideTabBarRedDotOptions) => void;
}
export type ConnectSocket = (options: ConnectSocketOptions) => SocketTask;
export class ConnectSocketSuccess extends UTSObject {
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
export class ConnectSocketOptions extends UTSObject {
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
export class SendSocketMessageOptions extends UTSObject {
    data!: Object;
    success: ((result: GeneralCallbackResult) => void) | null = null;
    fail: ((result: SendSocketMessageFail) => void) | null = null;
    complete: ((result: Object) => void) | null = null;
}
export class CloseSocketOptions extends UTSObject {
    code: number | null = null;
    reason: string | null = null;
    success: ((result: GeneralCallbackResult) => void) | null = null;
    fail: ((result: GeneralCallbackResult) => void) | null = null;
    complete: ((result: GeneralCallbackResult) => void) | null = null;
}
class OnSocketOpenCallbackResult extends UTSObject {
    header!: Object;
}
export class OnSocketMessageCallbackResult extends UTSObject {
    data!: Object;
}
export interface SocketTask {
    send(options: SendSocketMessageOptions): void;
    close(options: CloseSocketOptions): void;
    onOpen(callback: (result: OnSocketOpenCallbackResult) => void): void;
    onClose(callback: (result: Object) => void): void;
    onError(callback: (result: GeneralCallbackResult) => void): void;
    onMessage(callback: (result: OnSocketMessageCallbackResult) => void): void;
}
type OnSocketOpenCallback = (result: OnSocketOpenCallbackResult) => void;
type OnSocketOpen = (options: OnSocketOpenCallback) => void;
export class OnSocketErrorCallbackResult extends UTSObject {
    errMsg!: string;
}
type OnSocketErrorCallback = (result: OnSocketErrorCallbackResult) => void;
type OnSocketError = (callback: OnSocketErrorCallback) => void;
type SendSocketMessage = (options: SendSocketMessageOptions) => void;
type OnSocketMessageCallback = (result: OnSocketMessageCallbackResult) => void;
type OnSocketMessage = (callback: OnSocketMessageCallback) => void;
type CloseSocket = (options: CloseSocketOptions) => void;
class OnSocketCloseCallbackResult extends UTSObject {
    code!: number;
    reason!: string;
}
type OnSocketCloseCallback = (result: OnSocketCloseCallbackResult) => void;
type OnSocketClose = (callback: OnSocketCloseCallback) => void;
interface UniWebsocketMP {
    id: string;
    on: Function;
    off: Function;
}
interface IUniWebsocketEmitter {
    on: (eventName: string, callback: Function) => void;
    once: (eventName: string, callback: Function) => void;
    off: (eventName: string, callback?: Function | null) => void;
    emit: (eventName: string, ...args: (Object | undefined | null)[]) => void;
}
interface UniExtApi {
    addPhoneContact: AddPhoneContact;
    startSoterAuthentication: StartSoterAuthentication;
    checkIsSupportSoterAuthentication: CheckIsSupportSoterAuthentication;
    checkIsSoterEnrolledInDevice: CheckIsSoterEnrolledInDevice;
    getClipboardData: GetClipboardData;
    setClipboardData: SetClipboardData;
    createInnerAudioContext: CreateInnerAudioContext;
    $on: $On;
    $once: $Once;
    $off: $Off;
    $emit: $Emit;
    exit: Exit;
    saveFile: SaveFile;
    getSavedFileList: GetSavedFileList;
    getSavedFileInfo: GetSavedFileInfo;
    removeSavedFile: RemoveSavedFile;
    getFileInfo: GetFileInfo;
    getAppAuthorizeSetting: GetAppAuthorizeSetting;
    getAppBaseInfo: GetAppBaseInfo;
    getBackgroundAudioManager: GetBackgroundAudioManager;
    getDeviceInfo: GetDeviceInfo;
    getNetworkType: GetNetworkType;
    onNetworkStatusChange: OnNetworkStatusChange;
    offNetworkStatusChange: OffNetworkStatusChange;
    getProvider: GetProvider;
    getProviderSync: GetProviderSync;
    getRecorderManager: GetRecorderManager;
    getSystemInfo: GetSystemInfo;
    getSystemInfoSync: GetSystemInfoSync;
    getWindowInfo: GetWindowInfo;
    getSystemSetting: GetSystemSetting;
    hideKeyboard: HideKeyboard;
    makePhoneCall: MakePhoneCall;
    chooseImage: ChooseImage;
    previewImage: PreviewImage;
    closePreviewImage: ClosePreviewImage;
    getImageInfo: GetImageInfo;
    saveImageToPhotosAlbum: SaveImageToPhotosAlbum;
    compressImage: CompressImage;
    chooseVideo: ChooseVideo;
    saveVideoToPhotosAlbum: SaveVideoToPhotosAlbum;
    getVideoInfo: GetVideoInfo;
    compressVideo: CompressVideo;
    chooseFile: ChooseFile;
    chooseMedia: ChooseMedia;
    request: Request<Object>;
    uploadFile: UploadFile;
    downloadFile: DownloadFile;
    login: Login;
    getUserInfo: GetUserInfo;
    openAppAuthorizeSetting: OpenAppAuthorizeSetting;
    openDocument: OpenDocument;
    requestPayment: RequestPayment;
    showToast: ShowToast;
    hideToast: HideToast;
    showLoading: ShowLoading;
    hideLoading: HideLoading;
    showModal: ShowModal;
    showActionSheet: ShowActionSheet;
    startPullDownRefresh: StartPullDownRefresh;
    stopPullDownRefresh: StopPullDownRefresh;
    rpx2px: Rpx2px;
    scanCode: ScanCode;
    shareWithSystem: ShareWithSystem;
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
    showTabBarRedDot: ShowTabBarRedDot;
    hideTabBarRedDot: HideTabBarRedDot;
    setTabBarBadge: SetTabBarBadge;
    removeTabBarBadge: RemoveTabBarBadge;
    setTabBarItem: SetTabBarItem;
    setTabBarStyle: SetTabBarStyle;
    showTabBar: ShowTabBar;
    hideTabBar: HideTabBar;
    connectSocket: ConnectSocket;
    sendSocketMessage: SendSocketMessage;
    closeSocket: CloseSocket;
    onSocketOpen: OnSocketOpen;
    onSocketMessage: OnSocketMessage;
    onSocketClose: OnSocketClose;
    onSocketError: OnSocketError;
}
export function initUniExtApi() {
    const API_ADD_PHONE_CONTACT = 'addPhoneContact';
    const AddPhoneContactApiOptions: ApiOptions<AddPhoneContactOptions> = {
        formatArgs: new Map<string, ((firstName: string) => string | undefined)>([
            [
                'firstName',
                (firstName: string)=>{
                    if (!firstName) {
                        return 'addPhoneContact:fail parameter error: parameter.firstName should not be empty;';
                    }
                    return undefined;
                }
            ]
        ])
    };
    const AddPhoneContactApiProtocol = new Map<string, ProtocolOptions>([
        [
            'firstName',
            {
                type: 'string',
                required: true
            }
        ],
        [
            'photoFilePath',
            {
                type: 'string'
            }
        ],
        [
            'nickName',
            {
                type: 'string'
            }
        ],
        [
            'lastName',
            {
                type: 'string'
            }
        ],
        [
            'middleName',
            {
                type: 'string'
            }
        ],
        [
            'remark',
            {
                type: 'string'
            }
        ],
        [
            'mobilePhoneNumber',
            {
                type: 'string'
            }
        ],
        [
            'weChatNumber',
            {
                type: 'string'
            }
        ],
        [
            'addressCountry',
            {
                type: 'string'
            }
        ],
        [
            'addressState',
            {
                type: 'string'
            }
        ],
        [
            'addressCity',
            {
                type: 'string'
            }
        ],
        [
            'addressStreet',
            {
                type: 'string'
            }
        ],
        [
            'addressPostalCode',
            {
                type: 'string'
            }
        ],
        [
            'organization',
            {
                type: 'string'
            }
        ],
        [
            'title',
            {
                type: 'string'
            }
        ],
        [
            'workFaxNumber',
            {
                type: 'string'
            }
        ],
        [
            'workPhoneNumber',
            {
                type: 'string'
            }
        ],
        [
            'hostNumber',
            {
                type: 'string'
            }
        ],
        [
            'email',
            {
                type: 'string'
            }
        ],
        [
            'url',
            {
                type: 'string'
            }
        ],
        [
            'workAddressCountry',
            {
                type: 'string'
            }
        ],
        [
            'workAddressState',
            {
                type: 'string'
            }
        ],
        [
            'workAddressCity',
            {
                type: 'string'
            }
        ],
        [
            'workAddressStreet',
            {
                type: 'string'
            }
        ],
        [
            'workAddressPostalCode',
            {
                type: 'string'
            }
        ],
        [
            'homeFaxNumber',
            {
                type: 'string'
            }
        ],
        [
            'homePhoneNumber',
            {
                type: 'string'
            }
        ],
        [
            'homeAddressCountry',
            {
                type: 'string'
            }
        ],
        [
            'homeAddressState',
            {
                type: 'string'
            }
        ],
        [
            'homeAddressCity',
            {
                type: 'string'
            }
        ],
        [
            'homeAddressStreet',
            {
                type: 'string'
            }
        ],
        [
            'homeAddressPostalCode',
            {
                type: 'string'
            }
        ]
    ]);
    const addPhoneContact: AddPhoneContact = defineAsyncApi<AddPhoneContactOptions, AddPhoneContactSuccess>(API_ADD_PHONE_CONTACT, (args: AddPhoneContactOptions, executor: ApiExecutor<AddPhoneContactSuccess>)=>{
        UTSHarmony.requestSystemPermission([
            'ohos.permission.WRITE_CONTACTS'
        ], (allRight: boolean)=>{
            if (allRight) {
                const photoFilePath = args.photoFilePath, _args_nickName = args.nickName, nickName = _args_nickName == null ? '' : _args_nickName, _args_lastName = args.lastName, lastName = _args_lastName == null ? '' : _args_lastName, _args_middleName = args.middleName, middleName = _args_middleName == null ? '' : _args_middleName, _args_firstName = args.firstName, firstName = _args_firstName == null ? '' : _args_firstName, _args_remark = args.remark, remark = _args_remark == null ? '' : _args_remark, _args_mobilePhoneNumber = args.mobilePhoneNumber, mobilePhoneNumber = _args_mobilePhoneNumber == null ? '' : _args_mobilePhoneNumber, _args_addressCountry = args.addressCountry, addressCountry = _args_addressCountry == null ? '' : _args_addressCountry, _args_addressState = args.addressState, addressState = _args_addressState == null ? '' : _args_addressState, _args_addressCity = args.addressCity, addressCity = _args_addressCity == null ? '' : _args_addressCity, _args_addressStreet = args.addressStreet, addressStreet = _args_addressStreet == null ? '' : _args_addressStreet, _args_addressPostalCode = args.addressPostalCode, addressPostalCode = _args_addressPostalCode == null ? '' : _args_addressPostalCode, _args_organization = args.organization, organization = _args_organization == null ? '' : _args_organization, _args_url = args.url, url = _args_url == null ? '' : _args_url, _args_workPhoneNumber = args.workPhoneNumber, workPhoneNumber = _args_workPhoneNumber == null ? '' : _args_workPhoneNumber, _args_workFaxNumber = args.workFaxNumber, workFaxNumber = _args_workFaxNumber == null ? '' : _args_workFaxNumber, _args_hostNumber = args.hostNumber, hostNumber = _args_hostNumber == null ? '' : _args_hostNumber, _args_email = args.email, email = _args_email == null ? '' : _args_email, _args_title = args.title, title = _args_title == null ? '' : _args_title, _args_workAddressCountry = args.workAddressCountry, workAddressCountry = _args_workAddressCountry == null ? '' : _args_workAddressCountry, _args_workAddressState = args.workAddressState, workAddressState = _args_workAddressState == null ? '' : _args_workAddressState, _args_workAddressCity = args.workAddressCity, workAddressCity = _args_workAddressCity == null ? '' : _args_workAddressCity, _args_workAddressStreet = args.workAddressStreet, workAddressStreet = _args_workAddressStreet == null ? '' : _args_workAddressStreet, workAddressPostalCode = args.workAddressPostalCode, _args_homeFaxNumber = args.homeFaxNumber, homeFaxNumber = _args_homeFaxNumber == null ? '' : _args_homeFaxNumber, _args_homePhoneNumber = args.homePhoneNumber, homePhoneNumber = _args_homePhoneNumber == null ? '' : _args_homePhoneNumber, _args_homeAddressCountry = args.homeAddressCountry, homeAddressCountry = _args_homeAddressCountry == null ? '' : _args_homeAddressCountry, _args_homeAddressState = args.homeAddressState, homeAddressState = _args_homeAddressState == null ? '' : _args_homeAddressState, _args_homeAddressCity = args.homeAddressCity, homeAddressCity = _args_homeAddressCity == null ? '' : _args_homeAddressCity, _args_homeAddressStreet = args.homeAddressStreet, homeAddressStreet = _args_homeAddressStreet == null ? '' : _args_homeAddressStreet, _args_homeAddressPostalCode = args.homeAddressPostalCode, homeAddressPostalCode = _args_homeAddressPostalCode == null ? '' : _args_homeAddressPostalCode;
                const contactInfo: contact.Contact = {
                    name: {
                        familyName: lastName!,
                        middleName: middleName!,
                        givenName: firstName!,
                        fullName: lastName! + middleName! + firstName!
                    },
                    nickName: {
                        nickName: nickName!
                    },
                    emails: [
                        {
                            email: email!,
                            displayName: '邮箱'
                        }
                    ],
                    phoneNumbers: [
                        {
                            phoneNumber: homePhoneNumber!,
                            labelId: contact.PhoneNumber.NUM_HOME
                        },
                        {
                            phoneNumber: mobilePhoneNumber!,
                            labelId: contact.PhoneNumber.NUM_MOBILE
                        },
                        {
                            phoneNumber: homeFaxNumber!,
                            labelId: contact.PhoneNumber.NUM_FAX_HOME
                        },
                        {
                            phoneNumber: workFaxNumber!,
                            labelId: contact.PhoneNumber.NUM_FAX_WORK
                        },
                        {
                            phoneNumber: workPhoneNumber!,
                            labelId: contact.PhoneNumber.NUM_WORK
                        },
                        {
                            phoneNumber: hostNumber!,
                            labelId: contact.PhoneNumber.NUM_COMPANY_MAIN
                        }
                    ],
                    portrait: {
                        uri: photoFilePath!
                    },
                    postalAddresses: [
                        {
                            city: homeAddressCity!,
                            country: homeAddressCountry!,
                            postcode: homeAddressPostalCode!,
                            street: homeAddressStreet!,
                            postalAddress: homeAddressCountry! + homeAddressState! + homeAddressCity + homeAddressStreet,
                            labelId: contact.PostalAddress.ADDR_HOME
                        },
                        {
                            city: workAddressCity!,
                            country: workAddressCountry!,
                            postcode: workAddressPostalCode!,
                            street: workAddressStreet!,
                            postalAddress: workAddressCountry! + workAddressState! + workAddressCity + workAddressStreet,
                            labelId: contact.PostalAddress.ADDR_WORK
                        },
                        {
                            city: addressCity!,
                            country: addressCountry!,
                            postcode: addressPostalCode!,
                            street: addressStreet!,
                            postalAddress: addressCountry! + addressState! + addressCity + addressStreet,
                            labelId: contact.PostalAddress.CUSTOM_LABEL
                        }
                    ],
                    websites: [
                        {
                            website: url!
                        }
                    ],
                    note: {
                        noteContent: remark!
                    },
                    organization: {
                        name: organization!,
                        title: title!
                    }
                };
                contact.addContact(getContext(), contactInfo).then((contactId)=>{
                    executor.resolve(contactId);
                }).catch((err: BusinessError)=>{
                    executor.reject(err.message);
                });
            } else {
                executor.reject('Permission denied');
            }
        }, ()=>executor.reject('Permission denied'));
    }, AddPhoneContactApiProtocol, AddPhoneContactApiOptions) as AddPhoneContact;
    const API_START_SOTER_AUTHENTICATION = 'startSoterAuthentication';
    const StartSoterAuthenticationApiOptions: ApiOptions<StartSoterAuthenticationOptions> = {
        formatArgs: new Map<string, ((value: string) => string | undefined)>([
            [
                'requestAuthModes',
                (value: string)=>{
                    if (!value.includes('fingerPrint') && !value.includes('facial')) {
                        return 'requestAuthModes 填写错误';
                    }
                    return undefined;
                }
            ]
        ])
    };
    const StartSoterAuthenticationApiProtocols = new Map<string, ProtocolOptions>([
        [
            'requestAuthModes',
            {
                type: 'array',
                required: true
            }
        ],
        [
            'challenge',
            {
                type: 'string'
            }
        ],
        [
            'authContent',
            {
                type: 'string'
            }
        ]
    ]);
    const API_CHECK_IS_SOTER_ENROLLED_IN_DEVICE = 'checkIsSoterEnrolledInDevice';
    const checkAuthModes: SoterAuthMode[] = [
        'fingerPrint',
        'facial',
        'speech'
    ];
    const CheckIsSoterEnrolledInDeviceApiOptions: ApiOptions<CheckIsSoterEnrolledInDeviceOptions> = {
        formatArgs: new Map<string, ((value: string) => string | undefined)>([
            [
                'checkAuthMode',
                (value: string)=>{
                    if (!checkAuthModes.includes(value as SoterAuthMode)) {
                        return 'checkAuthMode 填写错误';
                    }
                    return undefined;
                }
            ]
        ])
    };
    const CheckIsSoterEnrolledInDeviceProtocols = new Map<string, ProtocolOptions>([
        [
            'checkAuthMode',
            {
                type: 'string'
            }
        ]
    ]);
    const API_CHECK_IS_SUPPORT_SOTER_AUTHENTICATION = 'checkIsSupportSoterAuthentication';
    const getErrorMessage = (code: number): string =>{
        switch(code){
            case 201:
                return "权限认证失败";
            case 401:
                return "参数不正确。可能的一个原因: 强制参数未指定";
            case userAuth.UserAuthResultCode.FAIL:
                return "认证失败";
            case userAuth.UserAuthResultCode.GENERAL_ERROR:
                return "操作通用错误";
            case userAuth.UserAuthResultCode.CANCELED:
                return "操作取消";
            case userAuth.UserAuthResultCode.TIMEOUT:
                return "操作超时";
            case userAuth.UserAuthResultCode.TYPE_NOT_SUPPORT:
                return "不支持的认证类型";
            case userAuth.UserAuthResultCode.TRUST_LEVEL_NOT_SUPPORT:
                return "不支持的认证等级";
            case userAuth.UserAuthResultCode.BUSY:
                return "忙碌状态";
            case userAuth.UserAuthResultCode.LOCKED:
                return "认证器已锁定";
            case userAuth.UserAuthResultCode.NOT_ENROLLED:
                return "用户未录入认证信息";
            case userAuth.UserAuthResultCode.CANCELED_FROM_WIDGET:
                return "切换到自定义身份验证过程";
            case 12500013:
                return "系统锁屏密码过期";
            default:
                return '';
        }
    };
    const getUniErrMsg = (code: number): number =>{
        switch(code){
            case 201:
                return 90002;
            case 401:
                return 90004;
            case userAuth.UserAuthResultCode.FAIL:
                return 90009;
            case userAuth.UserAuthResultCode.GENERAL_ERROR:
                return 90007;
            case userAuth.UserAuthResultCode.CANCELED:
                return 90008;
            case userAuth.UserAuthResultCode.TIMEOUT:
                return 90007;
            case userAuth.UserAuthResultCode.TYPE_NOT_SUPPORT:
                return 90003;
            case userAuth.UserAuthResultCode.TRUST_LEVEL_NOT_SUPPORT:
                return 90003;
            case userAuth.UserAuthResultCode.BUSY:
                return 90010;
            case userAuth.UserAuthResultCode.LOCKED:
                return 90010;
            case userAuth.UserAuthResultCode.NOT_ENROLLED:
                return 90011;
            case userAuth.UserAuthResultCode.CANCELED_FROM_WIDGET:
                return userAuth.UserAuthResultCode.CANCELED_FROM_WIDGET;
            case 12500013:
                return 12500013;
            default:
                return -1;
        }
    };
    const toUint8Arr = (str: string)=>{
        const buffer: number[] = [];
        for (let i of str){
            const _code: number = i.charCodeAt(0);
            if (_code < 0x80) {
                buffer.push(_code);
            } else if (_code < 0x800) {
                buffer.push(0xc0 + (_code >> 6));
                buffer.push(0x80 + (_code & 0x3f));
            } else if (_code < 0x10000) {
                buffer.push(0xe0 + (_code >> 12));
                buffer.push(0x80 + (_code >> 6 & 0x3f));
                buffer.push(0x80 + (_code & 0x3f));
            }
        }
        return Uint8Array.from(buffer);
    };
    const startSoterAuthentication: StartSoterAuthentication = defineAsyncApi<StartSoterAuthenticationOptions, StartSoterAuthenticationSuccess>(API_START_SOTER_AUTHENTICATION, (args: StartSoterAuthenticationOptions, executor: ApiExecutor<StartSoterAuthenticationSuccess>)=>{
        const authType: userAuth.UserAuthType[] = [];
        args.requestAuthModes.forEach((item)=>{
            if (item === 'fingerPrint') {
                authType.push(userAuth.UserAuthType.FINGERPRINT);
            } else if (item === 'facial') {
                authType.push(userAuth.UserAuthType.FACE);
            }
        });
        const challengeArr = toUint8Arr(args.challenge ?? '');
        const authContent = args.authContent ?? '';
        try {
            const auth = userAuth.getUserAuthInstance({
                challenge: challengeArr,
                authType,
                authTrustLevel: userAuth.AuthTrustLevel.ATL1
            } as userAuth.AuthParam, {
                title: authContent
            } as userAuth.WidgetParam);
            auth.on("result", {
                onResult: (result: userAuth.UserAuthResult)=>{
                    if (result.result === userAuth.UserAuthResultCode.SUCCESS) {
                        executor.resolve({
                            errCode: 0,
                            authMode: result.authType === userAuth.UserAuthType.FINGERPRINT ? 'fingerPrint' : 'facial'
                        } as StartSoterAuthenticationSuccess);
                    } else {
                        const errMsg = getErrorMessage(result.result);
                        const errCode = getUniErrMsg(result.result);
                        executor.reject(errMsg, {
                            errCode
                        } as ApiError);
                    }
                }
            } as userAuth.IAuthCallback);
            if (authContent) {
                promptAction.showToast({
                    message: authContent
                } as promptAction.ShowToastOptions);
            }
            auth.start();
        } catch (error) {
            const code = (error as BusinessError1).code;
            executor.reject(getErrorMessage(code), {
                errCode: getUniErrMsg(code)
            } as ApiError);
        }
    }, StartSoterAuthenticationApiProtocols, StartSoterAuthenticationApiOptions) as StartSoterAuthentication;
    const fingerPrintAvailable = ()=>{
        try {
            userAuth.getAvailableStatus(userAuth.UserAuthType.FINGERPRINT, userAuth.AuthTrustLevel.ATL1);
            return true;
        } catch (error) {
            return false;
        }
    };
    const faceAvailable = ()=>{
        try {
            userAuth.getAvailableStatus(userAuth.UserAuthType.FACE, userAuth.AuthTrustLevel.ATL1);
            return true;
        } catch (error) {
            return false;
        }
    };
    const PERMISSIONS = [
        'ohos.permission.ACCESS_BIOMETRIC'
    ];
    const checkIsSupportSoterAuthentication: CheckIsSupportSoterAuthentication = defineAsyncApi<CheckIsSupportSoterAuthenticationOptions, CheckIsSupportSoterAuthenticationSuccess>(API_CHECK_IS_SUPPORT_SOTER_AUTHENTICATION, (args: CheckIsSupportSoterAuthenticationOptions, executor: ApiExecutor<CheckIsSupportSoterAuthenticationSuccess>)=>{
        UTSHarmony1.requestSystemPermission(PERMISSIONS, (allRight: boolean)=>{
            if (allRight) {
                try {
                    const supportMode: SoterAuthMode[] = [];
                    if (fingerPrintAvailable()) supportMode.push('fingerPrint');
                    if (faceAvailable()) supportMode.push('facial');
                    return executor.resolve({
                        supportMode,
                        errMsg: ''
                    } as CheckIsSupportSoterAuthenticationSuccess);
                } catch (error) {
                    const code = (error as BusinessError1).code;
                    executor.reject(getErrorMessage(code), {
                        errCode: getUniErrMsg(code)
                    } as ApiError);
                }
            } else {
                executor.reject(getErrorMessage(201));
            }
        }, ()=>{
            executor.reject(getErrorMessage(201));
        });
    }) as CheckIsSupportSoterAuthentication;
    const getFingerPrintEnrolledState = ()=>{
        userAuth.getEnrolledState(userAuth.UserAuthType.FINGERPRINT);
        return true;
    };
    const getFaceEnrolledState = ()=>{
        userAuth.getEnrolledState(userAuth.UserAuthType.FACE);
        return true;
    };
    const harmonyCheckIsSoterEnrolledInDevice = (checkAuthMode: SoterAuthMode): boolean =>{
        if (checkAuthMode === 'fingerPrint') {
            return getFingerPrintEnrolledState();
        } else if (checkAuthMode === 'facial') {
            return getFaceEnrolledState();
        }
        return false;
    };
    const checkIsSoterEnrolledInDevice: CheckIsSoterEnrolledInDevice = defineAsyncApi<CheckIsSoterEnrolledInDeviceOptions, CheckIsSoterEnrolledInDeviceSuccess>(API_CHECK_IS_SOTER_ENROLLED_IN_DEVICE, (args: CheckIsSoterEnrolledInDeviceOptions, executor: ApiExecutor<CheckIsSoterEnrolledInDeviceSuccess>)=>{
        UTSHarmony1.requestSystemPermission(PERMISSIONS, (allRight: boolean)=>{
            if (allRight) {
                try {
                    const isEnrolled = harmonyCheckIsSoterEnrolledInDevice(args.checkAuthMode);
                    executor.resolve({
                        isEnrolled,
                        errMsg: ''
                    } as CheckIsSoterEnrolledInDeviceSuccess);
                } catch (error) {
                    const code = (error as BusinessError1).code;
                    executor.reject(getErrorMessage(code), {
                        errCode: getUniErrMsg(code)
                    } as ApiError);
                }
            } else {
                executor.reject(getErrorMessage(201));
            }
        }, ()=>{
            executor.reject(getErrorMessage(201));
        });
    }, CheckIsSoterEnrolledInDeviceProtocols, CheckIsSoterEnrolledInDeviceApiOptions) as CheckIsSoterEnrolledInDevice;
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
    const API_CREATE_INNER_AUDIO_CONTEXT = 'createInnerAudioContext';
    const isFileUri = (path: string)=>{
        return path && typeof path === 'string' && (path.startsWith('file://') || path.startsWith('datashare://'));
    };
    const isSandboxPath = (path: string)=>{
        return path && typeof path === 'string' && path.startsWith('/data/storage/');
    };
    const getFdFromUriOrSandBoxPath = (uri: string)=>{
        try {
            const file = fileIo.openSync(uri, fileIo.OpenMode.READ_ONLY);
            return file.fd;
        } catch (error) {
            console.info(`[AdvancedAPI] Can not get file from uri: ${uri} `);
        }
        throw new Error('file is not exist');
    };
    const callCallbacks = (callbacks: Function[], ...args: Object[])=>{
        callbacks.forEach((cb)=>{
            typeof cb === 'function' && cb(...args);
        });
    };
    const remoteCallback = (callbacks: Function[], callback: Function)=>{
        const index = callbacks.indexOf(callback);
        if (index > -1) {
            callbacks.splice(index, 1);
        }
    };
    class AudioPlayerError {
        errMsg: string;
        errCode: number;
        constructor(errMsg: string, errCode: number){
            this.errMsg = errMsg;
            this.errCode = errCode;
        }
    }
    class AudioPlayerCallback {
        onCanplayCallbacks: Function[] = [];
        onPlayCallbacks: Function[] = [];
        onPauseCallbacks: Function[] = [];
        onStopCallbacks: Function[] = [];
        onEndedCallbacks: Function[] = [];
        onTimeUpdateCallbacks: Function[] = [];
        onErrorCallbacks: Function[] = [];
        onWaitingCallbacks: Function[] = [];
        onSeekingCallbacks: Function[] = [];
        onSeekedCallbacks: Function[] = [];
        constructor(){}
        canPlay() {
            callCallbacks(this.onCanplayCallbacks);
        }
        onCanplay(callback: Function) {
            this.onCanplayCallbacks.push(callback);
        }
        offCanplay(callback: Function) {
            remoteCallback(this.onCanplayCallbacks, callback);
        }
        play() {
            callCallbacks(this.onPlayCallbacks);
        }
        onPlay(callback: Function) {
            this.onPlayCallbacks.push(callback);
        }
        offPlay(callback: Function) {
            remoteCallback(this.onPlayCallbacks, callback);
        }
        pause() {
            callCallbacks(this.onPauseCallbacks);
        }
        onPause(callback: Function) {
            this.onPauseCallbacks.push(callback);
        }
        offPause(callback: Function) {
            remoteCallback(this.onPauseCallbacks, callback);
        }
        stop() {
            callCallbacks(this.onStopCallbacks);
        }
        onStop(callback: Function) {
            this.onStopCallbacks.push(callback);
        }
        offStop(callback: Function) {
            remoteCallback(this.onStopCallbacks, callback);
        }
        ended() {
            callCallbacks(this.onEndedCallbacks);
        }
        onEnded(callback: Function) {
            this.onEndedCallbacks.push(callback);
        }
        offEnded(callback: Function) {
            remoteCallback(this.onEndedCallbacks, callback);
        }
        timeUpdate(time: number) {
            callCallbacks(this.onTimeUpdateCallbacks, time);
        }
        onTimeUpdate(callback: Function) {
            this.onTimeUpdateCallbacks.push(callback);
        }
        offTimeUpdate(callback: Function) {
            remoteCallback(this.onTimeUpdateCallbacks, callback);
        }
        error(res: AudioPlayerError) {
            callCallbacks(this.onErrorCallbacks, res);
        }
        onError(callback: Function) {
            this.onErrorCallbacks.push(callback);
        }
        offError(callback: Function) {
            remoteCallback(this.onErrorCallbacks, callback);
        }
        onPrev(callback: Function) {
            console.info('ios only');
        }
        onNext(callback: Function) {
            console.info('ios only');
        }
        waiting() {
            callCallbacks(this.onWaitingCallbacks);
        }
        onWaiting(callback: Function) {
            this.onWaitingCallbacks.push(callback);
        }
        offWaiting(callback: Function) {
            remoteCallback(this.onWaitingCallbacks, callback);
        }
        seeking() {
            callCallbacks(this.onSeekingCallbacks);
        }
        onSeeking(callback: Function) {
            this.onSeekingCallbacks.push(callback);
        }
        offSeeking(callback: Function) {
            remoteCallback(this.onSeekingCallbacks, callback);
        }
        seeked() {
            callCallbacks(this.onSeekedCallbacks);
        }
        onSeeked(callback: Function) {
            this.onSeekedCallbacks.push(callback);
        }
        offSeeked(callback: Function) {
            remoteCallback(this.onSeekedCallbacks, callback);
        }
    }
    const AUDIOS: Record<string, InnerAudioContext | undefined> = {};
    const AUDIO_PLAYERS: Record<string, media.AudioPlayer | undefined> = {};
    const LOG = (msg: string)=>console.log(`[createInnerAudioContext]: ${msg}`);
    class STATE_TYPE {
        static IDLE: string = 'idle';
        static PLAYING: string = 'playing';
        static PAUSED: string = 'paused';
        static STOPPED: string = 'stopped';
        static ERROR: string = 'error';
    }
    class AudioPlayer implements InnerAudioContext {
        private audioPlayerCallback: AudioPlayerCallback = new AudioPlayerCallback();
        private _volume: number = 1;
        private _src: string = '';
        private _autoplay: boolean = false;
        private _startTime: number = 0;
        private _buffered: number = 0;
        private _title: string = '';
        private audioId: string = '';
        private _playbackRate: number = 1;
        readonly obeyMuteSwitch: boolean = false;
        constructor(audioId: string){
            this.audioId = audioId;
            this.init();
        }
        init() {
            AUDIO_PLAYERS[this.audioId]?.on('dataLoad', ()=>{
                this.audioPlayerCallback.canPlay();
            });
            AUDIO_PLAYERS[this.audioId]?.on('play', ()=>{
                this.audioPlayerCallback.play();
            });
            AUDIO_PLAYERS[this.audioId]?.on('pause', ()=>{
                this.audioPlayerCallback.pause();
            });
            AUDIO_PLAYERS[this.audioId]?.on('finish', ()=>{
                this.audioPlayerCallback.ended();
            });
            AUDIO_PLAYERS[this.audioId]?.on('timeUpdate', (res)=>{
                this.audioPlayerCallback.timeUpdate(res / 1000);
            });
            AUDIO_PLAYERS[this.audioId]?.on('error', (err)=>{
                this.audioPlayerCallback.error(new AudioPlayerError(err.message, err.code));
            });
            AUDIO_PLAYERS[this.audioId]?.on('bufferingUpdate', (infoType, value)=>{
                console.info(`[AdvancedAPI] audioPlayer bufferingUpdate ${infoType} ${value}`);
                if (infoType === media.BufferingInfoType.BUFFERING_PERCENT && value !== 0 && AUDIO_PLAYERS[this.audioId]) {
                    this._buffered = value;
                    if ((AUDIO_PLAYERS[this.audioId]!.currentTime / 1000) >= (AUDIO_PLAYERS[this.audioId]!.duration * value / 100000)) {
                        this.audioPlayerCallback.waiting();
                    }
                }
            });
            AUDIO_PLAYERS[this.audioId]?.on('audioInterrupt', (InterruptEvent)=>{
                console.info('[AdvancedAPI]  audioInterrupt:' + JSON.stringify(InterruptEvent));
                if (AUDIO_PLAYERS[this.audioId] && InterruptEvent.hintType === audio.InterruptHint.INTERRUPT_HINT_PAUSE) {
                    AUDIO_PLAYERS[this.audioId]!.pause();
                }
            });
        }
        get duration() {
            const audioPlayer = AUDIO_PLAYERS[this.audioId];
            if (!audioPlayer) {
                return 0;
            }
            return audioPlayer.duration / 1000;
        }
        get currentTime() {
            const audioPlayer = AUDIO_PLAYERS[this.audioId];
            if (!audioPlayer) {
                return 0;
            }
            return audioPlayer.currentTime / 1000;
        }
        get paused() {
            const audioPlayer = AUDIO_PLAYERS[this.audioId];
            if (!audioPlayer) {
                return false;
            }
            return audioPlayer.state === STATE_TYPE.PAUSED;
        }
        get loop() {
            const audioPlayer = AUDIO_PLAYERS[this.audioId];
            if (!audioPlayer) {
                return false;
            }
            return audioPlayer.loop;
        }
        set loop(value) {
            const audioPlayer = AUDIO_PLAYERS[this.audioId];
            if (audioPlayer) {
                audioPlayer.loop = value;
            }
        }
        get volume() {
            return this._volume;
        }
        set volume(value) {
            const audioPlayer = AUDIO_PLAYERS[this.audioId];
            if (audioPlayer) {
                this._volume = value;
                audioPlayer.setVolume(value);
            }
        }
        get src() {
            const audioPlayer = AUDIO_PLAYERS[this.audioId];
            if (!audioPlayer) {
                return '';
            }
            return audioPlayer.src;
        }
        set src(value) {
            const audioPlayer = AUDIO_PLAYERS[this.audioId];
            if (typeof value !== 'string') {
                this.audioPlayerCallback.error(new AudioPlayerError(`set src: ${value} is not string`, 10004));
                return;
            }
            if (!audioPlayer) {
                this.audioPlayerCallback.error(new AudioPlayerError(`player is not exist`, 10001));
                return;
            }
            if (!value || !(value.startsWith('http:') || value.startsWith('https:') || isFileUri(value) || isSandboxPath(value))) {
                LOG(`set src: ${value} is invalid`);
                return;
            }
            let path: string = '';
            if (value.startsWith('http:') || value.startsWith('https:')) {
                path = value;
            } else if (isFileUri(value) || isSandboxPath(value)) {
                try {
                    const fd = getFdFromUriOrSandBoxPath(value);
                    path = `fd://${fd}`;
                } catch (error) {
                    console.error(`${JSON.stringify(error)}`);
                }
            }
            if (audioPlayer.src && path !== audioPlayer.src) {
                audioPlayer.reset();
            }
            AUDIO_PLAYERS[this.audioId]!.src = path;
            this._src = value;
            if (this._autoplay) {
                audioPlayer.play();
                if (this._startTime) {
                    audioPlayer.seek(this._startTime);
                }
            }
        }
        get startTime() {
            return this._startTime / 1000;
        }
        set startTime(time: number) {
            this._startTime = time * 1000;
        }
        get autoplay() {
            return this._autoplay;
        }
        set autoplay(flag) {
            this._autoplay = flag;
        }
        get buffered() {
            const audioPlayer = AUDIO_PLAYERS[this.audioId];
            if (!audioPlayer) return 0;
            return audioPlayer.duration * this._buffered / 100000;
        }
        set playbackRate(rate: number) {
            this.audioPlayerCallback.error(new AudioPlayerError('HarmonyOS Next Audio setting playbackRate is not supported.', -1));
        }
        get playbackRate() {
            return this._playbackRate;
        }
        play() {
            const audioPlayer = AUDIO_PLAYERS[this.audioId];
            if (!audioPlayer) {
                return;
            }
            const state = audioPlayer.state ?? '';
            if (![
                STATE_TYPE.PAUSED,
                STATE_TYPE.STOPPED,
                STATE_TYPE.IDLE
            ].includes(state)) {
                return;
            }
            if (this._src && audioPlayer.src === '') {
                this.src = this._src;
            }
            audioPlayer.play();
        }
        pause() {
            const audioPlayer = AUDIO_PLAYERS[this.audioId];
            if (!audioPlayer) {
                return;
            }
            const state = audioPlayer.state;
            if (STATE_TYPE.PLAYING !== state) {
                return;
            }
            audioPlayer.pause();
        }
        stop() {
            const audioPlayer = AUDIO_PLAYERS[this.audioId];
            if (!audioPlayer) {
                return;
            }
            if (![
                STATE_TYPE.PAUSED,
                STATE_TYPE.PLAYING
            ].includes(audioPlayer.state)) {
                return;
            }
            audioPlayer.stop();
            this.audioPlayerCallback.stop();
            audioPlayer.release();
        }
        seek(position: number) {
            const audioPlayer = AUDIO_PLAYERS[this.audioId];
            if (!audioPlayer) {
                return;
            }
            const state = audioPlayer.state;
            if (![
                STATE_TYPE.PAUSED,
                STATE_TYPE.PLAYING
            ].includes(state)) {
                return;
            }
            this.audioPlayerCallback.seeking();
            audioPlayer.seek(position * 1000);
            this.audioPlayerCallback.seeked();
        }
        destroy() {
            const audioPlayer = AUDIO_PLAYERS[this.audioId];
            if (!audioPlayer) {
                return;
            }
            audioPlayer.release();
            AUDIO_PLAYERS[this.audioId] = undefined;
            AUDIOS[this.audioId] = undefined;
        }
        onCanplay(callback: (result: Object) => void): void {
            this.audioPlayerCallback.onCanplay(callback);
        }
        onPlay(callback: (result: Object) => void): void {
            this.audioPlayerCallback.onPlay(callback);
        }
        onPause(callback: (result: Object) => void): void {
            this.audioPlayerCallback.onPause(callback);
        }
        onStop(callback: (result: Object) => void): void {
            this.audioPlayerCallback.onStop(callback);
        }
        onEnded(callback: (result: Object) => void): void {
            this.audioPlayerCallback.onEnded(callback);
        }
        onTimeUpdate(callback: (result: Object) => void): void {
            this.audioPlayerCallback.onTimeUpdate(callback);
        }
        onError(callback: (result: Object) => void): void {
            this.audioPlayerCallback.onError(callback);
        }
        onWaiting(callback: (result: Object) => void): void {
            this.audioPlayerCallback.onWaiting(callback);
        }
        onSeeking(callback: (result: Object) => void): void {
            this.audioPlayerCallback.onSeeking(callback);
        }
        onSeeked(callback: (result: Object) => void): void {
            this.audioPlayerCallback.onSeeked(callback);
        }
        offCanplay(callback: (result: Object) => void): void {
            this.audioPlayerCallback.offCanplay(callback);
        }
        offPlay(callback: (result: Object) => void): void {
            this.audioPlayerCallback.offPlay(callback);
        }
        offPause(callback: (result: Object) => void): void {
            this.audioPlayerCallback.offPause(callback);
        }
        offStop(callback: (result: Object) => void): void {
            this.audioPlayerCallback.offStop(callback);
        }
        offEnded(callback: (result: Object) => void): void {
            this.audioPlayerCallback.offEnded(callback);
        }
        offTimeUpdate(callback: (result: Object) => void): void {
            this.audioPlayerCallback.offTimeUpdate(callback);
        }
        offError(callback: (result: Object) => void): void {
            this.audioPlayerCallback.offError(callback);
        }
        offWaiting(callback: (result: Object) => void): void {
            this.audioPlayerCallback.offWaiting(callback);
        }
        offSeeking(callback: (result: Object) => void): void {
            this.audioPlayerCallback.offSeeking(callback);
        }
        offSeeked(callback: (result: Object) => void): void {
            this.audioPlayerCallback.offSeeked(callback);
        }
    }
    const createAudioInstance = ()=>{
        const audioId = `${Date.now()}${Math.random()}`;
        AUDIO_PLAYERS[audioId] = media.createAudioPlayer();
        AUDIOS[audioId] = new AudioPlayer(audioId);
        return audioId;
    };
    const createInnerAudioContext: CreateInnerAudioContext = defineSyncApi<InnerAudioContext>(API_CREATE_INNER_AUDIO_CONTEXT, ()=>{
        const audioId = createAudioInstance();
        return AUDIOS[audioId];
    }) as CreateInnerAudioContext;
    const API_$_ON = '$on';
    const API_$_ONCE = '$once';
    const API_$_OFF = '$off';
    const API_$_EMIT = '$emit';
    const emitter: IUniEventEmitter = new Emitter() as IUniEventEmitter;
    const $on: $On = defineSyncApi<void>(API_$_ON, (eventName: string, callback: Function)=>{
        emitter.on(eventName, callback);
    }) as $On;
    const $once: $Once = defineSyncApi<void>(API_$_ONCE, (eventName: string, callback: Function)=>{
        emitter.once(eventName, callback);
    }) as $Once;
    const $off: $Off = defineSyncApi<void>(API_$_OFF, (eventName: string, callback: Function)=>{
        emitter.off(eventName, callback);
    }) as $Off;
    const $emit: $Emit = defineSyncApi<void>(API_$_EMIT, (eventName: string, ...args: (Object | undefined | null)[])=>{
        emitter.emit(eventName, ...args);
    }) as $Emit;
    const API_EXIT = 'exit';
    const exit: Exit = defineSyncApi<void>(API_EXIT, ()=>{
        UTSHarmony2.exit();
    }) as Exit;
    const API_SAVE_FILE = 'saveFile';
    const API_GET_FILE_INFO = 'getFileInfo';
    const API_GET_SAVED_FILE_INFO = 'getSavedFileInfo';
    const API_GET_SAVED_FILE_LIST = 'getSavedFileList';
    const API_REMOVE_SAVED_FILE = 'removeSavedFile';
    const getSavedDir = ()=>{
        return getEnv().USER_DATA_PATH + '/saved';
    };
    let savedIndex: [string, number] = [
        '0',
        0
    ];
    const getSavedFileName = (filePath: string)=>{
        const ext = filePath.split('/').pop()?.split('.').slice(1).join('.');
        let fileName = Date.now() + '';
        if (savedIndex[0] === fileName) {
            savedIndex[1]++;
            if (savedIndex[1] > 0) {
                fileName += '-' + savedIndex[1];
            }
        } else {
            savedIndex[0] = fileName;
            savedIndex[1] = 0;
        }
        if (ext) {
            fileName += '.' + ext;
        }
        return fileName;
    };
    const getFsPath = (filePath: string)=>{
        filePath = getRealPath(filePath) as string;
        if (!/^file:/.test(filePath)) {
            return filePath;
        }
        const rawPath = filePath.replace(/^file:\/\//, '');
        if (rawPath[0] === '/') {
            return rawPath;
        }
        return filePath;
    };
    const saveFile: SaveFile = defineAsyncApi<SaveFileOptions, SaveFileSuccess>(API_SAVE_FILE, (options: SaveFileOptions, exec: ApiExecutor<SaveFileSuccess>)=>{
        const tempFilePath = getRealPath(options.tempFilePath) as string;
        const savedPath = getSavedDir();
        if (!fs.accessSync(savedPath)) {
            fs.mkdirSync(savedPath, true);
        }
        let srcFile: fs.File;
        try {
            srcFile = fs.openSync(tempFilePath, fs.OpenMode.READ_ONLY);
        } catch (error) {
            exec.reject((error as Error).message);
            return;
        }
        const savedFilePath = savedPath + '/' + getSavedFileName(tempFilePath);
        fs.copyFile(srcFile.fd, savedFilePath, (err)=>{
            fs.closeSync(srcFile);
            if (err) {
                exec.reject(err.message);
            } else {
                exec.resolve({
                    savedFilePath: 'file://' + savedFilePath
                } as SaveFileSuccess);
            }
        });
    }) as SaveFile;
    const getSavedFileList: GetSavedFileList = defineAsyncApi<GetSavedFileListOptions, GetSavedFileListSuccess>(API_GET_SAVED_FILE_LIST, (options: GetSavedFileListOptions, exec: ApiExecutor<GetSavedFileListSuccess>)=>{
        const savedPath = getSavedDir();
        if (!fs.accessSync(savedPath)) {
            exec.resolve({
                fileList: []
            } as GetSavedFileListSuccess);
        }
        fs.listFile(savedPath, {} as ListFileOptions, (err, fileList)=>{
            if (err) {
                exec.reject(err.message);
            } else {
                exec.resolve({
                    fileList: fileList.map((filePath: string)=>{
                        const fullPath = savedPath + '/' + filePath;
                        const stat = fs.statSync(fullPath);
                        if (!stat.isFile()) {
                            return null;
                        }
                        return {
                            filePath: 'file://' + fullPath,
                            size: stat.size,
                            createTime: stat.ctime
                        } as SavedFileListItem;
                    }).filter((item)=>!!item)
                } as GetSavedFileListSuccess);
            }
        });
    }) as GetSavedFileList;
    const getSavedFileInfo: GetSavedFileInfo = defineAsyncApi<GetSavedFileInfoOptions, GetSavedFileInfoSuccess>(API_GET_SAVED_FILE_INFO, (options: GetSavedFileInfoOptions, exec: ApiExecutor<GetSavedFileInfoSuccess>)=>{
        const savedFilePath = getFsPath(options.filePath);
        if (!fs.accessSync(savedFilePath)) {
            exec.reject('file not exist');
            return;
        }
        const stat = fs.statSync(savedFilePath);
        if (!stat.isFile()) {
            exec.reject('file not exist');
        }
        exec.resolve({
            size: stat.size,
            createTime: stat.ctime
        } as GetSavedFileInfoSuccess);
    }) as GetSavedFileInfo;
    const removeSavedFile: RemoveSavedFile = defineAsyncApi<RemoveSavedFileOptions, RemoveSavedFileSuccess>(API_REMOVE_SAVED_FILE, (options: RemoveSavedFileOptions, exec: ApiExecutor<RemoveSavedFileSuccess>)=>{
        const savedFilePath = getFsPath(options.filePath);
        if (!fs.accessSync(savedFilePath)) {
            exec.reject('file not exist');
            return;
        }
        fs.unlink(savedFilePath, (err)=>{
            if (err) {
                exec.reject(err.message);
            } else {
                exec.resolve();
            }
        });
    }) as RemoveSavedFile;
    const SupportedHashAlgorithm = [
        'md5',
        'sha1'
    ];
    const getFileInfo: GetFileInfo = defineAsyncApi<GetFileInfoOptions, GetFileInfoSuccess>(API_GET_FILE_INFO, (options: GetFileInfoOptions, exec: ApiExecutor<GetFileInfoSuccess>)=>{
        const filePath = getFsPath(options.filePath);
        const digestAlgorithm = options.digestAlgorithm && SupportedHashAlgorithm.includes(options.digestAlgorithm) ? options.digestAlgorithm : 'md5';
        if (!fs.accessSync(filePath)) {
            exec.reject('file not exist');
            return;
        }
        const stat = fs.statSync(filePath);
        if (!stat.isFile()) {
            exec.reject('file not exist');
        }
        Hash.hash(filePath, digestAlgorithm, (err, hash)=>{
            if (err) {
                exec.reject(err.message);
            } else {
                exec.resolve({
                    size: stat.size,
                    digest: hash
                } as GetFileInfoSuccess);
            }
        });
    }) as GetFileInfo;
    const AUTHORIZED = 'authorized';
    const DENIED = 'denied';
    const NOT_DETERMINED = 'not determined';
    class AppAuthorizeSetting {
        albumAuthorized: string = NOT_DETERMINED;
        bluetoothAuthorized: string = NOT_DETERMINED;
        cameraAuthorized: string = NOT_DETERMINED;
        locationAuthorized: string = NOT_DETERMINED;
        locationAccuracy: string = NOT_DETERMINED;
        microphoneAuthorized: string = NOT_DETERMINED;
        notificationAuthorized: string = NOT_DETERMINED;
        notificationAlertAuthorized: string = NOT_DETERMINED;
        notificationBadgeAuthorized: string = NOT_DETERMINED;
        notificationSoundAuthorized: string = NOT_DETERMINED;
        phoneCalendarAuthorized: string = NOT_DETERMINED;
    }
    class GetAppAuthorizeSettingImpl {
        accessTokenId: number;
        atManager: abilityAccessCtrl.AtManager;
        appAuthorizeSetting: AppAuthorizeSetting;
        constructor(accessTokenId: number, atManager: abilityAccessCtrl.AtManager, appAuthorizeSetting: AppAuthorizeSetting){
            this.accessTokenId = accessTokenId;
            this.atManager = atManager;
            this.appAuthorizeSetting = appAuthorizeSetting;
            this.getAlbumAuthorizeSetting();
            this.getBlueToothAuthorizeSetting();
            this.getCameraAuthorizeSetting();
            this.getLocationAuthorizeSetting();
            this.getMicrophoneAuthorizeSetting();
            this.getNotificationAuthorizeSetting();
            this.getPhoneCalendarAuthorizeSetting();
        }
        getAlbumAuthorizeSetting() {
            const grantStatus = this.atManager.checkAccessTokenSync(this.accessTokenId, 'ohos.permission.READ_IMAGEVIDEO');
            if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_DENIED) {
                this.appAuthorizeSetting.albumAuthorized = DENIED;
            }
            if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
                this.appAuthorizeSetting.albumAuthorized = AUTHORIZED;
            }
        }
        getBlueToothAuthorizeSetting() {
            const grantStatus = this.atManager.checkAccessTokenSync(this.accessTokenId, 'ohos.permission.ACCESS_BLUETOOTH');
            if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_DENIED) {
                this.appAuthorizeSetting.bluetoothAuthorized = DENIED;
            }
            if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
                this.appAuthorizeSetting.bluetoothAuthorized = AUTHORIZED;
            }
        }
        getCameraAuthorizeSetting() {
            const grantStatus = this.atManager.checkAccessTokenSync(this.accessTokenId, 'ohos.permission.CAMERA');
            if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_DENIED) {
                this.appAuthorizeSetting.cameraAuthorized = DENIED;
            }
            if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
                this.appAuthorizeSetting.cameraAuthorized = AUTHORIZED;
            }
        }
        getLocationAuthorizeSetting() {
            const grantStatus = this.atManager.checkAccessTokenSync(this.accessTokenId, 'ohos.permission.LOCATION');
            if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_DENIED) {
                this.appAuthorizeSetting.locationAuthorized = DENIED;
            }
            if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
                this.appAuthorizeSetting.locationAuthorized = AUTHORIZED;
            }
        }
        getMicrophoneAuthorizeSetting() {
            const grantStatus = this.atManager.checkAccessTokenSync(this.accessTokenId, 'ohos.permission.MICROPHONE');
            if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_DENIED) {
                this.appAuthorizeSetting.microphoneAuthorized = DENIED;
            }
            if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
                this.appAuthorizeSetting.microphoneAuthorized = AUTHORIZED;
            }
        }
        getNotificationAuthorizeSetting() {
            try {
                const isNotificationEnabled = notificationManager.isNotificationEnabledSync();
                if (isNotificationEnabled) {
                    this.appAuthorizeSetting.notificationAuthorized = DENIED;
                }
                if (isNotificationEnabled) {
                    this.appAuthorizeSetting.notificationAuthorized = AUTHORIZED;
                }
            } catch (error) {
                this.appAuthorizeSetting.notificationAuthorized = DENIED;
            }
        }
        getPhoneCalendarAuthorizeSetting() {
            const grantStatus = this.atManager.checkAccessTokenSync(this.accessTokenId, 'ohos.permission.WRITE_CALENDAR');
            if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_DENIED) {
                this.appAuthorizeSetting.phoneCalendarAuthorized = DENIED;
            }
            if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
                this.appAuthorizeSetting.phoneCalendarAuthorized = AUTHORIZED;
            }
        }
    }
    const getAppAuthorizeSetting: GetAppAuthorizeSetting = defineSyncApi<GetAppAuthorizeSettingResult>('getAppAuthorizeSetting', ()=>{
        const bundleInfoWithApplication = bundleManager.getBundleInfoForSelfSync(bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION);
        const appAuthorizeSettingImpl = new GetAppAuthorizeSettingImpl(bundleInfoWithApplication.appInfo.accessTokenId, abilityAccessCtrl.createAtManager(), new AppAuthorizeSetting());
        return appAuthorizeSettingImpl.appAuthorizeSetting as GetAppAuthorizeSettingResult;
    }) as GetAppAuthorizeSetting;
    const API_GET_APP_BASE_INFO = 'getAppBaseInfo';
    const getBundleInfoOnce = ()=>{
        let bundleInfo: bundleManager1.BundleInfo | null = null;
        return (): bundleManager1.BundleInfo =>{
            if (bundleInfo) {
                return bundleInfo;
            }
            bundleInfo = bundleManager1.getBundleInfoForSelfSync(bundleManager1.BundleFlag.GET_BUNDLE_INFO_DEFAULT);
            return bundleInfo;
        };
    };
    const getBundleInfo = getBundleInfoOnce();
    const getAppBaseInfo: GetAppBaseInfo = defineSyncApi<GetAppBaseInfoResult>(API_GET_APP_BASE_INFO, (): GetAppBaseInfoResult =>{
        const appVersion: IAppBaseInfoAppVersion = UTSHarmony3.getAppVersion();
        const appLanguage = I18n.System.getAppPreferredLanguage();
        const uniCompilerVersion: string = UTSHarmony3.getUniCompilerVersion();
        const uniRuntimeVersion: string = UTSHarmony3.getUniRuntimeVersion();
        return {
            appId: UTSHarmony3.getAppId() as string,
            appLanguage,
            appName: UTSHarmony3.getAppName() as string,
            appTheme: UTSHarmony3.getAppTheme() as string,
            appVersion: appVersion.name,
            appVersionCode: appVersion.code,
            appWgtVersion: appVersion.name,
            hostLanguage: I18n.System.getSystemLanguage(),
            isUniAppX: UTSHarmony3.isUniAppX() as boolean,
            packageName: getBundleInfo().name,
            uniCompilerVersion: uniCompilerVersion,
            uniCompilerVersionCode: parseFloat(uniCompilerVersion),
            uniRuntimeVersion: uniRuntimeVersion,
            uniRuntimeVersionCode: parseFloat(uniRuntimeVersion),
            uniPlatform: 'app'
        } as GetAppBaseInfoResult;
    }) as GetAppBaseInfo;
    const API_GET_BACKGROUND_AUDIO_MANAGER = 'getBackgroundAudioManager';
    const isFileUri1 = (path: string)=>{
        return path && typeof path === 'string' && (path.startsWith('file://') || path.startsWith('datashare://'));
    };
    const isSandboxPath1 = (path: string)=>{
        return path && typeof path === 'string' && path.startsWith('/data/storage/');
    };
    const getFdFromUriOrSandBoxPath1 = (uri: string)=>{
        try {
            const file = fileIo1.openSync(uri, fileIo1.OpenMode.READ_ONLY);
            return file.fd;
        } catch (error) {
            console.info(`[AdvancedAPI] Can not get file from uri: ${uri} `);
        }
        throw new Error('file is not exist');
    };
    const callCallbacks1 = (callbacks: Function[], ...args: Object[])=>{
        callbacks.forEach((cb)=>{
            typeof cb === 'function' && cb(...args);
        });
    };
    const remoteCallback1 = (callbacks: Function[], callback: Function)=>{
        const index = callbacks.indexOf(callback);
        if (index > -1) {
            callbacks.splice(index, 1);
        }
    };
    class AudioPlayerError1 {
        errMsg: string;
        errCode: number;
        constructor(errMsg: string, errCode: number){
            this.errMsg = errMsg;
            this.errCode = errCode;
        }
    }
    class AudioPlayerCallback1 {
        onCanplayCallbacks: Function[] = [];
        onPlayCallbacks: Function[] = [];
        onPauseCallbacks: Function[] = [];
        onStopCallbacks: Function[] = [];
        onEndedCallbacks: Function[] = [];
        onTimeUpdateCallbacks: Function[] = [];
        onErrorCallbacks: Function[] = [];
        onWaitingCallbacks: Function[] = [];
        onSeekingCallbacks: Function[] = [];
        onSeekedCallbacks: Function[] = [];
        constructor(){}
        canPlay() {
            callCallbacks1(this.onCanplayCallbacks);
        }
        onCanplay(callback: Function) {
            this.onCanplayCallbacks.push(callback);
        }
        offCanplay(callback: Function) {
            remoteCallback1(this.onCanplayCallbacks, callback);
        }
        play() {
            callCallbacks1(this.onPlayCallbacks);
        }
        onPlay(callback: Function) {
            this.onPlayCallbacks.push(callback);
        }
        offPlay(callback: Function) {
            remoteCallback1(this.onPlayCallbacks, callback);
        }
        pause() {
            callCallbacks1(this.onPauseCallbacks);
        }
        onPause(callback: Function) {
            this.onPauseCallbacks.push(callback);
        }
        offPause(callback: Function) {
            remoteCallback1(this.onPauseCallbacks, callback);
        }
        stop() {
            callCallbacks1(this.onStopCallbacks);
        }
        onStop(callback: Function) {
            this.onStopCallbacks.push(callback);
        }
        offStop(callback: Function) {
            remoteCallback1(this.onStopCallbacks, callback);
        }
        ended() {
            callCallbacks1(this.onEndedCallbacks);
        }
        onEnded(callback: Function) {
            this.onEndedCallbacks.push(callback);
        }
        offEnded(callback: Function) {
            remoteCallback1(this.onEndedCallbacks, callback);
        }
        timeUpdate(time: number) {
            callCallbacks1(this.onTimeUpdateCallbacks, time);
        }
        onTimeUpdate(callback: Function) {
            this.onTimeUpdateCallbacks.push(callback);
        }
        offTimeUpdate(callback: Function) {
            remoteCallback1(this.onTimeUpdateCallbacks, callback);
        }
        error(res: AudioPlayerError1) {
            callCallbacks1(this.onErrorCallbacks, res);
        }
        onError(callback: Function) {
            this.onErrorCallbacks.push(callback);
        }
        offError(callback: Function) {
            remoteCallback1(this.onErrorCallbacks, callback);
        }
        onPrev(callback: Function) {
            console.info('ios only');
        }
        onNext(callback: Function) {
            console.info('ios only');
        }
        waiting() {
            callCallbacks1(this.onWaitingCallbacks);
        }
        onWaiting(callback: Function) {
            this.onWaitingCallbacks.push(callback);
        }
        offWaiting(callback: Function) {
            remoteCallback1(this.onWaitingCallbacks, callback);
        }
        seeking() {
            callCallbacks1(this.onSeekingCallbacks);
        }
        onSeeking(callback: Function) {
            this.onSeekingCallbacks.push(callback);
        }
        offSeeking(callback: Function) {
            remoteCallback1(this.onSeekingCallbacks, callback);
        }
        seeked() {
            callCallbacks1(this.onSeekedCallbacks);
        }
        onSeeked(callback: Function) {
            this.onSeekedCallbacks.push(callback);
        }
        offSeeked(callback: Function) {
            remoteCallback1(this.onSeekedCallbacks, callback);
        }
    }
    const audioPlayerCallback = new AudioPlayerCallback1();
    let AV_SESSION: avSession.AVSession | null = null;
    const createAVSession = ()=>{
        avSession.createAVSession(getAbilityContext()!, 'player', 'audio').then((data)=>{
            AV_SESSION = data;
        });
    };
    const destroyAVSession = ()=>{
        if (AV_SESSION === null) {
            return;
        }
        AV_SESSION.destroy();
        AV_SESSION = null;
    };
    const startBackgroundTask = ()=>{
        const abilityInfo: TempAbilityInfo = getAbilityContext()!.abilityInfo;
        const wantAgentInfo: wantAgent.WantAgentInfo = {
            wants: [
                {
                    bundleName: abilityInfo.bundleName,
                    abilityName: abilityInfo.name
                }
            ],
            operationType: wantAgent.OperationType.START_ABILITY,
            requestCode: 0,
            wantAgentFlags: [
                wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG
            ]
        };
        wantAgent.getWantAgent(wantAgentInfo).then((wantAgentObj)=>{
            return backgroundTaskManager.startBackgroundRunning(getAbilityContext()!, backgroundTaskManager.BackgroundMode.AUDIO_PLAYBACK, wantAgentObj);
        }).then(()=>{
            console.debug('[getBackgroundAudioManager]  start bg operation succeeded');
        }).catch((err: BusinessError2)=>{
            audioPlayerCallback.error(new AudioPlayerError1(err.message, err.code));
        });
    };
    const stopBackgroundTask = ()=>{
        backgroundTaskManager.stopBackgroundRunning(getAbilityContext()!).then(()=>{
            console.debug('[getBackgroundAudioManager]  stop operation succeeded');
        }).catch((err: BusinessError2)=>{
            audioPlayerCallback.error(new AudioPlayerError1(err.message, err.code));
        });
    };
    const START_BACKGROUND = ()=>{
        startBackgroundTask();
        createAVSession();
    };
    const STOP_BACKGROUND = ()=>{
        destroyAVSession();
        stopBackgroundTask();
    };
    const LOG1 = (msg: string)=>console.log(`[getBackgroundAudioManager]: ${msg}`);
    class STATE_TYPE1 {
        static IDLE: string = 'idle';
        static PLAYING: string = 'playing';
        static PAUSED: string = 'paused';
        static STOPPED: string = 'stopped';
        static ERROR: string = 'error';
    }
    class BackgroundAudioManagerImpl implements BackgroundAudioManager {
        static audioPlayer?: media1.AudioPlayer;
        private _src: string = '';
        private _startTime: number = 0;
        private _buffered: number = 0;
        private _title: string = '';
        private _epname: string = '';
        private _singer: string = '';
        private _coverImgUrl: string = '';
        private _webUrl: string = '';
        private _protocol: string = '';
        private _playbackRate: number = 1;
        readonly obeyMuteSwitch: boolean = false;
        constructor(){
            this.init();
        }
        init() {
            BackgroundAudioManagerImpl.audioPlayer = media1.createAudioPlayer();
            BackgroundAudioManagerImpl.audioPlayer.on('dataLoad', ()=>{
                audioPlayerCallback.canPlay();
            });
            BackgroundAudioManagerImpl.audioPlayer.on('play', ()=>{
                audioPlayerCallback.play();
            });
            BackgroundAudioManagerImpl.audioPlayer.on('pause', ()=>{
                audioPlayerCallback.pause();
            });
            BackgroundAudioManagerImpl.audioPlayer.on('finish', ()=>{
                STOP_BACKGROUND();
                audioPlayerCallback.ended();
            });
            BackgroundAudioManagerImpl.audioPlayer.on('timeUpdate', (res)=>{
                audioPlayerCallback.timeUpdate(res / 1000);
            });
            BackgroundAudioManagerImpl.audioPlayer.on('error', (err)=>{
                audioPlayerCallback.error(new AudioPlayerError1(err.message, err.code));
            });
            BackgroundAudioManagerImpl.audioPlayer.on('bufferingUpdate', (infoType, value)=>{
                console.info(`[AdvancedAPI] audioPlayer bufferingUpdate ${infoType} ${value}`);
                if (infoType === media1.BufferingInfoType.BUFFERING_PERCENT && value !== 0 && BackgroundAudioManagerImpl.audioPlayer) {
                    this._buffered = value;
                    if ((BackgroundAudioManagerImpl.audioPlayer.currentTime / 1000) >= (BackgroundAudioManagerImpl.audioPlayer.duration * value / 100000)) {
                        audioPlayerCallback.waiting();
                    }
                }
            });
            BackgroundAudioManagerImpl.audioPlayer.on('audioInterrupt', (InterruptEvent)=>{
                console.info('[AdvancedAPI]  audioInterrupt:' + JSON.stringify(InterruptEvent));
                if (BackgroundAudioManagerImpl.audioPlayer && InterruptEvent.hintType === audio1.InterruptHint.INTERRUPT_HINT_PAUSE) {
                    BackgroundAudioManagerImpl.audioPlayer.pause();
                }
                if (BackgroundAudioManagerImpl.audioPlayer && InterruptEvent.hintType === audio1.InterruptHint.INTERRUPT_HINT_RESUME) {
                    BackgroundAudioManagerImpl.audioPlayer.play();
                }
            });
        }
        get duration() {
            if (!BackgroundAudioManagerImpl.audioPlayer) {
                return 0;
            }
            return BackgroundAudioManagerImpl.audioPlayer.duration / 1000;
        }
        get currentTime() {
            if (!BackgroundAudioManagerImpl.audioPlayer) {
                return 0;
            }
            return BackgroundAudioManagerImpl.audioPlayer.currentTime / 1000;
        }
        get paused() {
            if (!BackgroundAudioManagerImpl.audioPlayer) {
                return false;
            }
            return BackgroundAudioManagerImpl.audioPlayer.state === STATE_TYPE1.PAUSED;
        }
        get src() {
            if (!BackgroundAudioManagerImpl.audioPlayer) {
                return '';
            }
            return BackgroundAudioManagerImpl.audioPlayer.src;
        }
        set src(value) {
            if (typeof value !== 'string') {
                audioPlayerCallback.error(new AudioPlayerError1(`set src: ${value} is not string`, 10004));
                return;
            }
            if (!BackgroundAudioManagerImpl.audioPlayer) {
                audioPlayerCallback.error(new AudioPlayerError1(`player is not exist`, 10001));
                return;
            }
            if (!value || !(value.startsWith('http:') || value.startsWith('https:') || isFileUri1(value) || isSandboxPath1(value))) {
                LOG1(`set src: ${value} is invalid`);
                return;
            }
            let path: string = '';
            if (value.startsWith('http:') || value.startsWith('https:')) {
                path = value;
            } else if (isFileUri1(value) || isSandboxPath1(value)) {
                try {
                    const fd = getFdFromUriOrSandBoxPath1(value);
                    path = `fd://${fd}`;
                } catch (err) {
                    audioPlayerCallback.error(new AudioPlayerError1((err as BusinessError2).message, (err as BusinessError2).code));
                }
            }
            if (BackgroundAudioManagerImpl.audioPlayer.src && path !== BackgroundAudioManagerImpl.audioPlayer.src) {
                BackgroundAudioManagerImpl.audioPlayer.reset();
            }
            BackgroundAudioManagerImpl.audioPlayer.src = path;
            this._src = value;
            if (this._startTime) {
                BackgroundAudioManagerImpl.audioPlayer.seek(this._startTime);
            }
            BackgroundAudioManagerImpl.audioPlayer.play();
            START_BACKGROUND();
        }
        get startTime() {
            return this._startTime / 1000;
        }
        set startTime(time: number) {
            this._startTime = time * 1000;
        }
        get title() {
            return this._title;
        }
        set title(titleName: string) {
            this._title = titleName;
        }
        get buffered() {
            if (!BackgroundAudioManagerImpl.audioPlayer) return 0;
            return BackgroundAudioManagerImpl.audioPlayer.duration * this._buffered / 100000;
        }
        get epname() {
            return this._epname;
        }
        set epname(epName: string) {
            this._epname = epName;
        }
        get singer() {
            return this._singer;
        }
        set singer(singerName: string) {
            this._singer = singerName;
        }
        get coverImgUrl() {
            return this._coverImgUrl;
        }
        set coverImgUrl(url: string) {
            this._coverImgUrl = url;
        }
        get webUrl() {
            return this._webUrl;
        }
        set webUrl(url: string) {
            this._webUrl = url;
        }
        get protocol() {
            return this._protocol;
        }
        set protocol(protocolType: string) {
            this._protocol = protocolType;
        }
        set playbackRate(rate: number) {
            audioPlayerCallback.error(new AudioPlayerError1('HarmonyOS Next Audio setting playbackRate is not supported.', -1));
        }
        get playbackRate() {
            return this._playbackRate;
        }
        play() {
            if (!BackgroundAudioManagerImpl.audioPlayer) {
                return;
            }
            const state = BackgroundAudioManagerImpl.audioPlayer.state;
            if (![
                STATE_TYPE1.PAUSED,
                STATE_TYPE1.STOPPED,
                STATE_TYPE1.IDLE
            ].includes(state)) {
                return;
            }
            if (this._src && BackgroundAudioManagerImpl.audioPlayer.src === '') {
                this.src = this._src;
            }
            BackgroundAudioManagerImpl.audioPlayer.play();
            START_BACKGROUND();
        }
        pause() {
            if (!BackgroundAudioManagerImpl.audioPlayer) {
                return;
            }
            const state = BackgroundAudioManagerImpl.audioPlayer.state;
            if (STATE_TYPE1.PLAYING !== state) {
                return;
            }
            BackgroundAudioManagerImpl.audioPlayer.pause();
        }
        stop() {
            if (!BackgroundAudioManagerImpl.audioPlayer) {
                return;
            }
            if (![
                STATE_TYPE1.PAUSED,
                STATE_TYPE1.PLAYING
            ].includes(BackgroundAudioManagerImpl.audioPlayer.state)) {
                return;
            }
            BackgroundAudioManagerImpl.audioPlayer.stop();
            BackgroundAudioManagerImpl.audioPlayer.release();
            this.init();
            STOP_BACKGROUND();
            audioPlayerCallback.stop();
        }
        seek(position: number) {
            if (!BackgroundAudioManagerImpl.audioPlayer) {
                return;
            }
            const state = BackgroundAudioManagerImpl.audioPlayer.state;
            if (![
                STATE_TYPE1.PAUSED,
                STATE_TYPE1.PLAYING
            ].includes(state)) {
                return;
            }
            BackgroundAudioManagerImpl.audioPlayer.seek(position * 1000);
        }
        onCanplay(callback: (result: Object) => void): void {
            audioPlayerCallback.onCanplay(callback);
        }
        onPlay(callback: (result: Object) => void): void {
            audioPlayerCallback.onPlay(callback);
        }
        onPause(callback: (result: Object) => void): void {
            audioPlayerCallback.onPause(callback);
        }
        onStop(callback: (result: Object) => void): void {
            audioPlayerCallback.onStop(callback);
        }
        onEnded(callback: (result: Object) => void): void {
            audioPlayerCallback.onEnded(callback);
        }
        onTimeUpdate(callback: (result: Object) => void): void {
            audioPlayerCallback.onTimeUpdate(callback);
        }
        onError(callback: (result: Object) => void): void {
            audioPlayerCallback.onError(callback);
        }
        onWaiting(callback: (result: Object) => void): void {
            audioPlayerCallback.onWaiting(callback);
        }
        offCanplay(callback: (result: Object) => void): void {
            audioPlayerCallback.offCanplay(callback);
        }
        offPlay(callback: (result: Object) => void): void {
            audioPlayerCallback.offPlay(callback);
        }
        offPause(callback: (result: Object) => void): void {
            audioPlayerCallback.offPause(callback);
        }
        offStop(callback: (result: Object) => void): void {
            audioPlayerCallback.offStop(callback);
        }
        offEnded(callback: (result: Object) => void): void {
            audioPlayerCallback.offEnded(callback);
        }
        offTimeUpdate(callback: (result: Object) => void): void {
            audioPlayerCallback.offTimeUpdate(callback);
        }
        offError(callback: (result: Object) => void): void {
            audioPlayerCallback.offError(callback);
        }
        offWaiting(callback: (result: Object) => void): void {
            audioPlayerCallback.offWaiting(callback);
        }
        onPrev(callback: (result: Object) => void): void {
            throw new Error('Method not implemented.');
        }
        onNext(callback: (result: Object) => void): void {
            throw new Error('Method not implemented.');
        }
    }
    let backgroundAudioManager: BackgroundAudioManager | null = null;
    const getBackgroundAudioManager: GetBackgroundAudioManager = defineSyncApi<BackgroundAudioManager>(API_GET_BACKGROUND_AUDIO_MANAGER, ()=>{
        if (!backgroundAudioManager) backgroundAudioManager = new BackgroundAudioManagerImpl();
        return backgroundAudioManager;
    }) as GetBackgroundAudioManager;
    const API_GET_DEVICE_INFO = 'getDeviceInfo';
    const parseDeviceType = (deviceType: string): 'phone' | 'pad' | 'tv' | 'watch' | 'pc' | 'unknown' | 'car' | 'vr' | 'appliance' =>{
        switch(deviceType){
            case 'phone':
                return 'phone';
            case 'wearable':
                return 'watch';
            case 'tablet':
                return 'pad';
            case '2in1':
                return 'pc';
            case 'tv':
                return 'tv';
            case 'car':
                return 'car';
            case 'smartVision':
                return 'vr';
            default:
                return 'unknown';
        }
    };
    const getDeviceInfo: GetDeviceInfo = defineSyncApi<GetDeviceInfoResult>(API_GET_DEVICE_INFO, (): GetDeviceInfoResult =>{
        return {
            deviceBrand: deviceInfo.brand.toLowerCase(),
            deviceId: getDeviceId(),
            deviceModel: deviceInfo.productModel,
            deviceOrientation: 'portrait',
            devicePixelRatio: vp2px(1),
            deviceType: parseDeviceType(deviceInfo.deviceType),
            osLanguage: I18n1.System.getSystemLanguage(),
            osTheme: UTSHarmony4.getOsTheme() as string,
            osVersion: deviceInfo.majorVersion + '.' + deviceInfo.seniorVersion + '.' + deviceInfo.featureVersion + '.' + deviceInfo.buildVersion,
            osName: 'harmonyos',
            platform: 'harmonyos',
            romName: deviceInfo.distributionOSName,
            romVersion: deviceInfo.distributionOSVersion,
            system: deviceInfo.osFullName
        } as GetDeviceInfoResult;
    }) as GetDeviceInfo;
    const API_GET_NETWORK_TYPE = 'getNetworkType';
    const PERMISSIONS1 = [
        'ohos.permission.GET_NETWORK_INFO'
    ];
    enum NetworkinfoType {
        UNKNOW = 0,
        NONE = 1,
        ETHERNET = 2,
        WIFI = 3,
        "2G" = 4,
        "3G" = 5,
        "4G" = 6,
        "5G" = 7
    }
    const signalType = (resultObj: radio.NetworkType)=>{
        switch(resultObj){
            case radio.NetworkType.NETWORK_TYPE_GSM:
            case radio.NetworkType.NETWORK_TYPE_CDMA:
                return NetworkinfoType['2G'];
            case radio.NetworkType.NETWORK_TYPE_WCDMA:
            case radio.NetworkType.NETWORK_TYPE_TDSCDMA:
                return NetworkinfoType['3G'];
            case radio.NetworkType.NETWORK_TYPE_LTE:
                return NetworkinfoType['4G'];
            case radio.NetworkType.NETWORK_TYPE_NR:
                return NetworkinfoType['5G'];
            case radio.NetworkType.NETWORK_TYPE_UNKNOWN:
                return NetworkinfoType.UNKNOW;
            default:
                return NetworkinfoType.NONE;
        }
    };
    const networkGetType = ()=>{
        return new Promise<number>((resolve, reject)=>{
            UTSHarmony5.requestSystemPermission(PERMISSIONS1, (allRight: boolean)=>{
                if (allRight) {
                    try {
                        radio.getPrimarySlotId().then((slotId: number)=>radio.getSignalInformationSync(slotId)).then((signalInformation: Array<radio.SignalInformation>)=>{
                            const data = signalInformation[0];
                            if (data && data.signalType) {
                                resolve(signalType(data.signalType));
                            } else {
                                resolve(NetworkinfoType.NONE);
                            }
                        });
                    } catch (error) {
                        reject(error as BusinessError3);
                    }
                } else {
                    reject('permission denied');
                }
            }, ()=>reject('permission denied'));
        });
    };
    class GlobalContext {
        netList: connection.NetHandle[] = [];
        netHandle: connection.NetHandle | null = null;
        private constructor(){}
        private static instance: GlobalContext;
        public static getContext(): GlobalContext {
            if (!GlobalContext.instance) {
                GlobalContext.instance = new GlobalContext();
            }
            return GlobalContext.instance;
        }
    }
    const getCurrentType = ()=>{
        return new Promise<number>((resolve, reject)=>{
            UTSHarmony5.requestSystemPermission(PERMISSIONS1, (allRight: boolean)=>{
                if (allRight) {
                    try {
                        connection.getDefaultNet().then((data: connection.NetHandle)=>{
                            if (data) {
                                GlobalContext.getContext().netHandle = data;
                                connection.getNetCapabilities(GlobalContext.getContext().netHandle!).then((data: connection.NetCapabilities)=>{
                                    const bearerTypes: Set<number> = new Set(data.bearerTypes);
                                    const bearerTypesNum = Array.from(bearerTypes.values());
                                    for (const item of bearerTypesNum){
                                        if (item == connection.NetBearType.BEARER_CELLULAR) {
                                            networkGetType().then(resolve).catch(reject);
                                        } else if (item == connection.NetBearType.BEARER_WIFI) {
                                            resolve(NetworkinfoType.WIFI);
                                        } else if (item == connection.NetBearType.BEARER_ETHERNET) {
                                            resolve(NetworkinfoType.ETHERNET);
                                        } else {
                                            resolve(NetworkinfoType.UNKNOW);
                                        }
                                    }
                                }).catch((err: BusinessError3)=>{
                                    reject(err);
                                });
                            }
                        });
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    reject('permission denied');
                }
            });
        });
    };
    class Network {
        static netConnection: connection.NetConnection | null = null;
        constructor(){
            Network.netConnection = connection.createNetConnection();
        }
        static ohoSubscribe() {
            if (!Network.netConnection) {
                Network.netConnection = connection.createNetConnection();
            }
            UTSHarmony5.requestSystemPermission(PERMISSIONS1, (allRight: boolean)=>{
                if (allRight && Network.netConnection) {
                    Network.netConnection.register((err: BusinessError3)=>{});
                    Network.netConnection.on('netCapabilitiesChange', (capability: connection.NetCapabilityInfo)=>{
                        const NetBearType = capability?.netCap?.bearerTypes[0];
                        let networkType = '';
                        switch(NetBearType){
                            case connection.NetBearType.BEARER_CELLULAR:
                                getCurrentType().then((type: number)=>{
                                    invokeOnNetworkStatusChange(NetworkinfoType[type]);
                                }).catch(()=>{
                                    invokeOnNetworkStatusChange(NetworkinfoType[1]);
                                });
                                return;
                            case connection.NetBearType.BEARER_WIFI:
                                networkType = NetworkinfoType[3];
                                break;
                            case connection.NetBearType.BEARER_ETHERNET:
                                networkType = NetworkinfoType[2];
                                break;
                            default:
                                networkType = NetworkinfoType[1];
                        }
                        invokeOnNetworkStatusChange(networkType);
                    });
                    Network.netConnection.on('netLost', (netLost: connection.NetHandle)=>{
                        invokeOnNetworkStatusChange(NetworkinfoType[1]);
                    });
                }
            });
        }
    }
    new Network();
    onNativePageReady().then(()=>{
        Network.ohoSubscribe();
    });
    const getNetworkType: GetNetworkType = defineAsyncApi<GetNetworkTypeOptions, GetNetworkTypeSuccess>(API_GET_NETWORK_TYPE, (options: GetNetworkTypeOptions, res: ApiExecutor<GetNetworkTypeSuccess>)=>{
        getCurrentType().then((type: number)=>{
            res.resolve({
                networkType: NetworkinfoType[type].toLocaleLowerCase()
            } as GetNetworkTypeSuccess);
        }).catch((err: BusinessError3)=>{
            res.reject(err.message);
        });
    }) as GetNetworkType;
    const invokeOnNetworkStatusChange = (networkType: string)=>{
        UniGetNetworkTypeEventEmitter.emit('networkStatusChange', {
            isConnected: networkType !== NetworkinfoType[1],
            networkType: networkType.toLocaleLowerCase()
        } as OnNetworkStatusChangeCallbackResult);
    };
    const UniGetNetworkTypeEventEmitter = new Emitter1() as IUniGetNetworkTypeEventEmitter;
    const onNetworkStatusChange: OnNetworkStatusChange = (callback: Function)=>{
        UniGetNetworkTypeEventEmitter.on('networkStatusChange', callback);
    };
    const offNetworkStatusChange: OffNetworkStatusChange = (callback: Function)=>{
        UniGetNetworkTypeEventEmitter.off('networkStatusChange', callback);
    };
    const API_GET_PROVIDER = 'getProvider';
    const API_GET_PROVIDER_SYNC = 'getProviderSync';
    const SupportedProviderServiceList = [
        'oauth',
        'share',
        'payment',
        'push',
        'location'
    ];
    const _getProviderSync = (options: GetProviderOptions)=>{
        if (!SupportedProviderServiceList.includes(options.service)) {
            return 'Parameter service invalid.';
        }
        const providers = getUniProviders(options.service);
        const providerIds = providers.map((provider): string =>{
            return provider.id;
        });
        const result: GetProviderSuccess = {
            service: options.service,
            provider: providerIds,
            providers
        };
        return result;
    };
    const getProvider: GetProvider = defineAsyncApi<GetProviderOptions, GetProviderSuccess>(API_GET_PROVIDER, (options: GetProviderOptions, exec: ApiExecutor<GetProviderSuccess>): void =>{
        const res = _getProviderSync(options);
        if (typeof res === 'string') exec.reject(res);
        else exec.resolve(res);
    }) as GetProvider;
    const getProviderSync: GetProviderSync = defineSyncApi<GetProviderSyncSuccess>(API_GET_PROVIDER_SYNC, (options: GetProviderSyncOptions): GetProviderSyncSuccess =>{
        const res = _getProviderSync(options as GetProviderOptions);
        if (typeof res === 'string') throw new Error(res);
        return {
            service: res.service,
            providerIds: res.provider,
            providerObjects: res.providers
        } as GetProviderSyncSuccess;
    }) as GetProviderSync;
    const API_GET_RECORDER_MANAGER = 'getRecorderManager';
    const callbacks: Callbacks = {
        pause: [],
        resume: [],
        start: [],
        stop: [],
        error: [],
        frameRecorded: [],
        interruptionBegin: [],
        interruptionEnd: []
    };
    const setRecordStateCallback = (state: RecorderState, cb: Function)=>{
        switch(state){
            case 'pause':
                callbacks.pause.push(cb);
                break;
            case 'resume':
                callbacks.resume.push(cb);
                break;
            case 'start':
                callbacks.start.push(cb);
                break;
            case 'stop':
                callbacks.stop.push(cb);
                break;
            case 'error':
                callbacks.error.push(cb);
                break;
            case 'frameRecorded':
                callbacks.frameRecorded.push(cb);
                break;
            case 'interruptionBegin':
                callbacks.interruptionBegin.push(cb);
                break;
            case 'interruptionEnd':
                callbacks.interruptionEnd.push(cb);
                break;
        }
    };
    const onRecorderStateChange = (state: RecorderState, res: StateChangeRes | null = null)=>{
        const cbs: Function[] = (()=>{
            switch(state){
                case 'pause':
                    return callbacks.pause;
                case 'resume':
                    return callbacks.resume;
                case 'start':
                    return callbacks.start;
                case 'stop':
                    return callbacks.stop;
                case 'error':
                    return callbacks.error;
                case 'frameRecorded':
                    return callbacks.frameRecorded;
                case 'interruptionBegin':
                    return callbacks.interruptionBegin;
                case 'interruptionEnd':
                    return callbacks.interruptionEnd;
                default:
                    return [];
            }
        })();
        cbs.forEach((fn)=>{
            if (typeof fn === 'function') {
                fn(res);
            }
        });
    };
    const createFile = (supportFormats: string[], format: string, defaultExt: string)=>{
        const TEMP_PATH = getEnv1().TEMP_PATH as string;
        const filePath = `${TEMP_PATH}/recorder/`;
        if (!fileIo2.accessSync(filePath)) {
            fileIo2.mkdirSync(filePath, true);
        }
        const fileName = `${Date.now()}.${supportFormats.includes(format ?? '') ? format?.toLocaleLowerCase() : defaultExt}`;
        const file: fileIo2.File = fileIo2.openSync(`${filePath}${fileName}`, fileIo2.OpenMode.READ_WRITE | fileIo2.OpenMode.CREATE);
        return file;
    };
    const permissionDenied = ()=>{
        throw new Error('Permission MICROPHONE denied');
    };
    const supportFormats = [
        'aac'
    ];
    class AVRecorder implements RecorderManager {
        private avRecorder?: media2.AVRecorder;
        private isFirstStart: boolean = true;
        constructor(){}
        private onStateChange(file: fileIo3.File) {
            if (this.avRecorder) {
                this.avRecorder.on('stateChange', async (state, reason)=>{
                    switch(state){
                        case 'idle':
                            this.isFirstStart = true;
                            break;
                        case 'started':
                            if (this.isFirstStart) {
                                this.isFirstStart = false;
                                onRecorderStateChange('start');
                            } else {
                                if (reason === media2.StateChangeReason.BACKGROUND) {
                                    onRecorderStateChange('interruptionEnd');
                                }
                                onRecorderStateChange('resume');
                            }
                            break;
                        case 'paused':
                            if (reason === media2.StateChangeReason.BACKGROUND) {
                                onRecorderStateChange('interruptionBegin');
                            }
                            onRecorderStateChange('pause');
                            break;
                        case 'stopped':
                            onRecorderStateChange('stop', {
                                tempFilePath: file.path
                            } as StateChangeRes);
                            fileIo3.closeSync(file);
                            break;
                    }
                });
                this.avRecorder.on('error', (err: BusinessError4)=>{
                    onRecorderStateChange('error', {
                        errMsg: `${err.message} ${err.code}`
                    } as StateChangeRes);
                });
            }
        }
        private async release() {
            if (this.avRecorder !== undefined) {
                await this.avRecorder.reset();
                await this.avRecorder.release();
                this.avRecorder = undefined;
            }
        }
        async start(options: RecorderManagerStartOptions): Promise<void> {
            if (this.avRecorder !== undefined) {
                await this.release();
            }
            this.avRecorder = await media2.createAVRecorder();
            const _options_sampleRate = options.sampleRate, sampleRate = _options_sampleRate == null ? 48000 : _options_sampleRate, _options_numberOfChannels = options.numberOfChannels, numberOfChannels = _options_numberOfChannels == null ? 2 : _options_numberOfChannels, _options_encodeBitRate = options.encodeBitRate, encodeBitRate = _options_encodeBitRate == null ? 48000 : _options_encodeBitRate, _options_duration = options.duration, duration = _options_duration == null ? null : _options_duration;
            const file = createFile(supportFormats, options.format ?? '', 'aac');
            this.onStateChange(file);
            const audioProfile: media2.AVRecorderProfile = {
                audioBitrate: encodeBitRate!,
                audioChannels: numberOfChannels!,
                audioCodec: media2.CodecMimeType.AUDIO_AAC,
                audioSampleRate: sampleRate!,
                fileFormat: media2.ContainerFormatType.CFT_MPEG_4A
            };
            const audioConfig: media2.AVRecorderConfig = {
                audioSourceType: media2.AudioSourceType.AUDIO_SOURCE_TYPE_MIC,
                profile: audioProfile,
                url: 'fd://' + file.fd
            };
            UTSHarmony6.requestSystemPermission([
                'ohos.permission.MICROPHONE'
            ], async (allRight: boolean)=>{
                if (allRight) {
                    await this.avRecorder?.prepare(audioConfig);
                    await this.avRecorder?.start();
                    if (duration) {
                        setTimeout(async ()=>{
                            await this.avRecorder?.stop();
                        }, duration);
                    }
                } else {
                    permissionDenied();
                }
            }, permissionDenied);
        }
        async pause(): Promise<void> {
            if (this.avRecorder !== undefined && this.avRecorder.state === 'started') {
                await this.avRecorder.pause();
            }
        }
        async resume(): Promise<void> {
            if (this.avRecorder !== undefined && this.avRecorder.state === 'paused') {
                await this.avRecorder.resume();
            }
        }
        async stop(): Promise<void> {
            if (this.avRecorder !== undefined && (this.avRecorder.state === 'started' || this.avRecorder.state === 'paused')) {
                await this.avRecorder.stop();
                await this.release();
                this.isFirstStart = true;
            }
        }
        onStart(options: (result: Object) => void): void {
            setRecordStateCallback('start', options);
        }
        onPause(options: (result: Object) => void): void {
            setRecordStateCallback('pause', options);
        }
        onStop(options: (result: RecorderManagerOnStopResult) => void): void {
            setRecordStateCallback('stop', options);
        }
        onFrameRecorded(options: (result: Object) => void): void {
            setRecordStateCallback('frameRecorded', options);
        }
        onError(options: (result: Object) => void): void {
            setRecordStateCallback('error', options);
        }
        onResume(options: (result: Object) => void): void {
            setRecordStateCallback('resume', options);
        }
        onInterruptionBegin(options: (result: Object) => void): void {
            setRecordStateCallback('interruptionBegin', options);
        }
        onInterruptionEnd(options: (result: Object) => void): void {
            setRecordStateCallback('interruptionEnd', options);
        }
    }
    let RECORDER_MANAGER: RecorderManager | null = null;
    class RecorderManagerImpl implements RecorderManager {
        start(options: RecorderManagerStartOptions): void {
            if (!options.format) options.format = 'aac';
            const DEFAULT_DURATION = 1000 * 60;
            const MAX_DURATION = DEFAULT_DURATION * 10;
            if (typeof options.duration === 'undefined' || options.duration === null) {
                options.duration = DEFAULT_DURATION;
            }
            if (options.duration > MAX_DURATION) {
                options.duration = MAX_DURATION;
            }
            if (supportFormats.includes(options.format ?? '')) {
                RECORDER_MANAGER = new AVRecorder();
            }
            if (RECORDER_MANAGER) {
                RECORDER_MANAGER.start(options);
            } else {
                onRecorderStateChange('error', {
                    errMsg: `format not supported. Only supported ${supportFormats.join(',')}`
                } as StateChangeRes);
            }
        }
        pause(): void {
            if (RECORDER_MANAGER) RECORDER_MANAGER.pause();
        }
        resume(): void {
            if (RECORDER_MANAGER) RECORDER_MANAGER.resume();
        }
        async stop() {
            if (RECORDER_MANAGER) {
                try {
                    await RECORDER_MANAGER.stop();
                } catch (error) {}
                RECORDER_MANAGER = null;
            }
        }
        onStart(options: (result: Object) => void): void {
            setRecordStateCallback('start', options);
        }
        onPause(options: (result: Object) => void): void {
            setRecordStateCallback('pause', options);
        }
        onStop(options: (result: RecorderManagerOnStopResult) => void): void {
            setRecordStateCallback('stop', options);
        }
        onFrameRecorded(options: (result: Object) => void): void {
            setRecordStateCallback('frameRecorded', options);
        }
        onError(options: (result: Object) => void): void {
            setRecordStateCallback('error', options);
        }
        onResume(options: (result: Object) => void): void {
            setRecordStateCallback('resume', options);
        }
        onInterruptionBegin(options: (result: Object) => void): void {
            setRecordStateCallback('interruptionBegin', options);
        }
        onInterruptionEnd(options: (result: Object) => void): void {
            setRecordStateCallback('interruptionEnd', options);
        }
    }
    let recorderManager: RecorderManager | null = null;
    const getRecorderManager: GetRecorderManager = defineSyncApi<RecorderManager>(API_GET_RECORDER_MANAGER, (): RecorderManager =>{
        if (recorderManager) return recorderManager;
        else recorderManager = new RecorderManagerImpl();
        return recorderManager;
    }) as GetRecorderManager;
    const API_GET_SYSTEM_INFO = 'getSystemInfo';
    const API_GET_SYSTEM_INFO_SYNC = 'getSystemInfoSync';
    const API_GET_WINDOW_INFO = 'getWindowInfo';
    const parseDeviceType1 = (deviceType: string): 'phone' | 'pad' | 'tv' | 'watch' | 'pc' | 'unknown' | 'car' | 'vr' | 'appliance' =>{
        switch(deviceType){
            case 'phone':
                return 'phone';
            case 'wearable':
                return 'watch';
            case 'tablet':
                return 'pad';
            case '2in1':
                return 'pc';
            case 'tv':
                return 'tv';
            case 'car':
                return 'car';
            case 'smartVision':
                return 'vr';
            default:
                return 'unknown';
        }
    };
    const getWindowInfo: GetWindowInfo = defineSyncApi<GetWindowInfoResult>(API_GET_WINDOW_INFO, (): GetWindowInfoResult =>{
        return internalGetWindowInfo() as GetWindowInfoResult;
    }) as GetWindowInfo;
    const internalGetSystemInfo = (): GetSystemInfoResult =>{
        const appVersion: ISystemInfoAppVersion = UTSHarmony7.getAppVersion();
        const appLanguage = I18n2.System.getAppPreferredLanguage();
        const uniCompilerVersion: string = UTSHarmony7.getUniCompilerVersion();
        const uniCompilerVersionCode: number = parseFloat(uniCompilerVersion);
        const uniRuntimeVersion: string = UTSHarmony7.getUniRuntimeVersion();
        const windowInfo = internalGetWindowInfo() as GetWindowInfoResult;
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
            appId: UTSHarmony7.getAppId() as string,
            appLanguage,
            appName: UTSHarmony7.getAppName() as string,
            appTheme: UTSHarmony7.getAppTheme() as string,
            appVersion: appVersion.name,
            appVersionCode: appVersion.code,
            appWgtVersion: appVersion.name,
            uniCompilerVersion: uniCompilerVersion,
            uniCompilerVersionCode: uniCompilerVersionCode,
            uniRuntimeVersion: uniRuntimeVersion,
            uniRuntimeVersionCode: parseFloat(uniRuntimeVersion),
            uniPlatform: 'app',
            deviceBrand: deviceInfo1.brand.toLowerCase(),
            deviceId: getDeviceId1(),
            deviceModel: deviceInfo1.productModel,
            deviceOrientation: 'portrait',
            devicePixelRatio: vp2px(1),
            deviceType: parseDeviceType1(deviceInfo1.deviceType),
            osLanguage: I18n2.System.getSystemLanguage(),
            osTheme: UTSHarmony7.getOsTheme() as string,
            osVersion: deviceInfo1.majorVersion + '.' + deviceInfo1.seniorVersion + '.' + deviceInfo1.featureVersion + '.' + deviceInfo1.buildVersion,
            osName: 'harmonyos',
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
            platform: 'harmonyos',
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
    const getSystemSetting: GetSystemSetting = defineSyncApi<GetSystemSettingResult>('getSystemSetting', (): GetSystemSettingResult =>{
        const defaultDisplay = display.getDefaultDisplaySync();
        const res: GetSystemSettingResult = {
            bluetoothEnabled: false,
            bluetoothError: null,
            locationEnabled: false,
            wifiEnabled: false,
            wifiError: null,
            deviceOrientation: (defaultDisplay.orientation === display.Orientation.PORTRAIT || defaultDisplay.orientation === display.Orientation.PORTRAIT_INVERTED) ? 'portrait' : 'landscape'
        };
        try {
            if (access.getState() === access.BluetoothState.STATE_ON) res.bluetoothEnabled = true;
        } catch (err) {
            res.bluetoothError = (err as BusinessError5).message;
        }
        try {
            res.locationEnabled = geoLocationManager.isLocationEnabled();
        } catch (err) {}
        try {
            res.wifiEnabled = wifiManager.isWifiActive();
        } catch (err) {
            res.wifiError = (err as BusinessError5).message;
        }
        return res;
    }) as GetSystemSetting;
    const API_HIDE_KEYBOARD = 'hideKeyboard';
    const hideKeyboard: HideKeyboard = defineAsyncApi<HideKeyboardOptions, HideKeyboardSuccess>(API_HIDE_KEYBOARD, (options: HideKeyboardOptions, exec: ApiExecutor<HideKeyboardSuccess>)=>{
        inputMethod.getController().hideTextInput().then(()=>{
            exec.resolve();
        }, (err: Error)=>{
            exec.reject(err.message);
        });
    }) as HideKeyboard;
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
    const dial = (number: string, confirm = true)=>{
        if (!confirm && typeof call.dial === 'function') {
            return new Promise<void>((resolve, reject)=>{
                UTSHarmony8.requestSystemPermission([
                    'ohos.permission.PLACE_CALL'
                ], (allRight: boolean)=>{
                    if (allRight) {
                        call.dial(number).then(()=>{
                            resolve();
                        }).catch(reject);
                    } else {
                        reject('permission denied');
                    }
                }, ()=>{
                    reject('permission denied');
                });
            });
        } else {
            return call.makeCall(number);
        }
    };
    const makePhoneCall: MakePhoneCall = defineAsyncApi<MakePhoneCallOptions, MakePhoneCallSuccess>(API_MAKE_PHONE_CALL, (options: MakePhoneCallOptions, res: ApiExecutor<MakePhoneCallSuccess>)=>{
        const dialRes = dial(options.phoneNumber) as Object as Promise<void>;
        if (isPromise(dialRes)) {
            dialRes.then(res.resolve).catch((err: BusinessError6<void>)=>{
                res.reject(err.message);
            });
        } else {
            res.resolve();
        }
    }, MakePhoneCallProtocol) as MakePhoneCall;
    const _getVideoInfo = async (uri: string): Promise<GetVideoInfoSuccess> =>{
        const file = await fs1.open(uri, fs1.OpenMode.READ_ONLY);
        const avMetadataExtractor = await media3.createAVMetadataExtractor();
        let metadata: media3.AVMetadata | null = null;
        let size: number = 0;
        try {
            size = (await fs1.stat(file.fd)).size;
            avMetadataExtractor.dataSrc = {
                fileSize: size,
                callback: (buffer: ArrayBuffer, length: number, pos: number | null = null)=>{
                    return fs1.readSync(file.fd, buffer, {
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
            await fs1.close(file);
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
        const file = await fs1.open(uri, fs1.OpenMode.READ_ONLY);
        const imageSource = image.createImageSource(file.fd);
        const imageInfo = await imageSource.getImageInfo();
        let orientation: string = '';
        try {
            orientation = await imageSource.getImageProperty(image.PropertyKey.ORIENTATION);
        } catch (error) {}
        await imageSource.release();
        await fs1.close(file.fd);
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
    const _chooseMedia = async (options: _ChooseMediaOptions): Promise<chooseMediaSuccessCallbackResult> =>{
        const photoSelectOptions = new photoAccessHelper.PhotoSelectOptions();
        const mimeType = options.mimeType;
        photoSelectOptions.MIMEType = mimeType;
        photoSelectOptions.maxSelectNumber = options.count || 9;
        photoSelectOptions.isPhotoTakingSupported = !(options.sourceType && !options.sourceType.includes('camera'));
        const photoPicker = new photoAccessHelper.PhotoViewPicker();
        const photoSelectResult = await photoPicker.select(photoSelectOptions);
        const uris = photoSelectResult.photoUris;
        if (mimeType !== photoAccessHelper.PhotoViewMIMETypes.VIDEO_TYPE) {
            return {
                tempFiles: uris.map((uri)=>{
                    const file = fs1.openSync(uri, fs1.OpenMode.READ_ONLY);
                    const stat = fs1.statSync(file.fd);
                    fs1.closeSync(file);
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
                    params.src = getRealPath1(src);
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
                    params.src = getRealPath1(src);
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
                    params.urls = urls.map((url)=>getRealPath1(url) as string);
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
    const CompressImageApiOptions: ApiOptions<CompressImageOptions> = {
        formatArgs: new Map<string, Function>([
            [
                'src',
                (src: string, params: CompressImageOptions)=>{
                    if (src) params.src = getRealPath1(src);
                }
            ],
            [
                'quality',
                (quality: number, params: CompressImageOptions)=>{
                    if (quality == null) {
                        params.quality = 80;
                    }
                }
            ]
        ])
    };
    const CompressImageApiProtocol = new Map<string, ProtocolOptions>([
        [
            'src',
            {
                type: 'string',
                required: true
            }
        ],
        [
            'quality',
            {
                type: 'number'
            }
        ],
        [
            'compressedWidth',
            {
                type: 'number'
            }
        ],
        [
            'compressedHeight',
            {
                type: 'number'
            }
        ]
    ]);
    const API_CHOOSE_FILE = 'chooseFile';
    const CHOOSE_MEDIA_TYPE: string[] = [
        'all',
        'image',
        'video'
    ];
    const CHOOSE_FILE_SOURCE_TYPE: string[] = [
        'album',
        'camera'
    ];
    const ChooseFileApiOptions: ApiOptions<ChooseFileOptions> = {
        formatArgs: new Map<string, Function>([
            [
                'count',
                (count: number, params: ChooseFileOptions)=>{
                    if (!count || count <= 0) {
                        params.count = 100;
                    }
                    return undefined;
                }
            ],
            [
                'sourceType',
                (sourceType: string[] = [], params: ChooseFileOptions)=>{
                    sourceType = sourceType.filter((type)=>CHOOSE_FILE_SOURCE_TYPE.includes(type));
                    if (!sourceType.length) {
                        params.sourceType = [
                            'album',
                            'camera'
                        ];
                    }
                    return undefined;
                }
            ],
            [
                'type',
                (type: string = 'all', params: ChooseFileOptions)=>{
                    if (!CHOOSE_MEDIA_TYPE.includes(type)) {
                        params.type = 'all';
                    }
                    return undefined;
                }
            ],
            [
                'extension',
                (extension: string[], params: ChooseFileOptions)=>{
                    if (extension instanceof Array && extension.length === 0) {
                        return 'param extension should not be empty.';
                    }
                    if (!extension) params.extension = [
                        ''
                    ];
                    return undefined;
                }
            ]
        ])
    };
    const ChooseFileApiProtocol = new Map<string, ProtocolOptions>([
        [
            'count',
            {
                type: 'number'
            }
        ],
        [
            'sourceType',
            {
                type: 'array'
            }
        ],
        [
            'type',
            {
                'type': 'string'
            }
        ],
        [
            'extension',
            {
                type: 'array'
            }
        ]
    ]);
    const API_CHOOSE_MEDIA = 'chooseMedia';
    const ChooseMediaApiProtocol = new Map<string, ProtocolOptions>([
        [
            'count',
            {
                type: 'number',
                required: false
            }
        ],
        [
            'mediaType',
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
        ]
    ]);
    const ChooseMediaApiOptions: ApiOptions<ChooseMediaOptions> = {
        formatArgs: new Map<string, Function>([
            [
                'count',
                (count: number, params: ChooseMediaOptions)=>{
                    if (count == null) {
                        params.count = 9;
                    }
                    if (params.count != null && params.count > 9) {
                        params.count = 9;
                    }
                }
            ],
            [
                'mediaType',
                (mediaType: string[], params: ChooseMediaOptions)=>{
                    if (mediaType == null) {
                        params.mediaType = [
                            'image',
                            'video'
                        ];
                    }
                }
            ],
            [
                'sourceType',
                (sourceType: string[], params: ChooseMediaOptions)=>{
                    if (sourceType == null) {
                        params.sourceType = [
                            'album',
                            'camera'
                        ];
                    }
                }
            ],
            [
                'sizeType',
                (sizeType: string[], params: ChooseMediaOptions)=>{
                    if (sizeType == null) {
                        params.sizeType = [
                            'original',
                            'compressed'
                        ];
                    }
                }
            ],
            [
                'maxDuration',
                (maxDuration: number, params: ChooseMediaOptions)=>{
                    if (maxDuration == null) {
                        params.maxDuration = 10;
                    }
                }
            ],
            [
                'camera',
                (camera: string, params: ChooseMediaOptions)=>{
                    if (camera == null) {
                        params.camera = 'back';
                    }
                }
            ]
        ])
    };
    const API_COMPRESS_VIDEO = 'compressVideo';
    const CompressVideoApiOptions: ApiOptions<CompressVideoOptions> = {
        formatArgs: new Map<string, Function>([
            [
                'src',
                (src: string, params: CompressVideoOptions)=>{
                    if (src) params.src = getRealPath1(src);
                }
            ]
        ])
    };
    const CompressVideoApiProtocol = new Map<string, ProtocolOptions>([
        [
            'src',
            {
                type: 'string',
                required: true
            }
        ],
        [
            'quality',
            {
                type: 'string'
            }
        ],
        [
            'bitrate',
            {
                type: 'number'
            }
        ],
        [
            'fps',
            {
                type: 'number'
            }
        ],
        [
            'resolution',
            {
                type: 'number'
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
    const getHMCameraPosition = (cameraType: CameraPosition)=>{
        switch(cameraType){
            case 'back':
                return camera.CameraPosition.CAMERA_POSITION_BACK;
            case 'front':
                return camera.CameraPosition.CAMERA_POSITION_FRONT;
            default:
                return camera.CameraPosition.CAMERA_POSITION_BACK;
        }
    };
    const takePhoto = async (cameraType: CameraPosition = 'back')=>{
        let pickerProfile: cameraPicker.PickerProfile = {
            cameraPosition: getHMCameraPosition(cameraType)
        };
        const res = await cameraPicker.pick(getAbilityContext1()!, [
            cameraPicker.PickerMediaType.PHOTO
        ], pickerProfile);
        const file = fs2.openSync(res.resultUri, fs2.OpenMode.READ_ONLY);
        const stat = fs2.statSync(file.fd);
        return {
            tempFiles: [
                {
                    tempFilePath: res.resultUri,
                    size: stat.size
                }
            ]
        } as TakePhotoRes;
    };
    const takeVideo = async (args: TakeVideoOptions | null = null)=>{
        let pickerProfile: cameraPicker.PickerProfile = {
            cameraPosition: getHMCameraPosition(args?.cameraType ?? 'back'),
            videoDuration: args?.videoDuration
        };
        const res = await cameraPicker.pick(getAbilityContext1()!, [
            cameraPicker.PickerMediaType.VIDEO
        ], pickerProfile);
        return _getVideoInfo(res.resultUri).then((getVideInfoRes)=>{
            return {
                path: res.resultUri,
                size: getVideInfoRes.size,
                duration: getVideInfoRes.duration!,
                width: getVideInfoRes.width!,
                height: getVideInfoRes.height!,
                type: getVideInfoRes.type!,
                orientation: getVideInfoRes.orientation!
            } as TakeVideoRes;
        });
    };
    const errSubject = 'uni-chooseImage';
    const _chooseImage = (options: ChooseImageOptions, res: ApiExecutor<ChooseImageSuccess>)=>{
        _chooseMedia({
            mimeType: photoAccessHelper1.PhotoViewMIMETypes.IMAGE_TYPE,
            sourceType: [
                "album"
            ],
            count: options.count!
        } as _ChooseMediaOptions).then((chooseMediaRes)=>{
            const tempFiles = chooseMediaRes.tempFiles;
            if (tempFiles.length === 0) {
                const errMsg = MediaUniErrors.get(1101001) as string;
                res.reject(errMsg, {
                    errCode: 1101001
                } as ApiError);
                return;
            }
            res.resolve({
                errMsg: '',
                errSubject,
                tempFilePaths: chooseMediaRes.tempFiles.map((file)=>file.tempFilePath),
                tempFiles: chooseMediaRes.tempFiles.map((file)=>{
                    return {
                        path: file.tempFilePath,
                        size: file.size
                    } as ChooseImageTempFile;
                })
            } as ChooseImageSuccess);
        }, (err: Error)=>{
            res.reject(err.message);
        });
    };
    const _takePhoto = (options: ChooseImageOptions, res: ApiExecutor<ChooseImageSuccess>)=>{
        takePhoto().then((photo)=>{
            res.resolve({
                errMsg: '',
                errSubject,
                tempFilePaths: photo.tempFiles.map((file)=>file.tempFilePath),
                tempFiles: photo.tempFiles.map((tempFile): ChooseImageTempFile =>({
                        path: tempFile.tempFilePath,
                        size: tempFile.size
                    } as ChooseImageTempFile))
            } as ChooseImageSuccess);
        }).catch((err: Error)=>{
            res.reject(err.message);
        });
    };
    const chooseImage: ChooseImage = defineAsyncApi<ChooseImageOptions, ChooseImageSuccess>(API_CHOOSE_IMAGE, async (options: ChooseImageOptions, res: ApiExecutor<ChooseImageSuccess>)=>{
        if (options.sourceType?.length === 1 && options.sourceType[0] === 'camera') {
            _takePhoto(options, res);
        } else if (options.sourceType?.length === 1 && options.sourceType[0] === 'album') {
            _chooseImage(options, res);
        } else {
            const lastWindow = getCurrentWindow() as window.Window;
            const UIContextPromptAction = await lastWindow.getUIContext().getPromptAction();
            UIContextPromptAction.showActionMenu({
                buttons: [
                    {
                        text: '拍照',
                        color: '#000000'
                    },
                    {
                        text: '从相册选择',
                        color: '#000000'
                    }
                ]
            } as promptAction1.ActionMenuOptions, (err, ref)=>{
                let index = ref.index;
                if (err) {
                    res.reject('cancel');
                } else {
                    if (index === 0) {
                        _takePhoto(options, res);
                    } else if (index === 1) {
                        _chooseImage(options, res);
                    }
                }
            });
        }
    }, ChooseImageApiProtocol, ChooseImageApiOptions) as ChooseImage;
    const _chooseVideo = (options: ChooseVideoOptions, res: ApiExecutor<ChooseVideoSuccess>)=>{
        _chooseMedia({
            mimeType: photoAccessHelper2.PhotoViewMIMETypes.VIDEO_TYPE,
            sourceType: [
                "album"
            ]
        } as _ChooseMediaOptions).then((chooseMediaRes)=>{
            const file = chooseMediaRes.tempFiles[0];
            if (!file) {
                const errMsg = MediaUniErrors.get(1101001) as string;
                res.reject(errMsg, {
                    errCode: 1101001
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
    };
    const _takeVideo = (options: ChooseVideoOptions, res: ApiExecutor<ChooseVideoSuccess>)=>{
        const takeVideoOptions: TakeVideoOptions = {
            cameraType: options.camera! as CameraPosition,
            videoDuration: options.maxDuration!
        };
        takeVideo(takeVideoOptions).then((video)=>{
            res.resolve({
                tempFilePath: video.path,
                duration: video.duration,
                size: video.size,
                width: video.width,
                height: video.height
            } as ChooseVideoSuccess);
        }).catch((err: Error)=>{
            res.reject(err.message);
        });
    };
    const chooseVideo: ChooseVideo = defineAsyncApi<ChooseVideoOptions, ChooseVideoSuccess>(API_CHOOSE_VIDEO, async (options: ChooseVideoOptions, res: ApiExecutor<ChooseVideoSuccess>)=>{
        if (options.sourceType?.length === 1 && options.sourceType[0] === 'camera') {
            _takeVideo(options, res);
        } else if (options.sourceType?.length === 1 && options.sourceType[0] === 'album') {
            _chooseVideo(options, res);
        } else {
            const lastWindow = getCurrentWindow1() as window1.Window;
            const UIContextPromptAction = await lastWindow.getUIContext().getPromptAction();
            UIContextPromptAction.showActionMenu({
                buttons: [
                    {
                        text: '拍摄',
                        color: '#000000'
                    },
                    {
                        text: '从相册选择',
                        color: '#000000'
                    }
                ]
            } as promptAction2.ActionMenuOptions, (err, ref)=>{
                let index = ref.index;
                if (err) {
                    res.reject('cancel');
                } else {
                    if (index === 0) {
                        _takeVideo(options, res);
                    } else if (index === 1) {
                        _chooseVideo(options, res);
                    }
                }
            });
        }
    }, ChooseVideoApiProtocol, ChooseVideoApiOptions) as ChooseVideo;
    const getImageInfo: GetImageInfo = defineAsyncApi<GetImageInfoOptions, GetImageInfoSuccess>(API_GET_IMAGE_INFO, async (options: GetImageInfoOptions, res: ApiExecutor<GetImageInfoSuccess>)=>{
        let src = options.src;
        if (src.startsWith('http:') || src.startsWith('https:')) {
            try {
                src = await new Promise<string>((resolve, reject)=>{
                    uni.downloadFile({
                        url: options.src,
                        success: (res: IGetImageInfoDownloadSuccess)=>{
                            resolve(res.tempFilePath);
                        },
                        fail: (err: IGetImageInfoDownloadFail)=>{
                            reject(err);
                        }
                    } as IGetImageInfoDownloadOptions);
                });
            } catch (err) {
                const error = err as IGetImageInfoDownloadFail;
                res.reject(error.errMsg);
                return;
            }
        }
        _getImageInfo(src).then((getImageInfoRes)=>{
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
    const previewImage: PreviewImage = defineAsyncApi<PreviewImageOptions, PreviewImageSuccess>(API_PREVIEW_IMAGE, (options: PreviewImageOptions, exec: ApiExecutor<PreviewImageSuccess>)=>{
        const currentUrl = typeof options.current === 'number' ? options.urls[options.current ?? 0] : options.current as string;
        onNativePageReady1().then((nativePage: Object)=>{
            getOSRuntime().previewImage({
                urls: options.urls.map((url)=>getRealPath2(url) as string),
                current: getRealPath2(currentUrl || ''),
                showmenu: options.showmenu === false ? false : true
            } as IPreviewImageOptions, nativePage);
            exec.resolve({
                errSubject: 'uni-previewImage',
                errMsg: ''
            } as PreviewImageSuccess);
        });
    }, PreviewImageApiProtocol, PreviewImageApiOptions) as PreviewImage;
    const closePreviewImage: ClosePreviewImage = defineAsyncApi<ClosePreviewImageOptions, ClosePreviewImageSuccess>(API_CLOSE_PREVIEW_IMAGE, (options: ClosePreviewImageOptions, exec: ApiExecutor<ClosePreviewImageSuccess>)=>{
        onNativePageReady1().then((nativePage: Object)=>{
            getOSRuntime().closePreviewImage();
            exec.resolve({
                errMsg: ''
            } as ClosePreviewImageSuccess);
        });
    }) as ClosePreviewImage;
    const saveResource = async (src: Resource, dest: string)=>{
        const context = getAbilityContext2() as common.UIAbilityContext;
        const resourceManager = context.resourceManager;
        const srcPath: string = src.params?.[0] as string;
        const destFile = fs3.openSync(dest, fs3.OpenMode.WRITE_ONLY);
        const content = await resourceManager.getRawFileContent(srcPath);
        await fs3.write(destFile.fd, content.buffer);
        await fs3.close(destFile);
    };
    const saveUri = async (src: string, dest: string)=>{
        const srcFile = fs3.openSync(src, fs3.OpenMode.READ_ONLY);
        const destFile = fs3.openSync(dest, fs3.OpenMode.WRITE_ONLY);
        await fs3.copyFile(srcFile.fd, destFile.fd);
        await fs3.close(srcFile);
        await fs3.close(destFile);
    };
    const saveMediaToAlbum = async (fromUri: string, type: 'image' | 'video'): Promise<string | ISaveMediaError> =>{
        const realPath = getResourceStr(fromUri) as string | Resource;
        const context = getAbilityContext2() as common.UIAbilityContext;
        let fileName = Date.now() + (type === 'image' ? '.png' : '.mp4');
        const isResource = typeof realPath !== 'string';
        if (isResource) {
            if (typeof realPath.params?.[0] === 'string') {
                fileName = realPath.params?.[0].split('/').pop() || fileName;
            }
        } else {
            fileName = realPath.split('/').pop() || fileName;
        }
        const phAccessHelper = photoAccessHelper3.getPhotoAccessHelper(context);
        const fileNameParts = fileName.split('.');
        const title = fileNameParts[0];
        const fileNameExtension = fileNameParts.pop()!;
        const photoCreationConfigs: Array<photoAccessHelper3.PhotoCreationConfig> = [
            {
                title,
                fileNameExtension,
                photoType: type === 'image' ? photoAccessHelper3.PhotoType.IMAGE : photoAccessHelper3.PhotoType.VIDEO
            }
        ];
        const desFileUris: Array<string> = await phAccessHelper.showAssetsCreationDialog([
            fromUri
        ], photoCreationConfigs);
        if (!desFileUris || desFileUris.length === 0) {
            return {
                code: 1101001,
                message: MediaUniErrors.get(1101001) as string
            } as ISaveMediaError;
        }
        const destUri = desFileUris[0];
        if (!destUri.startsWith('file://')) {
            return {
                code: 1101006,
                message: MediaUniErrors.get(1101006) as string + ', code: ' + destUri
            } as ISaveMediaError;
        }
        if (isResource) {
            await saveResource(realPath as Resource, destUri);
        } else {
            await saveUri(realPath as string, destUri);
        }
        return destUri;
    };
    const saveImageToPhotosAlbum: SaveImageToPhotosAlbum = defineAsyncApi<SaveImageToPhotosAlbumOptions, SaveImageToPhotosAlbumSuccess>(API_SAVE_IMAGE_TO_PHOTOS_ALBUM, (options: SaveImageToPhotosAlbumOptions, res: ApiExecutor<SaveImageToPhotosAlbumSuccess>)=>{
        saveMediaToAlbum(options.filePath, 'image').then((uri)=>{
            if (typeof uri === 'object') {
                const err = uri as ISaveMediaError;
                res.reject(err.message, {
                    errCode: err.code
                } as ApiError);
                return;
            }
            res.resolve({
                path: uri
            } as SaveImageToPhotosAlbumSuccess);
        }, (err: Error)=>{
            res.reject(err.message);
        });
    }, SaveImageToPhotosAlbumApiProtocol) as SaveImageToPhotosAlbum;
    const saveVideoToPhotosAlbum: SaveVideoToPhotosAlbum = defineAsyncApi<SaveVideoToPhotosAlbumOptions, SaveVideoToPhotosAlbumSuccess>(API_SAVE_VIDEO_TO_PHOTOS_ALBUM, (options: SaveVideoToPhotosAlbumOptions, res: ApiExecutor<SaveVideoToPhotosAlbumSuccess>)=>{
        saveMediaToAlbum(options.filePath, 'video').then((uri)=>{
            if (typeof uri === 'object') {
                const err = uri as ISaveMediaError;
                res.reject(err.message, {
                    errCode: err.code
                } as ApiError);
                return;
            }
            res.resolve({} as SaveVideoToPhotosAlbumSuccess);
        }, (err: Error)=>{
            res.reject(err.message);
        });
    }, SaveVideoToPhotosAlbumApiProtocol) as SaveVideoToPhotosAlbum;
    const getFileName = (path: string)=>{
        const array = path.split('/');
        return array[array.length - 1];
    };
    let id: number = 0;
    const _compressImage = (args: CompressImageOptions)=>{
        const imageName = getFileName(args.src);
        const imageExt = imageName.split('.').slice(-1)[0];
        const imagePacker: image1.ImagePacker = image1.createImagePacker();
        const file2 = fileIo4.openSync(args.src, fileIo4.OpenMode.READ_ONLY);
        if (!file2) {
            throw new Error('open file failed');
        }
        const imageSource: image1.ImageSource = image1.createImageSource(file2.fd);
        if (imageSource == null) {
            throw new Error('create image source failed');
        }
        let decodingOptions: image1.DecodingOptions = {
            editable: true
        };
        if (args.rotate != null) {
            decodingOptions.rotate = args.rotate;
        }
        if (args.compressedHeight != null || args.compressedWidth != null) {
            decodingOptions.desiredSize = {
                height: (args.compressedHeight ?? args.compressedWidth)!,
                width: (args.compressedWidth ?? args.compressedHeight)!
            };
        }
        const pixelMap = imageSource.createPixelMapSync(decodingOptions);
        let format: string = '';
        if ([
            'jpg',
            'jpe',
            'jpeg',
            'png'
        ].includes(imageExt)) {
            format = 'image/jpeg';
        }
        if (imageExt === 'webp') format = 'image/webp';
        if (!format.length) {
            throw new Error('error image format');
        }
        const packOptions: image1.PackingOption = {
            format,
            quality: args.quality ?? 80
        };
        const tempFileName = `${Date.now()}_${id++}_${imageName}`;
        const tempDirPath = `${getEnv2().TEMP_PATH}/compress`;
        if (!fileIo4.accessSync(tempDirPath)) {
            fileIo4.mkdirSync(tempDirPath, true);
        }
        const tempFilePath: string = `${tempDirPath}/${tempFileName}`;
        const file = fileIo4.openSync(tempFilePath, fileIo4.OpenMode.CREATE | fileIo4.OpenMode.READ_WRITE);
        return imagePacker.packToFile(pixelMap, file.fd, packOptions).then((_)=>{
            const size = fileIo4.statSync(file.fd).size;
            fileIo4.closeSync(file.fd);
            pixelMap.release();
            return {
                size,
                tempFilePath
            } as _CompressImageSuccess;
        });
    };
    const compressImage: CompressImage = defineAsyncApi<CompressImageOptions, CompressImageSuccess>(API_CHOOSE_IMAGE, (args: CompressImageOptions, executor: ApiExecutor<CompressImageSuccess>)=>{
        try {
            _compressImage(args).then((res)=>{
                executor.resolve({
                    tempFilePath: res.tempFilePath
                } as CompressImageSuccess);
            });
        } catch (error) {
            executor.reject((error as BusinessError7).message);
        }
    }, CompressImageApiProtocol, CompressImageApiOptions) as CompressImage;
    const IMAGES: string[] = [
        "jpg",
        "jpe",
        "pbm",
        "pgm",
        "pnm",
        "ppm",
        "psd",
        "pic",
        "rgb",
        "svg",
        "svgz",
        "tif",
        "xif",
        "wbmp",
        "wdp",
        "xbm",
        "ico"
    ];
    const VIDEOS: string[] = [
        "3g2",
        "3gp",
        "avi",
        "f4v",
        "flv",
        "jpgm",
        "jpgv",
        "m1v",
        "m2v",
        "mpe",
        "mpg",
        "mpg4",
        "m4v",
        "mkv",
        "mov",
        "qt",
        "movie",
        "mp4v",
        "ogv",
        "smv",
        "wm",
        "wmv",
        "wmx",
        "wvx"
    ];
    const getFile = (url: string)=>{
        const file = fileIo5.openSync(url, fileIo5.OpenMode.READ_ONLY);
        const size = fileIo5.statSync(file.fd).size;
        return {
            path: url,
            name: file.name,
            size,
            type: file.name.split('.').pop()!
        } as IFile;
    };
    const chooseFile: ChooseFile = defineAsyncApi<ChooseFileOptions, ChooseFileSuccess>(API_CHOOSE_FILE, (args: ChooseFileOptions, executor: ApiExecutor<ChooseFileSuccess>)=>{
        if ([
            'image',
            'video'
        ].includes(args.type ?? '')) {
            if (args.type === 'image') {
                chooseImage({
                    sourceType: args.sourceType,
                    success (res: ChooseFileSuccess) {
                        executor.resolve({
                            tempFilePaths: res.tempFilePaths,
                            tempFiles: res.tempFilePaths.map((url): IFile =>getFile(url))
                        } as ChooseFileSuccess);
                    },
                    fail (err: IMediaError) {
                        executor.reject(err.errMsg, {
                            errCode: err.errCode
                        } as ApiError);
                    }
                } as ChooseImageOptions);
            }
            if (args.type === 'video') {
                chooseVideo({
                    sourceType: args.sourceType,
                    success (res: ChooseVideoSuccess) {
                        executor.resolve({
                            tempFilePaths: [
                                res.tempFilePath
                            ],
                            tempFiles: [
                                getFile(res.tempFilePath)
                            ]
                        } as ChooseFileSuccess);
                    },
                    fail (err: IMediaError) {
                        executor.reject(err.errMsg, {
                            errCode: err.errCode
                        } as ApiError);
                    }
                } as ChooseVideoOptions);
            }
        } else {
            try {
                let documentSelectOptions = new picker.DocumentSelectOptions();
                let documentPicker = new picker.DocumentViewPicker(getAbilityContext3()!);
                documentSelectOptions.selectMode = picker.DocumentSelectMode.FILE;
                if (args.count) documentSelectOptions.maxSelectNumber = args.count;
                if (args.extension) documentSelectOptions.fileSuffixFilters = args.extension;
                if (args.type === 'image') {
                    documentSelectOptions.fileSuffixFilters = documentSelectOptions.fileSuffixFilters?.concat(IMAGES);
                }
                if (args.type === 'video') {
                    documentSelectOptions.fileSuffixFilters = documentSelectOptions.fileSuffixFilters?.concat(VIDEOS);
                }
                documentPicker.select(documentSelectOptions).then((documentSelectResult: Array<string>)=>{
                    let tempFiles = documentSelectResult.map((url): IFile =>getFile(url));
                    if (tempFiles.length !== 0) {
                        executor.resolve({
                            tempFilePaths: documentSelectResult,
                            tempFiles
                        } as ChooseFileSuccess);
                    } else {
                        executor.reject('cancel');
                    }
                }).catch((err: BusinessError8)=>{
                    executor.reject(err.message, {
                        errCode: err.code
                    } as ApiError);
                });
            } catch (error) {
                let err: BusinessError8 = error as BusinessError8;
                executor.reject(err.message, {
                    errCode: err.code
                } as ApiError);
            }
        }
    }, ChooseFileApiProtocol, ChooseFileApiOptions) as ChooseFile;
    const getCameraPickerMediaTypes = (UniMediaTypes: UNI_MEDIA_TYPE[]): cameraPicker1.PickerMediaType[] =>{
        let mediaTypes: Array<cameraPicker1.PickerMediaType> = [];
        if (UniMediaTypes.includes('mix')) {
            mediaTypes.push(cameraPicker1.PickerMediaType.PHOTO, cameraPicker1.PickerMediaType.VIDEO);
        } else {
            if (UniMediaTypes.includes('image')) {
                mediaTypes.push(cameraPicker1.PickerMediaType.PHOTO);
            }
            if (UniMediaTypes.includes('video')) {
                mediaTypes.push(cameraPicker1.PickerMediaType.VIDEO);
            }
        }
        return mediaTypes;
    };
    const _takeCamera = async (args: ChooseMediaOptions, executor: ApiExecutor<ChooseMediaSuccess>)=>{
        try {
            let pickerProfile: cameraPicker1.PickerProfile = {
                cameraPosition: getHMCameraPosition(args?.camera ?? 'back'),
                videoDuration: args?.maxDuration ?? 10
            };
            const mediaTypes = getCameraPickerMediaTypes((args.mediaType ?? []) as UNI_MEDIA_TYPE[]);
            const res = await cameraPicker1.pick(getAbilityContext4()!, mediaTypes, pickerProfile);
            executor.resolve({
                type: 'mix',
                tempFiles: [
                    {
                        tempFilePath: res.resultUri,
                        fileType: res.mediaType === cameraPicker1.PickerMediaType.PHOTO ? 'image' : 'video'
                    }
                ]
            } as ChooseMediaSuccess);
        } catch (error) {
            const err = error as BusinessError9;
            executor.reject(err.message, {
                errCode: err.code
            } as ApiError);
        }
    };
    const __chooseMedia = async (args: ChooseMediaOptions, executor: ApiExecutor<ChooseMediaSuccess>)=>_chooseMedia({
            mimeType: photoAccessHelper4.PhotoViewMIMETypes.IMAGE_VIDEO_TYPE,
            sourceType: [
                "album"
            ],
            count: args.count!
        } as _ChooseMediaOptions).then((res)=>{
            executor.resolve({
                type: 'mix',
                tempFiles: res.tempFiles.map((tempFile): ChooseMediaTempFile =>{
                    if (tempFile.fileType === 'image') {
                        return {
                            fileType: tempFile.fileType,
                            tempFilePath: tempFile.tempFilePath,
                            size: tempFile.size
                        } as ChooseMediaTempFile;
                    }
                    return {
                        tempFilePath: tempFile.tempFilePath,
                        duration: tempFile.duration,
                        size: tempFile.size,
                        height: tempFile.height,
                        width: tempFile.width,
                        fileType: tempFile.fileType
                    } as ChooseMediaTempFile;
                })
            } as ChooseMediaSuccess);
        }).catch((err: Error)=>{
            executor.reject(err.message);
        });
    const chooseMedia: ChooseMedia = defineAsyncApi<ChooseMediaOptions, ChooseMediaSuccess>(API_CHOOSE_MEDIA, async (args: ChooseMediaOptions, executor: ApiExecutor<ChooseMediaSuccess>)=>{
        if (args.mediaType?.length === 1 && args.mediaType[0] === 'image') {
            chooseImage({
                count: args.count,
                sizeType: args.sizeType,
                sourceType: args.sourceType,
                success (res) {
                    executor.resolve({
                        type: 'image',
                        tempFiles: res.tempFiles.map((tempFile: ChooseImageTempFile)=>{
                            return {
                                fileType: 'image',
                                tempFilePath: tempFile.path,
                                size: tempFile.size
                            } as ChooseMediaTempFile;
                        })
                    } as ChooseMediaSuccess);
                },
                fail (err: IMediaError) {
                    executor.reject(err.errMsg, {
                        errCode: err.errCode
                    } as ApiError);
                }
            } as ChooseImageOptions);
            return;
        }
        if (args.mediaType?.length === 1 && args.mediaType[0] === 'video') {
            chooseVideo({
                sourceType: args.sourceType,
                maxDuration: args.maxDuration,
                camera: args.camera,
                success (res) {
                    executor.resolve({
                        type: 'video',
                        tempFiles: [
                            {
                                tempFilePath: res.tempFilePath,
                                duration: res.duration,
                                size: res.size,
                                height: res.height,
                                width: res.width,
                                fileType: 'video'
                            }
                        ]
                    } as ChooseMediaSuccess);
                },
                fail (err: IMediaError) {
                    executor.reject(err.errMsg, {
                        errCode: err.errCode
                    } as ApiError);
                }
            } as ChooseVideoOptions);
            return;
        }
        if (args.sourceType?.length === 1 && args.sourceType[0] === 'camera') {
            _takeCamera(args, executor);
        } else {
            const lastWindow = getCurrentWindow2() as window2.Window;
            const UIContextPromptAction = await lastWindow.getUIContext().getPromptAction();
            UIContextPromptAction.showActionMenu({
                buttons: [
                    {
                        text: '拍摄',
                        color: '#000000'
                    },
                    {
                        text: '从相册选择',
                        color: '#000000'
                    }
                ]
            } as promptAction3.ActionMenuOptions, (err, ref)=>{
                let index = ref.index;
                if (err) {
                    executor.reject('cancel');
                } else {
                    if (index === 0) {
                        _takeCamera(args, executor);
                    } else if (index === 1) {
                        __chooseMedia(args, executor);
                    }
                }
            });
        }
    }, ChooseMediaApiProtocol, ChooseMediaApiOptions) as ChooseMedia;
    const getQuality = (quality: string | null = null)=>{
        switch(quality){
            case "low":
                return CompressQuality.COMPRESS_QUALITY_LOW;
            case 'medium':
                return CompressQuality.COMPRESS_QUALITY_MEDIUM;
        }
        return CompressQuality.COMPRESS_QUALITY_HIGH;
    };
    const compressVideo: CompressVideo = defineAsyncApi<CompressVideoOptions, CompressVideoSuccess>(API_COMPRESS_VIDEO, async (args: CompressVideoOptions, executor: ApiExecutor<CompressVideoSuccess>)=>{
        let videoCompressor = new VideoCompressor();
        videoCompressor.compressVideo(getAbilityContext5()!, args.src, getQuality(args.quality!)).then((data: CompressorResponse): void =>{
            if (data.code == CompressorResponseCode.SUCCESS) {
                _getVideoInfo(data.outputPath).then((res)=>{
                    executor.resolve({
                        tempFilePath: data.outputPath,
                        size: res.size
                    } as CompressVideoSuccess);
                });
            } else {
                executor.reject(data.message, {
                    errCode: data.code
                } as ApiError);
            }
        }).catch((err: Error)=>{
            executor.reject(err.message);
        });
    }, CompressVideoApiProtocol, CompressVideoApiOptions) as CompressVideo;
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
                required: false
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
                'name',
                (name: string, params: UploadFileOptions)=>{
                    if (name == null) {
                        params.name = 'file';
                    }
                }
            ]
        ])
    };
    const needsEncoding = (str: string)=>{
        const decoded = decodeURIComponent(str);
        if (decoded !== str) {
            if (encodeURIComponent(decoded) === str) {
                return false;
            }
        }
        return encodeURIComponent(decoded) !== decoded;
    };
    const parseUrl = (url: string)=>{
        const urlObj = harmonyUrl.URL.parseURL(url);
        urlObj.params.forEach((value, key)=>{
            if (needsEncoding(value)) {
                urlObj.params.set(key, value);
            }
        });
        return urlObj.toString();
    };
    const getCookieSync = (url: string): string =>{
        return webview.WebCookieManager.fetchCookieSync(url);
    };
    const setCookieSync = (url: string, cookies: string[]): void =>{
        cookies.forEach((cookie)=>{
            webview.WebCookieManager.configCookieSync(url, cookie);
        });
        webview.WebCookieManager.saveCookieAsync();
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
        header = header || {} as ESObject;
        if (!header!['Cookie'] && !header!['cookie']) {
            header!['Cookie'] = getCookieSync(url);
        }
        let contentType = '';
        const headers = {} as Record<string, Object>;
        const headerRecord = header as Object as Record<string, string>;
        const headerKeys = Object.keys(headerRecord);
        for(let i = 0; i < headerKeys.length; i++){
            const name = headerKeys[i];
            if (name.toLowerCase() === 'content-type') {
                contentType = headerRecord[name] as string;
            }
            headers[name.toLowerCase()] = headerRecord[name];
        }
        if (!contentType && method === 'POST') {
            headers['Content-Type'] = 'application/json';
            contentType = 'application/json';
        }
        if (method === 'GET' && data && isPlainObject(data)) {
            const dataRecord = data as Record<string, Object>;
            const query = Object.keys(dataRecord).map((key)=>{
                return (encodeURIComponent(key) + '=' + encodeURIComponent(dataRecord[key] as string | number | boolean));
            }).join('&');
            url += query ? (url.indexOf('?') > -1 ? '&' : '?') + query : '';
            data = null;
        } else if (method !== 'GET' && contentType && contentType.indexOf('application/json') === 0 && isPlainObject(data)) {
            data = JSON.stringify(data);
        } else if (method !== 'GET' && contentType && contentType.indexOf('application/x-www-form-urlencoded') === 0 && isPlainObject(data)) {
            const dataRecord = data as Record<string, Object>;
            data = Object.keys(dataRecord).map((key)=>{
                return (encodeURIComponent(key) + '=' + encodeURIComponent(dataRecord[key] as number | string | boolean));
            }).join('&');
        }
        const httpRequest = http.createHttp();
        const mp = getCurrentMP() as IUniNetworkMP;
        const userAgent = mp.userAgent.fullUserAgent;
        if (userAgent && headers && !headers!['User-Agent'] && !headers!['user-agent']) {
            headers!['User-Agent'] = userAgent;
        }
        const emitter = new Emitter2() as IUniRequestEmitter;
        const requestTask: IRequestTask = {
            abort () {
                emitter.off('headersReceive');
                httpRequest.destroy();
            },
            onHeadersReceived (callback: Function) {
                emitter.on('headersReceive', callback);
            },
            offHeadersReceived (callback: Function | null = null) {
                emitter.off('headersReceive', callback);
            }
        };
        const destroy = ()=>{
            emitter.off('headersReceive');
            httpRequest.destroy();
        };
        mp.on('beforeClose', destroy);
        let latestHeaders: Object | null = null;
        httpRequest.on('headersReceive', (headers: Object)=>{
            const realHeaders = headers as Record<string, string | string[]>;
            const setCookieHeader = realHeaders['set-cookie'] || realHeaders['Set-Cookie'];
            if (setCookieHeader) {
                setCookieSync(url, setCookieHeader as string[]);
            }
            latestHeaders = headers;
        });
        const bufs = [] as buffer.Buffer[];
        httpRequest.on('dataReceive', (data)=>{
            bufs.push(buffer.from(data));
        });
        httpRequest.requestInStream(parseUrl(url), {
            header: headers,
            method: (method || 'GET').toUpperCase() as http.RequestMethod,
            extraData: data || undefined,
            connectTimeout: timeout ? timeout : undefined,
            readTimeout: timeout ? timeout : undefined
        } as http.HttpRequestOptions, (err, statusCode)=>{
            if (err) {
                exec.reject(err.message);
            } else {
                const responseData = buffer.concat(bufs);
                let data: ArrayBuffer | string | object = '';
                if (responseType === 'arraybuffer') {
                    data = responseData.buffer;
                } else {
                    data = responseData.toString('utf8');
                    if (dataType === 'json') {
                        try {
                            data = JSON.parse(data);
                        } catch (e) {}
                    }
                }
                const headers = latestHeaders as Record<string, string | string[]>;
                const oldCookies = (headers['Set-Cookie'] || headers['set-cookie'] || []) as string[];
                const cookies = latestHeaders ? cookiesParse(latestHeaders as Record<string, string>) : [];
                let newCookies = oldCookies.join(',');
                if (newCookies) {
                    if (headers['Set-Cookie']) {
                        headers['Set-Cookie'] = newCookies;
                    } else {
                        headers['set-cookie'] = newCookies;
                    }
                }
                exec.resolve({
                    data,
                    statusCode,
                    header: latestHeaders!,
                    cookies: cookies
                } as RequestSuccess<Object>);
            }
            requestTask.offHeadersReceived();
            httpRequest.destroy();
            mp.off('beforeClose', destroy);
        });
        return new RequestTask1(requestTask);
    }, RequestApiProtocol, RequestApiOptions) as Request<Object>;
    const lookupExt = (contentType: string): string | undefined =>{
        const rawContentType = contentType.split(';')[0].trim().toLowerCase();
        return (UTSHarmony9.getExtensionFromMimeType(rawContentType) as string | null) || undefined;
    };
    const lookupContentTypeWithUri = (uri: string): string | undefined =>{
        const uriArr = uri.split('.');
        if (uriArr.length <= 1) {
            return undefined;
        }
        const ext = uriArr.pop() as string;
        return (UTSHarmony9.getMimeTypeFromExtension(ext) as string | null) || undefined;
    };
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
        const file = fs4.openSync(readFilePath, fs4.OpenMode.READ_ONLY);
        const stat = fs4.statSync(file.fd);
        const data = new ArrayBuffer(stat.size);
        fs4.readSync(file.fd, data);
        fs4.closeSync(file.fd);
        return data;
    };
    const uploadFile = defineTaskApi<UploadFileOptions, UploadFileSuccess, UploadTask>(API_UPLOAD_FILE, (args: UploadFileOptions, exec: ApiExecutor<UploadFileSuccess>)=>{
        let url = args.url, timeout = args.timeout, header = args.header, formData = args.formData, files = args.files, filePath = args.filePath, name = args.name;
        header = header || {} as ESObject;
        if (!header!['Cookie'] && !header!['cookie']) {
            header!['Cookie'] = getCookieSync(url);
        }
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
                        remoteFileName: uri.split('/').pop() || 'no-name',
                        data: readFile(uri!)
                    } as http1.MultiFormData);
                }
            } else if (filePath) {
                multiFormDataList.push({
                    name: name || 'file',
                    contentType: lookupContentTypeWithUri(filePath!) || 'application/octet-stream',
                    remoteFileName: filePath.split('/').pop() || 'no-name',
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
        const mp = getCurrentMP1() as IUniNetworkMP;
        const userAgent = mp.userAgent.fullUserAgent;
        if (userAgent && !headers['User-Agent'] && !headers['user-agent']) {
            headers['User-Agent'] = userAgent;
        }
        const emitter = new Emitter3() as IUniUploadFileEmitter;
        const uploadTask: IUploadTask = {
            abort () {
                emitter.off('headersReceive');
                emitter.off('progress');
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
        const destroy = ()=>{
            emitter.off('headersReceive');
            emitter.off('progress');
            httpRequest.destroy();
        };
        mp.on('beforeClose', destroy);
        httpRequest.on('headersReceive', (headers: Object)=>{
            const realHeaders = headers as Record<string, string | string[]>;
            const setCookieHeader = realHeaders['set-cookie'] || realHeaders['Set-Cookie'];
            if (setCookieHeader) {
                setCookieSync(url, setCookieHeader as string[]);
            }
        });
        httpRequest.on('dataSendProgress', (ref)=>{
            let sendSize = ref.sendSize, totalSize = ref.totalSize;
            emitter.emit('progress', {
                progress: Math.floor((sendSize / totalSize) * 100),
                totalBytesSent: sendSize,
                totalBytesExpectedToSend: totalSize
            } as OnProgressUpdateResult);
        });
        httpRequest.request(parseUrl(url), {
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
            mp.off('beforeClose', destroy);
        });
        return new UploadTask1(uploadTask);
    }, UploadFileApiProtocol, UploadFileApiOptions) as UploadFile;
    const getPossibleExt = (contentType: string, contentDisposition: string, url: string): string =>{
        const contentDispositionFileNameMatches = contentDisposition.match(/filename="(.*)"/);
        const contentDispositionFileName = contentDispositionFileNameMatches ? contentDispositionFileNameMatches[1] : '';
        const contentDispositionExt = contentDispositionFileName ? contentDispositionFileName.split('.').pop() : '';
        if (contentDispositionExt) {
            return contentDispositionExt;
        }
        const urlPath = harmonyUrl1.URL.parseURL(url).pathname;
        const urlExt = urlPath.split('/').pop()?.split('.')[1] || '';
        if (urlExt) {
            return urlExt;
        }
        const contentTypeExt = lookupExt(contentType);
        return contentTypeExt || '';
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
    let downloadIndex: [string, number] = [
        '0',
        0
    ];
    const getDownloadFileName = (ext: string)=>{
        let fileName = Date.now() + '';
        if (downloadIndex[0] === fileName) {
            downloadIndex[1]++;
            if (downloadIndex[1] > 0) {
                fileName += '-' + downloadIndex[1];
            }
        } else {
            downloadIndex[0] = fileName;
            downloadIndex[1] = 0;
        }
        if (ext) {
            fileName += '.' + ext;
        }
        return fileName;
    };
    const downloadFile = defineTaskApi<DownloadFileOptions, DownloadFileSuccess, DownloadTask>(API_DOWNLOAD_FILE, (args: DownloadFileOptions, exec: ApiExecutor<DownloadFileSuccess>)=>{
        let url = args.url, timeout = args.timeout, header = args.header, filePath = args.filePath;
        header = header || {} as ESObject;
        if (!header!['Cookie'] && !header!['cookie']) {
            header!['Cookie'] = getCookieSync(url);
        }
        const httpRequest = http2.createHttp();
        const mp = getCurrentMP2()! as IUniNetworkMP;
        const userAgent = mp.userAgent.fullUserAgent;
        if (userAgent && !header!['User-Agent'] && !header!['user-agent']) {
            header!['User-Agent'] = userAgent;
        }
        const emitter = new Emitter4() as IUniDownloadFileEmitter;
        const downloadTask: IDownloadTask = {
            abort () {
                emitter.off('headersReceive');
                emitter.off('progress');
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
        const destroy = ()=>{
            downloadTask.abort();
        };
        mp.on('beforeClose', destroy);
        let responseContentType = '';
        let responseContentDisposition = '';
        httpRequest.on('headersReceive', (headers: Object)=>{
            const realHeaders = headers as Record<string, string | string[]>;
            responseContentType = realHeaders['content-type'] as string || realHeaders['Content-Type'] as string || '';
            responseContentDisposition = realHeaders['content-disposition'] as string || realHeaders['Content-Disposition'] as string || '';
            const setCookieHeader = realHeaders['set-cookie'] || realHeaders['Set-Cookie'];
            if (setCookieHeader) {
                setCookieSync(url, setCookieHeader as string[]);
            }
        });
        httpRequest.on('dataReceiveProgress', (ref)=>{
            let receiveSize = ref.receiveSize, totalSize = ref.totalSize;
            emitter.emit('progress', {
                progress: Math.floor((receiveSize / totalSize) * 100),
                totalBytesWritten: receiveSize,
                totalBytesExpectedToWrite: totalSize
            } as OnProgressDownloadResult);
        });
        const TEMP_PATH = getEnv3().TEMP_PATH as string;
        const downloadPath = TEMP_PATH + '/download';
        if (!fs5.accessSync(downloadPath)) {
            fs5.mkdirSync(downloadPath, true);
        }
        let stream: fs5.Stream;
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
            if (!stream) {
                const ext = getPossibleExt(responseContentType, responseContentDisposition, url);
                tempFilePath = filePath ? filePath.replace(/^file:\/\//, '') : downloadPath + '/' + getDownloadFileName(ext);
                stream = fs5.createStreamSync(tempFilePath, 'w+');
            }
            queueWrite(data);
        });
        httpRequest.requestInStream(parseUrl(url), {
            header: header ? header : {} as ESObject,
            method: http2.RequestMethod.GET,
            connectTimeout: timeout ? timeout : undefined,
            readTimeout: timeout ? timeout : undefined
        } as http2.HttpRequestOptions, (err, statusCode)=>{
            let finishPromise: Promise<void> = Promise.resolve();
            if (err) {
                exec.reject(err.message);
            } else {
                finishPromise = writePromise.then(async ()=>{
                    await stream.flush();
                    await stream.close();
                    exec.resolve({
                        tempFilePath: 'file://' + tempFilePath,
                        statusCode
                    } as DownloadFileSuccess);
                }).catch((err: Error)=>{
                    exec.reject(err.message);
                });
            }
            finishPromise.then(()=>{
                downloadTask.offHeadersReceived();
                downloadTask.offProgressUpdate();
                httpRequest.destroy();
                mp.off('beforeClose', destroy);
            });
        });
        return new DownloadTask1(downloadTask);
    }, DownloadFileApiProtocol, DownloadFileApiOptions) as DownloadFile;
    const API_LOGIN = 'login';
    const LoginApiProtocol = new Map<string, ProtocolOptions>([
        [
            'provider',
            {
                type: 'string'
            }
        ],
        [
            'timeout',
            {
                type: 'number'
            }
        ]
    ]);
    const API_GET_USER_INFO = 'getUserInfo';
    const GetUserInfoApiProtocol = new Map<string, ProtocolOptions>([
        [
            'provider',
            {
                type: 'string'
            }
        ],
        [
            'timeout',
            {
                type: 'number'
            }
        ]
    ]);
    const SERVICE = 'oauth';
    const PROVIDER = 'huawei';
    const login: Login = defineAsyncApi<LoginOptions, LoginSuccess>(API_LOGIN, (args: LoginOptions, executor: ApiExecutor<LoginSuccess>)=>{
        const provider = getUniProvider<UniOAuthProvider>(SERVICE, args.provider ?? PROVIDER);
        if (!provider) {
            executor.reject('Provider not found.');
            return;
        }
        provider.login({
            success (res) {
                executor.resolve(res);
            },
            fail (err) {
                executor.reject(err.errMsg);
            }
        } as LoginOptions);
    }, LoginApiProtocol) as Login;
    const getUserInfo: GetUserInfo = defineAsyncApi<GetUserInfoOptions, GetUserInfoSuccess>(API_GET_USER_INFO, (args: GetUserInfoOptions, executor: ApiExecutor<GetUserInfoSuccess>)=>{
        const provider = getUniProvider<UniOAuthProvider>(SERVICE, args.provider ?? PROVIDER);
        if (!provider) {
            executor.reject('Provider not found.');
            return;
        }
        provider.getUserInfo({
            success (res) {
                executor.resolve(res);
            },
            fail (err) {
                executor.reject(err.errMsg);
            }
        } as GetUserInfoOptions);
    }, GetUserInfoApiProtocol) as GetUserInfo;
    const API_OPEN_APP_AUTHORIZE_SETTING = 'openAppAuthorizeSetting';
    const openAppAuthorizeSetting: OpenAppAuthorizeSetting = defineAsyncApi<OpenAppAuthorizeSettingOptions, OpenAppAuthorizeSettingSuccess>(API_OPEN_APP_AUTHORIZE_SETTING, (options: OpenAppAuthorizeSettingOptions, exec: ApiExecutor<OpenAppAuthorizeSettingSuccess>)=>{
        const want: Want = {
            bundleName: 'com.huawei.hmos.settings',
            abilityName: 'com.huawei.hmos.settings.MainAbility',
            uri: 'application_info_entry',
            parameters: {
                pushParams: bundleManager2.getBundleInfoForSelfSync(bundleManager2.BundleFlag.GET_BUNDLE_INFO_DEFAULT).name
            }
        } as Want;
        const context = getAbilityContext6() as common1.UIAbilityContext;
        context.startAbility(want).then(()=>{
            exec.resolve({
                errMsg: ''
            } as OpenAppAuthorizeSettingSuccess);
        }, (err: Error)=>{
            exec.reject(err.message);
        });
    }) as OpenAppAuthorizeSetting;
    const API_OPEN_DOCUMENT = 'openDocument';
    const getContentType = (filePath: string, fileType: string | null = null): string | void =>{
        const suffix = fileType || filePath.split('.').pop();
        if (!suffix) {
            return;
        }
        switch(suffix){
            case 'doc':
            case 'docx':
                return 'application/msword';
            case 'xls':
            case 'xlsx':
                return 'application/vnd.ms-excel';
            case 'ppt':
            case 'pptx':
                return 'application/vnd.ms-powerpoint';
            case 'pdf':
                return 'application/pdf';
            default:
                return;
        }
    };
    const openDocument: OpenDocument = defineAsyncApi<OpenDocumentOptions, OpenDocumentSuccess>(API_OPEN_DOCUMENT, (options: OpenDocumentOptions, exec: ApiExecutor<OpenDocumentSuccess>)=>{
        const filePath = options.filePath;
        const uri = fileUri.getUriFromPath(filePath.replace(/^file:\/\//, ''));
        const fileContentType = getContentType(filePath, options.fileType);
        if (!fileContentType) {
            exec.reject('file type not supported');
            return;
        }
        const want: Want1 = {
            flags: wantConstant.Flags.FLAG_AUTH_WRITE_URI_PERMISSION | wantConstant.Flags.FLAG_AUTH_READ_URI_PERMISSION | wantConstant.Flags.FLAG_AUTH_PERSISTABLE_URI_PERMISSION,
            action: 'ohos.want.action.sendData',
            uri: uri,
            type: fileContentType as string
        };
        const abilityContext = getAbilityContext7() as common2.UIAbilityContext;
        abilityContext.startAbility(want).then(()=>{
            exec.resolve({} as OpenDocumentSuccess);
        }, (err: Error)=>{
            exec.reject(err.message);
        });
    }) as OpenDocument;
    const RequestPaymentUniErrors: Map<RequestPaymentErrorCode, string> = new Map([
        [
            700600,
            'The payment result is unknown (it may have been successfully paid). Please check the payment status of the order in the merchant order list.'
        ],
        [
            701100,
            'Order payment failure.'
        ],
        [
            701110,
            'Repeat the request.'
        ],
        [
            700601,
            'The user canceled midway.'
        ],
        [
            700602,
            'Network connection error.'
        ],
        [
            700603,
            'Payment result unknown (may have been successfully paid), please check the payment status of the order in the merchant order list.'
        ],
        [
            700607,
            'Payment not completed.'
        ],
        [
            700608,
            'Parameter error.'
        ],
        [
            700000,
            'Other payment errors.'
        ],
        [
            700604,
            'Wechat is not installed.'
        ],
        [
            700605,
            'Failed to get provider.'
        ],
        [
            700800,
            'URL Scheme is not configured.'
        ],
        [
            700801,
            'Universal Link is not configured.'
        ]
    ]);
    const API_REQUEST_PAYMENT = 'requestPayment';
    const requestPayment: RequestPayment = defineAsyncApi<RequestPaymentOptions, RequestPaymentSuccess>(API_REQUEST_PAYMENT, (options: RequestPaymentOptions, exec: ApiExecutor<RequestPaymentSuccess>): void =>{
        const provider = getUniProvider<UniPaymentProvider>('payment', options.provider);
        if (!provider) {
            exec.reject('Provider not found.');
            return;
        }
        provider.requestPayment({
            orderInfo: options.orderInfo,
            success: (result: RequestPaymentSuccess)=>{
                exec.resolve(result);
            },
            fail: (error: RequestPaymentFail)=>{
                const errMsg = RequestPaymentUniErrors.get(error.errCode) ?? "";
                exec.reject(errMsg, {
                    errCode: error.errCode
                } as ApiError);
            }
        } as RequestPaymentOptions);
    }) as RequestPayment;
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
            const showToastOptions: promptAction4.ShowToastOptions = {
                message: options.title,
                duration: options.duration!,
                alignment: Alignment.Center
            };
            if (options.position) {
                switch(options.position){
                    case 'top':
                        showToastOptions.alignment = Alignment.Top;
                        break;
                    case 'bottom':
                        showToastOptions.alignment = Alignment.Bottom;
                        break;
                }
            }
            const window = getCurrentWindow3() as window.Window;
            window.getUIContext().getPromptAction().showToast(showToastOptions);
            res.resolve({} as ShowToastSuccess);
        } catch (error) {
            let message = (error as BusinessError10).message;
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
            const window = getCurrentWindow4() as window.Window;
            window.getUIContext().showAlertDialog({
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
        type ActionMenuButtons = [promptAction5.Button, promptAction5.Button?, promptAction5.Button?, promptAction5.Button?, promptAction5.Button?, promptAction5.Button?];
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
            } as promptAction5.Button);
        });
        const window = getCurrentWindow5() as window.Window;
        window.getUIContext().getPromptAction().showActionMenu({
            title: options.title,
            buttons: actionMenuButtons
        } as promptAction5.ActionMenuOptions).then((showACtionSheetRes)=>{
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
    const showLoading: ShowLoading = defineAsyncApi<ShowLoadingOptions, ShowLoadingSuccess>(API_SHOW_LOADING, async (options: ShowLoadingOptions, exec: ApiExecutor<ShowLoadingSuccess>)=>{
        onNativePageReady2().then((nativePage: Object)=>{
            getOSRuntime1().showLoading({
                title: options.title || '',
                mask: options.mask == null ? false : options.mask
            } as IShowLoadingOptions, nativePage);
            exec.resolve({} as ShowLoadingSuccess);
        });
    }, ShowLoadingProtocol, ShowLoadingApiOptions) as ShowLoading;
    const hideLoading: HideLoading = defineSyncApi<void>(API_HIDE_LOADING, ()=>{
        onNativePageReady2().then((nativePage: Object)=>{
            getOSRuntime1().hideLoading();
        });
    }) as HideLoading;
    const API_START_PULL_DOWN_REFRESH = 'startPullDownRefresh';
    const API_STOP_PULL_DOWN_REFRESH = 'stopPullDownRefresh';
    const startPullDownRefresh = defineAsyncApi<StartPullDownRefreshOptions, StartPullDownRefreshSuccess>(API_START_PULL_DOWN_REFRESH, (_, res)=>{
        internalStartPullDownRefresh();
        res.resolve();
    }) as StartPullDownRefresh;
    const stopPullDownRefresh = defineSyncApi<void>(API_STOP_PULL_DOWN_REFRESH, ()=>{
        internalStopPullDownRefresh();
    }) as StopPullDownRefresh;
    const API_RPX2PX = 'rpx2px';
    const EPS = 1e-4;
    const rpx2px: Rpx2px = defineSyncApi<number>(API_RPX2PX, (number: number): number =>{
        const windowStage: harmonyWindow.WindowStage = UTSHarmony10.getWindowStage();
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
    const API_SCAN_CODE = 'scanCode';
    const HarmonyScanTypeMap = new Map<UniScanOptionsTypes, scanCore.ScanType[]>([
        [
            'barCode',
            [
                scanCore.ScanType.ONE_D_CODE
            ]
        ],
        [
            'qrCode',
            [
                scanCore.ScanType.TWO_D_CODE
            ]
        ],
        [
            'datamatrix',
            [
                scanCore.ScanType.DATAMATRIX_CODE
            ]
        ],
        [
            'pdf417',
            [
                scanCore.ScanType.PDF417_CODE
            ]
        ]
    ]);
    const UniScanTypeMap = new Map<HarmonyScanResultTypes, UniScanResultTypes>([
        [
            scanCore.ScanType.AZTEC_CODE,
            'AZTEC'
        ],
        [
            scanCore.ScanType.CODABAR_CODE,
            'CODABAR'
        ],
        [
            scanCore.ScanType.CODE128_CODE,
            'CODE_128'
        ],
        [
            scanCore.ScanType.CODE39_CODE,
            'CODE_39'
        ],
        [
            scanCore.ScanType.CODE93_CODE,
            'CODE_93'
        ],
        [
            scanCore.ScanType.DATAMATRIX_CODE,
            'DATA_MATRIX'
        ],
        [
            scanCore.ScanType.EAN13_CODE,
            'EAN_13'
        ],
        [
            scanCore.ScanType.EAN8_CODE,
            'EAN_8'
        ],
        [
            scanCore.ScanType.ITF14_CODE,
            'ITF'
        ],
        [
            scanCore.ScanType.PDF417_CODE,
            'PDF_417'
        ],
        [
            scanCore.ScanType.QR_CODE,
            'QR_CODE'
        ],
        [
            scanCore.ScanType.UPC_A_CODE,
            'UPC_A'
        ],
        [
            scanCore.ScanType.UPC_E_CODE,
            'UPC_E'
        ]
    ]);
    const scanCode: ScanCode = defineAsyncApi<ScanCodeOptions, ScanCodeSuccess>(API_SCAN_CODE, (options: ScanCodeOptions, exec: ApiExecutor<ScanCodeSuccess>)=>{
        if (!canIUse('SystemCapability.Multimedia.Scan.ScanBarcode')) {
            exec.reject('not support');
            return;
        }
        let scanTypes: scanCore.ScanType[] = [];
        if (options.scanType && Array.isArray(options.scanType) && options.scanType.length > 0) {
            for(let i = 0; i < options.scanType.length; i++){
                const uniScanType = options.scanType[i];
                const harmonyScanTypes = HarmonyScanTypeMap.get(uniScanType);
                if (!harmonyScanTypes) {
                    continue;
                }
                scanTypes = scanTypes.concat(harmonyScanTypes);
            }
        }
        if (scanTypes.length === 0) {
            scanTypes = [
                scanCore.ScanType.ALL
            ];
        }
        const scanOptions: scanBarcode.ScanOptions = {
            scanTypes,
            enableMultiMode: true,
            enableAlbum: !options.onlyFromCamera
        };
        scanBarcode.startScanForResult(getAbilityContext8()!, scanOptions, (err, data)=>{
            if (err) {
                exec.reject(err.message);
                return;
            }
            exec.resolve({
                result: data.originalValue,
                scanType: UniScanTypeMap.get(data.scanType as HarmonyScanResultTypes) || ''
            } as ScanCodeSuccess);
        });
    }) as ScanCode;
    const API_SHARE_WITH_SYSTEM = 'shareWithSystem';
    const shareWithSystem = defineAsyncApi<ShareWithSystemOptions, ShareWithSystemSuccess>(API_SHARE_WITH_SYSTEM, (args: ShareWithSystemOptions, exec: ApiExecutor<ShareWithSystemSuccess>)=>{
        const href = args.href;
        const imageUrl = args.imageUrl;
        const summary = args.summary;
        const shareRecords: systemShare.SharedRecord[] = [];
        if (href) {
            shareRecords.push({
                utd: uniformTypeDescriptor.UniformDataType.HYPERLINK,
                content: href
            } as systemShare.SharedRecord);
        }
        if (imageUrl) {
            shareRecords.push({
                utd: uniformTypeDescriptor.UniformDataType.IMAGE,
                uri: imageUrl
            } as systemShare.SharedRecord);
        }
        if (summary) {
            shareRecords.push({
                utd: uniformTypeDescriptor.UniformDataType.TEXT,
                content: summary
            } as systemShare.SharedRecord);
        }
        if (shareRecords.length === 0) {
            exec.reject('No share data');
            return;
        }
        const shareData = new systemShare.SharedData(shareRecords[0]);
        for(let index = 1; index < shareRecords.length; index++){
            shareData.addRecord(shareRecords[index]);
        }
        const shareController: systemShare.ShareController = new systemShare.ShareController(shareData);
        shareController.show(getAbilityContext9() as common3.UIAbilityContext, {} as systemShare.ShareControllerOptions);
        const onDismiss = ()=>{
            shareController.off('dismiss', onDismiss);
            exec.resolve({} as ShareWithSystemSuccess);
        };
        shareController.on('dismiss', onDismiss);
    }) as ShareWithSystem;
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
    const stores = new Map<string, dataPreferences.Preferences>();
    const createStore = (): dataPreferences.Preferences =>{
        const appId = (getCurrentMP3() as UniStorageMP).id;
        if (stores.has(appId)) {
            return stores.get(appId)!;
        }
        const store = dataPreferences.getPreferencesSync(getAbilityContext10() as common4.UIAbilityContext, {
            name: `storage.${appId}`
        } as dataPreferences.Options);
        stores.set(appId, store);
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
        try {
            createStore().put(args.key, stringifyStorageValue(args.data)).then(()=>{
                createStore().flush();
                exec.resolve({} as ESObject);
            }, (error: Error)=>{
                exec.reject(error.message);
            });
        } catch (error) {
            exec.reject((error as Error).message);
        }
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
    const API_SHOW_TAB_BAR_RED_DOT = 'showTabBarRedDot';
    const API_HIDE_TAB_BAR_RED_DOT = 'hideTabBarRedDot';
    const API_SET_TAB_BAR_BADGE = 'setTabBarBadge';
    const API_REMOVE_TAB_BAR_BADGE = 'removeTabBarBadge';
    const API_SET_TAB_BAR_ITEM = 'setTabBarItem';
    const API_SET_TAB_BAR_STYLE = 'setTabBarStyle';
    const API_SHOW_TAB_BAR = 'showTabBar';
    const API_HIDE_TAB_BAR = 'hideTabBar';
    const ShowTabBarRedDotApiProtocol = new Map<string, ProtocolOptions>([
        [
            'index',
            {
                type: 'number',
                required: true
            }
        ]
    ]);
    const HideTabBarRedDotApiProtocol = new Map<string, ProtocolOptions>([
        [
            'index',
            {
                type: 'number',
                required: true
            }
        ]
    ]);
    const SetTabBarBadgeApiProtocol = new Map<string, ProtocolOptions>([
        [
            'index',
            {
                type: 'number',
                required: true
            }
        ],
        [
            'text',
            {
                type: 'string',
                required: true
            }
        ]
    ]);
    const RemoveTabBarBadgeApiProtocol = new Map<string, ProtocolOptions>([
        [
            'index',
            {
                type: 'number',
                required: true
            }
        ]
    ]);
    const SetTabBarItemApiProtocol = new Map<string, ProtocolOptions>([
        [
            'index',
            {
                type: 'number',
                required: true
            }
        ],
        [
            'text',
            {
                type: 'string',
                required: false
            }
        ],
        [
            'iconPath',
            {
                type: 'string',
                required: false
            }
        ],
        [
            'selectedIconPath',
            {
                type: 'string',
                required: false
            }
        ],
        [
            'pagePath',
            {
                type: 'string',
                required: false
            }
        ],
        [
            'visible',
            {
                type: 'boolean',
                required: false
            }
        ],
        [
            'iconfont',
            {
                type: 'object',
                required: false
            }
        ],
        [
            'visible',
            {
                type: 'boolean',
                required: false
            }
        ]
    ]);
    const SetTabBarStyleApiProtocol = new Map<string, ProtocolOptions>([
        [
            'color',
            {
                type: 'string',
                required: false
            }
        ],
        [
            'selectedColor',
            {
                type: 'string',
                required: false
            }
        ],
        [
            'backgroundColor',
            {
                type: 'string',
                required: false
            }
        ],
        [
            'backgroundImage',
            {
                type: 'string',
                required: false
            }
        ],
        [
            'backgroundRepeat',
            {
                type: 'string',
                required: false
            }
        ],
        [
            'borderStyle',
            {
                type: 'string',
                required: false
            }
        ],
        [
            'borderColor',
            {
                type: 'string',
                required: false
            }
        ]
    ]);
    const setTabBarBadge = defineAsyncApi<SetTabBarBadgeOptions, SetTabBarBadgeSuccess>(API_SET_TAB_BAR_BADGE, (options: SetTabBarBadgeOptions, exec: ApiExecutor<SetTabBarBadgeSuccess>)=>{
        const tabBar = getTabBar() as ITabBar;
        if (tabBar === null) {
            exec.reject('tabBar is not exist');
            return;
        }
        tabBar!.setTabBarBadge(options);
        exec.resolve();
    }, SetTabBarBadgeApiProtocol);
    const removeTabBarBadge = defineAsyncApi<RemoveTabBarBadgeOptions, RemoveTabBarBadgeSuccess>(API_REMOVE_TAB_BAR_BADGE, (options: RemoveTabBarBadgeOptions, exec: ApiExecutor<RemoveTabBarBadgeSuccess>)=>{
        const tabBar = getTabBar() as ITabBar;
        if (tabBar == null) {
            exec.reject('tabBar is not exist');
            return;
        }
        tabBar!.removeTabBarBadge(options);
        exec.resolve();
    }, RemoveTabBarBadgeApiProtocol);
    const setTabBarItem = defineAsyncApi<SetTabBarItemOptions, SetTabBarItemSuccess>(API_SET_TAB_BAR_ITEM, (options: SetTabBarItemOptions, res: ApiExecutor<SetTabBarItemSuccess>)=>{
        const tabBar = getTabBar() as ITabBar;
        if (tabBar == null) {
            res.reject('tabBar is not exist');
            return;
        }
        tabBar!.setTabBarItem(options);
        res.resolve();
    }, SetTabBarItemApiProtocol);
    const setTabBarStyle = defineAsyncApi<SetTabBarStyleOptions, SetTabBarStyleSuccess>(API_SET_TAB_BAR_STYLE, (options: SetTabBarStyleOptions, exec: ApiExecutor<SetTabBarStyleSuccess>)=>{
        const tabBar = getTabBar() as ITabBar;
        if (tabBar == null) {
            exec.reject('tabBar is not exist');
            return;
        }
        tabBar!.setTabBarStyle(options);
        exec.resolve();
    }, SetTabBarStyleApiProtocol);
    const hideTabBar = defineAsyncApi<HideTabBarOptions, HideTabBarSuccess>(API_HIDE_TAB_BAR, (options: HideTabBarOptions | null, exec: ApiExecutor<HideTabBarSuccess>)=>{
        const tabBar = getTabBar() as ITabBar;
        if (tabBar == null) {
            exec.reject('tabBar is not exist');
            return;
        }
        tabBar!.hideTabBar();
        exec.resolve();
    });
    const showTabBar = defineAsyncApi<ShowTabBarOptions, ShowTabBarSuccess>(API_SHOW_TAB_BAR, (options: ShowTabBarOptions, exec: ApiExecutor<ShowTabBarSuccess>)=>{
        const tabBar = getTabBar() as ITabBar;
        if (tabBar == null) {
            exec.reject('tabBar is not exist');
            return;
        }
        tabBar!.showTabBar();
        exec.resolve();
    });
    const showTabBarRedDot = defineAsyncApi<ShowTabBarRedDotOptions, ShowTabBarRedDotSuccess>(API_SHOW_TAB_BAR_RED_DOT, (options: ShowTabBarRedDotOptions, exec: ApiExecutor<ShowTabBarRedDotSuccess>)=>{
        const tabBar = getTabBar() as ITabBar;
        if (tabBar == null) {
            exec.reject('tabBar is not exist');
            return;
        }
        tabBar!.showTabBarRedDot(options);
        exec.resolve();
    }, ShowTabBarRedDotApiProtocol);
    const hideTabBarRedDot = defineAsyncApi<HideTabBarRedDotOptions, HideTabBarRedDotSuccess>(API_HIDE_TAB_BAR_RED_DOT, (options: HideTabBarRedDotOptions, exec: ApiExecutor<HideTabBarRedDotSuccess>)=>{
        const tabBar = getTabBar() as ITabBar;
        if (tabBar == null) {
            exec.reject('tabBar is not exist');
            return;
        }
        tabBar!.hideTabBarRedDot(options);
        exec.resolve();
    }, HideTabBarRedDotApiProtocol);
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
    const API_SEND_SOCKET_MESSAGE = 'sendSocketMessage';
    const API_CLOSE_SOCKET = 'closeSocket';
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
    const GlobalWebsocketEmitter = new Emitter5() as IUniWebsocketEmitter;
    const destroySocketTaskEmitter = (emitter: IUniWebsocketEmitter)=>{
        emitter.off('message');
        emitter.off('open');
        emitter.off('error');
        emitter.off('close');
    };
    class SocketTask1 implements SocketTask {
        _destroy: Function;
        private _ws: webSocket.WebSocket;
        private _emitter: IUniWebsocketEmitter = new Emitter5() as IUniWebsocketEmitter;
        constructor(ws: webSocket.WebSocket){
            const mp = getCurrentMP4() as UniWebsocketMP;
            this._ws = ws;
            this._ws.on('message', (_, data)=>{
                const message = {
                    data
                } as OnSocketMessageCallbackResult;
                this._emitter.emit('message', message);
                const socketTasks = getSocketTasks(mp.id);
                if (this === socketTasks[0]) {
                    GlobalWebsocketEmitter.emit('message', message);
                }
            });
            this._ws.on('open', (_, data)=>{
                this._emitter.emit('open', data);
                const socketTasks = getSocketTasks(mp.id);
                if (this === socketTasks[0]) {
                    GlobalWebsocketEmitter.emit('open', data);
                }
            });
            this._ws.on('error', (error)=>{
                const message = {
                    errMsg: error.message
                } as OnSocketErrorCallbackResult;
                this._emitter.emit('error', message);
                const socketTasks = getSocketTasks(mp.id);
                if (this === socketTasks[0]) {
                    GlobalWebsocketEmitter.emit('error', message);
                }
            });
            this._ws.on('close', (_, data)=>{
                this._emitter.emit('close', data);
                const socketTasks = getSocketTasks(mp.id);
                if (this === socketTasks[0]) {
                    GlobalWebsocketEmitter.emit('close', data);
                }
                const index = socketTasks.indexOf(this);
                if (index >= 0) {
                    socketTasks.splice(index, 1);
                }
            });
            this._destroy = ()=>{
                destroySocketTaskEmitter(this._emitter);
                this.close();
            };
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
                    tryExec(options?.success, {} as GeneralCallbackResult);
                } else {
                    tryExec(options?.fail, new UniError('close socket failed'));
                }
            }, (err: Error)=>{
                tryExec(options?.fail, new UniError(err.message));
            });
        }
        onMessage(callback: Function) {
            this._emitter.on('message', callback);
        }
        onOpen(callback: Function) {
            this._emitter.on('open', callback);
        }
        onError(callback: Function) {
            this._emitter.on('error', callback);
        }
        onClose(callback: Function) {
            this._emitter.on('close', callback);
            destroySocketTaskEmitter(this._emitter);
        }
    }
    const socketTasksMap: Map<string, SocketTask1[]> = new Map();
    const addSocketTask = (task: SocketTask1)=>{
        const mp = getCurrentMP4() as UniWebsocketMP;
        mp.on('beforeClose', task._destroy);
        task.onClose(()=>{
            mp.off('beforeClose', task._destroy);
        });
        const id = mp.id;
        if (!socketTasksMap.has(id)) {
            socketTasksMap.set(id, []);
        }
        const socketTasks = socketTasksMap.get(id) as SocketTask1[];
        socketTasks.push(task);
    };
    const getSocketTasks = (id: string | null = null)=>{
        if (!id) {
            const mp = getCurrentMP4() as UniWebsocketMP;
            id = mp.id;
        }
        return socketTasksMap.get(id) || [];
    };
    const connectSocket = defineTaskApi<ConnectSocketOptions, ConnectSocketSuccess, SocketTask>(API_CONNECT_SOCKET, (args: ConnectSocketOptions, exec: ApiExecutor<ConnectSocketSuccess>)=>{
        const ws = webSocket.createWebSocket();
        const mp = getCurrentMP4() as UniWebsocketMP;
        ws.connect(args.url, {
            header: args.header ? args.header as Object : undefined,
            protocol: args.protocols ? Array.isArray(args.protocols) ? args.protocols.join(',') : args.protocols : ''
        } as webSocket.WebSocketRequestOptions);
        const task = new SocketTask1(ws);
        mp.on('beforeClose', task._destroy);
        task.onClose(()=>{
            mp.off('beforeClose', task._destroy);
        });
        addSocketTask(task);
        return task;
    }, ConnectSocketApiProtocol, ConnectSocketApiOptions) as ConnectSocket;
    const onSocketMessage: OnSocketMessage = (callback: Function)=>{
        GlobalWebsocketEmitter.on('message', callback);
    };
    const onSocketOpen: OnSocketOpen = (callback: Function)=>{
        GlobalWebsocketEmitter.on('open', callback);
    };
    const onSocketError: OnSocketError = (callback: Function)=>{
        GlobalWebsocketEmitter.on('error', callback);
    };
    const onSocketClose: OnSocketClose = (callback: Function)=>{
        GlobalWebsocketEmitter.on('close', callback);
    };
    const sendSocketMessage = defineAsyncApi<SendSocketMessageOptions, GeneralCallbackResult>(API_SEND_SOCKET_MESSAGE, (args: SendSocketMessageOptions, exec: ApiExecutor<GeneralCallbackResult>)=>{
        const socketTasks = getSocketTasks();
        const task = socketTasks[0];
        if (task) {
            task.send({
                data: args.data,
                success (res) {
                    exec.resolve(res);
                },
                fail (err) {
                    exec.reject('sendSocketMessage:fail');
                }
            } as SendSocketMessageOptions);
        } else {
            exec.reject('WebSocket is not connected');
        }
    }) as SendSocketMessage;
    const closeSocket = defineAsyncApi<CloseSocketOptions, GeneralCallbackResult>(API_CLOSE_SOCKET, (args: CloseSocketOptions, exec: ApiExecutor<GeneralCallbackResult>)=>{
        const socketTasks = getSocketTasks();
        const task = socketTasks[0];
        if (task) {
            task.close({
                code: args.code,
                reason: args.reason,
                success (res) {
                    exec.resolve(res);
                },
                fail (err) {
                    exec.reject('closeSocket:fail');
                }
            } as CloseSocketOptions);
        } else {
            exec.reject('WebSocket is not connected');
        }
    }) as CloseSocket;
    return {
        addPhoneContact,
        startSoterAuthentication,
        checkIsSupportSoterAuthentication,
        checkIsSoterEnrolledInDevice,
        getClipboardData,
        setClipboardData,
        createInnerAudioContext,
        $on,
        $once,
        $off,
        $emit,
        exit,
        saveFile,
        getSavedFileList,
        getSavedFileInfo,
        removeSavedFile,
        getFileInfo,
        getAppAuthorizeSetting,
        getAppBaseInfo,
        getBackgroundAudioManager,
        getDeviceInfo,
        getNetworkType,
        onNetworkStatusChange,
        offNetworkStatusChange,
        getProvider,
        getProviderSync,
        getRecorderManager,
        getSystemInfo,
        getSystemInfoSync,
        getWindowInfo,
        getSystemSetting,
        hideKeyboard,
        makePhoneCall,
        chooseImage,
        previewImage,
        closePreviewImage,
        getImageInfo,
        saveImageToPhotosAlbum,
        compressImage,
        chooseVideo,
        saveVideoToPhotosAlbum,
        getVideoInfo,
        compressVideo,
        chooseFile,
        chooseMedia,
        request,
        uploadFile,
        downloadFile,
        login,
        getUserInfo,
        openAppAuthorizeSetting,
        openDocument,
        requestPayment,
        showToast,
        hideToast,
        showLoading,
        hideLoading,
        showModal,
        showActionSheet,
        startPullDownRefresh,
        stopPullDownRefresh,
        rpx2px,
        scanCode,
        shareWithSystem,
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
        showTabBarRedDot,
        hideTabBarRedDot,
        setTabBarBadge,
        removeTabBarBadge,
        setTabBarItem,
        setTabBarStyle,
        showTabBar,
        hideTabBar,
        connectSocket,
        sendSocketMessage,
        closeSocket,
        onSocketOpen,
        onSocketMessage,
        onSocketClose,
        onSocketError
    } as UniExtApi;
}
