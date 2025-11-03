<template>
  <view class="container">
    <!-- Empty Cart -->
    <view class="empty-cart" v-if="cart.length === 0">
      <text class="empty-icon">🛒</text>
      <text class="empty-text">购物车是空的</text>
      <button class="go-shopping-btn" @click="goShopping">去逛逛</button>
    </view>
    
    <!-- Cart Items -->
    <view class="cart-content" v-else>
      <view class="cart-list">
        <view class="cart-item" v-for="item in cart" :key="item.id">
          <view class="item-select">
            <checkbox 
              :checked="item.selected" 
              @click="toggleSelect(item)"
              color="#07c160"
            />
          </view>
          
          <view class="item-image">
            <text class="item-icon">{{item.icon}}</text>
          </view>
          
          <view class="item-info">
            <text class="item-name">{{item.name}}</text>
            <text class="item-price">¥{{item.price}}</text>
          </view>
          
          <view class="item-controls">
            <view class="quantity-control">
              <button 
                class="quantity-btn" 
                @click="decreaseQuantity(item)"
                :disabled="item.quantity <= 1"
              >
                -
              </button>
              <text class="quantity-text">{{item.quantity}}</text>
              <button 
                class="quantity-btn" 
                @click="increaseQuantity(item)"
              >
                +
              </button>
            </view>
            <button 
              class="delete-btn" 
              size="mini" 
              type="warn"
              @click="removeItem(item)"
            >
              删除
            </button>
          </view>
        </view>
      </view>
      
      <!-- Cart Footer -->
      <view class="cart-footer">
        <view class="footer-left">
          <checkbox 
            :checked="allSelected" 
            @click="toggleSelectAll"
            color="#07c160"
          />
          <text class="select-all-text">全选</text>
        </view>
        
        <view class="footer-right">
          <view class="total-info">
            <text class="total-label">合计：</text>
            <text class="total-price">¥{{totalPrice}}</text>
          </view>
          <button 
            class="checkout-btn" 
            type="primary"
            @click="checkout"
            :disabled="selectedCount === 0"
          >
            结算 ({{selectedCount}})
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      cart: []
    }
  },
  
  computed: {
    allSelected() {
      return this.cart.length > 0 && this.cart.every(item => item.selected)
    },
    
    selectedCount() {
      return this.cart.filter(item => item.selected).reduce((total, item) => total + item.quantity, 0)
    },
    
    totalPrice() {
      return this.cart
        .filter(item => item.selected)
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2)
    }
  },
  
  onShow() {
    this.loadCart()
  },
  
  methods: {
    loadCart() {
      let cart = uni.getStorageSync('cart') || []
      // Add selected property if not exists
      cart = cart.map(item => ({
        ...item,
        selected: item.selected !== undefined ? item.selected : true
      }))
      this.cart = cart
    },
    
    saveCart() {
      uni.setStorageSync('cart', this.cart)
    },
    
    toggleSelect(item) {
      item.selected = !item.selected
      this.saveCart()
    },
    
    toggleSelectAll() {
      const newState = !this.allSelected
      this.cart.forEach(item => {
        item.selected = newState
      })
      this.saveCart()
    },
    
    increaseQuantity(item) {
      item.quantity += 1
      this.saveCart()
    },
    
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity -= 1
        this.saveCart()
      }
    },
    
    removeItem(item) {
      uni.showModal({
        title: '提示',
        content: '确定要删除这个商品吗？',
        success: (res) => {
          if (res.confirm) {
            const index = this.cart.findIndex(i => i.id === item.id)
            if (index > -1) {
              this.cart.splice(index, 1)
              this.saveCart()
              uni.showToast({
                title: '已删除',
                icon: 'success'
              })
            }
          }
        }
      })
    },
    
    checkout() {
      if (this.selectedCount === 0) {
        uni.showToast({
          title: '请选择商品',
          icon: 'none'
        })
        return
      }
      
      uni.showModal({
        title: '确认结算',
        content: `共${this.selectedCount}件商品，合计¥${this.totalPrice}`,
        success: (res) => {
          if (res.confirm) {
            // Remove selected items from cart
            this.cart = this.cart.filter(item => !item.selected)
            this.saveCart()
            
            uni.showToast({
              title: '购买成功！',
              icon: 'success',
              duration: 2000
            })
          }
        }
      })
    },
    
    goShopping() {
      uni.switchTab({
        url: '/pages/index/index'
      })
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* Empty Cart */
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 200rpx 0;
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 40rpx;
}

.empty-text {
  font-size: 32rpx;
  color: #999999;
  margin-bottom: 60rpx;
}

.go-shopping-btn {
  background-color: #07c160;
  color: #ffffff;
  padding: 20rpx 80rpx;
  border-radius: 48rpx;
}

/* Cart Content */
.cart-content {
  padding-bottom: 180rpx;
}

.cart-list {
  padding: 20rpx;
}

.cart-item {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.item-select {
  display: flex;
  align-items: center;
}

.item-image {
  width: 100rpx;
  height: 100rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-icon {
  font-size: 50rpx;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.item-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #333333;
}

.item-price {
  font-size: 32rpx;
  font-weight: 700;
  color: #fa5151;
}

.item-controls {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  align-items: flex-end;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 16rpx;
  background-color: #f5f5f5;
  border-radius: 24rpx;
  padding: 8rpx 16rpx;
}

.quantity-btn {
  width: 48rpx;
  height: 48rpx;
  background-color: #ffffff;
  border: 1rpx solid #e5e5e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #333333;
  padding: 0;
  line-height: 48rpx;
}

.quantity-btn[disabled] {
  opacity: 0.3;
}

.quantity-text {
  font-size: 28rpx;
  font-weight: 600;
  color: #333333;
  min-width: 48rpx;
  text-align: center;
}

.delete-btn {
  background-color: #fa5151;
  color: #ffffff;
  border: none;
  padding: 8rpx 20rpx;
  border-radius: 24rpx;
  font-size: 24rpx;
}

/* Cart Footer */
.cart-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  padding: 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.08);
  z-index: 100;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.select-all-text {
  font-size: 28rpx;
  color: #333333;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.total-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.total-label {
  font-size: 24rpx;
  color: #999999;
}

.total-price {
  font-size: 36rpx;
  font-weight: 700;
  color: #fa5151;
}

.checkout-btn {
  background-color: #07c160;
  color: #ffffff;
  padding: 20rpx 48rpx;
  border-radius: 48rpx;
  font-size: 28rpx;
  font-weight: 600;
}

.checkout-btn[disabled] {
  background-color: #cccccc;
}
</style>
