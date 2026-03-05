// Created by eric_horacek on 12/4/20.
// Copyright © 2020 Airbnb Inc. All rights reserved.

/// An Epoxy model with an associated `UIView` type.
protocol ViewEpoxyModeled: EpoxyModeled {
  /// The view type associated with this model.
  ///
  /// An instance of this view is typically configured by this model.
  associatedtype View: ViewType
}
