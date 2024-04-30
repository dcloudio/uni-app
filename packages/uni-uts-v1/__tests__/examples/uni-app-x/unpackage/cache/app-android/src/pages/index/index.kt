package uni.UNIXXXXXXX;
import io.dcloud.uniapp.*;
import io.dcloud.uniapp.extapi.*;
import io.dcloud.uniapp.framework.*;
import io.dcloud.uniapp.runtime.*;
import io.dcloud.uniapp.vue.*;
import io.dcloud.uniapp.vue.shared.*;
import io.dcloud.unicloud.*;
import io.dcloud.unicloud.InternalUniCloudConfig;
import io.dcloud.uts.*;
import io.dcloud.uts.Map;
import io.dcloud.uts.Set;
import io.dcloud.uts.UTSAndroid;
import kotlinx.coroutines.CoroutineScope;
import kotlinx.coroutines.Deferred;
import kotlinx.coroutines.Dispatchers;
import kotlinx.coroutines.async;
open class GenPagesIndexIndex : BasePage {
    constructor(instance: ComponentInternalInstance) : super(instance) {
        onLoad(fun(_: OnLoadOptions) {
            val arr: UTSArray<Number> = utsArrayOf(
                1
            );
            console.log(arr[1], " at pages/index/index.uvue:13");
        }
        , instance);
    }
    
    override fun `$render`(): VNode? {
        val _ctx = this;
        val _component_button = resolveComponent("button");
        return createElementVNode(Fragment, null, utsArrayOf(
            createVNode(_component_button, utsMapOf("onClick" to _ctx.click), utsMapOf("default" to fun(): UTSArray<Any> {
                return utsArrayOf(
                    "测试"
                );
            }
            , "_" to 1), 8, utsArrayOf(
                "onClick"
            )),
            createVNode(_component_button, utsMapOf("onClick" to _ctx.click1), utsMapOf("default" to fun(): UTSArray<Any> {
                return utsArrayOf(
                    "测试1"
                );
            }
            , "_" to 1), 8, utsArrayOf(
                "onClick"
            ))
        ), 64);
    }
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return utsMapOf();
    }
    open var click = fun() {
        val arr: UTSArray<Number> = utsArrayOf(
            1
        );
        console.log(arr[1], " at pages/index/index.uvue:18");
    }
    ;
    open var click1 = fun() {
        test();
    }
    ;
    companion object {
        val styles: Map<String, Map<String, Map<String, Any>>>
            get() {
                return normalizeCssStyles(utsArrayOf(), utsArrayOf(
                    GenApp.styles
                ));
            }
    }
}
