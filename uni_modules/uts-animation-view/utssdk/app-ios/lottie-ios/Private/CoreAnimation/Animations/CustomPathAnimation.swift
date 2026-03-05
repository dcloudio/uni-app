// Created by Cal Stephens on 12/21/21.
// Copyright © 2021 Airbnb Inc. All rights reserved.

import QuartzCore

extension CAShapeLayer {
  /// Adds animations for the given `BezierPath` keyframes to this `CALayer`
  @nonobjc
  func addAnimations(
    for customPath: KeyframeGroup<BezierPath>,
    context: LayerAnimationContext,
    pathMultiplier: PathMultiplier = 1,
    transformPath: (CGPath) -> CGPath = { $0 },
    roundedCorners: RoundedCorners? = nil)
    throws
  {
    let combinedKeyframes = try BezierPathKeyframe.combining(
      path: customPath,
      cornerRadius: roundedCorners?.radius)

    try addAnimation(
      for: .path,
      keyframes: combinedKeyframes,
      value: { pathKeyframe in
        var path = pathKeyframe.path
        if let cornerRadius = pathKeyframe.cornerRadius {
          path = path.roundCorners(radius: cornerRadius.cgFloatValue)
        }

        return transformPath(path.cgPath().duplicated(times: pathMultiplier))
      },
      context: context)
  }
}

extension CGPath {
  /// Duplicates this `CGPath` so that it is repeated the given number of times
  func duplicated(times: Int) -> CGPath {
    if times <= 1 {
      return self
    }

    let cgPath = CGMutablePath()

    for _ in 0..<times {
      cgPath.addPath(self)
    }

    return cgPath
  }
}

// MARK: - BezierPathKeyframe

/// Data that represents how to render a bezier path at a specific point in time
struct BezierPathKeyframe: Interpolatable {
  let path: BezierPath
  let cornerRadius: LottieVector1D?

  /// Creates a single array of animatable keyframes from the given sets of keyframes
  /// that can have different counts / timing parameters
  static func combining(
    path: KeyframeGroup<BezierPath>,
    cornerRadius: KeyframeGroup<LottieVector1D>?) throws
    -> KeyframeGroup<BezierPathKeyframe>
  {
    guard
      let cornerRadius,
      cornerRadius.keyframes.contains(where: { $0.value.cgFloatValue > 0 })
    else {
      return path.map { path in
        BezierPathKeyframe(path: path, cornerRadius: nil)
      }
    }

    return Keyframes.combined(
      path, cornerRadius,
      makeCombinedResult: BezierPathKeyframe.init)
  }

  func interpolate(to: BezierPathKeyframe, amount: CGFloat) -> BezierPathKeyframe {
    BezierPathKeyframe(
      path: path.interpolate(to: to.path, amount: amount),
      cornerRadius: cornerRadius.interpolate(to: to.cornerRadius, amount: amount))
  }
}
