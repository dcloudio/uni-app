import Foundation;
@objcMembers
class TestModuleImpl : NSObject {
    func testAsyncFunc(_ option: NSDictionary, _ callback: UniModuleKeepAliveCallback) {
        console.log(option);
        callback("success", false);
    }
    func testSyncFunc(_ option: NSDictionary) -> String {
        console.log(option);
        return "";
    }
}
