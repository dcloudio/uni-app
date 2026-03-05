//
//  GradientValueProvider.swift
//  lottie-swift
//
//  Created by Enrique Bermúdez on 10/27/19.
//

import CoreGraphics
import Foundation

// MARK: - GradientValueProvider

/// A `ValueProvider` that returns a Gradient Color Value.
public final class GradientValueProvider: ValueProvider {

  // MARK: Lifecycle

  /// Initializes with a block provider.
  public init(
    block: @escaping ColorsValueBlock,
    locations: ColorLocationsBlock? = nil)
  {
    self.block = block
    locationsBlock = locations
    colors = []
    self.locations = []
    identity = UUID()
  }

  /// Initializes with an array of colors.
  public init(
    _ colors: [LottieColor],
    locations: [Double] = [])
  {
    self.colors = colors
    self.locations = locations
    identity = [AnyHashable(colors), AnyHashable(locations)]
    updateValueArray()
    hasUpdate = true
  }

  // MARK: Public

  /// Returns a [LottieColor] for a CGFloat(Frame Time).
  public typealias ColorsValueBlock = (CGFloat) -> [LottieColor]
  /// Returns a [Double](Color locations) for a CGFloat(Frame Time).
  public typealias ColorLocationsBlock = (CGFloat) -> [Double]

  /// The colors values of the provider.
  public var colors: [LottieColor] {
    didSet {
      updateValueArray()
      hasUpdate = true
    }
  }

  /// The color location values of the provider.
  public var locations: [Double] {
    didSet {
      updateValueArray()
      hasUpdate = true
    }
  }

  // MARK: ValueProvider Protocol

  public var valueType: Any.Type {
    [Double].self
  }

  public var storage: ValueProviderStorage<[Double]> {
    if let block {
      return .closure { [self] frame in
        hasUpdate = false

        let newColors = block(frame)
        let newLocations = locationsBlock?(frame) ?? []
        value = value(from: newColors, locations: newLocations)

        return value
      }
    } else {
      return .singleValue(value)
    }
  }

  public func hasUpdate(frame _: CGFloat) -> Bool {
    if block != nil || locationsBlock != nil {
      return true
    }
    return hasUpdate
  }

  // MARK: Private

  private var hasUpdate = true

  private var block: ColorsValueBlock?
  private var locationsBlock: ColorLocationsBlock?
  private var value: [Double] = []

  private let identity: AnyHashable

  private func value(from colors: [LottieColor], locations: [Double]) -> [Double] {
    var colorValues = [Double]()
    var alphaValues = [Double]()
    var shouldAddAlphaValues = false

    for i in 0..<colors.count {
      if colors[i].a < 1 { shouldAddAlphaValues = true }

      let location = locations.count > i
        ? locations[i]
        : (Double(i) / Double(colors.count - 1))

      colorValues.append(location)
      colorValues.append(colors[i].r)
      colorValues.append(colors[i].g)
      colorValues.append(colors[i].b)

      alphaValues.append(location)
      alphaValues.append(colors[i].a)
    }

    return colorValues + (shouldAddAlphaValues ? alphaValues : [])
  }

  private func updateValueArray() {
    value = value(from: colors, locations: locations)
  }

}

// MARK: Equatable

extension GradientValueProvider: Equatable {
  public static func ==(_ lhs: GradientValueProvider, _ rhs: GradientValueProvider) -> Bool {
    lhs.identity == rhs.identity
  }
}
