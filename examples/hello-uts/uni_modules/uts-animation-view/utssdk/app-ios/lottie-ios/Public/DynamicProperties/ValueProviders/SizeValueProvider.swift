//
//  SizeValueProvider.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 2/4/19.
//

import CoreGraphics
import Foundation

// MARK: - SizeValueProvider

/// A `ValueProvider` that returns a CGSize Value
public final class SizeValueProvider: ValueProvider {

  // MARK: Lifecycle

  /// Initializes with a block provider
  public init(block: @escaping SizeValueBlock) {
    self.block = block
    size = .zero
    identity = UUID()
  }

  /// Initializes with a single size.
  public init(_ size: CGSize) {
    self.size = size
    block = nil
    hasUpdate = true
    identity = [size.width, size.height]
  }

  // MARK: Public

  /// Returns a CGSize for a CGFloat(Frame Time)
  public typealias SizeValueBlock = (CGFloat) -> CGSize

  public var size: CGSize {
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
      return .singleValue(size.vector3dValue)
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

  private var block: SizeValueBlock?
  private let identity: AnyHashable
}

// MARK: Equatable

extension SizeValueProvider: Equatable {
  public static func ==(_ lhs: SizeValueProvider, _ rhs: SizeValueProvider) -> Bool {
    lhs.identity == rhs.identity
  }
}
