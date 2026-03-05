//
// DotLottieConfiguration.swift
// Lottie
//
// Created by Evandro Hoffmann on 19/10/22.
//

// MARK: - DotLottieConfiguration

/// The `DotLottieConfiguration` model holds the presets extracted from DotLottieAnimation
///  - The presets are used as input to setup `LottieAnimationView` before playing the animation.
public struct DotLottieConfiguration {

  // MARK: Public

  /// id of the animation
  public var id: String

  /// Loop behavior of animation
  public var loopMode: LottieLoopMode

  /// Playback speed of animation
  public var speed: Double

  /// Animation Image Provider
  public var imageProvider: AnimationImageProvider? {
    dotLottieImageProvider
  }

  // MARK: Internal

  /// The underlying `DotLottieImageProvider` used by this dotLottie animation
  var dotLottieImageProvider: DotLottieImageProvider?
}

// MARK: - DotLottieConfigurationComponents

/// Components of the `DotLottieConfiguration` to apply to the `LottieAnimationView`.
///  - When using `LottieView`, if the component is selected to be applied it will
///    override any value provided via other `LottieView` APIs.
public struct DotLottieConfigurationComponents: OptionSet {

  // MARK: Lifecycle

  public init(rawValue: Int) {
    self.rawValue = rawValue
  }

  // MARK: Public

  /// `DotLottieConfiguration.imageProvider` will be applied to the `LottieAnimationView`
  ///  - When using `LottieView`, the image provider from the dotLottie animation will override
  ///    the image provider applied manually using `LottieView.imageProvider(...)`.
  public static let imageProvider = DotLottieConfigurationComponents(rawValue: 1 << 0)

  /// `DotLottieConfigurationMode.loopMode` will be applied to the `LottieAnimationView`.
  ///  - When using `LottieView`, the loop mode from the dotLottie animation will override
  ///    the loopMode applied by any playback method.
  public static let loopMode = DotLottieConfigurationComponents(rawValue: 1 << 1)

  /// `DotLottieConfigurationMode.speed` will be applied to the `LottieAnimationView`.
  ///  - When using `LottieView`, the speed from the dotLottie animation will override
  ///    the speed applied manually using `LottieView.animationSpeed(...)`.
  public static let animationSpeed = DotLottieConfigurationComponents(rawValue: 1 << 2)

  public static let all: DotLottieConfigurationComponents = [.imageProvider, .loopMode, .animationSpeed]

  public static let none: DotLottieConfigurationComponents = []

  public let rawValue: Int

}
