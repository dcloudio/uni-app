//
//  DoubleValueProvider.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 2/4/19.
//

import CoreGraphics
import Foundation

// MARK: - FloatValueProvider

/// A `ValueProvider` that returns a CGFloat Value
public final class FloatValueProvider: ValueProvider {

  // MARK: Lifecycle

  /// Initializes with a block provider
  public init(block: @escaping CGFloatValueBlock) {
    self.block = block
    float = 0
    identity = UUID()
  }

  /// Initializes with a single float.
  public init(_ float: CGFloat) {
    self.float = float
    block = nil
    hasUpdate = true
    identity = float
  }

  // MARK: Public

  /// Returns a CGFloat for a CGFloat(Frame Time)
  public typealias CGFloatValueBlock = (CGFloat) -> CGFloat

  public var float: CGFloat {
    didSet {
      hasUpdate = true
    }
  }

  // MARK: ValueProvider Protocol

  public var valueType: Any.Type {
    LottieVector1D.self
  }

  public var storage: ValueProviderStorage<LottieVector1D> {
    if let block {
      return .closure { frame in
        self.hasUpdate = false
        return LottieVector1D(Double(block(frame)))
      }
    } else {
      hasUpdate = false
      return .singleValue(LottieVector1D(Double(float)))
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

  private var block: CGFloatValueBlock?
  private var identity: AnyHashable
}

// MARK: Equatable

extension FloatValueProvider: Equatable {
  public static func ==(_ lhs: FloatValueProvider, _ rhs: FloatValueProvider) -> Bool {
    lhs.identity == rhs.identity
  }
}
