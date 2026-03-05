// Created by eric_horacek on 12/9/20.
// Copyright © 2020 Airbnb Inc. All rights reserved.

// MARK: - DiffableSection

/// A protocol that allows us to check identity and equality between sections of `Diffable` items
/// for the purposes of diffing.
protocol DiffableSection: Diffable {
  /// The diffable items in this section.
  associatedtype DiffableItems: Collection where
    DiffableItems.Index == Int,
    DiffableItems.Element: Diffable

  /// The diffable items in this section.
  var diffableItems: DiffableItems { get }
}
