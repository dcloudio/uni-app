import UIKit;
typealias GetBatteryInfoOptions = {
    var success?: (_ res: UTSJSONObject) -> Void;
    var fail?: (_ res: UTSJSONObject) -> Void;
    var complete?: (_ res: UTSJSONObject) -> Void;
};
async func getBatteryInfo(_ options: GetBatteryInfoOptions) {
    var res = [
        "errMsg": "getBatteryInfo:ok",
        "level": UIDevice.current.batteryLevel * 100,
        "isCharging": UIDevice.current.batteryState == UIDevice.BatteryState.charging
    ];
    if (options.success != nil) options.success!(res);
    if (options.complete != nil) options.complete!(res);
}
class Test : NSObject {
}
