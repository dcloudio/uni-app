// Created by eric_horacek on 9/13/21.
// Copyright © 2021 Airbnb Inc. All rights reserved.

#if canImport(SwiftUI)
import SwiftUI

// MARK: - StyledView

@available(iOS 13.0, tvOS 13.0, macOS 10.15, *)
extension StyledView where Self: ContentConfigurableView & BehaviorsConfigurableView {
  /// Returns a SwiftUI `View` representing this `EpoxyableView`.
  ///
  /// To perform additional configuration of the `EpoxyableView` instance, call `configure` on the
  /// returned SwiftUI `View`:
  /// ```
  /// MyView.swiftUIView(…)
  ///   .configure { context in
  ///     context.view.doSomething()
  ///   }
  /// ```
  ///
  /// To configure the sizing behavior of the `EpoxyableView` instance, call `sizing` on the
  /// returned SwiftUI `View`:
  /// ```
  /// MyView.swiftUIView(…).sizing(.intrinsicSize)
  /// ```
  static func swiftUIView(
    content: Content,
    style: Style,
    behaviors: Behaviors? = nil)
    -> SwiftUIView<Self, (content: Content, style: Style)>
  {
    SwiftUIView(storage: (content: content, style: style)) {
      let view = Self(style: style)
      view.setContent(content, animated: false)
      return view
    }
    .configure { context in
      // We need to create a new view instance when the style changes.
      if context.oldStorage.style != style {
        context.view = Self(style: style)
        context.view.setContent(content, animated: context.animated)
      }
      // Otherwise, if the just the content changes, we need to update it.
      else if context.oldStorage.content != content {
        context.view.setContent(content, animated: context.animated)
        context.container.invalidateIntrinsicContentSize()
      }

      context.view.setBehaviors(behaviors)
    }
  }
}

@available(iOS 13.0, tvOS 13.0, macOS 10.15, *)
extension StyledView
  where
  Self: ContentConfigurableView & BehaviorsConfigurableView,
  Style == Never
{
  /// Returns a SwiftUI `View` representing this `EpoxyableView`.
  ///
  /// To perform additional configuration of the `EpoxyableView` instance, call `configure` on the
  /// returned SwiftUI `View`:
  /// ```
  /// MyView.swiftUIView(…)
  ///   .configure { context in
  ///     context.view.doSomething()
  ///   }
  /// ```
  ///
  /// To configure the sizing behavior of the `EpoxyableView` instance, call `sizing` on the
  /// returned SwiftUI `View`:
  /// ```
  /// MyView.swiftUIView(…).sizing(.intrinsicSize)
  /// ```
  static func swiftUIView(
    content: Content,
    behaviors: Behaviors? = nil)
    -> SwiftUIView<Self, Content>
  {
    SwiftUIView(storage: content) {
      let view = Self()
      view.setContent(content, animated: false)
      return view
    }
    .configure { context in
      // We need to update the content of the existing view when the content is updated.
      if context.oldStorage != content {
        context.view.setContent(content, animated: context.animated)
        context.container.invalidateIntrinsicContentSize()
      }

      context.view.setBehaviors(behaviors)
    }
  }
}

@available(iOS 13.0, tvOS 13.0, macOS 10.15, *)
extension StyledView
  where
  Self: ContentConfigurableView & BehaviorsConfigurableView,
  Content == Never
{
  /// Returns a SwiftUI `View` representing this `EpoxyableView`.
  ///
  /// To perform additional configuration of the `EpoxyableView` instance, call `configure` on the
  /// returned SwiftUI `View`:
  /// ```
  /// MyView.swiftUIView(…)
  ///   .configure { context in
  ///     context.view.doSomething()
  ///   }
  /// ```
  ///
  /// To configure the sizing behavior of the `EpoxyableView` instance, call `sizing` on the
  /// returned SwiftUI `View`:
  /// ```
  /// MyView.swiftUIView(…).sizing(.intrinsicSize)
  /// ```
  /// The sizing defaults to `.automatic`.
  static func swiftUIView(
    style: Style,
    behaviors: Behaviors? = nil)
    -> SwiftUIView<Self, Style>
  {
    SwiftUIView(storage: style) {
      Self(style: style)
    }
    .configure { context in
      // We need to create a new view instance when the style changes.
      if context.oldStorage != style {
        context.view = Self(style: style)
      }

      context.view.setBehaviors(behaviors)
    }
  }
}

@available(iOS 13.0, tvOS 13.0, macOS 10.15, *)
extension StyledView
  where
  Self: ContentConfigurableView & BehaviorsConfigurableView,
  Content == Never,
  Style == Never
{
  /// Returns a SwiftUI `View` representing this `EpoxyableView`.
  ///
  /// To perform additional configuration of the `EpoxyableView` instance, call `configure` on the
  /// returned SwiftUI `View`:
  /// ```
  /// MyView.swiftUIView(…)
  ///   .configure { context in
  ///     context.view.doSomething()
  ///   }
  /// ```
  ///
  /// To configure the sizing behavior of the `EpoxyableView` instance, call `sizing` on the
  /// returned SwiftUI `View`:
  /// ```
  /// MyView.swiftUIView(…).sizing(.intrinsicSize)
  /// ```
  /// The sizing defaults to `.automatic`.
  static func swiftUIView(behaviors: Behaviors? = nil) -> SwiftUIView<Self, Void> {
    SwiftUIView {
      Self()
    }
    .configure { context in
      context.view.setBehaviors(behaviors)
    }
  }
}
#endif
