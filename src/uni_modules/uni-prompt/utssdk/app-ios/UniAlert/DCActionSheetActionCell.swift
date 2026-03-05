//
//  DCActionSheetActionCell.swift
//  DCloudAlertController
//
//  Created by lizhongyi on 2023/3/8.
//

import UIKit

class DCActionSheetActionCell: UITableViewCell {
    
    lazy var titleLabel: UILabel = {
        let label = UILabel.init(frame: .zero)
        label.font = UIFont.systemFont(ofSize: 16.0)
        label.numberOfLines = 0
        label.textAlignment = .center
        label.textColor = Colors.mainText()
        return label
    }()
    
    lazy var line: UIView = {
        let view = UIView(frame: .zero)
        view.backgroundColor = Colors.seperator()
        return view
    }()
    
    static private var text: String? = nil
    
    var action: DCAlertAction? {
        didSet {
            if let action1 = action {
                titleLabel.text = action1.title
                DCActionSheetActionCell.text = titleLabel.text
                if let color = action1.titleColor {
                    titleLabel.textColor = color
                }else if action1.style == .cancelStyle {
                    titleLabel.textColor = Colors.mainText()
                }else if action1.style == .destructiveStyle {
                    titleLabel.textColor = Colors.mainText()
                }else {
                    titleLabel.textColor = Colors.mainText()
                }
            }
        }
    }
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        
        self.contentView.addSubview(titleLabel)
        self.contentView.addSubview(line)
        self.selectedBackgroundView = UIView()
        self.selectedBackgroundView?.backgroundColor = Colors.seperator()
        
        self.layoutMargins = .zero
        self.preservesSuperviewLayoutMargins = false
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        var h = 55.0
        var w: Double = self.bounds.size.width - 30.0
        
        if UIDevice.isiPhone {
            w = DCActionSheetActionCell.getWidth()
        }
        
        if let text = self.titleLabel.text {
            h = (text as NSString).dc_boundingSize(UIFont.systemFont(ofSize: 16.0), 25.0, CGSize(width: w, height: Double(MAXFLOAT))).height
            h += 35
            if h < 55.0 {
                h = 55.0
            }
        }
        self.titleLabel.frame = CGRect(x: 15, y: 0, width: w, height: h)
        let deviceSize = UIScreen.main.bounds.size
        let max = max(deviceSize.width, deviceSize.height)
        self.line.frame = CGRect(x: -200.0, y: self.bounds.size.height - pix, width: max + 200.0, height: pix)
    }
    
    static func adaptSafeAreaheight() -> Double {
        
        if UIDevice.isiPhone {
            if UIDevice.isiPhoneProMax || UIDevice.isiPhoneDynamicIsland || UIDevice.isiPhoneLarge {
                return 115.5
            } else if UIDevice.isMediumiPhone || UIDevice.isiPhoneXR {
                return 93.5
            } else if UIDevice.isiPhoneXType || UIDevice.isiPhoneXSMax {
                return 84.5
            } else if UIDevice.isiPhoneMini {
                return 97.5
            } else if UIDevice.isiPhoneStandard || UIDevice.isiPhoneCompact {
                return 0.0
            }
        } else if UIDevice.isiPad {
            
        }
        return 0.0
    }
    
    static func getWidth(isHeader: Bool? = false) -> Double {
        
        var isCell = false
        if let isHeader = isHeader {
            isCell = !isHeader
        }
        
        let deviceSize = UIScreen.main.bounds.size
        let min = min(deviceSize.width, deviceSize.height)
        let max = max(deviceSize.width, deviceSize.height)
        var top = adaptSafeAreaheight()
        top = (isCell ? top : 0.0)
        let margin = 30.0
        
        if #available(iOS 13.0, *) {
            if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
                let orientationMask = windowScene.interfaceOrientation
                switch orientationMask {
                case .portrait, .portraitUpsideDown:
                    //30.0 是该label距左右边距各15
                    return min - margin
                case .landscapeLeft, .landscapeRight:
                    return max - margin - top
                default:
                    return min - margin
                }
            }
        } else {
            let orientation = UIApplication.shared.statusBarOrientation
            switch orientation {
            case .portrait, .portraitUpsideDown:
                return min - margin
            case .landscapeLeft, .landscapeRight:
                return max - margin - top
            case .unknown:
                return min - margin
            @unknown default:
                return min - margin
            }
        }
        
        return min - margin
    }
    
    static func height() -> CGFloat {
        var h: Double = 55.0
        let w: Double = UIScreen.main.bounds.size.width - 30.0
        if let text = DCActionSheetActionCell.text {
            h = (text as NSString).dc_boundingSize(UIFont.systemFont(ofSize: 16.0), 25.0, CGSize(width: w, height: Double(MAXFLOAT))).height
            h += 35
            if h < 55.0 {
                h = 55.0
            }
        }
        return h
    }
    
    static var cellId: String {
        get {
            return "DCActionSheetActionCell"
        }
    }
}


