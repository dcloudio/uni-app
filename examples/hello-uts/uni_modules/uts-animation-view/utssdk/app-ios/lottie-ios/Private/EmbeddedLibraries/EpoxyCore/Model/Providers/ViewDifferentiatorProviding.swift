// Created by Bryan Keller on 12/17/20.
// Copyright © 2020 Airbnb Inc. All rights reserved.

// MARK: - ViewDifferentiatorProviding

/// The capability of providing a view differentiator that facilitates generating collection view
/// cell reuse identifiers.
protocol ViewDifferentiatorProviding {
  /// The view differentiator for the item model.
  var viewDifferentiator: ViewDifferentiator { get }
}

// MARK: - ViewDifferentiator

/// Facilitates differentiating between two models' views, based on their view type, optional style
/// identifier, and optional element kind for supplementary view models. If two models have the same
/// view differentiator, then they're compatible with one another for element reuse. If two models
/// have different view differentiators, then they're incompatible with one another for element
/// reuse.
struct ViewDifferentiator: Hashable {

  // MARK: Lifecycle

  init(viewType: AnyClass, styleID: AnyHashable?) {
    viewTypeDescription = "\(type(of: viewType.self))"
    self.styleID = styleID
  }

  // MARK: Public

  var viewTypeDescription: String
  var styleID: AnyHashable?

}
