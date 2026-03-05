// Created by Lan Xu on 2024/6/7.
// Copyright © 2024 Airbnb Inc. All rights reserved.

import QuartzCore

// MARK: - DropShadowNode

final class DropShadowNode: LayerEffectNode {

  // MARK: Lifecycle

  init(model: DropShadowModel) {
    properties = DropShadowNodeProperties(model: model)
  }

  // MARK: Internal

  var properties: DropShadowNodeProperties

  var propertyMap: any NodePropertyMap {
    properties
  }

  func applyEffect(to layer: CALayer) {
    if let opacity = properties.opacity?.value.cgFloatValue {
      // Lottie animation files express opacity as a numerical percentage value
      // (e.g. 0%, 50%, 100%) so we divide by 100 to get the decimal values
      // expected by Core Animation (e.g. 0.0, 0.5, 1.0).
      layer.shadowOpacity = Float(opacity / 100)
    }
    if
      let angleDegrees = properties.angle?.value.cgFloatValue,
      let distance = properties.distance?.value.cgFloatValue
    {
      // Lottie animation files express rotation in degrees
      // (e.g. 90º, 180º, 360º) so we convert to radians to get the
      // values expected by Core Animation (e.g. π/2, π, 2π)
      let angleRadians = (angleDegrees * .pi) / 180

      // Lottie animation files express the `shadowOffset` as (angle, distance) pair,
      // which we convert to the expected x / y offset values:
      let offsetX = distance * cos(angleRadians)
      let offsetY = distance * sin(angleRadians)
      layer.shadowOffset = .init(width: offsetX, height: offsetY)
    }
    layer.shadowColor = properties.color?.value.cgColorValue
    layer.shadowRadius = properties.radius?.value.cgFloatValue ?? 0
  }

}

// MARK: - DropShadowNodeProperties

final class DropShadowNodeProperties: NodePropertyMap {

  // MARK: Lifecycle

  init(model: DropShadowModel) {
    if let opacityKeyframes = model._opacity?.keyframes {
      opacity = NodeProperty(provider: KeyframeInterpolator(keyframes: opacityKeyframes))
      propertyMap[PropertyName.opacity.rawValue] = opacity
    } else {
      opacity = nil
    }
    if let radiusKeyframes = model._radius?.keyframes {
      radius = NodeProperty(provider: KeyframeInterpolator(keyframes: radiusKeyframes))
      propertyMap["Radius"] = radius
    } else {
      radius = nil
    }
    if let colorKeyFrames = model._color?.keyframes {
      color = NodeProperty(provider: KeyframeInterpolator(keyframes: colorKeyFrames))
      propertyMap[PropertyName.color.rawValue] = color
    } else {
      color = nil
    }
    if let angleKeyFrames = model._angle?.keyframes {
      angle = NodeProperty(provider: KeyframeInterpolator(keyframes: angleKeyFrames))
      propertyMap["Angle"] = angle
    } else {
      angle = nil
    }
    if let distanceKeyFrame = model._distance?.keyframes {
      distance = NodeProperty(provider: KeyframeInterpolator(keyframes: distanceKeyFrame))
      propertyMap["Distance"] = distance
    } else {
      distance = nil
    }
    properties = Array(propertyMap.values)
  }

  // MARK: Internal

  var propertyMap: [String: AnyNodeProperty] = [:]
  var properties: [AnyNodeProperty]

  let opacity: NodeProperty<LottieVector1D>?
  let radius: NodeProperty<LottieVector1D>?
  let color: NodeProperty<LottieColor>?
  let angle: NodeProperty<LottieVector1D>?
  let distance: NodeProperty<LottieVector1D>?
}
