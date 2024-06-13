import CoreLocation;
import DCloudUTSFoundation;
import UIKit;
import DCloudUTSExtAPI;
public typealias ShowToast = (_ msg: String) -> Void;
@objc(UTSSDKModulesTestUniPluginGetBatteryInfoOptions)
@objcMembers
public class GetBatteryInfoOptions : NSObject, UTSObject, IUTSSourceMap {
    public func __$getOriginalPosition() -> UTSSourceMapPosition? {
        return UTSSourceMapPosition("GetBatteryInfoOptions", "uni_modules/test-uniplugin/utssdk/app-ios/index.uts", 5, 6);
    }
    public var name: String!;
    public var pwd: NSNumber!;
    public var success: ((_ res: UTSJSONObject) -> Void)?;
    public var fail: ((_ res: UTSJSONObject) -> Void)?;
    public var complete: ((_ res: UTSJSONObject) -> Void)?;
    public subscript(_ key: String) -> Any? {
        get {
            return utsSubscriptGetValue(key);
        }
        set {
            switch(key){
                case "name":
                    self.name = try! utsSubscriptCheckValue(newValue);
                case "pwd":
                    self.pwd = try! utsSubscriptCheckValue(newValue);
                case "success":
                    self.success = try! utsSubscriptCheckValueIfPresent(newValue);
                case "fail":
                    self.fail = try! utsSubscriptCheckValueIfPresent(newValue);
                case "complete":
                    self.complete = try! utsSubscriptCheckValueIfPresent(newValue);
                default:
                    break;
            }
        }
    }
    public override init() {
        super.init();
    }
    public init(_ obj: UTSJSONObject) {
        self.name = obj["name"] as! String;
        self.pwd = obj["pwd"] as! NSNumber;
        self.success = obj["success"] as! ((_ res: UTSJSONObject) -> Void)?;
        self.fail = obj["fail"] as! ((_ res: UTSJSONObject) -> Void)?;
        self.complete = obj["complete"] as! ((_ res: UTSJSONObject) -> Void)?;
    }
}
public func getBatteryInfo(_ options: GetBatteryInfoOptions) {
    UIAlertController(title: title, message: message, preferredStyle: UIAlertController.Style.alert);
    var res = UTSJSONObject([
        "errMsg": "getBatteryInfo:ok",
        "level": UIDevice.current.batteryLevel * 100,
        "isCharging": UIDevice.current.batteryState == UIDevice.BatteryState.charging
    ], UTSSourceMapPosition("res", "uni_modules/test-uniplugin/utssdk/app-ios/index.uts", 19, 9));
    if (options.success != nil) {
        options.success!(res);
    }
    if (options.complete != nil) {
        options.complete!(res);
    }
}
public func test1(_ callback:@escaping () -> Void) -> String {
    console.log(UTSJSONObject([
        "a": "b"
    ]), " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:33");
    console.log("test1", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:34");
    console.log("def ios", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:39");
    console.log("ndef android", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:42");
    console.log("def android || def ios", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:48");
    console.log(CLLocationManager, CLAuthorizationStatus, " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:53");
    var a: NSNumber = -3;
    console.log(~a, " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:55");
    return "test1";
}
@objc(UTSSDKModulesTestUniPluginTest1)
@objcMembers
public class Test1 : NSObject, IUTSSourceMap {
    public func __$getOriginalPosition() -> UTSSourceMapPosition? {
        return UTSSourceMapPosition("Test1", "uni_modules/test-uniplugin/utssdk/app-ios/index.uts", 59, 7);
    }
}
@objc(UTSSDKModulesTestUniPluginTest)
@objcMembers
public class Test : NSObject, IUTSSourceMap {
    public func __$getOriginalPosition() -> UTSSourceMapPosition? {
        return UTSSourceMapPosition("Test", "uni_modules/test-uniplugin/utssdk/app-ios/index.uts", 60, 14);
    }
    override public init(){
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
        } else if #available(iOS 13,*) {
            console.log("iOS 13,*", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:74");
        } else if #unavailable(tvOS 12) {
            console.log("tvOS 12", " at uni_modules/test-uniplugin/utssdk/app-ios/index.uts:76");
        }
        return nil;
    }
}
@available(iOS 13.0.0, *)
public func testAsync() async -> UTSJSONObject {
    DCloudUTSExtAPI.showToast();
    DCloudUTSExtAPI.showToast();
    DCloudUTSExtAPI.showModel();
    return UTSJSONObject([
        "a": 1 as NSNumber
    ]);
}
public var showToast1: ShowToast = {
(_ msg) -> Void in
};
public var showToast2: ShowToast = {
(_ msg) -> Void in
};
public var showToast3: ShowToast = {
(_ msg) -> Void in
};
@objc(UTSSDKModulesTestUniPluginGetBatteryInfoOptionsJSONObject)
@objcMembers
public class GetBatteryInfoOptionsJSONObject : NSObject {
    public var name: String!;
    public var pwd: NSNumber!;
    public var success: UTSCallback?;
    public var fail: UTSCallback?;
    public var complete: UTSCallback?;
}
public func getBatteryInfoByJs(_ options: GetBatteryInfoOptionsJSONObject) {
    return getBatteryInfo(GetBatteryInfoOptions(UTSJSONObject([
        "name": options.name,
        "pwd": options.pwd,
        "success": {
        (res: UTSJSONObject) -> Void in
        options.success?(res);
        },
        "fail": {
        (res: UTSJSONObject) -> Void in
        options.fail?(res);
        },
        "complete": {
        (res: UTSJSONObject) -> Void in
        options.complete?(res);
        }
    ])));
}
public func test1ByJs(_ callback: UTSCallback) -> String {
    return test1({
    () -> Void in
    callback();
    });
}
@objc(UTSSDKModulesTestUniPluginTestByJs)
@objcMembers
public class TestByJs : Test {
    public func testByJs() -> String? {
        return test();
    }
}
@available(iOS 13.0.0, *)
public func testAsyncByJs() async -> UTSJSONObject {
    return await testAsync();
}
public func showToast1ByJs(_ msg: String) -> Void {
    return showToast1(msg);
}
public func showToast2ByJs(_ msg: String) -> Void {
    return showToast2(msg);
}
public func showToast3ByJs(_ msg: String) -> Void {
    return showToast3(msg);
}
@objc(UTSSDKModulesTestUniPluginIndexSwift)
@objcMembers
public class UTSSDKModulesTestUniPluginIndexSwift : NSObject {
    public static func s_getBatteryInfoByJs(_ options: GetBatteryInfoOptionsJSONObject) {
        return getBatteryInfoByJs(options);
    }
    public static func s_test1ByJs(_ callback: UTSCallback) -> String {
        return test1ByJs(callback);
    }
    @available(iOS 13.0.0, *)
    public static func s_testAsyncByJs() async -> UTSJSONObject {
        return await testAsyncByJs();
    }
    public static func s_showToast1ByJs(_ msg: String) -> Void {
        return showToast1ByJs(msg);
    }
    public static func s_showToast2ByJs(_ msg: String) -> Void {
        return showToast2ByJs(msg);
    }
    public static func s_showToast3ByJs(_ msg: String) -> Void {
        return showToast3ByJs(msg);
    }
}
