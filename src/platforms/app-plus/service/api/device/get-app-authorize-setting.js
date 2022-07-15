export function getAppAuthorizeSetting() {
  const { getAppAuthorizeSetting } = weex.requireModule('plus')
  let appAuthorizeSetting = getAppAuthorizeSetting()
  try {
    if (typeof appAuthorizeSetting === 'string')
      appAuthorizeSetting = JSON.parse(appAuthorizeSetting)
  } catch (error) { }

  return appAuthorizeSetting
}