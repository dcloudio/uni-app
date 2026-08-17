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
        return UniSDKEngine.getElementById(id)
    }
}
