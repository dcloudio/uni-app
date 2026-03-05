//
//  DCAlertView.Blocks.swift
//  DCloudAlertController
//
//  Created by lizhongyi on 2023/3/10.
//

import Foundation
import UIKit

public typealias DCAlertView = DCAlertViewController

public extension DCAlertView {
    //  MARK: - show && dismiss
        
      func show()  {
        if self.presentingViewController != nil {
            return
        }
        if let topVC = DCAlertControllerUtil.topViewController() {
            if topVC is DCAlertViewController {
                if let presentViewController = topVC.presentingViewController{
                    topVC.dismiss(animated: true) {
                        presentViewController.present(self, animated: true)
                    }
                }
                return
            }
            topVC.present(self, animated: true) {

            }
            
        }
     }

     func dismiss() {
        self.dismiss(animated: true)
     }
    
     static func alertView(_ title: String,
                           _ doneItem: DCRIButtonItem,
                           _ preferredStyle: DCAlertViewControllerStyle = .alert,
                           _ placeholder: String = "") -> DCAlertView {
        
        let alert = DCAlertView.init(title, nil, preferredStyle, placeholder)
        let action = DCAlertAction.init(title: doneItem.label ?? "", style: .destructiveStyle) { action in
            doneItem.action?()
        }
        action.titleColor = doneItem.labelColor
        alert.addAction(action)
        return alert
    }
    
    static func alertView(_ title: String?,
                          _ cancelItem: DCRIButtonItem,
                          _ doneItem: DCRIButtonItem,
                          _ preferredStyle: DCAlertViewControllerStyle = .alert,
                          _ placeholder: String = "") -> DCAlertView {
        
        let alert = DCAlertView.init(title, nil, preferredStyle, placeholder)
        
        let cancelAction = DCAlertAction.init(title: cancelItem.label ?? "", style: .cancelStyle) { action in
            cancelItem.action?()
        }
        cancelAction.titleColor = cancelItem.labelColor
        let doneAction = DCAlertAction.init(title: doneItem.label ?? "", style: .preferredStyle) { action in
            doneItem.action?()
        }
        doneAction.titleColor = doneItem.labelColor
        alert.addAction(cancelAction)
        alert.addAction(doneAction)
        return alert
    }
    
    static func alertView(_ title: String?,
                          _ subTitle: String?,
                          _ doneItem: DCRIButtonItem,
                          _ preferredStyle: DCAlertViewControllerStyle = .alert,
                          _ placeholder: String = "") -> DCAlertView {
       
        let alert = DCAlertView.init(title, subTitle, preferredStyle, placeholder)
        let doneAction = DCAlertAction.init(title: doneItem.label ?? "", style: .destructiveStyle) { action in
            doneItem.action?()
        }
        doneAction.titleColor = doneItem.labelColor
        alert.addAction(doneAction)
        return alert
    }
    
    static func alertView(_ title: String?,
                          _ subTitle: String?,
                          _ cancelItem: DCRIButtonItem,
                          _ doneItem: DCRIButtonItem,
                          _ preferredStyle: DCAlertViewControllerStyle = .alert,
                          _ placeholder: String = "") -> DCAlertView {
        
        let alert = DCAlertView.init(title, subTitle, preferredStyle, placeholder)
        
        let cancelAction = DCAlertAction.init(title: cancelItem.label ?? "", style: .cancelStyle) { action in
            cancelItem.action?()
        }
        cancelAction.titleColor = cancelItem.labelColor
        let doneAction = DCAlertAction.init(title: doneItem.label ?? "", style: .preferredStyle) { action in
            doneItem.action?()
        }
        doneAction.titleColor = doneItem.labelColor
        alert.addAction(cancelAction)
        alert.addAction(doneAction)
        return alert
    }
    
    static func alertView(_ title: String?,
                          _ subTitle: String?,
                          _ cancelItem: DCRIButtonItem,
                          _ cancelActionStyle: DCAlertActionStyle,
                          _ doneItem: DCRIButtonItem,
                          _ doneActionStyle: DCAlertActionStyle,
                          _ preferredStyle: DCAlertViewControllerStyle,
                          _ placeholder: String = "") -> DCAlertView {
       
        let alert = DCAlertView.init(title, subTitle, preferredStyle, placeholder)
        
        let cancelAction = DCAlertAction.init(title: cancelItem.label ?? "", style: cancelActionStyle) { action in
            cancelItem.action?()
        }
        cancelAction.titleColor = cancelItem.labelColor
        let doneAction = DCAlertAction.init(title: doneItem.label ?? "", style: doneActionStyle) { action in
            doneItem.action?()
        }
        doneAction.titleColor = doneItem.labelColor
        alert.addAction(cancelAction)
        alert.addAction(doneAction)
        return alert
    }
    
}
