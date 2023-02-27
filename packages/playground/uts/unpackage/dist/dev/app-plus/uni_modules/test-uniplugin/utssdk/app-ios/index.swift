import DCloudUTSExtAPI;
import DCloudUTSFoundation;
public var uni_showToast = DCloudUTSExtAPI.showToast;
public var uni_showModel = DCloudUTSExtAPI.showModel;
typealias ShowToast = (_ msg: String) -> Void;
import UIKit;
import CoreLocation;
@objc(UTSSDKModulesTestUniPluginGetBatteryInfoOptions)
@objcMembers
public class GetBatteryInfoOptions : NSObject {
    public var name: String!;
    public var pwd: NSNumber!;
    public var success: UTSCallback?;
    public var fail: UTSCallback?;
    public var complete: UTSCallback?;
}
public func getBatteryInfo(_ options: GetBatteryInfoOptions) {
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
public func test1(_ callback: UTSCallback) -> String {
    console.log(UTSJSONObject([
        "a": "b"
    ]), " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:33");
    console.log("test1", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:34");
    console.log("def ios", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:39");
    console.log("ndef android", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:42");
    console.log("def android || def ios", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:48");
    console.log(CLLocationManager, CLAuthorizationStatus, " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:53");
    var a = -3;
    console.log(~a, " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:55");
    return "test1";
}
@objc
@objcMembers
public class Test1 : NSObject {
}
@objc(UTSSDKModulesTestUniPluginTest)
@objcMembers
public class Test : NSObject {
    public init(){
        Test1();
    }
    public func test() -> String? {
        #if swift(>=1)
            console.log("swift(>=1)", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:66");
        #endif
        #if arch(i386) || arch(arm)
            console.log("arch(i386) || arch(arm)", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:69");
        #endif
        if #available(iOS 14, macOS 11.0, *) {
            console.log("iOS 14, macOS 11.0, *", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:72");
        } else {
            if #available(iOS 13,*) {
                console.log("iOS 13,*", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:74");
            } else {
                if #unavailable(tvOS 12) {
                    console.log("tvOS 12", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:76");
                }
            }
        }
        return nil;
    }
}
@available(iOS 13.0.0, *)
public func testAsync() async -> UTSJSONObject {
    uni_showToast();
    uni_showToast();
    uni_showModel();
    return UTSJSONObject([
        "a": 1
    ]);
}
public var showToast1: ShowToast = {
(_ msg) in
};
public var showToast2: ShowToast = {
(_ msg) in
};
public var showToast3: ShowToast = {
(_ msg) in
};
@objc(UTSSDKModulesTestUniPluginIndexSwift)
@objcMembers
public class IndexSwift : NSObject {
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
    public static func s_showToast1(_ msg: String) {
        return showToast1(msg);
    }
    public static func s_showToast2(_ msg: String) {
        return showToast2(msg);
    }
    public static func s_showToast3(_ msg: String) {
        return showToast3(msg);
    }
}
