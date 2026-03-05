//
//  PointValueProvider.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 2/4/19.
//

import CoreGraphics
import Foundation

// MARK: - PointValueProvider

/// A `ValueProvider` that returns a CGPoint Value
public final class PointValueProvider: ValueProvider {

  // MARK: Lifecycle

  /// Initializes with a block provider
  public init(block: @escaping PointValueBlock) {
    self.block = block
    point = .zero
    identity = UUID()
  }

  /// Initializes with a single point.
  public init(_ point: CGPoint) {
    self.point = point
    block = nil
    hasUpdate = true
    identity = [point.x, point.y]
  }

  // MARK: Public

  /// Returns a CGPoint for a CGFloat(Frame Time)
  public typealias PointValueBlock = (CGFloat) -> CGPoint

  public var point: CGPoint {
    didSet {
      hasUpdate = true
    }
  }

  // MARK: ValueProvider Protocol

  public var valueType: Any.Type {
    LottieVector3D.self
  }

  public var storage: ValueProviderStorage<LottieVector3D> {
    if let block {
      return .closure { frame in
        self.hasUpdate = false
        return block(frame).vector3dValue
      }
    } else {
      hasUpdate = false
      return .singleValue(point.vector3dValue)
    }
  }

  public func hasUpdate(frame _: CGFloat) -> Bool {
    if block != nil {
      return true
    }
    return hasUpdate
  }

  // MARK: Private

  private var hasUpdate = true

  private var block: PointValueBlock?
  private let identity: AnyHashable
}

// MARK: Equatable

extension PointValueProvider: Equatable {
  public static func ==(_ lhs: PointValueProvider, _ rhs: PointValueProvider) -> Bool {
    lhs.identity == rhs.identity
  }
}
