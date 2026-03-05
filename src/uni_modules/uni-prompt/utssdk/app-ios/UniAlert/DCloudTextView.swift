//
//  DCloudTextView.swift
//  DCloudAlertController
//
//  Created by lizhongyi on 2023/3/12.
//

import UIKit

class DCloudTextView: UITextView {
    lazy var placeholderLabel: UILabel = {
        let label = UILabel(frame: .zero)
        label.font = self.font
        label.numberOfLines = 1
        label.textColor = .gray
        return label
    }()
    
    var placeholder: String? = nil {
        didSet {
            placeholderLabel.text = placeholder
        }
    }
    var placeholderColor: UIColor = .gray
    var placeholderFont: UIFont? {
        didSet {
            placeholderLabel.font = placeholderFont
        }
    }
    var wordCountLimit: Int?
    var placeholderLineSpacing: CGFloat = 0
    var placeholderLineNum: Int = 1 {
        didSet {
            placeholderLabel.numberOfLines = placeholderLineNum
        }
    }
    
    override var text: String! {
        get {
            return super.text
        }
        set {
            super.text = newValue
            placeholderLabel.isHidden = newValue.count > 0
            
        }
    }
    
    override init(frame: CGRect, textContainer: NSTextContainer?) {
        super.init(frame: frame, textContainer: textContainer)
        self.textContainerInset = UIEdgeInsets(top: 10, left: 10, bottom: 10, right: 10)
        self.textContainer.lineFragmentPadding = 0
        self.showsHorizontalScrollIndicator = false
        self.showsVerticalScrollIndicator = true
//        self.keyboardAppearance
        self.delegate = self
        self.clipsToBounds = true
        
        self.addSubview(placeholderLabel)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override var font: UIFont? {
        get {
            return super.font
        }
        set {
            super.font = newValue
            if placeholderFont == nil {
                placeholderLabel.font = newValue
            }
        }
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        reLayoutPlaceholderLabel()
    }
    
    func reLayoutPlaceholderLabel() {
        let insets = self.textContainerInset
        let h = Double(placeholderLabel.font.lineHeight + placeholderLineSpacing) * Double(placeholderLabel.numberOfLines)
        placeholderLabel.frame = CGRect(x: insets.left + 2.0, y: insets.top, width: self.width - insets.left - insets.right, height: h)
    }

}

extension DCloudTextView: UITextViewDelegate {
    func textViewDidChange(_ textView: UITextView) {
        if let count = wordCountLimit, count > 1, textView.text.count > count, textView.markedTextRange == nil {
            textView.text = (textView.text as NSString).substring(to: count)
        }
        placeholderLabel.isHidden = textView.text.count > 0
    }
}
