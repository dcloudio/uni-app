//
//  PathElement.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/11/19.
//

import CoreGraphics
import Foundation

/// A path section, containing one point and its length to the previous point.
///
/// The relationship between this path element and the previous is implicit.
/// Ideally a path section would be defined by two vertices and a length.
/// We don't do this however, as it would effectively double the memory footprint
/// of path data.
///
struct PathElement {

  // MARK: Lifecycle

  /// Initializes a new path with length of 0
  init(vertex: CurveVertex) {
    length = 0
    self.vertex = vertex
  }

  /// Initializes a new path with length
  private init(length: CGFloat, vertex: CurveVertex) {
    self.length = length
    self.vertex = vertex
  }

  // MARK: Internal

  /// The absolute Length of the path element.
  let length: CGFloat

  /// The vertex of the element
  let vertex: CurveVertex

  /// Returns a new path element define the span from the receiver to the new vertex.
  func pathElementTo(_ toVertex: CurveVertex) -> PathElement {
    PathElement(length: vertex.distanceTo(toVertex), vertex: toVertex)
  }

  func updateVertex(newVertex: CurveVertex) -> PathElement {
    PathElement(length: length, vertex: newVertex)
  }

  /// Splits an element span defined by the receiver and fromElement to a position 0-1
  func splitElementAtPosition(fromElement: PathElement, atLength: CGFloat) ->
    (leftSpan: (start: PathElement, end: PathElement), rightSpan: (start: PathElement, end: PathElement))
  {
    /// Trim the span. Start and trim go into the first, trim and end go into second.
    let trimResults = fromElement.vertex.trimCurve(toVertex: vertex, atLength: atLength, curveLength: length, maxSamples: 3)

    /// Create the elements for the break
    let spanAStart = PathElement(
      length: fromElement.length,
      vertex: CurveVertex(
        point: fromElement.vertex.point,
        inTangent: fromElement.vertex.inTangent,
        outTangent: trimResults.start.outTangent))
    /// Recalculating the length here is a waste as the trimCurve function also accurately calculates this length.
    let spanAEnd = spanAStart.pathElementTo(trimResults.trimPoint)

    let spanBStart = PathElement(vertex: trimResults.trimPoint)
    let spanBEnd = spanBStart.pathElementTo(trimResults.end)
    return (
      leftSpan: (start: spanAStart, end: spanAEnd),
      rightSpan: (start: spanBStart, end: spanBEnd))
  }

}
