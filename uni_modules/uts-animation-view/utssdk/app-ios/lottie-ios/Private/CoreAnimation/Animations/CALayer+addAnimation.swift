// Created by Cal Stephens on 12/14/21.
// Copyright © 2021 Airbnb Inc. All rights reserved.

import QuartzCore

extension CALayer {

  // MARK: Internal

  /// Constructs a `CAKeyframeAnimation` that reflects the given keyframes,
  /// and adds it to this `CALayer`.
  @nonobjc
  func addAnimation<KeyframeValue: AnyInterpolatable, ValueRepresentation>(
    for property: LayerProperty<ValueRepresentation>,
    keyframes: KeyframeGroup<KeyframeValue>,
    value keyframeValueMapping: (KeyframeValue) throws -> ValueRepresentation,
    context: LayerAnimationContext)
    throws
  {
    if let customAnimation = try customizedAnimation(for: property, context: context) {
      add(customAnimation, timedWith: context)
    }

    else if
      let defaultAnimation = try defaultAnimation(
        for: property,
        keyframes: keyframes,
        value: keyframeValueMapping,
        context: context)
    {
      let timedAnimation = defaultAnimation.timed(with: context, for: self)
      add(timedAnimation, forKey: property.caLayerKeypath)
    }
  }

  // MARK: Private

  /// Constructs a `CAAnimation` that reflects the given keyframes
  ///  - If the value can be applied directly to the CALayer using KVC,
  ///    then no `CAAnimation` will be created and the value will be applied directly.
  @nonobjc
  private func defaultAnimation<KeyframeValue: AnyInterpolatable, ValueRepresentation>(
    for property: LayerProperty<ValueRepresentation>,
    keyframes keyframeGroup: KeyframeGroup<KeyframeValue>,
    value keyframeValueMapping: (KeyframeValue) throws -> ValueRepresentation,
    context: LayerAnimationContext)
    throws -> CAAnimation?
  {
    let keyframes = keyframeGroup.keyframes
    guard !keyframes.isEmpty else { return nil }

    // Check if this set of keyframes uses After Effects expressions, which aren't supported.
    //  - We only log this once per `CoreAnimationLayer` instance.
    if keyframeGroup.unsupportedAfterEffectsExpression != nil, !context.loggingState.hasLoggedAfterEffectsExpressionsWarning {
      context.loggingState.hasLoggedAfterEffectsExpressionsWarning = true
      context.logger.info("""
        `\(property.caLayerKeypath)` animation for "\(context.currentKeypath.fullPath)" \
        includes an After Effects expression (https://helpx.adobe.com/after-effects/using/expression-language.html), \
        which is not supported by lottie-ios (expressions are only supported by lottie-web). \
        This animation may not play correctly.
        """)
    }

    // If there is exactly one keyframe value that doesn't animate,
    // we can improve performance by applying that value directly to the layer
    // instead of creating a relatively expensive `CAKeyframeAnimation`.
    if keyframes.count == 1 {
      return singleKeyframeAnimation(
        for: property,
        keyframeValue: try keyframeValueMapping(keyframes[0].value),
        writeDirectlyToPropertyIfPossible: true)
    }

    /// If we're required to use the `complexTimeRemapping` from some parent `PreCompLayer`,
    /// we have to manually interpolate the keyframes with the time remapping applied.
    if context.mustUseComplexTimeRemapping {
      return try defaultAnimation(
        for: property,
        keyframes: Keyframes.manuallyInterpolatedWithTimeRemapping(keyframeGroup, context: context),
        value: keyframeValueMapping,
        context: context.withoutTimeRemapping())
    }

    // Split the keyframes into segments with the same `CAAnimationCalculationMode` value
    //  - Each of these segments will become their own `CAKeyframeAnimation`
    let animationSegments = keyframes.segmentsSplitByCalculationMode()

    // If we only have a single segment, we can just create a single `CAKeyframeAnimation`
    // instead of wrapping it in a `CAAnimationGroup` -- this reduces allocation overhead a bit.
    if animationSegments.count == 1 {
      return try keyframeAnimation(
        for: property,
        keyframes: animationSegments[0],
        value: keyframeValueMapping,
        context: context)
    } else {
      return try animationGroup(
        for: property,
        animationSegments: animationSegments,
        value: keyframeValueMapping,
        context: context)
    }
  }

  /// A `CAAnimation` that applies the custom value from the `AnyValueProvider`
  /// registered for this specific property's `AnimationKeypath`,
  /// if one has been registered using `LottieAnimationView.setValueProvider(_:keypath:)`.
  @nonobjc
  private func customizedAnimation<ValueRepresentation>(
    for property: LayerProperty<ValueRepresentation>,
    context: LayerAnimationContext)
    throws -> CAPropertyAnimation?
  {
    guard
      let customizableProperty = property.customizableProperty,
      let customKeyframes = try context.valueProviderStore.customKeyframes(
        of: customizableProperty,
        for: AnimationKeypath(keys: context.currentKeypath.keys + customizableProperty.name.map { $0.rawValue }),
        context: context)
    else { return nil }

    // Since custom animations are overriding an existing animation,
    // we always have to create a CAAnimation and can't write directly
    // to the layer property
    if
      customKeyframes.keyframes.count == 1,
      let singleKeyframeAnimation = singleKeyframeAnimation(
        for: property,
        keyframeValue: customKeyframes.keyframes[0].value,
        writeDirectlyToPropertyIfPossible: false)
    {
      return singleKeyframeAnimation
    }

    return try keyframeAnimation(
      for: property,
      keyframes: Array(customKeyframes.keyframes),
      value: { $0 },
      context: context)
  }

  /// Creates an animation that applies a single keyframe to this layer property
  ///  - In many cases this animation can be omitted entirely, and the underlying
  ///    property can be set directly. In that case, no animation will be created.
  private func singleKeyframeAnimation<ValueRepresentation>(
    for property: LayerProperty<ValueRepresentation>,
    keyframeValue: ValueRepresentation,
    writeDirectlyToPropertyIfPossible: Bool)
    -> CABasicAnimation?
  {
    if writeDirectlyToPropertyIfPossible {
      // If the keyframe value is the same as the layer's default value for this property,
      // then we can just ignore this set of keyframes.
      if property.isDefaultValue(keyframeValue) {
        return nil
      }

      // If the property on the CALayer being animated hasn't been modified from the default yet,
      // then we can apply the keyframe value directly to the layer using KVC instead
      // of creating a `CAAnimation`.
      let currentValue = value(forKey: property.caLayerKeypath) as? ValueRepresentation
      if property.isDefaultValue(currentValue) {
        setValue(keyframeValue, forKeyPath: property.caLayerKeypath)
        return nil
      }
    }

    // Otherwise, we still need to create a `CAAnimation`, but we can
    // create a simple `CABasicAnimation` that is still less expensive
    // than computing a `CAKeyframeAnimation`.
    let animation = CABasicAnimation(keyPath: property.caLayerKeypath)
    animation.fromValue = keyframeValue
    animation.toValue = keyframeValue
    return animation
  }

  /// Creates a `CAAnimationGroup` that wraps a `CAKeyframeAnimation` for each
  /// of the given `animationSegments`
  private func animationGroup<KeyframeValue, ValueRepresentation>(
    for property: LayerProperty<ValueRepresentation>,
    animationSegments: [[Keyframe<KeyframeValue>]],
    value keyframeValueMapping: (KeyframeValue) throws -> ValueRepresentation,
    context: LayerAnimationContext)
    throws -> CAAnimationGroup
  {
    // Build the `CAKeyframeAnimation` for each segment of keyframes
    // with the same `CAAnimationCalculationMode`.
    //  - Here we have a non-zero number of animation segments,
    //    all of which have a non-zero number of keyframes.
    let segmentAnimations: [CAKeyframeAnimation] = try animationSegments.indices.map { index in
      let animationSegment = animationSegments[index]
      var segmentStartTime = try context.time(forFrame: animationSegment.first!.time)
      var segmentEndTime = try context.time(forFrame: animationSegment.last!.time)

      // Every portion of the animation timeline has to be covered by a `CAKeyframeAnimation`,
      // so if this is the first or last segment then the start/end time should be exactly
      // the start/end time of the animation itself.
      let isFirstSegment = (index == animationSegments.indices.first!)
      let isLastSegment = (index == animationSegments.indices.last!)

      if isFirstSegment {
        segmentStartTime = min(
          try context.time(forFrame: context.animation.startFrame),
          segmentStartTime)
      }

      if isLastSegment {
        segmentEndTime = max(
          try context.time(forFrame: context.animation.endFrame),
          segmentEndTime)
      }

      let segmentDuration = segmentEndTime - segmentStartTime

      // We're building `CAKeyframeAnimation`s, so the `keyTimes` are expressed
      // relative to 0 (`segmentStartTime`) and 1 (`segmentEndTime`). This is different
      // from the default behavior of the `keyframeAnimation` method, where times
      // are expressed relative to the entire animation duration.
      let customKeyTimes = try animationSegment.map { keyframeModel -> NSNumber in
        let keyframeTime = try context.time(forFrame: keyframeModel.time)
        let segmentProgressTime = ((keyframeTime - segmentStartTime) / segmentDuration)
        return segmentProgressTime as NSNumber
      }

      let animation = try keyframeAnimation(
        for: property,
        keyframes: animationSegment,
        value: keyframeValueMapping,
        customKeyTimes: customKeyTimes,
        context: context)

      animation.duration = segmentDuration
      animation.beginTime = segmentStartTime
      return animation
    }

    let fullAnimation = CAAnimationGroup()
    fullAnimation.animations = segmentAnimations
    return fullAnimation
  }

  /// Creates and validates a `CAKeyframeAnimation` for the given keyframes
  private func keyframeAnimation<KeyframeValue, ValueRepresentation>(
    for property: LayerProperty<ValueRepresentation>,
    keyframes: [Keyframe<KeyframeValue>],
    value keyframeValueMapping: (KeyframeValue) throws -> ValueRepresentation,
    customKeyTimes: [NSNumber]? = nil,
    context: LayerAnimationContext)
    throws
    -> CAKeyframeAnimation
  {
    // Convert the list of `Keyframe<T>` into
    // the representation used by `CAKeyframeAnimation`
    var keyTimes = try customKeyTimes ?? keyframes.map { keyframeModel -> NSNumber in
      NSNumber(value: Float(try context.progressTime(for: keyframeModel.time)))
    }

    var timingFunctions = timingFunctions(for: keyframes)
    let calculationMode = calculationMode(for: keyframes)

    let animation = CAKeyframeAnimation(keyPath: property.caLayerKeypath)

    // Position animations define a `CGPath` curve that should be followed,
    // instead of animating directly between keyframe point values.
    if property.caLayerKeypath == LayerProperty<CGPoint>.position.caLayerKeypath {
      animation.path = try path(keyframes: keyframes, value: { value in
        guard let point = try keyframeValueMapping(value) as? CGPoint else {
          context.logger.assertionFailure("Cannot create point from keyframe with value \(value)")
          return .zero
        }

        return point
      })
    }

    // All other types of keyframes provide individual values that are interpolated by Core Animation
    else {
      var values = try keyframes.map { keyframeModel in
        try keyframeValueMapping(keyframeModel.value)
      }

      validate(
        values: &values,
        keyTimes: &keyTimes,
        timingFunctions: &timingFunctions,
        for: calculationMode,
        context: context)

      animation.values = values
    }

    animation.calculationMode = calculationMode
    animation.keyTimes = keyTimes
    animation.timingFunctions = timingFunctions
    return animation
  }

  /// The `CAAnimationCalculationMode` that should be used for a `CAKeyframeAnimation`
  /// animating the given keyframes
  private func calculationMode<KeyframeValue>(
    for keyframes: [Keyframe<KeyframeValue>])
    -> CAAnimationCalculationMode
  {
    // At this point we expect all of the animations to have been split in
    // to segments based on the `CAAnimationCalculationMode`, so we can just
    // check the first keyframe.
    if keyframes[0].isHold {
      return .discrete
    } else {
      return .linear
    }
  }

  /// `timingFunctions` to apply to a `CAKeyframeAnimation` animating the given keyframes
  private func timingFunctions<KeyframeValue>(
    for keyframes: [Keyframe<KeyframeValue>])
    -> [CAMediaTimingFunction]
  {
    // Compute the timing function between each keyframe and the subsequent keyframe
    var timingFunctions: [CAMediaTimingFunction] = []

    for (index, keyframe) in keyframes.enumerated()
      where index != keyframes.indices.last
    {
      let nextKeyframe = keyframes[index + 1]

      let controlPoint1 = keyframe.outTangent?.pointValue ?? .zero
      let controlPoint2 = nextKeyframe.inTangent?.pointValue ?? CGPoint(x: 1, y: 1)

      timingFunctions.append(CAMediaTimingFunction(
        controlPoints:
        Float(controlPoint1.x),
        Float(controlPoint1.y),
        Float(controlPoint2.x),
        Float(controlPoint2.y)))
    }

    return timingFunctions
  }

  /// Creates a `CGPath` for the given `position` keyframes,
  /// which accounts for `spatialInTangent`s and `spatialOutTangents`
  private func path<KeyframeValue>(
    keyframes positionKeyframes: [Keyframe<KeyframeValue>],
    value keyframeValueMapping: (KeyframeValue) throws -> CGPoint) rethrows
    -> CGPath
  {
    let path = CGMutablePath()

    for (index, keyframe) in positionKeyframes.enumerated() {
      if index == positionKeyframes.indices.first {
        path.move(to: try keyframeValueMapping(keyframe.value))
      }

      if index != positionKeyframes.indices.last {
        let nextKeyframe = positionKeyframes[index + 1]

        if
          let controlPoint1 = keyframe.spatialOutTangent?.pointValue,
          let controlPoint2 = nextKeyframe.spatialInTangent?.pointValue,
          !(controlPoint1 == .zero && controlPoint2 == .zero)
        {
          path.addCurve(
            to: try keyframeValueMapping(nextKeyframe.value),
            control1: try keyframeValueMapping(keyframe.value) + controlPoint1,
            control2: try keyframeValueMapping(nextKeyframe.value) + controlPoint2)
        }

        else {
          path.addLine(to: try keyframeValueMapping(nextKeyframe.value))
        }
      }
    }

    path.closeSubpath()
    return path
  }

  /// Validates that the requirements of the `CAKeyframeAnimation` API are met correctly
  private func validate<ValueRepresentation>(
    values: inout [ValueRepresentation],
    keyTimes: inout [NSNumber],
    timingFunctions: inout [CAMediaTimingFunction],
    for calculationMode: CAAnimationCalculationMode,
    context: LayerAnimationContext)
  {
    // Validate that we have correct start (0.0) and end (1.0) keyframes.
    // From the documentation of `CAKeyframeAnimation.keyTimes`:
    //  - The first value in the `keyTimes` array must be 0.0 and the last value must be 1.0.
    if keyTimes.first != 0.0 {
      keyTimes.insert(0.0, at: 0)
      values.insert(values[0], at: 0)
      timingFunctions.insert(CAMediaTimingFunction(name: .linear), at: 0)
    }

    if keyTimes.last != 1.0 {
      keyTimes.append(1.0)
      values.append(values.last!)
      timingFunctions.append(CAMediaTimingFunction(name: .linear))
    }

    switch calculationMode {
    case .linear, .cubic:
      // From the documentation of `CAKeyframeAnimation.keyTimes`:
      //  - The number of elements in the keyTimes array
      //    should match the number of elements in the values property
      context.logger.assert(
        values.count == keyTimes.count,
        "`values.count` must exactly equal `keyTimes.count`")

      context.logger.assert(
        timingFunctions.count == (values.count - 1),
        "`timingFunctions.count` must exactly equal `values.count - 1`")

    case .discrete:
      // From the documentation of `CAKeyframeAnimation.keyTimes`:
      //  - If the calculationMode is set to discrete... the keyTimes array
      //    should have one more entry than appears in the values array.
      values.removeLast()

      context.logger.assert(
        keyTimes.count == values.count + 1,
        "`keyTimes.count` must exactly equal `values.count + 1`")

    default:
      context.logger.assertionFailure("""
        Unexpected keyframe calculation mode \(calculationMode)
        """)
    }
  }

}

extension RandomAccessCollection {
  /// Splits this array of `Keyframe`s into segments with the same `CAAnimationCalculationMode`
  ///  - Keyframes with `isHold=true` become `discrete`, and keyframes with `isHold=false`
  ///    become linear. Each `CAKeyframeAnimation` can only be one or the other, so each
  ///    `calculationModeSegment` becomes its own `CAKeyframeAnimation`.
  func segmentsSplitByCalculationMode<KeyframeValue>() -> [[Element]]
    where Element == Keyframe<KeyframeValue>, Index == Int
  {
    var segments: [[Element]] = []
    var currentSegment: [Element] = []

    for keyframe in self {
      guard let mostRecentKeyframe = currentSegment.last else {
        currentSegment.append(keyframe)
        continue
      }

      // When `isHold` changes between any two given keyframes, we have to create a new segment
      if keyframe.isHold != mostRecentKeyframe.isHold {
        // Add this keyframe to both the existing segment that is ending,
        // so we know how long that segment is, and the new segment,
        // so we know when that segment starts.
        currentSegment.append(keyframe)
        segments.append(currentSegment)
        currentSegment = [keyframe]
      }

      else {
        currentSegment.append(keyframe)
      }
    }

    segments.append(currentSegment)
    return segments
  }
}
