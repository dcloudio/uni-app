// Created by Cal Stephens on 8/14/23.
// Copyright © 2023 Airbnb Inc. All rights reserved.

// MARK: - LayerStyleType

enum LayerStyleType: Int, Codable, Sendable {
  case dropShadow = 1
  case unknown = 9999

  init(from decoder: Decoder) throws {
    self = try LayerStyleType(rawValue: decoder.singleValueContainer().decode(RawValue.self)) ?? .unknown
  }
}

// MARK: ClassFamily

extension LayerStyleType: ClassFamily {
  static var discriminator: Discriminator = .type

  func getType() -> AnyObject.Type {
    switch self {
    case .dropShadow:
      return DropShadowStyle.self
    case .unknown:
      // Unsupported
      return LayerStyle.self
    }
  }
}

// MARK: - LayerStyle

class LayerStyle: Codable, DictionaryInitializable {

  // MARK: Lifecycle

  required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: LayerStyle.CodingKeys.self)
    name = try container.decodeIfPresent(String.self, forKey: .name) ?? "Style"
    type = try container.decode(LayerStyleType.self, forKey: .type)
  }

  required init(dictionary: [String: Any]) throws {
    name = (try? dictionary.value(for: CodingKeys.name)) ?? "Layer"
    type = LayerStyleType(rawValue: try dictionary.value(for: CodingKeys.type)) ?? .unknown
  }

  // MARK: Internal

  /// The name of the style
  let name: String

  /// The type of style
  let type: LayerStyleType

  // MARK: Fileprivate

  fileprivate enum CodingKeys: String, CodingKey {
    case name = "nm"
    case type = "ty"
  }
}

extension [LayerStyle] {
  static func fromDictionaries(_ dictionaries: [[String: Any]]) throws -> [LayerStyle] {
    try dictionaries.compactMap { dictionary in
      let shapeType = dictionary[LayerStyle.CodingKeys.type.rawValue] as? Int
      switch LayerStyleType(rawValue: shapeType ?? LayerStyleType.unknown.rawValue) {
      case .dropShadow:
        return try DropShadowStyle(dictionary: dictionary)
      case .unknown, nil:
        // Unsupported
        return try LayerStyle(dictionary: dictionary)
      }
    }
  }
}

// MARK: - LayerStyle + Sendable

/// Since `LayerStyle` isn't `final`, we have to use `@unchecked Sendable` instead of `Sendable.`
/// All `LayerStyle` subclasses are immutable `Sendable` values.
// swiftlint:disable:next no_unchecked_sendable
extension LayerStyle: @unchecked Sendable { }
