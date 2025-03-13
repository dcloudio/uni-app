import DCloudUTSFoundation
import Foundation
import Lottie
import UIKit
@objc(UTSSDKModulesTestComponentAnimationViewComponent)
@objcMembers
public class AnimationViewComponent : UTSComponent<UIView> {
    public var path: String?
    public var autoplay: Bool = false
    public var loop: Bool = false
    public var hidden: Bool = false
    public var action: String?
    public var animationView: LottieAnimationView? = nil
    public override func created() {}
    public override func measure(_ size: UTSSize) -> UTSSize {
        return UTSSize(100, 100)
    }
    public override func NVBeforeLoad() {}
    public override func NVLoad() -> UIView {
        self.animationView = LottieAnimationView()
        self.animationView.loopMode = LottieLoopMode.playOnce
        return self.animationView
    }
    public override func NVLoaded() {
        if (self.loop) {
            self.animationView.loopMode = LottieLoopMode.loop
        }
        self.animationView.isHidden = self.hidden
        if (self.autoplay) {
            self.playAnimation()
        }
    }
    public override func NVLayouted() {}
    public override func NVBeforeUnload() {}
    public override func NVUnloaded() {}
    public override func NVMeasure(size: UTSSize) -> UTSSize {
        return UTSSize(100, 100)
    }
    public override func unmounted() {}
    public func setRepeatMode(_ repeatMode: String) {
        if (repeatMode == "RESTART") {
            if (self.loop) {
                self.animationView.loopMode = LottieLoopMode.loop
            } else {
                self.animationView.loopMode = LottieLoopMode.playOnce
            }
        } else if (repeatMode == "REVERSE") {
            if (self.loop) {
                self.animationView.loopMode = LottieLoopMode.autoReverse
            } else {
                self.animationView.loopMode = LottieLoopMode.repeatBackwards(1)
            }
        }
    }
    public func playAnimation() {
        if (self.path == nil) {
            return
        }
        var animationUrl: URL?
        if (self.path!.hasPrefix("http")) {
            animationUrl = URL(string: self.path!)
        } else {
            var filePath = UTSiOS.getResourcePath(self.path!)
            animationUrl = URL(filePath: filePath)
        }
        if (animationUrl != nil) {
            LottieAnimation.loadedFrom(url: animationUrl!, closure: {
            (animation: LottieAnimation) -> Void in
            if (animation != nil) {
                self.animationView.animation = animation
                self.animationView.play(completion: {
                (isFinish: Bool) -> Void in
                if (isFinish) {
                    self.fireEvent("bindended")
                }
                })
            }
            })
        }
    }
    public static func wx_export_method_0() -> String {
        return "setRepeatMode:"
    }
    public static func wx_export_method_1() -> String {
        return "playAnimation"
    }
    public override func __$$init() {
        self.__$$watch("path", {
        (__newValue, __oldValue) -> Void in
        var newValue = UTSiOS.convertString(__newValue)
        var oldValue = UTSiOS.convertString(__oldValue)
        self.path = newValue
        if (self.autoplay) {
            self.playAnimation()
        }
        })
        self.__$$watch("loop", {
        (__newValue, __oldValue) -> Void in
        var newValue = UTSiOS.convertBool(__newValue)
        var oldValue = UTSiOS.convertBool(__oldValue)
        self.loop = newValue
        if (self.loop) {
            self.animationView.loopMode = LottieLoopMode.loop
        }
        })
        self.__$$watch("autoplay", {
        (__newValue, __oldValue) -> Void in
        var newValue = UTSiOS.convertBool(__newValue)
        var oldValue = UTSiOS.convertBool(__oldValue)
        self.autoplay = newValue
        })
        self.__$$watch("action", {
        (__newValue, __oldValue) -> Void in
        var newValue = UTSiOS.convertString(__newValue)
        var oldValue = UTSiOS.convertString(__oldValue)
        var action = newValue
        if (action == "play" || action == "pause" || action == "stop") {
            self.action = action
            switch(action){
                case "play":
                    self.playAnimation()
                case "pause":
                    self.animationView.pause()
                case "stop":
                    self.animationView.stop()
                default:
                    break
            }
        }
        })
        self.__$$watch("hidden", {
        (__newValue, __oldValue) -> Void in
        var newValue = UTSiOS.convertBool(__newValue)
        var oldValue = UTSiOS.convertBool(__oldValue)
        self.hidden = newValue
        self.animationView.isHidden = self.hidden
        })
    }
}
