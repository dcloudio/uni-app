// Created by Cal Stephens on 12/14/21.
// Copyright © 2021 Airbnb Inc. All rights reserved.

import QuartzCore

// MARK: - AnimationLayer

/// A type of `CALayer` that can be used in a Lottie animation
///  - Layers backed by a `LayerModel` subclass should subclass `BaseCompositionLayer`
protocol AnimationLayer: CALayer {
  /// Instructs this layer to setup its `CAAnimation`s
  /// using the given `LayerAnimationContext`
  func setupAnimations(context: LayerAnimationContext) throws
}

// MARK: - LayerAnimationContext

// Context describing the timing parameters of the current animation
struct LayerAnimationContext {
  /// The animation being played
  let animation: LottieAnimation

  /// The timing configuration that should be applied to `CAAnimation`s
  let timingConfiguration: CoreAnimationLayer.CAMediaTimingConfiguration

  /// The absolute frame number that this animation begins at
  let startFrame: AnimationFrameTime

  /// The absolute frame number that this animation ends at
  let endFrame: AnimationFrameTime

  /// The set of custom Value Providers applied to this animation
  let valueProviderStore: ValueProviderStore

  /// Information about whether or not an animation is compatible with the Core Animation engine
  let compatibilityTracker: CompatibilityTracker

  /// The logger that should be used for assertions and warnings
  let logger: LottieLogger

  /// Mutable state related to log events, stored on the `CoreAnimationLayer`.
  let loggingState: LoggingState

  /// The AnimationKeypath represented by the current layer
  var currentKeypath: AnimationKeypath

  /// The `AnimationKeypathTextProvider`
  var textProvider: AnimationKeypathTextProvider

  /// Records the given animation keypath so it can be logged or collected into a list
  ///  - Used for `CoreAnimationLayer.logHierarchyKeypaths()` and `allHierarchyKeypaths()`
  var recordHierarchyKeypath: ((String) -> Void)?

  /// A closure that remaps the given frame in the child layer's local time to a frame
  /// in the animation's overall global time.
  ///  - This time remapping is simple and only used `preCompLayer.timeStretch` and `preCompLayer.startTime`,
  ///    so is a trivial function and is invertible. This allows us to invert the time remapping from
  ///    "global time to local time" to instead be "local time to global time".
  private(set) var simpleTimeRemapping: ((_ localTime: AnimationFrameTime) -> AnimationFrameTime) = { $0 }

  /// A complex time remapping closure that remaps the given frame in the animation's overall global time
  /// into the child layer's local time.
  ///  - This time remapping is arbitrarily complex because it includes the full `preCompLayer.timeRemapping`.
  ///  - Since it isn't possible to invert the time remapping function, this can only be applied by converting
  ///    from global time to local time. This requires using `Keyframes.manuallyInterpolatedWithTimeRemapping`.
  private(set) var complexTimeRemapping: ((_ globalTime: AnimationFrameTime) -> AnimationFrameTime) = { $0 }

  /// Whether or not this layer is required to use the `complexTimeRemapping` via
  /// the more expensive `Keyframes.manuallyInterpolatedWithTimeRemapping` codepath.
  var mustUseComplexTimeRemapping = false

  /// The duration of the animation
  var animationDuration: AnimationFrameTime {
    // Normal animation playback (like when looping) skips the last frame.
    // However when the animation is paused, we need to be able to render the final frame.
    // To allow this we have to extend the length of the animation by one frame.
    let animationEndFrame: AnimationFrameTime
    if timingConfiguration.speed == 0 {
      animationEndFrame = animation.endFrame + 1
    } else {
      animationEndFrame = animation.endFrame
    }

    return Double(animationEndFrame - animation.startFrame) / animation.framerate
  }

  /// Adds the given component string to the `AnimationKeypath` stored
  /// that describes the current path being configured by this context value
  func addingKeypathComponent(_ component: String) -> LayerAnimationContext {
    var context = self
    context.currentKeypath.keys.append(component)
    return context
  }

  /// The `AnimationProgressTime` for the given `AnimationFrameTime` within this layer,
  /// accounting for the `simpleTimeRemapping` applied to this layer.
  func progressTime(for frame: AnimationFrameTime) throws -> AnimationProgressTime {
    try compatibilityAssert(
      !mustUseComplexTimeRemapping,
      "LayerAnimationContext.time(forFrame:) does not support complex time remapping")

    let animationFrameCount = animationDuration * animation.framerate
    return (simpleTimeRemapping(frame) - animation.startFrame) / animationFrameCount
  }

  /// The real-time `TimeInterval` for the given `AnimationFrameTime` within this layer,
  /// accounting for the `simpleTimeRemapping` applied to this layer.
  func time(forFrame frame: AnimationFrameTime) throws -> TimeInterval {
    try compatibilityAssert(
      !mustUseComplexTimeRemapping,
      "LayerAnimationContext.time(forFrame:) does not support complex time remapping")

    return animation.time(forFrame: simpleTimeRemapping(frame))
  }

  /// Chains an additional time remapping closure onto the `simpleTimeRemapping` closure
  func withSimpleTimeRemapping(
    _ additionalSimpleTimeRemapping: @escaping (_ localTime: AnimationFrameTime) -> AnimationFrameTime)
    -> LayerAnimationContext
  {
    var copy = self
    copy.simpleTimeRemapping = { [existingSimpleTimeRemapping = simpleTimeRemapping] time in
      existingSimpleTimeRemapping(additionalSimpleTimeRemapping(time))
    }
    return copy
  }

  /// Chains an additional time remapping closure onto the `complexTimeRemapping` closure.
  ///  - If `required` is `true`, all subsequent child layers will be required to use the expensive
  ///    `complexTimeRemapping` / `Keyframes.manuallyInterpolatedWithTimeRemapping` codepath.
  ///  - `required: true` is necessary when this time remapping is not available via `simpleTimeRemapping`.
  func withComplexTimeRemapping(
    required: Bool,
    _ additionalComplexTimeRemapping: @escaping (_ globalTime: AnimationFrameTime) -> AnimationFrameTime)
    -> LayerAnimationContext
  {
    var copy = self
    copy.mustUseComplexTimeRemapping = copy.mustUseComplexTimeRemapping || required
    copy.complexTimeRemapping = { [existingComplexTimeRemapping = complexTimeRemapping] time in
      additionalComplexTimeRemapping(existingComplexTimeRemapping(time))
    }
    return copy
  }

  /// Returns a copy of this context with time remapping removed
  func withoutTimeRemapping() -> LayerAnimationContext {
    var copy = self
    copy.simpleTimeRemapping = { $0 }
    copy.complexTimeRemapping = { $0 }
    copy.mustUseComplexTimeRemapping = false
    return copy
  }
}

// MARK: - LoggingState

/// Mutable state related to log events, stored on the `CoreAnimationLayer`.
final class LoggingState {

  // MARK: Lifecycle

  init() { }

  // MARK: Internal

  /// Whether or not the warning about unsupported After Effects expressions
  /// has been logged yet for this layer.
  var hasLoggedAfterEffectsExpressionsWarning = false
}
