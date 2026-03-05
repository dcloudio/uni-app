// Created by eric_horacek on 12/15/20.
// Copyright © 2020 Airbnb Inc. All rights reserved.

/// An Epoxy model with an associated context type that's passed into callback closures.
protocol CallbackContextEpoxyModeled: EpoxyModeled {
  /// A context type that's passed into callback closures.
  associatedtype CallbackContext
}
