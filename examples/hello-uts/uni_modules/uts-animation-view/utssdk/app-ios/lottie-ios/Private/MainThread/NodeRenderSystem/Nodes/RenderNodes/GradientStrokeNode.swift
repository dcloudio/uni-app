//
//  GradientStrokeNode.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/23/19.
//

import CoreGraphics
import Foundation

// MARK: - GradientStrokeProperties

final class GradientStrokeProperties: NodePropertyMap, KeypathSearchable {

  // MARK: Lifecycle

  init(gradientStroke: GradientStroke) {
    keypathName = gradientStroke.name
    opacity = NodeProperty(provider: KeyframeInterpolator(keyframes: gradientStroke.opacity.keyframes))
    startPoint = NodeProperty(provider: KeyframeInterpolator(keyframes: gradientStroke.startPoint.keyframes))
    endPoint = NodeProperty(provider: KeyframeInterpolator(keyframes: gradientStroke.endPoint.keyframes))
    colors = NodeProperty(provider: KeyframeInterpolator(keyframes: gradientStroke.colors.keyframes))
    gradientType = gradientStroke.gradientType
    numberOfColors = gradientStroke.numberOfColors
    width = NodeProperty(provider: KeyframeInterpolator(keyframes: gradientStroke.width.keyframes))
    miterLimit = CGFloat(gradientStroke.miterLimit)
    lineCap = gradientStroke.lineCap
    lineJoin = gradientStroke.lineJoin

    if let dashes = gradientStroke.dashPattern {
      var dashPatterns = ContiguousArray<ContiguousArray<Keyframe<LottieVector1D>>>()
      var dashPhase = ContiguousArray<Keyframe<LottieVector1D>>()
      for dash in dashes {
        if dash.type == .offset {
          dashPhase = dash.value.keyframes
        } else {
          dashPatterns.append(dash.value.keyframes)
        }
      }
      dashPattern = NodeProperty(provider: GroupInterpolator(keyframeGroups: dashPatterns))
      self.dashPhase = NodeProperty(provider: KeyframeInterpolator(keyframes: dashPhase))
    } else {
      dashPattern = NodeProperty(provider: SingleValueProvider([LottieVector1D]()))
      dashPhase = NodeProperty(provider: SingleValueProvider(LottieVector1D(0)))
    }
    keypathProperties = [
      PropertyName.opacity.rawValue : opacity,
      "Start Point" : startPoint,
      "End Point" : endPoint,
      PropertyName.gradientColors.rawValue : colors,
      PropertyName.strokeWidth.rawValue : width,
      "Dashes" : dashPattern,
      "Dash Phase" : dashPhase,
    ]
    properties = Array(keypathProperties.values)
  }

  // MARK: Internal

  var keypathName: String

  let opacity: NodeProperty<LottieVector1D>
  let startPoint: NodeProperty<LottieVector3D>
  let endPoint: NodeProperty<LottieVector3D>
  let colors: NodeProperty<[Double]>
  let width: NodeProperty<LottieVector1D>

  let dashPattern: NodeProperty<[LottieVector1D]>
  let dashPhase: NodeProperty<LottieVector1D>

  let lineCap: LineCap
  let lineJoin: LineJoin
  let miterLimit: CGFloat
  let gradientType: GradientType
  let numberOfColors: Int

  let keypathProperties: [String: AnyNodeProperty]
  let properties: [AnyNodeProperty]

}

// MARK: - GradientStrokeNode

final class GradientStrokeNode: AnimatorNode, RenderNode {

  // MARK: Lifecycle

  init(parentNode: AnimatorNode?, gradientStroke: GradientStroke) {
    strokeRender = GradientStrokeRenderer(parent: parentNode?.outputNode)
    strokeProperties = GradientStrokeProperties(gradientStroke: gradientStroke)
    self.parentNode = parentNode
  }

  // MARK: Internal

  let strokeRender: GradientStrokeRenderer

  let strokeProperties: GradientStrokeProperties

  let parentNode: AnimatorNode?
  var hasLocalUpdates = false
  var hasUpstreamUpdates = false
  var lastUpdateFrame: CGFloat? = nil

  var renderer: NodeOutput & Renderable {
    strokeRender
  }

  // MARK: Animator Node Protocol

  var propertyMap: NodePropertyMap & KeypathSearchable {
    strokeProperties
  }

  var isEnabled = true {
    didSet {
      strokeRender.isEnabled = isEnabled
    }
  }

  func localUpdatesPermeateDownstream() -> Bool {
    false
  }

  func rebuildOutputs(frame _: CGFloat) {
    /// Update gradient properties
    strokeRender.gradientRender.start = strokeProperties.startPoint.value.pointValue
    strokeRender.gradientRender.end = strokeProperties.endPoint.value.pointValue
    strokeRender.gradientRender.opacity = strokeProperties.opacity.value.cgFloatValue
    strokeRender.gradientRender.colors = strokeProperties.colors.value.map { CGFloat($0) }
    strokeRender.gradientRender.type = strokeProperties.gradientType
    strokeRender.gradientRender.numberOfColors = strokeProperties.numberOfColors

    /// Now update stroke properties
    strokeRender.strokeRender.opacity = strokeProperties.opacity.value.cgFloatValue
    strokeRender.strokeRender.width = strokeProperties.width.value.cgFloatValue
    strokeRender.strokeRender.miterLimit = strokeProperties.miterLimit
    strokeRender.strokeRender.lineCap = strokeProperties.lineCap
    strokeRender.strokeRender.lineJoin = strokeProperties.lineJoin

    /// Get dash lengths
    let dashLengths = strokeProperties.dashPattern.value.map { $0.cgFloatValue }
    if dashLengths.count > 0, dashLengths.isSupportedLayerDashPattern {
      strokeRender.strokeRender.dashPhase = strokeProperties.dashPhase.value.cgFloatValue
      strokeRender.strokeRender.dashLengths = dashLengths
    } else {
      strokeRender.strokeRender.dashLengths = nil
      strokeRender.strokeRender.dashPhase = nil
    }
  }
}
