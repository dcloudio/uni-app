//
//  UniWebComponentRegister.swift
//
//  Created by Fred on 2025/11/17.
//

import Foundation
import DCloudUniappRuntime

@objc(UniWebComponentRegister)
@objcMembers
public class UniWebComponentRegister : NSObject {
    public static func registerComponent() {
        UniSDKEngine.shared.registerUniComponent(type: "uni-web-view-element", nodeClazz: UniWebViewElementImpl.constructor, componentCls: UniViewComponent.self);
        UniSDKEngine.shared.registerExtComponent(type: "uni-web-view-element");
    }
}