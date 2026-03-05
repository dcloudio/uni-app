//  Created by Laura Skelton on 11/25/16.
//  Copyright © 2016 Airbnb. All rights reserved.

import Foundation

// MARK: - IndexChangeset

/// A set of inserts, deletes, updates, and moves that define the changes between two collections.
struct IndexChangeset {

  // MARK: Lifecycle

  init(
    inserts: [Int] = [],
    deletes: [Int] = [],
    updates: [(old: Int, new: Int)] = [],
    moves: [(old: Int, new: Int)] = [],
    newIndices: [Int?] = [],
    duplicates: [[Int]] = [])
  {
    self.inserts = inserts
    self.deletes = deletes
    self.updates = updates
    self.moves = moves
    self.newIndices = newIndices
    self.duplicates = duplicates
  }

  // MARK: Internal

  /// The inserted indices needed to get from the old collection to the new collection.
  var inserts: [Int]

  /// The deleted indices needed to get from the old collection to the new collection.
  var deletes: [Int]

  /// The updated indices needed to get from the old collection to the new collection.
  var updates: [(old: Int, new: Int)]

  /// The moved indices needed to get from the old collection to the new collection.
  var moves: [(old: Int, new: Int)]

  /// A record for each old collection item to its index (if any) is in the new collection.
  ///
  /// The indexes of this `Array` represent the indexes old collection, with elements of the
  /// corresponding index of the same item in the new collection it exists, else `nil`.
  var newIndices: [Int?]

  /// A record of each element in the new collection that has an identical `diffIdentifier` with
  /// another element in the same collection.
  ///
  /// Each element in the outer `Array` corresponds to a duplicated identifier, with each inner
  /// `[Int]` containing the indexes that share a duplicate identifier in the new collection.
  ///
  /// While the diffing algorithm makes a best effort to handle duplicates, they can lead to
  /// unexpected behavior since identity of elements cannot be established and should be avoided if
  /// possible.
  var duplicates: [[Int]]

  /// Whether there are any inserts, deletes, moves, or updates in this changeset.
  var isEmpty: Bool {
    inserts.isEmpty && deletes.isEmpty && updates.isEmpty && moves.isEmpty
  }
}

// MARK: - IndexPathChangeset

/// A set of inserts, deletes, updates, and moves that define the changes between two collections
/// with indexes stored as `IndexPath`s.
struct IndexPathChangeset {

  // MARK: Lifecycle

  init(
    inserts: [IndexPath] = [],
    deletes: [IndexPath] = [],
    updates: [(old: IndexPath, new: IndexPath)] = [],
    moves: [(old: IndexPath, new: IndexPath)] = [],
    duplicates: [[IndexPath]] = [])
  {
    self.inserts = inserts
    self.deletes = deletes
    self.updates = updates
    self.moves = moves
    self.duplicates = duplicates
  }

  // MARK: Internal

  /// The inserted `IndexPath`s needed to get from the old collection to the new collection.
  var inserts: [IndexPath]

  /// The deleted `IndexPath`s needed to get from the old collection to the new collection.
  var deletes: [IndexPath]

  /// The updated `IndexPath`s needed to get from the old collection to the new collection.
  var updates: [(old: IndexPath, new: IndexPath)]

  /// The moved `IndexPath`s needed to get from the old collection to the new collection.
  var moves: [(old: IndexPath, new: IndexPath)]

  /// A record for each element in the new collection that has an identical `diffIdentifier` with
  /// another element in the same collection.
  ///
  /// Each element in the outer `Array` corresponds to a duplicated identifier, with each inner
  /// `[IndexPath]` corresponding to the indexes that share a duplicate identifier in the new
  /// collection.
  ///
  /// While the diffing algorithm makes a best effort to handle duplicates, they can lead to
  /// unexpected behavior since identity of elements cannot be established and should be avoided if
  /// possible.
  var duplicates: [[IndexPath]]

  /// Whether there are any inserts, deletes, moves, or updates in this changeset.
  var isEmpty: Bool {
    inserts.isEmpty && deletes.isEmpty && updates.isEmpty && moves.isEmpty
  }

  static func += (left: inout IndexPathChangeset, right: IndexPathChangeset) {
    left.inserts += right.inserts
    left.deletes += right.deletes
    left.updates += right.updates
    left.moves += right.moves
    left.duplicates += right.duplicates
  }
}

// MARK: - IndexSetChangeset

/// A set of inserts, deletes, updates, and moves that define the changes between two collections
/// with indexes stored as `IndexSet`.
struct IndexSetChangeset {

  // MARK: Lifecycle

  init(
    inserts: IndexSet = [],
    deletes: IndexSet = [],
    updates: [(old: Int, new: Int)] = [],
    moves: [(old: Int, new: Int)] = [],
    newIndices: [Int?] = [],
    duplicates: [IndexSet] = [])
  {
    self.inserts = inserts
    self.deletes = deletes
    self.updates = updates
    self.moves = moves
    self.newIndices = newIndices
    self.duplicates = duplicates
  }

  // MARK: Internal

  /// An `IndexSet` of inserts needed to get from the old collection to the new collection.
  var inserts: IndexSet

  /// An `IndexSet` of deletes needed to get from the old collection to the new collection.
  var deletes: IndexSet

  /// The updated indices needed to get from the old collection to the new collection.
  var updates: [(old: Int, new: Int)]

  /// The moved indices needed to get from the old collection to the new collection.
  var moves: [(old: Int, new: Int)]

  /// A record for each old collection item of what its index (if any) is in the new collection.
  ///
  /// The indexes of this `Array` represent the indexes old collection, with elements of the
  /// corresponding index of the same item in the new collection it exists, else `nil`.
  var newIndices: [Int?]

  /// A record for each element in the new collection that has an identical `diffIdentifier` with
  /// another element in the same collection.
  ///
  /// Each element in the `Array` corresponds to a duplicated identifier, with each `IndexSet`
  /// containing the indexes that share a duplicate identifier in the new collection.
  ///
  /// While the diffing algorithm makes a best effort to handle duplicates, they can lead to
  /// unexpected behavior since identity of elements cannot be established and should be avoided if
  /// possible.
  var duplicates: [IndexSet]

  /// Whether there are any inserts, deletes, moves, or updates in this changeset.
  var isEmpty: Bool {
    inserts.isEmpty && deletes.isEmpty && updates.isEmpty && moves.isEmpty
  }
}
