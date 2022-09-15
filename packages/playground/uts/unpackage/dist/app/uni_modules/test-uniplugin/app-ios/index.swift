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
class Test1 : NSObject {
}
class Test : NSObject {
    public init(){
        Test1();
    }
}
@objc(UTSSDKModulesTestUniPluginIndexSwift)
@objcMembers
class IndexSwift : NSObject {
    public static func getBatteryInfo(_ options: GetBatteryInfoOptions) {
        var res = [
            "errMsg": "getBatteryInfo:ok",
            "level": UIDevice.current.batteryLevel * 100,
            "isCharging": UIDevice.current.batteryState == UIDevice.BatteryState.charging
        ] as [String: Any];
        if (options.success != nil) {
            options.success!(res);
        }
        if (options.complete != nil) {
            options.complete!(res);
        }
    }
    public static func test1() {
        console.log("test1", " at uni_modules/test-uniplugin/app-ios/index.uts:26");
    }
}
