//
//  Archive+Progress.swift
//  ZIPFoundation
//
//  Copyright © 2017-2021 Thomas Zoechling, https://www.peakstep.com and the ZIP Foundation project authors.
//  Released under the MIT License.
//
//  See https://github.com/weichsel/ZIPFoundation/blob/master/LICENSE for license information.
//

import Foundation

extension Archive {
  /// The number of the work units that have to be performed when
  /// removing `entry` from the receiver.
  ///
  /// - Parameter entry: The entry that will be removed.
  /// - Returns: The number of the work units.
  func totalUnitCountForRemoving(_ entry: Entry) -> Int64 {
    Int64(offsetToStartOfCentralDirectory - entry.localSize)
  }

  func makeProgressForRemoving(_ entry: Entry) -> Progress {
    Progress(totalUnitCount: totalUnitCountForRemoving(entry))
  }

  /// The number of the work units that have to be performed when
  /// reading `entry` from the receiver.
  ///
  /// - Parameter entry: The entry that will be read.
  /// - Returns: The number of the work units.
  func totalUnitCountForReading(_ entry: Entry) -> Int64 {
    switch entry.type {
    case .file, .symlink:
      return Int64(entry.uncompressedSize)
    case .directory:
      return defaultDirectoryUnitCount
    }
  }

  func makeProgressForReading(_ entry: Entry) -> Progress {
    Progress(totalUnitCount: totalUnitCountForReading(entry))
  }

  /// The number of the work units that have to be performed when
  /// adding the file at `url` to the receiver.
  /// - Parameter entry: The entry that will be removed.
  /// - Returns: The number of the work units.
  func totalUnitCountForAddingItem(at url: URL) -> Int64 {
    var count = Int64(0)
    do {
      let type = try FileManager.typeForItem(at: url)
      switch type {
      case .file, .symlink:
        count = Int64(try FileManager.fileSizeForItem(at: url))
      case .directory:
        count = defaultDirectoryUnitCount
      }
    } catch { count = -1 }
    return count
  }

  func makeProgressForAddingItem(at url: URL) -> Progress {
    Progress(totalUnitCount: totalUnitCountForAddingItem(at: url))
  }
}
