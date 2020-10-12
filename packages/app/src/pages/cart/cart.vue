<template>
  <view></view>
</template>

<script>
import * as cart from "@/utils/cart";

export default {
  data() {
    return {};
  },
  mounted() {},
  onShow() {
    const items = cart.getCartItems();
    cart.setCartBadge(items.length);
  },
};
</script>

<style lang="less">
</style>
