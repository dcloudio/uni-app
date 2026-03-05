//  Created by Laura Skelton on 5/11/17.
//  Copyright © 2017 Airbnb. All rights reserved.

// MARK: - Diffable

/// A protocol that allows us to check identity and equality between items for the purposes of
/// diffing.
protocol Diffable {

  /// Checks for equality between items when diffing.
  ///
  /// - Parameters:
  ///     - otherDiffableItem: The other item to check equality against while diffing.
  func isDiffableItemEqual(to otherDiffableItem: Diffable) -> Bool

  /// The identifier to use when checking identity while diffing.
  var diffIdentifier: AnyHashable { get }
}
