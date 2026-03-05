// Created by Cal Stephens on 10/15/21.
// Copyright © 2021 Airbnb Inc. All rights reserved.

// MARK: - ClassReference

/// A `Hashable` value wrapper around an `AnyClass` value
///  - Unlike `ObjectIdentifier(class)`, `ClassReference(class)`
///    preserves the `AnyClass` value and is more human-readable.
struct ClassReference {
  init(_ class: AnyClass) {
    self.class = `class`
  }

  let `class`: AnyClass
}

// MARK: Equatable

extension ClassReference: Equatable {
  static func ==(_ lhs: Self, _ rhs: Self) -> Bool {
    ObjectIdentifier(lhs.class) == ObjectIdentifier(rhs.class)
  }
}

// MARK: Hashable

extension ClassReference: Hashable {
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(`class`))
  }
}

// MARK: CustomStringConvertible

extension ClassReference: CustomStringConvertible {
  var description: String {
    String(describing: `class`)
  }
}
