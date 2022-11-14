import DCUTSPlugin;
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
    console.log("test1", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:27");
    console.log("def ios", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:32");
    console.log("ndef android", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:35");
    console.log("def android || def ios", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:41");
    console.log(CLLocationManager, CLAuthorizationStatus, " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:46");
    return "test1";
}
class Test1 : NSObject {
}
@objc(UTSSDKModulesTestUniPluginTest)
@objcMembers
class Test : NSObject {
    public init(){
        Test1();
    }
    public func test() -> String? {
        return nil;
    }
}
@available(iOS 13.0.0, *)
func testAsync() async  -> UTSJSONObject {
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
    public static func s_testAsync() async  -> UTSJSONObject {
        return await testAsync();
    }
}
