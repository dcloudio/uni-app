package index;
import ...interface.interface as IUniLogin;
import ...interface.OnConnect;
import ...interface.RegisterOptions;
open class UniLogin : IUniLogin {
    override fun login(name, code) {
        console.log(name, code);
    }
    open fun async register(opts: RegisterOptions) {
        opts.callback1(true);
        opts.callback2(true);
        opts.abc.callback3(true);
    }
    override fun onConnect(callback: OnConnect) {}
}
