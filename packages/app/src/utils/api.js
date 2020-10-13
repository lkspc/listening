// @ts-nocheck
import * as common from "@/constants/common";

wx.cloud.init({
  env: common.ENV,
});

const db = wx.cloud.database();

export async function getAds(size = common.LIMIT) {
  const res = await db
    .collection("ads")
    .limit(size)
    .get();
  return res.data;
}

export async function getProducts(page = 1, size = common.LIMIT) {
  const res = await db
    .collection("products")
    .skip((page - 1) * size)
    .limit(size + 1)
    .get();
  return res.data;
}

export async function getProduct(id) {
  const res = await db
    .collection("products")
    .doc(id)
    .get();
  return res.data;
}
