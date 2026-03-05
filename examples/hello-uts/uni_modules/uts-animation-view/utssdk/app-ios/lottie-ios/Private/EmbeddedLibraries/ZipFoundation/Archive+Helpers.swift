//
//  Archive+Helpers.swift
//  ZIPFoundation
//
//  Copyright © 2017-2021 Thomas Zoechling, https://www.peakstep.com and the ZIP Foundation project authors.
//  Released under the MIT License.
//
//  See https://github.com/weichsel/ZIPFoundation/blob/master/LICENSE for license information.
//

import Foundation

extension Archive {

  // MARK: - Reading

  func readUncompressed(
    entry: Entry,
    bufferSize: Int,
    skipCRC32: Bool,
    progress: Progress? = nil,
    with consumer: Consumer)
    throws -> CRC32
  {
    let size = entry.centralDirectoryStructure.effectiveUncompressedSize
    guard size <= .max else { throw ArchiveError.invalidEntrySize }
    return try Data.consumePart(
      of: Int64(size),
      chunkSize: bufferSize,
      skipCRC32: skipCRC32,
      provider: { _, chunkSize -> Data in
        try Data.readChunk(of: chunkSize, from: self.archiveFile)
      },
      consumer: { data in
        if progress?.isCancelled == true { throw ArchiveError.cancelledOperation }
        try consumer(data)
        progress?.completedUnitCount += Int64(data.count)
      })
  }

  func readCompressed(
    entry: Entry,
    bufferSize: Int,
    skipCRC32: Bool,
    progress: Progress? = nil,
    with consumer: Consumer)
    throws -> CRC32
  {
    let size = entry.centralDirectoryStructure.effectiveCompressedSize
    guard size <= .max else { throw ArchiveError.invalidEntrySize }
    return try Data.decompress(
      size: Int64(size),
      bufferSize: bufferSize,
      skipCRC32: skipCRC32,
      provider: { _, chunkSize -> Data in
        try Data.readChunk(of: chunkSize, from: self.archiveFile)
      },
      consumer: { data in
        if progress?.isCancelled == true { throw ArchiveError.cancelledOperation }
        try consumer(data)
        progress?.completedUnitCount += Int64(data.count)
      })
  }

  // MARK: - Writing

  func writeEntry(
    uncompressedSize: Int64,
    type: Entry.EntryType,
    compressionMethod: CompressionMethod,
    bufferSize: Int,
    progress: Progress? = nil,
    provider: Provider) throws -> (sizeWritten: Int64, crc32: CRC32)
  {
    var checksum = CRC32(0)
    var sizeWritten = Int64(0)
    switch type {
    case .file:
      switch compressionMethod {
      case .none:
        (sizeWritten, checksum) = try writeUncompressed(
          size: uncompressedSize,
          bufferSize: bufferSize,
          progress: progress,
          provider: provider)
      case .deflate:
        (sizeWritten, checksum) = try writeCompressed(
          size: uncompressedSize,
          bufferSize: bufferSize,
          progress: progress,
          provider: provider)
      }
    case .directory:
      _ = try provider(0, 0)
      if let progress { progress.completedUnitCount = progress.totalUnitCount }
    case .symlink:
      let (linkSizeWritten, linkChecksum) = try writeSymbolicLink(
        size: Int(uncompressedSize),
        provider: provider)
      (sizeWritten, checksum) = (Int64(linkSizeWritten), linkChecksum)
      if let progress { progress.completedUnitCount = progress.totalUnitCount }
    }
    return (sizeWritten, checksum)
  }

  func writeLocalFileHeader(
    path: String,
    compressionMethod: CompressionMethod,
    size: (uncompressed: UInt64, compressed: UInt64),
    checksum: CRC32,
    modificationDateTime: (UInt16, UInt16))
    throws -> LocalFileHeader
  {
    // We always set Bit 11 in generalPurposeBitFlag, which indicates an UTF-8 encoded path.
    guard let fileNameData = path.data(using: .utf8) else { throw ArchiveError.invalidEntryPath }

    var uncompressedSizeOfLFH = UInt32(0)
    var compressedSizeOfLFH = UInt32(0)
    var extraFieldLength = UInt16(0)
    var zip64ExtendedInformation: Entry.ZIP64ExtendedInformation?
    var versionNeededToExtract = Version.v20.rawValue
    // ZIP64 Extended Information in the Local header MUST include BOTH original and compressed file size fields.
    if size.uncompressed >= maxUncompressedSize || size.compressed >= maxCompressedSize {
      uncompressedSizeOfLFH = .max
      compressedSizeOfLFH = .max
      extraFieldLength = UInt16(20) // 2 + 2 + 8 + 8
      versionNeededToExtract = Version.v45.rawValue
      zip64ExtendedInformation = Entry.ZIP64ExtendedInformation(
        dataSize: extraFieldLength - 4,
        uncompressedSize: size.uncompressed,
        compressedSize: size.compressed,
        relativeOffsetOfLocalHeader: 0,
        diskNumberStart: 0)
    } else {
      uncompressedSizeOfLFH = UInt32(size.uncompressed)
      compressedSizeOfLFH = UInt32(size.compressed)
    }

    let localFileHeader = LocalFileHeader(
      versionNeededToExtract: versionNeededToExtract,
      generalPurposeBitFlag: UInt16(2048),
      compressionMethod: compressionMethod.rawValue,
      lastModFileTime: modificationDateTime.1,
      lastModFileDate: modificationDateTime.0,
      crc32: checksum,
      compressedSize: compressedSizeOfLFH,
      uncompressedSize: uncompressedSizeOfLFH,
      fileNameLength: UInt16(fileNameData.count),
      extraFieldLength: extraFieldLength,
      fileNameData: fileNameData,
      extraFieldData: zip64ExtendedInformation?.data ?? Data())
    _ = try Data.write(chunk: localFileHeader.data, to: archiveFile)
    return localFileHeader
  }

  func writeCentralDirectoryStructure(
    localFileHeader: LocalFileHeader,
    relativeOffset: UInt64,
    externalFileAttributes: UInt32)
    throws -> CentralDirectoryStructure
  {
    var extraUncompressedSize: UInt64?
    var extraCompressedSize: UInt64?
    var extraOffset: UInt64?
    var relativeOffsetOfCD = UInt32(0)
    var extraFieldLength = UInt16(0)
    var zip64ExtendedInformation: Entry.ZIP64ExtendedInformation?
    if localFileHeader.uncompressedSize == .max || localFileHeader.compressedSize == .max {
      let zip64Field = Entry.ZIP64ExtendedInformation
        .scanForZIP64Field(in: localFileHeader.extraFieldData, fields: [.uncompressedSize, .compressedSize])
      extraUncompressedSize = zip64Field?.uncompressedSize
      extraCompressedSize = zip64Field?.compressedSize
    }
    if relativeOffset >= maxOffsetOfLocalFileHeader {
      extraOffset = relativeOffset
      relativeOffsetOfCD = .max
    } else {
      relativeOffsetOfCD = UInt32(relativeOffset)
    }
    extraFieldLength = [extraUncompressedSize, extraCompressedSize, extraOffset]
      .compactMap { $0 }
      .reduce(UInt16(0)) { $0 + UInt16(MemoryLayout.size(ofValue: $1)) }
    if extraFieldLength > 0 {
      // Size of extra fields, shouldn't include the leading 4 bytes
      zip64ExtendedInformation = Entry.ZIP64ExtendedInformation(
        dataSize: extraFieldLength,
        uncompressedSize: extraUncompressedSize ?? 0,
        compressedSize: extraCompressedSize ?? 0,
        relativeOffsetOfLocalHeader: extraOffset ?? 0,
        diskNumberStart: 0)
      extraFieldLength += Entry.ZIP64ExtendedInformation.headerSize
    }
    let centralDirectory = CentralDirectoryStructure(
      localFileHeader: localFileHeader,
      fileAttributes: externalFileAttributes,
      relativeOffset: relativeOffsetOfCD,
      extraField: (
        extraFieldLength,
        zip64ExtendedInformation?.data ?? Data()))
    _ = try Data.write(chunk: centralDirectory.data, to: archiveFile)
    return centralDirectory
  }

  func writeEndOfCentralDirectory(
    centralDirectoryStructure: CentralDirectoryStructure,
    startOfCentralDirectory: UInt64,
    startOfEndOfCentralDirectory: UInt64,
    operation: ModifyOperation)
    throws -> EndOfCentralDirectoryStructure
  {
    var record = endOfCentralDirectoryRecord
    let sizeOfCD = sizeOfCentralDirectory
    let numberOfTotalEntries = totalNumberOfEntriesInCentralDirectory
    let countChange = operation.rawValue
    var dataLength = centralDirectoryStructure.extraFieldLength
    dataLength += centralDirectoryStructure.fileNameLength
    dataLength += centralDirectoryStructure.fileCommentLength
    let cdDataLengthChange = countChange * (Int(dataLength) + CentralDirectoryStructure.size)
    let (updatedSizeOfCD, updatedNumberOfEntries): (UInt64, UInt64) = try {
      switch operation {
      case .add:
        guard .max - sizeOfCD >= cdDataLengthChange else {
          throw ArchiveError.invalidCentralDirectorySize
        }
        guard .max - numberOfTotalEntries >= countChange else {
          throw ArchiveError.invalidCentralDirectoryEntryCount
        }
        return (sizeOfCD + UInt64(cdDataLengthChange), numberOfTotalEntries + UInt64(countChange))
      case .remove:
        return (sizeOfCD - UInt64(-cdDataLengthChange), numberOfTotalEntries - UInt64(-countChange))
      }
    }()
    let sizeOfCDForEOCD = updatedSizeOfCD >= maxSizeOfCentralDirectory
      ? UInt32.max
      : UInt32(updatedSizeOfCD)
    let numberOfTotalEntriesForEOCD = updatedNumberOfEntries >= maxTotalNumberOfEntries
      ? UInt16.max
      : UInt16(updatedNumberOfEntries)
    let offsetOfCDForEOCD = startOfCentralDirectory >= maxOffsetOfCentralDirectory
      ? UInt32.max
      : UInt32(startOfCentralDirectory)
    // ZIP64 End of Central Directory
    var zip64EOCD: ZIP64EndOfCentralDirectory?
    if numberOfTotalEntriesForEOCD == .max || offsetOfCDForEOCD == .max || sizeOfCDForEOCD == .max {
      zip64EOCD = try writeZIP64EOCD(
        totalNumberOfEntries: updatedNumberOfEntries,
        sizeOfCentralDirectory: updatedSizeOfCD,
        offsetOfCentralDirectory: startOfCentralDirectory,
        offsetOfEndOfCentralDirectory: startOfEndOfCentralDirectory)
    }
    record = EndOfCentralDirectoryRecord(
      record: record,
      numberOfEntriesOnDisk: numberOfTotalEntriesForEOCD,
      numberOfEntriesInCentralDirectory: numberOfTotalEntriesForEOCD,
      updatedSizeOfCentralDirectory: sizeOfCDForEOCD,
      startOfCentralDirectory: offsetOfCDForEOCD)
    _ = try Data.write(chunk: record.data, to: archiveFile)
    return (record, zip64EOCD)
  }

  func writeUncompressed(
    size: Int64,
    bufferSize: Int,
    progress: Progress? = nil,
    provider: Provider) throws -> (sizeWritten: Int64, checksum: CRC32)
  {
    var position: Int64 = 0
    var sizeWritten: Int64 = 0
    var checksum = CRC32(0)
    while position < size {
      if progress?.isCancelled == true { throw ArchiveError.cancelledOperation }
      let readSize = (size - position) >= bufferSize ? bufferSize : Int(size - position)
      let entryChunk = try provider(position, readSize)
      checksum = entryChunk.crc32(checksum: checksum)
      sizeWritten += Int64(try Data.write(chunk: entryChunk, to: archiveFile))
      position += Int64(bufferSize)
      progress?.completedUnitCount = sizeWritten
    }
    return (sizeWritten, checksum)
  }

  func writeCompressed(
    size: Int64,
    bufferSize: Int,
    progress: Progress? = nil,
    provider: Provider) throws -> (sizeWritten: Int64, checksum: CRC32)
  {
    var sizeWritten: Int64 = 0
    let consumer: Consumer = { data in sizeWritten += Int64(try Data.write(chunk: data, to: self.archiveFile)) }
    let checksum = try Data.compress(
      size: size,
      bufferSize: bufferSize,
      provider: { position, size -> Data in
        if progress?.isCancelled == true { throw ArchiveError.cancelledOperation }
        let data = try provider(position, size)
        progress?.completedUnitCount += Int64(data.count)
        return data
      },
      consumer: consumer)
    return (sizeWritten, checksum)
  }

  func writeSymbolicLink(size: Int, provider: Provider) throws -> (sizeWritten: Int, checksum: CRC32) {
    // The reported size of a symlink is the number of characters in the path it points to.
    let linkData = try provider(0, size)
    let checksum = linkData.crc32(checksum: 0)
    let sizeWritten = try Data.write(chunk: linkData, to: archiveFile)
    return (sizeWritten, checksum)
  }

  func writeZIP64EOCD(
    totalNumberOfEntries: UInt64,
    sizeOfCentralDirectory: UInt64,
    offsetOfCentralDirectory: UInt64,
    offsetOfEndOfCentralDirectory: UInt64)
    throws -> ZIP64EndOfCentralDirectory
  {
    var zip64EOCD: ZIP64EndOfCentralDirectory = zip64EndOfCentralDirectory ?? {
      // Shouldn't include the leading 12 bytes: (size - 12 = 44)
      let record = ZIP64EndOfCentralDirectoryRecord(
        sizeOfZIP64EndOfCentralDirectoryRecord: UInt64(44),
        versionMadeBy: UInt16(789),
        versionNeededToExtract: Version.v45.rawValue,
        numberOfDisk: 0,
        numberOfDiskStart: 0,
        totalNumberOfEntriesOnDisk: 0,
        totalNumberOfEntriesInCentralDirectory: 0,
        sizeOfCentralDirectory: 0,
        offsetToStartOfCentralDirectory: 0,
        zip64ExtensibleDataSector: Data())
      let locator = ZIP64EndOfCentralDirectoryLocator(
        numberOfDiskWithZIP64EOCDRecordStart: 0,
        relativeOffsetOfZIP64EOCDRecord: 0,
        totalNumberOfDisk: 1)
      return ZIP64EndOfCentralDirectory(record: record, locator: locator)
    }()

    let updatedRecord = ZIP64EndOfCentralDirectoryRecord(
      record: zip64EOCD.record,
      numberOfEntriesOnDisk: totalNumberOfEntries,
      numberOfEntriesInCD: totalNumberOfEntries,
      sizeOfCentralDirectory: sizeOfCentralDirectory,
      offsetToStartOfCD: offsetOfCentralDirectory)
    let updatedLocator = ZIP64EndOfCentralDirectoryLocator(
      locator: zip64EOCD.locator,
      offsetOfZIP64EOCDRecord: offsetOfEndOfCentralDirectory)
    zip64EOCD = ZIP64EndOfCentralDirectory(record: updatedRecord, locator: updatedLocator)
    _ = try Data.write(chunk: zip64EOCD.data, to: archiveFile)
    return zip64EOCD
  }
}
