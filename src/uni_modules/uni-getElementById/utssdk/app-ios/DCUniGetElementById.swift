//
//  DCUni.swift
//  DCloudUniappRuntime
//
//  Created by DCloud-iOS-XHY on 2024/7/8.
//

import DCloudUniappRuntime

public class DCUniGetElementById {
    /// 返回一个匹配特定 ID 的元素， 如果不存在，返回 null 规则同 https://doc.dcloud.net.cn/uni-app-x/api/get-element.html#getelementbyid
    public static func getElementById(_ id: String) -> UniElement? {
        let appManager = UniSDKEngine.self.getAppManager()
        if let app = appManager.getCurrentApp(),
           let pageManager = app.pageManager as? UniPageManagerImpl,
           let page = pageManager.getTopPage(),
           let domManager = page.document as? UniDomManager {
            return domManager.getElementById(id)
        }
        return nil
    }
}
