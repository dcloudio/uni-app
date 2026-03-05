// Created by Cal Stephens on 2/10/22.
// Copyright © 2022 Airbnb Inc. All rights reserved.

import QuartzCore

// MARK: - StrokeShapeItem

/// A `ShapeItem` that represents a stroke
protocol StrokeShapeItem: ShapeItem, OpacityAnimationModel {
  var strokeColor: KeyframeGroup<LottieColor>? { get }
  var width: KeyframeGroup<LottieVector1D> { get }
  var lineCap: LineCap { get }
  var lineJoin: LineJoin { get }
  var miterLimit: Double { get }
  var dashPattern: [DashElement]? { get }
  func copy(width: KeyframeGroup<LottieVector1D>) -> StrokeShapeItem
}

// MARK: - Stroke + StrokeShapeItem

extension Stroke: StrokeShapeItem {
  var strokeColor: KeyframeGroup<LottieColor>? { color }

  func copy(width: KeyframeGroup<LottieVector1D>) -> StrokeShapeItem {
    // Type-erase the copy from `Stroke` to `StrokeShapeItem`
    let copy: Stroke = copy(width: width)
    return copy
  }
}

// MARK: - GradientStroke + StrokeShapeItem

extension GradientStroke: StrokeShapeItem {
  var strokeColor: KeyframeGroup<LottieColor>? { nil }

  func copy(width: KeyframeGroup<LottieVector1D>) -> StrokeShapeItem {
    // Type-erase the copy from `GradientStroke` to `StrokeShapeItem`
    let copy: GradientStroke = copy(width: width)
    return copy
  }
}

// MARK: - CAShapeLayer + StrokeShapeItem

extension CAShapeLayer {
  /// Adds animations for properties related to the given `Stroke` object (`strokeColor`, `lineWidth`, etc)
  @nonobjc
  func addStrokeAnimations(for stroke: StrokeShapeItem, context: LayerAnimationContext) throws {
    lineJoin = stroke.lineJoin.caLineJoin
    lineCap = stroke.lineCap.caLineCap
    miterLimit = CGFloat(stroke.miterLimit)

    if let strokeColor = stroke.strokeColor {
      try addAnimation(
        for: .strokeColor,
        keyframes: strokeColor,
        value: \.cgColorValue,
        context: context)
    }

    try addAnimation(
      for: .lineWidth,
      keyframes: stroke.width,
      value: \.cgFloatValue,
      context: context)

    try addOpacityAnimation(for: stroke, context: context)

    if let (dashPattern, dashPhase) = stroke.dashPattern?.shapeLayerConfiguration {
      let lineDashPattern = try dashPattern.map {
        try KeyframeGroup(keyframes: $0)
          .exactlyOneKeyframe(context: context, description: "stroke dashPattern").cgFloatValue
      }

      if lineDashPattern.isSupportedLayerDashPattern {
        self.lineDashPattern = lineDashPattern as [NSNumber]
      }

      try addAnimation(
        for: .lineDashPhase,
        keyframes: KeyframeGroup(keyframes: dashPhase),
        value: \.cgFloatValue,
        context: context)
    }
  }
}
