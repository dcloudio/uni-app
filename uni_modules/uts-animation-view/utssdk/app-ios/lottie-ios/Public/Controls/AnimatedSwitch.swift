//
//  AnimatedSwitch.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 2/4/19.
//

#if canImport(UIKit)
import UIKit
#elseif canImport(AppKit)
import AppKit
#endif

// MARK: - AnimatedSwitch

/// An interactive switch with an 'On' and 'Off' state. When the user taps on the
/// switch the state is toggled and the appropriate animation is played.
///
/// Both the 'On' and 'Off' have an animation play range associated with their state.
///
/// Also available as a SwiftUI view (`LottieSwitch`).
open class AnimatedSwitch: AnimatedControl {

  // MARK: Lifecycle

  public override init(
    animation: LottieAnimation?,
    configuration: LottieConfiguration = .shared)
  {
    /// Generate a haptic generator if available.
    #if os(iOS)
    hapticGenerator = HapticGenerator()
    #else
    hapticGenerator = NullHapticGenerator()
    #endif
    super.init(animation: animation, configuration: configuration)

    #if canImport(UIKit)
    isAccessibilityElement = true
    #elseif canImport(AppKit)
    setAccessibilityElement(true)
    #endif

    updateOnState(isOn: _isOn, animated: false, shouldFireHaptics: false)
  }

  public override init() {
    /// Generate a haptic generator if available.
    #if os(iOS)
    hapticGenerator = HapticGenerator()
    #else
    hapticGenerator = NullHapticGenerator()
    #endif

    super.init()

    #if canImport(UIKit)
    isAccessibilityElement = true
    #elseif canImport(AppKit)
    setAccessibilityElement(true)
    #endif

    updateOnState(isOn: _isOn, animated: false, shouldFireHaptics: false)
  }

  required public init?(coder aDecoder: NSCoder) {
    /// Generate a haptic generator if available.
    #if os(iOS)
    hapticGenerator = HapticGenerator()
    #else
    hapticGenerator = NullHapticGenerator()
    #endif
    super.init(coder: aDecoder)

    #if canImport(UIKit)
    isAccessibilityElement = true
    #elseif canImport(AppKit)
    setAccessibilityElement(true)
    #endif
  }

  // MARK: Open

  open override func animationDidSet() {
    updateOnState(isOn: _isOn, animated: animateUpdateWhenChangingAnimation, shouldFireHaptics: false)
  }

  #if canImport(UIKit)
  open override func endTracking(_ touch: UITouch?, with event: UIEvent?) {
    super.endTracking(touch, with: event)
    updateOnState(isOn: !_isOn, animated: true, shouldFireHaptics: true)
    sendActions(for: .valueChanged)
  }

  #elseif canImport(AppKit)
  open override func handle(_ event: LottieNSControlEvent) {
    super.handle(event)

    if event == .touchUpInside {
      updateOnState(isOn: !_isOn, animated: true, shouldFireHaptics: true)
    }
  }
  #endif

  // MARK: Public

  /// Defines what happens when the user taps the switch while an
  /// animation is still in flight
  public enum CancelBehavior {
    case reverse // default - plays the current animation in reverse
    case none // does not update the animation when canceled
  }

  /// The cancel behavior for the switch. See CancelBehavior for options
  public var cancelBehavior: CancelBehavior = .reverse

  /// If `false` the switch will not play the animation when changing between animations.
  public var animateUpdateWhenChangingAnimation = true

  #if canImport(UIKit)
  public override var accessibilityTraits: UIAccessibilityTraits {
    set { super.accessibilityTraits = newValue }
    get { super.accessibilityTraits.union(.button) }
  }
  #endif

  /// A closure that is called when the `isOn` state is updated
  public var stateUpdated: ((_ isOn: Bool) -> Void)?

  /// The current state of the switch.
  public var isOn: Bool {
    set {
      /// This is forwarded to a private variable because the animation needs to be updated without animation when set externally and with animation when set internally.
      guard _isOn != newValue else { return }
      updateOnState(isOn: newValue, animated: false, shouldFireHaptics: false)
    }
    get {
      _isOn
    }
  }

  /// Set the state of the switch and specify animation and haptics
  public func setIsOn(_ isOn: Bool, animated: Bool, shouldFireHaptics: Bool = true) {
    guard isOn != _isOn else { return }
    updateOnState(isOn: isOn, animated: animated, shouldFireHaptics: shouldFireHaptics)
  }

  /// Sets the play range for the given state. When the switch is toggled, the animation range is played.
  public func setProgressForState(
    fromProgress: AnimationProgressTime,
    toProgress: AnimationProgressTime,
    forOnState: Bool)
  {
    if forOnState {
      onStartProgress = fromProgress
      onEndProgress = toProgress
    } else {
      offStartProgress = fromProgress
      offEndProgress = toProgress
    }

    updateOnState(isOn: _isOn, animated: false, shouldFireHaptics: false)
  }

  // MARK: Internal

  private(set) var onStartProgress: CGFloat = 0
  private(set) var onEndProgress: CGFloat = 1
  private(set) var offStartProgress: CGFloat = 1
  private(set) var offEndProgress: CGFloat = 0

  // MARK: Animation State

  func updateOnState(isOn: Bool, animated: Bool, shouldFireHaptics: Bool) {
    _isOn = isOn
    var startProgress = isOn ? onStartProgress : offStartProgress
    var endProgress = isOn ? onEndProgress : offEndProgress
    let finalProgress = endProgress

    if cancelBehavior == .reverse {
      let realtimeProgress = animationView.realtimeAnimationProgress

      let previousStateStart = isOn ? offStartProgress : onStartProgress
      let previousStateEnd = isOn ? offEndProgress : onEndProgress
      if
        realtimeProgress.isInRange(
          min(previousStateStart, previousStateEnd),
          max(previousStateStart, previousStateEnd))
      {
        /// Animation is currently in the previous time range. Reverse the previous play.
        startProgress = previousStateEnd
        endProgress = previousStateStart
      }
    }

    updateAccessibilityLabel()

    guard animated == true else {
      animationView.currentProgress = finalProgress
      return
    }

    if shouldFireHaptics {
      hapticGenerator.generateImpact()
    }

    animationView.play(
      fromProgress: startProgress,
      toProgress: endProgress,
      loopMode: LottieLoopMode.playOnce,
      completion: { [weak self] finished in
        guard let self else { return }

        // For the Main Thread rendering engine, we freeze the animation at the expected final progress
        // once the animation is complete. This isn't necessary on the Core Animation engine.
        if finished, !(self.animationView.animationLayer is CoreAnimationLayer) {
          self.animationView.currentProgress = finalProgress
        }
      })
  }

  // MARK: Fileprivate

  fileprivate var hapticGenerator: ImpactGenerator

  fileprivate var _isOn = false {
    didSet {
      stateUpdated?(_isOn)
    }
  }

  // MARK: Private

  private func updateAccessibilityLabel() {
    let value = _isOn ? NSLocalizedString("On", comment: "On") : NSLocalizedString("Off", comment: "Off")

    #if canImport(UIKit)
    accessibilityValue = value
    #elseif canImport(AppKit)
    setAccessibilityValue(value)
    #endif
  }

}

// MARK: - ImpactGenerator

protocol ImpactGenerator {
  func generateImpact()
}

#if os(iOS)
class HapticGenerator: ImpactGenerator {

  // MARK: Internal

  func generateImpact() {
    impact.impactOccurred()
  }

  // MARK: Fileprivate

  fileprivate let impact = UIImpactFeedbackGenerator(style: .light)
}
#else
// MARK: - NullHapticGenerator

class NullHapticGenerator: ImpactGenerator {
  func generateImpact() { }
}
#endif
