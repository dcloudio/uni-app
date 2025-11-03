<template>
  <view class="container">
    <view class="product-list">
      <view class="product-item" v-for="product in products" :key="product.id">
        <view class="product-image">
          <text class="product-icon">{{product.icon}}</text>
        </view>
        <view class="product-info">
          <text class="product-name">{{product.name}}</text>
          <text class="product-desc">{{product.description}}</text>
          <view class="product-footer">
            <text class="product-price">¥{{product.price}}</text>
            <button 
              class="add-cart-btn" 
              size="mini" 
              type="primary"
              @click="addToCart(product)"
            >
              加入购物车
            </button>
          </view>
        </view>
      </view>
    </view>
    
    <!-- Cart Badge -->
    <view class="cart-badge" v-if="cartCount > 0">
      <text>{{cartCount}}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: 'iPhone 15 Pro',
          description: '钛金属设计，A17 Pro芯片',
          price: 7999,
          icon: '📱'
        },
        {
          id: 2,
          name: 'MacBook Pro',
          description: 'M3芯片，16GB内存',
          price: 12999,
          icon: '💻'
        },
        {
          id: 3,
          name: 'AirPods Pro',
          description: '主动降噪，空间音频',
          price: 1899,
          icon: '🎧'
        },
        {
          id: 4,
          name: 'iPad Air',
          description: 'M1芯片，10.9英寸',
          price: 4799,
          icon: '📲'
        },
        {
          id: 5,
          name: 'Apple Watch',
          description: 'Series 9，健康监测',
          price: 2999,
          icon: '⌚'
        },
        {
          id: 6,
          name: 'Magic Keyboard',
          description: '无线键盘，触控板',
          price: 899,
          icon: '⌨️'
        }
      ],
      cartCount: 0
    }
  },
  
  onShow() {
    this.updateCartCount()
  },
  
  methods: {
    addToCart(product) {
      // Get existing cart from storage
      let cart = uni.getStorageSync('cart') || []
      
      // Check if product already in cart
      const existingItem = cart.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cart.push({
          ...product,
          quantity: 1
        })
      }
      
      // Save to storage
      uni.setStorageSync('cart', cart)
      
      // Update badge
      this.updateCartCount()
      
      // Show success message
      uni.showToast({
        title: '已加入购物车',
        icon: 'success',
        duration: 1500
      })
    },
    
    updateCartCount() {
      const cart = uni.getStorageSync('cart') || []
      this.cartCount = cart.reduce((total, item) => total + item.quantity, 0)
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.product-item {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx;
  display: flex;
  gap: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
}

.product-image {
  width: 120rpx;
  height: 120rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-icon {
  font-size: 60rpx;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8rpx;
}

.product-desc {
  font-size: 24rpx;
  color: #999999;
  margin-bottom: 16rpx;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 36rpx;
  font-weight: 700;
  color: #fa5151;
}

.add-cart-btn {
  background-color: #07c160;
  color: #ffffff;
  border: none;
  padding: 8rpx 24rpx;
  border-radius: 24rpx;
}

.cart-badge {
  position: fixed;
  bottom: 120rpx;
  right: 40rpx;
  width: 80rpx;
  height: 80rpx;
  background-color: #fa5151;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(250, 81, 81, 0.4);
}

.cart-badge text {
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 700;
}
</style>
