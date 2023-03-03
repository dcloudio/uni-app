import DCloudUTSFoundation;
public func test() {}
public func testByJs() {
    return test();
}
@objc(UTSSDKModulesTestUtsIndexSwift)
@objcMembers
public class IndexSwift : NSObject {
    public static func s_testByJs() {
        return testByJs();
    }
}
