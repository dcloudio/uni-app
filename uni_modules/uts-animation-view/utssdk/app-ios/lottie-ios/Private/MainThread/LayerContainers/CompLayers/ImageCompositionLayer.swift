//
//  ImageCompositionLayer.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/25/19.
//

import QuartzCore

final class ImageCompositionLayer: CompositionLayer {

  // MARK: Lifecycle

  init(imageLayer: ImageLayerModel, size: CGSize) {
    imageReferenceID = imageLayer.referenceID
    super.init(layer: imageLayer, size: size)
    contentsLayer.masksToBounds = true
    contentsLayer.contentsGravity = CALayerContentsGravity.resize
  }

  override init(layer: Any) {
    /// Used for creating shadow model layers. Read More here: https://developer.apple.com/documentation/quartzcore/calayer/1410842-init
    guard let layer = layer as? ImageCompositionLayer else {
      fatalError("init(layer:) Wrong Layer Class")
    }
    imageReferenceID = layer.imageReferenceID
    image = nil
    super.init(layer: layer)
  }

  required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  // MARK: Internal

  let imageReferenceID: String

  var image: CGImage? = nil {
    didSet {
      if let image {
        contentsLayer.contents = image
      } else {
        contentsLayer.contents = nil
      }
    }
  }

  var imageContentsGravity: CALayerContentsGravity = .resize {
    didSet {
      contentsLayer.contentsGravity = imageContentsGravity
    }
  }
}
