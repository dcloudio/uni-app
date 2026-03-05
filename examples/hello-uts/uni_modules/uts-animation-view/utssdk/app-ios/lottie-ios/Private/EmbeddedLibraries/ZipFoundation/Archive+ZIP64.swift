//
//  Archive+ZIP64.swift
//  ZIPFoundation
//
//  Copyright © 2017-2021 Thomas Zoechling, https://www.peakstep.com and the ZIP Foundation project authors.
//  Released under the MIT License.
//
//  See https://github.com/weichsel/ZIPFoundation/blob/master/LICENSE for license information.
//

import Foundation

let zip64EOCDRecordStructSignature = 0x06064b50
let zip64EOCDLocatorStructSignature = 0x07064b50

// MARK: - ExtraFieldHeaderID

enum ExtraFieldHeaderID: UInt16 {
  case zip64ExtendedInformation = 0x0001
}

extension Archive {
  struct ZIP64EndOfCentralDirectory {
    let record: ZIP64EndOfCentralDirectoryRecord
    let locator: ZIP64EndOfCentralDirectoryLocator
  }

  struct ZIP64EndOfCentralDirectoryRecord: DataSerializable {
    let zip64EOCDRecordSignature = UInt32(zip64EOCDRecordStructSignature)
    let sizeOfZIP64EndOfCentralDirectoryRecord: UInt64
    let versionMadeBy: UInt16
    let versionNeededToExtract: UInt16
    let numberOfDisk: UInt32
    let numberOfDiskStart: UInt32
    let totalNumberOfEntriesOnDisk: UInt64
    let totalNumberOfEntriesInCentralDirectory: UInt64
    let sizeOfCentralDirectory: UInt64
    let offsetToStartOfCentralDirectory: UInt64
    let zip64ExtensibleDataSector: Data
    static let size = 56
  }

  struct ZIP64EndOfCentralDirectoryLocator: DataSerializable {
    let zip64EOCDLocatorSignature = UInt32(zip64EOCDLocatorStructSignature)
    let numberOfDiskWithZIP64EOCDRecordStart: UInt32
    let relativeOffsetOfZIP64EOCDRecord: UInt64
    let totalNumberOfDisk: UInt32
    static let size = 20
  }
}

extension Archive.ZIP64EndOfCentralDirectoryRecord {

  // MARK: Lifecycle

  init?(data: Data, additionalDataProvider _: (Int) throws -> Data) {
    guard data.count == Archive.ZIP64EndOfCentralDirectoryRecord.size else { return nil }
    guard data.scanValue(start: 0) == zip64EOCDRecordSignature else { return nil }
    sizeOfZIP64EndOfCentralDirectoryRecord = data.scanValue(start: 4)
    versionMadeBy = data.scanValue(start: 12)
    versionNeededToExtract = data.scanValue(start: 14)
    // Version Needed to Extract: 4.5 - File uses ZIP64 format extensions
    guard versionNeededToExtract >= Archive.Version.v45.rawValue else { return nil }
    numberOfDisk = data.scanValue(start: 16)
    numberOfDiskStart = data.scanValue(start: 20)
    totalNumberOfEntriesOnDisk = data.scanValue(start: 24)
    totalNumberOfEntriesInCentralDirectory = data.scanValue(start: 32)
    sizeOfCentralDirectory = data.scanValue(start: 40)
    offsetToStartOfCentralDirectory = data.scanValue(start: 48)
    zip64ExtensibleDataSector = Data()
  }

  init(
    record: Archive.ZIP64EndOfCentralDirectoryRecord,
    numberOfEntriesOnDisk: UInt64,
    numberOfEntriesInCD: UInt64,
    sizeOfCentralDirectory: UInt64,
    offsetToStartOfCD: UInt64)
  {
    sizeOfZIP64EndOfCentralDirectoryRecord = record.sizeOfZIP64EndOfCentralDirectoryRecord
    versionMadeBy = record.versionMadeBy
    versionNeededToExtract = record.versionNeededToExtract
    numberOfDisk = record.numberOfDisk
    numberOfDiskStart = record.numberOfDiskStart
    totalNumberOfEntriesOnDisk = numberOfEntriesOnDisk
    totalNumberOfEntriesInCentralDirectory = numberOfEntriesInCD
    self.sizeOfCentralDirectory = sizeOfCentralDirectory
    offsetToStartOfCentralDirectory = offsetToStartOfCD
    zip64ExtensibleDataSector = record.zip64ExtensibleDataSector
  }

  // MARK: Internal

  var data: Data {
    var zip64EOCDRecordSignature = zip64EOCDRecordSignature
    var sizeOfZIP64EOCDRecord = sizeOfZIP64EndOfCentralDirectoryRecord
    var versionMadeBy = versionMadeBy
    var versionNeededToExtract = versionNeededToExtract
    var numberOfDisk = numberOfDisk
    var numberOfDiskStart = numberOfDiskStart
    var totalNumberOfEntriesOnDisk = totalNumberOfEntriesOnDisk
    var totalNumberOfEntriesInCD = totalNumberOfEntriesInCentralDirectory
    var sizeOfCD = sizeOfCentralDirectory
    var offsetToStartOfCD = offsetToStartOfCentralDirectory
    var data = Data()
    withUnsafePointer(to: &zip64EOCDRecordSignature) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &sizeOfZIP64EOCDRecord) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &versionMadeBy) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &versionNeededToExtract) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &numberOfDisk) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &numberOfDiskStart) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &totalNumberOfEntriesOnDisk) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &totalNumberOfEntriesInCD) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &sizeOfCD) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &offsetToStartOfCD) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    data.append(zip64ExtensibleDataSector)
    return data
  }

}

extension Archive.ZIP64EndOfCentralDirectoryLocator {

  // MARK: Lifecycle

  init?(data: Data, additionalDataProvider _: (Int) throws -> Data) {
    guard data.count == Archive.ZIP64EndOfCentralDirectoryLocator.size else { return nil }
    guard data.scanValue(start: 0) == zip64EOCDLocatorSignature else { return nil }
    numberOfDiskWithZIP64EOCDRecordStart = data.scanValue(start: 4)
    relativeOffsetOfZIP64EOCDRecord = data.scanValue(start: 8)
    totalNumberOfDisk = data.scanValue(start: 16)
  }

  init(locator: Archive.ZIP64EndOfCentralDirectoryLocator, offsetOfZIP64EOCDRecord: UInt64) {
    numberOfDiskWithZIP64EOCDRecordStart = locator.numberOfDiskWithZIP64EOCDRecordStart
    relativeOffsetOfZIP64EOCDRecord = offsetOfZIP64EOCDRecord
    totalNumberOfDisk = locator.totalNumberOfDisk
  }

  // MARK: Internal

  var data: Data {
    var zip64EOCDLocatorSignature = zip64EOCDLocatorSignature
    var numberOfDiskWithZIP64EOCD = numberOfDiskWithZIP64EOCDRecordStart
    var offsetOfZIP64EOCDRecord = relativeOffsetOfZIP64EOCDRecord
    var totalNumberOfDisk = totalNumberOfDisk
    var data = Data()
    withUnsafePointer(to: &zip64EOCDLocatorSignature) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &numberOfDiskWithZIP64EOCD) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &offsetOfZIP64EOCDRecord) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &totalNumberOfDisk) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    return data
  }

}

extension Archive.ZIP64EndOfCentralDirectory {
  var data: Data { record.data + locator.data }
}

/// Properties that represent the maximum value of each field
var maxUInt32 = UInt32.max
var maxUInt16 = UInt16.max

var maxCompressedSize: UInt32 { maxUInt32 }
var maxUncompressedSize: UInt32 { maxUInt32 }
var maxOffsetOfLocalFileHeader: UInt32 { maxUInt32 }
var maxOffsetOfCentralDirectory: UInt32 { maxUInt32 }
var maxSizeOfCentralDirectory: UInt32 { maxUInt32 }
var maxTotalNumberOfEntries: UInt16 { maxUInt16 }
