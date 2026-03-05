// Created by eric_horacek on 11/18/20.
// Copyright © 2020 Airbnb Inc. All rights reserved.

// MARK: - EpoxyModelStorage

/// The underlying storage for an `EpoxyModeled` model that is capable of storing any
/// `EpoxyModelProperty`.
///
/// Supports being extended with additional storage capabilities in other modules and conditionally
/// based on the provider capabilities that the content containing this storage conforms to.
struct EpoxyModelStorage {

  // MARK: Lifecycle

  init() { }

  // MARK: Internal

  /// Stores or retrieves the value of the specified property.
  subscript<Property>(property: EpoxyModelProperty<Property>) -> Property {
    get {
      guard let propertyStorage = storage[property.keyPath] else {
        return property.defaultValue()
      }

      // This cast will never fail as the storage is only settable via this subscript and the
      // `KeyPath` key is unique for any provider and value type pair.
      // swiftlint:disable:next force_cast
      return propertyStorage.value as! Property
    }
    set {
      // We first update the value without using the `updateStrategy` since the likely scenario
      // is that there won't be a collision that requires the `updateStrategy`, and we'll be able to
      // return without incurring the cost of another write.
      let propertyStorage = PropertyStorage(value: newValue, property: property)

      guard var replaced = storage.updateValue(propertyStorage, forKey: property.keyPath) else {
        return
      }

      // This cast will never fail as the storage is only settable via this subscript and the
      // `KeyPath` key is unique for any provider and value type pair.
      // swiftlint:disable:next force_cast
      replaced.value = property.updateStrategy.update(replaced.value as! Property, newValue)

      storage[property.keyPath] = replaced
    }
  }

  /// Merges the given storage into this storage.
  ///
  /// In the case of a collision, the `UpdateStrategy` of the property is used to determine the
  /// resulting value in this storage.
  mutating func merge(_ other: Self) {
    for (key, otherValue) in other.storage {
      // We first update the value without using the `updateStrategy` since the likely scenario
      // is that there won't be a collision that requires the `updateStrategy`, and we'll be able to
      // return without incurring the cost of another write.
      guard var replaced = storage.updateValue(otherValue, forKey: key) else {
        continue
      }

      replaced.value = replaced.property.update(old: replaced.value, new: otherValue.value)

      storage[key] = replaced
    }
  }

  // MARK: Private

  /// The underlying storage for the properties, with a key of the `EpoxyModelProperty.keyPath` and
  /// a value of the property's `PropertyStorage`.
  ///
  /// Does not include default values.
  private var storage = [AnyKeyPath: PropertyStorage]()

}

// MARK: - PropertyStorage

/// A value stored within an `EpoxyModelStorage`.
private struct PropertyStorage {
  /// The type-erased value of the `EpoxyModelProperty`.
  var value: Any

  /// The property's corresponding `EpoxyModelProperty`, erased to an `AnyEpoxyModelProperty`.
  var property: AnyEpoxyModelProperty
}
