//
//  Entry+ZIP64.swift
//  ZIPFoundation
//
//  Copyright © 2017-2021 Thomas Zoechling, https://www.peakstep.com and the ZIP Foundation project authors.
//  Released under the MIT License.
//
//  See https://github.com/weichsel/ZIPFoundation/blob/master/LICENSE for license information.
//

import Foundation

// MARK: - ExtensibleDataField

protocol ExtensibleDataField {
  var headerID: UInt16 { get }
  var dataSize: UInt16 { get }
}

extension Entry {
  enum EntryError: Error {
    case invalidDataError
  }

  struct ZIP64ExtendedInformation: ExtensibleDataField {
    let headerID: UInt16 = ExtraFieldHeaderID.zip64ExtendedInformation.rawValue
    let dataSize: UInt16
    static let headerSize: UInt16 = 4
    let uncompressedSize: UInt64
    let compressedSize: UInt64
    let relativeOffsetOfLocalHeader: UInt64
    let diskNumberStart: UInt32
  }

  var zip64ExtendedInformation: ZIP64ExtendedInformation? {
    centralDirectoryStructure.zip64ExtendedInformation
  }
}

typealias Field = Entry.ZIP64ExtendedInformation.Field

extension Entry.LocalFileHeader {
  var validFields: [Field] {
    var fields: [Field] = []
    if uncompressedSize == .max { fields.append(.uncompressedSize) }
    if compressedSize == .max { fields.append(.compressedSize) }
    return fields
  }
}

extension Entry.CentralDirectoryStructure {
  var validFields: [Field] {
    var fields: [Field] = []
    if uncompressedSize == .max { fields.append(.uncompressedSize) }
    if compressedSize == .max { fields.append(.compressedSize) }
    if relativeOffsetOfLocalHeader == .max { fields.append(.relativeOffsetOfLocalHeader) }
    if diskNumberStart == .max { fields.append(.diskNumberStart) }
    return fields
  }

  var zip64ExtendedInformation: Entry.ZIP64ExtendedInformation? {
    extraFields?.compactMap { $0 as? Entry.ZIP64ExtendedInformation }.first
  }
}

extension Entry.ZIP64ExtendedInformation {

  // MARK: Lifecycle

  init?(data: Data, fields: [Field]) {
    let headerLength = 4
    guard fields.reduce(0, { $0 + $1.size }) + headerLength == data.count else { return nil }
    var readOffset = headerLength
    func value<T>(of field: Field) throws -> T where T: BinaryInteger {
      if fields.contains(field) {
        defer {
          readOffset += MemoryLayout<T>.size
        }
        guard readOffset + field.size <= data.count else {
          throw Entry.EntryError.invalidDataError
        }
        return data.scanValue(start: readOffset)
      } else {
        return 0
      }
    }
    do {
      dataSize = data.scanValue(start: 2)
      uncompressedSize = try value(of: .uncompressedSize)
      compressedSize = try value(of: .compressedSize)
      relativeOffsetOfLocalHeader = try value(of: .relativeOffsetOfLocalHeader)
      diskNumberStart = try value(of: .diskNumberStart)
    } catch {
      return nil
    }
  }

  init?(zip64ExtendedInformation: Entry.ZIP64ExtendedInformation?, offset: UInt64) {
    // Only used when removing entry, if no ZIP64 extended information exists,
    // then this information will not be newly added either
    guard let existingInfo = zip64ExtendedInformation else { return nil }
    relativeOffsetOfLocalHeader = offset >= maxOffsetOfLocalFileHeader ? offset : 0
    uncompressedSize = existingInfo.uncompressedSize
    compressedSize = existingInfo.compressedSize
    diskNumberStart = existingInfo.diskNumberStart
    let tempDataSize = [relativeOffsetOfLocalHeader, uncompressedSize, compressedSize]
      .filter { $0 != 0 }
      .reduce(UInt16(0)) { $0 + UInt16(MemoryLayout.size(ofValue: $1)) }
    dataSize = tempDataSize + (diskNumberStart > 0 ? UInt16(MemoryLayout.size(ofValue: diskNumberStart)) : 0)
    if dataSize == 0 { return nil }
  }

  // MARK: Internal

  enum Field {
    case uncompressedSize
    case compressedSize
    case relativeOffsetOfLocalHeader
    case diskNumberStart

    var size: Int {
      switch self {
      case .uncompressedSize, .compressedSize, .relativeOffsetOfLocalHeader:
        return 8
      case .diskNumberStart:
        return 4
      }
    }
  }

  var data: Data {
    var headerID = headerID
    var dataSize = dataSize
    var uncompressedSize = uncompressedSize
    var compressedSize = compressedSize
    var relativeOffsetOfLFH = relativeOffsetOfLocalHeader
    var diskNumberStart = diskNumberStart
    var data = Data()
    withUnsafePointer(to: &headerID) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    withUnsafePointer(to: &dataSize) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    if uncompressedSize != 0 || compressedSize != 0 {
      withUnsafePointer(to: &uncompressedSize) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
      withUnsafePointer(to: &compressedSize) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    }
    if relativeOffsetOfLocalHeader != 0 {
      withUnsafePointer(to: &relativeOffsetOfLFH) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    }
    if diskNumberStart != 0 {
      withUnsafePointer(to: &diskNumberStart) { data.append(UnsafeBufferPointer(start: $0, count: 1)) }
    }
    return data
  }

  static func scanForZIP64Field(in data: Data, fields: [Field]) -> Entry.ZIP64ExtendedInformation? {
    guard data.isEmpty == false else { return nil }
    var offset = 0
    var headerID: UInt16
    var dataSize: UInt16
    let extraFieldLength = data.count
    let headerSize = Int(Entry.ZIP64ExtendedInformation.headerSize)
    while offset < extraFieldLength - headerSize {
      headerID = data.scanValue(start: offset)
      dataSize = data.scanValue(start: offset + 2)
      let nextOffset = offset + headerSize + Int(dataSize)
      guard nextOffset <= extraFieldLength else { return nil }
      if headerID == ExtraFieldHeaderID.zip64ExtendedInformation.rawValue {
        return Entry.ZIP64ExtendedInformation(data: data.subdata(in: offset..<nextOffset), fields: fields)
      }
      offset = nextOffset
    }
    return nil
  }
}
