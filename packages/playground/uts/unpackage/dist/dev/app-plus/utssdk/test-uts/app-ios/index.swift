import DCloudUTSFoundation;
public func test() -> String {
    return "1";
}
@objc(UTSSDKModulesTestUtsIndexSwift)
@objcMembers
public class IndexSwift : NSObject {
    public static func s_test() -> String {
        return test();
    }
}
public func testWithJSON() -> String {
    return test();
}
