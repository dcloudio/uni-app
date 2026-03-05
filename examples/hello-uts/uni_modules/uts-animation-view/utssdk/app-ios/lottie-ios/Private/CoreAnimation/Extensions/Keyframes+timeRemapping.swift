// Created by Cal Stephens on 1/8/24.
// Copyright © 2024 Airbnb Inc. All rights reserved.

extension Keyframes {
  /// Manually interpolates the given keyframes, and applies `context.complexTimeRemapping`.
  ///  - Since `complexTimeRemapping` is a mapping from "global time" to "local time",
  ///    we have to manually interpolate the keyframes at every frame in the animation.
  static func manuallyInterpolatedWithTimeRemapping<T: AnyInterpolatable>(
    _ keyframes: KeyframeGroup<T>,
    context: LayerAnimationContext)
    -> KeyframeGroup<T>
  {
    let minimumTime = context.animation.startFrame
    let maximumTime = context.animation.endFrame
    let animationLocalTimeRange = stride(from: minimumTime, to: maximumTime, by: 1.0)

    let interpolator = keyframes.interpolator

    // Since potentially many global times can refer to the same local time,
    // we can cache and reused these local-time values.
    var localTimeCache = [AnimationFrameTime: T]()

    let interpolatedRemappedKeyframes = animationLocalTimeRange.compactMap { globalTime -> Keyframe<T>? in
      let remappedLocalTime = context.complexTimeRemapping(globalTime)

      let valueAtRemappedTime: T
      if let cachedValue = localTimeCache[remappedLocalTime] {
        valueAtRemappedTime = cachedValue
      } else if let interpolatedValue = interpolator.value(frame: remappedLocalTime) as? T {
        valueAtRemappedTime = interpolatedValue
        localTimeCache[remappedLocalTime] = interpolatedValue
      } else {
        LottieLogger.shared.assertionFailure("""
          Failed to cast untyped keyframe values to expected type. This is an internal error.
          """)
        return nil
      }

      return Keyframe(
        value: valueAtRemappedTime,
        time: AnimationFrameTime(globalTime))
    }

    return KeyframeGroup(keyframes: ContiguousArray(interpolatedRemappedKeyframes))
  }
}
