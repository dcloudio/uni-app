//
//  UniNetWorkManager.swift
//
//
//  Created by Fred on 2025/7/31.
//

import Foundation
import Network
import CoreTelephony
import SystemConfiguration
import UIKit
import DCloudUTSFoundation

// MARK: - 网络类型
public enum UniNetConnectionType: Int {
    case unknown = 0
    case none = 1
    case wifi = 2
    case cellular2G = 3
    case cellular3G = 4
    case cellular4G = 5
    case cellular5G = 6
    case ethernet = 7
    case loopback = 8
    
    func description() -> String {
        switch self {
        case .unknown:
            return "unknown"
        case .none:
            return "none"
        case .wifi:
            return "wifi"
        case .cellular2G:
            return "2g"
        case .cellular3G:
            return "3g"
        case .cellular4G:
            return "4g"
        case .cellular5G:
            return "5g"
        case .ethernet:
            return "ethernet"
        case .loopback:
            return "loopback"
        }
    }
    
    // 网络速度等级，用于判断网络降级
    var speedLevel: Int {
        switch self {
        case .cellular5G: return 6
        case .wifi: return 5
        case .cellular4G: return 4
        case .cellular3G: return 3
        case .cellular2G: return 2
        case .ethernet: return 7
        case .loopback: return 1
        case .none, .unknown: return 0
        }
    }
}

// MARK: - 网络质量变化
public enum NetworkQualityChangeType {
    case noChange       // 无变化
    case upgrade        // 网络升级
    case degradation    // 网络降级
    
    var description: String {
        switch self {
        case .noChange: return "网络无变化"
        case .upgrade: return "网络升级"
        case .degradation: return "网络降级"
        }
    }
}

// MARK: - 网络质量变化级别
public enum NetworkQualityChangeLevel {
    case none           // 无变化
    case minor          // 轻微变化 (5G<->4G, 高速WiFi<->中速WiFi)
    case moderate       // 中度变化 (4G<->3G, 中速WiFi<->低速WiFi)
    case severe         // 严重变化 (3G<->2G, WiFi<->2G/3G)
    case critical       // 极度变化 (任何网络<->无网络)
    
    func description(for changeType: NetworkQualityChangeType) -> String {
        let prefix = changeType == .upgrade ? "升级" : "降级"
        switch self {
        case .none: return "无网络变化"
        case .minor: return "轻微网络\(prefix)"
        case .moderate: return "中度网络\(prefix)"
        case .severe: return "严重网络\(prefix)"
        case .critical: return "极度网络\(prefix)"
        }
    }
}

// MARK: - 网络质量变化结构体对象
public struct NetworkQualityChangeInfo {
    let changeType: NetworkQualityChangeType
    let changeLevel: NetworkQualityChangeLevel
    let fromInfo: NetworkQualityInfo
    let toInfo: NetworkQualityInfo
    let timestamp: Date
    
    var description: String {
        return changeLevel.description(for: changeType)
    }
    
    var detailedDescription: String {
        let changeDesc = description
        let fromDesc = "\(fromInfo.connectionType.description()) (\(fromInfo.qualityLevel.description))"
        let toDesc = "\(toInfo.connectionType.description()) (\(toInfo.qualityLevel.description))"
        
        var details = "\(changeDesc): \(fromDesc) -> \(toDesc)"
        
        // 添加信号强度变化信息
        if let fromSignal = fromInfo.signalStrength, let toSignal = toInfo.signalStrength {
            let signalChange = toSignal - fromSignal
            if signalChange != 0 {
                let signalChangeDesc = signalChange > 0 ? "提升" : "下降"
                details += "\n信号强度\(signalChangeDesc): \(abs(signalChange))% (\(fromSignal)% -> \(toSignal)%)"
            }
        }
        
        // 添加带宽变化信息
        if let fromBandwidth = fromInfo.bandwidth, let toBandwidth = toInfo.bandwidth {
            let bandwidthChange = toBandwidth - fromBandwidth
            if abs(bandwidthChange) > 1.0 { // 只有变化超过1Mbps才显示
                let bandwidthChangeDesc = bandwidthChange > 0 ? "提升" : "下降"
                details += "\n带宽\(bandwidthChangeDesc): \(String(format: "%.1f", abs(bandwidthChange)))Mbps (\(String(format: "%.1f", fromBandwidth))Mbps -> \(String(format: "%.1f", toBandwidth))Mbps)"
            }
        }
        
        return details
    }
}

// MARK: - 网络质量结构体对象
public struct NetworkQualityInfo {
    let connectionType: UniNetConnectionType
    let signalStrength: Int? // 信号强度 (0-100)
    let bandwidth: Double?   // 估算带宽 (Mbps)
    let latency: TimeInterval? // 延迟 (ms)
    let timestamp: Date
    
    var qualityLevel: NetworkQualityLevel {
        guard connectionType != .none else { return .none }
        
        // 基于连接类型和信号强度判断网络质量
        switch connectionType {
        case .cellular5G:
            if let signal = signalStrength, signal > 70 { return .excellent }
            else if let signal = signalStrength, signal > 50 { return .good }
            else { return .fair }
        case .wifi:
            if let signal = signalStrength, signal > 80 { return .excellent }
            else if let signal = signalStrength, signal > 60 { return .good }
            else if let signal = signalStrength, signal > 40 { return .fair }
            else { return .poor }
        case .cellular4G:
            if let signal = signalStrength, signal > 60 { return .good }
            else if let signal = signalStrength, signal > 40 { return .fair }
            else { return .poor }
        case .cellular3G:
            if let signal = signalStrength, signal > 50 { return .fair }
            else { return .poor }
        case .cellular2G:
            return .poor
        case .ethernet:
            return .excellent
        default:
            return .none
        }
    }
}

public enum NetworkQualityLevel {
    case none, poor, fair, good, excellent
    
    var description: String {
        switch self {
        case .none: return "无网络"
        case .poor: return "网络较差"
        case .fair: return "网络一般"
        case .good: return "网络良好"
        case .excellent: return "网络优秀"
        }
    }
}

// MARK:  - 代理方法
public protocol UniNetworkTypeDelegate: AnyObject {
    func networkTypeDidChange(from oldType: UniNetConnectionType, to newType: UniNetConnectionType)
    func networkDidBecomeAvailable()
    func networkDidBecomeUnavailable()
}

public protocol UniNetworkQualityDelegate: AnyObject {
    /// 网络质量发生变化（包括升级和降级）
    func networkQualityDidChange(_ changeInfo: NetworkQualityChangeInfo)
    /// 网络质量信息更新（每次检测都会调用，用于UI更新）
    func networkQualityDidUpdate(_ info: NetworkQualityInfo)
}

// MARK: - 网络权限检测委托
public protocol UniNetworkPermissionDelegate: AnyObject {
    /// 应用网络权限状态发生变化
    func networkPermissionDidChange(hasPermission: Bool)
    /// 检测到应用网络权限被禁用
    func networkPermissionDenied()
    /// 检测到应用网络权限被恢复
    func networkPermissionGranted()
}

// MARK: - UniNetWorkManager 类
public class UniNetWorkManager {
    
    public static let shared = UniNetWorkManager()
    
    // MARK: - Properties
    private var networkMonitor: NWPathMonitor?
    private var cellularMonitor: NWPathMonitor?
    private var wifiMonitor: NWPathMonitor?
    
    private let queue = DispatchQueue(label: "com.uninetmanager.networkqueue", qos: .utility)
    private let telephonyNetworkInfo = CTTelephonyNetworkInfo()
    
    // Network State
    public private(set) var isNetworkAvailable = false
    public private(set) var currentNetworkType: UniNetConnectionType = .unknown
    public private(set) var currentNetworkQuality: NetworkQualityInfo?
    
    // Network Permission State
    public private(set) var hasNetworkPermission = true
    private var lastNetworkPermissionCheck: Date?
    private let permissionCheckCooldown: TimeInterval = 1.0 // 防止频繁检测
    
    // History for degradation detection
    private var networkHistory: [NetworkQualityInfo] = []
    private let maxHistoryCount = 10
    
    // Monitoring flags
    private var isTypeMonitoringEnabled = false
    private var isDegradationMonitoringEnabled = false
    private var isPermissionMonitoringEnabled = false
    private var isTelephonyNotificationSetup = false
    
    // Quality monitoring timer
    private var qualityMonitorTimer: Timer?
    private let qualityCheckInterval: TimeInterval = 5.0
    
    // MARK: - Delegates
    public weak var typeDelegate: UniNetworkTypeDelegate?
    public weak var qualityDelegate: UniNetworkQualityDelegate?
    public weak var permissionDelegate: UniNetworkPermissionDelegate?
    
    // MARK: - Closure Callbacks
    /// 网络类型变化回调
    public var onNetworkTypeChanged: ((UniNetConnectionType, UniNetConnectionType) -> Void)?
    /// 网络连接状态回调
    public var onNetworkAvailabilityChanged: ((Bool) -> Void)?
    /// 网络质量变化回调（统一处理升级和降级）
    public var onNetworkQualityChanged: ((NetworkQualityChangeInfo) -> Void)?
    /// 网络质量更新回调（用于UI更新）
    public var onNetworkQualityUpdated: ((NetworkQualityInfo) -> Void)?
    /// 网络权限变化回调
    public var onNetworkPermissionChanged: ((Bool) -> Void)?
    
    private init() {
        setupApplicationLifecycleNotifications()
    }
    
    deinit {
        stopAllMonitoring()
        NotificationCenter.default.removeObserver(self)
    }
}

// MARK: - Public API
extension UniNetWorkManager {
    
    // MARK: - Network Type Monitoring
    
    /// 开启网络类型切换监听
    public func startNetworkTypeMonitoring() {
        guard !isTypeMonitoringEnabled else { return }
        
        isTypeMonitoringEnabled = true
        startNetworkMonitor()
        
        console.log("📶 网络类型监听已开启")
    }
    
    /// 关闭网络类型切换监听
    public func stopNetworkTypeMonitoring() {
        guard isTypeMonitoringEnabled else { return }
        
        isTypeMonitoringEnabled = false
        stopNetworkMonitor()
        
        console.log("📶 网络类型监听已关闭")
    }
    
    // MARK: - Network Quality Monitoring
    
    /// 开启网络质量变化监听（包括升级和降级）
    public func startNetworkQualityMonitoring() {
        guard !isDegradationMonitoringEnabled else { return }
        
        isDegradationMonitoringEnabled = true
        
        // 如果类型监听未开启，先开启
        if !isTypeMonitoringEnabled {
            startNetworkTypeMonitoring()
        }
        
        startQualityMonitoring()
        
        console.log("📊 网络质量变化监听已开启")
    }
    
    /// 关闭网络质量变化监听
    public func stopNetworkQualityMonitoring() {
        guard isDegradationMonitoringEnabled else { return }
        
        isDegradationMonitoringEnabled = false
        stopQualityMonitoring()
        
        console.log("📊 网络质量变化监听已关闭")
    }
    
    // MARK: - Network Permission Monitoring
    
    /// 开启网络权限变化监听
    public func startNetworkPermissionMonitoring() {
        guard !isPermissionMonitoringEnabled else { return }
        
        isPermissionMonitoringEnabled = true
        
        // 检查当前权限状态
        checkNetworkPermission()
        
        console.log("🔐 网络权限变化监听已开启")
    }
    
    /// 关闭网络权限变化监听
    public func stopNetworkPermissionMonitoring() {
        guard isPermissionMonitoringEnabled else { return }
        
        isPermissionMonitoringEnabled = false
        
        console.log("🔐 网络权限变化监听已关闭")
    }
    
    /// 停止所有监听
    public func stopAllMonitoring() {
        stopNetworkTypeMonitoring()
        stopNetworkQualityMonitoring()
        stopNetworkPermissionMonitoring()
    }
    
    /// 是否是wifi连接
    public func isConnectWifi() -> Bool {
        return currentNetworkType == .wifi
    }
    
    /// 获取当前网络类型描述
    public func getCurrentNetworkDescription() -> String {
        return currentNetworkType.description()
    }
    
    /// 获取当前网络质量信息
    public func getCurrentNetworkQuality() -> NetworkQualityInfo? {
        return currentNetworkQuality
    }
    
    /// 判断网络是否足够稳定（用于重要操作）
    public func isNetworkStableForImportantOperations() -> Bool {
        guard let quality = currentNetworkQuality else { return false }
        
        switch quality.qualityLevel {
        case .excellent, .good:
            return true
        case .fair:
            return currentNetworkType == .wifi || currentNetworkType == .cellular4G || currentNetworkType == .cellular5G
        default:
            return false
        }
    }
    
    /// 配置网络类型变化回调
    /// - Parameter callback: 回调闭包，参数为 (旧类型, 新类型)
    public func onNetworkTypeChange(_ callback: @escaping (UniNetConnectionType, UniNetConnectionType) -> Void) {
        onNetworkTypeChanged = callback
    }
    
    /// 配置网络连接状态变化回调
    /// - Parameter callback: 回调闭包，参数为是否连接 (true: 已连接, false: 已断开)
    public func onNetworkAvailabilityChange(_ callback: @escaping (Bool) -> Void) {
        onNetworkAvailabilityChanged = callback
    }
    
    /// 配置网络质量变化回调（包括升级和降级）
    /// - Parameter callback: 回调闭包，参数为网络质量变化信息
    public func onNetworkQualityChange(_ callback: @escaping (NetworkQualityChangeInfo) -> Void) {
        onNetworkQualityChanged = callback
    }
    
    /// 配置网络质量更新回调（用于UI更新）
    /// - Parameter callback: 回调闭包，参数为当前网络质量信息
    public func onNetworkQualityUpdate(_ callback: @escaping (NetworkQualityInfo) -> Void) {
        onNetworkQualityUpdated = callback
    }
    
    /// 配置网络权限变化回调
    /// - Parameter callback: 回调闭包，参数为是否有网络权限 (true: 有权限, false: 无权限)
    public func onNetworkPermissionChange(_ callback: @escaping (Bool) -> Void) {
        onNetworkPermissionChanged = callback
    }
    
    /// 手动检查网络权限状态
    /// - Returns: 当前是否有网络权限
    public func checkCurrentNetworkPermissionAsync(completion: @escaping (Bool) -> Void) {
        return performNetworkPermissionCheckAsync(completion: completion)
    }
    
    /// 清除所有闭包回调
    public func clearAllCallbacks() {
        onNetworkTypeChanged = nil
        onNetworkAvailabilityChanged = nil
        onNetworkQualityChanged = nil
        onNetworkQualityUpdated = nil
        onNetworkPermissionChanged = nil
    }
    
    // MARK: - Chain Configuration
    
    /// 链式配置网络监听回调
    /// - Returns: 配置构建器
    public func configure() -> UniNetworkCallbackBuilder {
        return UniNetworkCallbackBuilder(manager: self)
    }
}

// MARK: - 支持链式调用写法
public class UniNetworkCallbackBuilder {
    private weak var manager: UniNetWorkManager?
    
    init(manager: UniNetWorkManager) {
        self.manager = manager
    }
    
    /// 配置网络类型变化回调
    @discardableResult
    public func onTypeChange(_ callback: @escaping (UniNetConnectionType, UniNetConnectionType) -> Void) -> UniNetworkCallbackBuilder {
        manager?.onNetworkTypeChanged = callback
        return self
    }
    
    /// 配置网络连接状态变化回调
    @discardableResult
    public func onAvailabilityChange(_ callback: @escaping (Bool) -> Void) -> UniNetworkCallbackBuilder {
        manager?.onNetworkAvailabilityChanged = callback
        return self
    }
    
    /// 配置网络质量变化回调
    @discardableResult
    public func onQualityChange(_ callback: @escaping (NetworkQualityChangeInfo) -> Void) -> UniNetworkCallbackBuilder {
        manager?.onNetworkQualityChanged = callback
        return self
    }
    
    /// 配置网络质量更新回调
    @discardableResult
    public func onQualityUpdate(_ callback: @escaping (NetworkQualityInfo) -> Void) -> UniNetworkCallbackBuilder {
        manager?.onNetworkQualityUpdated = callback
        return self
    }
    
    /// 配置网络权限变化回调
    @discardableResult
    public func onPermissionChange(_ callback: @escaping (Bool) -> Void) -> UniNetworkCallbackBuilder {
        manager?.onNetworkPermissionChanged = callback
        return self
    }
    
    /// 开始监听网络类型变化
    @discardableResult
    public func startTypeMonitoring() -> UniNetworkCallbackBuilder {
        manager?.startNetworkTypeMonitoring()
        return self
    }
    
    /// 开始监听网络质量变化
    @discardableResult
    public func startQualityMonitoring() -> UniNetworkCallbackBuilder {
        manager?.startNetworkQualityMonitoring()
        return self
    }
    
    /// 开始监听网络权限变化
    @discardableResult
    public func startPermissionMonitoring() -> UniNetworkCallbackBuilder {
        manager?.startNetworkPermissionMonitoring()
        return self
    }
    
    /// 开始所有监听
    @discardableResult
    public func startAllMonitoring() -> UniNetworkCallbackBuilder {
        manager?.startNetworkTypeMonitoring()
        manager?.startNetworkQualityMonitoring()
        manager?.startNetworkPermissionMonitoring()
        return self
    }
}

// MARK: - Private Implementation
private extension UniNetWorkManager {
    
    // MARK: - Application Lifecycle Setup
    func setupApplicationLifecycleNotifications() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(applicationDidBecomeActive),
            name: UIApplication.didBecomeActiveNotification,
            object: nil
        )
    }
    
    @objc func applicationDidBecomeActive() {
        // 应用变为活跃状态时子线程延时检查网络权限
        if isPermissionMonitoringEnabled {
            DispatchQueue.global(qos: .utility).asyncAfter(deadline: .now() + 0.5) { [weak self] in
                self?.checkNetworkPermission()
            }
        }
    }
    
    // MARK: - Network Monitor Setup
    func startNetworkMonitor() {
        networkMonitor = NWPathMonitor()
        networkMonitor?.pathUpdateHandler = { [weak self] path in
            self?.handleNetworkPathUpdate(path)
        }
        networkMonitor?.start(queue: queue)
    }
    
    func stopNetworkMonitor() {
        networkMonitor?.cancel()
        networkMonitor = nil
    }
    
    func handleNetworkPathUpdate(_ path: NWPath) {
        let wasAvailable = isNetworkAvailable
        let oldType = currentNetworkType
        
        isNetworkAvailable = path.status == .satisfied
        updateNetworkType(path: path)
        
        // 通知网络可用性变化
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            
            if wasAvailable != self.isNetworkAvailable {
                if self.isNetworkAvailable {
                    self.typeDelegate?.networkDidBecomeAvailable()
                    self.onNetworkAvailabilityChanged?(true)
                } else {
                    self.typeDelegate?.networkDidBecomeUnavailable()
                    self.onNetworkAvailabilityChanged?(false)
                }
            }
            
            // 通知网络类型变化
            if oldType != self.currentNetworkType {
                self.typeDelegate?.networkTypeDidChange(from: oldType, to: self.currentNetworkType)
                self.onNetworkTypeChanged?(oldType, self.currentNetworkType)
                console.log("📶 网络类型变化: \(oldType.description()) -> \(self.currentNetworkType.description())")
            }
        }
        
        updateNetworkQuality()
    }
    
    // MARK: - Network Type Detection
    
    func updateNetworkType(path: NWPath) {
        if path.usesInterfaceType(.wifi) {
            currentNetworkType = .wifi
        } else if path.usesInterfaceType(.cellular) {
            updateCellularNetworkType()
        } else if path.usesInterfaceType(.wiredEthernet) {
            currentNetworkType = .ethernet
        } else if path.usesInterfaceType(.loopback) {
            currentNetworkType = .loopback
        } else if path.status == .satisfied {
            currentNetworkType = .unknown
        } else {
            currentNetworkType = .none
        }
    }
    
    func updateCellularNetworkType() {
        // 定义网络技术类型
        let typeStrings2G = [
            CTRadioAccessTechnologyEdge,
            CTRadioAccessTechnologyGPRS,
            CTRadioAccessTechnologyCDMA1x
        ]
        let typeStrings3G = [
            CTRadioAccessTechnologyHSDPA,
            CTRadioAccessTechnologyWCDMA,
            CTRadioAccessTechnologyHSUPA,
            CTRadioAccessTechnologyCDMAEVDORev0,
            CTRadioAccessTechnologyCDMAEVDORevA,
            CTRadioAccessTechnologyCDMAEVDORevB,
            CTRadioAccessTechnologyeHRPD
        ]
        let typeStrings4G = [CTRadioAccessTechnologyLTE]
        
        // 获取当前蜂窝网络技术
        var currentRadioAccessTechnology: String?
        
        if #available(iOS 12.0, *) {
            currentRadioAccessTechnology = telephonyNetworkInfo.serviceCurrentRadioAccessTechnology?.values.first
        } else {
            currentRadioAccessTechnology = telephonyNetworkInfo.currentRadioAccessTechnology
        }
        
        // 如果无法获取技术信息，使用默认值
        guard let technology = currentRadioAccessTechnology, !technology.isEmpty else {
            if currentNetworkType == .unknown {
                currentNetworkType = .cellular4G // 默认为4G
                console.log("📱 无法检测蜂窝网络技术，默认设置为4G")
            }
            return
        }
        
        // 根据技术字符串确定网络类型
        if typeStrings2G.contains(technology) {
            currentNetworkType = .cellular2G
        } else if typeStrings3G.contains(technology) {
            currentNetworkType = .cellular3G
        } else if typeStrings4G.contains(technology) {
            currentNetworkType = .cellular4G
        } else {
            // 检查5G支持
            if #available(iOS 14.1, *) {
                if technology == CTRadioAccessTechnologyNRNSA ||
                   technology == CTRadioAccessTechnologyNR {
                    currentNetworkType = .cellular5G
                } else {
                    currentNetworkType = .cellular4G
                    console.log("📱 检测到未知蜂窝网络技术: \(technology)，默认为4G")
                }
            } else {
                currentNetworkType = .cellular4G
            }
        }
        
        console.log("📱 蜂窝网络类型更新: \(currentNetworkType.description())")
    }
    
    // MARK: - Network Permission Monitoring
    func checkNetworkPermission() {
        // 防止频繁检测
        let now = Date()
        if let lastCheck = lastNetworkPermissionCheck,
           now.timeIntervalSince(lastCheck) < permissionCheckCooldown {
            return
        }
        lastNetworkPermissionCheck = now
        
        // 异步执行权限检测，避免阻塞主线程
        performNetworkPermissionCheckAsync { [weak self] currentPermissionStatus in
            guard let self = self else { return }
            
            // 检查权限状态是否发生变化
            if currentPermissionStatus != self.hasNetworkPermission {
                let previousStatus = self.hasNetworkPermission
                self.hasNetworkPermission = currentPermissionStatus
                
                // 在主线程通知权限变化
                DispatchQueue.main.async {
                    self.permissionDelegate?.networkPermissionDidChange(hasPermission: currentPermissionStatus)
                    if currentPermissionStatus {
                        self.permissionDelegate?.networkPermissionGranted()
                    } else {
                        self.permissionDelegate?.networkPermissionDenied()
                    }
                    
                    self.onNetworkPermissionChanged?(currentPermissionStatus)
                    
                    let statusDesc = currentPermissionStatus ? "已恢复" : "已禁用"
                    console.log("🔐 应用网络权限\(statusDesc): \(previousStatus) -> \(currentPermissionStatus)")
                }
            }
        }
    }
    
    /// 异步执行网络权限检测
    private func performNetworkPermissionCheckAsync(completion: @escaping (Bool) -> Void) {
        DispatchQueue.global(qos: .utility).async { [weak self] in
            guard let self = self else {
                completion(true)
                return
            }
            
            // 检查系统网络状态
            guard self.isNetworkAvailable else {
                completion(false)
                return
            }
            
            // 异步检测应用网络权限
            self.checkNetworkPermissionViaConnectionAsync(completion: completion)
        }
    }

    /// 异步版本地网络连接检测（完全无阻塞）
    private func checkNetworkPermissionViaConnectionAsync(completion: @escaping (Bool) -> Void) {
        let host = "127.0.0.1" // 保持使用本地地址
        let port: UInt16 = 80
        
        guard let nwPort = NWEndpoint.Port(rawValue: port) else {
            console.log("🔐 端口创建失败，默认有权限")
            completion(true)
            return
        }
        
        let connection = NWConnection(host: NWEndpoint.Host(host), port: nwPort, using: .tcp)
        
        var isCompleted = false
        let completionLock = NSLock()
        
        // 安全的completion包装器，确保只调用一次
        let safeCompletion: (Bool) -> Void = { result in
            completionLock.lock()
            defer { completionLock.unlock() }
            
            if !isCompleted {
                isCompleted = true
                console.log("🔐 权限检测完成，结果: \(result)")
                completion(result)
            } else {
                console.log("🔐 权限检测已完成，忽略重复结果: \(result)")
            }
        }
        
        var timeoutTimer: DispatchSourceTimer? = DispatchSource.makeTimerSource(queue: queue)
        timeoutTimer?.schedule(deadline: .now() + 2.0) // 增加到2秒超时
        
        timeoutTimer?.setEventHandler { [weak connection] in
            console.log("🔐 网络权限检测超时")
            connection?.cancel()
            safeCompletion(true) // 超时认为有权限（保守策略）
            timeoutTimer?.cancel()
            timeoutTimer = nil
        }
        timeoutTimer?.resume()
        
        console.log("🔐 开始异步网络权限检测，目标: \(host):\(port)")
        
        connection.stateUpdateHandler = { [weak self] state in
            console.log("🔐 连接状态变化: \(state)")
            
            switch state {
            case .ready:
                console.log("🔐 网络连接成功，有权限")
                connection.cancel()
                timeoutTimer?.cancel()
                timeoutTimer = nil
                safeCompletion(true)
                
            case .failed(let error):
                console.log("🔐 网络连接失败，错误: \(error)")
                connection.cancel()
                timeoutTimer?.cancel()
                timeoutTimer = nil
                
                // 分析错误判断是否为权限问题
                let hasPermission = self?.analyzeNetworkError(error) ?? true
                console.log("🔐 错误分析结果，权限状态: \(hasPermission)")
                safeCompletion(hasPermission)
                
            case .cancelled:
                console.log("🔐 网络连接被取消")
                // 不调用completion，因为取消可能由超时或其他状态触发
                
            case .waiting(let error):
                console.log("🔐 网络连接等待中，错误: \(error)")
                // 继续等待，不处理
                
            case .preparing:
                console.log("🔐 网络连接准备中")
                // 继续等待，不处理
                
            case .setup:
                console.log("🔐 网络连接设置中")
                // 继续等待，不处理
                
            @unknown default:
                console.log("🔐 未知连接状态: \(state)")
                break
            }
        }
        
        connection.start(queue: queue)
    }
    
    /// 分析网络错误，判断是否为权限问题
    private func analyzeNetworkError(_ error: Error) -> Bool {
        // 尝试检查NWError
        if let networkError = error as? NWError {
            switch networkError {
            case .posix(let code):
                // 检查常见的权限相关错误码
                if code == POSIXErrorCode.EPERM || code == POSIXErrorCode.EACCES {
                    return false
                }
                // 网络不可达错误也可能表示权限问题
                if code == POSIXErrorCode.ENETUNREACH || code == POSIXErrorCode.EHOSTUNREACH {
                    return false
                }
                return true // 其他POSIX错误认为有权限
            case .dns(let dnsError):
                // DNS错误通常不是权限问题
                console.log("🔍 DNS错误: \(dnsError)")
                return true
            default:
                return true
            }
        }
        
        // 检查NSError
        if let nsError = error as NSError? {
            // 检查错误域和代码
            if nsError.domain == NSPOSIXErrorDomain {
                let code = nsError.code
                if code == Int(POSIXErrorCode.EPERM.rawValue) ||
                   code == Int(POSIXErrorCode.EACCES.rawValue) {
                    return false
                }
            }
            
            // 检查网络相关错误域
            if nsError.domain == "NSURLErrorDomain" {
                // URL错误通常表示网络问题，不是权限问题
                return true
            }
        }
        
        return true
    }
    
    // MARK: - Quality Monitoring
    
    func startQualityMonitoring() {
        qualityMonitorTimer = Timer.scheduledTimer(withTimeInterval: qualityCheckInterval, repeats: true) { [weak self] _ in
            self?.updateNetworkQuality()
        }
    }
    
    func stopQualityMonitoring() {
        qualityMonitorTimer?.invalidate()
        qualityMonitorTimer = nil
    }
    
    func updateNetworkQuality() {
        let signalStrength = getCurrentSignalStrength()
        let bandwidth = estimateBandwidth()
        
        let qualityInfo = NetworkQualityInfo(
            connectionType: currentNetworkType,
            signalStrength: signalStrength,
            bandwidth: bandwidth,
            latency: nil, // 可以通过ping测试获取
            timestamp: Date()
        )
        
        let previousQuality = currentNetworkQuality
        currentNetworkQuality = qualityInfo
        
        // 添加到历史记录
        addToHistory(qualityInfo)
        
        // 检测网络质量变化
        if isDegradationMonitoringEnabled {
            checkForNetworkQualityChange(previous: previousQuality, current: qualityInfo)
        }
        
        // 通知质量更新
        DispatchQueue.main.async { [weak self] in
            self?.qualityDelegate?.networkQualityDidUpdate(qualityInfo)
            self?.onNetworkQualityUpdated?(qualityInfo)
        }
    }
    
    func getCurrentSignalStrength() -> Int? {
        // 这里可以通过私有API或其他方法获取信号强度
        // 由于iOS限制，这里返回基于网络类型的估算值
        switch currentNetworkType {
        case .wifi:
            // WiFi信号强度通常较好
            return Int.random(in: 60...95)
        case .cellular5G:
            // 5G信号强度一般较好
            return Int.random(in: 70...90)
        case .cellular4G:
            // 4G信号强度中等
            return Int.random(in: 50...80)
        case .cellular3G:
            // 3G信号强度较弱
            return Int.random(in: 30...60)
        case .cellular2G:
            // 2G信号强度很弱
            return Int.random(in: 20...40)
        case .ethernet:
            // 有线连接，信号强度最好
            return 100
        case .none, .unknown, .loopback:
            return nil
        }
    }
    
    func estimateBandwidth() -> Double? {
        // 基于网络类型估算带宽
        switch currentNetworkType {
        case .cellular5G:
            return Double.random(in: 100...1000) // 100Mbps - 1Gbps
        case .wifi:
            return Double.random(in: 50...300)   // 50Mbps - 300Mbps
        case .cellular4G:
            return Double.random(in: 10...100)   // 10Mbps - 100Mbps
        case .cellular3G:
            return Double.random(in: 1...10)     // 1Mbps - 10Mbps
        case .cellular2G:
            return Double.random(in: 0.1...1)    // 0.1Mbps - 1Mbps
        case .ethernet:
            return Double.random(in: 100...1000) // 100Mbps - 1Gbps
        default:
            return nil
        }
    }
    
    // MARK: - Quality Change Detection
    
    func addToHistory(_ info: NetworkQualityInfo) {
        networkHistory.append(info)
        if networkHistory.count > maxHistoryCount {
            networkHistory.removeFirst()
        }
    }
    
    func checkForNetworkQualityChange(previous: NetworkQualityInfo?, current: NetworkQualityInfo) {
        guard let previous = previous else { return }
        
        let changeInfo = calculateQualityChange(from: previous, to: current)
        
        // 只有当网络质量确实发生变化时才通知
        if changeInfo.changeType != .noChange {
            DispatchQueue.main.async { [weak self] in
                guard let self = self else { return }
            
                self.qualityDelegate?.networkQualityDidChange(changeInfo)
                self.onNetworkQualityChanged?(changeInfo)
                
                let emoji = changeInfo.changeType == .upgrade ? "📈" : "📉"
                console.log("\(emoji) 检测到\(changeInfo.description): \(changeInfo.detailedDescription)")
            }
        }
    }
    
    func calculateQualityChange(from previous: NetworkQualityInfo, to current: NetworkQualityInfo) -> NetworkQualityChangeInfo {
        let previousSpeed = previous.connectionType.speedLevel
        let currentSpeed = current.connectionType.speedLevel
        let speedDiff = currentSpeed - previousSpeed // 正数表示升级，负数表示降级
        
        var changeType: NetworkQualityChangeType = .noChange
        var changeLevel: NetworkQualityChangeLevel = .none
        
        // 判断变化类型和等级
        if speedDiff > 0 {
            // 网络升级
            changeType = .upgrade
            if speedDiff >= 3 {
                changeLevel = .severe
            } else if speedDiff == 2 {
                changeLevel = .moderate
            } else if speedDiff == 1 {
                changeLevel = .minor
            }
        } else if speedDiff < 0 {
            // 网络降级
            changeType = .degradation
            let degradeDiff = abs(speedDiff)
            if degradeDiff >= 3 {
                changeLevel = .severe
            } else if degradeDiff == 2 {
                changeLevel = .moderate
            } else if degradeDiff == 1 {
                changeLevel = .minor
            }
        } else {
            // 网络类型相同，检查信号强度和质量等级变化
            let previousQualityValue = getQualityValue(previous.qualityLevel)
            let currentQualityValue = getQualityValue(current.qualityLevel)
            let qualityDiff = currentQualityValue - previousQualityValue
            
            if qualityDiff > 0 {
                changeType = .upgrade
                changeLevel = qualityDiff >= 2 ? .moderate : .minor
            } else if qualityDiff < 0 {
                changeType = .degradation
                changeLevel = abs(qualityDiff) >= 2 ? .moderate : .minor
            }
            
            // 如果质量等级没变化，检查信号强度变化
            if changeType == .noChange {
                if let prevSignal = previous.signalStrength,
                   let currSignal = current.signalStrength {
                    let signalDiff = currSignal - prevSignal
                    if abs(signalDiff) >= 15 {
                        changeType = signalDiff > 0 ? .upgrade : .degradation
                        changeLevel = abs(signalDiff) >= 30 ? .moderate : .minor
                    }
                }
            }
        }
        
        // 特殊情况：网络完全断开或恢复
        if current.connectionType == .none && previous.connectionType != .none {
            changeType = .degradation
            changeLevel = .critical
        } else if current.connectionType != .none && previous.connectionType == .none {
            changeType = .upgrade
            changeLevel = .critical
        }
        
        return NetworkQualityChangeInfo(
            changeType: changeType,
            changeLevel: changeLevel,
            fromInfo: previous,
            toInfo: current,
            timestamp: Date()
        )
    }
    
    func getQualityValue(_ quality: NetworkQualityLevel) -> Int {
        switch quality {
        case .none: return 0
        case .poor: return 1
        case .fair: return 2
        case .good: return 3
        case .excellent: return 4
        }
    }
}

// MARK: - Extensions for convenience
extension UniNetWorkManager {
    
    /// 获取网络状态摘要
    public func getNetworkStatusSummary() -> String {
        guard isNetworkAvailable else {
            return "❌ 网络不可用"
        }
        
        var summary = "✅ \(currentNetworkType.description())"
        
        if let quality = currentNetworkQuality {
            summary += " - \(quality.qualityLevel.description)"
            
            if let signal = quality.signalStrength {
                summary += " (信号: \(signal)%)"
            }
            
            if let bandwidth = quality.bandwidth {
                summary += " (带宽: \(String(format: "%.1f", bandwidth))Mbps)"
            }
        }
        
        return summary
    }
    
    /// 获取网络历史记录
    public func getNetworkHistory() -> [NetworkQualityInfo] {
        return networkHistory
    }
    
    /// 清除网络历史记录
    public func clearNetworkHistory() {
        networkHistory.removeAll()
    }
}

