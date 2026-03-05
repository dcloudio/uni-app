// Created by Cal Stephens on 12/13/21.
// Copyright © 2021 Airbnb Inc. All rights reserved.

import QuartzCore

/// Global configuration options for Lottie animations
public struct LottieConfiguration: Hashable {

  // MARK: Lifecycle

  public init(
    renderingEngine: RenderingEngineOption = .automatic,
    decodingStrategy: DecodingStrategy = .dictionaryBased,
    colorSpace: CGColorSpace = CGColorSpaceCreateDeviceRGB(),
    reducedMotionOption: ReducedMotionOption = .systemReducedMotionToggle)
  {
    self.renderingEngine = renderingEngine
    self.decodingStrategy = decodingStrategy
    self.colorSpace = colorSpace
    self.reducedMotionOption = reducedMotionOption
  }

  // MARK: Public

  /// The global configuration of Lottie,
  /// which applies to all `LottieAnimationView`s by default.
  public static var shared = LottieConfiguration()

  /// The rendering engine implementation to use when displaying an animation
  ///  - Defaults to `RenderingEngineOption.automatic`, which uses the
  ///    Core Animation rendering engine for supported animations, and
  ///    falls back to using the Main Thread rendering engine for
  ///    animations that use features not supported by the Core Animation engine.
  public var renderingEngine: RenderingEngineOption

  /// The decoding implementation to use when parsing an animation JSON file
  public var decodingStrategy: DecodingStrategy

  /// Options for controlling animation behavior in response to user / system "reduced motion" configuration.
  ///  - Defaults to `ReducedMotionOption.systemReducedMotionToggle`, which returns `.reducedMotion`
  ///    when the system `UIAccessibility.isReduceMotionEnabled` option is `true`.
  public var reducedMotionOption: ReducedMotionOption

  /// The color space to be used for rendering
  ///  - Defaults to `CGColorSpaceCreateDeviceRGB()`
  public var colorSpace: CGColorSpace
}
