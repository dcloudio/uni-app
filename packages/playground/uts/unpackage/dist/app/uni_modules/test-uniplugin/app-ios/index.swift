import DCUTSPlugin;
import UIKit;
@objc(UTSSDKModulesTestUniPluginGetBatteryInfoOptions)
@objcMembers
class GetBatteryInfoOptions : UTSJSONObject {
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
    console.log("test1", " at uni_modules/test-uniplugin/app-ios/index.uts:26");
    console.log("def ios", " at uni_modules/test-uniplugin/app-ios/index.uts:31");
    console.log("ndef android", " at uni_modules/test-uniplugin/app-ios/index.uts:34");
    console.log("def android || def ios", " at uni_modules/test-uniplugin/app-ios/index.uts:40");
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
async func testAsync() -> Deferred<UTSJSONObject> {
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
    public static func async s_testAsync() -> Deferred<UTSJSONObject> {
        return testAsync();
    }
}
