//
//  RoundedCornersNode.swift
//  Lottie
//
//  Created by Duolingo on 10/31/22.
//

import Foundation
import QuartzCore

// MARK: - RoundedCornersProperties

final class RoundedCornersProperties: NodePropertyMap, KeypathSearchable {

  // MARK: Lifecycle

  init(roundedCorners: RoundedCorners) {
    keypathName = roundedCorners.name
    radius = NodeProperty(provider: KeyframeInterpolator(keyframes: roundedCorners.radius.keyframes))
    keypathProperties = ["Radius" : radius]
    properties = Array(keypathProperties.values)
  }

  // MARK: Internal

  let keypathProperties: [String: AnyNodeProperty]
  let properties: [AnyNodeProperty]
  let keypathName: String

  let radius: NodeProperty<LottieVector1D>
}

// MARK: - RoundedCornersNode

final class RoundedCornersNode: AnimatorNode {

  // MARK: Lifecycle

  init(parentNode: AnimatorNode?, roundedCorners: RoundedCorners, upstreamPaths: [PathOutputNode]) {
    outputNode = PassThroughOutputNode(parent: parentNode?.outputNode)
    self.parentNode = parentNode
    properties = RoundedCornersProperties(roundedCorners: roundedCorners)
    self.upstreamPaths = upstreamPaths
  }

  // MARK: Internal

  let properties: RoundedCornersProperties

  let parentNode: AnimatorNode?
  let outputNode: NodeOutput
  var hasLocalUpdates = false
  var hasUpstreamUpdates = false
  var lastUpdateFrame: CGFloat? = nil
  var isEnabled = true

  // MARK: Animator Node
  var propertyMap: NodePropertyMap & KeypathSearchable {
    properties
  }

  func forceUpstreamOutputUpdates() -> Bool {
    hasLocalUpdates || hasUpstreamUpdates
  }

  func rebuildOutputs(frame: CGFloat) {
    for pathContainer in upstreamPaths {
      let pathObjects = pathContainer.removePaths(updateFrame: frame)
      for path in pathObjects {
        let cornerRadius = properties.radius.value.cgFloatValue
        if cornerRadius != 0 {
          pathContainer.appendPath(
            path.roundCorners(radius: cornerRadius),
            updateFrame: frame)
        } else {
          pathContainer.appendPath(path, updateFrame: frame)
        }
      }
    }
  }

  // MARK: Fileprivate

  fileprivate let upstreamPaths: [PathOutputNode]
}
