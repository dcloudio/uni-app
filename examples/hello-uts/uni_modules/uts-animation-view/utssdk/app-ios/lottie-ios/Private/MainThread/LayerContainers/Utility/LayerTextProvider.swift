//
//  LayerTextProvider.swift
//  lottie-ios-iOS
//
//  Created by Alexandr Goncharov on 07/06/2019.
//

/// Connects a LottieTextProvider to a group of text layers
final class LayerTextProvider {

  // MARK: Lifecycle

  init(textProvider: AnimationKeypathTextProvider) {
    self.textProvider = textProvider
    textLayers = []
    reloadTexts()
  }

  // MARK: Internal

  private(set) var textLayers: [TextCompositionLayer]

  var textProvider: AnimationKeypathTextProvider {
    didSet {
      reloadTexts()
    }
  }

  func addTextLayers(_ layers: [TextCompositionLayer]) {
    textLayers += layers
  }

  func reloadTexts() {
    for textLayer in textLayers {
      textLayer.textProvider = textProvider
    }
  }
}
