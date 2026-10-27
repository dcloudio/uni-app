import UIKit
import Foundation
import Lottie

@objc public class UniAnimationViewNative: NSObject {
  private let containerView: UIView
  private let animationView: LottieAnimationView

  private var destroyed = false
  private var loopEnabled = false
  private var direction = 1
  private var loadToken = 0
  private var totalFramesValue: Double = 0
  private var dataReadyCallback: (() -> Void)?
  private var completeCallback: (() -> Void)?
  private var errorCallback: ((String, String) -> Void)?

  @objc public override init() {
    containerView = UIView(frame: .zero)
    animationView = LottieAnimationView(animation: nil)
    containerView.backgroundColor = UIColor.clear
    containerView.clipsToBounds = true
    super.init()

    animationView.backgroundColor = UIColor.clear
    animationView.contentMode = .scaleAspectFit
    animationView.backgroundBehavior = .pauseAndRestore
    animationView.frame = containerView.bounds
    animationView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    containerView.addSubview(animationView)
  }

  @objc public func getView() -> UIView {
    return containerView
  }

  @objc public func setDataReadyCallback(_ callback: (() -> Void)?) {
    dataReadyCallback = callback
  }

  @objc public func setCompleteCallback(_ callback: (() -> Void)?) {
    completeCallback = callback
  }

  @objc public func setErrorCallback(_ callback: ((String, String) -> Void)?) {
    errorCallback = callback
  }

  @objc public func load(_ path: String) {
    runOnMain { [weak self] in
      guard let self = self, !self.destroyed else { return }
      self.loadToken += 1
      let token = self.loadToken
      self.totalFramesValue = 0
      self.animationView.stop()
      self.animationView.animation = nil
      if self.isNetworkPath(path) {
        self.loadFromUrl(path, token: token)
      } else {
        self.loadFromFile(path, token: token)
      }
    }
  }

  @objc public func setLoop(_ loop: Bool) {
    runOnMain { [weak self] in
      guard let self = self else { return }
      self.loopEnabled = loop
      self.applyLoop()
    }
  }

  @objc public func getCurrentFrame() -> NSNumber {
    return NSNumber(value: Double(animationView.realtimeAnimationFrame))
  }

  @objc public func getTotalFrames() -> NSNumber {
    return NSNumber(value: totalFramesValue)
  }

  @objc public func setDirection(_ value: NSNumber) {
    runOnMain { [weak self] in
      guard let self = self else { return }
      self.direction = value.intValue < 0 ? -1 : 1
    }
  }

  @objc public func play() {
    runOnMain { [weak self] in
      guard let self = self, !self.destroyed else { return }
      guard self.animationView.animation != nil else {
        NSLog("[animation-view][ios] play ignored: animation is not ready")
        return
      }
      self.startPlayback(self.animationView)
    }
  }

  @objc public func resume() {
    play()
  }

  @objc public func pause() {
    runOnMain { [weak self] in
      guard let self = self, !self.destroyed else { return }
      self.animationView.pause()
    }
  }

  @objc public func stop() {
    runOnMain { [weak self] in
      guard let self = self, !self.destroyed else { return }
      self.animationView.stop()
      self.animationView.currentProgress = self.direction < 0 ? 1 : 0
    }
  }

  @objc public func goToAndStop(_ value: NSNumber, _ isFrame: Bool) {
    runOnMain { [weak self] in
      guard let self = self, !self.destroyed else { return }
      self.animationView.stop()
      var progress: Double = 0
      if isFrame {
        let total = self.totalFramesValue > 0 ? self.totalFramesValue : 1
        progress = value.doubleValue / total
      } else if let animation = self.animationView.animation, animation.duration > 0 {
        progress = value.doubleValue / 1000.0 / animation.duration
      }
      self.animationView.currentProgress = CGFloat(min(max(progress, 0), 1))
    }
  }

  @objc public func destroy() {
    runOnMain { [weak self] in
      guard let self = self, !self.destroyed else { return }
      self.destroyed = true
      self.dataReadyCallback = nil
      self.completeCallback = nil
      self.errorCallback = nil
      self.loadToken += 1
      self.animationView.stop()
      self.animationView.animation = nil
      self.removeAnimationView()
    }
  }

  // MARK: - Private

  private func isNetworkPath(_ path: String) -> Bool {
    return path.hasPrefix("http://") || path.hasPrefix("https://")
  }

  private func loadFromUrl(_ urlString: String, token: Int) {
    guard let url = URL(string: urlString) else {
      NSLog("[animation-view][ios] invalid url: %@", urlString)
      errorCallback?("invalid_path", "invalid animation url: \(urlString)")
      return
    }
    LottieAnimation.loadedFrom(
      url: url,
      session: URLSession.shared,
      closure: { [weak self] animation in
        guard let self = self else { return }
        DispatchQueue.main.async {
          guard !self.destroyed, self.loadToken == token else { return }
          guard let animation = animation else {
            NSLog("[animation-view][ios] url load failed: %@", urlString)
            self.errorCallback?("lottie", "url load failed: \(urlString)")
            return
          }
          self.attachAnimation(
            animation,
            imageProvider: BundleImageProvider(bundle: Bundle.main, searchPath: nil)
          )
        }
      },
      animationCache: LottieAnimationCache.shared
    )
  }

  private func loadFromFile(_ absPath: String, token: Int) {
    guard !destroyed, loadToken == token else { return }
    var path = absPath
    if path.hasPrefix("file://") {
      path = String(path.dropFirst("file://".count))
    }
    guard let animation = LottieAnimation.filepath(path, animationCache: LottieAnimationCache.shared) else {
      NSLog("[animation-view][ios] load json failed: %@", path)
      errorCallback?("lottie", "load json failed: \(path)")
      return
    }
    let imagesDir = URL(fileURLWithPath: path)
      .deletingLastPathComponent()
      .appendingPathComponent("images").path
    attachAnimation(animation, imageProvider: FilepathImageProvider(filepath: imagesDir))
  }

  private func attachAnimation(_ animation: LottieAnimation, imageProvider: any AnimationImageProvider) {
    if destroyed { return }

    animationView.imageProvider = imageProvider
    animationView.animation = animation
    animationView.currentProgress = direction < 0 ? 1 : 0
    animationView.reloadImages()
    totalFramesValue = Double(animation.endFrame - animation.startFrame)
    applyLoop()
    dataReadyCallback?()
  }

  private func startPlayback(_ view: LottieAnimationView) {
    if loopEnabled {
      view.play { [weak self] finished in
        self?.handlePlaybackEnd(finished)
      }
      return
    }
    // 非循环时按方向显式指定终点，保证倒放与 complete 事件行为一致
    let toProgress: CGFloat = direction < 0 ? 0 : 1
    view.play(fromProgress: nil, toProgress: toProgress, loopMode: .playOnce) { [weak self] finished in
      self?.handlePlaybackEnd(finished)
    }
  }

  private func handlePlaybackEnd(_ finished: Bool) {
    if destroyed { return }
    if finished && !loopEnabled {
      completeCallback?()
    }
  }

  private func applyLoop() {
    animationView.loopMode = loopEnabled ? .loop : .playOnce
  }

  private func removeAnimationView() {
    animationView.removeFromSuperview()
  }

  private func runOnMain(_ block: @escaping () -> Void) {
    if Thread.isMainThread {
      block()
    } else {
      DispatchQueue.main.async(execute: block)
    }
  }
}
