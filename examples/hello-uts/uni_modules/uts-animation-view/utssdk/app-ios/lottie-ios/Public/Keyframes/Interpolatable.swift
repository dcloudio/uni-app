// Created by Cal Stephens on 1/24/22.
// Copyright © 2022 Airbnb Inc. All rights reserved.

import CoreGraphics

// MARK: - Interpolatable

/// A type that can be interpolated between two values
public protocol Interpolatable: AnyInterpolatable {
  /// Interpolates the `self` to the given number by `amount`.
  ///  - Parameter to: The number to interpolate to.
  ///  - Parameter amount: The amount to interpolate,
  ///    relative to 0.0 (self) and 1.0 (to).
  ///    `amount` can be greater than one and less than zero,
  ///    and interpolation should not be clamped.
  ///
  ///  ```
  ///  let number = 5
  ///  let interpolated = number.interpolateTo(10, amount: 0.5)
  ///  print(interpolated) // 7.5
  ///  ```
  ///
  ///  ```
  ///  let number = 5
  ///  let interpolated = number.interpolateTo(10, amount: 1.5)
  ///  print(interpolated) // 12.5
  ///  ```
  func interpolate(to: Self, amount: CGFloat) -> Self
}

// MARK: - SpatialInterpolatable

/// A type that can be interpolated between two values,
/// additionally using optional `spatialOutTangent` and `spatialInTangent` values.
///  - If your implementation doesn't use the `spatialOutTangent` and `spatialInTangent`
///    parameters, prefer implementing the simpler `Interpolatable` protocol.
public protocol SpatialInterpolatable: AnyInterpolatable {
  /// Interpolates the `self` to the given number by `amount`.
  ///  - Parameter to: The number to interpolate to.
  ///  - Parameter amount: The amount to interpolate,
  ///    relative to 0.0 (self) and 1.0 (to).
  ///    `amount` can be greater than one and less than zero,
  ///    and interpolation should not be clamped.
  func interpolate(
    to: Self,
    amount: CGFloat,
    spatialOutTangent: CGPoint?,
    spatialInTangent: CGPoint?)
    -> Self
}

// MARK: - AnyInterpolatable

/// The base protocol that is implemented by both `Interpolatable` and `SpatialInterpolatable`
/// Types should not directly implement this protocol.
public protocol AnyInterpolatable {
  /// Interpolates by calling either `Interpolatable.interpolate`
  /// or `SpatialInterpolatable.interpolate`.
  /// Should not be implemented or called by consumers.
  func _interpolate(
    to: Self,
    amount: CGFloat,
    spatialOutTangent: CGPoint?,
    spatialInTangent: CGPoint?)
    -> Self
}

extension Interpolatable {
  public func _interpolate(
    to: Self,
    amount: CGFloat,
    spatialOutTangent _: CGPoint?,
    spatialInTangent _: CGPoint?)
    -> Self
  {
    interpolate(to: to, amount: amount)
  }
}

extension SpatialInterpolatable {
  /// Helper that interpolates this `SpatialInterpolatable`
  /// with `nil` spatial in/out tangents
  public func interpolate(to: Self, amount: CGFloat) -> Self {
    interpolate(
      to: to,
      amount: amount,
      spatialOutTangent: nil,
      spatialInTangent: nil)
  }

  public func _interpolate(
    to: Self,
    amount: CGFloat,
    spatialOutTangent: CGPoint?,
    spatialInTangent: CGPoint?)
    -> Self
  {
    interpolate(
      to: to,
      amount: amount,
      spatialOutTangent: spatialOutTangent,
      spatialInTangent: spatialInTangent)
  }
}

// MARK: - Double + Interpolatable

extension Double: Interpolatable { }

// MARK: - CGFloat + Interpolatable

extension CGFloat: Interpolatable { }

// MARK: - Float + Interpolatable

extension Float: Interpolatable { }

extension Interpolatable where Self: BinaryFloatingPoint {
  public func interpolate(to: Self, amount: CGFloat) -> Self {
    self + ((to - self) * Self(amount))
  }
}

// MARK: - CGRect + Interpolatable

extension CGRect: Interpolatable {
  public func interpolate(to: CGRect, amount: CGFloat) -> CGRect {
    CGRect(
      x: origin.x.interpolate(to: to.origin.x, amount: amount),
      y: origin.y.interpolate(to: to.origin.y, amount: amount),
      width: width.interpolate(to: to.width, amount: amount),
      height: height.interpolate(to: to.height, amount: amount))
  }
}

// MARK: - CGSize + Interpolatable

extension CGSize: Interpolatable {
  public func interpolate(to: CGSize, amount: CGFloat) -> CGSize {
    CGSize(
      width: width.interpolate(to: to.width, amount: amount),
      height: height.interpolate(to: to.height, amount: amount))
  }
}

// MARK: - CGPoint + SpatialInterpolatable

extension CGPoint: SpatialInterpolatable {
  public func interpolate(
    to: CGPoint,
    amount: CGFloat,
    spatialOutTangent: CGPoint?,
    spatialInTangent: CGPoint?)
    -> CGPoint
  {
    guard
      let outTan = spatialOutTangent,
      let inTan = spatialInTangent
    else {
      return CGPoint(
        x: x.interpolate(to: to.x, amount: amount),
        y: y.interpolate(to: to.y, amount: amount))
    }

    let cp1 = self + outTan
    let cp2 = to + inTan
    return interpolate(to, outTangent: cp1, inTangent: cp2, amount: amount)
  }
}

// MARK: - LottieColor + Interpolatable

extension LottieColor: Interpolatable {
  public func interpolate(to: LottieColor, amount: CGFloat) -> LottieColor {
    LottieColor(
      r: r.interpolate(to: to.r, amount: amount),
      g: g.interpolate(to: to.g, amount: amount),
      b: b.interpolate(to: to.b, amount: amount),
      a: a.interpolate(to: to.a, amount: amount))
  }
}

// MARK: - LottieVector1D + Interpolatable

extension LottieVector1D: Interpolatable {
  public func interpolate(to: LottieVector1D, amount: CGFloat) -> LottieVector1D {
    value.interpolate(to: to.value, amount: amount).vectorValue
  }
}

// MARK: - LottieVector2D + SpatialInterpolatable

extension LottieVector2D: SpatialInterpolatable {
  public func interpolate(
    to: LottieVector2D,
    amount: CGFloat,
    spatialOutTangent: CGPoint?,
    spatialInTangent: CGPoint?)
    -> LottieVector2D
  {
    pointValue.interpolate(
      to: to.pointValue,
      amount: amount,
      spatialOutTangent: spatialOutTangent,
      spatialInTangent: spatialInTangent)
      .vector2dValue
  }
}

// MARK: - LottieVector3D + SpatialInterpolatable

extension LottieVector3D: SpatialInterpolatable {
  public func interpolate(
    to: LottieVector3D,
    amount: CGFloat,
    spatialOutTangent: CGPoint?,
    spatialInTangent: CGPoint?)
    -> LottieVector3D
  {
    if spatialInTangent != nil || spatialOutTangent != nil {
      // TODO Support third dimension spatial interpolation
      let point = pointValue.interpolate(
        to: to.pointValue,
        amount: amount,
        spatialOutTangent: spatialOutTangent,
        spatialInTangent: spatialInTangent)

      return LottieVector3D(
        x: point.x,
        y: point.y,
        z: CGFloat(z.interpolate(to: to.z, amount: amount)))
    }

    return LottieVector3D(
      x: x.interpolate(to: to.x, amount: amount),
      y: y.interpolate(to: to.y, amount: amount),
      z: z.interpolate(to: to.z, amount: amount))
  }
}

// MARK: - Array + Interpolatable, AnyInterpolatable

extension Array: Interpolatable, AnyInterpolatable where Element: Interpolatable {
  public func interpolate(to: [Element], amount: CGFloat) -> [Element] {
    LottieLogger.shared.assert(
      count == to.count,
      "When interpolating Arrays, both array sound have the same element count.")

    return zip(self, to).map { lhs, rhs in
      lhs.interpolate(to: rhs, amount: amount)
    }
  }
}

// MARK: - Optional + Interpolatable, AnyInterpolatable

extension Optional: Interpolatable, AnyInterpolatable where Wrapped: Interpolatable {
  public func interpolate(to: Wrapped?, amount: CGFloat) -> Wrapped? {
    guard let self, let to else { return nil }
    return self.interpolate(to: to, amount: amount)
  }
}

// MARK: - Hold

/// An `Interpolatable` container that animates using "hold" keyframes.
/// The keyframes do not animate, and instead always display the value from the most recent keyframe.
/// This is necessary when passing non-interpolatable values to a method that requires an `Interpolatable` conformance.
struct Hold<T>: Interpolatable {
  let value: T

  func interpolate(to: Hold<T>, amount: CGFloat) -> Hold<T> {
    if amount < 1 {
      return self
    } else {
      return to
    }
  }
}
