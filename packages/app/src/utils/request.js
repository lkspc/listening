export default function request({
  url,
  data,
} = {}) {
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      data,
      header: {
        'Content-Type': 'application/json'
      },
      success: res => resolve(res.data),
      fail: err => reject(err)
    })
  })
}
