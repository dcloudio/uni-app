// Created by miguel_jimenez on 7/27/23.
// Copyright © 2023 Airbnb Inc. All rights reserved.

#if canImport(SwiftUI)
import SwiftUI

@available(iOS 13.0, tvOS 13.0, macOS 10.15, *)
extension Binding {

  /// Helper to transform a `Binding` from one `Value` type to another.
  func map<Transformed>(transform: @escaping (Value) -> Transformed) -> Binding<Transformed> {
    .init {
      transform(wrappedValue)
    } set: { newValue in
      guard let newValue = newValue as? Value else { return }
      self.wrappedValue = newValue
    }
  }
}
#endif
