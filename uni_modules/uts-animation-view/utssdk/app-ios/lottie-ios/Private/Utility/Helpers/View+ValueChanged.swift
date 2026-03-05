// Created by miguel_jimenez on 7/26/23.
// Copyright © 2023 Airbnb Inc. All rights reserved.

#if canImport(Combine) && canImport(SwiftUI)
import Combine
import SwiftUI

@available(iOS 13.0, tvOS 13.0, macOS 10.15, *)
extension View {
  /// A backwards compatible wrapper for iOS 14 `onChange`
  @ViewBuilder
  func valueChanged<T: Equatable>(value: T, onChange: @escaping (T) -> Void) -> some View {
    if #available(iOS 14.0, *, macOS 11.0, tvOS 14.0) {
      self.onChange(of: value, perform: onChange)
    } else {
      onReceive(Just(value)) { value in
        onChange(value)
      }
    }
  }
}
#endif
