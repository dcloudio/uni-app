//
// DotLottie.swift
// Lottie
//
// Created by Evandro Harrison Hoffmann on 27/06/2020.
//

import Foundation

// MARK: - DotLottieFile

/// Detailed .lottie file structure
public final class DotLottieFile {

  // MARK: Lifecycle

  /// Loads `DotLottie` from `Data` object containing a compressed animation.
  ///
  /// - Parameters:
  ///  - data: Data of .lottie file
  ///  - filename: Name of .lottie file
  ///  - Returns: Deserialized `DotLottie`. Optional.
  init(data: Data, filename: String) throws {
    fileUrl = DotLottieUtils.tempDirectoryURL.appendingPathComponent(filename.asFilename())
    try decompress(data: data, to: fileUrl)
  }

  // MARK: Public

  /// Definition for a single animation within a `DotLottieFile`
  public struct Animation {
    public let animation: LottieAnimation
    public let configuration: DotLottieConfiguration
  }

  /// List of `LottieAnimation` in the file
  public private(set) var animations: [Animation] = []

  // MARK: Internal

  /// Image provider for animations
  private(set) var imageProvider: DotLottieImageProvider?

  /// Animations folder url
  lazy var animationsUrl: URL = fileUrl.appendingPathComponent("\(DotLottieFile.animationsFolderName)")

  /// All files in animations folder
  lazy var animationUrls: [URL] = FileManager.default.urls(for: animationsUrl) ?? []

  /// Images folder url
  lazy var imagesUrl: URL = fileUrl.appendingPathComponent("\(DotLottieFile.imagesFolderName)")

  /// All images in images folder
  lazy var imageUrls: [URL] = FileManager.default.urls(for: imagesUrl) ?? []

  /// The `LottieAnimation` and `DotLottieConfiguration` for the given animation ID in this file
  func animation(for id: String? = nil) -> DotLottieFile.Animation? {
    if let id {
      return animations.first(where: { $0.configuration.id == id })
    } else {
      return animations.first
    }
  }

  /// The `LottieAnimation` and `DotLottieConfiguration` for the given animation index in this file
  func animation(at index: Int) -> DotLottieFile.Animation? {
    guard index < animations.count else { return nil }
    return animations[index]
  }

  // MARK: Private

  private static let manifestFileName = "manifest.json"
  private static let animationsFolderName = "animations"
  private static let imagesFolderName = "images"

  private let fileUrl: URL

  /// Decompresses .lottie file from `URL` and saves to local temp folder
  ///
  /// - Parameters:
  ///  - url: url to .lottie file
  ///  - destinationURL: url to destination of decompression contents
  private func decompress(from url: URL, to destinationURL: URL) throws {
    try? FileManager.default.removeItem(at: destinationURL)
    try FileManager.default.createDirectory(at: destinationURL, withIntermediateDirectories: true, attributes: nil)
    try FileManager.default.unzipItem(at: url, to: destinationURL)
    try loadContent()
    try? FileManager.default.removeItem(at: destinationURL)
    try? FileManager.default.removeItem(at: url)
  }

  /// Decompresses .lottie file from `Data` and saves to local temp folder
  ///
  /// - Parameters:
  ///  - url: url to .lottie file
  ///  - destinationURL: url to destination of decompression contents
  private func decompress(data: Data, to destinationURL: URL) throws {
    let url = destinationURL.appendingPathExtension("lottie")
    try FileManager.default.createDirectory(at: destinationURL, withIntermediateDirectories: true, attributes: nil)
    try data.write(to: url)
    try decompress(from: url, to: destinationURL)
  }

  /// Loads file content to memory
  private func loadContent() throws {
    imageProvider = DotLottieImageProvider(filepath: imagesUrl)

    animations = try loadManifest().animations.map { dotLottieAnimation in
      let animation = try dotLottieAnimation.animation(url: animationsUrl)
      let configuration = DotLottieConfiguration(
        id: dotLottieAnimation.id,
        loopMode: dotLottieAnimation.loopMode,
        speed: dotLottieAnimation.animationSpeed,
        dotLottieImageProvider: imageProvider)

      return DotLottieFile.Animation(
        animation: animation,
        configuration: configuration)
    }
  }

  private func loadManifest() throws -> DotLottieManifest {
    let path = fileUrl.appendingPathComponent(DotLottieFile.manifestFileName)
    return try DotLottieManifest.load(from: path)
  }
}

extension String {

  // MARK: Fileprivate

  fileprivate func asFilename() -> String {
    lastPathComponent().removingPathExtension()
  }

  // MARK: Private

  private func lastPathComponent() -> String {
    (self as NSString).lastPathComponent
  }

  private func removingPathExtension() -> String {
    (self as NSString).deletingPathExtension
  }
}

// MARK: - DotLottieFile + Sendable

// Mark `DotLottieFile` as `@unchecked Sendable` to allow it to be used when strict concurrency is enabled.
// In the future, it may be necessary to make changes to the internal implementation of `DotLottieFile`
// to make it truly thread-safe.
// swiftlint:disable:next no_unchecked_sendable
extension DotLottieFile: @unchecked Sendable { }
