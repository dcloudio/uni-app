//
//  RectNode.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/21/19.
//

import CoreGraphics
import Foundation

// MARK: - RectNodeProperties

final class RectNodeProperties: NodePropertyMap, KeypathSearchable {

  // MARK: Lifecycle

  init(rectangle: Rectangle) {
    keypathName = rectangle.name
    direction = rectangle.direction
    position = NodeProperty(provider: KeyframeInterpolator(keyframes: rectangle.position.keyframes))
    size = NodeProperty(provider: KeyframeInterpolator(keyframes: rectangle.size.keyframes))
    cornerRadius = NodeProperty(provider: KeyframeInterpolator(keyframes: rectangle.cornerRadius.keyframes))

    keypathProperties = [
      PropertyName.position.rawValue : position,
      "Size" : size,
      "Roundness" : cornerRadius,
    ]

    properties = Array(keypathProperties.values)
  }

  // MARK: Internal

  var keypathName: String

  let keypathProperties: [String: AnyNodeProperty]
  let properties: [AnyNodeProperty]

  let direction: PathDirection
  let position: NodeProperty<LottieVector3D>
  let size: NodeProperty<LottieVector3D>
  let cornerRadius: NodeProperty<LottieVector1D>

}

// MARK: - RectangleNode

final class RectangleNode: AnimatorNode, PathNode {

  // MARK: Lifecycle

  init(parentNode: AnimatorNode?, rectangle: Rectangle) {
    properties = RectNodeProperties(rectangle: rectangle)
    pathOutput = PathOutputNode(parent: parentNode?.outputNode)
    self.parentNode = parentNode
  }

  // MARK: Internal

  let properties: RectNodeProperties

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
    pathOutput.setPath(
      .rectangle(
        position: properties.position.value.pointValue,
        size: properties.size.value.sizeValue,
        cornerRadius: properties.cornerRadius.value.cgFloatValue,
        direction: properties.direction),
      updateFrame: frame)
  }

}

// MARK: - BezierPath + rectangle

extension BezierPath {
  /// Constructs a `BezierPath` in the shape of a rectangle, optionally with rounded corners
  static func rectangle(
    position: CGPoint,
    size inputSize: CGSize,
    cornerRadius: CGFloat,
    direction: PathDirection)
    -> BezierPath
  {
    let size = inputSize * 0.5
    let radius = min(min(cornerRadius, size.width) , size.height)

    var bezierPath = BezierPath()
    let points: [CurveVertex]

    if radius <= 0 {
      /// No Corners
      points = [
        /// Lead In
        CurveVertex(
          point: CGPoint(x: size.width, y: -size.height),
          inTangentRelative: .zero,
          outTangentRelative: .zero)
          .translated(position),
        /// Corner 1
        CurveVertex(
          point: CGPoint(x: size.width, y: size.height),
          inTangentRelative: .zero,
          outTangentRelative: .zero)
          .translated(position),
        /// Corner 2
        CurveVertex(
          point: CGPoint(x: -size.width, y: size.height),
          inTangentRelative: .zero,
          outTangentRelative: .zero)
          .translated(position),
        /// Corner 3
        CurveVertex(
          point: CGPoint(x: -size.width, y: -size.height),
          inTangentRelative: .zero,
          outTangentRelative: .zero)
          .translated(position),
        /// Corner 4
        CurveVertex(
          point: CGPoint(x: size.width, y: -size.height),
          inTangentRelative: .zero,
          outTangentRelative: .zero)
          .translated(position),
      ]
    } else {
      let controlPoint = radius * EllipseNode.ControlPointConstant
      points = [
        /// Lead In
        CurveVertex(
          CGPoint(x: radius, y: 0),
          CGPoint(x: radius, y: 0),
          CGPoint(x: radius, y: 0))
          .translated(CGPoint(x: -radius, y: radius))
          .translated(CGPoint(x: size.width, y: -size.height))
          .translated(position),
        /// Corner 1
        CurveVertex(
          CGPoint(x: radius, y: 0), // In tangent
          CGPoint(x: radius, y: 0), // Point
          CGPoint(x: radius, y: controlPoint))
          .translated(CGPoint(x: -radius, y: -radius))
          .translated(CGPoint(x: size.width, y: size.height))
          .translated(position),
        CurveVertex(
          CGPoint(x: controlPoint, y: radius), // In tangent
          CGPoint(x: 0, y: radius), // Point
          CGPoint(x: 0, y: radius)) // Out Tangent
          .translated(CGPoint(x: -radius, y: -radius))
          .translated(CGPoint(x: size.width, y: size.height))
          .translated(position),
        /// Corner 2
        CurveVertex(
          CGPoint(x: 0, y: radius), // In tangent
          CGPoint(x: 0, y: radius), // Point
          CGPoint(x: -controlPoint, y: radius)) // Out tangent
          .translated(CGPoint(x: radius, y: -radius))
          .translated(CGPoint(x: -size.width, y: size.height))
          .translated(position),
        CurveVertex(
          CGPoint(x: -radius, y: controlPoint), // In tangent
          CGPoint(x: -radius, y: 0), // Point
          CGPoint(x: -radius, y: 0)) // Out tangent
          .translated(CGPoint(x: radius, y: -radius))
          .translated(CGPoint(x: -size.width, y: size.height))
          .translated(position),
        /// Corner 3
        CurveVertex(
          CGPoint(x: -radius, y: 0), // In tangent
          CGPoint(x: -radius, y: 0), // Point
          CGPoint(x: -radius, y: -controlPoint)) // Out tangent
          .translated(CGPoint(x: radius, y: radius))
          .translated(CGPoint(x: -size.width, y: -size.height))
          .translated(position),
        CurveVertex(
          CGPoint(x: -controlPoint, y: -radius), // In tangent
          CGPoint(x: 0, y: -radius), // Point
          CGPoint(x: 0, y: -radius)) // Out tangent
          .translated(CGPoint(x: radius, y: radius))
          .translated(CGPoint(x: -size.width, y: -size.height))
          .translated(position),
        /// Corner 4
        CurveVertex(
          CGPoint(x: 0, y: -radius), // In tangent
          CGPoint(x: 0, y: -radius), // Point
          CGPoint(x: controlPoint, y: -radius)) // Out tangent
          .translated(CGPoint(x: -radius, y: radius))
          .translated(CGPoint(x: size.width, y: -size.height))
          .translated(position),
        CurveVertex(
          CGPoint(x: radius, y: -controlPoint), // In tangent
          CGPoint(x: radius, y: 0), // Point
          CGPoint(x: radius, y: 0)) // Out tangent
          .translated(CGPoint(x: -radius, y: radius))
          .translated(CGPoint(x: size.width, y: -size.height))
          .translated(position),
      ]
    }
    let reversed = direction == .counterClockwise
    let pathPoints = reversed ? points.reversed() : points
    for point in pathPoints {
      bezierPath.addVertex(reversed ? point.reversed() : point)
    }
    bezierPath.close()
    return bezierPath
  }
}
