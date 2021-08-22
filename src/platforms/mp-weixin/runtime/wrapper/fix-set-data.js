/**
 * 用于延迟调用 setData
 * 在 setData 真实调用的时机需执行 fixSetDataEnd
 * @param {*} mpInstance
 */
export function fixSetDataStart (mpInstance) {
  const setData = mpInstance.setData
  const setDataArgs = []
  mpInstance.setData = function () {
    setDataArgs.push(arguments)
  }
  mpInstance.__fixInitData = function () {
    this.setData = setData
    const fn = () => {
      setDataArgs.forEach(args => {
        setData.apply(this, args)
      })
    }
    if (setDataArgs.length) {
      if (this.groupSetData) {
        this.groupSetData(fn)
      } else {
        fn()
      }
    }
  }
}
/**
 * 恢复真实的 setData 方法
 * @param {*} mpInstance
 */
export function fixSetDataEnd (mpInstance) {
  if (mpInstance.__fixInitData) {
    mpInstance.__fixInitData()
    delete mpInstance.__fixInitData
  }
}
