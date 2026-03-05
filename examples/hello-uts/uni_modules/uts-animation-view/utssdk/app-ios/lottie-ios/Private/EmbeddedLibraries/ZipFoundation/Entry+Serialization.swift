//
//  Entry+Serialization.swift
//  ZIPFoundation
//
//  Copyright © 2017-2021 Thomas Zoechling, https://www.peakstep.com and the ZIP Foundation project authors.
//  Released under the MIT License.
//
//  See https://github.com/weichsel/ZIPFoundation/blob/master/LICENSE for license information.
//

import Foundation

extension Entry.LocalFileHeader {

  // MARK: Lifecycle

  init?(data: Data, additionalDataProvider provider: (Int) throws -> Data) {
    guard data.count == Entry.LocalFileHeader.size else { return nil }
    guard data.scanValue(start: 0) == localFileHeaderSignature else { return nil }
    versionNeededToExtract = data.scanValue(start: 4)
    generalPurposeBitFlag = data.scanValue(start: 6)
    compressionMethod = data.scanValue(start: 8)
    lastModFileTime = data.scanValue(start: 10)
    lastModFileDate = data.scanValue(start: 12)
    crc32 = data.scanValue(start: 14)
    compressedSize = data.scanValue(start: 18)
    uncompressedSize = data.scanValue(start: 22)
    fileNameLength = data.scanValue(start: 26)
    extraFieldLength = data.scanValue(start: 28)
    let additionalDataLength = Int(fileNameLength) + Int(extraFieldLength)
    guard let additionalData = try? provider(additionalDataLength) else { return nil }
    guard additionalData.count == additionalDataLength else { return nil }
    var subRangeStart = 0
    var subRangeEnd = Int(fileNameLength)
    fileNameData = additionalData.subdata(in: subRangeStart..<subRangeEnd)
    subRangeStart += Int(fileNameLength)
    subRangeEnd = subRangeStart + Int(extraFieldLength)
    extraFieldData = additionalData.subdata(in: subRangeStart..<subRangeEnd)
    if
      let zip64ExtendedInformation = Entry.ZIP64ExtendedInformation.scanForZIP64Field(
        in: extraFieldData,
        fields: validFields)
    {
      extraFields = [zip64ExtendedInformation]
    }
  }

  // MARK: Internal

  var data: Data {
    var localFileHeaderSignature = localFileHeaderSignature
    var versionNeededToExtract = versionNeededToExtract
    var generalPurposeBitFlag = generalPurposeBitFlag
    var compressionMethod = compressionMethod
    var lastModFileTime = lastModFileTime
    var lastModFileDate = lastModFileDate
    var crc32 = crc32
    var compressedSize = compressedSize
    var uncompressedSize = uncompressedSize
    var fileNameLength = fileNameLength
    var extraFieldLength = extraFieldLength
    var data = Data()
    withUnsafePointer(to: &localFileHeaderSignature) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &versionNeededToExtract) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &generalPurposeBitFlag) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &compressionMethod) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &lastModFileTime) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &lastModFileDate) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &crc32) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &compressedSize) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &uncompressedSize) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &fileNameLength) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &extraFieldLength) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    data.append(fileNameData)
    data.append(extraFieldData)
    return data
  }

}

extension Entry.CentralDirectoryStructure {

  // MARK: Lifecycle

  init?(data: Data, additionalDataProvider provider: (Int) throws -> Data) {
    guard data.count == Entry.CentralDirectoryStructure.size else { return nil }
    guard data.scanValue(start: 0) == centralDirectorySignature else { return nil }
    versionMadeBy = data.scanValue(start: 4)
    versionNeededToExtract = data.scanValue(start: 6)
    generalPurposeBitFlag = data.scanValue(start: 8)
    compressionMethod = data.scanValue(start: 10)
    lastModFileTime = data.scanValue(start: 12)
    lastModFileDate = data.scanValue(start: 14)
    crc32 = data.scanValue(start: 16)
    compressedSize = data.scanValue(start: 20)
    uncompressedSize = data.scanValue(start: 24)
    fileNameLength = data.scanValue(start: 28)
    extraFieldLength = data.scanValue(start: 30)
    fileCommentLength = data.scanValue(start: 32)
    diskNumberStart = data.scanValue(start: 34)
    internalFileAttributes = data.scanValue(start: 36)
    externalFileAttributes = data.scanValue(start: 38)
    relativeOffsetOfLocalHeader = data.scanValue(start: 42)
    let additionalDataLength = Int(fileNameLength) + Int(extraFieldLength) + Int(fileCommentLength)
    guard let additionalData = try? provider(additionalDataLength) else { return nil }
    guard additionalData.count == additionalDataLength else { return nil }
    var subRangeStart = 0
    var subRangeEnd = Int(fileNameLength)
    fileNameData = additionalData.subdata(in: subRangeStart..<subRangeEnd)
    subRangeStart += Int(fileNameLength)
    subRangeEnd = subRangeStart + Int(extraFieldLength)
    extraFieldData = additionalData.subdata(in: subRangeStart..<subRangeEnd)
    subRangeStart += Int(extraFieldLength)
    subRangeEnd = subRangeStart + Int(fileCommentLength)
    fileCommentData = additionalData.subdata(in: subRangeStart..<subRangeEnd)
    if
      let zip64ExtendedInformation = Entry.ZIP64ExtendedInformation.scanForZIP64Field(
        in: extraFieldData,
        fields: validFields)
    {
      extraFields = [zip64ExtendedInformation]
    }
  }

  // MARK: Internal

  var data: Data {
    var centralDirectorySignature = centralDirectorySignature
    var versionMadeBy = versionMadeBy
    var versionNeededToExtract = versionNeededToExtract
    var generalPurposeBitFlag = generalPurposeBitFlag
    var compressionMethod = compressionMethod
    var lastModFileTime = lastModFileTime
    var lastModFileDate = lastModFileDate
    var crc32 = crc32
    var compressedSize = compressedSize
    var uncompressedSize = uncompressedSize
    var fileNameLength = fileNameLength
    var extraFieldLength = extraFieldLength
    var fileCommentLength = fileCommentLength
    var diskNumberStart = diskNumberStart
    var internalFileAttributes = internalFileAttributes
    var externalFileAttributes = externalFileAttributes
    var relativeOffsetOfLocalHeader = relativeOffsetOfLocalHeader
    var data = Data()
    withUnsafePointer(to: &centralDirectorySignature) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &versionMadeBy) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &versionNeededToExtract) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &generalPurposeBitFlag) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &compressionMethod) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &lastModFileTime) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &lastModFileDate) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &crc32) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &compressedSize) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &uncompressedSize) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &fileNameLength) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &extraFieldLength) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &fileCommentLength) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &diskNumberStart) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &internalFileAttributes) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &externalFileAttributes) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &relativeOffsetOfLocalHeader) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    data.append(fileNameData)
    data.append(extraFieldData)
    data.append(fileCommentData)
    return data
  }

}

extension Entry.DataDescriptor {
  init?(data: Data, additionalDataProvider _: (Int) throws -> Data) {
    guard data.count == Self.size else { return nil }
    let signature: UInt32 = data.scanValue(start: 0)
    // The DataDescriptor signature is not mandatory so we have to re-arrange the input data if it is missing.
    var readOffset = 0
    if signature == dataDescriptorSignature { readOffset = 4 }
    crc32 = data.scanValue(start: readOffset)
    readOffset += MemoryLayout<UInt32>.size
    compressedSize = data.scanValue(start: readOffset)
    readOffset += Self.memoryLengthOfSize
    uncompressedSize = data.scanValue(start: readOffset)
    // Our add(_ entry:) methods always maintain compressed & uncompressed
    // sizes and so we don't need a data descriptor for newly added entries.
    // Data descriptors of already existing entries are manually preserved
    // when copying those entries to the tempArchive during remove(_ entry:).
    self.data = Data()
  }
}
