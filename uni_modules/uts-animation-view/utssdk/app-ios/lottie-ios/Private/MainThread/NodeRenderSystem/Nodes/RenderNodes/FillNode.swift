//
//  FillNode.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/17/19.
//

import CoreGraphics
import Foundation

// MARK: - FillNodeProperties

final class FillNodeProperties: NodePropertyMap, KeypathSearchable {

  // MARK: Lifecycle

  init(fill: Fill) {
    keypathName = fill.name
    color = NodeProperty(provider: KeyframeInterpolator(keyframes: fill.color.keyframes))
    opacity = NodeProperty(provider: KeyframeInterpolator(keyframes: fill.opacity.keyframes))
    type = fill.fillRule
    keypathProperties = [
      PropertyName.opacity.rawValue : opacity,
      PropertyName.color.rawValue : color,
    ]
    properties = Array(keypathProperties.values)
  }

  // MARK: Internal

  var keypathName: String

  let opacity: NodeProperty<LottieVector1D>
  let color: NodeProperty<LottieColor>
  let type: FillRule

  let keypathProperties: [String: AnyNodeProperty]
  let properties: [AnyNodeProperty]

}

// MARK: - FillNode

final class FillNode: AnimatorNode, RenderNode {

  // MARK: Lifecycle

  init(parentNode: AnimatorNode?, fill: Fill) {
    fillRender = FillRenderer(parent: parentNode?.outputNode)
    fillProperties = FillNodeProperties(fill: fill)
    self.parentNode = parentNode
  }

  // MARK: Internal

  let fillRender: FillRenderer

  let fillProperties: FillNodeProperties

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
    fillRender.color = fillProperties.color.value.cgColorValue
    fillRender.opacity = fillProperties.opacity.value.cgFloatValue * 0.01
    fillRender.fillRule = fillProperties.type
  }
}
