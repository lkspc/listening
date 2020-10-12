import request from "./request";

const server = "http://localhost:1337";
const prefix = "";
const limit = 10;

function getUrl(api) {
  return `${server}${prefix}${api}`;
}

function convertAssetField(data, field) {
  const media = data[field];
  data[field] = Array.isArray(media)
    ? media.map(item => getAssetUrl(item.url))
    : getAssetUrl(media.url);
  return data;
}

function convertAssetResults(results, fields = []) {
  results.forEach((item) => {
    fields.forEach((key) => {
      convertAssetField(item, key);
    });
  });
  return results;
}

export function getAssetUrl(path) {
  return `${server}${path}`;
}

export async function getAds() {
  const url = getUrl("/ads");
  const results = await request({
    url,
  });
  convertAssetResults(results, ["source"]);
  return results;
}

export async function getProducts(page = 1, size = limit) {
  if (page >= 5) {
    return [];
  }

  const url = getUrl("/products");
  const skip = (page - 1) * size;
  const results = await request({
    url,
    data: {
      _limit: size,
      _start: skip,
    },
  });
  convertAssetResults(results, ["thumb"]);
  return results;
}

export async function getProduct(id) {
  const url = getUrl("/products/" + id);
  const result = await request({ url });
  convertAssetField(result, "previews");
  // convertAssetField(result, "thumb");
  return result;
}
