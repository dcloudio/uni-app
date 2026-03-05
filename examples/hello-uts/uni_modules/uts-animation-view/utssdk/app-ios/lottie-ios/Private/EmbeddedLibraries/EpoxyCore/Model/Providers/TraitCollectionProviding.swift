// Created by eric_horacek on 12/16/20.
// Copyright © 2020 Airbnb Inc. All rights reserved.

#if !os(macOS)
import UIKit

/// The capability of providing a `UITraitCollection` instance.
///
/// Typically conformed to by the `CallbackContext` of a `CallbackContextEpoxyModeled`.
protocol TraitCollectionProviding {
  /// The `UITraitCollection` instance provided by this type.
  var traitCollection: UITraitCollection { get }
}
#endif
