<template>
  <view class="product">
    <swiper class="swiper" circular="true">
      <block v-for="preview in previews" :key="preview">
        <swiper-item>
          <image class="swiper-image" :src="preview"></image>
        </swiper-item>
      </block>
    </swiper>
    <view class="card">
      <price-tag className="price" :value="price" :strong="true"></price-tag>
      <text class="title">{{ name }}</text>
      <text v-if="!!desc" class="desc">{{ desc }}</text>
    </view>
    <view class="footer">
      <uni-goods-nav :options="options" :buttonGroup="buttonGroup" :fill="true">
      </uni-goods-nav>
    </view>
  </view>
</template>

<script>
import * as API from "@/utils/api.js";

const GoodsNav = {
  options: [
    {
      icon: "shop",
      text: "店铺",
    },
    {
      icon: "headphones",
      text: "客服",
    },
  ],
  buttonGroup: [
    {
      text: "加入购物车",
      backgroundColor: "#ff0000",
      color: "#fff",
    },
    {
      text: "立即购买",
      backgroundColor: "#ffa200",
      color: "#fff",
    },
  ],
};

export default {
  data() {
    return {
      loading: true,
      id: "",
      name: "",
      desc: "",
      previews: [],
      price: 0,
      ...GoodsNav,
    };
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const product = await API.getProduct(this.id);
        this.loading = false;
        this.name = product.name;
        this.previews = product.previews;
        this.price = product.price;
        this.desc = product.desc;
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
  onLoad(params) {
    this.id = params.id;
  },
};
</script>

<style>
.product {
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.swiper {
  width: 100%;
  height: 750rpx;
}

.swiper-image {
  height: 100%;
  width: 100%;
}

.card {
  padding: 30rpx;
  background-color: #ffffff;
}

.price {
}

.title {
  display: block;
  margin-top: 20rpx;
  font-size: 32rpx;
  font-weight: bold;
  line-height: 40rpx;
  color: #222;
}

.desc {
  display: block;
  margin-top: 20rpx;
  font-size: 26rpx;
  line-height: 1.3;
  color: #777;
}
</style>
