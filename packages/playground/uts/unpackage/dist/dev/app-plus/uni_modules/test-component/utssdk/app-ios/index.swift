import DCloudUTSPlugin;
import Lottie;
import Foundation;
import UIKit;
import DCloudUTSFoundation;
@objc(UTSSDKModulesTestComponentAnimationViewComponent)
@objcMembers
class AnimationViewComponent : UTSComponent<UIView> {
    public init(_ instance: UniSDKInstance?, _ parent: AbsVContainer<unknown>?, _ componentData: AbsComponentData<unknown>?) : super.init(instance, parent, componentData) ;
    public override func created() {}
    public override func measure(_ size: UTSSize) -> UTSSize {
        return UTSSize(100, 100);
    }
    public override func NVBeforeLoad() {}
    public override func NVLoad() -> UIView {
        self.animationView = LottieAnimationView();
        self.animationView.loopMode = LottieLoopMode.playOnce;
        return self.animationView;
    }
    public override func NVLoaded() {
        if (self.loop) {
            self.animationView.loopMode = LottieLoopMode.loop;
        }
        self.animationView.isHidden = self.hidden;
        if (self.autoplay) {
            self.playAnimation();
        }
    }
    public override func NVLayouted() {}
    public override func NVBeforeUnload() {}
    public override func NVUnloaded() {}
    public override func unmounted() {}
    private var path: String;
    private var autoplay: Boolean;
    private var loop: Boolean;
    private var hidden: Boolean;
    private var action: String;
    private var animationView = LottieAnimationView!;
    public func setRepeatMode(_ repeatMode: String) {
        if (repeatMode == "RESTART") {
            if (self.loop) {
                self.animationView.loopMode = LottieLoopMode.loop;
            }
             else {
                self.animationView.loopMode = LottieLoopMode.playOnce;
            }
        }
         else {
            if (repeatMode == "REVERSE") {
                if (self.loop) {
                    self.animationView.loopMode = LottieLoopMode.autoReverse;
                }
                 else {
                    self.animationView.loopMode = LottieLoopMode.repeatBackwards(1);
                }
            }
        }
    }
    public func playAnimation() {
        if (self.path == nil) {
            return;
        }
        var animationUrl: URL?;
        if (self.path!.hasPrefix("http")) {
            animationUrl = URL(string: self.path!);
        }
         else {
            var filePath = UTSiOS.getResourcePath(self.path!);
            animationUrl = URL(filePath: filePath);
        }
        if (animationUrl != nil) {
            LottieAnimation.loadedFrom(url: animationUrl!, closure: {
            (animation: LottieAnimation) in
            if (animation != nil) {
                self.animationView.animation = animation;
                self.animationView.play(completion: {
                (isFinish: Bool) in
                if (isFinish) {
                    self.fireEvent("bindended");
                }
                });
            }
            });
        }
    }
    public override func $init() {
        self.$watch<String>("path", {
        (newValue, oldValue) in
        self.path = newValue;
        if (self.autoplay) {
            self.playAnimation();
        }
        });
        self.$watch<Bool>("loop", {
        (newValue, oldValue) in
        self.loop = newValue;
        if (self.loop) {
            self.animationView.loopMode = LottieLoopMode.loop;
        }
        });
        self.$watch<Bool>("autoplay", {
        (newValue, oldValue) in
        self.autoplay = newValue;
        });
        self.$watch<String>("action", {
        (newValue, oldValue) in
        var action = newValue;
        if (action == "play" || action == "pause" || action == "stop") {
            self.action = action;
            switch(action){
                case "play":
                    self.playAnimation();
                    break;
                case "pause":
                    self.animationView.pause();
                    break;
                case "stop":
                    self.animationView.stop();
                    break;
                default:
                    break;
            }
        }
        });
        self.$watch<Bool>("hidden", {
        (newValue, oldValue) in
        self.hidden = newValue;
        self.animationView.isHidden = self.hidden;
        });
    }
    @WXComponentProp(name: "path")
    public func componentSetPath(_ value: String) {
        self.path = value;
        self.$componentWatchDispatch("path", value);
    }
    @WXComponentProp(name: "autoplay")
    public func componentSetAutoplay(_ value: Boolean) {
        self.autoplay = value;
        self.$componentWatchDispatch("autoplay", value);
    }
    @WXComponentProp(name: "loop")
    public func componentSetLoop(_ value: Boolean) {
        self.loop = value;
        self.$componentWatchDispatch("loop", value);
    }
    @WXComponentProp(name: "hidden")
    public func componentSetHidden(_ value: Boolean) {
        self.hidden = value;
        self.$componentWatchDispatch("hidden", value);
    }
    @WXComponentProp(name: "action")
    public func componentSetAction(_ value: String) {
        self.action = value;
        self.$componentWatchDispatch("action", value);
    }
}
