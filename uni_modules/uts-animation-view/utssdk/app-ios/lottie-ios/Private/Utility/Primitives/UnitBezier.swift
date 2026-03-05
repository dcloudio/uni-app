// Copyright (C) 2008 Apple Inc. All Rights Reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
// 1. Redistributions of source code must retain the above copyright
//    notice, this list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

import CoreGraphics
import Foundation

/// Defines a cubic-bezier where the endpoints are (0, 0) and (1, 1)
///
/// The main use case is computing the progress of an animation at a given percent completion. For instance,
/// for a linear animation, the expected progress at `0.5` is `0.5`.
///
/// - Note: This is a Swift port of [Apple's WebKit code](
///   http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/platform/graphics/UnitBezier.h
/// )
///
struct UnitBezier {

  // MARK: Lifecycle

  init(controlPoint1: CGPoint, controlPoint2: CGPoint) {
    cx = 3.0 * controlPoint1.x
    bx = 3.0 * (controlPoint2.x - controlPoint1.x) - cx
    ax = 1.0 - cx - bx
    cy = 3.0 * controlPoint1.y
    by = 3.0 * (controlPoint2.y - controlPoint1.y) - cy
    ay = 1.0 - cy - by
  }

  // MARK: Internal

  /// Computes the progress `y` value for a given `x` value
  func value(for x: CGFloat, epsilon: CGFloat) -> CGFloat {
    sampleCurveY(solveCurveX(x, epsilon: epsilon))
  }

  // MARK: Private

  private let ax: CGFloat
  private let bx: CGFloat
  private let cx: CGFloat
  private let ay: CGFloat
  private let by: CGFloat
  private let cy: CGFloat

  /// Compute `x(t)` for a given `t`
  private func sampleCurveX(_ t: CGFloat) -> CGFloat {
    // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.
    ((ax * t + bx) * t + cx) * t
  }

  /// Compute `y(t)` for a given `t`
  private func sampleCurveY(_ t: CGFloat) -> CGFloat {
    ((ay * t + by) * t + cy) * t
  }

  /// Compute `x'(t)` for a given `t`
  private func sampleCurveDerivativeX(_ t: CGFloat) -> CGFloat {
    (3.0 * ax * t + 2.0 * bx) * t + cx
  }

  /// Given an `x` value solve for the parametric value `t`
  private func solveCurveX(_ x: CGFloat, epsilon: CGFloat) -> CGFloat {
    var t0, t1, t2, x2, d2: CGFloat

    // First try a few iterations of Newton-Raphson -- normally very fast.
    t2 = x
    for _ in 0..<8 {
      x2 = sampleCurveX(t2) - x
      guard abs(x2) >= epsilon else { return t2 }
      d2 = sampleCurveDerivativeX(t2)
      guard abs(d2) >= 1e-6 else { break }
      t2 = t2 - x2 / d2
    }

    // Fall back to the bisection method for reliability.
    t0 = 0.0
    t1 = 1.0
    t2 = x
    guard t2 >= t0 else { return t0 }
    guard t2 <= t1 else { return t1 }

    while t0 < t1 {
      x2 = sampleCurveX(t2)
      guard abs(x2 - x) >= epsilon else { return t2 }
      if x > x2 {
        t0 = t2
      } else {
        t1 = t2
      }
      t2 = (t1 - t0) * 0.5 + t0
    }

    return t2
  }
}
