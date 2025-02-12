import { CLLocationManager, CLAuthorizationStatus } from 'CoreLocation';
import { UIDevice } from 'UIKit';
type ShowToast = (msg: string) => void;
class GetBatteryInfoOptions extends UTSObject {
    name!: string;
    pwd!: number;
    success: ((res: UTSJSONObject) => void) | null = null;
    fail: ((res: UTSJSONObject) => void) | null = null;
    complete: ((res: UTSJSONObject) => void) | null = null;
}
function getBatteryInfo(options: GetBatteryInfoOptions) {
    new UIAlertController(title = title, message = message, preferredStyle = UIAlertController.Style.alert);
    const res = new UTSJSONObject({
        errMsg: 'getBatteryInfo:ok',
        level: UIDevice.current.batteryLevel * 100,
        isCharging: UIDevice.current.batteryState == UIDevice.BatteryState.charging
    });
    if (options.success != null) {
        options.success!(res);
    }
    if (options.complete != null) {
        options.complete!(res);
    }
}
function test1(callback: () => void): string {
    uni.__log__("log", new UTSJSONObject({
        "a": "b"
    }), " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:33");
    uni.__log__("log", 'test1', " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:34");
    uni.__log__("log", 'ndef android', " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:42");
    uni.__log__("log", 'ndef ios', " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:45");
    uni.__log__("log", CLLocationManager, CLAuthorizationStatus, " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:53");
    const a = -3;
    uni.__log__("log", ~a, " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:55");
    return 'test1';
}
class Test1 {
}
class Test {
    constructor(){
        new Test1();
    }
    test(): string | null {
        if (UTSiOS.macros("swift(>=1)")) {
            uni.__log__("log", "swift(>=1)", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:66");
        }
        if (UTSiOS.macros("arch(i386) || arch(arm)")) {
            uni.__log__("log", "arch(i386) || arch(arm)", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:69");
        }
        if (UTSiOS.available("iOS 14, macOS 11.0, *")) {
            uni.__log__("log", "iOS 14, macOS 11.0, *", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:72");
        } else if (UTSiOS.available("iOS 13,*")) {
            uni.__log__("log", "iOS 13,*", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:74");
        } else if (UTSiOS.unavailable("tvOS 12")) {
            uni.__log__("log", "tvOS 12", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:76");
        }
        return null;
    }
}
async function testAsync() {
    uni.showToast();
    uni.showToast();
    uni.showModel();
    return {
        a: 1
    };
}
const showToast1: ShowToast = (msg)=>{};
const showToast2: ShowToast = (msg)=>{};
const showToast3: ShowToast = (msg)=>{};
export { getBatteryInfo as default };
export { test1 as test1 };
export { Test as Test };
export { testAsync as testAsync };
export { showToast1 as showToast1 };
export { showToast2 as showToast2 };
export { showToast3 as showToast3 };
