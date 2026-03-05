//
//  SpinnerView.swift
//  SpinnerView
//
//  Created by Fred on 2025/9/12.
//

import UIKit

public class SpinnerView: UIView {
    private let foregroundLayer = CAShapeLayer()
    private var isAnimating = false
    private var configuredLineWidth: CGFloat = 2
    private var configuredStrokeColor: UIColor = .black
    private let spinner_key: String = "spinner.rotation"
    private var configuredRotationDuration: CFTimeInterval = 1.333
    private var arcLength: CGFloat = 0.75
    private var animationTimingFunction: CAMediaTimingFunction = CAMediaTimingFunction(name: .linear)
    private var strokeWidth: String = "medium"
    private var paused: Bool = false //paused 属性
    private var iosSpinner: Bool = false //iosSpinner 属性

    // MARK: - iOS Spinner (系统雪花效果) 相关属性
    private var spinnerIndicator: UIActivityIndicatorView?
    
    deinit {
        NotificationCenter.default.removeObserver(self)
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        commonInit()
    }
    
    public override func layoutSubviews() {
        super.layoutSubviews()

        if strokeWidth.lowercased() == "medium" {
            configuredLineWidth = self.frame.size.width * 0.0625
        } else {
            configuredLineWidth = self.frame.size.width * 0.125
        }

        if iosSpinner {
            updateSpinnerIndicatorSize()
        } else {
            performUpdatesWhilePaused {
                updatePathInternal()
            }
        }
    }
    
    public func updateIosSpinnerProp(_ iosSpinner: Bool) {
        guard self.iosSpinner != iosSpinner else { return }
        self.iosSpinner = iosSpinner

        if iosSpinner {
            switchToSpinnerIndicator()
        } else {
            switchToArcSpinner()
        }
    }
    
    public func updatePausedProp(_ paused: Bool) {
        self.paused = paused
        if iosSpinner {
            // 雪花效果的暂停/恢复
            updateSpinnerIndicatorPaused(paused)
        } else {
            // 圆弧效果的暂停/恢复
            if paused {
                // 暂停动画，保持当前位置
                if isAnimating {
                    pauseLayer(foregroundLayer)
                }
            } else {
                // 恢复动画
                if isAnimating {
                    // 如果动画已存在，从暂停位置恢复
                    resumeLayerIfPaused(foregroundLayer)
                } else {
                    // 如果动画不存在，启动新动画
                    start()
                }
            }
        }
    }
    
    public func setAppearance(strokeColor: UIColor, lineWidth: CGFloat) {
        setAppearance(
            strokeColor: strokeColor,
            strokeBGColor: nil,
            rotationDuration: nil,
            animating: nil,
            animationTimingFunction: nil)
    }
    
    public func setAppearance(strokeColor: UIColor, strokeWidth: String, animationTimingFunction: String? = nil) {
        self.strokeWidth = strokeWidth
        if strokeWidth == "medium" {
            configuredLineWidth = self.frame.size.width * 0.0625
        } else {
            configuredLineWidth = self.frame.size.width * 0.125
        }
        
        setAppearance(
            strokeColor: strokeColor,
            strokeBGColor: nil,
            rotationDuration: nil,
            animating: nil,
            animationTimingFunction: animationTimingFunction)
    }
    
    
    public func setAppearance(
        strokeColor: UIColor,
        strokeBGColor: UIColor? = nil,
        rotationDuration: CFTimeInterval? = nil,
        animating: Bool? = nil,
        animationTimingFunction: String? = nil
    ) {
        configuredStrokeColor = strokeColor
        if let rotationDuration = rotationDuration {
            configuredRotationDuration = max(0.1, rotationDuration)
        }

        // if let animationTimingFunction = animationTimingFunction, animationTimingFunction.lowercased() == "ease" {
        //     self.animationTimingFunction = CAMediaTimingFunction(name: .easeInEaseOut)
        // }

        // 更新雪花效果的颜色
        if iosSpinner {
            spinnerIndicator?.color = strokeColor
        }

        // 在暂停状态下也能立即生效
        performUpdatesWhilePaused {
            foregroundLayer.strokeColor = strokeColor.cgColor
            updatePathInternal()
        }

        if let animating = animating {
            if animating { start() } else { stop() }
        } else if isAnimating, rotationDuration != nil {
            applyRotationAnimation(preserveProgress: true)
        }
    }
}

extension SpinnerView {
    private func commonInit() {
        translatesAutoresizingMaskIntoConstraints = false
        foregroundLayer.strokeColor = configuredStrokeColor.cgColor
        foregroundLayer.fillColor = UIColor.clear.cgColor
        foregroundLayer.lineWidth = configuredLineWidth
        foregroundLayer.lineCap = .butt
        foregroundLayer.lineJoin = .round
        
        layer.addSublayer(foregroundLayer)
        installAppLifecycleObservers()
    }
    
    /// 更新路径属性（核心逻辑，不处理暂停状态）
    private func updatePathInternal() {
        let size = min(bounds.width, bounds.height)
        let radius = (size - configuredLineWidth) / 2
        let center = CGPoint(x: bounds.midX, y: bounds.midY)
        
        let startAngle: CGFloat = -.pi / 4
        let endAngle: CGFloat = startAngle + 2 * .pi * arcLength
        let foregroundPath = UIBezierPath(
            arcCenter: center, radius: radius, startAngle: startAngle, endAngle: endAngle,
            clockwise: true)
        
        foregroundLayer.lineWidth = configuredLineWidth
        foregroundLayer.path = foregroundPath.cgPath
        foregroundLayer.frame = bounds
    }
    
    /// 更新路径（自动处理暂停状态）
    private func updatePath() {
        performUpdatesWhilePaused {
            updatePathInternal()
        }
    }
    
    func start() {
        guard !isAnimating else { return }
        isAnimating = true
        paused = false

        if iosSpinner {
            spinnerIndicator?.startAnimating()
        } else {
            foregroundLayer.speed = 1
            foregroundLayer.timeOffset = 0
            foregroundLayer.beginTime = 0
            applyRotationAnimation(preserveProgress: true)
        }
    }

    func stop() {
        guard isAnimating else { return }
        isAnimating = false
        paused = false

        if iosSpinner {
            spinnerIndicator?.stopAnimating()
        } else {
            foregroundLayer.removeAnimation(forKey: spinner_key)
        }
    }
    
    func setArcLength(_ length: CGFloat) {
        arcLength = max(0.1, min(1.0, length))
        updatePath()
    }
    
    func setRotationSpeed(_ speed: CGFloat) {
        configuredRotationDuration = CFTimeInterval(1.0 / speed)
        if isAnimating {
            applyRotationAnimation(preserveProgress: true)
        }
    }
    
    private func installAppLifecycleObservers() {
        NotificationCenter.default.addObserver(
            self, selector: #selector(handleDidBecomeActive),
            name: UIApplication.didBecomeActiveNotification, object: nil)
        NotificationCenter.default.addObserver(
            self, selector: #selector(handleDidEnterBackground),
            name: UIApplication.didEnterBackgroundNotification, object: nil)
        NotificationCenter.default.addObserver(
            self, selector: #selector(handleWillEnterForeground),
            name: UIApplication.willEnterForegroundNotification, object: nil)
    }
    
    @objc private func handleDidEnterBackground() {
        guard isAnimating, !paused else { return }
        if iosSpinner {
            spinnerIndicator?.stopAnimating()
        } else {
            pauseLayer(foregroundLayer)
        }
    }

    @objc private func handleWillEnterForeground() {
        guard isAnimating, !paused else { return }
        if iosSpinner {
            spinnerIndicator?.startAnimating()
        } else {
            resumeLayerIfPaused(foregroundLayer)
        }
    }

    @objc private func handleDidBecomeActive() {
        guard isAnimating, !paused else { return }
        if iosSpinner == false {
            if foregroundLayer.animation(forKey: spinner_key) == nil {
                applyRotationAnimation(preserveProgress: false)
                return
            }
            resumeLayerIfPaused(foregroundLayer)
        }
    }
    
    private func pauseLayer(_ layer: CALayer) {
        guard layer.speed != 0 else { return }
        let pausedTime = layer.convertTime(CACurrentMediaTime(), from: nil)
        layer.speed = 0
        layer.timeOffset = pausedTime
    }
    
    private func resumeLayerIfPaused(_ layer: CALayer) {
        guard layer.speed == 0 else { return }
        let pausedTime = layer.timeOffset
        layer.speed = 1
        layer.timeOffset = 0
        layer.beginTime = 0
        let timeSincePause = layer.convertTime(CACurrentMediaTime(), from: nil) - pausedTime
        layer.beginTime = timeSincePause
    }
    
    /// 在暂停状态下执行属性更新，确保立即生效
    /// - Parameter updates: 需要执行的属性更新闭包
    private func performUpdatesWhilePaused(_ updates: () -> Void) {

        let isActuallyPaused = foregroundLayer.speed == 0

        if isActuallyPaused {
            let savedTimeOffset = foregroundLayer.timeOffset

            CATransaction.begin()
            CATransaction.setDisableActions(true)

            foregroundLayer.speed = 1
            updates()

            foregroundLayer.setNeedsDisplay()
            CATransaction.commit()

            foregroundLayer.speed = 0
            foregroundLayer.timeOffset = savedTimeOffset
        } else {
            updates()
        }
    }
    
    private func applyRotationAnimation(preserveProgress: Bool) {
        let currentAngle: CGFloat
        if preserveProgress, let pres = foregroundLayer.presentation(),
           let angle = pres.value(forKeyPath: "transform.rotation.z") as? CGFloat
        {
            currentAngle = angle
        } else {
            currentAngle = 0
        }

        foregroundLayer.removeAnimation(forKey: spinner_key)

        let rotationAnimation = CABasicAnimation(keyPath: "transform.rotation.z")
        rotationAnimation.fromValue = currentAngle
        rotationAnimation.toValue = currentAngle + 2 * CGFloat.pi
        rotationAnimation.duration = configuredRotationDuration
        rotationAnimation.repeatCount = .infinity
        rotationAnimation.timingFunction = self.animationTimingFunction
        rotationAnimation.isRemovedOnCompletion = false
        foregroundLayer.add(rotationAnimation, forKey: spinner_key)
    }
}

// MARK: - iOS Spinner (系统雪花效果) 相关方法
extension SpinnerView {

    /// 切换到系统雪花效果
    private func switchToSpinnerIndicator() {
        applyRotationAnimation(preserveProgress: false)
        pauseLayer(foregroundLayer)
        foregroundLayer.isHidden = true
        
        foregroundLayer.speed = 1
        foregroundLayer.timeOffset = 0
        foregroundLayer.beginTime = 0

        if spinnerIndicator == nil {
            createSpinnerIndicator()
        } else {
            spinnerIndicator?.isHidden = false
        }

        updateSpinnerIndicatorSize()
        spinnerIndicator?.color = configuredStrokeColor

        if paused {
            spinnerIndicator?.stopAnimating()
        } else {
            spinnerIndicator?.startAnimating()
        }
    }
    
    /// 切换回圆弧效果
    private func switchToArcSpinner() {
        spinnerIndicator?.stopAnimating()
        spinnerIndicator?.isHidden = true
        
        // 使用 CATransaction 禁用隐式动画，确保属性立即生效
        CATransaction.begin()
        CATransaction.setDisableActions(true)
        
        foregroundLayer.speed = 1
        foregroundLayer.timeOffset = 0
        foregroundLayer.beginTime = 0
        
        // 在显示之前先更新路径，防止布局变化导致的闪烁
        updatePath()
        
        foregroundLayer.isHidden = false
        
        CATransaction.commit()
        
        // 异步到下一个 RunLoop 处理动画状态，避免时序冲突
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            
            // 根据当前状态决定是否需要动画
            if self.isAnimating {
                self.applyRotationAnimation(preserveProgress: false)
                
                // 如果处于暂停状态，应用动画后立即暂停
                if self.paused {
                    self.pauseLayer(self.foregroundLayer)
                }
            }
        }
    }

    /// 创建系统雪花 indicator
    private func createSpinnerIndicator() {
        
        let indicator = UIActivityIndicatorView()
        indicator.color = configuredStrokeColor
        indicator.hidesWhenStopped = false
        addSubview(indicator)

        spinnerIndicator = indicator

        updateSpinnerIndicatorSize()
    }

    /// 更新雪花 indicator 的尺寸和位置，根据 bounds 动态适配
    private func updateSpinnerIndicatorSize() {
        guard let indicator = spinnerIndicator else { return }

        let targetSize = min(bounds.width, bounds.height)
        guard targetSize > 0 else { return }

        indicator.transform = .identity

        let indicatorSize = indicator.intrinsicContentSize
        guard indicatorSize.width > 0 else { return }

        let scale = targetSize / indicatorSize.width

        indicator.bounds = CGRect(x: 0, y: 0, width: indicatorSize.width, height: indicatorSize.height)

        indicator.center = CGPoint(x: bounds.midX, y: bounds.midY)

        indicator.transform = CGAffineTransform(scaleX: scale, y: scale)
    }

    /// 更新雪花效果的暂停状态
    private func updateSpinnerIndicatorPaused(_ paused: Bool) {
        guard let _ = spinnerIndicator else { return }

        if paused {
            pauseSpinnerIndicator()
        } else {
            resumeSpinnerIndicator()
        }
    }

    private func pauseSpinnerIndicator() {
        guard let indicator = spinnerIndicator else { return }
        indicator.stopAnimating()
    }

    private func resumeSpinnerIndicator() {
        guard let indicator = spinnerIndicator else { return }
        indicator.startAnimating()
    }
}



