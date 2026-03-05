//
//  Archive+WritingDeprecated.swift
//  ZIPFoundation
//
//  Copyright © 2017-2021 Thomas Zoechling, https://www.peakstep.com and the ZIP Foundation project authors.
//  Released under the MIT License.
//
//  See https://github.com/weichsel/ZIPFoundation/blob/master/LICENSE for license information.
//

import Foundation

extension Archive {

  @available(
    *,
    deprecated,
    message: "Please use `Int` for `bufferSize`.")
  func addEntry(
    with path: String,
    relativeTo baseURL: URL,
    compressionMethod: CompressionMethod = .none,
    bufferSize: UInt32,
    progress: Progress? = nil)
    throws
  {
    try addEntry(
      with: path,
      relativeTo: baseURL,
      compressionMethod: compressionMethod,
      bufferSize: Int(bufferSize),
      progress: progress)
  }

  @available(
    *,
    deprecated,
    message: "Please use `Int` for `bufferSize`.")
  func addEntry(
    with path: String,
    fileURL: URL,
    compressionMethod: CompressionMethod = .none,
    bufferSize: UInt32,
    progress: Progress? = nil)
    throws
  {
    try addEntry(
      with: path,
      fileURL: fileURL,
      compressionMethod: compressionMethod,
      bufferSize: Int(bufferSize),
      progress: progress)
  }

  @available(
    *,
    deprecated,
    message: "Please use `Int64` for `uncompressedSize` and provider `position`. `Int` for `bufferSize`.")
  func addEntry(
    with path: String,
    type: Entry.EntryType,
    uncompressedSize: UInt32,
    modificationDate: Date = Date(),
    permissions: UInt16? = nil,
    compressionMethod: CompressionMethod = .none,
    bufferSize: Int = defaultWriteChunkSize,
    progress: Progress? = nil,
    provider: (_ position: Int, _ size: Int) throws -> Data)
    throws
  {
    let newProvider: Provider = { try provider(Int($0), $1) }
    try addEntry(
      with: path,
      type: type,
      uncompressedSize: Int64(uncompressedSize),
      modificationDate: modificationDate,
      permissions: permissions,
      compressionMethod: compressionMethod,
      bufferSize: bufferSize,
      progress: progress,
      provider: newProvider)
  }

  @available(
    *,
    deprecated,
    message: "Please use `Int` for `bufferSize`.")
  func remove(_ entry: Entry, bufferSize: UInt32, progress: Progress? = nil) throws {
    try remove(entry, bufferSize: Int(bufferSize), progress: progress)
  }
}
