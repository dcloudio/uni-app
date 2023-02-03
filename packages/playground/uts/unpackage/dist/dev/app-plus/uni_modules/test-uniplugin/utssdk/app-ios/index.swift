import DCloudUTSFoundation;
import UIKit;
import CoreLocation;
@objc(UTSSDKModulesTestUniPluginGetBatteryInfoOptions)
@objcMembers
class GetBatteryInfoOptions : NSObject {
    public var name: String!;
    public var pwd: NSNumber!;
    public var success: UTSCallback?;
    public var fail: UTSCallback?;
    public var complete: UTSCallback?;
}
func getBatteryInfo(_ options: GetBatteryInfoOptions) {
    UIAlertController(title: title, message: message, preferredStyle: UIAlertController.Style.alert);
    var res = UTSJSONObject([
        "errMsg": "getBatteryInfo:ok",
        "level": UIDevice.current.batteryLevel * 100,
        "isCharging": UIDevice.current.batteryState == UIDevice.BatteryState.charging
    ]);
    if (options.success != nil) {
        options.success!(res);
    }
    if (options.complete != nil) {
        options.complete!(res);
    }
}
func test1(_ callback: UTSCallback) -> String {
    console.log(UTSJSONObject([
        "a": "b"
    ]), " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:32");
    console.log("test1", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:33");
    console.log("def ios", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:38");
    console.log("ndef android", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:41");
    console.log("def android || def ios", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:47");
    console.log(CLLocationManager, CLAuthorizationStatus, " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:52");
    var a = -3;
    console.log(~a, " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:54");
    return "test1";
}
@objc
@objcMembers
class Test1 : NSObject {
}
@objc(UTSSDKModulesTestUniPluginTest)
@objcMembers
class Test : NSObject {
    public init(){
        Test1();
    }
    public func test() -> String? {
        #if swift(>=1)
            console.log("swift(>=1)", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:65");
        #endif
        #if arch(i386) || arch(arm)
            console.log("arch(i386) || arch(arm)", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:68");
        #endif
        return nil;
    }
}
@available(iOS 13.0.0, *)
func testAsync() async -> UTSJSONObject {
    return UTSJSONObject([
        "a": 1
    ]);
}
@objc(UTSSDKModulesTestUniPluginIndexSwift)
@objcMembers
class IndexSwift : NSObject {
    public static func s_getBatteryInfo(_ options: GetBatteryInfoOptions) {
        return getBatteryInfo(options);
    }
    public static func s_test1(_ callback: UTSCallback) -> String {
        return test1(callback);
    }
    @available(iOS 13.0.0, *)
    public static func s_testAsync() async -> UTSJSONObject {
        return await testAsync();
    }
}
