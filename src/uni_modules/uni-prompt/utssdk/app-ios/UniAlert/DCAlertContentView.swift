//
//  DCAlertContentView.swift
//  DCloudAlertController
//
//  Created by lizhongyi on 2023/3/9.
//

import UIKit


class DCAlertContentView: DCAlertControllerContentView {
    lazy var hairLine: UIImageView = {
        let view = UIImageView(frame: .zero)
        view.backgroundColor = Colors.hairLine()
        return view
    }()
    
    lazy var hairLine2: UIImageView = {
        let view = UIImageView(frame: .zero)
        view.backgroundColor = Colors.hairLine()
        return view
    }()
    
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.layer.cornerRadius = 5.0
        self.layer.masksToBounds = true
        self.backgroundColor = Colors.bgColor()
        
        self.addSubview(self.hairLine)
        self.addSubview(self.hairLine2)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func addAction(_ action: DCAlertAction) {
        let btn = DCAlertActionButton.buttonWithAlertAction(action)
        btn.addTarget(self, action: #selector(onTapActionButton(_:)), for: .touchUpInside)
        self.buttons.append(btn)
        
        if btn.alertAction?.style == .preferredStyle {
            self.addSubview(btn)
        }else if btn.alertAction?.style == .defaultStyle {
            self.insertSubview(btn, belowSubview: hairLine2)
        }else {
            self.insertSubview(btn, belowSubview: hairLine)
        }
        
        hairLine2.isHidden = (buttons.count <= 1)
    }
    
    
    @objc func onTapActionButton(_ sender: DCAlertActionButton) {
        if let action = sender.alertAction {
            self.actionClickedHandler?(action)
        }
        
    }
    
    override func setHairLineColor(_ hairLineColor: UIColor?) {
        hairLine.backgroundColor = hairLineColor
    }
    
    override func updateLayout() {
        updateMessageLabelTextLineHeight()
    }
    
    override func updateImageHandler(_ image: UIImage?) {
        if image != nil {
            titleLabel.font = UIFont.systemFont(ofSize: 17.0)
            messageLabel.font = UIFont.systemFont(ofSize: 13.0)
            messageLineHeight = 17.0
        }else {
            titleLabel.font = UIFont.systemFont(ofSize: 18.0)
            messageLabel.font = UIFont.systemFont(ofSize: 15.0)
            messageLineHeight = 22.5
        }
        updateMessageLabelTextLineHeight()
    }
    
    private func updateMessageLabelTextLineHeight() {
        if messageLabel.text.count == 0 {
            return
        }
        
        let textStorage: NSMutableAttributedString = messageLabel.textStorage
        if let paragraphStyle = (textStorage.attribute(NSAttributedString.Key.paragraphStyle, at: 0, effectiveRange: nil) as? NSMutableParagraphStyle) {
            paragraphStyle.lineSpacing = max(0, (messageLineHeight ?? 22.5) - (messageLabel.font?.lineHeight ?? 13.0))
            textStorage.addAttribute(NSAttributedString.Key.paragraphStyle, value: paragraphStyle, range: NSRange(location: 0, length: textStorage.length))
        }
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        sizeToFits(self.bounds.size, true)
    }
    
    override func sizeThatFits(_ size: CGSize) -> CGSize {
        return sizeToFits(size, false)
    }
    
    @discardableResult
    private func sizeToFits(_ size: CGSize, _ layoutSubviews: Bool) -> CGSize {
        let paddings = UIEdgeInsets(top: 22.0, left: 18.0, bottom: 22.0, right: 18.0)
        let contentWidth = size.width - paddings.left - paddings.right
        let allButtonsHeight = 50.0 * Double(buttons.count == 2 ? 1 : buttons.count)
        
        var vernier_y = 0.0
        var topPadding = paddings.top
        var bottomPadding = paddings.bottom
        var lineSpacing = 14.0
        
        if let image = image {
            if self.imagePositon == .topCenter {
                vernier_y += 18.0
                vernier_y += image.size.height
                if layoutSubviews {
                    imageView?.frame = CGRect(x: 0.0, y: 0.0, width: image.size.width, height: image.size.height)
                    imageView?.center = CGPoint(x: size.width / 2.0, y: 18.0 + (image.size.height / 2.0))
                }
                topPadding = 14.0
                bottomPadding = 14.0
                lineSpacing = 5.0
            }else if self.imagePositon == .leftTopCenter {
                if layoutSubviews {
                    imageView?.frame = CGRect(x: 0.0, y: 0.0, width: image.size.width, height: image.size.height)
                }
                topPadding = 39.0
                bottomPadding = 23.0
                lineSpacing = 14.0
            }
        }
        
        if (title?.count ?? 0) > 0, (message?.count ?? 0) == 0, customView == nil {
            topPadding += lineSpacing
            bottomPadding += lineSpacing
        }
        
        if (title?.count ?? 0) > 0 {
            vernier_y += topPadding
            let constrain = CGSize(width: contentWidth, height: titleLabel.font.lineHeight * CGFloat(titleLabel.numberOfLines))
            let fitHeight = title!.dc_boundingSize(titleLabel.font, titleLabel.font.lineHeight, constrain).height
            if layoutSubviews {
                titleLabel.frame = CGRect(x: paddings.left, y: vernier_y, width: contentWidth, height: fitHeight)
                if title!.dc_hasLinebreaks() == false, titleLabel.bounds.size.height > titleLabel.font.lineHeight * 1.2 {
                    titleLabel.textAlignment = .left
                }else {
                    titleLabel.textAlignment = .center
                }
            }
            vernier_y += fitHeight
        }
        
        if (message?.count ?? 0) > 0, customView == nil {
            if (title?.count ?? 0) > 0 {
                vernier_y += lineSpacing
            }else {
                vernier_y += topPadding
            }
            let constrain = CGSize(width: contentWidth, height: size.height - allButtonsHeight - bottomPadding - vernier_y)
            let fitHeight = message!.dc_boundingSize(messageLabel.font ?? UIFont.systemFont(ofSize: 15.0), messageLineHeight ?? 20, constrain).height * 1.1
            if layoutSubviews {
                messageLabel.frame = CGRect(x: paddings.left - 5.0, y: vernier_y, width: contentWidth, height: fitHeight)
                if message!.dc_hasLinebreaks() == false, messageLabel.bounds.size.height > (messageLabel.font?.lineHeight ?? 20.0) * 1.2 {
                    messageLabel.textAlignment = .left
                }else {
                    messageLabel.textAlignment = .center
                }
            }
            vernier_y += fitHeight
        }
        
        vernier_y += bottomPadding
        
        if self.customView != nil {
            if layoutSubviews {
                self.customView?.frame = CGRect(x: paddings.left, y: vernier_y, width: contentWidth, height: self.customView!.bounds.size.height)
            }
            vernier_y += self.customView!.bounds.size.height
            vernier_y += bottomPadding
        }
        
        if !layoutSubviews {
            return CGSize(width: size.width, height: vernier_y + allButtonsHeight)
        }
        
        hairLine.frame = CGRect(x: 0.0, y: vernier_y, width: size.width, height: pix)
        self.bringSubviewToFront(hairLine)
        hairLine2.frame = CGRect(x: (size.width - pix) / 2.0, y: vernier_y, width: pix, height: allButtonsHeight)
        self.bringSubviewToFront(hairLine2)
        
        let button_w = size.width / (buttons.count == 2 ? 2.0 : 1.0)
        let button_h = 50.0
        
        var i = 0
        while i < buttons.count {
            let button = buttons[i]
            if buttons.count == 2 {
                button.frame = CGRect(x: Double(i) * button_w, y: vernier_y, width: button_w, height: button_h)
                if i == 1 {
                    vernier_y += button_h
                }
            }else {
                button.frame = CGRect(x: 0.0, y: vernier_y, width: button_w, height: button_h)
                vernier_y += button_h
            }
            
            i += 1
        }
        return CGSize(width: size.width, height: vernier_y)
    }
}





class DCAlertTextViewView: DCAlertContentView {
    lazy var textView: DCloudTextView = {
        let textView = DCloudTextView(frame: CGRect(x: 0.0, y: 0.0, width: self.bounds.size.width, height: 100.0))
        textView.backgroundColor = Colors.textViewBg()
        textView.textContainer.lineFragmentPadding = 5.0
        textView.isEditable = true
        textView.isSelectable = true
        textView.textAlignment = .left
        textView.textColor = Colors.mainText()
        textView.placeholderColor = Colors.placeholder()
        textView.tintColor = UIColor.colorWithHexString("#3393E2")
        textView.font = UIFont.systemFont(ofSize: 15.0)
        return textView
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        addSubview(self.textView)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override var customView: UIView? {
        get {
            return self.textView
        }
        set {
            newValue?.removeFromSuperview()
            if let view = newValue, view.superview == nil {
                self.addSubview(view)
            }
        }
    }
    
}
