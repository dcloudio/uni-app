import DCUTSPlugin;
import UIKit;
class GetBatteryInfoOptions : UTSJSONObject {
    var name: String;
    var pwd: NSNumber;
    var success: UTSCallback?;
    var fail: UTSCallback?;
    var complete: UTSCallback?;
    init(_ name: String, _ pwd: NSNumber, _ success: UTSCallback, _ fail: UTSCallback, _ complete: UTSCallback){
        self.name = name;
        self.pwd = pwd;
        self.success = success;
        self.fail = fail;
        self.complete = complete;
    }
}
class Test1 : NSObject {
}
class Test : NSObject {
    init(){
        Test1();
    }
}
@objc(UTSSDKModulesTestUniPluginIndexSwift)
@objcMembers
class IndexSwift : NSObject {
    static func async getBatteryInfo(_ options: GetBatteryInfoOptions) {
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
    static func test1() {
        console.log("test1", " at uni_modules/test-uniplugin/app-ios/index.uts:26");
    }
}
