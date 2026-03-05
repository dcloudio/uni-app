//
//  DCloudAlertControllerComponents.swift
//  DCloudAlertController
//
//  Created by lizhongyi on 2023/3/8.
//

import Foundation
import UIKit


public enum DCAlertActionStyle: Int {
    case defaultStyle = 0
    case cancelStyle = 1
    case destructiveStyle = 2
    case preferredStyle = 3
}


public enum DCAlertImagePosition: Int {
    case null = 0
    case topCenter = 1
    case leftTopCenter = 2
}

let kDCAlertLineFragmentPadding = 5.0
let kDCAlertTitleMaxNumberOfLines = 3.0



public class DCAlertAction: NSObject {
    public var title: String?
    public var titleColor: UIColor? {
        didSet {
            button?.setTitleColor(titleColor, for: .normal)
        }
    }
    public var style: DCAlertActionStyle = .defaultStyle
    public weak var button: UIButton?
    public var handler: (_ action: DCAlertAction) -> Void
    public var enabled: Bool = true {
        didSet {
            button?.isEnabled = enabled
        }
    }
    
    public init(title: String, style: DCAlertActionStyle, handler: @escaping (_ action: DCAlertAction) -> Void) {
        self.title = title
        self.style = style
        self.handler = handler
        self.enabled = true
        super.init()
    }
}


public class DCAlertActionButton: UIButton {
    var actionStyle: DCAlertActionStyle = .defaultStyle
    var alertAction: DCAlertAction?
 
    static func buttonWithAlertAction(_ action: DCAlertAction) -> DCAlertActionButton {
        let button: DCAlertActionButton = DCAlertActionButton(type: .custom)
        button.adjustsImageWhenDisabled = true
        button.adjustsImageWhenHighlighted = true
        button.titleLabel?.font = UIFont.boldSystemFont(ofSize: 16.0)
        button.setTitle(action.title, for: .normal)
        button.actionStyle = action.style
        updateButton(button, action)
        
        button.alertAction = action
        action.button = button
        button.isEnabled = action.enabled
        return button
    }
    
    private static func updateButton(_ button: UIButton, _ action: DCAlertAction)  {
        let style = action.style
        
        let highlightBgColor = UIColor.gray.withAlphaComponent(0.12)
        button.setBackgroundColor(highlightBgColor, for: .highlighted)
        
        switch style {
        case .destructiveStyle, .preferredStyle:
            button.setTitleColor(action.titleColor ?? Colors.sureBtn(), for: .normal)
            
        default:
            button.setTitleColor(action.titleColor ?? Colors.cancelBtn(), for: .normal)
        }
    }
}

public protocol DCAlertControllerContentViewProtocol: NSObject {
    var titleLabel: UILabel {get set}
    var messageLabel: UITextView {get set}
    var title: String? {get set}
    var message: String? {get set}
    var image: UIImage? {get set}
    var customView: UIView? {get set}
    var imagePositon: DCAlertImagePosition? {get set}
    var buttons: [DCAlertActionButton] {get}
    var actionClickedHandler: ((_ action: DCAlertAction) -> Void)? {get set}
    func addAction(_ action: DCAlertAction)
    func setHairLineColor(_ hairLineColor: UIColor?)
}


class DCAlertControllerContentView: UIView, DCAlertControllerContentViewProtocol {
    
    lazy var titleLabel: UILabel = {
        let label = UILabel(frame: .zero)
        label.backgroundColor = UIColor.clear
        label.textColor = Colors.mainText()
        label.numberOfLines = 2
        label.lineBreakMode = .byTruncatingTail
        label.textAlignment = .center
        label.font = UIFont.systemFont(ofSize: 17.0)
        
        return label
    }()
    
    lazy var messageLabel: UITextView = {
        let messageView = UITextView.init(frame: .zero)
        messageView.backgroundColor = UIColor.clear
        messageView.showsHorizontalScrollIndicator = false
        messageView.showsVerticalScrollIndicator = true
        messageView.textContainerInset = .zero
        messageView.textContainer.lineFragmentPadding = 5.0
        messageView.isEditable = false
        messageView.isSelectable = false
        messageView.textAlignment = .center
        messageView.textColor = Colors.mainText().withAlphaComponent(0.7)
        messageView.font = UIFont.systemFont(ofSize: 15.0)
        messageView.isScrollEnabled = true
        messageView.sizeToFit()
        
        return messageView
    }()

    
    public var title: String? {
        didSet {
            if let title1 = title {
                titleLabel.text = title1
            }
        }
    }
    
    public var message: String? {
        didSet {
            if let message1 = message {
                messageLabel.text = message1
            }
            updateLayout()
        }
    }
    
    public var image: UIImage? {
        didSet {
            if let image1 = image {
                imageView = UIImageView.init(frame: .zero)
                if let view = imageView {
                    view.image = image1
                    self.addSubview(view)
                }
            }else {
                imageView?.removeFromSuperview()
                imageView = nil
            }
            updateImageHandler(image)
        }
    }
    
    public var customView: UIView? {
        get {
            return nil
        }
        set {
            newValue?.removeFromSuperview()
            if let view = newValue {
                self.addSubview(view)
            }
        }
    }
    
    var imagePositon: DCAlertImagePosition?
    
    var buttons: [DCAlertActionButton]
    
    var actionClickedHandler: ((DCAlertAction) -> Void)?
    
    var messageLineHeight: CGFloat?
    
    var imageView: UIImageView?
    
    
    public override init(frame: CGRect) {
        buttons = []
        super.init(frame: frame)
        self.addSubview(titleLabel)
        self.addSubview(messageLabel)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
    func addAction(_ action: DCAlertAction) {
        
    }
    
    func setHairLineColor(_ hairLineColor: UIColor?) {
        
    }
    
    func updateLayout() {
        
    }
    
    func updateImageHandler(_ image: UIImage?) {
        
    }
}

extension UIButton {
    func setBackgroundColor(_ color: UIColor, for state: UIControl.State) {
        let size = CGSize(width: 1, height: 1)
        UIGraphicsBeginImageContext(size)
        if let context = UIGraphicsGetCurrentContext() {
            context.setFillColor(color.cgColor)
            context.fill(CGRect(origin: .zero, size: size))
            let colorImage = UIGraphicsGetImageFromCurrentImageContext()
            UIGraphicsEndImageContext()
            self.setBackgroundImage(colorImage, for: state)
        }
    }
}

