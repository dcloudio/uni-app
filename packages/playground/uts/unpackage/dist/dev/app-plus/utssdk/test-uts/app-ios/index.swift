import DCloudUTSFoundation
public func test() -> String {
    return "1"
}
public func testByJs() -> String {
    return test()
}
@objc(UTSSDKModulesTestUtsIndexSwift)
@objcMembers
public class UTSSDKModulesTestUtsIndexSwift : NSObject {
    public static func s_testByJs() -> String {
        return testByJs()
    }
}
