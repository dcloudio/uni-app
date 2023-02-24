import DCloudUTSFoundation;
func test() -> String {
    return "1";
}
@objc(UTSSDKModulesTestUtsIndexSwift)
@objcMembers
class IndexSwift : NSObject {
    public static func s_test() -> String {
        return test();
    }
}
