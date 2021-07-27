export function navigateTo(args: Record<string, any>) {
  UniViewJSBridge.invokeServiceMethod('navigateTo', args)
}
export function navigateBack(args: Record<string, any>) {
  UniViewJSBridge.invokeServiceMethod('navigateBack', args)
}
export function reLaunch(args: Record<string, any>) {
  UniViewJSBridge.invokeServiceMethod('reLaunch', args)
}
export function redirectTo(args: Record<string, any>) {
  UniViewJSBridge.invokeServiceMethod('redirectTo', args)
}
export function switchTab(args: Record<string, any>) {
  UniViewJSBridge.invokeServiceMethod('switchTab', args)
}
