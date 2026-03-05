// Created by Cal Stephens on 1/7/22.
// Copyright © 2022 Airbnb Inc. All rights reserved.

import QuartzCore

// MARK: - GradientShapeItem

/// A `ShapeItem` that represents a gradient
protocol GradientShapeItem: OpacityAnimationModel {
  var startPoint: KeyframeGroup<LottieVector3D> { get }
  var endPoint: KeyframeGroup<LottieVector3D> { get }
  var gradientType: GradientType { get }
  var numberOfColors: Int { get }
  var colors: KeyframeGroup<[Double]> { get }
}

// MARK: - GradientFill + GradientShapeItem

extension GradientFill: GradientShapeItem { }

// MARK: - GradientStroke + GradientShapeItem

extension GradientStroke: GradientShapeItem { }

// MARK: - GradientRenderLayer + GradientShapeItem

extension GradientRenderLayer {

  // MARK: Internal

  /// Adds gradient-related animations to this layer, from the given `GradientFill`
  ///  - The RGB components and alpha components can have different color stops / locations,
  ///    so have to be rendered in separate `CAGradientLayer`s.
  func addGradientAnimations(
    for gradient: GradientShapeItem,
    type: GradientContentType,
    context: LayerAnimationContext)
    throws
  {
    // We have to set `colors` and `locations` to non-nil values
    // for the animations below to actually take effect
    locations = []

    // The initial value for `colors` must be an array with the exact same number of colors
    // as the gradient that will be applied in the `CAAnimation`
    switch type {
    case .rgb:
      colors = .init(
        repeating: CGColor.rgb(0, 0, 0),
        count: gradient.numberOfColors)

    case .alpha:
      colors = .init(
        repeating: CGColor.rgb(0, 0, 0),
        count: gradient.colorConfiguration(from: gradient.colors.keyframes[0].value, type: .alpha).count)
    }

    try addAnimation(
      for: .colors,
      keyframes: gradient.colors,
      value: { colorComponents in
        gradient.colorConfiguration(from: colorComponents, type: type).map { $0.color }
      },
      context: context)

    try addAnimation(
      for: .locations,
      keyframes: gradient.colors,
      value: { colorComponents in
        gradient.colorConfiguration(from: colorComponents, type: type).map { $0.location }
      },
      context: context)

    try addOpacityAnimation(for: gradient, context: context)

    switch gradient.gradientType {
    case .linear:
      try addLinearGradientAnimations(for: gradient, context: context)
    case .radial:
      try addRadialGradientAnimations(for: gradient, context: context)
    case .none:
      break
    }
  }

  // MARK: Private

  private func addLinearGradientAnimations(
    for gradient: GradientShapeItem,
    context: LayerAnimationContext)
    throws
  {
    type = .axial

    try addAnimation(
      for: .startPoint,
      keyframes: gradient.startPoint,
      value: { absoluteStartPoint in
        percentBasedPointInBounds(from: absoluteStartPoint.pointValue)
      },
      context: context)

    try addAnimation(
      for: .endPoint,
      keyframes: gradient.endPoint,
      value: { absoluteEndPoint in
        percentBasedPointInBounds(from: absoluteEndPoint.pointValue)
      },
      context: context)
  }

  private func addRadialGradientAnimations(for gradient: GradientShapeItem, context: LayerAnimationContext) throws {
    type = .radial

    let combinedKeyframes = Keyframes.combined(
      gradient.startPoint, gradient.endPoint,
      makeCombinedResult: { absoluteStartPoint, absoluteEndPoint -> RadialGradientKeyframes in
        // Convert the absolute start / end points to the relative structure used by Core Animation
        let relativeStartPoint = percentBasedPointInBounds(from: absoluteStartPoint.pointValue)
        let radius = absoluteStartPoint.pointValue.distanceTo(absoluteEndPoint.pointValue)
        let relativeEndPoint = percentBasedPointInBounds(
          from: CGPoint(
            x: absoluteStartPoint.x + radius,
            y: absoluteStartPoint.y + radius))

        return RadialGradientKeyframes(startPoint: relativeStartPoint, endPoint: relativeEndPoint)
      })

    try addAnimation(
      for: .startPoint,
      keyframes: combinedKeyframes,
      value: \.startPoint,
      context: context)

    try addAnimation(
      for: .endPoint,
      keyframes: combinedKeyframes,
      value: \.endPoint,
      context: context)
  }
}

// MARK: - RadialGradientKeyframes

private struct RadialGradientKeyframes: Interpolatable {
  let startPoint: CGPoint
  let endPoint: CGPoint

  func interpolate(to: RadialGradientKeyframes, amount: CGFloat) -> RadialGradientKeyframes {
    RadialGradientKeyframes(
      startPoint: startPoint.interpolate(to: to.startPoint, amount: amount),
      endPoint: endPoint.interpolate(to: to.endPoint, amount: amount))
  }
}

// MARK: - GradientContentType

/// Each type of gradient that can be constructed from a `GradientShapeItem`
enum GradientContentType {
  case rgb
  case alpha
}

/// `colors` and `locations` configuration for a `CAGradientLayer`
typealias GradientColorConfiguration = [(color: CGColor, location: CGFloat)]

extension GradientShapeItem {

  // MARK: Internal

  /// Whether or not this `GradientShapeItem` includes an alpha component
  /// that has to be rendered as a separate `CAGradientLayer` from the
  /// layer that renders the rgb color components
  var hasAlphaComponent: Bool {
    for colorComponentsKeyframe in colors.keyframes {
      let colorComponents = colorComponentsKeyframe.value
      let alphaConfiguration = colorConfiguration(from: colorComponents, type: .alpha)

      let notFullyOpaque = alphaConfiguration.contains(where: { color, _ in
        color.alpha < 0.999
      })

      if notFullyOpaque {
        return true
      }
    }

    return false
  }

  // MARK: Fileprivate

  /// Converts the compact `[Double]` color components representation
  /// into an array of `CGColor`s and the location of those colors within the gradient.
  ///  - The color components array is a repeating list of `[location, red, green, blue]` values
  ///    for each color in the gradient, followed by an optional repeating list of
  ///    `[location, alpha]` values that control the colors' alpha values.
  ///  - The RGB and alpha values can have different color stops / locations,
  ///    so each has to be rendered in a separate `CAGradientLayer`.
  fileprivate func colorConfiguration(
    from colorComponents: [Double],
    type: GradientContentType)
    -> GradientColorConfiguration
  {
    switch type {
    case .rgb:
      precondition(
        colorComponents.count >= numberOfColors * 4,
        "Each color must have RGB components and a location component")

      // Each group of four `Double` values represents a single `CGColor`,
      // and its relative location within the gradient.
      var colors = GradientColorConfiguration()

      for colorIndex in 0..<numberOfColors {
        let colorStartIndex = colorIndex * 4

        let colorLocation = CGFloat(colorComponents[colorStartIndex])

        let color = CGColor.rgb(
          CGFloat(colorComponents[colorStartIndex + 1]),
          CGFloat(colorComponents[colorStartIndex + 2]),
          CGFloat(colorComponents[colorStartIndex + 3]))

        colors.append((color: color, location: colorLocation))
      }

      return colors

    case .alpha:
      // After the rgb color components, there can be arbitrary number of repeating
      // `[alphaLocation, alphaValue]` pairs that define a separate alpha gradient.
      var alphaValues = GradientColorConfiguration()

      for alphaIndex in stride(from: numberOfColors * 4, to: colorComponents.endIndex, by: 2) {
        let alphaLocation = CGFloat(colorComponents[alphaIndex])
        let alphaValue = CGFloat(colorComponents[alphaIndex + 1])
        alphaValues.append((color: .rgba(0, 0, 0, alphaValue), location: alphaLocation))
      }

      return alphaValues
    }
  }
}
