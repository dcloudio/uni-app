//
// DotLottieUtils.swift
// Lottie
//
// Created by Evandro Harrison Hoffmann on 27/06/2020.
//

import Foundation

// MARK: - DotLottieUtils

enum DotLottieUtils {
  static let dotLottieExtension = "lottie"
  static let jsonExtension = "json"

  /// Temp folder to app directory
  static var tempDirectoryURL: URL {
    if #available(iOS 10.0, macOS 10.12, *) {
      return FileManager.default.temporaryDirectory
    }
    return URL(fileURLWithPath: NSTemporaryDirectory())
  }
}

extension URL {
  /// Checks if url is a lottie file
  var isDotLottie: Bool {
    pathExtension == DotLottieUtils.dotLottieExtension
  }

  /// Checks if url is a json file
  var isJsonFile: Bool {
    pathExtension == DotLottieUtils.jsonExtension
  }

  var urls: [URL] {
    FileManager.default.urls(for: self) ?? []
  }
}

extension FileManager {
  /// Lists urls for all files in a directory
  /// - Parameters:
  ///  - url: URL of directory to search
  ///  - skipsHiddenFiles: If should or not show hidden files
  /// - Returns: Returns urls of all files matching criteria in the directory
  func urls(for url: URL, skipsHiddenFiles: Bool = true) -> [URL]? {
    try? contentsOfDirectory(at: url, includingPropertiesForKeys: nil, options: skipsHiddenFiles ? .skipsHiddenFiles : [])
  }
}

// MARK: - DotLottieError

public enum DotLottieError: Error {
  /// URL response has no data.
  case noDataLoaded
  /// Asset with this name was not found in the provided bundle.
  case assetNotFound(name: String, bundle: Bundle?)
  /// Animation loading from asset is not supported on macOS 10.10.
  case loadingFromAssetNotSupported

  @available(*, deprecated, message: "Unused")
  case invalidFileFormat
  @available(*, deprecated, message: "Unused")
  case invalidData
  @available(*, deprecated, message: "Unused")
  case animationNotAvailable
}
