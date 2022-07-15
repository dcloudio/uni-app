export function getSystemSetting () {
  const { getSystemSetting } = weex.requireModule('plus')
  let systemSetting = getSystemSetting()
  try {
    if (typeof systemSetting === 'string') { systemSetting = JSON.parse(systemSetting) }
  } catch (error) { }

  return systemSetting
}
