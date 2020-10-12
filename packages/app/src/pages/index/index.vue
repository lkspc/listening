<template>
  <view class="container">
    <view v-if="!hasNav" class="placeholder"></view>
    <view class="card">
      <swiper class="swiper" autoplay="true" circular="true">
        <block v-for="ad in ads" :key="ad.id">
          <swiper-item @tap="visit(ad)">
            <image class="swiper-image" :src="ad.source"></image>
          </swiper-item>
        </block>
        <swiper-item v-if="ads.length === 0" class="swiper-placeholder">
        </swiper-item>
      </swiper>
    </view>
    <view class="list">
      <block v-for="product in products" :key="product.id">
        <view class="list-item" @tap="goToProduct(product)">
          <image class="preview" :src="product.thumb"></image>
          <text class="name">{{ product.name }}</text>
          <view class="price">
            <price-tag :value="product.price"></price-tag>
            <view class="icon" @tap.stop="addToCart(product)">
              <uni-icons color="#f6959e" type="cart"></uni-icons>
            </view>
          </view>
        </view>
      </block>
    </view>
    <uni-load-more iconType="snow" :iconSize="20" :status="status">
    </uni-load-more>
  </view>
</template>

<script>
import * as API from "@/utils/api";
import * as cart from "@/utils/cart";
import * as common from "@/constants/common";

export default {
  data() {
    return {
      hasNav: common.HAS_NAV,
      page: 0,
      size: 10,
      status: "more",
      hasMore: true,
      ads: [],
      products: [],
    };
  },
  methods: {
    async fetchAds() {
      try {
        this.ads = await API.getAds();
      } catch (err) {
        console.log(err);
      }
    },
    async fetchProducts(isReload) {
      try {
        const nextPage = (isReload ? 0 : this.page) + 1;
        this.status = "loading";
        const data = await API.getProducts(nextPage, this.size + 1);
        if (isReload) {
          this.products = [];
          this.page = 0;
          this.hasMore = true;
        }

        this.products = this.products.concat(data.slice(0, this.size));
        this.hasMore = data.length >= this.size + 1;
        this.page += 1;
        this.status = this.hasMore ? "more" : "noMore";
      } catch (err) {
        this.status = "more";
        console.log(err);
      } finally {
        isReload && uni.stopPullDownRefresh();
      }
    },
    isInCurrentTab(route) {
      const pages = getCurrentPages();
      const [currentPage] = pages.slice(-1);
      return route.startsWith(currentPage.route.replace(/\/index/g, ""));
    },
    visit(ad) {
      const { url } = ad;
      if (!url) {
        return;
      }

      const params = { url };
      this.isInCurrentTab(url) ? uni.navigateTo(params) : uni.switchTab(params);
    },
    goToProduct(product) {
      uni.navigateTo({
        url: "/pages/product/product?id=" + product.id,
      });
    },
    addToCart(product) {
      cart.addToCart(product);
      cart.setCartBadge();
    },
  },
  mounted() {
    this.fetchAds();
    this.fetchProducts();
  },
  onPullDownRefresh() {
    this.fetchAds();
    this.fetchProducts(true);
  },
  onReachBottom() {
    if (this.hasMore) {
      this.fetchProducts();
    }
  },
};
</script>

<style>
.container {
  width: 100%;
}

.placeholder {
  width: 100%;
  height: calc(var(--status-bar-height) + var(--window-top));
}

.card {
  padding: 40rpx 30rpx;
  background-color: #ffffff;
}

.swiper {
  width: 100%;
  height: 300rpx;
  border-radius: 20rpx;
  overflow: hidden;
}

.swiper-image {
  width: 100%;
  height: 100%;
  border-radius: 20rpx;
}

.swiper-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 20rpx;
  background-color: #efefef;
}

.list {
  margin-top: 30rpx;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 20rpx;
  padding-right: 20rpx;
}

.list-item {
  box-sizing: border-box;
  width: calc(50% - 20rpx);
  background-color: #ffffff;
  margin: 0 10rpx 30rpx 10rpx;
  display: flex;
  flex-direction: column;
  border-radius: 10rpx;
  overflow: hidden;
}

.preview {
  width: 100%;
  max-height: 350rpx;
}

.name {
  margin-top: 10rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  color: #000000;
  line-height: 50rpx;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.price {
  padding: 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon {
  padding-left: 20rpx;
}
</style>
