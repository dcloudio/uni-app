//
//  GradientFillNode.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/22/19.
//

import Foundation
import QuartzCore

// MARK: - GradientFillProperties

final class GradientFillProperties: NodePropertyMap, KeypathSearchable {

  // MARK: Lifecycle

  init(gradientfill: GradientFill) {
    keypathName = gradientfill.name
    opacity = NodeProperty(provider: KeyframeInterpolator(keyframes: gradientfill.opacity.keyframes))
    startPoint = NodeProperty(provider: KeyframeInterpolator(keyframes: gradientfill.startPoint.keyframes))
    endPoint = NodeProperty(provider: KeyframeInterpolator(keyframes: gradientfill.endPoint.keyframes))
    colors = NodeProperty(provider: KeyframeInterpolator(keyframes: gradientfill.colors.keyframes))
    gradientType = gradientfill.gradientType
    numberOfColors = gradientfill.numberOfColors
    fillRule = gradientfill.fillRule
    keypathProperties = [
      PropertyName.opacity.rawValue : opacity,
      "Start Point" : startPoint,
      "End Point" : endPoint,
      PropertyName.gradientColors.rawValue : colors,
    ]
    properties = Array(keypathProperties.values)
  }

  // MARK: Internal

  var keypathName: String

  let opacity: NodeProperty<LottieVector1D>
  let startPoint: NodeProperty<LottieVector3D>
  let endPoint: NodeProperty<LottieVector3D>
  let colors: NodeProperty<[Double]>

  let gradientType: GradientType
  let numberOfColors: Int
  let fillRule: FillRule

  let keypathProperties: [String: AnyNodeProperty]
  let properties: [AnyNodeProperty]

}

// MARK: - GradientFillNode

final class GradientFillNode: AnimatorNode, RenderNode {

  // MARK: Lifecycle

  init(parentNode: AnimatorNode?, gradientFill: GradientFill) {
    fillRender = GradientFillRenderer(parent: parentNode?.outputNode)
    fillProperties = GradientFillProperties(gradientfill: gradientFill)
    self.parentNode = parentNode
  }

  // MARK: Internal

  let fillRender: GradientFillRenderer

  let fillProperties: GradientFillProperties

  let parentNode: AnimatorNode?
  var hasLocalUpdates = false
  var hasUpstreamUpdates = false
  var lastUpdateFrame: CGFloat? = nil

  var renderer: NodeOutput & Renderable {
    fillRender
  }

  // MARK: Animator Node Protocol

  var propertyMap: NodePropertyMap & KeypathSearchable {
    fillProperties
  }

  var isEnabled = true {
    didSet {
      fillRender.isEnabled = isEnabled
    }
  }

  func localUpdatesPermeateDownstream() -> Bool {
    false
  }

  func rebuildOutputs(frame _: CGFloat) {
    fillRender.start = fillProperties.startPoint.value.pointValue
    fillRender.end = fillProperties.endPoint.value.pointValue
    fillRender.opacity = fillProperties.opacity.value.cgFloatValue * 0.01
    fillRender.colors = fillProperties.colors.value.map { CGFloat($0) }
    fillRender.type = fillProperties.gradientType
    fillRender.numberOfColors = fillProperties.numberOfColors
    fillRender.fillRule = fillProperties.fillRule.caFillRule
  }
}
