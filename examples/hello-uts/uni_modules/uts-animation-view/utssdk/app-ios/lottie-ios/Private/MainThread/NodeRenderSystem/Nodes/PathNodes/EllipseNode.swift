//
//  EllipseNode.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/17/19.
//

import Foundation
import QuartzCore

// MARK: - EllipseNodeProperties

final class EllipseNodeProperties: NodePropertyMap, KeypathSearchable {

  // MARK: Lifecycle

  init(ellipse: Ellipse) {
    keypathName = ellipse.name
    direction = ellipse.direction
    position = NodeProperty(provider: KeyframeInterpolator(keyframes: ellipse.position.keyframes))
    size = NodeProperty(provider: KeyframeInterpolator(keyframes: ellipse.size.keyframes))
    keypathProperties = [
      PropertyName.position.rawValue : position,
      "Size" : size,
    ]
    properties = Array(keypathProperties.values)
  }

  // MARK: Internal

  var keypathName: String

  let direction: PathDirection
  let position: NodeProperty<LottieVector3D>
  let size: NodeProperty<LottieVector3D>

  let keypathProperties: [String: AnyNodeProperty]
  let properties: [AnyNodeProperty]
}

// MARK: - EllipseNode

final class EllipseNode: AnimatorNode, PathNode {

  // MARK: Lifecycle

  init(parentNode: AnimatorNode?, ellipse: Ellipse) {
    pathOutput = PathOutputNode(parent: parentNode?.outputNode)
    properties = EllipseNodeProperties(ellipse: ellipse)
    self.parentNode = parentNode
  }

  // MARK: Internal

  static let ControlPointConstant: CGFloat = 0.55228

  let pathOutput: PathOutputNode

  let properties: EllipseNodeProperties

  let parentNode: AnimatorNode?
  var hasLocalUpdates = false
  var hasUpstreamUpdates = false
  var lastUpdateFrame: CGFloat? = nil

  // MARK: Animator Node

  var propertyMap: NodePropertyMap & KeypathSearchable {
    properties
  }

  var isEnabled = true {
    didSet {
      pathOutput.isEnabled = isEnabled
    }
  }

  func rebuildOutputs(frame: CGFloat) {
    pathOutput.setPath(
      .ellipse(
        size: properties.size.value.sizeValue,
        center: properties.position.value.pointValue,
        direction: properties.direction),
      updateFrame: frame)
  }

}

extension BezierPath {
  /// Constructs a `BezierPath` in the shape of an ellipse
  static func ellipse(
    size: CGSize,
    center: CGPoint,
    direction: PathDirection)
    -> BezierPath
  {
    // Unfortunately we HAVE to manually build out the ellipse.
    // Every Apple method constructs an ellipse from the 3 o-clock position
    // After effects constructs from the Noon position.
    // After effects does clockwise, but also has a flag for reversed.
    var half = size * 0.5
    if direction == .counterClockwise {
      half.width = half.width * -1
    }

    let q1 = CGPoint(x: center.x, y: center.y - half.height)
    let q2 = CGPoint(x: center.x + half.width, y: center.y)
    let q3 = CGPoint(x: center.x, y: center.y + half.height)
    let q4 = CGPoint(x: center.x - half.width, y: center.y)

    let cp = half * EllipseNode.ControlPointConstant

    var path = BezierPath(startPoint: CurveVertex(
      point: q1,
      inTangentRelative: CGPoint(x: -cp.width, y: 0),
      outTangentRelative: CGPoint(x: cp.width, y: 0)))
    path.addVertex(CurveVertex(
      point: q2,
      inTangentRelative: CGPoint(x: 0, y: -cp.height),
      outTangentRelative: CGPoint(x: 0, y: cp.height)))

    path.addVertex(CurveVertex(
      point: q3,
      inTangentRelative: CGPoint(x: cp.width, y: 0),
      outTangentRelative: CGPoint(x: -cp.width, y: 0)))

    path.addVertex(CurveVertex(
      point: q4,
      inTangentRelative: CGPoint(x: 0, y: cp.height),
      outTangentRelative: CGPoint(x: 0, y: -cp.height)))

    path.addVertex(CurveVertex(
      point: q1,
      inTangentRelative: CGPoint(x: -cp.width, y: 0),
      outTangentRelative: CGPoint(x: cp.width, y: 0)))
    path.close()
    return path
  }
}
