@objc(TestSwiftModule)
class TestSwiftModule : DCUniModule {
    @objc
    public static func wx_export_method_0() -> String {
        return "testAsyncFunc::";
    }
    @objc
    func testAsyncFunc(_ options: NSDictionary, _ callback: UniModuleKeepAliveCallback?) {
        print(options);
        if (callback != nil) {
            callback!("success", false);
        }
    }
    @objc
    public static func wx_export_method_sync_0() -> String {
        return "testSyncFunc:";
    }
    @objc
    func testSyncFunc(_ options: NSDictionary) -> String {
        print(options);
        return getSomeString();
    }
    func getSomeString() -> String {
        return "getSomeString success";
    }
}
