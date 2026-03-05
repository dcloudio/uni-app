//
//  Archive+BackingConfiguration.swift
//  ZIPFoundation
//
//  Copyright © 2017-2021 Thomas Zoechling, https://www.peakstep.com and the ZIP Foundation project authors.
//  Released under the MIT License.
//
//  See https://github.com/weichsel/ZIPFoundation/blob/master/LICENSE for license information.
//

import Foundation

extension Archive {

  struct BackingConfiguration {
    let file: FILEPointer
    let endOfCentralDirectoryRecord: EndOfCentralDirectoryRecord
    let zip64EndOfCentralDirectory: ZIP64EndOfCentralDirectory?

    #if swift(>=5.0)
    let memoryFile: MemoryFile?

    init(
      file: FILEPointer,
      endOfCentralDirectoryRecord: EndOfCentralDirectoryRecord,
      zip64EndOfCentralDirectory: ZIP64EndOfCentralDirectory? = nil,
      memoryFile: MemoryFile? = nil)
    {
      self.file = file
      self.endOfCentralDirectoryRecord = endOfCentralDirectoryRecord
      self.zip64EndOfCentralDirectory = zip64EndOfCentralDirectory
      self.memoryFile = memoryFile
    }
    #else

    init(
      file: FILEPointer,
      endOfCentralDirectoryRecord: EndOfCentralDirectoryRecord,
      zip64EndOfCentralDirectory: ZIP64EndOfCentralDirectory?)
    {
      self.file = file
      self.endOfCentralDirectoryRecord = endOfCentralDirectoryRecord
      self.zip64EndOfCentralDirectory = zip64EndOfCentralDirectory
    }
    #endif
  }

  static func makeBackingConfiguration(for url: URL, mode: AccessMode)
    -> BackingConfiguration?
  {
    let fileManager = FileManager()
    switch mode {
    case .read:
      let fileSystemRepresentation = fileManager.fileSystemRepresentation(withPath: url.path)
      guard
        let archiveFile = fopen(fileSystemRepresentation, "rb"),
        let (eocdRecord, zip64EOCD) = Archive.scanForEndOfCentralDirectoryRecord(in: archiveFile)
      else {
        return nil
      }
      return BackingConfiguration(
        file: archiveFile,
        endOfCentralDirectoryRecord: eocdRecord,
        zip64EndOfCentralDirectory: zip64EOCD)
    case .create:
      let endOfCentralDirectoryRecord = EndOfCentralDirectoryRecord(
        numberOfDisk: 0,
        numberOfDiskStart: 0,
        totalNumberOfEntriesOnDisk: 0,
        totalNumberOfEntriesInCentralDirectory: 0,
        sizeOfCentralDirectory: 0,
        offsetToStartOfCentralDirectory: 0,
        zipFileCommentLength: 0,
        zipFileCommentData: Data())
      do {
        try endOfCentralDirectoryRecord.data.write(to: url, options: .withoutOverwriting)
      } catch { return nil }
      fallthrough
    case .update:
      let fileSystemRepresentation = fileManager.fileSystemRepresentation(withPath: url.path)
      guard
        let archiveFile = fopen(fileSystemRepresentation, "rb+"),
        let (eocdRecord, zip64EOCD) = Archive.scanForEndOfCentralDirectoryRecord(in: archiveFile)
      else {
        return nil
      }
      fseeko(archiveFile, 0, SEEK_SET)
      return BackingConfiguration(
        file: archiveFile,
        endOfCentralDirectoryRecord: eocdRecord,
        zip64EndOfCentralDirectory: zip64EOCD)
    }
  }

  #if swift(>=5.0)
  static func makeBackingConfiguration(for data: Data, mode: AccessMode)
    -> BackingConfiguration?
  {
    let posixMode: String
    switch mode {
    case .read: posixMode = "rb"
    case .create: posixMode = "wb+"
    case .update: posixMode = "rb+"
    }
    let memoryFile = MemoryFile(data: data)
    guard let archiveFile = memoryFile.open(mode: posixMode) else { return nil }

    switch mode {
    case .read:
      guard let (eocdRecord, zip64EOCD) = Archive.scanForEndOfCentralDirectoryRecord(in: archiveFile) else {
        return nil
      }

      return BackingConfiguration(
        file: archiveFile,
        endOfCentralDirectoryRecord: eocdRecord,
        zip64EndOfCentralDirectory: zip64EOCD,
        memoryFile: memoryFile)
    case .create:
      let endOfCentralDirectoryRecord = EndOfCentralDirectoryRecord(
        numberOfDisk: 0,
        numberOfDiskStart: 0,
        totalNumberOfEntriesOnDisk: 0,
        totalNumberOfEntriesInCentralDirectory: 0,
        sizeOfCentralDirectory: 0,
        offsetToStartOfCentralDirectory: 0,
        zipFileCommentLength: 0,
        zipFileCommentData: Data())
      _ = endOfCentralDirectoryRecord.data.withUnsafeBytes { (buffer: UnsafeRawBufferPointer) in
        fwrite(buffer.baseAddress, buffer.count, 1, archiveFile) // Errors handled during read
      }
      fallthrough
    case .update:
      guard let (eocdRecord, zip64EOCD) = Archive.scanForEndOfCentralDirectoryRecord(in: archiveFile) else {
        return nil
      }

      fseeko(archiveFile, 0, SEEK_SET)
      return BackingConfiguration(
        file: archiveFile,
        endOfCentralDirectoryRecord: eocdRecord,
        zip64EndOfCentralDirectory: zip64EOCD,
        memoryFile: memoryFile)
    }
  }
  #endif
}
