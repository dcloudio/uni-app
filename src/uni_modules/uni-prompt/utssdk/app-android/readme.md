# Android平台实现特殊说明  

## uni-app 项目  
实现以下API：  
- uni.showToast
- uni.hideToast
- uni.showLoading
- uni.hideLoading
- uni.showModal
- uni.showActionSheet


## uni-app x 项目  
实现以下API：  
- uni.showToast
- uni.hideToast

**注意**  
蒸汽（Vapor）模式原生层不需要实现页面关闭时自动关闭Toast的逻辑，有js框架在页面关闭时调用`uni.hideToast`处理  
非蒸汽模式（原生驱动），vue框架编译为kotlin由于依赖关系（uni-prompt模块依赖vue框架才能编译）无法在框架中调用`uni.hideToast`，需要uni-prompt模块内部监听页面关闭生命周期实现关闭页面时自动关闭Toast的逻辑。  

