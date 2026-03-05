//
//  FileManager+ZIP.swift
//  ZIPFoundation
//
//  Copyright © 2017-2021 Thomas Zoechling, https://www.peakstep.com and the ZIP Foundation project authors.
//  Released under the MIT License.
//
//  See https://github.com/weichsel/ZIPFoundation/blob/master/LICENSE for license information.
//

import Foundation

extension FileManager {
  typealias CentralDirectoryStructure = Entry.CentralDirectoryStructure

  class func attributes(from entry: Entry) -> [FileAttributeKey: Any] {
    let centralDirectoryStructure = entry.centralDirectoryStructure
    let entryType = entry.type
    let fileTime = centralDirectoryStructure.lastModFileTime
    let fileDate = centralDirectoryStructure.lastModFileDate
    let defaultPermissions = entryType == .directory ? defaultDirectoryPermissions : defaultFilePermissions
    var attributes = [.posixPermissions: defaultPermissions] as [FileAttributeKey: Any]
    // Certain keys are not yet supported in swift-corelibs
    #if os(macOS) || os(iOS) || os(watchOS) || os(tvOS)
    attributes[.modificationDate] = Date(dateTime: (fileDate, fileTime))
    #endif
    let versionMadeBy = centralDirectoryStructure.versionMadeBy
    guard let osType = Entry.OSType(rawValue: UInt(versionMadeBy >> 8)) else { return attributes }

    let externalFileAttributes = centralDirectoryStructure.externalFileAttributes
    let permissions = permissions(for: externalFileAttributes, osType: osType, entryType: entryType)
    attributes[.posixPermissions] = NSNumber(value: permissions)
    return attributes
  }

  class func permissions(
    for externalFileAttributes: UInt32,
    osType: Entry.OSType,
    entryType: Entry.EntryType)
    -> UInt16
  {
    switch osType {
    case .unix, .osx:
      let permissions = mode_t(externalFileAttributes >> 16) & ~S_IFMT
      let defaultPermissions = entryType == .directory ? defaultDirectoryPermissions : defaultFilePermissions
      return permissions == 0 ? defaultPermissions : UInt16(permissions)
    default:
      return entryType == .directory ? defaultDirectoryPermissions : defaultFilePermissions
    }
  }

  class func externalFileAttributesForEntry(of type: Entry.EntryType, permissions: UInt16) -> UInt32 {
    var typeInt: UInt16
    switch type {
    case .file:
      typeInt = UInt16(S_IFREG)
    case .directory:
      typeInt = UInt16(S_IFDIR)
    case .symlink:
      typeInt = UInt16(S_IFLNK)
    }
    var externalFileAttributes = UInt32(typeInt | UInt16(permissions))
    externalFileAttributes = (externalFileAttributes << 16)
    return externalFileAttributes
  }

  class func permissionsForItem(at URL: URL) throws -> UInt16 {
    let fileManager = FileManager()
    let entryFileSystemRepresentation = fileManager.fileSystemRepresentation(withPath: URL.path)
    var fileStat = stat()
    lstat(entryFileSystemRepresentation, &fileStat)
    let permissions = fileStat.st_mode
    return UInt16(permissions)
  }

  class func fileModificationDateTimeForItem(at url: URL) throws -> Date {
    let fileManager = FileManager()
    guard fileManager.itemExists(at: url) else {
      throw CocoaError(.fileReadNoSuchFile, userInfo: [NSFilePathErrorKey: url.path])
    }
    let entryFileSystemRepresentation = fileManager.fileSystemRepresentation(withPath: url.path)
    var fileStat = stat()
    lstat(entryFileSystemRepresentation, &fileStat)
    #if os(macOS) || canImport(UIKit)
    let modTimeSpec = fileStat.st_mtimespec
    #else
    let modTimeSpec = fileStat.st_mtim
    #endif

    let timeStamp = TimeInterval(modTimeSpec.tv_sec) + TimeInterval(modTimeSpec.tv_nsec) / 1000000000.0
    let modDate = Date(timeIntervalSince1970: timeStamp)
    return modDate
  }

  class func fileSizeForItem(at url: URL) throws -> Int64 {
    let fileManager = FileManager()
    guard fileManager.itemExists(at: url) else {
      throw CocoaError(.fileReadNoSuchFile, userInfo: [NSFilePathErrorKey: url.path])
    }
    let entryFileSystemRepresentation = fileManager.fileSystemRepresentation(withPath: url.path)
    var fileStat = stat()
    lstat(entryFileSystemRepresentation, &fileStat)
    guard fileStat.st_size >= 0 else {
      throw CocoaError(.fileReadTooLarge, userInfo: [NSFilePathErrorKey: url.path])
    }
    // `st_size` is a signed int value
    return Int64(fileStat.st_size)
  }

  class func typeForItem(at url: URL) throws -> Entry.EntryType {
    let fileManager = FileManager()
    guard url.isFileURL, fileManager.itemExists(at: url) else {
      throw CocoaError(.fileReadNoSuchFile, userInfo: [NSFilePathErrorKey: url.path])
    }
    let entryFileSystemRepresentation = fileManager.fileSystemRepresentation(withPath: url.path)
    var fileStat = stat()
    lstat(entryFileSystemRepresentation, &fileStat)
    return Entry.EntryType(mode: mode_t(fileStat.st_mode))
  }

  /// Zips the file or directory contents at the specified source URL to the destination URL.
  ///
  /// If the item at the source URL is a directory, the directory itself will be
  /// represented within the ZIP `Archive`. Calling this method with a directory URL
  /// `file:///path/directory/` will create an archive with a `directory/` entry at the root level.
  /// You can override this behavior by passing `false` for `shouldKeepParent`. In that case, the contents
  /// of the source directory will be placed at the root of the archive.
  /// - Parameters:
  ///   - sourceURL: The file URL pointing to an existing file or directory.
  ///   - destinationURL: The file URL that identifies the destination of the zip operation.
  ///   - shouldKeepParent: Indicates that the directory name of a source item should be used as root element
  ///                       within the archive. Default is `true`.
  ///   - compressionMethod: Indicates the `CompressionMethod` that should be applied.
  ///                        By default, `zipItem` will create uncompressed archives.
  ///   - progress: A progress object that can be used to track or cancel the zip operation.
  /// - Throws: Throws an error if the source item does not exist or the destination URL is not writable.
  func zipItem(
    at sourceURL: URL,
    to destinationURL: URL,
    shouldKeepParent: Bool = true,
    compressionMethod: CompressionMethod = .none,
    progress: Progress? = nil)
    throws
  {
    let fileManager = FileManager()
    guard fileManager.itemExists(at: sourceURL) else {
      throw CocoaError(.fileReadNoSuchFile, userInfo: [NSFilePathErrorKey: sourceURL.path])
    }
    guard !fileManager.itemExists(at: destinationURL) else {
      throw CocoaError(.fileWriteFileExists, userInfo: [NSFilePathErrorKey: destinationURL.path])
    }
    guard let archive = Archive(url: destinationURL, accessMode: .create) else {
      throw Archive.ArchiveError.unwritableArchive
    }
    let isDirectory = try FileManager.typeForItem(at: sourceURL) == .directory
    if isDirectory {
      let subPaths = try subpathsOfDirectory(atPath: sourceURL.path)
      var totalUnitCount = Int64(0)
      if let progress {
        totalUnitCount = subPaths.reduce(Int64(0)) {
          let itemURL = sourceURL.appendingPathComponent($1)
          let itemSize = archive.totalUnitCountForAddingItem(at: itemURL)
          return $0 + itemSize
        }
        progress.totalUnitCount = totalUnitCount
      }

      // If the caller wants to keep the parent directory, we use the lastPathComponent of the source URL
      // as common base for all entries (similar to macOS' Archive Utility.app)
      let directoryPrefix = sourceURL.lastPathComponent
      for entryPath in subPaths {
        let finalEntryPath = shouldKeepParent ? directoryPrefix + "/" + entryPath : entryPath
        let finalBaseURL = shouldKeepParent ? sourceURL.deletingLastPathComponent() : sourceURL
        if let progress {
          let itemURL = sourceURL.appendingPathComponent(entryPath)
          let entryProgress = archive.makeProgressForAddingItem(at: itemURL)
          progress.addChild(entryProgress, withPendingUnitCount: entryProgress.totalUnitCount)
          try archive.addEntry(
            with: finalEntryPath,
            relativeTo: finalBaseURL,
            compressionMethod: compressionMethod,
            progress: entryProgress)
        } else {
          try archive.addEntry(
            with: finalEntryPath,
            relativeTo: finalBaseURL,
            compressionMethod: compressionMethod)
        }
      }
    } else {
      progress?.totalUnitCount = archive.totalUnitCountForAddingItem(at: sourceURL)
      let baseURL = sourceURL.deletingLastPathComponent()
      try archive.addEntry(
        with: sourceURL.lastPathComponent,
        relativeTo: baseURL,
        compressionMethod: compressionMethod,
        progress: progress)
    }
  }

  /// Unzips the contents at the specified source URL to the destination URL.
  ///
  /// - Parameters:
  ///   - sourceURL: The file URL pointing to an existing ZIP file.
  ///   - destinationURL: The file URL that identifies the destination directory of the unzip operation.
  ///   - skipCRC32: Optional flag to skip calculation of the CRC32 checksum to improve performance.
  ///   - progress: A progress object that can be used to track or cancel the unzip operation.
  ///   - preferredEncoding: Encoding for entry paths. Overrides the encoding specified in the archive.
  /// - Throws: Throws an error if the source item does not exist or the destination URL is not writable.
  func unzipItem(
    at sourceURL: URL,
    to destinationURL: URL,
    skipCRC32: Bool = false,
    progress: Progress? = nil,
    preferredEncoding: String.Encoding? = nil)
    throws
  {
    let fileManager = FileManager()
    guard fileManager.itemExists(at: sourceURL) else {
      throw CocoaError(.fileReadNoSuchFile, userInfo: [NSFilePathErrorKey: sourceURL.path])
    }
    guard let archive = Archive(url: sourceURL, accessMode: .read, preferredEncoding: preferredEncoding) else {
      throw Archive.ArchiveError.unreadableArchive
    }
    // Defer extraction of symlinks until all files & directories have been created.
    // This is necessary because we can't create links to files that haven't been created yet.
    let sortedEntries = archive.sorted { left, right -> Bool in
      switch (left.type, right.type) {
      case (.directory, .file): return true
      case (.directory, .symlink): return true
      case (.file, .symlink): return true
      default: return false
      }
    }
    var totalUnitCount = Int64(0)
    if let progress {
      totalUnitCount = sortedEntries.reduce(0) { $0 + archive.totalUnitCountForReading($1) }
      progress.totalUnitCount = totalUnitCount
    }

    for entry in sortedEntries {
      let path = preferredEncoding == nil ? entry.path : entry.path(using: preferredEncoding!)
      let entryURL = destinationURL.appendingPathComponent(path)
      guard entryURL.isContained(in: destinationURL) else {
        throw CocoaError(
          .fileReadInvalidFileName,
          userInfo: [NSFilePathErrorKey: entryURL.path])
      }
      let crc32: CRC32
      if let progress {
        let entryProgress = archive.makeProgressForReading(entry)
        progress.addChild(entryProgress, withPendingUnitCount: entryProgress.totalUnitCount)
        crc32 = try archive.extract(entry, to: entryURL, skipCRC32: skipCRC32, progress: entryProgress)
      } else {
        crc32 = try archive.extract(entry, to: entryURL, skipCRC32: skipCRC32)
      }

      func verifyChecksumIfNecessary() throws {
        if skipCRC32 == false, crc32 != entry.checksum {
          throw Archive.ArchiveError.invalidCRC32
        }
      }
      try verifyChecksumIfNecessary()
    }
  }

  // MARK: - Helpers

  func itemExists(at url: URL) -> Bool {
    // Use `URL.checkResourceIsReachable()` instead of `FileManager.fileExists()` here
    // because we don't want implicit symlink resolution.
    // As per documentation, `FileManager.fileExists()` traverses symlinks and therefore a broken symlink
    // would throw a `.fileReadNoSuchFile` false positive error.
    // For ZIP files it may be intended to archive "broken" symlinks because they might be
    // resolvable again when extracting the archive to a different destination.
    (try? url.checkResourceIsReachable()) == true
  }

  func createParentDirectoryStructure(for url: URL) throws {
    let parentDirectoryURL = url.deletingLastPathComponent()
    try createDirectory(at: parentDirectoryURL, withIntermediateDirectories: true, attributes: nil)
  }

}

extension Date {

  // MARK: Lifecycle

  init(dateTime: (UInt16, UInt16)) {
    var msdosDateTime = Int(dateTime.0)
    msdosDateTime <<= 16
    msdosDateTime |= Int(dateTime.1)
    var unixTime = tm()
    unixTime.tm_sec = Int32((msdosDateTime & 31) * 2)
    unixTime.tm_min = Int32((msdosDateTime >> 5) & 63)
    unixTime.tm_hour = Int32((Int(dateTime.1) >> 11) & 31)
    unixTime.tm_mday = Int32((msdosDateTime >> 16) & 31)
    unixTime.tm_mon = Int32((msdosDateTime >> 21) & 15)
    unixTime.tm_mon -= 1 // UNIX time struct month entries are zero based.
    unixTime.tm_year = Int32(1980 + (msdosDateTime >> 25))
    unixTime.tm_year -= 1900 // UNIX time structs count in "years since 1900".
    let time = timegm(&unixTime)
    self = Date(timeIntervalSince1970: TimeInterval(time))
  }

  // MARK: Internal

  var fileModificationDateTime: (UInt16, UInt16) {
    (self.fileModificationDate, self.fileModificationTime)
  }

  var fileModificationDate: UInt16 {
    var time = time_t(timeIntervalSince1970)
    guard let unixTime = gmtime(&time) else {
      return 0
    }
    var year = unixTime.pointee.tm_year + 1900 // UNIX time structs count in "years since 1900".
    // ZIP uses the MSDOS date format which has a valid range of 1980 - 2099.
    year = year >= 1980 ? year : 1980
    year = year <= 2099 ? year : 2099
    let month = unixTime.pointee.tm_mon + 1 // UNIX time struct month entries are zero based.
    let day = unixTime.pointee.tm_mday
    return UInt16(day + (month * 32) + ((year - 1980) * 512))
  }

  var fileModificationTime: UInt16 {
    var time = time_t(timeIntervalSince1970)
    guard let unixTime = gmtime(&time) else {
      return 0
    }
    let hour = unixTime.pointee.tm_hour
    let minute = unixTime.pointee.tm_min
    let second = unixTime.pointee.tm_sec
    return UInt16((second / 2) + (minute * 32) + (hour * 2048))
  }
}

#if swift(>=4.2)
#else

#if os(macOS) || os(iOS) || os(watchOS) || os(tvOS)
#else

// The swift-corelibs-foundation version of NSError.swift was missing a convenience method to create
// error objects from error codes. (https://github.com/apple/swift-corelibs-foundation/pull/1420)
// We have to provide an implementation for non-Darwin platforms using Swift versions < 4.2.

extension CocoaError {
  static func error(_ code: CocoaError.Code, userInfo: [AnyHashable: Any]? = nil, url: URL? = nil) -> Error {
    var info: [String: Any] = userInfo as? [String: Any] ?? [:]
    if let url {
      info[NSURLErrorKey] = url
    }
    return NSError(domain: NSCocoaErrorDomain, code: code.rawValue, userInfo: info)
  }
}

#endif
#endif

extension URL {
  func isContained(in parentDirectoryURL: URL) -> Bool {
    // Ensure this URL is contained in the passed in URL
    let parentDirectoryURL = URL(fileURLWithPath: parentDirectoryURL.path, isDirectory: true).standardized
    return standardized.absoluteString.hasPrefix(parentDirectoryURL.absoluteString)
  }
}
