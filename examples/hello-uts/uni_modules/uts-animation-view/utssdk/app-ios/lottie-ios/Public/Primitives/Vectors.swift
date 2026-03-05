//
//  Vectors.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 2/4/19.
//

// MARK: - LottieVector1D

public struct LottieVector1D: Hashable, Sendable {

  public init(_ value: Double) {
    self.value = value
  }

  public let value: Double

}

// MARK: - LottieVector3D

/// A three dimensional vector.
/// These vectors are encoded and decoded from [Double]
public struct LottieVector3D: Hashable, Sendable {

  public let x: Double
  public let y: Double
  public let z: Double

  public init(x: Double, y: Double, z: Double) {
    self.x = x
    self.y = y
    self.z = z
  }

}
