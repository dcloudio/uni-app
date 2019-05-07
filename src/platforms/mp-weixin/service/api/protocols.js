export const protocols = {
  previewImage: {
    args (fromArgs) {
      // 处理传入索引值的情况
      const currentIndex = Number(fromArgs.current)
      if (!isNaN(currentIndex)) {
        const urls = fromArgs.urls && Array.isArray(fromArgs.urls) ? fromArgs.urls.concat() : []
        fromArgs.urls = urls.filter((item, index) => {
          return index < currentIndex ? item !== urls[currentIndex] : true
        })
      }
    }
  }
}
export const todos = []
export const canIUses = []
