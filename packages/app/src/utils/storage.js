export const storage = {
  data: {},

  getItem(key) {
    if (!this.data.hasOwnProperty(key)) {
      this.data[key] = uni.getStorageSync(key);
    }

    return this.data[key];
  },

  setItem(key, value) {
    uni.setStorageSync(key, value);
    this.data[key] = value;
  },

  removeItem(key) {
    uni.removeStorageSync(key);
    delete this.data[key];
  },
};

export default storage;
