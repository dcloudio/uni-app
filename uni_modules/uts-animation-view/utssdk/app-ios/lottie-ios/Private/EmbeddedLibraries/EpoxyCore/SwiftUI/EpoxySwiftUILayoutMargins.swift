// Created by eric_horacek on 10/8/21.
// Copyright © 2021 Airbnb Inc. All rights reserved.

#if canImport(SwiftUI)
import SwiftUI

// MARK: - View

@available(iOS 13.0, tvOS 13.0, macOS 10.15, *)
extension View {
  /// Applies the layout margins from the parent `EpoxySwiftUIHostingView` to this `View`, if there
  /// are any.
  ///
  /// Can be used to have a background in SwiftUI underlap the safe area within a bar installer, for
  /// example.
  ///
  /// These margins are propagated via the `EnvironmentValues.epoxyLayoutMargins`.
  func epoxyLayoutMargins() -> some View {
    modifier(EpoxyLayoutMarginsPadding())
  }
}

// MARK: - EnvironmentValues

@available(iOS 13.0, tvOS 13.0, macOS 10.15, *)
extension EnvironmentValues {
  /// The layout margins of the parent `EpoxySwiftUIHostingView`, else zero if there is none.
  var epoxyLayoutMargins: EdgeInsets {
    get { self[EpoxyLayoutMarginsKey.self] }
    set { self[EpoxyLayoutMarginsKey.self] = newValue }
  }
}

// MARK: - EpoxyLayoutMarginsKey

@available(iOS 13.0, tvOS 13.0, macOS 10.15, *)
private struct EpoxyLayoutMarginsKey: EnvironmentKey {
  static let defaultValue = EdgeInsets()
}

// MARK: - EpoxyLayoutMarginsPadding

/// A view modifier that applies the layout margins from an enclosing `EpoxySwiftUIHostingView` to
/// the modified `View`.
@available(iOS 13.0, tvOS 13.0, macOS 10.15, *)
private struct EpoxyLayoutMarginsPadding: ViewModifier {
  @Environment(\.epoxyLayoutMargins) var epoxyLayoutMargins

  func body(content: Content) -> some View {
    content.padding(epoxyLayoutMargins)
  }
}
#endif
