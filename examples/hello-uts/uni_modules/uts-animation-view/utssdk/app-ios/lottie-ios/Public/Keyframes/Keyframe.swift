// Created by Cal Stephens on 1/24/22.
// Copyright © 2022 Airbnb Inc. All rights reserved.

import CoreFoundation

// MARK: - Keyframe

/// A keyframe with a single value, and timing information
/// about when the value should be displayed and how it
/// should be interpolated.
public final class Keyframe<T> {

  // MARK: Lifecycle

  /// Initialize a value-only keyframe with no time data.
  public init(
    _ value: T,
    spatialInTangent: LottieVector3D? = nil,
    spatialOutTangent: LottieVector3D? = nil)
  {
    self.value = value
    time = 0
    isHold = true
    inTangent = nil
    outTangent = nil
    self.spatialInTangent = spatialInTangent
    self.spatialOutTangent = spatialOutTangent
  }

  /// Initialize a keyframe
  public init(
    value: T,
    time: AnimationFrameTime,
    isHold: Bool = false,
    inTangent: LottieVector2D? = nil,
    outTangent: LottieVector2D? = nil,
    spatialInTangent: LottieVector3D? = nil,
    spatialOutTangent: LottieVector3D? = nil)
  {
    self.value = value
    self.time = time
    self.isHold = isHold
    self.outTangent = outTangent
    self.inTangent = inTangent
    self.spatialInTangent = spatialInTangent
    self.spatialOutTangent = spatialOutTangent
  }

  // MARK: Public

  /// The value of the keyframe
  public let value: T
  /// The time in frames of the keyframe.
  public let time: AnimationFrameTime
  /// A hold keyframe freezes interpolation until the next keyframe that is not a hold.
  public let isHold: Bool
  /// The in tangent for the time interpolation curve.
  public let inTangent: LottieVector2D?
  /// The out tangent for the time interpolation curve.
  public let outTangent: LottieVector2D?

  /// The spatial in tangent of the vector.
  public let spatialInTangent: LottieVector3D?
  /// The spatial out tangent of the vector.
  public let spatialOutTangent: LottieVector3D?
}

// MARK: Equatable

extension Keyframe: Equatable where T: Equatable {
  public static func == (lhs: Keyframe<T>, rhs: Keyframe<T>) -> Bool {
    lhs.value == rhs.value
      && lhs.time == rhs.time
      && lhs.isHold == rhs.isHold
      && lhs.inTangent == rhs.inTangent
      && lhs.outTangent == rhs.outTangent
      && lhs.spatialInTangent == rhs.spatialOutTangent
      && lhs.spatialOutTangent == rhs.spatialOutTangent
  }
}

// MARK: Hashable

extension Keyframe: Hashable where T: Hashable {
  public func hash(into hasher: inout Hasher) {
    hasher.combine(value)
    hasher.combine(time)
    hasher.combine(isHold)
    hasher.combine(inTangent)
    hasher.combine(outTangent)
    hasher.combine(spatialInTangent)
    hasher.combine(spatialOutTangent)
  }
}

// MARK: Sendable

extension Keyframe: Sendable where T: Sendable { }
