//
//  DCActionSheetHeader.swift
//  DCloudAlertController
//
//  Created by lizhongyi on 2023/3/8.
//

import UIKit

class DCActionSheetHeader: UIView {
    lazy var titleLabel: UILabel = {
        let label = UILabel.init(frame: .zero)
        label.textColor = Colors.subText()
        label.font = UIFont.systemFont(ofSize: 15)
        label.textAlignment = .center
        label.preferredMaxLayoutWidth = self.width - 30
        return label
    }()
    
    lazy var line: UIView = {
        let view = UIView(frame: .zero)
        view.backgroundColor = Colors.seperator()
        view.isHidden = true
        return view
    }()
    
    private static var isTitleAutoSuitableHeight = true
    
    var title: String = "" {
        didSet {
            titleLabel.text = title
            if title.count > 0 {
                let style = NSMutableParagraphStyle.init()
                style.alignment = .center
                style.lineSpacing = 6
                if let attributedText = titleLabel.attributedText?.mutableCopy() as? NSMutableAttributedString {
                    attributedText.addAttribute(NSAttributedString.Key.paragraphStyle, value: style, range: NSRange(location: 0, length: attributedText.length))
                    titleLabel.attributedText = attributedText
                }
                let w:Double = self.width - 30.0
                var h: Double = (title as NSString).dc_boundingSize(UIFont.systemFont(ofSize: 15), 25.0, CGSize(width: w, height: Double(MAXFLOAT))).height
                if !DCActionSheetHeader.isTitleAutoSuitableHeight {
                    h = (title as NSString).dc_boundingSize(UIFont.systemFont(ofSize: 15), 25.0, CGSize(width: w, height: 18.0)).height
                }
                
                titleLabel.preferredMaxLayoutWidth = w
                titleLabel.frame = CGRect(x: 15, y: 20, width: w, height: h)
                line.isHidden = false
                line.frame = CGRect(x: 0, y: self.bottom - pix, width: self.width, height: pix)
            }
        }
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.addSubview(titleLabel)
        self.addSubview(line)
        if UIDevice.isiPhone {
            NotificationCenter.default.addObserver(self, selector: #selector(viewWillRotate), name: Notification.Name(ActionSheetNotificationNameViewWillRotate), object: nil)
        }
    }
    
    
    @objc func viewWillRotate() {
        if UIDevice.isiPhone {
            layoutSubviews()
        }
    }
    
    deinit {
        if UIDevice.isiPhone {
            NotificationCenter.default.removeObserver(self, name: NSNotification.Name(ActionSheetNotificationNameViewWillRotate), object: nil)
        }
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        if DCActionSheetHeader.isTitleAutoSuitableHeight {
            titleLabel.numberOfLines = 1
            titleLabel.lineBreakMode = .byTruncatingMiddle
            
            let w: Double = DCActionSheetActionCell.getWidth(isHeader: true)
            var h: Double = 40.0
            if title.count > 0 {
                
                if DCActionSheetHeader.isTitleAutoSuitableHeight {
                    h += title.dc_boundingSize(UIFont.systemFont(ofSize: 15), 25.0, CGSize(width: w, height: Double(MAXFLOAT))).height
                } else {
                    h += title.dc_boundingSize(UIFont.systemFont(ofSize: 15), 25.0, CGSize(width: w, height: 18.0)).height
                }
            }
            self.titleLabel.frame = CGRect(x: 15, y: 0, width: w, height: h)
        }
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    static func heightWithTitle(_ title: String, _ inSize: CGSize) -> Double {
        let w: Double = inSize.width - 30.0
        var h: Double = 40.0
        if title.count > 0 {
            if self.isTitleAutoSuitableHeight {
                h += title.dc_boundingSize(UIFont.systemFont(ofSize: 15), 25.0, CGSize(width: w, height: Double(MAXFLOAT))).height
            } else {
                h += title.dc_boundingSize(UIFont.systemFont(ofSize: 15), 25.0, CGSize(width: w, height: 18.0)).height
            }
            return h
        }
        return 0.001
    }
    
    static var viewId: String {
        get {
            return "DCActionSheetHeader"
        }
    }
}
