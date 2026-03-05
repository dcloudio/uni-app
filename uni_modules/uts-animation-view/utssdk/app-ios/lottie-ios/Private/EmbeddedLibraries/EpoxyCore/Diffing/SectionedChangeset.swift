//  Created by Laura Skelton on 5/11/17.
//  Copyright © 2017 Airbnb. All rights reserved.

/// A set of the minimum changes to get from one array of `DiffableSection`s to another, used for
/// diffing.
struct SectionedChangeset {

  // MARK: Lifecycle

  init(
    sectionChangeset: IndexSetChangeset,
    itemChangeset: IndexPathChangeset)
  {
    self.sectionChangeset = sectionChangeset
    self.itemChangeset = itemChangeset
  }

  // MARK: Internal

  /// A set of the minimum changes to get from one set of sections to another.
  var sectionChangeset: IndexSetChangeset

  /// A set of the minimum changes to get from one set of items to another, aggregated across all
  /// sections.
  var itemChangeset: IndexPathChangeset

  /// Whether there are any inserts, deletes, moves, or updates in this changeset.
  var isEmpty: Bool {
    sectionChangeset.isEmpty && itemChangeset.isEmpty
  }

}
