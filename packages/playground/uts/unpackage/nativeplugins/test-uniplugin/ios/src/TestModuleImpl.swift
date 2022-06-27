@objcMembers
class TestModuleImpl : NSObject {
    func testAsyncFunc(option: NSDictionary, callback: UniModuleKeepAliveCallback) {
        console.log(option);
        callback("success", false);
    }
    func testSyncFunc(option: NSDictionary) -> String {
        console.log(option);
        return "";
    }
}
