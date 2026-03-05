import { CanWebViewGoBack, CanWebViewGoForward, HasNativeView, CheckWebViewNativeView, CheckInputNativeView, CheckTextareaNativeView, CheckViewNativeView} from "../interface";
import WebView from 'android.webkit.WebView';
import AppCompatEditText from "androidx.appcompat.widget.AppCompatEditText"
import ViewGroup from "android.view.ViewGroup"

export const canWebViewGoBack : CanWebViewGoBack = function (elementId : string) : boolean {
  const view = uni.getElementById(elementId)?.getAndroidView<WebView>();
  return view == null ? false : view.canGoBack();
}

export const canWebViewGoForward : CanWebViewGoForward = function (elementId : string) : boolean {
  const view = uni.getElementById(elementId)?.getAndroidView<WebView>();
  return view == null ? false : view.canGoForward();
}

export const hasNativeView : HasNativeView = function (elementId : string) : boolean {
  const view = uni.getElementById(elementId)?.getAndroidView();
  return view != null;
}

export const checkWebViewNativeView: CheckWebViewNativeView = function (elementId : string) : boolean {
  //通过getElementById不设置泛型，取值view类型 再通过instanceof校验WebView
  const element = uni.getElementById(elementId)
  const view = element?.getAndroidView()
  if(view != null && view instanceof WebView) {
    return true
  }
  return false;
}

export const checkInputNativeView: CheckInputNativeView = function (elementId : string) : boolean {
  //通过getAndroidView设置泛型直接获取AppCompatEditText 如果获取失败则返回null
  const view = uni.getElementById(elementId)?.getAndroidView<AppCompatEditText>();
  return view != null;
}

export const checkTextareaNativeView: CheckViewNativeView = function (elementId : string) : boolean {
  //通过getAndroidView设置泛型直接获取AppCompatEditText 如果获取失败则返回null
  const view = uni.getElementById(elementId)?.getAndroidView<AppCompatEditText>();
  return view != null;
}

export const checkViewNativeView: CheckViewNativeView = function (elementId : string) : boolean {
  //通过getAndroidView设置泛型直接获取ViewGroup 如果获取失败则返回null
  const view = uni.getElementById(elementId)?.getAndroidView<ViewGroup>();
  return view != null;
}
