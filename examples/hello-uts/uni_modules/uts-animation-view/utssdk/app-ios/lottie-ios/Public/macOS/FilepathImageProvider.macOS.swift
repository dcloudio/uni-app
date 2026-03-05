//
//  FilepathImageProvider.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 2/1/19.
//

#if os(macOS)
import AppKit

/// An `AnimationImageProvider` that provides images by name from a specific filepath.
public class FilepathImageProvider: AnimationImageProvider {

  // MARK: Lifecycle

  /// Initializes an image provider with a specific filepath.
  ///
  /// - Parameter filepath: The absolute filepath containing the images.
  /// - Parameter contentsGravity: The contents gravity to use when rendering the images.
  ///
  public init(filepath: String, contentsGravity: CALayerContentsGravity = .resize) {
    self.filepath = URL(fileURLWithPath: filepath)
    self.contentsGravity = contentsGravity
  }

  /// Initializes an image provider with a specific filepath.
  ///
  /// - Parameter filepath: The absolute filepath containing the images.
  /// - Parameter contentsGravity: The contents gravity to use when rendering the images.
  ///
  public init(filepath: URL, contentsGravity: CALayerContentsGravity = .resize) {
    self.filepath = filepath
    self.contentsGravity = contentsGravity
  }

  // MARK: Public

  public func imageForAsset(asset: ImageAsset) -> CGImage? {
    if
      asset.name.hasPrefix("data:"),
      let url = URL(string: asset.name),
      let data = try? Data(contentsOf: url),
      let image = NSImage(data: data)
    {
      return image.lottie_CGImage
    }

    let directPath = filepath.appendingPathComponent(asset.name).path
    if FileManager.default.fileExists(atPath: directPath) {
      return NSImage(contentsOfFile: directPath)?.lottie_CGImage
    }

    let pathWithDirectory = filepath.appendingPathComponent(asset.directory).appendingPathComponent(asset.name).path
    if FileManager.default.fileExists(atPath: pathWithDirectory) {
      return NSImage(contentsOfFile: pathWithDirectory)?.lottie_CGImage
    }

    LottieLogger.shared.warn("Could not find image \"\(asset.name)\" in bundle")
    return nil
  }

  public func contentsGravity(for _: ImageAsset) -> CALayerContentsGravity {
    contentsGravity
  }

  // MARK: Internal

  let filepath: URL
  let contentsGravity: CALayerContentsGravity
}

extension FilepathImageProvider: Equatable {
  public static func ==(_ lhs: FilepathImageProvider, _ rhs: FilepathImageProvider) -> Bool {
    lhs.filepath == rhs.filepath
  }
}

extension NSImage {
  @nonobjc
  var lottie_CGImage: CGImage? {
    guard let imageData = tiffRepresentation else { return nil }
    guard let sourceData = CGImageSourceCreateWithData(imageData as CFData, nil) else { return nil }
    return CGImageSourceCreateImageAtIndex(sourceData, 0, nil)
  }
}
#endif
