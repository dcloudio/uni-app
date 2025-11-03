# E-commerce Shopping Cart Example

> 电商购物车示例 - 使用 uni-app 开发的完整购物车功能示例

## 功能特性

### 商品列表页
- ✅ 商品展示（名称、描述、价格）
- ✅ 加入购物车功能
- ✅ 购物车数量徽章
- ✅ 成功提示反馈
- ✅ 本地存储持久化

### 购物车页
- ✅ 购物车商品列表
- ✅ 商品选择/取消选择
- ✅ 全选/取消全选
- ✅ 数量增减控制
- ✅ 删除商品
- ✅ 实时价格计算
- ✅ 结算功能
- ✅ 空购物车状态

## 技术实现

### 数据存储
使用 `uni.getStorageSync` 和 `uni.setStorageSync` 实现本地持久化存储，购物车数据在应用重启后依然保留。

### 状态管理
- 商品数据：静态数据模拟真实商品
- 购物车数据：本地存储 + 页面状态同步
- 选中状态：支持单选和全选

### 计算属性
- `allSelected`: 判断是否全选
- `selectedCount`: 计算选中商品数量
- `totalPrice`: 计算选中商品总价

## 使用方式

### 1. 导入项目
将项目拖入 [HBuilderX](https://www.dcloud.io/hbuilderx.html)

### 2. 运行项目
- 运行到浏览器：选择浏览器运行
- 运行到小程序：选择微信开发者工具
- 运行到 App：选择模拟器或真机

### 3. 体验功能
1. 在商品列表页浏览商品
2. 点击"加入购物车"按钮添加商品
3. 切换到购物车页面
4. 选择商品、调整数量
5. 点击结算完成购买

## 项目结构

```
ecommerce-cart/
├── App.vue                 # 应用入口
├── main.js                 # 主入口文件
├── manifest.json           # 应用配置
├── pages.json              # 页面配置
├── pages/
│   ├── index/
│   │   └── index.vue      # 商品列表页
│   └── cart/
│       └── cart.vue       # 购物车页
└── README.md              # 说明文档
```

## 核心代码

### 添加到购物车
```javascript
addToCart(product) {
  let cart = uni.getStorageSync('cart') || []
  const existingItem = cart.find(item => item.id === product.id)
  
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }
  
  uni.setStorageSync('cart', cart)
  uni.showToast({ title: '已加入购物车', icon: 'success' })
}
```

### 价格计算
```javascript
computed: {
  totalPrice() {
    return this.cart
      .filter(item => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  }
}
```

## 扩展建议

### 功能扩展
- [ ] 商品搜索和筛选
- [ ] 商品分类
- [ ] 收藏功能
- [ ] 优惠券系统
- [ ] 订单历史
- [ ] 用户地址管理

### 技术优化
- [ ] 使用 Vuex 进行状态管理
- [ ] 接入真实 API
- [ ] 添加商品图片
- [ ] 支付功能集成
- [ ] 订单状态跟踪

## 注意事项

### 小程序
- 需要在微信开发者工具中打开"不校验合法域名"选项
- 本地存储有 10MB 限制

### H5
- 使用 localStorage 存储数据
- 注意浏览器兼容性

### App
- 支持 iOS 和 Android
- 本地存储无大小限制

## 学习要点

### 1. 数据持久化
学习如何使用 uni-app 的存储 API 实现数据持久化

### 2. 列表渲染
掌握 v-for 指令和 key 的使用

### 3. 事件处理
理解事件绑定和参数传递

### 4. 计算属性
学习使用 computed 进行数据计算

### 5. 条件渲染
掌握 v-if 和 v-else 的使用场景

### 6. 组件通信
理解页面间的数据传递和状态同步

## 相关资源

- [uni-app 官方文档](https://uniapp.dcloud.io/)
- [uni-app API 文档](https://uniapp.dcloud.io/api/)
- [Vue.js 官方文档](https://cn.vuejs.org/)

## License

MIT
