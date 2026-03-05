// Created by eric_horacek on 3/3/22.
// Copyright © 2022 Airbnb Inc. All rights reserved.

#if canImport(SwiftUI)
import SwiftUI

// MARK: - ViewTypeProtocol + swiftUIView

@available(iOS 13.0, tvOS 13.0, macOS 10.15, *)
extension ViewTypeProtocol {
  /// Returns a SwiftUI `View` representing this `UIView`, constructed with the given `makeView`
  /// closure and sized with the given sizing configuration.
  ///
  /// To perform additional configuration of the `UIView` instance, call `configure` on the
  /// returned SwiftUI `View`:
  /// ```
  /// MyUIView.swiftUIView(…)
  ///   .configure { context in
  ///     context.view.doSomething()
  ///   }
  /// ```
  ///
  /// To configure the sizing behavior of the `UIView` instance, call `sizing` on the returned
  /// SwiftUI `View`:
  /// ```
  /// MyView.swiftUIView(…).sizing(.intrinsicSize)
  /// ```
  /// The sizing defaults to `.automatic`.
  static func swiftUIView(makeView: @escaping () -> Self) -> SwiftUIView<Self, Void> {
    SwiftUIView(makeContent: makeView)
  }
}

// MARK: - ViewTypeProtocol

/// A protocol that all `UIView`s conform to, enabling extensions that have a `Self` reference.
protocol ViewTypeProtocol: ViewType { }

// MARK: - ViewType + ViewTypeProtocol

extension ViewType: ViewTypeProtocol { }
#endif
