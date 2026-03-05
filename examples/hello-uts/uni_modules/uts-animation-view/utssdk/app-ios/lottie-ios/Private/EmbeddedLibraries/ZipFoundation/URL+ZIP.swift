//
//  URL+ZIP.swift
//  ZIPFoundation
//
//  Copyright © 2017-2021 Thomas Zoechling, https://www.peakstep.com and the ZIP Foundation project authors.
//  Released under the MIT License.
//
//  See https://github.com/weichsel/ZIPFoundation/blob/master/LICENSE for license information.
//

import Foundation

extension URL {

  static func temporaryReplacementDirectoryURL(for archive: Archive) -> URL {
    #if swift(>=5.0) || os(macOS) || os(iOS) || os(watchOS) || os(tvOS)
    if
      archive.url.isFileURL,
      let tempDir = try? FileManager().url(
        for: .itemReplacementDirectory,
        in: .userDomainMask,
        appropriateFor: archive.url,
        create: true)
    {
      return tempDir
    }
    #endif

    return URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent(
      ProcessInfo.processInfo.globallyUniqueString)
  }
}
