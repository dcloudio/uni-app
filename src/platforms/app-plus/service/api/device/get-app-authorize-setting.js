export function getAppAuthorizeSetting () {
  const { getAppAuthorizeSetting } = weex.requireModule('plus')
  let appAuthorizeSetting = getAppAuthorizeSetting()
  try {
    if (typeof appAuthorizeSetting === 'string') { appAuthorizeSetting = JSON.parse(appAuthorizeSetting) }
  } catch (error) { }

  for (const key in appAuthorizeSetting) {
    if (Object.hasOwnProperty.call(appAuthorizeSetting, key)) {
      const value = appAuthorizeSetting[key]
      if (value === 'undefined') appAuthorizeSetting[key] = undefined
    }
  }

  return appAuthorizeSetting
}
