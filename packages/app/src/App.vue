<script>
import * as cart from "@/utils/cart";

function showCartBadges() {
  const items = cart.getCartItems();
  if (items.length > 0) {
    cart.setCartBadge(items.length);
  }
}

export default {
  onLaunch: function () {
    console.log("App Launch");
    showCartBadges();
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
  font-family: uniicons;
  src: url("/static/uni.ttf");
}
/* #endif */

.uni-load-more__text {
  font-size: 28rpx !important;
}

page {
  background-color: #f8f8f8;
}
</style>
