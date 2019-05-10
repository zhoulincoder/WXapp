//API 模块
//book.douban.com   movie.douban.com 子域名 needSubDomain
// 表单post 请求
const API_BASE_URL = 'https://api.it120.cc';
const CONFIG = require('./config.js');
const request = ( url, needSubDomain, method, data) => {
  let _url = API_BASE_URL + (needSubDomain ? '/' + CONFIG.subDomain:'') + url;  //url拼接
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content_Type': 'application/x-www-form-urlencode'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}
module.exports = {
  loadGoods: (data) => {
    return request('/shop/goods/list', true, 'post', data);
  },
  getBanners: (data) => {
    return request('/banner/list', true, 'get', data);
  },
  getCategory: () => {
    return request();
  },
}