// Created by Cal Stephens on 12/21/21.
// Copyright © 2021 Airbnb Inc. All rights reserved.

import QuartzCore

extension CALayer {
  /// Adds an animation for the given `inTime` and `outTime` to this `CALayer`
  @nonobjc
  func addVisibilityAnimation(
    inFrame: AnimationFrameTime,
    outFrame: AnimationFrameTime,
    context: LayerAnimationContext)
    throws
  {
    /// If this layer uses `complexTimeRemapping`, use the `addAnimation` codepath
    /// which uses `Keyframes.manuallyInterpolatedWithTimeRemapping`.
    if context.mustUseComplexTimeRemapping {
      let isHiddenKeyframes = KeyframeGroup(keyframes: [
        Keyframe(value: true, time: 0, isHold: true), // hidden, before `inFrame`
        Keyframe(value: false, time: inFrame, isHold: true), // visible
        Keyframe(value: true, time: outFrame, isHold: true), // hidden, after `outFrame`
      ])

      try addAnimation(
        for: .isHidden,
        keyframes: isHiddenKeyframes.map { Hold(value: $0) },
        value: { $0.value },
        context: context)
    }

    /// Otherwise continue using the legacy codepath that doesn't support complex time remapping.
    ///  - TODO: We could remove this codepath in favor of always using the simpler codepath above,
    ///    but would have to solve https://github.com/airbnb/lottie-ios/pull/2254 for that codepath.
    else {
      let animation = CAKeyframeAnimation(keyPath: #keyPath(isHidden))
      animation.calculationMode = .discrete

      animation.values = [
        true, // hidden, before `inFrame`
        false, // visible
        true, // hidden, after `outFrame`
      ]

      // From the documentation of `keyTimes`:
      //  - If the calculationMode is set to discrete, the first value in the array
      //    must be 0.0 and the last value must be 1.0. The array should have one more
      //    entry than appears in the values array. For example, if there are two values,
      //    there should be three key times.
      animation.keyTimes = [
        NSNumber(value: 0.0),
        NSNumber(value: max(Double(try context.progressTime(for: inFrame)), 0)),
        // Anything visible during the last frame should stay visible until the absolute end of the animation.
        //  - This matches the behavior of the main thread rendering engine.
        context.simpleTimeRemapping(outFrame) == context.animation.endFrame
          ? NSNumber(value: Double(1.0))
          : NSNumber(value: min(Double(try context.progressTime(for: outFrame)), 1)),
        NSNumber(value: 1.0),
      ]

      add(animation, timedWith: context)
    }
  }
}
