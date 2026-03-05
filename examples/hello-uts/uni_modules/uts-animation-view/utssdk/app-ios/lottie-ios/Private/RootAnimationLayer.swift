// Created by Cal Stephens on 12/13/21.
// Copyright © 2021 Airbnb Inc. All rights reserved.

import QuartzCore

// MARK: - RootAnimationLayer

/// A root `CALayer` responsible for playing a Lottie animation
protocol RootAnimationLayer: CALayer {
  var lottieAnimationLayer: LottieAnimationLayer? { get set }

  var currentFrame: AnimationFrameTime { get set }
  var renderScale: CGFloat { get set }
  var respectAnimationFrameRate: Bool { get set }

  var _animationLayers: [CALayer] { get }
  var imageProvider: AnimationImageProvider { get set }
  var textProvider: AnimationKeypathTextProvider { get set }
  var fontProvider: AnimationFontProvider { get set }

  /// The `CAAnimation` key corresponding to the primary animation.
  ///  - `LottieAnimationView` uses this key to check if the animation is still active
  var primaryAnimationKey: AnimationKey { get }

  /// Whether or not this layer is currently playing an animation
  ///  - If the layer returns `nil`, `LottieAnimationView` determines if an animation
  ///    is playing by checking if there is an active animation for `primaryAnimationKey`
  var isAnimationPlaying: Bool? { get }

  /// Instructs this layer to remove all `CAAnimation`s,
  /// other than the `CAAnimation` managed by `LottieAnimationView` (if applicable)
  func removeAnimations()

  func reloadImages()
  func forceDisplayUpdate()
  func logHierarchyKeypaths()
  func allHierarchyKeypaths() -> [String]
  func setValueProvider(_ valueProvider: AnyValueProvider, keypath: AnimationKeypath)
  func getValue(for keypath: AnimationKeypath, atFrame: AnimationFrameTime?) -> Any?
  func getOriginalValue(for keypath: AnimationKeypath, atFrame: AnimationFrameTime?) -> Any?

  func layer(for keypath: AnimationKeypath) -> CALayer?
  func animatorNodes(for keypath: AnimationKeypath) -> [AnimatorNode]?
}

// MARK: - AnimationKey

enum AnimationKey {
  /// The primary animation and its key should be managed by `LottieAnimationView`
  case managed
  /// The primary animation always uses the given key
  case specific(String)
}
