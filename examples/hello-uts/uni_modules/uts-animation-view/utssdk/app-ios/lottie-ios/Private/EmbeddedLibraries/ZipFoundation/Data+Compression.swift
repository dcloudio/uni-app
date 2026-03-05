//
//  Data+Compression.swift
//  ZIPFoundation
//
//  Copyright © 2017-2021 Thomas Zoechling, https://www.peakstep.com and the ZIP Foundation project authors.
//  Released under the MIT License.
//
//  See https://github.com/weichsel/ZIPFoundation/blob/master/LICENSE for license information.
//

import Foundation

#if canImport(zlib)
import zlib
#endif

// MARK: - CompressionMethod

/// The compression method of an `Entry` in a ZIP `Archive`.
enum CompressionMethod: UInt16 {
  /// Indicates that an `Entry` has no compression applied to its contents.
  case none = 0
  /// Indicates that contents of an `Entry` have been compressed with a zlib compatible Deflate algorithm.
  case deflate = 8
}

/// An unsigned 32-Bit Integer representing a checksum.
typealias CRC32 = UInt32
/// A custom handler that consumes a `Data` object containing partial entry data.
/// - Parameters:
///   - data: A chunk of `Data` to consume.
/// - Throws: Can throw to indicate errors during data consumption.
typealias Consumer = (_ data: Data) throws -> Void
/// A custom handler that receives a position and a size that can be used to provide data from an arbitrary source.
/// - Parameters:
///   - position: The current read position.
///   - size: The size of the chunk to provide.
/// - Returns: A chunk of `Data`.
/// - Throws: Can throw to indicate errors in the data source.
typealias Provider = (_ position: Int64, _ size: Int) throws -> Data

extension Data {
  enum CompressionError: Error {
    case invalidStream
    case corruptedData
  }

  /// Compress the output of `provider` and pass it to `consumer`.
  /// - Parameters:
  ///   - size: The uncompressed size of the data to be compressed.
  ///   - bufferSize: The maximum size of the compression buffer.
  ///   - provider: A closure that accepts a position and a chunk size. Returns a `Data` chunk.
  ///   - consumer: A closure that processes the result of the compress operation.
  /// - Returns: The checksum of the processed content.
  static func compress(size: Int64, bufferSize: Int, provider: Provider, consumer: Consumer) throws -> CRC32 {
    #if os(macOS) || canImport(UIKit)
    return try process(
      operation: COMPRESSION_STREAM_ENCODE,
      size: size,
      bufferSize: bufferSize,
      provider: provider,
      consumer: consumer)
    #else
    return try encode(size: size, bufferSize: bufferSize, provider: provider, consumer: consumer)
    #endif
  }

  /// Decompress the output of `provider` and pass it to `consumer`.
  /// - Parameters:
  ///   - size: The compressed size of the data to be decompressed.
  ///   - bufferSize: The maximum size of the decompression buffer.
  ///   - skipCRC32: Optional flag to skip calculation of the CRC32 checksum to improve performance.
  ///   - provider: A closure that accepts a position and a chunk size. Returns a `Data` chunk.
  ///   - consumer: A closure that processes the result of the decompress operation.
  /// - Returns: The checksum of the processed content.
  static func decompress(
    size: Int64,
    bufferSize: Int,
    skipCRC32: Bool,
    provider: Provider,
    consumer: Consumer)
    throws -> CRC32
  {
    #if os(macOS) || canImport(UIKit)
    return try process(
      operation: COMPRESSION_STREAM_DECODE,
      size: size,
      bufferSize: bufferSize,
      skipCRC32: skipCRC32,
      provider: provider,
      consumer: consumer)
    #else
    return try decode(bufferSize: bufferSize, skipCRC32: skipCRC32, provider: provider, consumer: consumer)
    #endif
  }

  /// Calculate the `CRC32` checksum of the receiver.
  ///
  /// - Parameter checksum: The starting seed.
  /// - Returns: The checksum calculated from the bytes of the receiver and the starting seed.
  func crc32(checksum: CRC32) -> CRC32 {
    #if canImport(zlib)
    return withUnsafeBytes { bufferPointer in
      let length = UInt32(count)
      return CRC32(zlib.crc32(UInt(checksum), bufferPointer.bindMemory(to: UInt8.self).baseAddress, length))
    }
    #else
    return builtInCRC32(checksum: checksum)
    #endif
  }

}

// MARK: - Apple Platforms

#if os(macOS) || canImport(UIKit)
import Compression

extension Data {

  static func process(
    operation: compression_stream_operation,
    size: Int64,
    bufferSize: Int,
    skipCRC32: Bool = false,
    provider: Provider,
    consumer: Consumer)
    throws -> CRC32
  {
    var crc32 = CRC32(0)
    let destPointer = UnsafeMutablePointer<UInt8>.allocate(capacity: bufferSize)
    defer { destPointer.deallocate() }
    let streamPointer = UnsafeMutablePointer<compression_stream>.allocate(capacity: 1)
    defer { streamPointer.deallocate() }
    var stream = streamPointer.pointee
    var status = compression_stream_init(&stream, operation, COMPRESSION_ZLIB)
    guard status != COMPRESSION_STATUS_ERROR else { throw CompressionError.invalidStream }
    defer { compression_stream_destroy(&stream) }
    stream.src_size = 0
    stream.dst_ptr = destPointer
    stream.dst_size = bufferSize
    var position: Int64 = 0
    var sourceData: Data?
    repeat {
      let isExhausted = stream.src_size == 0
      if isExhausted {
        do {
          sourceData = try provider(position, Int(Swift.min(size - position, Int64(bufferSize))))
          position += Int64(stream.prepare(for: sourceData))
        } catch { throw error }
      }
      if let sourceData {
        sourceData.withUnsafeBytes { rawBufferPointer in
          if let baseAddress = rawBufferPointer.baseAddress {
            let pointer = baseAddress.assumingMemoryBound(to: UInt8.self)
            stream.src_ptr = pointer.advanced(by: sourceData.count - stream.src_size)
            let flags = sourceData.count < bufferSize ? Int32(COMPRESSION_STREAM_FINALIZE.rawValue) : 0
            status = compression_stream_process(&stream, flags)
          }
        }
        if
          operation == COMPRESSION_STREAM_ENCODE,
          isExhausted, skipCRC32 == false { crc32 = sourceData.crc32(checksum: crc32) }
      }
      switch status {
      case COMPRESSION_STATUS_OK, COMPRESSION_STATUS_END:
        let outputData = Data(bytesNoCopy: destPointer, count: bufferSize - stream.dst_size, deallocator: .none)
        try consumer(outputData)
        if operation == COMPRESSION_STREAM_DECODE, !skipCRC32 { crc32 = outputData.crc32(checksum: crc32) }
        stream.dst_ptr = destPointer
        stream.dst_size = bufferSize
      default: throw CompressionError.corruptedData
      }
    } while status == COMPRESSION_STATUS_OK
    return crc32
  }
}

extension compression_stream {

  fileprivate mutating func prepare(for sourceData: Data?) -> Int {
    guard let sourceData else { return 0 }

    src_size = sourceData.count
    return sourceData.count
  }
}

// MARK: - Linux

#else
import CZlib

extension Data {
  static func encode(size: Int64, bufferSize: Int, provider: Provider, consumer: Consumer) throws -> CRC32 {
    var stream = z_stream()
    let streamSize = Int32(MemoryLayout<z_stream>.size)
    var result = deflateInit2_(
      &stream,
      Z_DEFAULT_COMPRESSION,
      Z_DEFLATED,
      -MAX_WBITS,
      9,
      Z_DEFAULT_STRATEGY,
      ZLIB_VERSION,
      streamSize)
    defer { deflateEnd(&stream) }
    guard result == Z_OK else { throw CompressionError.invalidStream }
    var flush = Z_NO_FLUSH
    var position: Int64 = 0
    var zipCRC32 = CRC32(0)
    repeat {
      let readSize = Int(Swift.min(size - position, Int64(bufferSize)))
      var inputChunk = try provider(position, readSize)
      zipCRC32 = inputChunk.crc32(checksum: zipCRC32)
      stream.avail_in = UInt32(inputChunk.count)
      try inputChunk.withUnsafeMutableBytes { rawBufferPointer in
        if let baseAddress = rawBufferPointer.baseAddress {
          let pointer = baseAddress.assumingMemoryBound(to: UInt8.self)
          stream.next_in = pointer
          flush = position + Int64(bufferSize) >= size ? Z_FINISH : Z_NO_FLUSH
        } else if rawBufferPointer.count > 0 {
          throw CompressionError.corruptedData
        } else {
          stream.next_in = nil
          flush = Z_FINISH
        }
        var outputChunk = Data(count: bufferSize)
        repeat {
          stream.avail_out = UInt32(bufferSize)
          try outputChunk.withUnsafeMutableBytes { rawBufferPointer in
            guard let baseAddress = rawBufferPointer.baseAddress, rawBufferPointer.count > 0 else {
              throw CompressionError.corruptedData
            }
            let pointer = baseAddress.assumingMemoryBound(to: UInt8.self)
            stream.next_out = pointer
            result = deflate(&stream, flush)
          }
          guard result >= Z_OK else { throw CompressionError.corruptedData }

          outputChunk.count = bufferSize - Int(stream.avail_out)
          try consumer(outputChunk)
        } while stream.avail_out == 0
      }
      position += Int64(readSize)
    } while flush != Z_FINISH
    return zipCRC32
  }

  static func decode(bufferSize: Int, skipCRC32: Bool, provider: Provider, consumer: Consumer) throws -> CRC32 {
    var stream = z_stream()
    let streamSize = Int32(MemoryLayout<z_stream>.size)
    var result = inflateInit2_(&stream, -MAX_WBITS, ZLIB_VERSION, streamSize)
    defer { inflateEnd(&stream) }
    guard result == Z_OK else { throw CompressionError.invalidStream }
    var unzipCRC32 = CRC32(0)
    var position: Int64 = 0
    repeat {
      stream.avail_in = UInt32(bufferSize)
      var chunk = try provider(position, bufferSize)
      position += Int64(chunk.count)
      try chunk.withUnsafeMutableBytes { rawBufferPointer in
        if let baseAddress = rawBufferPointer.baseAddress, rawBufferPointer.count > 0 {
          let pointer = baseAddress.assumingMemoryBound(to: UInt8.self)
          stream.next_in = pointer
          repeat {
            var outputData = Data(count: bufferSize)
            stream.avail_out = UInt32(bufferSize)
            try outputData.withUnsafeMutableBytes { rawBufferPointer in
              if let baseAddress = rawBufferPointer.baseAddress, rawBufferPointer.count > 0 {
                let pointer = baseAddress.assumingMemoryBound(to: UInt8.self)
                stream.next_out = pointer
              } else {
                throw CompressionError.corruptedData
              }
              result = inflate(&stream, Z_NO_FLUSH)
              guard
                result != Z_NEED_DICT,
                result != Z_DATA_ERROR,
                result != Z_MEM_ERROR
              else {
                throw CompressionError.corruptedData
              }
            }
            let remainingLength = UInt32(bufferSize) - stream.avail_out
            outputData.count = Int(remainingLength)
            try consumer(outputData)
            if !skipCRC32 { unzipCRC32 = outputData.crc32(checksum: unzipCRC32) }
          } while stream.avail_out == 0
        }
      }
    } while result != Z_STREAM_END
    return unzipCRC32
  }
}

#endif

/// The lookup table used to calculate `CRC32` checksums when using the built-in
/// CRC32 implementation.
private let crcTable: [CRC32] = [
  0x00000000, 0x77073096, 0xee0e612c, 0x990951ba, 0x076dc419, 0x706af48f, 0xe963a535, 0x9e6495a3, 0x0edb8832,
  0x79dcb8a4, 0xe0d5e91e, 0x97d2d988, 0x09b64c2b, 0x7eb17cbd, 0xe7b82d07, 0x90bf1d91, 0x1db71064, 0x6ab020f2,
  0xf3b97148, 0x84be41de, 0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7, 0x136c9856, 0x646ba8c0, 0xfd62f97a,
  0x8a65c9ec, 0x14015c4f, 0x63066cd9, 0xfa0f3d63, 0x8d080df5, 0x3b6e20c8, 0x4c69105e, 0xd56041e4, 0xa2677172,
  0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b, 0x35b5a8fa, 0x42b2986c, 0xdbbbc9d6, 0xacbcf940, 0x32d86ce3,
  0x45df5c75, 0xdcd60dcf, 0xabd13d59, 0x26d930ac, 0x51de003a, 0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423,
  0xcfba9599, 0xb8bda50f, 0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924, 0x2f6f7c87, 0x58684c11, 0xc1611dab,
  0xb6662d3d, 0x76dc4190, 0x01db7106, 0x98d220bc, 0xefd5102a, 0x71b18589, 0x06b6b51f, 0x9fbfe4a5, 0xe8b8d433,
  0x7807c9a2, 0x0f00f934, 0x9609a88e, 0xe10e9818, 0x7f6a0dbb, 0x086d3d2d, 0x91646c97, 0xe6635c01, 0x6b6b51f4,
  0x1c6c6162, 0x856530d8, 0xf262004e, 0x6c0695ed, 0x1b01a57b, 0x8208f4c1, 0xf50fc457, 0x65b0d9c6, 0x12b7e950,
  0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3, 0xfbd44c65, 0x4db26158, 0x3ab551ce, 0xa3bc0074,
  0xd4bb30e2, 0x4adfa541, 0x3dd895d7, 0xa4d1c46d, 0xd3d6f4fb, 0x4369e96a, 0x346ed9fc, 0xad678846, 0xda60b8d0,
  0x44042d73, 0x33031de5, 0xaa0a4c5f, 0xdd0d7cc9, 0x5005713c, 0x270241aa, 0xbe0b1010, 0xc90c2086, 0x5768b525,
  0x206f85b3, 0xb966d409, 0xce61e49f, 0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17, 0x2eb40d81,
  0xb7bd5c3b, 0xc0ba6cad, 0xedb88320, 0x9abfb3b6, 0x03b6e20c, 0x74b1d29a, 0xead54739, 0x9dd277af, 0x04db2615,
  0x73dc1683, 0xe3630b12, 0x94643b84, 0x0d6d6a3e, 0x7a6a5aa8, 0xe40ecf0b, 0x9309ff9d, 0x0a00ae27, 0x7d079eb1,
  0xf00f9344, 0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb, 0x196c3671, 0x6e6b06e7, 0xfed41b76,
  0x89d32be0, 0x10da7a5a, 0x67dd4acc, 0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5, 0xd6d6a3e8, 0xa1d1937e,
  0x38d8c2c4, 0x4fdff252, 0xd1bb67f1, 0xa6bc5767, 0x3fb506dd, 0x48b2364b, 0xd80d2bda, 0xaf0a1b4c, 0x36034af6,
  0x41047a60, 0xdf60efc3, 0xa867df55, 0x316e8eef, 0x4669be79, 0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236,
  0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 0xc5ba3bbe, 0xb2bd0b28, 0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7,
  0xb5d0cf31, 0x2cd99e8b, 0x5bdeae1d, 0x9b64c2b0, 0xec63f226, 0x756aa39c, 0x026d930a, 0x9c0906a9, 0xeb0e363f,
  0x72076785, 0x05005713, 0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0x0cb61b38, 0x92d28e9b, 0xe5d5be0d, 0x7cdcefb7,
  0x0bdbdf21, 0x86d3d2d4, 0xf1d4e242, 0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1, 0x18b74777,
  0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c, 0x8f659eff, 0xf862ae69, 0x616bffd3, 0x166ccf45, 0xa00ae278,
  0xd70dd2ee, 0x4e048354, 0x3903b3c2, 0xa7672661, 0xd06016f7, 0x4969474d, 0x3e6e77db, 0xaed16a4a, 0xd9d65adc,
  0x40df0b66, 0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9, 0xbdbdf21c, 0xcabac28a, 0x53b39330,
  0x24b4a3a6, 0xbad03605, 0xcdd70693, 0x54de5729, 0x23d967bf, 0xb3667a2e, 0xc4614ab8, 0x5d681b02, 0x2a6f2b94,
  0xb40bbe37, 0xc30c8ea1, 0x5a05df1b, 0x2d02ef8d,
]

extension Data {

  /// Lookup table-based CRC32 implenetation that is used
  /// if `zlib` isn't available.
  /// - Parameter checksum: Running checksum or `0` for the initial run.
  /// - Returns: The calculated checksum of the receiver.
  func builtInCRC32(checksum: CRC32) -> CRC32 {
    // The typecast is necessary on 32-bit platforms because of
    // https://bugs.swift.org/browse/SR-1774
    let mask = 0xffffffff as CRC32
    var result = checksum ^ mask
    #if swift(>=5.0)
    crcTable.withUnsafeBufferPointer { crcTablePointer in
      self.withUnsafeBytes { bufferPointer in
        var bufferIndex = 0
        while bufferIndex < self.count {
          let byte = bufferPointer[bufferIndex]
          let index = Int((result ^ CRC32(byte)) & 0xff)
          result = (result >> 8) ^ crcTablePointer[index]
          bufferIndex += 1
        }
      }
    }
    #else
    withUnsafeBytes { bytes in
      let bins = stride(from: 0, to: self.count, by: 256)
      for bin in bins {
        for binIndex in 0..<256 {
          let byteIndex = bin + binIndex
          guard byteIndex < self.count else { break }

          let byte = bytes[byteIndex]
          let index = Int((result ^ CRC32(byte)) & 0xff)
          result = (result >> 8) ^ crcTable[index]
        }
      }
    }
    #endif
    return result ^ mask
  }
}

#if !swift(>=5.0)

// Since Swift 5.0, `Data.withUnsafeBytes()` passes an `UnsafeRawBufferPointer` instead of an `UnsafePointer<UInt8>`
// into `body`.
// We provide a compatible method for targets that use Swift 4.x so that we can use the new version
// across all language versions.

extension Data {
  func withUnsafeBytes<T>(_ body: (UnsafeRawBufferPointer) throws -> T) rethrows -> T {
    let count = count
    return try withUnsafeBytes { (pointer: UnsafePointer<UInt8>) throws -> T in
      try body(UnsafeRawBufferPointer(start: pointer, count: count))
    }
  }

  #if os(macOS) || os(iOS) || os(watchOS) || os(tvOS)
  #else
  mutating func withUnsafeMutableBytes<T>(_ body: (UnsafeMutableRawBufferPointer) throws -> T) rethrows -> T {
    let count = count
    guard count > 0 else {
      return try body(UnsafeMutableRawBufferPointer(start: nil, count: count))
    }
    return try withUnsafeMutableBytes { (pointer: UnsafeMutablePointer<UInt8>) throws -> T in
      try body(UnsafeMutableRawBufferPointer(start: pointer, count: count))
    }
  }
  #endif
}
#endif
