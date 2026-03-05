//
//  UniLoadingComponentRegister.swift
//
//  Created by Fred on 2025/12/15.
//

import Foundation
import DCloudUniappRuntime

@objc(UniLoadingComponentRegister)
@objcMembers
public class UniLoadingComponentRegister : NSObject {
    public static func registerComponent() {
        UniSDKEngine.shared.registerUniComponent(type: "uni-loading-element", nodeClazz: UniLoadingElement.constructor, componentCls: UniViewComponent.self);
        UniSDKEngine.shared.registerExtComponent(type: "uni-loading-element");
    }
}