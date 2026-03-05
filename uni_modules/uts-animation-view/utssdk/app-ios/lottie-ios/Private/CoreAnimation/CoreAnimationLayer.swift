// Created by Cal Stephens on 12/13/21.
// Copyright © 2021 Airbnb Inc. All rights reserved.

import QuartzCore

// MARK: - CoreAnimationLayer

/// The root `CALayer` of the Core Animation rendering engine
final class CoreAnimationLayer: BaseAnimationLayer {

  // MARK: Lifecycle

  /// Initializes a `CALayer` that renders the given animation using `CAAnimation`s.
  ///  - This initializer is throwing, but will only throw when using
  ///    `CompatibilityTracker.Mode.abort`.
  init(
    animation: LottieAnimation,
    imageProvider: AnimationImageProvider,
    textProvider: AnimationKeypathTextProvider,
    fontProvider: AnimationFontProvider,
    maskAnimationToBounds: Bool,
    compatibilityTrackerMode: CompatibilityTracker.Mode,
    logger: LottieLogger)
    throws
  {
    self.animation = animation
    self.imageProvider = imageProvider
    self.textProvider = textProvider
    self.fontProvider = fontProvider
    self.logger = logger
    compatibilityTracker = CompatibilityTracker(mode: compatibilityTrackerMode, logger: logger)
    valueProviderStore = ValueProviderStore(logger: logger)
    super.init()
    masksToBounds = maskAnimationToBounds
    setup()
    try setupChildLayers()
  }

  /// Called by CoreAnimation to create a shadow copy of this layer
  /// More details: https://developer.apple.com/documentation/quartzcore/calayer/1410842-init
  override init(layer: Any) {
    guard let typedLayer = layer as? Self else {
      fatalError("init(layer:) incorrectly called with \(type(of: layer))")
    }

    animation = typedLayer.animation
    currentAnimationConfiguration = typedLayer.currentAnimationConfiguration
    imageProvider = typedLayer.imageProvider
    textProvider = typedLayer.textProvider
    fontProvider = typedLayer.fontProvider
    didSetUpAnimation = typedLayer.didSetUpAnimation
    compatibilityTracker = typedLayer.compatibilityTracker
    logger = typedLayer.logger
    valueProviderStore = typedLayer.valueProviderStore
    super.init(layer: typedLayer)
  }

  required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  // MARK: Internal

  /// Timing-related configuration to apply to this layer's child `CAAnimation`s
  ///  - This is effectively a configurable subset of `CAMediaTiming`
  struct CAMediaTimingConfiguration: Equatable {
    var autoreverses = false
    var repeatCount: Float = 0
    var speed: Float = 1
    var timeOffset: TimeInterval = 0
  }

  enum PlaybackState: Equatable {
    /// The animation is has started playing, and may still be playing.
    ///  - When animating with a finite duration (e.g. `playOnce`), playback
    ///    state will still be `playing` when the animation completes.
    ///    To check if the animation is currently playing, prefer `isAnimationPlaying`.
    case playing
    /// The animation is statically displaying a specific frame
    case paused(frame: AnimationFrameTime)
  }

  /// Configuration used by the `playAnimation` method
  struct AnimationConfiguration: Equatable {
    var animationContext: AnimationContext
    var timingConfiguration: CAMediaTimingConfiguration
    var recordHierarchyKeypath: ((String) -> Void)?

    static func ==(_ lhs: AnimationConfiguration, _ rhs: AnimationConfiguration) -> Bool {
      lhs.animationContext == rhs.animationContext
        && lhs.timingConfiguration == rhs.timingConfiguration
        && ((lhs.recordHierarchyKeypath == nil) == (rhs.recordHierarchyKeypath == nil))
    }
  }

  /// The parent `LottieAnimationLayer` that manages this layer
  weak var lottieAnimationLayer: LottieAnimationLayer?

  /// A closure that is called after this layer sets up its animation.
  /// If the animation setup was unsuccessful and encountered compatibility issues,
  /// those issues are included in this call.
  var didSetUpAnimation: (([CompatibilityIssue]) -> Void)?

  /// The `AnimationImageProvider` that `ImageLayer`s use to retrieve images,
  /// referenced by name in the animation json.
  var imageProvider: AnimationImageProvider {
    didSet { reloadImages() }
  }

  /// The `AnimationKeypathTextProvider` that `TextLayer`'s use to retrieve texts,
  /// that they should use to render their text context
  var textProvider: AnimationKeypathTextProvider {
    didSet {
      // We need to rebuild the current animation after updating the text provider,
      // since this is used in `TextLayer.setupAnimations(context:)`
      rebuildCurrentAnimation()
    }
  }

  /// The `FontProvider` that `TextLayer`s use to retrieve the `CTFont`
  /// that they should use to render their text content
  var fontProvider: AnimationFontProvider {
    didSet { reloadFonts() }
  }

  /// Queues the animation with the given timing configuration
  /// to begin playing at the next `display()` call.
  ///   - This batches together animations so that even if `playAnimation`
  ///     is called multiple times in the same run loop cycle, the animation
  ///     will only be set up a single time.
  func playAnimation(
    configuration: AnimationConfiguration,
    playbackState: PlaybackState = .playing)
  {
    pendingAnimationConfiguration = (
      animationConfiguration: configuration,
      playbackState: playbackState)

    setNeedsDisplay()
  }

  override func layoutSublayers() {
    super.layoutSublayers()

    // If no animation has been set up yet, display the first frame
    // now that the layer hierarchy has been setup and laid out
    if
      pendingAnimationConfiguration == nil,
      currentAnimationConfiguration == nil,
      bounds.size != .zero
    {
      currentFrame = animation.frameTime(forProgress: animationProgress)
    }
  }

  override func display() {
    // We intentionally don't call `super.display()`, since this layer
    // doesn't directly render any content.
    //  - This fixes an issue where certain animations would unexpectedly
    //    allocate a very large amount of memory (400mb+).
    //  - Alternatively this layer could subclass `CATransformLayer`,
    //    but this causes Core Animation to emit unnecessary logs.
    if var pendingAnimationConfiguration {
      pendingAnimationConfigurationModification?(&pendingAnimationConfiguration.animationConfiguration)
      pendingAnimationConfigurationModification = nil
      self.pendingAnimationConfiguration = nil

      do {
        try setupAnimation(for: pendingAnimationConfiguration.animationConfiguration)
      } catch {
        if case CompatibilityTracker.Error.encounteredCompatibilityIssue(let compatibilityIssue) = error {
          // Even though the animation setup failed, we still update the layer's playback state
          // so it can be read by the parent `LottieAnimationView` when handling this error
          currentPlaybackState = pendingAnimationConfiguration.playbackState

          didSetUpAnimation?([compatibilityIssue])
          return
        }
      }

      currentPlaybackState = pendingAnimationConfiguration.playbackState

      compatibilityTracker.reportCompatibilityIssues { compatibilityIssues in
        didSetUpAnimation?(compatibilityIssues)
      }
    }
  }

  // MARK: Private

  /// The configuration for the most recent animation which has been
  /// queued by calling `playAnimation` but not yet actually set up
  private var pendingAnimationConfiguration: (
    animationConfiguration: AnimationConfiguration,
    playbackState: PlaybackState)?

  /// A modification that should be applied to the next animation configuration
  private var pendingAnimationConfigurationModification: ((inout AnimationConfiguration) -> Void)?

  /// Configuration for the animation that is currently setup in this layer
  private var currentAnimationConfiguration: AnimationConfiguration?

  /// The current progress of the placeholder `CAAnimation`,
  /// which is also the realtime animation progress of this layer's animation
  @objc private var animationProgress: CGFloat = 0

  private let animation: LottieAnimation
  private let valueProviderStore: ValueProviderStore
  private let compatibilityTracker: CompatibilityTracker
  private let logger: LottieLogger
  private let loggingState = LoggingState()

  /// The current playback state of the animation that is displayed in this layer
  private var currentPlaybackState: PlaybackState? {
    didSet {
      guard playbackState != oldValue else { return }

      switch playbackState {
      case .playing, nil:
        timeOffset = 0
      case .paused(let frame):
        timeOffset = animation.time(forFrame: frame)
      }
    }
  }

  /// The current or pending playback state of the animation displayed in this layer
  private var playbackState: PlaybackState? {
    pendingAnimationConfiguration?.playbackState ?? currentPlaybackState
  }

  /// Context used when setting up and configuring sublayers
  private var layerContext: LayerContext {
    LayerContext(
      animation: animation,
      imageProvider: imageProvider,
      textProvider: textProvider,
      fontProvider: fontProvider,
      compatibilityTracker: compatibilityTracker,
      layerName: "root layer")
  }

  private func setup() {
    bounds = animation.bounds
  }

  private func setupChildLayers() throws {
    try setupLayerHierarchy(
      for: animation.layers,
      context: layerContext)

    try validateReasonableNumberOfTimeRemappingLayers()
  }

  /// Immediately builds and begins playing `CAAnimation`s for each sublayer
  private func setupAnimation(for configuration: AnimationConfiguration) throws {
    // Remove any existing animations from the layer hierarchy
    removeAnimations()

    currentAnimationConfiguration = configuration

    let layerContext = LayerAnimationContext(
      animation: animation,
      timingConfiguration: configuration.timingConfiguration,
      startFrame: configuration.animationContext.playFrom,
      endFrame: configuration.animationContext.playTo,
      valueProviderStore: valueProviderStore,
      compatibilityTracker: compatibilityTracker,
      logger: logger,
      loggingState: loggingState,
      currentKeypath: AnimationKeypath(keys: []),
      textProvider: textProvider,
      recordHierarchyKeypath: configuration.recordHierarchyKeypath)

    // Perform a layout pass if necessary so all of the sublayers
    // have the most up-to-date sizing information
    layoutIfNeeded()

    // Set the speed of this layer, which will be inherited
    // by all sublayers and their animations.
    //  - This is required to support scrubbing with a speed of 0
    speed = configuration.timingConfiguration.speed

    // Setup a placeholder animation to let us track the realtime animation progress
    setupPlaceholderAnimation(context: layerContext)

    // Set up the new animations with the current `TimingConfiguration`
    for animationLayer in sublayers ?? [] {
      try (animationLayer as? AnimationLayer)?.setupAnimations(context: layerContext)
    }
  }

  /// Sets up a placeholder `CABasicAnimation` that tracks the current
  /// progress of this animation (between 0 and 1). This lets us provide
  /// realtime animation progress via `self.currentFrame`.
  private func setupPlaceholderAnimation(context: LayerAnimationContext) {
    let animationProgressTracker = CABasicAnimation(keyPath: #keyPath(animationProgress))
    animationProgressTracker.fromValue = 0
    animationProgressTracker.toValue = 1

    let timedProgressAnimation = animationProgressTracker.timed(with: context, for: self)
    timedProgressAnimation.delegate = currentAnimationConfiguration?.animationContext.closure

    // Remove the progress animation once complete so we know when the animation
    // has finished playing (if it doesn't loop infinitely)
    timedProgressAnimation.isRemovedOnCompletion = true

    add(timedProgressAnimation, forKey: #keyPath(animationProgress))
  }

  // Removes the current `CAAnimation`s, and rebuilds new animations
  // using the same configuration as the previous animations.
  private func rebuildCurrentAnimation() {
    guard
      // Don't replace any pending animations that are queued to begin
      // on the next run loop cycle, since an existing pending animation
      // will cause the animation to be rebuilt anyway.
      pendingAnimationConfiguration == nil
    else { return }

    if isAnimationPlaying == true {
      lottieAnimationLayer?.updateInFlightAnimation()
    } else {
      let currentFrame = currentFrame
      removeAnimations()
      self.currentFrame = currentFrame
    }
  }

}

// MARK: RootAnimationLayer

extension CoreAnimationLayer: RootAnimationLayer {

  var primaryAnimationKey: AnimationKey {
    .specific(#keyPath(animationProgress))
  }

  /// Whether or not the animation is currently playing.
  ///  - Handles case where CAAnimations with a finite duration animation (e.g. `playOnce`)
  ///    have finished playing but still present on this layer.
  var isAnimationPlaying: Bool? {
    switch pendingAnimationConfiguration?.playbackState {
    case .playing:
      return true
    case .paused:
      return false
    case nil:
      switch playbackState {
      case .playing:
        return animation(forKey: #keyPath(animationProgress)) != nil
      case nil, .paused:
        return false
      }
    }
  }

  /// The current frame of the animation being displayed,
  /// accounting for the realtime progress of any active CAAnimations.
  var currentFrame: AnimationFrameTime {
    get {
      switch playbackState {
      case .paused(let frame):
        return frame

      case .playing, nil:
        // When in the `playing` state, the animation is either actively playing
        // or is completed on the final frame of a non-repeating animation.
        // When a non-repeating animation is complete, `animation(forKey: #keyPath(animationProgress))`
        // is no longer present and the Core-Animation-managed `animationProgress` value is just 0.
        // In that case, since the animation is complete, we just return the final frame that was played to.
        let animationCurrentlyPlaying = animation(forKey: #keyPath(animationProgress)) != nil

        if !animationCurrentlyPlaying, let configuration = currentAnimationConfiguration {
          return configuration.animationContext.playTo
        } else {
          return animation.frameTime(forProgress: (presentation() ?? self).animationProgress)
        }
      }
    }
    set {
      // We can display a specific frame of the animation by setting
      // `timeOffset` of this layer. This requires setting up the layer hierarchy
      // with a specific configuration (speed=0, etc) at least once. But if
      // the layer hierarchy is already set up correctly, we can update the
      // `timeOffset` very cheaply.
      let requiredAnimationConfiguration = AnimationConfiguration(
        animationContext: AnimationContext(
          playFrom: animation.startFrame,
          // Normal animation playback (like when looping) skips the last frame.
          // However when the animation is paused, we need to be able to render the final frame.
          // To allow this we have to extend the length of the animation by one frame.
          playTo: animation.endFrame + 1,
          closure: nil),
        timingConfiguration: CAMediaTimingConfiguration(speed: 0))

      if
        pendingAnimationConfiguration == nil,
        currentAnimationConfiguration == requiredAnimationConfiguration
      {
        currentPlaybackState = .paused(frame: newValue)
      }

      else {
        playAnimation(
          configuration: requiredAnimationConfiguration,
          playbackState: .paused(frame: newValue))
      }
    }
  }

  var renderScale: CGFloat {
    get { contentsScale }
    set {
      contentsScale = newValue

      for sublayer in allSublayers {
        sublayer.contentsScale = newValue
      }
    }
  }

  var respectAnimationFrameRate: Bool {
    get { false }
    set {
      logger.assertionFailure("""
        The Core Animation rendering engine currently doesn't support `respectAnimationFrameRate`)
        """)
    }
  }

  var _animationLayers: [CALayer] {
    (sublayers ?? []).filter { $0 is AnimationLayer }
  }

  func reloadImages() {
    // When the image provider changes, we have to update all `ImageLayer`s
    // so they can query the most up-to-date image from the new image provider.
    for sublayer in allSublayers {
      if let imageLayer = sublayer as? ImageLayer {
        imageLayer.setupImage(context: layerContext)
      }
    }
  }

  func reloadFonts() {
    // When the text provider changes, we have to update all `TextLayer`s
    // so they can query the most up-to-date font from the new font provider.
    for sublayer in allSublayers {
      if let textLayer = sublayer as? TextLayer {
        try? textLayer.configureRenderLayer(with: layerContext)
      }
    }
  }

  func forceDisplayUpdate() {
    // Unimplemented
    //  - We can't call `display()` here, because it would cause unexpected frame animations:
    //    https://github.com/airbnb/lottie-ios/issues/2193
  }

  func logHierarchyKeypaths() {
    for keypath in allHierarchyKeypaths() {
      logger.info(keypath)
    }
  }

  func allHierarchyKeypaths() -> [String] {
    guard pendingAnimationConfiguration?.animationConfiguration ?? currentAnimationConfiguration != nil else {
      logger.info("Cannot log hierarchy keypaths until animation has been set up at least once")
      return []
    }

    logger.info("Lottie: Rebuilding animation with hierarchy keypath logging enabled")

    var allAnimationKeypaths = [String]()
    pendingAnimationConfigurationModification = { configuration in
      configuration.recordHierarchyKeypath = { keypath in
        allAnimationKeypaths.append(keypath)
      }
    }

    rebuildCurrentAnimation()
    displayIfNeeded()

    return allAnimationKeypaths
  }

  func setValueProvider(_ valueProvider: AnyValueProvider, keypath: AnimationKeypath) {
    valueProviderStore.setValueProvider(valueProvider, keypath: keypath)

    // We need to rebuild the current animation after registering a value provider,
    // since any existing `CAAnimation`s could now be out of date.
    rebuildCurrentAnimation()
  }

  func getValue(for _: AnimationKeypath, atFrame _: AnimationFrameTime?) -> Any? {
    logger.assertionFailure("""
      The Core Animation rendering engine doesn't support querying values for individual frames
      """)
    return nil
  }

  func getOriginalValue(for _: AnimationKeypath, atFrame _: AnimationFrameTime?) -> Any? {
    logger.assertionFailure("""
      The Core Animation rendering engine doesn't support querying values for individual frames
      """)
    return nil
  }

  func layer(for _: AnimationKeypath) -> CALayer? {
    logger.assertionFailure("""
      The Core Animation rendering engine doesn't support retrieving `CALayer`s by keypath
      """)
    return nil
  }

  func animatorNodes(for _: AnimationKeypath) -> [AnimatorNode]? {
    logger.assertionFailure("""
      The Core Animation rendering engine does not use `AnimatorNode`s
      """)
    return nil
  }

  func removeAnimations() {
    currentAnimationConfiguration = nil
    currentPlaybackState = nil
    removeAllAnimations()

    for sublayer in allSublayers {
      sublayer.removeAllAnimations()
    }
  }

  /// Time remapping in the Core Animation rendering engine requires manually interpolating
  /// every frame of every animation. For very large animations with a huge number of layers,
  /// this can be prohibitively expensive.
  func validateReasonableNumberOfTimeRemappingLayers() throws {
    try layerContext.compatibilityAssert(
      numberOfLayersWithTimeRemapping < 500,
      """
      This animation has a very large number of layers with time remapping (\(numberOfLayersWithTimeRemapping)),
      so will perform poorly with the Core Animation rendering engine.
      """)
  }

}

// MARK: - CALayer + allSublayers

extension CALayer {
  /// All of the layers in the layer tree that are descendants from this later
  @nonobjc
  var allSublayers: [CALayer] {
    var allSublayers: [CALayer] = []

    for sublayer in sublayers ?? [] {
      allSublayers.append(sublayer)
      allSublayers.append(contentsOf: sublayer.allSublayers)
    }

    return allSublayers
  }

  /// The number of layers in this layer hierarchy that have a time remapping applied
  @nonobjc
  var numberOfLayersWithTimeRemapping: Int {
    var numberOfSublayersWithTimeRemapping = 0

    for sublayer in sublayers ?? [] {
      if 
        let preCompLayer = sublayer as? PreCompLayer,
        preCompLayer.preCompLayer.timeRemapping != nil
      {
        numberOfSublayersWithTimeRemapping += preCompLayer.allSublayers.count
      } else {
        numberOfSublayersWithTimeRemapping += sublayer.numberOfLayersWithTimeRemapping
      }
    }

    return numberOfSublayersWithTimeRemapping
  }
}
