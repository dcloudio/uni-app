//
//  Archive.swift
//  ZIPFoundation
//
//  Copyright © 2017-2021 Thomas Zoechling, https://www.peakstep.com and the ZIP Foundation project authors.
//  Released under the MIT License.
//
//  See https://github.com/weichsel/ZIPFoundation/blob/master/LICENSE for license information.
//

import Foundation

/// The default chunk size when reading entry data from an archive.
let defaultReadChunkSize = Int(16 * 1024)
/// The default chunk size when writing entry data to an archive.
let defaultWriteChunkSize = defaultReadChunkSize
/// The default permissions for newly added entries.
let defaultFilePermissions = UInt16(0o644)
/// The default permissions for newly added directories.
let defaultDirectoryPermissions = UInt16(0o755)
let defaultPOSIXBufferSize = defaultReadChunkSize
let defaultDirectoryUnitCount = Int64(1)
let minEndOfCentralDirectoryOffset = Int64(22)
let endOfCentralDirectoryStructSignature = 0x06054b50
let localFileHeaderStructSignature = 0x04034b50
let dataDescriptorStructSignature = 0x08074b50
let centralDirectoryStructSignature = 0x02014b50
let memoryURLScheme = "memory"

// MARK: - Archive

/// A sequence of uncompressed or compressed ZIP entries.
///
/// You use an `Archive` to create, read or update ZIP files.
/// To read an existing ZIP file, you have to pass in an existing file `URL` and `AccessMode.read`:
///
///     var archiveURL = URL(fileURLWithPath: "/path/file.zip")
///     var archive = Archive(url: archiveURL, accessMode: .read)
///
/// An `Archive` is a sequence of entries. You can
/// iterate over an archive using a `for`-`in` loop to get access to individual `Entry` objects:
///
///     for entry in archive {
///         print(entry.path)
///     }
///
/// Each `Entry` in an `Archive` is represented by its `path`. You can
/// use `path` to retrieve the corresponding `Entry` from an `Archive` via subscripting:
///
///     let entry = archive['/path/file.txt']
///
/// To create a new `Archive`, pass in a non-existing file URL and `AccessMode.create`. To modify an
/// existing `Archive` use `AccessMode.update`:
///
///     var archiveURL = URL(fileURLWithPath: "/path/file.zip")
///     var archive = Archive(url: archiveURL, accessMode: .update)
///     try archive?.addEntry("test.txt", relativeTo: baseURL, compressionMethod: .deflate)
final class Archive: Sequence {

  // MARK: Lifecycle

  /// Initializes a new ZIP `Archive`.
  ///
  /// You can use this initalizer to create new archive files or to read and update existing ones.
  /// The `mode` parameter indicates the intended usage of the archive: `.read`, `.create` or `.update`.
  /// - Parameters:
  ///   - url: File URL to the receivers backing file.
  ///   - mode: Access mode of the receiver.
  ///   - preferredEncoding: Encoding for entry paths. Overrides the encoding specified in the archive.
  ///                        This encoding is only used when _decoding_ paths from the receiver.
  ///                        Paths of entries added with `addEntry` are always UTF-8 encoded.
  /// - Returns: An archive initialized with a backing file at the passed in file URL and the given access mode
  ///   or `nil` if the following criteria are not met:
  /// - Note:
  ///   - The file URL _must_ point to an existing file for `AccessMode.read`.
  ///   - The file URL _must_ point to a non-existing file for `AccessMode.create`.
  ///   - The file URL _must_ point to an existing file for `AccessMode.update`.
  init?(url: URL, accessMode mode: AccessMode, preferredEncoding: String.Encoding? = nil) {
    self.url = url
    accessMode = mode
    self.preferredEncoding = preferredEncoding
    guard let config = Archive.makeBackingConfiguration(for: url, mode: mode) else {
      return nil
    }
    archiveFile = config.file
    endOfCentralDirectoryRecord = config.endOfCentralDirectoryRecord
    zip64EndOfCentralDirectory = config.zip64EndOfCentralDirectory
    setvbuf(archiveFile, nil, _IOFBF, Int(defaultPOSIXBufferSize))
  }

  deinit {
    fclose(self.archiveFile)
  }

  // MARK: Internal

  typealias LocalFileHeader = Entry.LocalFileHeader
  typealias DataDescriptor = Entry.DefaultDataDescriptor
  typealias ZIP64DataDescriptor = Entry.ZIP64DataDescriptor
  typealias CentralDirectoryStructure = Entry.CentralDirectoryStructure

  /// An error that occurs during reading, creating or updating a ZIP file.
  enum ArchiveError: Error {
    /// Thrown when an archive file is either damaged or inaccessible.
    case unreadableArchive
    /// Thrown when an archive is either opened with AccessMode.read or the destination file is unwritable.
    case unwritableArchive
    /// Thrown when the path of an `Entry` cannot be stored in an archive.
    case invalidEntryPath
    /// Thrown when an `Entry` can't be stored in the archive with the proposed compression method.
    case invalidCompressionMethod
    /// Thrown when the stored checksum of an `Entry` doesn't match the checksum during reading.
    case invalidCRC32
    /// Thrown when an extract, add or remove operation was canceled.
    case cancelledOperation
    /// Thrown when an extract operation was called with zero or negative `bufferSize` parameter.
    case invalidBufferSize
    /// Thrown when uncompressedSize/compressedSize exceeds `Int64.max` (Imposed by file API).
    case invalidEntrySize
    /// Thrown when the offset of local header data exceeds `Int64.max` (Imposed by file API).
    case invalidLocalHeaderDataOffset
    /// Thrown when the size of local header exceeds `Int64.max` (Imposed by file API).
    case invalidLocalHeaderSize
    /// Thrown when the offset of central directory exceeds `Int64.max` (Imposed by file API).
    case invalidCentralDirectoryOffset
    /// Thrown when the size of central directory exceeds `UInt64.max` (Imposed by ZIP specification).
    case invalidCentralDirectorySize
    /// Thrown when number of entries in central directory exceeds `UInt64.max` (Imposed by ZIP specification).
    case invalidCentralDirectoryEntryCount
    /// Thrown when an archive does not contain the required End of Central Directory Record.
    case missingEndOfCentralDirectoryRecord
  }

  /// The access mode for an `Archive`.
  enum AccessMode: UInt {
    /// Indicates that a newly instantiated `Archive` should create its backing file.
    case create
    /// Indicates that a newly instantiated `Archive` should read from an existing backing file.
    case read
    /// Indicates that a newly instantiated `Archive` should update an existing backing file.
    case update
  }

  /// The version of an `Archive`
  enum Version: UInt16 {
    /// The minimum version for deflate compressed archives
    case v20 = 20
    /// The minimum version for archives making use of ZIP64 extensions
    case v45 = 45
  }

  struct EndOfCentralDirectoryRecord: DataSerializable {
    let endOfCentralDirectorySignature = UInt32(endOfCentralDirectoryStructSignature)
    let numberOfDisk: UInt16
    let numberOfDiskStart: UInt16
    let totalNumberOfEntriesOnDisk: UInt16
    let totalNumberOfEntriesInCentralDirectory: UInt16
    let sizeOfCentralDirectory: UInt32
    let offsetToStartOfCentralDirectory: UInt32
    let zipFileCommentLength: UInt16
    let zipFileCommentData: Data
    static let size = 22
  }

  /// URL of an Archive's backing file.
  let url: URL
  /// Access mode for an archive file.
  let accessMode: AccessMode
  var archiveFile: FILEPointer
  var endOfCentralDirectoryRecord: EndOfCentralDirectoryRecord
  var zip64EndOfCentralDirectory: ZIP64EndOfCentralDirectory?
  var preferredEncoding: String.Encoding?

  var totalNumberOfEntriesInCentralDirectory: UInt64 {
    zip64EndOfCentralDirectory?.record.totalNumberOfEntriesInCentralDirectory
      ?? UInt64(endOfCentralDirectoryRecord.totalNumberOfEntriesInCentralDirectory)
  }

  var sizeOfCentralDirectory: UInt64 {
    zip64EndOfCentralDirectory?.record.sizeOfCentralDirectory
      ?? UInt64(endOfCentralDirectoryRecord.sizeOfCentralDirectory)
  }

  var offsetToStartOfCentralDirectory: UInt64 {
    zip64EndOfCentralDirectory?.record.offsetToStartOfCentralDirectory
      ?? UInt64(endOfCentralDirectoryRecord.offsetToStartOfCentralDirectory)
  }

  #if swift(>=5.0)
  var memoryFile: MemoryFile?

  /// Initializes a new in-memory ZIP `Archive`.
  ///
  /// You can use this initalizer to create new in-memory archive files or to read and update existing ones.
  ///
  /// - Parameters:
  ///   - data: `Data` object used as backing for in-memory archives.
  ///   - mode: Access mode of the receiver.
  ///   - preferredEncoding: Encoding for entry paths. Overrides the encoding specified in the archive.
  ///                        This encoding is only used when _decoding_ paths from the receiver.
  ///                        Paths of entries added with `addEntry` are always UTF-8 encoded.
  /// - Returns: An in-memory archive initialized with passed in backing data.
  /// - Note:
  ///   - The backing `data` _must_ contain a valid ZIP archive for `AccessMode.read` and `AccessMode.update`.
  ///   - The backing `data` _must_ be empty (or omitted) for `AccessMode.create`.
  init?(data: Data = Data(), accessMode mode: AccessMode, preferredEncoding: String.Encoding? = nil) {
    guard
      let url = URL(string: "\(memoryURLScheme)://"),
      let config = Archive.makeBackingConfiguration(for: data, mode: mode)
    else {
      return nil
    }

    self.url = url
    accessMode = mode
    self.preferredEncoding = preferredEncoding
    archiveFile = config.file
    memoryFile = config.memoryFile
    endOfCentralDirectoryRecord = config.endOfCentralDirectoryRecord
    zip64EndOfCentralDirectory = config.zip64EndOfCentralDirectory
  }
  #endif

  // MARK: - Helpers

  static func scanForEndOfCentralDirectoryRecord(in file: FILEPointer)
    -> EndOfCentralDirectoryStructure?
  {
    var eocdOffset: UInt64 = 0
    var index = minEndOfCentralDirectoryOffset
    fseeko(file, 0, SEEK_END)
    let archiveLength = Int64(ftello(file))
    while eocdOffset == 0, index <= archiveLength {
      fseeko(file, off_t(archiveLength - index), SEEK_SET)
      var potentialDirectoryEndTag = UInt32()
      fread(&potentialDirectoryEndTag, 1, MemoryLayout<UInt32>.size, file)
      if potentialDirectoryEndTag == UInt32(endOfCentralDirectoryStructSignature) {
        eocdOffset = UInt64(archiveLength - index)
        guard let eocd: EndOfCentralDirectoryRecord = Data.readStruct(from: file, at: eocdOffset) else {
          return nil
        }
        let zip64EOCD = scanForZIP64EndOfCentralDirectory(in: file, eocdOffset: eocdOffset)
        return (eocd, zip64EOCD)
      }
      index += 1
    }
    return nil
  }

  func makeIterator() -> AnyIterator<Entry> {
    let totalNumberOfEntriesInCD = totalNumberOfEntriesInCentralDirectory
    var directoryIndex = offsetToStartOfCentralDirectory
    var index = 0
    return AnyIterator {
      guard index < totalNumberOfEntriesInCD else { return nil }
      guard
        let centralDirStruct: CentralDirectoryStructure = Data.readStruct(
          from: self.archiveFile,
          at: directoryIndex)
      else {
        return nil
      }
      let offset = UInt64(centralDirStruct.effectiveRelativeOffsetOfLocalHeader)
      guard
        let localFileHeader: LocalFileHeader = Data.readStruct(
          from: self.archiveFile,
          at: offset)
      else { return nil }
      var dataDescriptor: DataDescriptor?
      var zip64DataDescriptor: ZIP64DataDescriptor?
      if centralDirStruct.usesDataDescriptor {
        let additionalSize = UInt64(localFileHeader.fileNameLength) + UInt64(localFileHeader.extraFieldLength)
        let isCompressed = centralDirStruct.compressionMethod != CompressionMethod.none.rawValue
        let dataSize = isCompressed
          ? centralDirStruct.effectiveCompressedSize
          : centralDirStruct.effectiveUncompressedSize
        let descriptorPosition = offset + UInt64(LocalFileHeader.size) + additionalSize + dataSize
        if centralDirStruct.isZIP64 {
          zip64DataDescriptor = Data.readStruct(from: self.archiveFile, at: descriptorPosition)
        } else {
          dataDescriptor = Data.readStruct(from: self.archiveFile, at: descriptorPosition)
        }
      }
      defer {
        directoryIndex += UInt64(CentralDirectoryStructure.size)
        directoryIndex += UInt64(centralDirStruct.fileNameLength)
        directoryIndex += UInt64(centralDirStruct.extraFieldLength)
        directoryIndex += UInt64(centralDirStruct.fileCommentLength)
        index += 1
      }
      return Entry(
        centralDirectoryStructure: centralDirStruct,
        localFileHeader: localFileHeader,
        dataDescriptor: dataDescriptor,
        zip64DataDescriptor: zip64DataDescriptor)
    }
  }

  /// Retrieve the ZIP `Entry` with the given `path` from the receiver.
  ///
  /// - Note: The ZIP file format specification does not enforce unique paths for entries.
  ///   Therefore an archive can contain multiple entries with the same path. This method
  ///   always returns the first `Entry` with the given `path`.
  ///
  /// - Parameter path: A relative file path identifying the corresponding `Entry`.
  /// - Returns: An `Entry` with the given `path`. Otherwise, `nil`.
  subscript(path: String) -> Entry? {
    if let encoding = preferredEncoding {
      return first { $0.path(using: encoding) == path }
    }
    return first { $0.path == path }
  }

  // MARK: Private

  private static func scanForZIP64EndOfCentralDirectory(in file: FILEPointer, eocdOffset: UInt64)
    -> ZIP64EndOfCentralDirectory?
  {
    guard UInt64(ZIP64EndOfCentralDirectoryLocator.size) < eocdOffset else {
      return nil
    }
    let locatorOffset = eocdOffset - UInt64(ZIP64EndOfCentralDirectoryLocator.size)

    guard UInt64(ZIP64EndOfCentralDirectoryRecord.size) < locatorOffset else {
      return nil
    }
    let recordOffset = locatorOffset - UInt64(ZIP64EndOfCentralDirectoryRecord.size)
    guard
      let locator: ZIP64EndOfCentralDirectoryLocator = Data.readStruct(from: file, at: locatorOffset),
      let record: ZIP64EndOfCentralDirectoryRecord = Data.readStruct(from: file, at: recordOffset)
    else {
      return nil
    }
    return ZIP64EndOfCentralDirectory(record: record, locator: locator)
  }
}

extension Archive.EndOfCentralDirectoryRecord {

  // MARK: Lifecycle

  init?(data: Data, additionalDataProvider provider: (Int) throws -> Data) {
    guard data.count == Archive.EndOfCentralDirectoryRecord.size else { return nil }
    guard data.scanValue(start: 0) == endOfCentralDirectorySignature else { return nil }
    numberOfDisk = data.scanValue(start: 4)
    numberOfDiskStart = data.scanValue(start: 6)
    totalNumberOfEntriesOnDisk = data.scanValue(start: 8)
    totalNumberOfEntriesInCentralDirectory = data.scanValue(start: 10)
    sizeOfCentralDirectory = data.scanValue(start: 12)
    offsetToStartOfCentralDirectory = data.scanValue(start: 16)
    zipFileCommentLength = data.scanValue(start: 20)
    guard let commentData = try? provider(Int(zipFileCommentLength)) else { return nil }
    guard commentData.count == Int(zipFileCommentLength) else { return nil }
    zipFileCommentData = commentData
  }

  init(
    record: Archive.EndOfCentralDirectoryRecord,
    numberOfEntriesOnDisk: UInt16,
    numberOfEntriesInCentralDirectory: UInt16,
    updatedSizeOfCentralDirectory: UInt32,
    startOfCentralDirectory: UInt32)
  {
    numberOfDisk = record.numberOfDisk
    numberOfDiskStart = record.numberOfDiskStart
    totalNumberOfEntriesOnDisk = numberOfEntriesOnDisk
    totalNumberOfEntriesInCentralDirectory = numberOfEntriesInCentralDirectory
    sizeOfCentralDirectory = updatedSizeOfCentralDirectory
    offsetToStartOfCentralDirectory = startOfCentralDirectory
    zipFileCommentLength = record.zipFileCommentLength
    zipFileCommentData = record.zipFileCommentData
  }

  // MARK: Internal

  var data: Data {
    var endOfCDSignature = endOfCentralDirectorySignature
    var numberOfDisk = numberOfDisk
    var numberOfDiskStart = numberOfDiskStart
    var totalNumberOfEntriesOnDisk = totalNumberOfEntriesOnDisk
    var totalNumberOfEntriesInCD = totalNumberOfEntriesInCentralDirectory
    var sizeOfCentralDirectory = sizeOfCentralDirectory
    var offsetToStartOfCD = offsetToStartOfCentralDirectory
    var zipFileCommentLength = zipFileCommentLength
    var data = Data()
    withUnsafePointer(to: &endOfCDSignature) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &numberOfDisk) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &numberOfDiskStart) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &totalNumberOfEntriesOnDisk) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &totalNumberOfEntriesInCD) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &sizeOfCentralDirectory) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &offsetToStartOfCD) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &zipFileCommentLength) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    data.append(zipFileCommentData)
    return data
  }

}
