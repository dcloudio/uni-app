//
//  AnimatedButton.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 2/4/19.
//

#if canImport(UIKit)
import UIKit
#elseif canImport(AppKit)
import AppKit
#endif

// MARK: - AnimatedButton

/// An interactive button that plays an animation when pressed.
open class AnimatedButton: AnimatedControl {

  // MARK: Lifecycle

  public override init(
    animation: LottieAnimation?,
    configuration: LottieConfiguration = .shared)
  {
    super.init(animation: animation, configuration: configuration)

    #if canImport(UIKit)
    isAccessibilityElement = true
    #elseif canImport(AppKit)
    setAccessibilityElement(true)
    #endif
  }

  public override init() {
    super.init()

    #if canImport(UIKit)
    isAccessibilityElement = true
    #elseif canImport(AppKit)
    setAccessibilityElement(true)
    #endif
  }

  required public init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)

    #if canImport(UIKit)
    isAccessibilityElement = true
    #elseif canImport(AppKit)
    setAccessibilityElement(true)
    #endif
  }

  // MARK: Open

  #if canImport(UIKit)
  open override func beginTracking(_ touch: UITouch, with event: UIEvent?) -> Bool {
    let _ = super.beginTracking(touch, with: event)
    let touchEvent = UIControl.Event.touchDown
    if let playRange = rangesForEvents[touchEvent.id] {
      animationView.play(fromProgress: playRange.from, toProgress: playRange.to, loopMode: .playOnce)
    }
    return true
  }

  open override func endTracking(_ touch: UITouch?, with event: UIEvent?) {
    super.endTracking(touch, with: event)
    let touchEvent: UIControl.Event
    if let touch, bounds.contains(touch.location(in: self)) {
      touchEvent = UIControl.Event.touchUpInside
      performAction?()
    } else {
      touchEvent = UIControl.Event.touchUpOutside
    }

    if let playRange = rangesForEvents[touchEvent.id] {
      animationView.play(fromProgress: playRange.from, toProgress: playRange.to, loopMode: .playOnce)
    }
  }

  #elseif canImport(AppKit)
  open override func handle(_ event: LottieNSControlEvent) {
    super.handle(event)

    if let playRange = rangesForEvents[event.id] {
      animationView.play(fromProgress: playRange.from, toProgress: playRange.to, loopMode: .playOnce)
    }

    if event == .touchUpInside {
      performAction?()
    }
  }
  #endif

  // MARK: Public

  /// A closure that is called when the button is pressed / clicked
  public var performAction: (() -> Void)?

  #if canImport(UIKit)
  public override var accessibilityTraits: UIAccessibilityTraits {
    set { super.accessibilityTraits = newValue }
    get { super.accessibilityTraits.union(.button) }
  }
  #endif

  /// Sets the play range for the given UIControlEvent.
  public func setPlayRange(fromProgress: AnimationProgressTime, toProgress: AnimationProgressTime, event: LottieControlEvent) {
    rangesForEvents[event.id] = (from: fromProgress, to: toProgress)
  }

  /// Sets the play range for the given UIControlEvent.
  public func setPlayRange(fromMarker fromName: String, toMarker toName: String, event: LottieControlEvent) {
    if
      let start = animationView.progressTime(forMarker: fromName),
      let end = animationView.progressTime(forMarker: toName)
    {
      rangesForEvents[event.id] = (from: start, to: end)
    }
  }

  // MARK: Private

  private var rangesForEvents: [AnyHashable: (from: CGFloat, to: CGFloat)] = [LottieControlEvent.touchUpInside.id: (
    from: 0,
    to: 1)]
}
