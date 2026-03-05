//
//  BezierPathRoundExtension.swift
//  Lottie
//
//  Created by Duolingo on 11/1/22.
//

import CoreGraphics
import Foundation

//    Adapted to Swift from lottie-web & lottie-android:

//    Rounded corner algorithm:
//    Iterate through each vertex.
//    If a vertex is a sharp corner, it rounds it.
//    If a vertex has control points, it is already rounded, so it does nothing.
//
//    To round a vertex:
//    Split the vertex into two.
//    Move vertex 1 directly towards the previous vertex.
//    Set vertex 1's in control point to itself so it is not rounded on that side.
//    Extend vertex 1's out control point towards the original vertex.
//
//    Repeat for vertex 2:
//    Move vertex 2 directly towards the next vertex.
//    Set vertex 2's out point to itself so it is not rounded on that side.
//    Extend vertex 2's in control point towards the original vertex.
//
//    The distance that the vertices and control points are moved are relative to the
//    shape's vertex distances and the roundedness set in the animation.

extension CompoundBezierPath {
  // Round corners of a compound bezier
  func roundCorners(radius: CGFloat) -> CompoundBezierPath {
    var newPaths = [BezierPath]()
    for path in paths {
      newPaths.append(
        path.roundCorners(radius: radius))
    }

    return CompoundBezierPath(paths: newPaths)
  }
}

extension BezierPath {
  // Computes a new `BezierPath` with each corner rounded based on the given `radius`
  func roundCorners(radius: CGFloat) -> BezierPath {
    var newPath = BezierPath()
    var uniquePath = BezierPath()

    var currentVertex: CurveVertex
    var closestVertex: CurveVertex
    var distance: CGFloat
    var newPosPerc: CGFloat
    var closestIndex: Int

    var iX: CGFloat
    var iY: CGFloat
    var vX: CGFloat
    var vY: CGFloat
    var oX: CGFloat
    var oY: CGFloat

    var startIndex = 0

    let TANGENT_LENGTH = 0.5519

    // If start and end are the same we close the path
    if
      elements[0].vertex.point == elements[elements.count - 1].vertex.point,
      elements[0].vertex.inTangent == elements[elements.count - 1].vertex.inTangent,
      elements[0].vertex.outTangent == elements[elements.count - 1].vertex.outTangent
    {
      startIndex = 1
      newPath.close()
    }

    guard elements.count - startIndex > 1 else {
      return self
    }

    for i in startIndex..<elements.count {
      uniquePath.addVertex(elements[i].vertex)
    }

    var pathHasRoundedCorner = false

    for elementIndex in 0..<uniquePath.elements.count {
      currentVertex = uniquePath.elements[elementIndex].vertex

      guard
        currentVertex.point.x == currentVertex.outTangent.x,
        currentVertex.point.y == currentVertex.outTangent.y,
        currentVertex.point.x == currentVertex.inTangent.x,
        currentVertex.point.y == currentVertex.inTangent.y
      else {
        newPath.addVertex(currentVertex)
        continue
      }

      // Track whether or not this path has at least one rounded corner
      pathHasRoundedCorner = true

      // Do not round start and end if not closed
      if !newPath.closed, elementIndex == 0 || elementIndex == uniquePath.elements.count - 1 {
        newPath.addVertex(currentVertex)
      } else {
        closestIndex = elementIndex - 1
        if closestIndex < 0 {
          closestIndex = uniquePath.elements.count - 1
        }

        closestVertex = uniquePath.elements[closestIndex].vertex
        distance = currentVertex.point.distanceTo(closestVertex.point)
        newPosPerc = distance != 0 ? min(distance / 2, radius) / distance : 0

        iX = currentVertex.point.x + (closestVertex.point.x - currentVertex.point.x) * newPosPerc
        vX = iX
        iY = currentVertex.point.y - (currentVertex.point.y - closestVertex.point.y) * newPosPerc
        vY = iY
        oX = vX - (vX - currentVertex.point.x) * TANGENT_LENGTH
        oY = vY - (vY - currentVertex.point.y) * TANGENT_LENGTH
        newPath.addVertex(
          CurveVertex(
            CGPoint(x: iX, y: iY),
            CGPoint(x: vX, y: vY),
            CGPoint(x: oX, y: oY)))

        closestIndex = (elementIndex + 1) % uniquePath.elements.count

        closestVertex = uniquePath.elements[closestIndex].vertex
        distance = currentVertex.point.distanceTo(closestVertex.point)
        newPosPerc = distance != 0 ? min(distance / 2, radius) / distance : 0

        oX = currentVertex.point.x + (closestVertex.point.x - currentVertex.point.x) * newPosPerc
        vX = oX
        oY = currentVertex.point.y + (closestVertex.point.y - currentVertex.point.y) * newPosPerc
        vY = oY
        iX = vX - (vX - currentVertex.point.x) * TANGENT_LENGTH
        iY = vY - (vY - currentVertex.point.y) * TANGENT_LENGTH

        newPath.addVertex(
          CurveVertex(
            CGPoint(x: iX, y: iY),
            CGPoint(x: vX, y: vY),
            CGPoint(x: oX, y: oY)))
      }
    }

    // If we didn't need to apply the corner radius to any of the corners,
    // just use the original given path instead of modifying it.
    if !pathHasRoundedCorner {
      return self
    }

    return newPath
  }
}
