//  Created by Laura Skelton on 11/25/16.
//  Copyright © 2016 Airbnb. All rights reserved.

// MARK: - Collection

extension Collection where Element: Diffable, Index == Int {

  /// Diffs two collections (e.g. `Array`s) of `Diffable` items, returning an `IndexChangeset`
  /// representing the minimal set of changes to get from the other collection to this collection.
  ///
  /// - Parameters:
  ///     - from other: The collection of old data.
  func makeChangeset(from other: Self) -> IndexChangeset {
    // Arranging the elements contiguously prior to diffing improves performance by ~40%.
    let new = ContiguousArray(self)
    let old = ContiguousArray(other)

    /// The entries in both this and the other collection, keyed by their `dataID`s.
    var entries = [AnyHashable: EpoxyEntry](minimumCapacity: new.count)
    var duplicates = [EpoxyEntry]()

    var newResults = ContiguousArray<NewRecord>()
    newResults.reserveCapacity(new.count)

    for index in new.indices {
      let id = new[index].diffIdentifier
      let entry = entries[id, default: EpoxyEntry()]
      if entry.trackNewIndex(index) {
        duplicates.append(entry)
      }
      entries[id] = entry
      newResults.append(NewRecord(entry: entry))
    }

    var oldResults = ContiguousArray<OldRecord>()
    oldResults.reserveCapacity(old.count)

    for index in old.indices {
      let id = old[index].diffIdentifier
      let entry = entries[id]
      entry?.pushOldIndex(index)
      oldResults.append(OldRecord(entry: entry))
    }

    for newIndex in new.indices {
      let entry = newResults[newIndex].entry
      if let oldIndex = entry.popOldIndex() {
        let newItem = new[newIndex]
        let oldItem = other[oldIndex]

        if !oldItem.isDiffableItemEqual(to: newItem) {
          entry.isUpdated = true
        }

        newResults[newIndex].correspondingOldIndex = oldIndex
        oldResults[oldIndex].correspondingNewIndex = newIndex
      }
    }

    var deletes = [Int]()
    var deleteOffsets = [Int]()
    deleteOffsets.reserveCapacity(old.count)
    var runningDeleteOffset = 0

    for index in old.indices {
      deleteOffsets.append(runningDeleteOffset)

      let record = oldResults[index]

      if record.correspondingNewIndex == nil {
        deletes.append(index)
        runningDeleteOffset += 1
      }
    }

    var inserts = [Int]()
    var updates = [(Int, Int)]()
    var moves = [(Int, Int)]()
    var insertOffsets = [Int]()
    insertOffsets.reserveCapacity(new.count)
    var runningInsertOffset = 0

    for index in new.indices {
      insertOffsets.append(runningInsertOffset)

      let record = newResults[index]

      if let oldArrayIndex = record.correspondingOldIndex {
        if record.entry.isUpdated {
          updates.append((oldArrayIndex, index))
        }

        let insertOffset = insertOffsets[index]
        let deleteOffset = deleteOffsets[oldArrayIndex]
        if (oldArrayIndex - deleteOffset + insertOffset) != index {
          moves.append((oldArrayIndex, index))
        }

      } else {
        inserts.append(index)
        runningInsertOffset += 1
      }
    }

    EpoxyLogger.shared.assert(
      old.count + inserts.count - deletes.count == new.count,
      "Failed sanity check for old count with changes matching new count.")

    return IndexChangeset(
      inserts: inserts,
      deletes: deletes,
      updates: updates,
      moves: moves,
      newIndices: oldResults.map { $0.correspondingNewIndex },
      duplicates: duplicates.map { $0.newIndices })
  }

  /// Diffs between two collections (eg. `Array`s) of `Diffable` items, and returns an `IndexPathChangeset`
  /// representing the minimal set of changes to get from the other collection to this collection.
  ///
  /// - Parameters:
  ///     - from other: The collection of old data.
  ///     - fromSection: The section the other collection's data exists within. Defaults to `0`.
  ///     - toSection: The section this collection's data exists within. Defaults to `0`.
  func makeIndexPathChangeset(
    from other: Self,
    fromSection: Int = 0,
    toSection: Int = 0)
    -> IndexPathChangeset
  {
    let indexChangeset = makeChangeset(from: other)

    return IndexPathChangeset(
      inserts: indexChangeset.inserts.map { index in
        [toSection, index]
      },
      deletes: indexChangeset.deletes.map { index in
        [fromSection, index]
      },
      updates: indexChangeset.updates.map { fromIndex, toIndex in
        ([fromSection, fromIndex], [toSection, toIndex])
      },
      moves: indexChangeset.moves.map { fromIndex, toIndex in
        ([fromSection, fromIndex], [toSection, toIndex])
      },
      duplicates: indexChangeset.duplicates.map { duplicate in
        duplicate.map { index in
          [toSection, index]
        }
      })
  }

  /// Diffs between two collections (e.g. `Array`s) of `Diffable` items, returning an
  /// `IndexSetChangeset` representing the minimal set of changes to get from the other collection
  /// to this collection.
  ///
  /// - Parameters:
  ///     - from other: The collection of old data.
  func makeIndexSetChangeset(from other: Self) -> IndexSetChangeset {
    let indexChangeset = makeChangeset(from: other)

    return IndexSetChangeset(
      inserts: .init(indexChangeset.inserts),
      deletes: .init(indexChangeset.deletes),
      updates: indexChangeset.updates,
      moves: indexChangeset.moves,
      newIndices: indexChangeset.newIndices,
      duplicates: indexChangeset.duplicates.map { .init($0) })
  }

}

extension Collection where Element: DiffableSection, Index == Int {
  /// Diffs between two collections (e.g. `Array`s) of `DiffableSection` items, returning an
  /// `SectionedChangeset` representing the minimal set of changes to get from the other collection
  /// to this collection.
  ///
  /// - Parameters:
  ///     - from other: The collection of old data.
  func makeSectionedChangeset(from other: Self) -> SectionedChangeset {
    let sectionChangeset = makeIndexSetChangeset(from: other)
    var itemChangeset = IndexPathChangeset()

    for fromSectionIndex in other.indices {
      guard let toSectionIndex = sectionChangeset.newIndices[fromSectionIndex] else {
        continue
      }

      let fromItems = other[fromSectionIndex].diffableItems
      let toItems = self[toSectionIndex].diffableItems

      let itemIndexChangeset = toItems.makeIndexPathChangeset(
        from: fromItems,
        fromSection: fromSectionIndex,
        toSection: toSectionIndex)

      itemChangeset += itemIndexChangeset
    }

    return SectionedChangeset(sectionChangeset: sectionChangeset, itemChangeset: itemChangeset)
  }
}

// MARK: - EpoxyEntry

/// A bookkeeping refrence type for the diffing algorithm.
private final class EpoxyEntry {

  // MARK: Internal

  private(set) var oldIndices = [Int]()
  private(set) var newIndices = [Int]()
  var isUpdated = false

  /// Tracks an index from the new indices, returning `true` if this entry has previously tracked
  /// a new index as a means to identify duplicates and `false` otherwise.
  func trackNewIndex(_ index: Int) -> Bool {
    let previouslyEmpty = newIndices.isEmpty

    newIndices.append(index)

    // We've encountered a duplicate, return true so we can track it.
    if !previouslyEmpty, newIndices.count == 2 {
      return true
    }

    return false
  }

  func pushOldIndex(_ index: Int) {
    oldIndices.append(index)
  }

  func popOldIndex() -> Int? {
    guard currentOldIndex < oldIndices.endIndex else {
      return nil
    }
    defer {
      currentOldIndex += 1
    }
    return oldIndices[currentOldIndex]
  }

  // MARK: Private

  private var currentOldIndex = 0
}

// MARK: - OldRecord

/// A bookkeeping type for pairing up an old element with its new index.
private struct OldRecord {
  var entry: EpoxyEntry?
  var correspondingNewIndex: Int? = nil
}

// MARK: - NewRecord

/// A bookkeeping type for pairing up a new element with its old index.
private struct NewRecord {
  var entry: EpoxyEntry
  var correspondingOldIndex: Int? = nil
}
