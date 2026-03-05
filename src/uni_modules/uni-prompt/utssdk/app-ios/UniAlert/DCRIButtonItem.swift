//
//  DCRIButtonItem.swift
//  DCloudAlertController
//
//  Created by lizhongyi on 2023/3/7.
//

import Foundation
import UIKit

public class DCRIButtonItem: NSObject {
    var label: String?
    var action: (() -> Void)?
    var labelColor: UIColor?
    
    public static func item() -> DCRIButtonItem {
        return DCRIButtonItem()
    }
    
    public static func itemWithLabel(_ inLabel: String) -> DCRIButtonItem {
        let newItem = item()
        newItem.label = inLabel
        return newItem
    }
    
    public static func itemWithLabel(_ inLabel: String, _ labelColor: UIColor? = nil, inAction action: (@escaping () ->Void)) -> DCRIButtonItem {
        let newItem = itemWithLabel(inLabel)
        newItem.action = action
        newItem.labelColor = labelColor
        return newItem
    }
}

