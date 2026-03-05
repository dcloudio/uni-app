//
//  PolygonNode.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/21/19.
//

import Foundation
import QuartzCore

// MARK: - PolygonNodeProperties

final class PolygonNodeProperties: NodePropertyMap, KeypathSearchable {

  // MARK: Lifecycle

  init(star: Star) {
    keypathName = star.name
    direction = star.direction
    position = NodeProperty(provider: KeyframeInterpolator(keyframes: star.position.keyframes))
    outerRadius = NodeProperty(provider: KeyframeInterpolator(keyframes: star.outerRadius.keyframes))
    outerRoundedness = NodeProperty(provider: KeyframeInterpolator(keyframes: star.outerRoundness.keyframes))
    rotation = NodeProperty(provider: KeyframeInterpolator(keyframes: star.rotation.keyframes))
    points = NodeProperty(provider: KeyframeInterpolator(keyframes: star.points.keyframes))
    keypathProperties = [
      PropertyName.position.rawValue : position,
      "Outer Radius" : outerRadius,
      "Outer Roundedness" : outerRoundedness,
      PropertyName.rotation.rawValue : rotation,
      "Points" : points,
    ]
    properties = Array(keypathProperties.values)
  }

  // MARK: Internal

  var keypathName: String

  var childKeypaths: [KeypathSearchable] = []

  let keypathProperties: [String: AnyNodeProperty]
  let properties: [AnyNodeProperty]

  let direction: PathDirection
  let position: NodeProperty<LottieVector3D>
  let outerRadius: NodeProperty<LottieVector1D>
  let outerRoundedness: NodeProperty<LottieVector1D>
  let rotation: NodeProperty<LottieVector1D>
  let points: NodeProperty<LottieVector1D>
}

// MARK: - PolygonNode

final class PolygonNode: AnimatorNode, PathNode {

  // MARK: Lifecycle

  init(parentNode: AnimatorNode?, star: Star) {
    pathOutput = PathOutputNode(parent: parentNode?.outputNode)
    properties = PolygonNodeProperties(star: star)
    self.parentNode = parentNode
  }

  // MARK: Internal

  /// Magic number needed for constructing path.
  static let PolygonConstant: CGFloat = 0.25

  let properties: PolygonNodeProperties

  let pathOutput: PathOutputNode

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
    let path = BezierPath.polygon(
      position: properties.position.value.pointValue,
      numberOfPoints: properties.points.value.cgFloatValue,
      outerRadius: properties.outerRadius.value.cgFloatValue,
      outerRoundedness: properties.outerRoundedness.value.cgFloatValue,
      rotation: properties.rotation.value.cgFloatValue,
      direction: properties.direction)

    pathOutput.setPath(path, updateFrame: frame)
  }

}

extension BezierPath {
  /// Creates a `BezierPath` in the shape of a polygon
  static func polygon(
    position: CGPoint,
    numberOfPoints: CGFloat,
    outerRadius: CGFloat,
    outerRoundedness inputOuterRoundedness: CGFloat,
    rotation: CGFloat,
    direction: PathDirection)
    -> BezierPath
  {
    var currentAngle = (rotation - 90).toRadians()
    let anglePerPoint = ((2 * CGFloat.pi) / numberOfPoints)
    let outerRoundedness = inputOuterRoundedness * 0.01

    var point = CGPoint(
      x: outerRadius * cos(currentAngle),
      y: outerRadius * sin(currentAngle))
    var vertices = [CurveVertex(point: point + position, inTangentRelative: .zero, outTangentRelative: .zero)]

    var previousPoint = point
    currentAngle += anglePerPoint;
    for _ in 0..<Int(ceil(numberOfPoints)) {
      previousPoint = point
      point = CGPoint(
        x: outerRadius * cos(currentAngle),
        y: outerRadius * sin(currentAngle))

      if outerRoundedness != 0 {
        let cp1Theta = (atan2(previousPoint.y, previousPoint.x) - CGFloat.pi / 2)
        let cp1Dx = cos(cp1Theta);
        let cp1Dy = sin(cp1Theta);

        let cp2Theta = (atan2(point.y, point.x) - CGFloat.pi / 2)
        let cp2Dx = cos(cp2Theta)
        let cp2Dy = sin(cp2Theta)

        let cp1 = CGPoint(
          x: outerRadius * outerRoundedness * PolygonNode.PolygonConstant * cp1Dx,
          y: outerRadius * outerRoundedness * PolygonNode.PolygonConstant * cp1Dy)
        let cp2 = CGPoint(
          x: outerRadius * outerRoundedness * PolygonNode.PolygonConstant * cp2Dx,
          y: outerRadius * outerRoundedness * PolygonNode.PolygonConstant * cp2Dy)

        let previousVertex = vertices[vertices.endIndex - 1]
        vertices[vertices.endIndex - 1] = CurveVertex(
          previousVertex.inTangent,
          previousVertex.point,
          previousVertex.point - cp1)
        vertices.append(CurveVertex(point: point + position, inTangentRelative: cp2, outTangentRelative: .zero))
      } else {
        vertices.append(CurveVertex(point: point + position, inTangentRelative: .zero, outTangentRelative: .zero))
      }
      currentAngle += anglePerPoint;
    }
    let reverse = direction == .counterClockwise
    if reverse {
      vertices = vertices.reversed()
    }
    var path = BezierPath()
    for vertex in vertices {
      path.addVertex(reverse ? vertex.reversed() : vertex)
    }
    path.close()
    return path
  }
}
