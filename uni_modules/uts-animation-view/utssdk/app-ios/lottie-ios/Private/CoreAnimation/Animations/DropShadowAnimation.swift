// Created by Cal Stephens on 8/15/23.
// Copyright © 2023 Airbnb Inc. All rights reserved.

import QuartzCore

// MARK: - DropShadowModel

protocol DropShadowModel {
  /// The opacity of the drop shadow, from 0 to 100.
  var _opacity: KeyframeGroup<LottieVector1D>? { get }

  /// The shadow radius of the blur
  var _radius: KeyframeGroup<LottieVector1D>? { get }

  /// The color of the drop shadow
  var _color: KeyframeGroup<LottieColor>? { get }

  /// The angle of the drop shadow, in degrees,
  /// with "90" resulting in a shadow directly beneath the layer.
  /// Combines with the `distance` to form the `shadowOffset`.
  var _angle: KeyframeGroup<LottieVector1D>? { get }

  /// The distance of the drop shadow offset.
  /// Combines with the `angle` to form the `shadowOffset`.
  var _distance: KeyframeGroup<LottieVector1D>? { get }
}

// MARK: - DropShadowStyle + DropShadowModel

extension DropShadowStyle: DropShadowModel {
  var _opacity: KeyframeGroup<LottieVector1D>? { opacity }
  var _color: KeyframeGroup<LottieColor>? { color }
  var _angle: KeyframeGroup<LottieVector1D>? { angle }
  var _distance: KeyframeGroup<LottieVector1D>? { distance }

  var _radius: KeyframeGroup<LottieVector1D>? {
    size.map { sizeValue in
      // After Effects shadow softness uses a different range of values than CALayer.shadowRadius,
      // so shadows render too softly if we directly use the value from After Effects. We find that
      // dividing this value from After Effects by 2 produces results that are visually similar.
      LottieVector1D(sizeValue.cgFloatValue / 2)
    }
  }
}

// MARK: - DropShadowEffect + DropShadowModel

extension DropShadowEffect: DropShadowModel {
  var _color: KeyframeGroup<LottieColor>? { color?.value }
  var _distance: KeyframeGroup<LottieVector1D>? { distance?.value }

  var _radius: KeyframeGroup<LottieVector1D>? {
    softness?.value?.map { softnessValue in
      // After Effects shadow softness uses a different range of values than CALayer.shadowRadius,
      // so shadows render too softly if we directly use the value from After Effects. We find that
      // dividing this value from After Effects by 5 produces results that are visually similar.
      LottieVector1D(softnessValue.cgFloatValue / 5)
    }
  }

  var _opacity: KeyframeGroup<LottieVector1D>? {
    opacity?.value?.map { originalOpacityValue in
      // `DropShadowEffect.opacity` is a value between 0 and 255,
      // but `DropShadowModel._opacity` expects a value between 0 and 100.
      LottieVector1D((originalOpacityValue.value / 255.0) * 100)
    }
  }

  var _angle: KeyframeGroup<LottieVector1D>? {
    direction?.value?.map { originalAngleValue in
      // `DropShadowEffect.distance` is rotated 90º from the
      // angle value representation expected by `DropShadowModel._angle`
      LottieVector1D(originalAngleValue.value - 90)
    }
  }
}

// MARK: - CALayer + DropShadowModel

extension CALayer {

  // MARK: Internal

  /// Adds drop shadow animations from the given `DropShadowModel` to this layer
  @nonobjc
  func addDropShadowAnimations(
    for dropShadowModel: DropShadowModel,
    context: LayerAnimationContext)
    throws
  {
    try addShadowOpacityAnimation(from: dropShadowModel, context: context)
    try addShadowColorAnimation(from: dropShadowModel, context: context)
    try addShadowRadiusAnimation(from: dropShadowModel, context: context)
    try addShadowOffsetAnimation(from: dropShadowModel, context: context)
  }

  // MARK: Private

  private func addShadowOpacityAnimation(from model: DropShadowModel, context: LayerAnimationContext) throws {
    guard let opacityKeyframes = model._opacity else { return }

    try addAnimation(
      for: .shadowOpacity,
      keyframes: opacityKeyframes,
      value: {
        // Lottie animation files express opacity as a numerical percentage value
        // (e.g. 0%, 50%, 100%) so we divide by 100 to get the decimal values
        // expected by Core Animation (e.g. 0.0, 0.5, 1.0).
        $0.cgFloatValue / 100
      },
      context: context)
  }

  private func addShadowColorAnimation(from model: DropShadowModel, context: LayerAnimationContext) throws {
    guard let shadowColorKeyframes = model._color else { return }

    try addAnimation(
      for: .shadowColor,
      keyframes: shadowColorKeyframes,
      value: \.cgColorValue,
      context: context)
  }

  private func addShadowRadiusAnimation(from model: DropShadowModel, context: LayerAnimationContext) throws {
    guard let shadowSizeKeyframes = model._radius else { return }

    try addAnimation(
      for: .shadowRadius,
      keyframes: shadowSizeKeyframes,
      value: \.cgFloatValue,
      context: context)
  }

  private func addShadowOffsetAnimation(from model: DropShadowModel, context: LayerAnimationContext) throws {
    guard
      let angleKeyframes = model._angle,
      let distanceKeyframes = model._distance
    else { return }

    let offsetKeyframes = Keyframes.combined(angleKeyframes, distanceKeyframes) { angleDegrees, distance -> CGSize in
      // Lottie animation files express rotation in degrees
      // (e.g. 90º, 180º, 360º) so we convert to radians to get the
      // values expected by Core Animation (e.g. π/2, π, 2π)
      let angleRadians = (angleDegrees.cgFloatValue * .pi) / 180

      // Lottie animation files express the `shadowOffset` as (angle, distance) pair,
      // which we convert to the expected x / y offset values:
      let offsetX = distance.cgFloatValue * cos(angleRadians)
      let offsetY = distance.cgFloatValue * sin(angleRadians)
      return CGSize(width: offsetX, height: offsetY)
    }

    try addAnimation(
      for: .shadowOffset,
      keyframes: offsetKeyframes,
      value: { $0 },
      context: context)
  }

}
