//
//  StarNode.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/21/19.
//

import Foundation
import QuartzCore

// MARK: - StarNodeProperties

final class StarNodeProperties: NodePropertyMap, KeypathSearchable {

  // MARK: Lifecycle

  init(star: Star) {
    keypathName = star.name
    direction = star.direction
    position = NodeProperty(provider: KeyframeInterpolator(keyframes: star.position.keyframes))
    outerRadius = NodeProperty(provider: KeyframeInterpolator(keyframes: star.outerRadius.keyframes))
    outerRoundedness = NodeProperty(provider: KeyframeInterpolator(keyframes: star.outerRoundness.keyframes))
    if let innerRadiusKeyframes = star.innerRadius?.keyframes {
      innerRadius = NodeProperty(provider: KeyframeInterpolator(keyframes: innerRadiusKeyframes))
    } else {
      innerRadius = NodeProperty(provider: SingleValueProvider(LottieVector1D(0)))
    }
    if let innderRoundedness = star.innerRoundness?.keyframes {
      innerRoundedness = NodeProperty(provider: KeyframeInterpolator(keyframes: innderRoundedness))
    } else {
      innerRoundedness = NodeProperty(provider: SingleValueProvider(LottieVector1D(0)))
    }
    rotation = NodeProperty(provider: KeyframeInterpolator(keyframes: star.rotation.keyframes))
    points = NodeProperty(provider: KeyframeInterpolator(keyframes: star.points.keyframes))
    keypathProperties = [
      PropertyName.position.rawValue : position,
      "Outer Radius" : outerRadius,
      "Outer Roundedness" : outerRoundedness,
      "Inner Radius" : innerRadius,
      "Inner Roundedness" : innerRoundedness,
      PropertyName.rotation.rawValue : rotation,
      "Points" : points,
    ]
    properties = Array(keypathProperties.values)
  }

  // MARK: Internal

  var keypathName: String

  let keypathProperties: [String: AnyNodeProperty]
  let properties: [AnyNodeProperty]

  let direction: PathDirection
  let position: NodeProperty<LottieVector3D>
  let outerRadius: NodeProperty<LottieVector1D>
  let outerRoundedness: NodeProperty<LottieVector1D>
  let innerRadius: NodeProperty<LottieVector1D>
  let innerRoundedness: NodeProperty<LottieVector1D>
  let rotation: NodeProperty<LottieVector1D>
  let points: NodeProperty<LottieVector1D>
}

// MARK: - StarNode

final class StarNode: AnimatorNode, PathNode {

  // MARK: Lifecycle

  init(parentNode: AnimatorNode?, star: Star) {
    pathOutput = PathOutputNode(parent: parentNode?.outputNode)
    properties = StarNodeProperties(star: star)
    self.parentNode = parentNode
  }

  // MARK: Internal

  /// Magic number needed for building path data
  static let PolystarConstant: CGFloat = 0.47829

  let properties: StarNodeProperties

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
    let path = BezierPath.star(
      position: properties.position.value.pointValue,
      outerRadius: properties.outerRadius.value.cgFloatValue,
      innerRadius: properties.innerRadius.value.cgFloatValue,
      outerRoundedness: properties.outerRoundedness.value.cgFloatValue,
      innerRoundedness: properties.innerRoundedness.value.cgFloatValue,
      numberOfPoints: properties.points.value.cgFloatValue,
      rotation: properties.rotation.value.cgFloatValue,
      direction: properties.direction)

    pathOutput.setPath(path, updateFrame: frame)
  }

}

extension BezierPath {
  /// Constructs a `BezierPath` in the shape of a star
  static func star(
    position: CGPoint,
    outerRadius: CGFloat,
    innerRadius: CGFloat,
    outerRoundedness inoutOuterRoundedness: CGFloat,
    innerRoundedness inputInnerRoundedness: CGFloat,
    numberOfPoints: CGFloat,
    rotation: CGFloat,
    direction: PathDirection)
    -> BezierPath
  {
    var currentAngle = (rotation - 90).toRadians()
    let anglePerPoint = (2 * CGFloat.pi) / numberOfPoints
    let halfAnglePerPoint = anglePerPoint / 2.0
    let partialPointAmount = numberOfPoints - floor(numberOfPoints)
    let outerRoundedness = inoutOuterRoundedness * 0.01
    let innerRoundedness = inputInnerRoundedness * 0.01

    var point: CGPoint = .zero

    var partialPointRadius: CGFloat = 0
    if partialPointAmount != 0 {
      currentAngle += halfAnglePerPoint * (1 - partialPointAmount)
      partialPointRadius = innerRadius + partialPointAmount * (outerRadius - innerRadius)
      point.x = (partialPointRadius * cos(currentAngle))
      point.y = (partialPointRadius * sin(currentAngle))
      currentAngle += anglePerPoint * partialPointAmount / 2
    } else {
      point.x = (outerRadius * cos(currentAngle))
      point.y = (outerRadius * sin(currentAngle))
      currentAngle += halfAnglePerPoint
    }

    var vertices = [CurveVertex]()
    vertices.append(CurveVertex(point: point + position, inTangentRelative: .zero, outTangentRelative: .zero))

    var previousPoint = point
    var longSegment = false
    let numPoints = Int(ceil(numberOfPoints) * 2)
    for i in 0..<numPoints {
      var radius = longSegment ? outerRadius : innerRadius
      var dTheta = halfAnglePerPoint
      if partialPointRadius != 0, i == numPoints - 2 {
        dTheta = anglePerPoint * partialPointAmount / 2
      }
      if partialPointRadius != 0, i == numPoints - 1 {
        radius = partialPointRadius
      }
      previousPoint = point
      point.x = (radius * cos(currentAngle))
      point.y = (radius * sin(currentAngle))

      if innerRoundedness == 0, outerRoundedness == 0 {
        vertices.append(CurveVertex(point: point + position, inTangentRelative: .zero, outTangentRelative: .zero))
      } else {
        let cp1Theta = (atan2(previousPoint.y, previousPoint.x) - CGFloat.pi / 2)
        let cp1Dx = cos(cp1Theta)
        let cp1Dy = sin(cp1Theta)

        let cp2Theta = (atan2(point.y, point.x) - CGFloat.pi / 2)
        let cp2Dx = cos(cp2Theta)
        let cp2Dy = sin(cp2Theta)

        let cp1Roundedness = longSegment ? innerRoundedness : outerRoundedness
        let cp2Roundedness = longSegment ? outerRoundedness : innerRoundedness
        let cp1Radius = longSegment ? innerRadius : outerRadius
        let cp2Radius = longSegment ? outerRadius : innerRadius

        var cp1 = CGPoint(
          x: cp1Radius * cp1Roundedness * StarNode.PolystarConstant * cp1Dx,
          y: cp1Radius * cp1Roundedness * StarNode.PolystarConstant * cp1Dy)
        var cp2 = CGPoint(
          x: cp2Radius * cp2Roundedness * StarNode.PolystarConstant * cp2Dx,
          y: cp2Radius * cp2Roundedness * StarNode.PolystarConstant * cp2Dy)
        if partialPointAmount != 0 {
          if i == 0 {
            cp1 = cp1 * partialPointAmount
          } else if i == numPoints - 1 {
            cp2 = cp2 * partialPointAmount
          }
        }
        let previousVertex = vertices[vertices.endIndex - 1]
        vertices[vertices.endIndex - 1] = CurveVertex(
          previousVertex.inTangent,
          previousVertex.point,
          previousVertex.point - cp1)
        vertices.append(CurveVertex(point: point + position, inTangentRelative: cp2, outTangentRelative: .zero))
      }
      currentAngle += dTheta
      longSegment = !longSegment
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
