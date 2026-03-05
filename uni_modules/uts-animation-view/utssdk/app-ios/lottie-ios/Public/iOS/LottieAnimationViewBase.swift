//
//  LottieAnimationViewBase.swift
//  lottie-swift-iOS
//
//  Created by Brandon Withrow on 2/6/19.
//

#if canImport(UIKit)
import UIKit

/// The base view for `LottieAnimationView` on iOS, tvOS, watchOS, and macCatalyst.
///
/// Enables the `LottieAnimationView` implementation to be shared across platforms.
open class LottieAnimationViewBase: UIView {

  // MARK: Public

  public override var contentMode: UIView.ContentMode {
    didSet {
      setNeedsLayout()
    }
  }

  public override func didMoveToWindow() {
    super.didMoveToWindow()
    animationMovedToWindow()
  }

  public override func layoutSubviews() {
    super.layoutSubviews()
    layoutAnimation()
  }

  // MARK: Internal

  var viewLayer: CALayer? {
    layer
  }

  var screenScale: CGFloat {
    #if os(iOS) || os(tvOS)
    if #available(iOS 13.0, tvOS 13.0, *) {
      return max(UITraitCollection.current.displayScale, 1)
    } else {
      return UIScreen.main.scale
    }
    #else // if os(visionOS)
    // We intentionally don't check `#if os(visionOS)`, because that emits
    // a warning when building on Xcode 14 and earlier.
    1.0
    #endif
  }

  func layoutAnimation() {
    // Implemented by subclasses.
  }

  func animationMovedToWindow() {
    // Implemented by subclasses.
  }

  func commonInit() {
    contentMode = .scaleAspectFit
    clipsToBounds = true
    NotificationCenter.default.addObserver(
      self,
      selector: #selector(animationWillEnterForeground),
      name: UIApplication.willEnterForegroundNotification,
      object: nil)
    NotificationCenter.default.addObserver(
      self,
      selector: #selector(animationWillMoveToBackground),
      name: UIApplication.didEnterBackgroundNotification,
      object: nil)
  }

  @objc
  func animationWillMoveToBackground() {
    // Implemented by subclasses.
  }

  @objc
  func animationWillEnterForeground() {
    // Implemented by subclasses.
  }
}
#endif
