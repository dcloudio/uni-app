// Created by eric_horacek on 12/1/20.
// Copyright © 2020 Airbnb Inc. All rights reserved.

// MARK: - MakeViewProviding

/// The capability of constructing a `UIView`.
protocol MakeViewProviding {
  /// The view constructed when the `MakeView` closure is called.
  associatedtype View: ViewType

  /// A closure that's called to construct an instance of `View`.
  typealias MakeView = () -> View

  /// A closure that's called to construct an instance of `View`.
  var makeView: MakeView { get }
}

// MARK: - ViewEpoxyModeled

extension ViewEpoxyModeled where Self: MakeViewProviding {

  // MARK: Internal

  /// A closure that's called to construct an instance of `View` represented by this model.
  var makeView: MakeView {
    get { self[makeViewProperty] }
    set { self[makeViewProperty] = newValue }
  }

  /// Replaces the default closure to construct the view with the given closure.
  func makeView(_ value: @escaping MakeView) -> Self {
    copy(updating: makeViewProperty, to: value)
  }

  // MARK: Private

  private var makeViewProperty: EpoxyModelProperty<MakeView> {
    // If you're getting a `EXC_BAD_INSTRUCTION` crash with this property in your stack trace, you
    // probably either:
    // - Conformed a view to `EpoxyableView` / `StyledView` with a custom initializer that
    // takes parameters, or:
    // - Used the `EpoxyModeled.init(dataID:)` initializer on a view has required initializer
    //   parameters.
    // If you have parameters to view initialization, they should either be passed to `init(style:)`
    // or you should provide a `makeView` closure when constructing your view's corresponding model,
    // e.g:
    // ```
    // MyView.itemModel(…)
    //   .makeView { MyView(customParameter: …) }
    //   .styleID(…)
    // ```
    // Note that with the above approach that you must supply an `styleID` with the same identity as
    // your view parameters to ensure that views with different parameters are not reused in place
    // of one another.
    .init(
      keyPath: \Self.makeView,
      defaultValue: View.init,
      updateStrategy: .replace)
  }
}
