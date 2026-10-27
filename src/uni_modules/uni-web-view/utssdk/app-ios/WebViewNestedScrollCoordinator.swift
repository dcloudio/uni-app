import UIKit
import WebKit

/// 通过弱回调转发逐帧事件，避免 CADisplayLink 经由 target 强持有协调器。
private final class WebViewNestedScrollDisplayLinkTarget: NSObject {
    /// display link 每帧触发的弱引用回调，由协调器在停止运动时主动清空。
    var callback: ((CADisplayLink) -> Void)?

    @objc func handleDisplayLink(_ displayLink: CADisplayLink) {
        callback?(displayLink)
    }
}

/// 在系统滚动开始写入 offset 前记录触摸起点，纵向锁定后由该手势继续提供位移。
private final class WebViewNestedScrollPanGestureRecognizer: UIPanGestureRecognizer {
    /// 比 recognizer 的 `.began` 更早触发，用于在 UIKit 改写 offset 前记录起点。
    var touchesBeganCallback: (() -> Void)?
    /// recognizer 未进入 target-action 就失败时的清理兜底。
    var resetCallback: (() -> Void)?

    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent) {
        touchesBeganCallback?()
        super.touchesBegan(touches, with: event)
    }

    override func reset() {
        resetCallback?()
        super.reset()
    }
}

/// 在不接管滚动代理的前提下，以单一纵向驱动协调 WKWebView 与父 UIScrollView。
public final class WebViewNestedScrollCoordinator: NSObject, UIGestureRecognizerDelegate {
    // MARK: - 手势与消费者状态

    /// 本轮物理触摸的方向判定结果。
    private enum GestureAxis {
        case undecided
        case vertical
        case horizontal
    }

    /// 当前帧最后消费纵向距离的容器，用于决定显示哪个滚动条。
    private enum ActiveConsumer {
        case inner
        case parent
    }

    // MARK: - 引用与生命周期状态

    /// 被协调的 WebView。使用弱引用，生命周期由 InnerWebView 持有方管理。
    private weak var webView: WKWebView?
    /// 当前手势找到的最近纵向父滚动容器，会话结束时清空。
    private weak var parentScrollView: UIScrollView?
    /// 是否允许自定义 pan 处理新手势。
    private var enabled = false
    /// 手势进行中收到禁用请求时延迟执行，避免中途拆除 recognizer 破坏清理路径。
    private var pendingDisable = false

    // MARK: - 当前物理触摸

    /// 当前触摸的方向状态；离手惯性不依赖该值。
    private var gestureAxis: GestureAxis = .undecided
    /// 是否已取消父子系统 pan，并由协调器独占纵向 offset 写入。
    private var isControllingVertical = false
    /// 当前物理触摸是否已记录起点；手指离开后立即清除，不延续到惯性阶段。
    private var hasCapturedGestureStart = false
    /// 方向未决期间是否临时关闭了 inner 回弹。
    private var isProvisionalInnerBounceSuppressed = false
    /// 上一帧 pan 的累计纵向 translation，用于计算本帧增量。
    private var previousTranslationY: CGFloat = 0

    /// 两个受控偏移始终保持在合法范围内，不能从 UIKit 本帧写入的 offset 反向同步。
    /// inner 在统一坐标链路中的权威合法 offset。
    private var controlledInnerY: CGFloat = 0
    /// parent 在统一坐标链路中的权威合法 offset。
    private var controlledParentY: CGFloat = 0
    /// 当前物理触摸开始时的 inner 合法 offset。
    private var gestureStartInnerY: CGFloat = 0
    /// 当前物理触摸开始时的 parent 合法 offset。
    private var gestureStartParentY: CGFloat = 0

    /// 正数表示 inner 底部原始超量，负数表示 parent 顶部原始超量。
    private var terminalOverscroll: CGFloat = 0

    // MARK: - 离手运动

    /// 当前自定义减速的纵向速度，正数向内容底部滚动，负数向页面顶部滚动。
    private var decelerationVelocityY: CGFloat = 0
    /// 上一帧 display link 时间戳，用于按真实帧间隔积分。
    private var previousDisplayTimestamp: CFTimeInterval = 0
    /// 自定义离手惯性的逐帧驱动。
    private var displayLink: CADisplayLink?
    /// display link 的中间 target，用于打断 target 对协调器的强引用链。
    private var displayLinkTarget: WebViewNestedScrollDisplayLinkTarget?
    /// 终端超量返回合法边界的动画。
    private var bounceAnimator: UIViewPropertyAnimator?
    /// 每次取消或启动回弹时递增，使旧动画的延迟 completion 自动失效。
    private var motionGeneration = 0
    /// 附加到 WebView 的独立单指 pan，纵向锁定后继续提供 translation。
    private var coordinatingPan: WebViewNestedScrollPanGestureRecognizer?

    // MARK: - 外观快照

    private var activeConsumer: ActiveConsumer?
    /// 手势开始时 inner 的纵向滚动条配置。
    private var originalInnerShowsVerticalScrollIndicator: Bool?
    /// 手势开始时 parent 的纵向滚动条配置。
    private var originalParentShowsVerticalScrollIndicator: Bool?
    /// 手势开始时 inner 的系统回弹配置。
    private var originalInnerBounces: Bool?
    /// 手势开始时 parent 的系统回弹配置。
    private var originalParentBounces: Bool?
    /// 纵向锁定后是否修改过父子回弹或 indicator，需要在会话结束时恢复。
    private var appearanceModified = false

    // MARK: - 手势与动画参数

    /// 开始尝试判断主方向的最小累计位移。
    private let directionThreshold: CGFloat = 6
    /// 一般方向判定阈值。
    private let directionResolutionThreshold: CGFloat = 12
    /// 模糊手势必须得出最终方向的累计位移阈值。
    private let finalDirectionResolutionThreshold: CGFloat = 28
    /// 明显主轴方向所需的纵横位移比例。
    private let verticalDirectionRatio: CGFloat = 1.5
    /// parent 尚有反向容量时，向下斜滑偏置为纵向所需的比例。
    private let boundaryVerticalDirectionRatio: CGFloat = 0.8
    /// 忽略边界附近的浮点误差，避免无容量时仍触发纵向偏置。
    private let boundaryCapacityEpsilon: CGFloat = 0.5
    /// 低于该速度时不启动自定义离手惯性。
    private let minimumDecelerationVelocity: CGFloat = 5
    /// 终端超量转换为视觉回弹距离的阻尼系数。
    private let rubberBandCoefficient: CGFloat = 0.55
    /// 终端回弹返回合法边界的动画时长。
    private let bounceReturnDuration: TimeInterval = 0.28
    /// 创建协调器但不立即附加手势，由 `setEnabled(_:)` 控制启用时机。
    public init(webView: WKWebView) {
        self.webView = webView
        super.init()
    }

    deinit {
        // 正常销毁由 invalidate() 完成；这里仅作为异步运动资源的最终兜底。
        displayLink?.invalidate()
        displayLinkTarget?.callback = nil
        bounceAnimator?.stopAnimation(true)
    }

    // MARK: - 公共生命周期

    /// 启用或禁用嵌套滚动协调。所有 UIKit 状态修改都在主线程执行。
    public func setEnabled(_ value: Bool) {
        guard Thread.isMainThread else {
            DispatchQueue.main.sync {
                self.setEnabled(value)
            }
            return
        }

        if value, pendingDisable {
            // 属性在当前触摸结束前又切回启用，只需撤销延迟禁用。
            pendingDisable = false
            return
        }
        guard enabled != value else { return }
        if !value,
           let state = coordinatingPan?.state,
           state == .began || state == .changed {
            // 保留当前手势的结束回调，以便完整恢复 offset、回弹和 indicator。
            pendingDisable = true
            return
        }

        enabled = value
        if value {
            attachCoordinatingPan()
        } else {
            detach()
        }
    }

    /// 永久失效协调器并释放 WebView 引用，供 WebView 销毁或属性关闭时调用。
    public func invalidate() {
        guard Thread.isMainThread else {
            DispatchQueue.main.sync {
                self.invalidate()
            }
            return
        }

        enabled = false
        pendingDisable = false
        detach()
        webView = nil
    }

    /// 停止运动、恢复外观并从 WebView 移除自定义手势。
    private func detach() {
        cancelMotionAndRestore()
        if let pan = coordinatingPan {
            pan.touchesBeganCallback = nil
            pan.resetCallback = nil
            pan.delegate = nil
            webView?.removeGestureRecognizer(pan)
            coordinatingPan = nil
        }
        resetGestureState()
    }

    /// 创建独立单指 pan；不取消点击等触摸，只在确认纵向后取消系统滚动 pan。
    private func attachCoordinatingPan() {
        guard coordinatingPan == nil, let webView = webView else { return }

        let pan = WebViewNestedScrollPanGestureRecognizer(target: self, action: #selector(handlePan(_:)))
        pan.cancelsTouchesInView = false
        pan.delaysTouchesBegan = false
        pan.maximumNumberOfTouches = 1
        pan.delegate = self
        pan.touchesBeganCallback = { [weak self, weak webView] in
            guard let self = self, let webView = webView else { return }
            guard !self.hasCapturedGestureStart else { return }
            self.hasCapturedGestureStart = true
            self.beginGesture(inner: webView.scrollView)
        }
        pan.resetCallback = { [weak self] in
            guard let self = self, self.hasCapturedGestureStart else { return }
            // 正常 ended/failed target-action 会先清除此标记；这里只处理识别前直接失败的序列。
            self.hasCapturedGestureStart = false
            self.cancelMotionAndRestore()
            self.resetGestureState()
        }
        webView.addGestureRecognizer(pan)
        coordinatingPan = pan
    }

    // MARK: - 手势协商

    /// 与父子系统 pan 及 WebView 内部手势同时识别，避免自定义 pan 阻止 WebKit 辅助手势。
    public func gestureRecognizer(
        _ gestureRecognizer: UIGestureRecognizer,
        shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer
    ) -> Bool {
        guard gestureRecognizer === coordinatingPan else { return false }
        if otherGestureRecognizer === webView?.scrollView.panGestureRecognizer
            || otherGestureRecognizer === parentScrollView?.panGestureRecognizer {
            return true
        }

        // 不阻止 WebKit 内部的点击、长按、缩放和网页横向滚动手势；确认纵向后只取消父子系统 pan。
        guard let webView = webView, let gestureView = otherGestureRecognizer.view else { return false }
        return gestureView === webView || gestureView.isDescendant(of: webView)
    }

    /// 系统边缘侧滑优先于嵌套滚动，避免协调 pan 抢占导航返回手势。
    public func gestureRecognizer(
        _ gestureRecognizer: UIGestureRecognizer,
        shouldBeRequiredToFailBy otherGestureRecognizer: UIGestureRecognizer
    ) -> Bool {
        guard gestureRecognizer === coordinatingPan else { return false }
        return otherGestureRecognizer is UIScreenEdgePanGestureRecognizer
    }

    /// 触摸开始阶段已找到有效 parent 时才允许协调 pan 正式进入识别状态。
    public func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
        guard gestureRecognizer === coordinatingPan else { return true }
        guard parentScrollView != nil, let pan = gestureRecognizer as? UIPanGestureRecognizer else {
            return false
        }

        // 在 recognizer 正式开始前淘汰明显横向输入，避免参与后续 WebKit 手势仲裁。
        let velocity = pan.velocity(in: webView)
        if abs(velocity.x) > abs(velocity.y) * verticalDirectionRatio {
            if let inner = webView?.scrollView {
                restoreProvisionalInnerBounceIfNeeded(inner: inner)
            }
            discardGestureSnapshot()
            resetGestureState()
            return false
        }
        return true
    }

    /// 自定义 pan 的统一状态入口，拖动、结束和取消分别进入对应清理路径。
    @objc private func handlePan(_ pan: UIPanGestureRecognizer) {
        guard enabled, let inner = webView?.scrollView else { return }

        switch pan.state {
        case .began, .changed:
            updateGesture(inner: inner, pan: pan)
        case .ended:
            finishGesture(inner: inner, pan: pan, shouldDecelerate: true)
            completePendingDisable()
        case .cancelled, .failed:
            finishGesture(inner: inner, pan: pan, shouldDecelerate: false)
            completePendingDisable()
        default:
            break
        }
    }

    // MARK: - 触摸开始与方向判定

    /// 为新的物理触摸建立快照，并停止上一轮尚未结束的自定义运动。
    private func beginGesture(inner: UIScrollView) {
        // 新触摸拥有最高优先级：先固化旧运动当前位置，再建立本轮状态。
        cancelMotionAndRestore()

        guard let parent = findVerticalScrollViewAncestor() else {
            resetGestureState()
            return
        }

        if let previousParent = parentScrollView, previousParent !== parent {
            previousParent.panGestureRecognizer.removeTarget(
                self,
                action: #selector(handleObservedParentPan(_:))
            )
        }
        parentScrollView = parent
        observeParentPan(parent)

        // 快照必须在任何临时外观修改之前完成，确保所有退出路径可恢复原值。
        originalInnerShowsVerticalScrollIndicator = inner.showsVerticalScrollIndicator
        originalParentShowsVerticalScrollIndicator = parent.showsVerticalScrollIndicator
        originalInnerBounces = inner.bounces
        originalParentBounces = parent.bounces

        gestureAxis = .undecided
        isControllingVertical = false
        previousTranslationY = 0
        terminalOverscroll = 0

        // 手势起点只记录实际合法位置，方向未锁定前不写入父子 offset。
        gestureStartInnerY = clampedOffsetY(inner.contentOffset.y, in: inner)
        gestureStartParentY = clampedOffsetY(parent.contentOffset.y, in: parent)
        controlledInnerY = gestureStartInnerY
        controlledParentY = gestureStartParentY

        // 方向判定窗口内先禁止 inner 系统回弹，避免误判时由 WebKit 独占顶部 bounds。
        if inner.bounces {
            inner.bounces = false
            isProvisionalInnerBounceSuppressed = true
        }
    }

    /// 更新方向判定；纵向锁定后把累计 translation 转换为逐帧滚动增量。
    private func updateGesture(inner: UIScrollView, pan: UIPanGestureRecognizer) {
        guard let parent = parentScrollView else { return }

        let translation = pan.translation(in: webView)
        if gestureAxis == .undecided {
            let distanceX = abs(translation.x)
            let distanceY = abs(translation.y)
            let distance = max(distanceX, distanceY)
            guard distance >= directionThreshold else { return }

            // 明显纵向可提前锁定；位移扩大后逐步放宽，避免模糊手势长期悬而未决。
            let shouldLockVertical = distanceY > distanceX * verticalDirectionRatio
                || (distance >= directionResolutionThreshold && distanceY >= distanceX)
                || shouldPreferVerticalAtReverseBoundary(
                    translation: translation,
                    distanceX: distanceX,
                    distanceY: distanceY,
                    parent: parent
                )
            let shouldLockHorizontal = distance >= directionResolutionThreshold
                && (distanceX > distanceY * verticalDirectionRatio
                    || (distance >= finalDirectionResolutionThreshold && distanceX > distanceY))

            if shouldLockVertical {
                lockVerticalGesture(inner: inner, parent: parent)
            } else if shouldLockHorizontal {
                // 横向手势不进入单驱动，立即恢复方向窗口内临时关闭的 inner 回弹。
                restoreProvisionalInnerBounceIfNeeded(inner: inner)
                gestureAxis = .horizontal
                discardGestureSnapshot()
                return
            } else {
                return
            }
        }

        guard gestureAxis == .vertical else { return }

        // translation 向下为正，而 contentOffset 向底部滚动为正，因此需要反转符号。
        let scrollDelta = previousTranslationY - translation.y
        previousTranslationY = translation.y
        distribute(scrollDelta: scrollDelta, inner: inner, parent: parent, allowsTerminalBounce: true)
    }

    /// 向下拖且 parent 仍能回到顶部时，对近似斜向输入做纵向偏置。
    ///
    /// 该偏置避免 inner 在顶部先识别为网页横向手势，导致 parent 无法展开。
    private func shouldPreferVerticalAtReverseBoundary(
        translation: CGPoint,
        distanceX: CGFloat,
        distanceY: CGFloat,
        parent: UIScrollView
    ) -> Bool {
        guard max(distanceX, distanceY) >= directionResolutionThreshold,
              translation.y > 0,
              gestureStartParentY - minimumOffsetY(parent) > boundaryCapacityEpsilon else {
            return false
        }
        return distanceY >= distanceX * boundaryVerticalDirectionRatio
    }

    /// 确认纵向后取消父子系统 pan，并切换到协调器单一 offset 驱动。
    private func lockVerticalGesture(inner: UIScrollView, parent: UIScrollView) {
        gestureAxis = .vertical
        isControllingVertical = true
        isProvisionalInnerBounceSuppressed = false
        appearanceModified = true

        // 独立协调手势会继续接收位移，因此可以明确结束父子系统滚动的当前触摸序列。
        cancelCurrentSystemPan(parent.panGestureRecognizer)
        // 切换 isEnabled 会同步触发外部 target；若回调中销毁了协调器，不再继续写 UIKit 状态。
        guard isCurrentControlledSession(inner: inner, parent: parent) else { return }
        cancelCurrentSystemPan(inner.panGestureRecognizer)
        guard isCurrentControlledSession(inner: inner, parent: parent) else { return }

        // 清除阈值判定期间 UIKit 在父子容器上产生的漂移，再从起点分配完整 translation。
        controlledInnerY = gestureStartInnerY
        controlledParentY = gestureStartParentY
        terminalOverscroll = 0
        setOffsetY(controlledParentY, on: parent)
        guard isCurrentControlledSession(inner: inner, parent: parent) else { return }
        setOffsetY(controlledInnerY, on: inner)
        guard isCurrentControlledSession(inner: inner, parent: parent) else { return }

        // 纵向锁定后父子系统回弹都关闭，末端回弹完全由协调器计算。
        parent.bounces = false
        guard isCurrentControlledSession(inner: inner, parent: parent) else { return }
        inner.bounces = false
        // 受控会话改用无动画临时 thumb，避免反复触发 UIKit flash 动画。
        inner.showsVerticalScrollIndicator = false
        parent.showsVerticalScrollIndicator = false
    }

    // MARK: - 触摸结束与状态清理

    /// 结束当前物理触摸，并根据终端超量和离手速度选择回弹、减速或直接结束。
    private func finishGesture(
        inner: UIScrollView,
        pan: UIPanGestureRecognizer,
        shouldDecelerate: Bool
    ) {
        // 物理触摸已结束；离手运动期间的新触摸必须重新记录当前父子起点。
        hasCapturedGestureStart = false
        let axis = gestureAxis
        guard axis == .vertical, isControllingVertical else {
            restoreProvisionalInnerBounceIfNeeded(inner: inner)
            discardGestureSnapshot()
            resetGestureState()
            return
        }
        guard let parent = parentScrollView else {
            // 层级重建导致 parent 提前释放时，仍需恢复 inner 的回弹和 indicator。
            cancelMotionAndRestore()
            resetGestureState()
            return
        }

        let velocityY = -pan.velocity(in: webView).y
        let hasTerminalOverscroll = abs(terminalOverscroll) > .ulpOfOne
        gestureAxis = .undecided
        previousTranslationY = 0

        if hasTerminalOverscroll {
            // 已经产生终端视觉超量时优先回到合法边界，不叠加离手惯性。
            startBounceReturn(inner: inner, parent: parent)
        } else if shouldDecelerate && abs(velocityY) >= minimumDecelerationVelocity {
            startDeceleration(velocityY: velocityY, inner: inner, parent: parent)
        } else {
            finishControlledSession(inner: inner, parent: parent)
        }
    }

    /// 移除 parent pan 观察并清空手势态；不负责恢复外观或停止动画。
    private func resetGestureState() {
        parentScrollView?.panGestureRecognizer.removeTarget(
            self,
            action: #selector(handleObservedParentPan(_:))
        )
        parentScrollView = nil
        gestureAxis = .undecided
        isControllingVertical = false
        hasCapturedGestureStart = false
        isProvisionalInnerBounceSuppressed = false
        previousTranslationY = 0
        terminalOverscroll = 0
    }

    /// 在当前物理触摸结束后执行之前延迟的禁用请求。
    private func completePendingDisable() {
        guard pendingDisable else { return }
        pendingDisable = false
        enabled = false
        detach()
    }

    /// 观察 parent 的新触摸，使其也能立即打断协调器的离手运动。
    private func observeParentPan(_ parent: UIScrollView) {
        // 先移除可保证重复建立手势快照时不会多次注册相同 target。
        parent.panGestureRecognizer.removeTarget(self, action: #selector(handleObservedParentPan(_:)))
        parent.panGestureRecognizer.addTarget(self, action: #selector(handleObservedParentPan(_:)))
    }

    /// parent 在自定义惯性或回弹期间开始新触摸时，立即固化并结束旧运动。
    @objc private func handleObservedParentPan(_ pan: UIPanGestureRecognizer) {
        guard pan.state == .began, displayLink != nil || bounceAnimator != nil else { return }
        cancelMotionAndRestore()
        resetGestureState()
    }

    /// 通过重置 recognizer 明确结束 UIKit 当前滚动序列，防止系统与协调器同时写 offset。
    private func cancelCurrentSystemPan(_ pan: UIPanGestureRecognizer) {
        // `.possible` 仍可能在稍后开始识别，必须一并重置；只跳过已经进入终态的 recognizer。
        guard pan.isEnabled,
              pan.state == .possible || pan.state == .began || pan.state == .changed else {
            return
        }
        pan.isEnabled = false
        pan.isEnabled = true
    }

    // MARK: - 统一距离分配

    /// 拖动和离手减速统一走该链路；跨越边界时，剩余距离在同一帧继续传递。
    ///
    /// `scrollDelta > 0`：parent -> inner -> inner 底部超量。
    /// `scrollDelta < 0`：inner -> parent -> parent 顶部超量。
    /// `allowsTerminalBounce` 只在手指直接拖动时开启，离手惯性到最终边界后直接结束。
    private func distribute(
        scrollDelta: CGFloat,
        inner: UIScrollView,
        parent: UIScrollView,
        allowsTerminalBounce: Bool
    ) {
        // 网页重排、旋转或 inset 变化会动态缩小滚动范围，每帧分配前先修正权威位置。
        clampControlledOffsets(inner: inner, parent: parent)

        var remainingDelta = scrollDelta
        var frameConsumer: ActiveConsumer?

        // 反向输入先原路消耗已有末端超量，视觉位移按同一阻尼函数连续回退。
        if terminalOverscroll > 0, remainingDelta < 0 {
            let recovered = min(terminalOverscroll, -remainingDelta)
            terminalOverscroll -= recovered
            remainingDelta += recovered
            frameConsumer = .inner
        } else if terminalOverscroll < 0, remainingDelta > 0 {
            let recovered = min(-terminalOverscroll, remainingDelta)
            terminalOverscroll += recovered
            remainingDelta -= recovered
            frameConsumer = .parent
        }

        if remainingDelta > .ulpOfOne {
            var remaining = remainingDelta

            // 正向先收起 parent 的头部区域，再滚动 WebView 内容。
            let parentCapacity = max(0, maximumOffsetY(parent) - controlledParentY)
            let parentDistance = min(remaining, parentCapacity)
            controlledParentY += parentDistance
            remaining -= parentDistance
            if parentDistance > .ulpOfOne {
                frameConsumer = .parent
            }

            let innerCapacity = max(0, maximumOffsetY(inner) - controlledInnerY)
            let innerDistance = min(remaining, innerCapacity)
            controlledInnerY += innerDistance
            remaining -= innerDistance
            if innerDistance > .ulpOfOne {
                frameConsumer = .inner
            }

            if remaining > .ulpOfOne {
                // 两者均到正向边界，剩余距离只允许表现为 inner 底部回弹。
                frameConsumer = .inner
                if allowsTerminalBounce && originalInnerBounces == true {
                    terminalOverscroll += remaining
                }
            }
        } else if remainingDelta < -.ulpOfOne {
            var remaining = -remainingDelta

            // 反向先让 WebView 回到顶部，再把剩余距离交给 parent 展开头部。
            let innerCapacity = max(0, controlledInnerY - minimumOffsetY(inner))
            let innerDistance = min(remaining, innerCapacity)
            controlledInnerY -= innerDistance
            remaining -= innerDistance
            if innerDistance > .ulpOfOne {
                frameConsumer = .inner
            }

            let parentCapacity = max(0, controlledParentY - minimumOffsetY(parent))
            let parentDistance = min(remaining, parentCapacity)
            controlledParentY -= parentDistance
            remaining -= parentDistance
            if parentDistance > .ulpOfOne {
                frameConsumer = .parent
            }

            if remaining > .ulpOfOne {
                // 两者均到反向边界，剩余距离只允许表现为 parent 顶部回弹。
                frameConsumer = .parent
                if allowsTerminalBounce && originalParentBounces == true {
                    terminalOverscroll -= remaining
                }
            }
        }

        if let consumer = frameConsumer {
            updateActiveConsumer(consumer, inner: inner, parent: parent)
        }

        // 持续应用统一状态，保证边界切换和末端回弹位于同一坐标链路。
        _ = applyControlledOffsets(inner: inner, parent: parent)
    }

    /// 将权威合法 offset 与终端视觉超量合成为本帧最终位置并写入父子容器。
    ///
    /// offset 写入可能同步触发外部回调，因此在两次写入之间验证会话身份。
    @discardableResult
    private func applyControlledOffsets(inner: UIScrollView, parent: UIScrollView) -> Bool {
        guard isCurrentControlledSession(inner: inner, parent: parent) else { return false }

        var innerY = controlledInnerY
        var parentY = controlledParentY

        if terminalOverscroll > 0 {
            innerY = maximumOffsetY(inner) + rubberBandDistance(terminalOverscroll, dimension: inner.bounds.height)
        } else if terminalOverscroll < 0 {
            parentY = minimumOffsetY(parent) - rubberBandDistance(-terminalOverscroll, dimension: parent.bounds.height)
        }

        setOffsetY(parentY, on: parent)
        guard isCurrentControlledSession(inner: inner, parent: parent) else { return false }
        setOffsetY(innerY, on: inner)
        return isCurrentControlledSession(inner: inner, parent: parent)
    }

    /// 使用 UIScrollView 常见的有界阻尼曲线，超量越大，新增视觉位移越小。
    private func rubberBandDistance(_ distance: CGFloat, dimension: CGFloat) -> CGFloat {
        let safeDimension = max(1, dimension)
        return safeDimension * rubberBandCoefficient * distance
            / (safeDimension + rubberBandCoefficient * distance)
    }

    // MARK: - 回弹与离手惯性

    /// 将 parent 顶部或 inner 底部的终端视觉超量动画恢复到权威合法 offset。
    private func startBounceReturn(inner: UIScrollView, parent: UIScrollView) {
        stopDisplayLink()
        motionGeneration += 1
        let generation = motionGeneration
        // animator 从当前 presentation 状态动画到合法 offset，逻辑超量可立即清零。
        terminalOverscroll = 0

        let animator = UIViewPropertyAnimator(duration: bounceReturnDuration, curve: .easeOut) { [weak self, weak inner, weak parent] in
            guard let self = self, let inner = inner, let parent = parent else { return }
            guard self.motionGeneration == generation,
                  self.isCurrentControlledSession(inner: inner, parent: parent) else {
                return
            }
            self.setOffsetY(self.controlledParentY, on: parent)
            guard self.motionGeneration == generation,
                  self.isCurrentControlledSession(inner: inner, parent: parent) else {
                return
            }
            self.setOffsetY(self.controlledInnerY, on: inner)
        }
        bounceAnimator = animator
        animator.addCompletion { [weak self, weak inner, weak parent] _ in
            // 被新触摸取消的旧 animator 仍可能回调 completion，以代际编号过滤。
            guard let self = self, self.motionGeneration == generation else { return }
            self.bounceAnimator = nil
            guard let inner = inner, let parent = parent else {
                // 动画期间层级被拆除时，恢复仍存在的 inner 并清理整个受控会话。
                self.cancelMotionAndRestore()
                self.resetGestureState()
                return
            }
            self.finishControlledSession(inner: inner, parent: parent)
        }
        animator.startAnimation()
    }

    /// 使用离手速度启动逐帧自定义减速，后续仍通过统一距离分配跨越父子边界。
    private func startDeceleration(
        velocityY: CGFloat,
        inner: UIScrollView,
        parent: UIScrollView
    ) {
        stopDisplayLink()
        terminalOverscroll = 0
        decelerationVelocityY = velocityY
        previousDisplayTimestamp = 0

        // CADisplayLink 强持有 target，因此由独立 target 再弱引用回协调器。
        let target = WebViewNestedScrollDisplayLinkTarget()
        target.callback = { [weak self, weak inner, weak parent] displayLink in
            guard let inner = inner, let parent = parent else {
                self?.cancelMotionAndRestore()
                self?.resetGestureState()
                return
            }
            self?.stepDeceleration(displayLink, inner: inner, parent: parent)
        }
        let link = CADisplayLink(
            target: target,
            selector: #selector(WebViewNestedScrollDisplayLinkTarget.handleDisplayLink(_:))
        )
        displayLinkTarget = target
        displayLink = link
        link.add(to: .main, forMode: .common)
    }

    /// 执行一帧减速积分；任何新的系统跟踪或拖动都会立即终止旧运动。
    private func stepDeceleration(
        _ displayLink: CADisplayLink,
        inner: UIScrollView,
        parent: UIScrollView
    ) {
        guard enabled,
              self.displayLink === displayLink,
              webView?.scrollView === inner,
              parentScrollView === parent,
              !inner.isTracking,
              !parent.isTracking,
              !inner.isDragging,
              !parent.isDragging,
              inner.panGestureRecognizer.state != .began,
              inner.panGestureRecognizer.state != .changed,
              parent.panGestureRecognizer.state != .began,
              parent.panGestureRecognizer.state != .changed else {
            cancelMotionAndRestore()
            resetGestureState()
            return
        }

        // 范围可能在两帧之间变化；先夹紧，再覆盖 WebKit 可能残留的系统减速写入。
        clampControlledOffsets(inner: inner, parent: parent)
        guard applyControlledOffsets(inner: inner, parent: parent),
              isCurrentDecelerationSession(displayLink, inner: inner, parent: parent) else {
            cancelMotionAndRestore()
            resetGestureState()
            return
        }

        let elapsed: CFTimeInterval
        if previousDisplayTimestamp > 0 {
            elapsed = displayLink.timestamp - previousDisplayTimestamp
        } else {
            elapsed = displayLink.targetTimestamp - displayLink.timestamp
        }
        previousDisplayTimestamp = displayLink.timestamp
        guard elapsed > 0 else { return }

        // decelerationRate 是每毫秒速度保留比例，按真实帧间隔积分位移。
        let rate = CGFloat(UIScrollView.DecelerationRate.normal.rawValue)
        let elapsedMilliseconds = CGFloat(elapsed * 1000)
        let decay = pow(rate, elapsedMilliseconds)
        let scrollDelta = decelerationVelocityY / 1000 * rate * (1 - decay) / (1 - rate)

        let beforeInnerY = controlledInnerY
        let beforeParentY = controlledParentY
        distribute(scrollDelta: scrollDelta, inner: inner, parent: parent, allowsTerminalBounce: false)
        guard isCurrentDecelerationSession(displayLink, inner: inner, parent: parent) else {
            cancelMotionAndRestore()
            resetGestureState()
            return
        }
        decelerationVelocityY *= decay

        // 没有容器继续消费距离等同于到达最终边界，无需等待速度自然衰减完毕。
        let consumed = abs(controlledInnerY - beforeInnerY) + abs(controlledParentY - beforeParentY)
        if abs(decelerationVelocityY) < minimumDecelerationVelocity || consumed < 0.01 {
            finishControlledSession(inner: inner, parent: parent)
        }
    }

    /// offset 写入可能同步触发外部回调，每次写入后确认当前帧仍属于同一减速会话。
    private func isCurrentDecelerationSession(
        _ displayLink: CADisplayLink,
        inner: UIScrollView,
        parent: UIScrollView
    ) -> Bool {
        return enabled
            && self.displayLink === displayLink
            && webView?.scrollView === inner
            && parentScrollView === parent
    }

    /// 确认父子引用仍属于当前纵向单驱动会话。
    private func isCurrentControlledSession(inner: UIScrollView, parent: UIScrollView) -> Bool {
        return enabled
            && isControllingVertical
            && coordinatingPan != nil
            && webView?.scrollView === inner
            && parentScrollView === parent
    }

    /// 正常结束纵向受控会话，夹紧位置并恢复父子原始外观。
    private func finishControlledSession(inner: UIScrollView, parent: UIScrollView) {
        stopDisplayLink()
        bounceAnimator?.stopAnimation(true)
        bounceAnimator = nil
        terminalOverscroll = 0
        setOffsetY(clampedOffsetY(controlledParentY, in: parent), on: parent)
        setOffsetY(clampedOffsetY(controlledInnerY, in: inner), on: inner)
        restoreScrollAppearance(inner: inner, parent: parent)
        resetGestureState()
    }

    /// 被新触摸、禁用或销毁打断时停止运动，并固化当前合法位置和外观。
    private func cancelMotionAndRestore() {
        motionGeneration += 1
        stopDisplayLink()
        bounceAnimator?.stopAnimation(true)
        bounceAnimator = nil

        if isControllingVertical {
            terminalOverscroll = 0
            if let inner = webView?.scrollView {
                controlledInnerY = clampedOffsetY(controlledInnerY, in: inner)
                setOffsetY(controlledInnerY, on: inner)
                restoreInnerAppearance(inner)
            }
            if let parent = parentScrollView {
                controlledParentY = clampedOffsetY(controlledParentY, in: parent)
                setOffsetY(controlledParentY, on: parent)
                restoreParentAppearance(parent)
            }
            discardGestureSnapshot()
        } else {
            // 方向尚未锁定时只可能临时修改 inner.bounces，无需处理 parent 外观。
            if let inner = webView?.scrollView {
                restoreProvisionalInnerBounceIfNeeded(inner: inner)
            }
            discardGestureSnapshot()
        }
    }

    /// 恢复方向判定窗口内临时关闭的 inner 回弹。
    private func restoreProvisionalInnerBounceIfNeeded(inner: UIScrollView) {
        guard isProvisionalInnerBounceSuppressed else { return }
        if let originalValue = originalInnerBounces {
            inner.bounces = originalValue
        }
        isProvisionalInnerBounceSuppressed = false
    }

    /// 停止并释放离手惯性的完整引用链，同时清空积分状态。
    private func stopDisplayLink() {
        displayLink?.invalidate()
        displayLink = nil
        displayLinkTarget?.callback = nil
        displayLinkTarget = nil
        decelerationVelocityY = 0
        previousDisplayTimestamp = 0
    }

    // MARK: - Indicator 与外观恢复

    /// 根据当前距离消费者切换纵向 indicator，避免父子滚动条同时显示。
    private func updateActiveConsumer(
        _ consumer: ActiveConsumer,
        inner: UIScrollView,
        parent: UIScrollView
    ) {
        guard activeConsumer != consumer else { return }
        activeConsumer = consumer

        switch consumer {
        case .inner:
            inner.showsVerticalScrollIndicator = originalInnerShowsVerticalScrollIndicator ?? false
            parent.showsVerticalScrollIndicator = false
            if originalInnerShowsVerticalScrollIndicator == true {
                inner.flashScrollIndicators()
            }
        case .parent:
            inner.showsVerticalScrollIndicator = false
            parent.showsVerticalScrollIndicator = originalParentShowsVerticalScrollIndicator ?? false
            if originalParentShowsVerticalScrollIndicator == true {
                parent.flashScrollIndicators()
            }
        }
    }

    /// 恢复纵向锁定前保存的回弹与 indicator 配置，并丢弃本轮快照。
    private func restoreScrollAppearance(inner: UIScrollView, parent: UIScrollView) {
        if appearanceModified {
            restoreInnerAppearance(inner)
            restoreParentAppearance(parent)
        }
        discardGestureSnapshot()
    }

    /// 单独恢复 inner，使 parent 已释放或层级重建时 WebView 不会残留受控外观。
    private func restoreInnerAppearance(_ inner: UIScrollView) {
        if let originalValue = originalInnerShowsVerticalScrollIndicator {
            inner.showsVerticalScrollIndicator = originalValue
        }
        if let originalValue = originalInnerBounces {
            inner.bounces = originalValue
        }
    }

    /// 恢复 parent 在手势开始时的 indicator 和回弹配置。
    private func restoreParentAppearance(_ parent: UIScrollView) {
        if let originalValue = originalParentShowsVerticalScrollIndicator {
            parent.showsVerticalScrollIndicator = originalValue
        }
        if let originalValue = originalParentBounces {
            parent.bounces = originalValue
        }
    }

    /// 清空外观快照和消费者状态；调用前必须先完成需要的实际外观恢复。
    private func discardGestureSnapshot() {
        originalInnerShowsVerticalScrollIndicator = nil
        originalParentShowsVerticalScrollIndicator = nil
        originalInnerBounces = nil
        originalParentBounces = nil
        activeConsumer = nil
        appearanceModified = false
    }

    // MARK: - 滚动范围工具

    /// 从 WebView 向上寻找最近的、以纵向滚动为主的有效父 UIScrollView。
    private func findVerticalScrollViewAncestor() -> UIScrollView? {
        guard let webView = webView else { return nil }
        var ancestor = webView.superview
        while let view = ancestor {
            if let scrollView = view as? UIScrollView, scrollView !== webView.scrollView {
                let verticalRange = maximumOffsetY(scrollView) - minimumOffsetY(scrollView)
                let horizontalRange = max(
                    0,
                    scrollView.contentSize.width - scrollView.bounds.width
                        + scrollView.adjustedContentInset.left + scrollView.adjustedContentInset.right
                )
                if scrollView.isScrollEnabled,
                   scrollView.panGestureRecognizer.isEnabled,
                   verticalRange > 1,
                   (verticalRange >= horizontalRange || scrollView.alwaysBounceVertical) {
                    return scrollView
                }
            }
            ancestor = view.superview
        }
        return nil
    }

    /// 考虑 adjustedContentInset 后的最小合法纵向 offset。
    private func minimumOffsetY(_ scrollView: UIScrollView) -> CGFloat {
        return -scrollView.adjustedContentInset.top
    }

    /// 考虑内容尺寸、可视区域和 adjustedContentInset 后的最大合法纵向 offset。
    private func maximumOffsetY(_ scrollView: UIScrollView) -> CGFloat {
        return max(
            minimumOffsetY(scrollView),
            scrollView.contentSize.height - scrollView.bounds.height + scrollView.adjustedContentInset.bottom
        )
    }

    /// 将纵向 offset 限制在当前滚动范围内。
    private func clampedOffsetY(_ value: CGFloat, in scrollView: UIScrollView) -> CGFloat {
        return min(max(value, minimumOffsetY(scrollView)), maximumOffsetY(scrollView))
    }

    /// 在内容尺寸或安全区变化后同步修正父子权威 offset，不读取 UIKit 本帧漂移。
    private func clampControlledOffsets(inner: UIScrollView, parent: UIScrollView) {
        controlledInnerY = clampedOffsetY(controlledInnerY, in: inner)
        controlledParentY = clampedOffsetY(controlledParentY, in: parent)

        // 范围扩展后旧位置已不在终端边界，之前累计的视觉超量不再有效。
        if terminalOverscroll > 0,
           controlledInnerY < maximumOffsetY(inner) - boundaryCapacityEpsilon {
            terminalOverscroll = 0
        } else if terminalOverscroll < 0,
                  controlledParentY > minimumOffsetY(parent) + boundaryCapacityEpsilon {
            terminalOverscroll = 0
        }
    }

    /// 保留横向 offset，仅在纵向变化超过浮点误差时写入，减少无效滚动回调。
    private func setOffsetY(_ value: CGFloat, on scrollView: UIScrollView) {
        guard abs(scrollView.contentOffset.y - value) > 0.01 else { return }
        scrollView.setContentOffset(CGPoint(x: scrollView.contentOffset.x, y: value), animated: false)
    }
}
