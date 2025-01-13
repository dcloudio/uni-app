const isStringIntegerKey = (key: unknown) =>
  typeof key === 'string' &&
  key !== 'NaN' &&
  key[0] !== '-' &&
  '' + parseInt(key, 10) === key

const isNumberIntegerKey = (key: unknown) =>
  typeof key === 'number' &&
  !isNaN(key) &&
  key >= 0 &&
  parseInt(key + '', 10) === key

/**
 * 用于替代@vue/shared的isIntegerKey，原始方法在鸿蒙arkts中会引发bug。根本原因是arkts的数组的key是数字而不是字符串。
 * 目前这个方法使用的地方都和数组有关，切记不能挪作他用。
 * @param key
 * @returns
 */
export const isIntegerKey = (key: unknown) =>
  isNumberIntegerKey(key) || isStringIntegerKey(key)
