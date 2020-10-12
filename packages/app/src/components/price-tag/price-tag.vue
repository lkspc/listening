<template>
  <view :class="[className, strong ? 'price-tag--em' : 'price-tag']">
    <text class="price-tag-symbol">¥</text>
    <text class="price-tag-integer">{{ integer }}</text>
    <text class="price-tag-decimal">.{{ decimal }}</text>
  </view>
</template>

<script>
export default {
  name: 'PriceTag',
  props: {
    className: {
      type: String
    },
    value: {
      type: Number,
      default: 0
    },
    strong: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    integer() {
      return Math.floor(this.value / 100);
    },
    decimal() {
      const n = this.value % 100;
      return n < 10 ? '0' + n : n;
    }
  }
};
</script>

<style scoped>
.price-tag {
  line-height: 30rpx;
}

.price-tag--em {
  line-height: 40rpx;
}

.price-tag-symbol {
  color: #f6959e;
  font-size: 26rpx;
  margin-right: 8rpx;
}

.price-tag--em .price-tag-symbol {
  font-size: 30rpx;
}

.price-tag-integer {
  color: #f6959e;
  font-size: 32rpx;
  font-weight: bold;
}

.price-tag--em .price-tag-integer {
  font-size: 50rpx;
}

.price-tag-decimal {
  color: #f6959e;
  font-size: 26rpx;
  font-weight: bold;
}

.price-tag--em .price-tag-decimal {
  font-size: 30rpx;
}
</style>
