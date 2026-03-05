//
//  DCActionSheetController.swift
//  DCloudAlertController
//
//  Created by lizhongyi on 2023/3/8.
//

import UIKit

public let ActionSheetNotificationNameViewWillRotate = "ActionSheetNotificationNameViewWillRotate"

public class DCActionSheetController: UIViewController {
    
    var noticeTitle: String
    static var supportedInterfaceOrientations: UIInterfaceOrientationMask?
    var shouldDismissOnTapBackground: Bool = true
    var actions: [DCAlertAction] = []
    weak var bottomMenuController: DCBottomMenuController?
    var tableView: UITableView!
    
    lazy var mask: CAShapeLayer = {
        let shape = CAShapeLayer()
        return shape
    }()
    
    public init(noticeTitle: String, supportedInterfaceOrientations: UIInterfaceOrientationMask? = nil) {
        self.noticeTitle = noticeTitle
        DCActionSheetController.supportedInterfaceOrientations = supportedInterfaceOrientations
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    public override func loadView() {
        super.loadView()
        self.view.layer.mask = self.mask
    }
    
    
    public override func viewDidLoad() {
        super.viewDidLoad()
        initTableView()
        configTableView()
        
        NotificationCenter.default.addObserver(self, selector: #selector(viewWillRotate), name: Notification.Name(ActionSheetNotificationNameViewWillRotate), object: nil)
    }
    
    @objc func viewWillRotate() {
        configTableView(isRotate: true)
    }
    
    public override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        self.tableView.reloadData()
        self.tableView.isScrollEnabled = self.contentHeight(self.parent?.view.bounds.size ?? self.view.bounds.size) > self.view.bounds.size.height
        self.mask.frame = self.view.bounds
        self.mask.path = UIBezierPath.init(roundedRect: self.view.bounds, byRoundingCorners: [.topLeft, .topRight], cornerRadii: CGSize(width: 10, height: 10)).cgPath
        
    }
    
    open override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        super.viewWillTransition(to: size, with: coordinator)
        // 发送 view 旋转通知
        NotificationCenter.default.post(name: NSNotification.Name(ActionSheetNotificationNameViewWillRotate), object: nil)
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self, name: NSNotification.Name(ActionSheetNotificationNameViewWillRotate), object: nil)
    }
    
    func initTableView() {
        let tableView = UITableView.init(frame: self.view.bounds, style: .plain)
        tableView.separatorStyle = .none
        tableView.separatorInset = .zero
        tableView.sectionHeaderHeight = 0.0
        tableView.sectionFooterHeight = 0.0
        tableView.estimatedRowHeight = 55
        tableView.rowHeight = UITableView.automaticDimension
        tableView.delegate = self
        tableView.dataSource = self
        tableView.register(DCActionSheetActionCell.self, forCellReuseIdentifier: DCActionSheetActionCell.cellId)

        self.tableView = tableView
        self.view.addSubview(tableView)
    }
    
    func configTableView(isRotate: Bool? = false) {
        let deviceSize = UIScreen.main.bounds.size
        let min = min(deviceSize.width, deviceSize.height)
        let max = max(deviceSize.width, deviceSize.height)
        var contentWidth = min
        var contentHeight = max
        
        
        // 在此处加延时的原因：在iPhone6, 6s, 6s plus, 7, 7 plus, 8, 8 plus 等小尺寸设备上，在该处UIDevice.isLandscape获取的是旋转前的屏幕方向，其他设备上获取的是旋转后的屏幕方向，加延时可以抹平系统在不同设备上的差异。
        // 仅仅是屏幕旋转的时候，第一次弹出actionSheet没有延时。
        var delayTime = 0.0
        if let isRotate = isRotate, isRotate {
            delayTime = 0.1
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + delayTime) { [weak self] in
            if UIDevice.isLandscape {
                contentWidth = max
                contentHeight = min
            }
            
            if #available(iOS 15.0, *) {
                self?.tableView.sectionHeaderTopPadding = 0
            }
            
            if let noticeTitle = self?.noticeTitle as? String, noticeTitle.count > 0 {
                let size = CGSize(width: contentWidth, height: contentHeight)
                let headerView = DCActionSheetHeader(frame: CGRect(x: 0, y: 0, width: contentWidth, height: DCActionSheetHeader.heightWithTitle(noticeTitle, size)))
                headerView.title = noticeTitle
                headerView.titleLabel.numberOfLines = 1
                headerView.titleLabel.lineBreakMode = .byTruncatingMiddle
                self?.tableView.tableHeaderView = headerView
            }
            
            self?.tableView.frame = CGRect(x: 0, y: 0, width: contentWidth, height: contentHeight)
        }
    }
    
    
    public func addAction(_ action: DCAlertAction) {
        actions.append(action)
    }
    
    public func addAction(_ title: String, _ style: DCAlertActionStyle, _ handler: @escaping (_ action: DCAlertAction) -> Void) -> DCAlertAction {
        let action = DCAlertAction.init(title: title, style: style, handler: handler)
        actions.append(action)
        return action
    }
    
    public func show() {
        let vc = DCBottomMenuController.init(self)
        vc.shouldDismissOnTapBackgroud = self.shouldDismissOnTapBackground
        vc.show()
        vc.tapMaskDismissCallBack = { [weak self] in
            if let action = self?.actions.last {
                action.handler(action)
            }
        }
        
        self.bottomMenuController = vc
    }
}

extension DCActionSheetController: UITableViewDelegate, UITableViewDataSource {
 
    public func numberOfSections(in tableView: UITableView) -> Int {
        return 2
    }
    
    public func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if section == 0 {
            return max(self.actions.count - 1, 0)
        }
        return actions.count > 1 ? 1 : 0
    }
    
    
    public func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: DCActionSheetActionCell.cellId, for: indexPath) as! DCActionSheetActionCell
        if indexPath.section == 0 {
            let action = self.actions[indexPath.row]
            cell.action = action
        }else if indexPath.section == 1 {
            if let action = self.actions.last {
                cell.action = action
            }
        }
        return cell
    }
    
    public func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if let cell = tableView.cellForRow(at: indexPath) as? DCActionSheetActionCell {
            self.parent?.dismiss(animated: false, completion: {
                if let action = cell.action {
                    action.handler(action)
                }
            })
        }
        tableView.deselectRow(at: indexPath, animated: true)
    }
    
    public func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        if indexPath.section == 0 {
            return DCActionSheetActionCell.height()
        }
        var h: CGFloat = DCActionSheetActionCell.height()

        if #available(iOS 11, *) {
            h += self.view.safeAreaInsets.bottom
        }

        return h
    }
    
    public func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        if section == 0 {
            return 5.0
        }
        return 0.0
    }
    
    public func tableView(_ tableView: UITableView, viewForFooterInSection section: Int) -> UIView? {
        if section == 0 {
            let view = UIView()
            view.backgroundColor = Colors.footer()
            return view
        }
        return nil
    }
}

extension DCActionSheetController: DCBottomMenuControllerProtocol {
    func contentHeight(_ parentSize: CGSize) -> CGFloat {
        var h: CGFloat = 0.0
        if self.noticeTitle.count > 0 {
            h += DCActionSheetHeader.heightWithTitle(self.noticeTitle, parentSize)
        }
                
        for action in actions {
            if let title = action.title {
                var cellHeight = (title as NSString).dc_boundingSize(UIFont.systemFont(ofSize: 16.0), 25.0, CGSize(width: view.bounds.size.width - 30.0, height: Double(MAXFLOAT))).height
                cellHeight += 35
                if cellHeight < 55.0 {
                    cellHeight = 55.0
                }
                h += cellHeight
            }
        }

        if #available(iOS 11.0, *) {
            h += self.view.safeAreaInsets.bottom
        }
        return h
    }
    
    
}
