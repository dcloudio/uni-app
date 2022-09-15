import DCUTSPlugin;
import UIKit;
class GetBatteryInfoOptions : UTSJSONObject {
    var success: UTSCallback?;
    var fail: UTSCallback?;
    var complete: UTSCallback?;
    init(_ success: UTSCallback, _ fail: UTSCallback, _ complete: UTSCallback){
        self.success = success;
        self.fail = fail;
        self.complete = complete;
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
        if (options.success != nil) options.success!(res);
        if (options.complete != nil) options.complete!(res);
    }
}
