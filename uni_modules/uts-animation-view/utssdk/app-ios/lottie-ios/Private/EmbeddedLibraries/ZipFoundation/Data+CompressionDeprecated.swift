//
//  Data+CompressionDeprecated.swift
//  ZIPFoundation
//
//  Copyright © 2017-2021 Thomas Zoechling, https://www.peakstep.com and the ZIP Foundation project authors.
//  Released under the MIT License.
//
//  See https://github.com/weichsel/ZIPFoundation/blob/master/LICENSE for license information.
//

import Foundation

extension Data {

  @available(*, deprecated, message: "Please use `Int64` for `size` and provider `position`.")
  static func compress(
    size: Int,
    bufferSize: Int,
    provider: (_ position: Int, _ size: Int) throws -> Data,
    consumer: Consumer)
    throws -> CRC32
  {
    let newProvider: Provider = { try provider(Int($0), $1) }
    return try compress(size: Int64(size), bufferSize: bufferSize, provider: newProvider, consumer: consumer)
  }

  @available(*, deprecated, message: "Please use `Int64` for `size` and provider `position`.")
  static func decompress(
    size: Int,
    bufferSize: Int,
    skipCRC32: Bool,
    provider: (_ position: Int, _ size: Int) throws -> Data,
    consumer: Consumer)
    throws -> CRC32
  {
    let newProvider: Provider = { try provider(Int($0), $1) }
    return try decompress(
      size: Int64(size),
      bufferSize: bufferSize,
      skipCRC32: skipCRC32,
      provider: newProvider,
      consumer: consumer)
  }
}
