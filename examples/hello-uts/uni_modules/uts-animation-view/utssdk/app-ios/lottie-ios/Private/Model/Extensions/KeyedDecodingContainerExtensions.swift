// From: https://medium.com/@kewindannerfjordremeczki/swift-4-0-decodable-heterogeneous-collections-ecc0e6b468cf

// MARK: - ClassFamily

/// To support a new class family, create an enum that conforms to this protocol and contains the different types.
protocol ClassFamily: Decodable {
  /// The discriminator key.
  static var discriminator: Discriminator { get }

  /// The "unknown" fallback case if the type discriminator could not be parsed successfully.
  static var unknown: Self { get }

  /// Returns the class type of the object corresponding to the value.
  func getType() -> AnyObject.Type
}

// MARK: - Discriminator

/// Discriminator key enum used to retrieve discriminator fields in JSON payloads.
enum Discriminator: String, CodingKey {
  case type = "ty"
}

extension KeyedDecodingContainer {

  /// Decode a heterogeneous list of objects for a given family.
  /// - Parameters:
  ///     - heterogeneousType: The decodable type of the list.
  ///     - family: The ClassFamily enum for the type family.
  ///     - key: The CodingKey to look up the list in the current container.
  /// - Returns: The resulting list of heterogeneousType elements.
  func decode<T: Decodable, U: ClassFamily>(_: [T].Type, ofFamily family: U.Type, forKey key: K) throws -> [T] {
    var container = try nestedUnkeyedContainer(forKey: key)
    var list = [T]()
    var tmpContainer = container
    while !container.isAtEnd {
      let typeContainer = try container.nestedContainer(keyedBy: Discriminator.self)
      let family: U = (try? typeContainer.decodeIfPresent(U.self, forKey: U.discriminator)) ?? .unknown
      if let type = family.getType() as? T.Type {
        list.append(try tmpContainer.decode(type))
      }
    }
    return list
  }

  /// Decode a heterogeneous list of objects for a given family if the given key is present.
  /// - Parameters:
  ///     - heterogeneousType: The decodable type of the list.
  ///     - family: The ClassFamily enum for the type family.
  ///     - key: The CodingKey to look up the list in the current container.
  /// - Returns: The resulting list of heterogeneousType elements.
  func decodeIfPresent<T: Decodable, U: ClassFamily>(_: [T].Type, ofFamily family: U.Type, forKey key: K) throws -> [T]? {
    var container: UnkeyedDecodingContainer
    do {
      container = try nestedUnkeyedContainer(forKey: key)
    } catch {
      return nil
    }

    var list = [T]()
    var tmpContainer = container
    while !container.isAtEnd {
      let typeContainer = try container.nestedContainer(keyedBy: Discriminator.self)
      let family: U = (try? typeContainer.decodeIfPresent(U.self, forKey: U.discriminator)) ?? .unknown
      if let type = family.getType() as? T.Type {
        list.append(try tmpContainer.decode(type))
      }
    }
    return list
  }
}
