//
//  LottieColor.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/14/19.
//

import CoreGraphics

// MARK: - LottieColor + Codable

extension LottieColor: Codable {

  // MARK: Lifecycle

  public init(from decoder: Decoder) throws {
    var container = try decoder.unkeyedContainer()

    var r1: Double
    if !container.isAtEnd {
      r1 = try container.decode(Double.self)
    } else {
      r1 = 0
    }

    var g1: Double
    if !container.isAtEnd {
      g1 = try container.decode(Double.self)
    } else {
      g1 = 0
    }

    var b1: Double
    if !container.isAtEnd {
      b1 = try container.decode(Double.self)
    } else {
      b1 = 0
    }

    if r1 > 1, g1 > 1, b1 > 1 {
      r1 = r1 / 255
      g1 = g1 / 255
      b1 = b1 / 255
    }
    r = r1
    g = g1
    b = b1

    // The Lottie JSON schema supports alpha values in theory, as the fourth value in this array.
    // We intentionally do not support this, though, for consistency with Lottie on other platforms.
    a = 1
  }

  // MARK: Public

  public func encode(to encoder: Encoder) throws {
    var container = encoder.unkeyedContainer()
    try container.encode(r)
    try container.encode(g)
    try container.encode(b)
    try container.encode(a)
  }

}

// MARK: - LottieColor + AnyInitializable

extension LottieColor: AnyInitializable {

  init(value: Any) throws {
    guard var array = value as? [Double] else {
      throw InitializableError.invalidInput()
    }
    var r: Double = array.count > 0 ? array.removeFirst() : 0
    var g: Double = array.count > 0 ? array.removeFirst() : 0
    var b: Double = array.count > 0 ? array.removeFirst() : 0
    if r > 1, g > 1, b > 1 {
      r /= 255
      g /= 255
      b /= 255
    }
    self.r = r
    self.g = g
    self.b = b

    // The Lottie JSON schema supports alpha values in theory, as the fourth value in this array.
    // We intentionally do not support this, though, for consistency with Lottie on other platforms.
    a = 1
  }

}

extension LottieColor {
  static var clearColor: CGColor {
    .rgba(0, 0, 0, 0)
  }

  var cgColorValue: CGColor {
    .rgba(CGFloat(r), CGFloat(g), CGFloat(b), CGFloat(a))
  }
}
