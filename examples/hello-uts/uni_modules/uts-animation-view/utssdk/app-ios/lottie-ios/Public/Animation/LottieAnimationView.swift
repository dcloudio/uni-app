//
//  LottieAnimationView.swift
//  lottie-swift
//
//  Created by Brandon Withrow on 1/23/19.
//

import QuartzCore

// MARK: - LottieBackgroundBehavior

/// Describes the behavior of an AnimationView when the app is moved to the background.
public enum LottieBackgroundBehavior {
  /// Stop the animation and reset it to the beginning of its current play time. The completion block is called.
  case stop

  /// Pause the animation in its current state. The completion block is called.
  case pause

  /// Pause the animation and restart it when the application moves to the foreground.
  /// The completion block is stored and called when the animation completes.
  ///  - This is the default when using the Main Thread rendering engine.
  case pauseAndRestore

  /// Stops the animation and sets it to the end of its current play time. The completion block is called.
  case forceFinish

  /// The animation continues playing in the background.
  ///  - This is the default when using the Core Animation rendering engine.
  ///    Playing an animation using the Core Animation engine doesn't come with any CPU overhead,
  ///    so using `.continuePlaying` avoids the need to stop and then resume the animation
  ///    (which does come with some CPU overhead).
  ///  - This mode should not be used with the Main Thread rendering engine.
  case continuePlaying

  // MARK: Public

  /// The default background behavior, based on the rendering engine being used to play the animation.
  ///  - Playing an animation using the Main Thread rendering engine comes with CPU overhead,
  ///    so the animation should be paused or stopped when the `LottieAnimationView` is not visible.
  ///  - Playing an animation using the Core Animation rendering engine does not come with any
  ///    CPU overhead, so these animations do not need to be paused in the background.
  public static func `default`(for renderingEngine: RenderingEngine) -> LottieBackgroundBehavior {
    switch renderingEngine {
    case .mainThread:
      return .pauseAndRestore
    case .coreAnimation:
      return .continuePlaying
    }
  }
}

// MARK: - LottieLoopMode

/// Defines animation loop behavior
public enum LottieLoopMode: Hashable {
  /// Animation is played once then stops.
  case playOnce
  /// Animation will loop from beginning to end until stopped.
  case loop
  /// Animation will play forward, then backwards and loop until stopped.
  case autoReverse
  /// Animation will loop from beginning to end up to defined amount of times.
  case `repeat`(Float)
  /// Animation will play forward, then backwards a defined amount of times.
  case repeatBackwards(Float)
}

// MARK: Equatable

extension LottieLoopMode: Equatable {
  public static func == (lhs: LottieLoopMode, rhs: LottieLoopMode) -> Bool {
    switch (lhs, rhs) {
    case (.repeat(let lhsAmount), .repeat(let rhsAmount)),
         (.repeatBackwards(let lhsAmount), .repeatBackwards(let rhsAmount)):
      return lhsAmount == rhsAmount
    case (.playOnce, .playOnce),
         (.loop, .loop),
         (.autoReverse, .autoReverse):
      return true
    default:
      return false
    }
  }
}

// MARK: - LottieAnimationView

/// A UIView subclass for rendering Lottie animations.
///  - Also available as a SwiftUI view (`LottieView`) and a CALayer subclass (`LottieAnimationLayer`)
@IBDesignable
open class LottieAnimationView: LottieAnimationViewBase {

  // MARK: Lifecycle

  // MARK: - Public (Initializers)

  /// Initializes an AnimationView with an animation.
  public init(
    animation: LottieAnimation?,
    imageProvider: AnimationImageProvider? = nil,
    textProvider: AnimationKeypathTextProvider = DefaultTextProvider(),
    fontProvider: AnimationFontProvider = DefaultFontProvider(),
    configuration: LottieConfiguration = .shared,
    logger: LottieLogger = .shared)
  {
    lottieAnimationLayer = LottieAnimationLayer(
      animation: animation,
      imageProvider: imageProvider,
      textProvider: textProvider,
      fontProvider: fontProvider,
      configuration: configuration,
      logger: logger)
    self.logger = logger
    super.init(frame: .zero)
    commonInit()
    if let animation {
      frame = animation.bounds
    }
  }

  /// Initializes an AnimationView with a .lottie file.
  public init(
    dotLottie: DotLottieFile?,
    animationId: String? = nil,
    textProvider: AnimationKeypathTextProvider = DefaultTextProvider(),
    fontProvider: AnimationFontProvider = DefaultFontProvider(),
    configuration: LottieConfiguration = .shared,
    logger: LottieLogger = .shared)
  {
    lottieAnimationLayer = LottieAnimationLayer(
      dotLottie: dotLottie,
      animationId: animationId,
      textProvider: textProvider,
      fontProvider: fontProvider,
      configuration: configuration,
      logger: logger)
    self.logger = logger
    super.init(frame: .zero)
    commonInit()
    if let animation {
      frame = animation.bounds
    }
  }

  public init(
    configuration: LottieConfiguration = .shared,
    logger: LottieLogger = .shared)
  {
    lottieAnimationLayer = LottieAnimationLayer(configuration: configuration, logger: logger)
    self.logger = logger
    super.init(frame: .zero)
    commonInit()
  }

  public override init(frame: CGRect) {
    lottieAnimationLayer = LottieAnimationLayer(
      animation: nil,
      imageProvider: BundleImageProvider(bundle: Bundle.main, searchPath: nil),
      textProvider: DefaultTextProvider(),
      fontProvider: DefaultFontProvider(),
      configuration: .shared,
      logger: .shared)
    logger = .shared
    super.init(frame: frame)
    commonInit()
  }

  required public init?(coder aDecoder: NSCoder) {
    lottieAnimationLayer = LottieAnimationLayer(
      animation: nil,
      imageProvider: BundleImageProvider(bundle: Bundle.main, searchPath: nil),
      textProvider: DefaultTextProvider(),
      fontProvider: DefaultFontProvider(),
      configuration: .shared,
      logger: .shared)
    logger = .shared
    super.init(coder: aDecoder)
    commonInit()
  }

  convenience init(
    animationSource: LottieAnimationSource?,
    imageProvider: AnimationImageProvider? = nil,
    textProvider: AnimationKeypathTextProvider = DefaultTextProvider(),
    fontProvider: AnimationFontProvider = DefaultFontProvider(),
    configuration: LottieConfiguration = .shared,
    logger: LottieLogger = .shared)
  {
    switch animationSource {
    case .lottieAnimation(let animation):
      self.init(
        animation: animation,
        imageProvider: imageProvider,
        textProvider: textProvider,
        fontProvider: fontProvider,
        configuration: configuration,
        logger: logger)

    case .dotLottieFile(let dotLottieFile):
      self.init(
        dotLottie: dotLottieFile,
        textProvider: textProvider,
        fontProvider: fontProvider,
        configuration: configuration,
        logger: logger)

    case nil:
      self.init(
        animation: nil,
        imageProvider: imageProvider,
        textProvider: textProvider,
        fontProvider: fontProvider,
        configuration: configuration,
        logger: logger)
    }
  }

  // MARK: Open

  /// Applies the given `LottiePlaybackMode` to this layer.
  /// - Parameter completion: A closure that is called after
  ///   an animation triggered by this method completes.
  open func play(_ mode: LottiePlaybackMode.PlaybackMode, completion: LottieCompletionBlock? = nil) {
    lottieAnimationLayer.play(mode, completion: completion)
  }

  /// Plays the animation from its current state to the end.
  ///
  /// - Parameter completion: An optional completion closure to be called when the animation completes playing.
  open func play(completion: LottieCompletionBlock? = nil) {
    lottieAnimationLayer.play(completion: completion)
  }

  /// Plays the animation from a progress (0-1) to a progress (0-1).
  ///
  /// - Parameter fromProgress: The start progress of the animation. If `nil` the animation will start at the current progress.
  /// - Parameter toProgress: The end progress of the animation.
  /// - Parameter loopMode: The loop behavior of the animation. If `nil` the view's `loopMode` property will be used.
  /// - Parameter completion: An optional completion closure to be called when the animation stops.
  open func play(
    fromProgress: AnimationProgressTime? = nil,
    toProgress: AnimationProgressTime,
    loopMode: LottieLoopMode? = nil,
    completion: LottieCompletionBlock? = nil)
  {
    lottieAnimationLayer.play(fromProgress: fromProgress, toProgress: toProgress, loopMode: loopMode, completion: completion)
  }

  /// Plays the animation from a start frame to an end frame in the animation's framerate.
  ///
  /// - Parameter fromFrame: The start frame of the animation. If `nil` the animation will start at the current frame.
  /// - Parameter toFrame: The end frame of the animation.
  /// - Parameter loopMode: The loop behavior of the animation. If `nil` the view's `loopMode` property will be used.
  /// - Parameter completion: An optional completion closure to be called when the animation stops.
  open func play(
    fromFrame: AnimationFrameTime? = nil,
    toFrame: AnimationFrameTime,
    loopMode: LottieLoopMode? = nil,
    completion: LottieCompletionBlock? = nil)
  {
    lottieAnimationLayer.play(fromFrame: fromFrame, toFrame: toFrame, loopMode: loopMode, completion: completion)
  }

  /// Plays the animation from a named marker to another marker.
  ///
  /// Markers are point in time that are encoded into the Animation data and assigned
  /// a name.
  ///
  /// NOTE: If markers are not found the play command will exit.
  ///
  /// - Parameter fromMarker: The start marker for the animation playback. If `nil` the
  /// animation will start at the current progress.
  /// - Parameter toMarker: The end marker for the animation playback.
  /// - Parameter playEndMarkerFrame: A flag to determine whether or not to play the frame of the end marker. If the
  /// end marker represents the end of the section to play, it should be to true. If the provided end marker
  /// represents the beginning of the next section, it should be false.
  /// - Parameter loopMode: The loop behavior of the animation. If `nil` the view's `loopMode` property will be used.
  /// - Parameter completion: An optional completion closure to be called when the animation stops.
  open func play(
    fromMarker: String? = nil,
    toMarker: String,
    playEndMarkerFrame: Bool = true,
    loopMode: LottieLoopMode? = nil,
    completion: LottieCompletionBlock? = nil)
  {
    lottieAnimationLayer.play(
      fromMarker: fromMarker,
      toMarker: toMarker,
      playEndMarkerFrame: playEndMarkerFrame,
      loopMode: loopMode,
      completion: completion)
  }

  /// Plays the animation from a named marker to the end of the marker's duration.
  ///
  /// A marker is a point in time with an associated duration that is encoded into the
  /// animation data and assigned a name.
  ///
  /// NOTE: If marker is not found the play command will exit.
  ///
  /// - Parameter marker: The start marker for the animation playback.
  /// - Parameter loopMode: The loop behavior of the animation. If `nil` the view's `loopMode` property will be used.
  /// - Parameter completion: An optional completion closure to be called when the animation stops.
  open func play(
    marker: String,
    loopMode: LottieLoopMode? = nil,
    completion: LottieCompletionBlock? = nil)
  {
    lottieAnimationLayer.play(marker: marker, loopMode: loopMode, completion: completion)
  }

  /// Plays the given markers sequentially in order.
  ///
  /// A marker is a point in time with an associated duration that is encoded into the
  /// animation data and assigned a name. Multiple markers can be played sequentially
  /// to create programmable animations.
  ///
  /// If a marker is not found, it will be skipped.
  ///
  /// If a marker doesn't have a duration value, it will play with a duration of 0
  /// (effectively being skipped).
  ///
  /// If another animation is played (by calling any `play` method) while this
  /// marker sequence is playing, the marker sequence will be cancelled.
  ///
  /// - Parameter markers: The list of markers to play sequentially.
  /// - Parameter completion: An optional completion closure to be called when the animation stops.
  open func play(
    markers: [String],
    completion: LottieCompletionBlock? = nil)
  {
    lottieAnimationLayer.play(markers: markers, completion: completion)
  }

  /// Stops the animation and resets the view to its start frame.
  ///
  /// The completion closure will be called with `false`
  open func stop() {
    lottieAnimationLayer.stop()
  }

  /// Pauses the animation in its current state.
  ///
  /// The completion closure will be called with `false`
  open func pause() {
    lottieAnimationLayer.pause()
  }

  @available(*, deprecated, renamed: "setPlaybackMode(_:completion:)", message: "Will be removed in a future major release.")
  open func play(
    _ playbackMode: LottiePlaybackMode,
    animationCompletionHandler: LottieCompletionBlock? = nil)
  {
    lottieAnimationLayer.setPlaybackMode(playbackMode, completion: animationCompletionHandler)
  }

  /// Applies the given `LottiePlaybackMode` to this layer.
  /// - Parameter completion: A closure that is called after
  ///   an animation triggered by this method completes.
  open func setPlaybackMode(
    _ playbackMode: LottiePlaybackMode,
    completion: LottieCompletionBlock? = nil)
  {
    lottieAnimationLayer.setPlaybackMode(playbackMode, completion: completion)
  }

  // MARK: Public

  /// Whether or not transform and position changes of the view should animate alongside
  /// any existing animation context.
  ///  - Defaults to `true` which will grab the current animation context and animate position and
  ///    transform changes matching the current context's curve and duration.
  ///    `false` will cause transform and position changes to happen unanimated
  public var animateLayoutChangesWithCurrentCoreAnimationContext = true

  /// The configuration that this `LottieAnimationView` uses when playing its animation
  public var configuration: LottieConfiguration {
    get { lottieAnimationLayer.configuration }
    set { lottieAnimationLayer.configuration = newValue }
  }

  /// Value Providers that have been registered using `setValueProvider(_:keypath:)`
  public var valueProviders: [AnimationKeypath: AnyValueProvider] {
    lottieAnimationLayer.valueProviders
  }

  /// Describes the behavior of an AnimationView when the app is moved to the background.
  ///
  /// The default for the Main Thread animation engine is `pause`,
  /// which pauses the animation when the application moves to
  /// the background. This prevents the animation from consuming CPU
  /// resources when not on-screen. The completion block is called with
  /// `false` for completed.
  ///
  /// The default for the Core Animation engine is `continuePlaying`,
  /// since the Core Animation engine does not have any CPU overhead.
  public var backgroundBehavior: LottieBackgroundBehavior {
    get { lottieAnimationLayer.backgroundBehavior }
    set { lottieAnimationLayer.backgroundBehavior = newValue }
  }

  /// Sets the animation backing the animation view. Setting this will clear the
  /// view's contents, completion blocks and current state. The new animation will
  /// be loaded up and set to the beginning of its timeline.
  public var animation: LottieAnimation? {
    get { lottieAnimationLayer.animation }
    set { lottieAnimationLayer.animation = newValue }
  }

  /// A closure that is called when `self.animation` is loaded. When setting this closure,
  /// it is called immediately if `self.animation` is non-nil.
  ///
  /// When initializing a `LottieAnimationView`, the animation will either be loaded
  /// synchronously (when loading a `LottieAnimation` from a .json file on disk)
  /// or asynchronously (when loading a `DotLottieFile` from disk, or downloading
  /// an animation from a URL). This closure is called in both cases once the
  /// animation is loaded and applied, so can be a useful way to configure this
  /// `LottieAnimationView` regardless of which initializer was used. For example:
  ///
  /// ```
  /// let animationView: LottieAnimationView
  ///
  /// if loadDotLottieFile {
  ///   // Loads the .lottie file asynchronously
  ///   animationView = LottieAnimationView(dotLottieName: "animation")
  /// } else {
  ///   // Loads the .json file synchronously
  ///   animationView = LottieAnimationView(name: "animation")
  /// }
  ///
  /// animationView.animationLoaded = { animationView, animation in
  ///   // If using a .lottie file, this is called once the file finishes loading.
  ///   // If using a .json file, this is called immediately (since the animation is loaded synchronously).
  ///   animationView.play()
  /// }
  /// ```
  public var animationLoaded: ((_ animationView: LottieAnimationView, _ animation: LottieAnimation) -> Void)? {
    didSet {
      if let animation {
        animationLoaded?(self, animation)
      }
    }
  }

  /// Sets the image provider for the animation view. An image provider provides the
  /// animation with its required image data.
  ///
  /// Setting this will cause the animation to reload its image contents.
  public var imageProvider: AnimationImageProvider {
    get { lottieAnimationLayer.imageProvider }
    set { lottieAnimationLayer.imageProvider = newValue }
  }

  /// Sets the text provider for animation view. A text provider provides the
  /// animation with values for text layers
  public var textProvider: AnimationKeypathTextProvider {
    get { lottieAnimationLayer.textProvider }
    set { lottieAnimationLayer.textProvider = newValue }
  }

  /// Sets the text provider for animation view. A text provider provides the
  /// animation with values for text layers
  public var fontProvider: AnimationFontProvider {
    get { lottieAnimationLayer.fontProvider }
    set { lottieAnimationLayer.fontProvider = newValue }
  }

  /// Whether or not the animation is masked to the bounds. Defaults to true.
  public var maskAnimationToBounds: Bool {
    get { lottieAnimationLayer.maskAnimationToBounds }
    set { lottieAnimationLayer.maskAnimationToBounds = newValue }
  }

  /// Returns `true` if the animation is currently playing.
  public var isAnimationPlaying: Bool {
    lottieAnimationLayer.isAnimationPlaying
  }

  /// Returns `true` if the animation will start playing when this view is added to a window.
  public var isAnimationQueued: Bool {
    lottieAnimationLayer.hasAnimationContext && waitingToPlayAnimation
  }

  /// Sets the loop behavior for `play` calls. Defaults to `playOnce`
  public var loopMode: LottieLoopMode {
    get { lottieAnimationLayer.loopMode }
    set { lottieAnimationLayer.loopMode = newValue }
  }

  /// When `true` the animation view will rasterize its contents when not animating.
  /// Rasterizing will improve performance of static animations.
  ///
  /// Note: this will not produce crisp results at resolutions above the animations natural resolution.
  ///
  /// Defaults to `false`
  public var shouldRasterizeWhenIdle: Bool {
    get { lottieAnimationLayer.shouldRasterizeWhenIdle }
    set { lottieAnimationLayer.shouldRasterizeWhenIdle = newValue }
  }

  /// Sets the current animation time with a Progress Time
  ///
  /// Note: Setting this will stop the current animation, if any.
  /// Note 2: If `animation` is nil, setting this will fallback to 0
  public var currentProgress: AnimationProgressTime {
    get { lottieAnimationLayer.currentProgress }
    set { lottieAnimationLayer.currentProgress = newValue }
  }

  /// Sets the current animation time with a time in seconds.
  ///
  /// Note: Setting this will stop the current animation, if any.
  /// Note 2: If `animation` is nil, setting this will fallback to 0
  public var currentTime: TimeInterval {
    get { lottieAnimationLayer.currentTime }
    set { lottieAnimationLayer.currentTime = newValue }
  }

  /// Sets the current animation time with a frame in the animations framerate.
  ///
  /// Note: Setting this will stop the current animation, if any.
  public var currentFrame: AnimationFrameTime {
    get { lottieAnimationLayer.currentFrame }
    set { lottieAnimationLayer.currentFrame = newValue }
  }

  /// Returns the current animation frame while an animation is playing.
  public var realtimeAnimationFrame: AnimationFrameTime {
    lottieAnimationLayer.realtimeAnimationFrame
  }

  /// Returns the current animation frame while an animation is playing.
  public var realtimeAnimationProgress: AnimationProgressTime {
    lottieAnimationLayer.realtimeAnimationProgress
  }

  /// Sets the speed of the animation playback. Defaults to 1
  public var animationSpeed: CGFloat {
    get { lottieAnimationLayer.animationSpeed }
    set { lottieAnimationLayer.animationSpeed = newValue }
  }

  /// When `true` the animation will play back at the framerate encoded in the
  /// `LottieAnimation` model. When `false` the animation will play at the framerate
  /// of the device.
  ///
  /// Defaults to false
  public var respectAnimationFrameRate: Bool {
    get { lottieAnimationLayer.respectAnimationFrameRate }
    set { lottieAnimationLayer.respectAnimationFrameRate = newValue }
  }

  /// Controls the cropping of an Animation. Setting this property will crop the animation
  /// to the current views bounds by the viewport frame. The coordinate space is specified
  /// in the animation's coordinate space.
  ///
  /// Animatable.
  public var viewportFrame: CGRect? {
    didSet {
      // This is really ugly, but is needed to trigger a layout pass within an animation block.
      // Typically this happens automatically, when layout objects are UIView based.
      // The animation layer is a CALayer which will not implicitly grab the animation
      // duration of a UIView animation block.
      //
      // By setting bounds and then resetting bounds the UIView animation block's
      // duration and curve are captured and added to the layer. This is used in the
      // layout block to animate the animationLayer's position and size.
      let rect = bounds
      self.bounds = CGRect.zero
      self.bounds = rect
      self.setNeedsLayout()
    }
  }

  override public var intrinsicContentSize: CGSize {
    if let animation = lottieAnimationLayer.animation {
      return animation.bounds.size
    }
    return .zero
  }

  /// The rendering engine currently being used by this view.
  ///  - This will only be `nil` in cases where the configuration is `automatic`
  ///    but a `RootAnimationLayer` hasn't been constructed yet
  public var currentRenderingEngine: RenderingEngine? {
    lottieAnimationLayer.currentRenderingEngine
  }

  /// The current `LottiePlaybackMode` that is being used
  public var currentPlaybackMode: LottiePlaybackMode? {
    lottieAnimationLayer.currentPlaybackMode
  }

  /// Whether or not the Main Thread rendering engine should use `forceDisplayUpdate()`
  /// when rendering each individual frame.
  ///  - The main thread rendering engine implements optimizations to decrease the amount
  ///    of properties that have to be re-rendered on each frame. There are some cases
  ///    where this can result in bugs / incorrect behavior, so we allow it to be disabled.
  ///  - Forcing a full render on every frame will decrease performance, and is not recommended
  ///    except as a workaround to a bug in the main thread rendering engine.
  ///  - Has no effect when using the Core Animation rendering engine.
  public var mainThreadRenderingEngineShouldForceDisplayUpdateOnEachFrame: Bool {
    get { lottieAnimationLayer.mainThreadRenderingEngineShouldForceDisplayUpdateOnEachFrame }
    set { lottieAnimationLayer.mainThreadRenderingEngineShouldForceDisplayUpdateOnEachFrame = newValue }
  }

  /// Sets the lottie file backing the animation view. Setting this will clear the
  /// view's contents, completion blocks and current state. The new animation will
  /// be loaded up and set to the beginning of its timeline.
  /// The loopMode, animationSpeed and imageProvider will be set according
  /// to lottie file settings
  /// - Parameters:
  ///   - animationId: Internal animation id to play. Optional
  ///   Defaults to play first animation in file.
  ///   - dotLottieFile: Lottie file to play
  public func loadAnimation(
    _ animationId: String? = nil,
    from dotLottieFile: DotLottieFile)
  {
    lottieAnimationLayer.loadAnimation(animationId, from: dotLottieFile)
  }

  /// Sets the lottie file backing the animation view. Setting this will clear the
  /// view's contents, completion blocks and current state. The new animation will
  /// be loaded up and set to the beginning of its timeline.
  /// The loopMode, animationSpeed and imageProvider will be set according
  /// to lottie file settings
  /// - Parameters:
  ///   - atIndex: Internal animation index to play. Optional
  ///   Defaults to play first animation in file.
  ///   - dotLottieFile: Lottie file to play
  public func loadAnimation(
    atIndex index: Int,
    from dotLottieFile: DotLottieFile)
  {
    lottieAnimationLayer.loadAnimation(atIndex: index, from: dotLottieFile)
  }

  /// Reloads the images supplied to the animation from the `imageProvider`
  public func reloadImages() {
    lottieAnimationLayer.reloadImages()
  }

  /// Forces the LottieAnimationView to redraw its contents.
  public func forceDisplayUpdate() {
    lottieAnimationLayer.forceDisplayUpdate()
  }

  /// Sets a ValueProvider for the specified keypath. The value provider will be set
  /// on all properties that match the keypath.
  ///
  /// Nearly all properties of a Lottie animation can be changed at runtime using a
  /// combination of `Animation Keypaths` and `Value Providers`.
  /// Setting a ValueProvider on a keypath will cause the animation to update its
  /// contents and read the new Value Provider.
  ///
  /// A value provider provides a typed value on a frame by frame basis.
  ///
  /// - Parameter valueProvider: The new value provider for the properties.
  /// - Parameter keypath: The keypath used to search for properties.
  ///
  /// Example:
  /// ```
  /// /// A keypath that finds the color value for all `Fill 1` nodes.
  /// let fillKeypath = AnimationKeypath(keypath: "**.Fill 1.Color")
  /// /// A Color Value provider that returns a reddish color.
  /// let redValueProvider = ColorValueProvider(Color(r: 1, g: 0.2, b: 0.3, a: 1))
  /// /// Set the provider on the animationView.
  /// animationView.setValueProvider(redValueProvider, keypath: fillKeypath)
  /// ```
  public func setValueProvider(_ valueProvider: AnyValueProvider, keypath: AnimationKeypath) {
    lottieAnimationLayer.setValueProvider(valueProvider, keypath: keypath)
  }

  /// Reads the value of a property specified by the Keypath.
  /// Returns nil if no property is found.
  ///
  /// - Parameter for: The keypath used to search for the property.
  /// - Parameter atFrame: The Frame Time of the value to query. If nil then the current frame is used.
  public func getValue(for keypath: AnimationKeypath, atFrame: AnimationFrameTime?) -> Any? {
    lottieAnimationLayer.getValue(for: keypath, atFrame: atFrame)
  }

  /// Reads the original value of a property specified by the Keypath.
  /// This will ignore any value providers and can be useful when implementing a value providers that makes change to the original value from the animation.
  /// Returns nil if no property is found.
  ///
  /// - Parameter for: The keypath used to search for the property.
  /// - Parameter atFrame: The Frame Time of the value to query. If nil then the current frame is used.
  public func getOriginalValue(for keypath: AnimationKeypath, atFrame: AnimationFrameTime?) -> Any? {
    lottieAnimationLayer.getOriginalValue(for: keypath, atFrame: atFrame)
  }

  /// Logs all child keypaths.
  /// Logs the result of `allHierarchyKeypaths()` to the `LottieLogger`.
  public func logHierarchyKeypaths() {
    lottieAnimationLayer.logHierarchyKeypaths()
  }

  /// Computes and returns a list of all child keypaths in the current animation.
  /// The returned list is the same as the log output of `logHierarchyKeypaths()`
  public func allHierarchyKeypaths() -> [String] {
    lottieAnimationLayer.allHierarchyKeypaths()
  }

  /// Searches for the nearest child layer to the first Keypath and adds the subview
  /// to that layer. The subview will move and animate with the child layer.
  /// Furthermore the subview will be in the child layers coordinate space.
  ///
  /// Note: if no layer is found for the keypath, then nothing happens.
  ///
  /// - Parameter subview: The subview to add to the found animation layer.
  /// - Parameter keypath: The keypath used to find the animation layer.
  ///
  /// Example:
  /// ```
  /// /// A keypath that finds `Layer 1`
  /// let layerKeypath = AnimationKeypath(keypath: "Layer 1")
  ///
  /// /// Wrap the custom view in an `AnimationSubview`
  /// let subview = AnimationSubview()
  /// subview.addSubview(customView)
  ///
  /// /// Set the provider on the animationView.
  /// animationView.addSubview(subview, forLayerAt: layerKeypath)
  /// ```
  public func addSubview(_ subview: AnimationSubview, forLayerAt keypath: AnimationKeypath) {
    guard let sublayer = lottieAnimationLayer.rootAnimationLayer?.layer(for: keypath) else {
      return
    }
    setNeedsLayout()
    layoutIfNeeded()
    lottieAnimationLayer.forceDisplayUpdate()
    addSubview(subview)
    if let subViewLayer = subview.viewLayer {
      sublayer.addSublayer(subViewLayer)
    }
  }

  /// Converts a CGRect from the LottieAnimationView's coordinate space into the
  /// coordinate space of the layer found at Keypath.
  ///
  /// If no layer is found, nil is returned
  ///
  /// - Parameter rect: The CGRect to convert.
  /// - Parameter toLayerAt: The keypath used to find the layer.
  public func convert(_ rect: CGRect, toLayerAt keypath: AnimationKeypath?) -> CGRect? {
    let convertedRect = lottieAnimationLayer.convert(rect, toLayerAt: keypath)
    setNeedsLayout()
    layoutIfNeeded()
    return convertedRect
  }

  /// Converts a CGPoint from the LottieAnimationView's coordinate space into the
  /// coordinate space of the layer found at Keypath.
  ///
  /// If no layer is found, nil is returned
  ///
  /// - Parameter point: The CGPoint to convert.
  /// - Parameter toLayerAt: The keypath used to find the layer.
  public func convert(_ point: CGPoint, toLayerAt keypath: AnimationKeypath?) -> CGPoint? {
    let convertedRect = lottieAnimationLayer.convert(point, toLayerAt: keypath)
    setNeedsLayout()
    layoutIfNeeded()
    return convertedRect
  }

  /// Sets the enabled state of all animator nodes found with the keypath search.
  /// This can be used to interactively enable / disable parts of the animation.
  ///
  /// - Parameter isEnabled: When true the animator nodes affect the rendering tree. When false the node is removed from the tree.
  /// - Parameter keypath: The keypath used to find the node(s).
  public func setNodeIsEnabled(isEnabled: Bool, keypath: AnimationKeypath) {
    lottieAnimationLayer.setNodeIsEnabled(isEnabled: isEnabled, keypath: keypath)
  }

  /// Markers are a way to describe a point in time by a key name.
  ///
  /// Markers are encoded into animation JSON. By using markers a designer can mark
  /// playback points for a developer to use without having to worry about keeping
  /// track of animation frames. If the animation file is updated, the developer
  /// does not need to update playback code.
  ///
  /// Returns the Progress Time for the marker named. Returns nil if no marker found.
  public func progressTime(forMarker named: String) -> AnimationProgressTime? {
    lottieAnimationLayer.progressTime(forMarker: named)
  }

  /// Markers are a way to describe a point in time by a key name.
  ///
  /// Markers are encoded into animation JSON. By using markers a designer can mark
  /// playback points for a developer to use without having to worry about keeping
  /// track of animation frames. If the animation file is updated, the developer
  /// does not need to update playback code.
  ///
  /// Returns the Frame Time for the marker named. Returns nil if no marker found.
  public func frameTime(forMarker named: String) -> AnimationFrameTime? {
    lottieAnimationLayer.frameTime(forMarker: named)
  }

  /// Markers are a way to describe a point in time and a duration by a key name.
  ///
  /// Markers are encoded into animation JSON. By using markers a designer can mark
  /// playback points for a developer to use without having to worry about keeping
  /// track of animation frames. If the animation file is updated, the developer
  /// does not need to update playback code.
  ///
  /// - Returns: The duration frame time for the marker, or `nil` if no marker found.
  public func durationFrameTime(forMarker named: String) -> AnimationFrameTime? {
    lottieAnimationLayer.durationFrameTime(forMarker: named)
  }

  // MARK: Internal

  // The backing CALayer for this animation view.
  let lottieAnimationLayer: LottieAnimationLayer

  var animationLayer: RootAnimationLayer? {
    lottieAnimationLayer.rootAnimationLayer
  }

  /// Set animation name from Interface Builder
  @IBInspectable var animationName: String? {
    didSet {
      self.lottieAnimationLayer.animation = animationName.flatMap { LottieAnimation.named($0, animationCache: nil)
      }
    }
  }

  override func commonInit() {
    super.commonInit()
    lottieAnimationLayer.screenScale = screenScale
    viewLayer?.addSublayer(lottieAnimationLayer)

    lottieAnimationLayer.animationLoaded = { [weak self] _, animation in
      guard let self else { return }
      self.animationLoaded?(self, animation)
      self.invalidateIntrinsicContentSize()
      self.setNeedsLayout()
    }

    lottieAnimationLayer.animationLayerDidLoad = { [weak self] _, _ in
      guard let self else { return }
      self.invalidateIntrinsicContentSize()
      self.setNeedsLayout()
    }
  }

  override func layoutAnimation() {
    guard let animation = lottieAnimationLayer.animation, let animationLayer = lottieAnimationLayer.animationLayer else { return }

    var position = animation.bounds.center
    let xform: CATransform3D
    var shouldForceUpdates = false

    if let viewportFrame {
      shouldForceUpdates = contentMode == .redraw

      let compAspect = viewportFrame.size.width / viewportFrame.size.height
      let viewAspect = bounds.size.width / bounds.size.height
      let dominantDimension = compAspect > viewAspect ? bounds.size.width : bounds.size.height
      let compDimension = compAspect > viewAspect ? viewportFrame.size.width : viewportFrame.size.height
      let scale = dominantDimension / compDimension

      let viewportOffset = animation.bounds.center - viewportFrame.center
      xform = CATransform3DTranslate(CATransform3DMakeScale(scale, scale, 1), viewportOffset.x, viewportOffset.y, 0)
      position = bounds.center
    } else {
      switch contentMode {
      case .scaleToFill:
        position = bounds.center
        xform = CATransform3DMakeScale(
          bounds.size.width / animation.size.width,
          bounds.size.height / animation.size.height,
          1)
      case .scaleAspectFit:
        position = bounds.center
        let compAspect = animation.size.width / animation.size.height
        let viewAspect = bounds.size.width / bounds.size.height
        let dominantDimension = compAspect > viewAspect ? bounds.size.width : bounds.size.height
        let compDimension = compAspect > viewAspect ? animation.size.width : animation.size.height
        let scale = dominantDimension / compDimension
        xform = CATransform3DMakeScale(scale, scale, 1)
      case .scaleAspectFill:
        position = bounds.center
        let compAspect = animation.size.width / animation.size.height
        let viewAspect = bounds.size.width / bounds.size.height
        let scaleWidth = compAspect < viewAspect
        let dominantDimension = scaleWidth ? bounds.size.width : bounds.size.height
        let compDimension = scaleWidth ? animation.size.width : animation.size.height
        let scale = dominantDimension / compDimension
        xform = CATransform3DMakeScale(scale, scale, 1)
      case .redraw:
        shouldForceUpdates = true
        xform = CATransform3DIdentity
      case .center:
        position = bounds.center
        xform = CATransform3DIdentity
      case .top:
        position.x = bounds.center.x
        xform = CATransform3DIdentity
      case .bottom:
        position.x = bounds.center.x
        position.y = bounds.maxY - animation.bounds.midY
        xform = CATransform3DIdentity
      case .left:
        position.y = bounds.center.y
        xform = CATransform3DIdentity
      case .right:
        position.y = bounds.center.y
        position.x = bounds.maxX - animation.bounds.midX
        xform = CATransform3DIdentity
      case .topLeft:
        xform = CATransform3DIdentity
      case .topRight:
        position.x = bounds.maxX - animation.bounds.midX
        xform = CATransform3DIdentity
      case .bottomLeft:
        position.y = bounds.maxY - animation.bounds.midY
        xform = CATransform3DIdentity
      case .bottomRight:
        position.x = bounds.maxX - animation.bounds.midX
        position.y = bounds.maxY - animation.bounds.midY
        xform = CATransform3DIdentity

      #if canImport(UIKit)
      @unknown default:
        logger.assertionFailure("unsupported contentMode: \(contentMode.rawValue)")
        xform = CATransform3DIdentity
      #endif
      }
    }

    // UIView Animation does not implicitly set CAAnimation time or timing fuctions.
    // If layout is changed in an animation we must get the current animation duration
    // and timing function and then manually create a CAAnimation to match the UIView animation.
    // If layout is changed without animation, explicitly set animation duration to 0.0
    // inside CATransaction to avoid unwanted artifacts.
    /// Check if any animation exist on the view's layer, and match it.
    if
      let key = lottieAnimationLayer.animationKeys()?.first,
      let animation = lottieAnimationLayer.animation(forKey: key),
      animateLayoutChangesWithCurrentCoreAnimationContext
    {
      // The layout is happening within an animation block. Grab the animation data.

      let positionKey = "LayoutPositionAnimation"
      let transformKey = "LayoutTransformAnimation"
      animationLayer.removeAnimation(forKey: positionKey)
      animationLayer.removeAnimation(forKey: transformKey)

      let positionAnimation = animation.copy() as? CABasicAnimation ?? CABasicAnimation(keyPath: "position")
      positionAnimation.keyPath = "position"
      positionAnimation.isAdditive = false
      positionAnimation.fromValue = (animationLayer.presentation() ?? animationLayer).position
      positionAnimation.toValue = position
      positionAnimation.isRemovedOnCompletion = true

      let xformAnimation = animation.copy() as? CABasicAnimation ?? CABasicAnimation(keyPath: "transform")
      xformAnimation.keyPath = "transform"
      xformAnimation.isAdditive = false
      xformAnimation.fromValue = (animationLayer.presentation() ?? animationLayer).transform
      xformAnimation.toValue = xform
      xformAnimation.isRemovedOnCompletion = true

      animationLayer.position = position
      animationLayer.transform = xform
      animationLayer.anchorPoint = lottieAnimationLayer.anchorPoint
      animationLayer.add(positionAnimation, forKey: positionKey)
      animationLayer.add(xformAnimation, forKey: transformKey)
    } else {
      // In performance tests, we have to wrap the animation view setup
      // in a `CATransaction` in order for the layers to be deallocated at
      // the correct time. The `CATransaction`s in this method interfere
      // with the ones managed by the performance test, and aren't actually
      // necessary in a headless environment, so we disable them.
      if TestHelpers.performanceTestsAreRunning {
        animationLayer.position = position
        animationLayer.transform = xform
      } else {
        CATransaction.begin()
        CATransaction.setAnimationDuration(0.0)
        CATransaction.setAnimationTimingFunction(CAMediaTimingFunction(name: .linear))
        animationLayer.position = position
        animationLayer.transform = xform
        CATransaction.commit()
      }
    }

    if shouldForceUpdates {
      lottieAnimationLayer.forceDisplayUpdate()
    }
  }

  func updateRasterizationState() {
    lottieAnimationLayer.updateRasterizationState()
  }

  /// Updates the animation frame. Does not affect any current animations
  func updateAnimationFrame(_ newFrame: CGFloat) {
    lottieAnimationLayer.updateAnimationFrame(newFrame)
  }

  @objc
  override func animationWillMoveToBackground() {
    updateAnimationForBackgroundState()
  }

  @objc
  override func animationWillEnterForeground() {
    updateAnimationForForegroundState()
  }

  override func animationMovedToWindow() {
    /// Don't update any state if the `superview`  is `nil`
    /// When A viewA owns superViewB, it removes the superViewB from the window. At this point, viewA still owns superViewB and triggers the viewA method: -didmovetowindow
    guard superview != nil else { return }

    if window != nil {
      updateAnimationForForegroundState()
    } else {
      updateAnimationForBackgroundState()
    }
  }

  func updateInFlightAnimation() {
    lottieAnimationLayer.updateInFlightAnimation()
  }

  func loadAnimation(_ animationSource: LottieAnimationSource?) {
    lottieAnimationLayer.loadAnimation(animationSource)
  }

  // MARK: Fileprivate

  fileprivate var waitingToPlayAnimation = false

  fileprivate func updateAnimationForBackgroundState() {
    lottieAnimationLayer.updateAnimationForBackgroundState()
  }

  fileprivate func updateAnimationForForegroundState() {
    let wasWaitingToPlayAnimation = waitingToPlayAnimation
    if waitingToPlayAnimation {
      waitingToPlayAnimation = false
    }
    lottieAnimationLayer.updateAnimationForForegroundState(wasWaitingToPlayAnimation: wasWaitingToPlayAnimation)
  }

  // MARK: Private

  private let logger: LottieLogger
}
