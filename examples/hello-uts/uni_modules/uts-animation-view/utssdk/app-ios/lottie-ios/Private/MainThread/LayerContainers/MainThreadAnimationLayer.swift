//
//  MainThreadAnimationLayer.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/24/19.
//

import QuartzCore

// MARK: - MainThreadAnimationLayer

/// The base `CALayer` for the Main Thread rendering engine
///
/// This layer holds a single composition container and allows for animation of
/// the currentFrame property.
final class MainThreadAnimationLayer: CALayer, RootAnimationLayer {

  // MARK: Lifecycle

  init(
    animation: LottieAnimation,
    imageProvider: AnimationImageProvider,
    textProvider: AnimationKeypathTextProvider,
    fontProvider: AnimationFontProvider,
    maskAnimationToBounds: Bool,
    logger: LottieLogger)
  {
    layerImageProvider = LayerImageProvider(imageProvider: imageProvider, assets: animation.assetLibrary?.imageAssets)
    layerTextProvider = LayerTextProvider(textProvider: textProvider)
    layerFontProvider = LayerFontProvider(fontProvider: fontProvider)
    animationLayers = []
    self.logger = logger
    super.init()
    masksToBounds = maskAnimationToBounds
    bounds = animation.bounds
    let layers = animation.layers.initializeCompositionLayers(
      assetLibrary: animation.assetLibrary,
      layerImageProvider: layerImageProvider,
      layerTextProvider: layerTextProvider,
      textProvider: textProvider,
      fontProvider: fontProvider,
      frameRate: CGFloat(animation.framerate),
      rootAnimationLayer: self)

    var imageLayers = [ImageCompositionLayer]()
    var textLayers = [TextCompositionLayer]()

    var mattedLayer: CompositionLayer? = nil

    for layer in layers.reversed() {
      layer.bounds = bounds
      animationLayers.append(layer)
      if let imageLayer = layer as? ImageCompositionLayer {
        imageLayers.append(imageLayer)
      }
      if let textLayer = layer as? TextCompositionLayer {
        textLayers.append(textLayer)
      }
      if let matte = mattedLayer {
        /// The previous layer requires this layer to be its matte
        matte.matteLayer = layer
        mattedLayer = nil
        continue
      }
      if
        let matte = layer.matteType,
        matte == .add || matte == .invert
      {
        /// We have a layer that requires a matte.
        mattedLayer = layer
      }
      addSublayer(layer)
    }

    layerImageProvider.addImageLayers(imageLayers)
    layerImageProvider.reloadImages()
    layerTextProvider.addTextLayers(textLayers)
    layerTextProvider.reloadTexts()
    layerFontProvider.addTextLayers(textLayers)
    layerFontProvider.reloadTexts()
    setNeedsDisplay()
  }

  /// Called by CoreAnimation to create a shadow copy of this layer
  /// More details: https://developer.apple.com/documentation/quartzcore/calayer/1410842-init
  override init(layer: Any) {
    guard let typedLayer = layer as? Self else {
      fatalError("\(Self.self).init(layer:) incorrectly called with \(type(of: layer))")
    }

    animationLayers = []
    layerImageProvider = LayerImageProvider(imageProvider: BlankImageProvider(), assets: nil)
    layerTextProvider = LayerTextProvider(textProvider: DefaultTextProvider())
    layerFontProvider = LayerFontProvider(fontProvider: DefaultFontProvider())
    logger = typedLayer.logger
    super.init(layer: layer)

    currentFrame = typedLayer.currentFrame
  }

  required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  // MARK: Public

  public var respectAnimationFrameRate = false

  // MARK: CALayer Animations

  override public class func needsDisplay(forKey key: String) -> Bool {
    if key == "currentFrame" {
      return true
    }
    return super.needsDisplay(forKey: key)
  }

  override public func action(forKey event: String) -> CAAction? {
    if event == "currentFrame" {
      let animation = CABasicAnimation(keyPath: event)
      animation.timingFunction = CAMediaTimingFunction(name: CAMediaTimingFunctionName.linear)
      animation.fromValue = presentation()?.currentFrame
      return animation
    }
    return super.action(forKey: event)
  }

  public override func display() {
    guard Thread.isMainThread else { return }
    var newFrame: CGFloat
    if
      let animationKeys = animationKeys(),
      !animationKeys.isEmpty
    {
      newFrame = presentation()?.currentFrame ?? currentFrame
    } else {
      // We ignore the presentation's frame if there's no animation in the layer.
      newFrame = currentFrame
    }
    if respectAnimationFrameRate {
      newFrame = floor(newFrame)
    }
    for animationLayer in animationLayers {
      animationLayer.displayWithFrame(frame: newFrame, forceUpdates: forceDisplayUpdateOnEachFrame)
    }
  }

  // MARK: Internal

  /// The animatable Current Frame Property
  @NSManaged var currentFrame: CGFloat

  /// The parent `LottieAnimationLayer` that manages this layer
  weak var lottieAnimationLayer: LottieAnimationLayer?

  /// Whether or not to use `forceDisplayUpdate()` when rendering each individual frame.
  ///  - The main thread rendering engine implements optimizations to decrease the amount
  ///    of properties that have to be re-rendered on each frame. There are some cases
  ///    where this can result in bugs / incorrect behavior, so we allow it to be disabled.
  ///  - Forcing a full render on every frame will decrease performance, and is not recommended
  ///    except as a workaround to a bug in the main thread rendering engine.
  var forceDisplayUpdateOnEachFrame = false

  var animationLayers: ContiguousArray<CompositionLayer>

  var primaryAnimationKey: AnimationKey {
    .managed
  }

  var isAnimationPlaying: Bool? {
    nil // this state is managed by `LottieAnimationView`
  }

  var _animationLayers: [CALayer] {
    Array(animationLayers)
  }

  var imageProvider: AnimationImageProvider {
    get {
      layerImageProvider.imageProvider
    }
    set {
      layerImageProvider.imageProvider = newValue
    }
  }

  var renderScale: CGFloat = 1 {
    didSet {
      for animationLayer in animationLayers {
        animationLayer.renderScale = renderScale
      }
    }
  }

  var textProvider: AnimationKeypathTextProvider {
    get { layerTextProvider.textProvider }
    set { layerTextProvider.textProvider = newValue }
  }

  var fontProvider: AnimationFontProvider {
    get { layerFontProvider.fontProvider }
    set { layerFontProvider.fontProvider = newValue }
  }

  func reloadImages() {
    layerImageProvider.reloadImages()
  }

  func removeAnimations() {
    // no-op, since the primary animation is managed by the `LottieAnimationView`.
  }

  /// Forces the view to update its drawing.
  func forceDisplayUpdate() {
    for animationLayer in animationLayers {
      animationLayer.displayWithFrame(frame: currentFrame, forceUpdates: true)
    }
  }

  func logHierarchyKeypaths() {
    logger.info("Lottie: Logging Animation Keypaths")

    for keypath in allHierarchyKeypaths() {
      logger.info(keypath)
    }
  }

  func allHierarchyKeypaths() -> [String] {
    animationLayers.flatMap { $0.allKeypaths() }
  }

  func setValueProvider(_ valueProvider: AnyValueProvider, keypath: AnimationKeypath) {
    for layer in animationLayers {
      if let foundProperties = layer.nodeProperties(for: keypath) {
        for property in foundProperties {
          property.setProvider(provider: valueProvider)
        }
        layer.displayWithFrame(frame: presentation()?.currentFrame ?? currentFrame, forceUpdates: true)
      }
    }
  }

  func getValue(for keypath: AnimationKeypath, atFrame: CGFloat?) -> Any? {
    for layer in animationLayers {
      if
        let foundProperties = layer.nodeProperties(for: keypath),
        let first = foundProperties.first
      {
        return first.valueProvider.value(frame: atFrame ?? currentFrame)
      }
    }
    return nil
  }

  func getOriginalValue(for keypath: AnimationKeypath, atFrame: AnimationFrameTime?) -> Any? {
    for layer in animationLayers {
      if
        let foundProperties = layer.nodeProperties(for: keypath),
        let first = foundProperties.first
      {
        return first.originalValueProvider.value(frame: atFrame ?? currentFrame)
      }
    }
    return nil
  }

  func layer(for keypath: AnimationKeypath) -> CALayer? {
    for layer in animationLayers {
      if let foundLayer = layer.layer(for: keypath) {
        return foundLayer
      }
    }
    return nil
  }

  func keypath(for layerToFind: CALayer) -> AnimationKeypath? {
    for layer in animationLayers {
      if let foundKeypath = layer.keypath(for: layerToFind) {
        return foundKeypath
      }
    }
    return nil
  }

  func animatorNodes(for keypath: AnimationKeypath) -> [AnimatorNode]? {
    var results = [AnimatorNode]()
    for layer in animationLayers {
      if let nodes = layer.animatorNodes(for: keypath) {
        results.append(contentsOf: nodes)
      }
    }
    if results.count == 0 {
      return nil
    }
    return results
  }

  // MARK: Fileprivate

  fileprivate let layerImageProvider: LayerImageProvider
  fileprivate let layerTextProvider: LayerTextProvider
  fileprivate let layerFontProvider: LayerFontProvider
  fileprivate let logger: LottieLogger
}

// MARK: - BlankImageProvider

private class BlankImageProvider: AnimationImageProvider {
  func imageForAsset(asset _: ImageAsset) -> CGImage? {
    nil
  }
}
