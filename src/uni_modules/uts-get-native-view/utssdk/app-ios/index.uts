import { CanWebViewGoBack, CanWebViewGoForward, HasNativeView, CheckWebViewNativeView, CheckInputNativeView, CheckTextareaNativeView, CheckViewNativeView } from "../interface";
import { WKWebView } from 'WebKit';
import { UIView, UITextField, UITextView } from "UIKit"

export const canWebViewGoBack : CanWebViewGoBack = function (elementId : string) : boolean {
  const element = uni.getElementById(elementId)
  const view = element?.getIOSView();
  if (view != null && view instanceof WKWebView) {
    return (view! as WKWebView).canGoBack;
  }
  return false;
}

export const canWebViewGoForward : CanWebViewGoForward = function (elementId : string) : boolean {
  const element = uni.getElementById(elementId)
  const view = element?.getIOSView();
  if (view != null && view instanceof WKWebView) {
    return (view! as WKWebView).canGoForward;
  }
  return false;
}

export const hasNativeView : HasNativeView = function (elementId : string) : boolean {
  const element = uni.getElementById(elementId)
  const view = element?.getIOSView();
  if (view != null && view instanceof WKWebView) {
    return true;
  }
  return false;
}

export const checkWebViewNativeView : CheckWebViewNativeView = function (elementId : string) : boolean {
  return hasNativeView(elementId)
}

export const checkInputNativeView : CheckInputNativeView = function (elementId : string) : boolean {
  const element = uni.getElementById(elementId)
  const view = element?.getIOSView();
  if (view != null && view instanceof UITextField) {
    return true;
  }
  return false;
}

export const checkTextareaNativeView : CheckTextareaNativeView = function (elementId : string) : boolean {
  const element = uni.getElementById(elementId)
  const view = element?.getIOSView();
  if (view != null && view instanceof UITextView) {
    return true;
  }
  return false;
}

export const checkViewNativeView : CheckViewNativeView = function (elementId : string) : boolean {
  const element = uni.getElementById(elementId)
  const view = element?.getIOSView();
  if (view != null && view instanceof UIView) {
    return true;
  }
  return false;
}

