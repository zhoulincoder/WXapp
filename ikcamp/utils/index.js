import config from './config'
import * as Mock from './mock'
const DEFAULT_REQUEST_SPTION = {
  url: " ",
  data: {},
  header: {
    "Content-Type": "applicationg /json"
  },
  method: 'GRT',
  dataType: 'json'
}

let util = {
  isDev: config.isDev,
  log() {
    this.isDiv && console.log(...arguments)
  },
  alert(title = "提示", content = config.defaultAlertMessage) {
    if ('object' === typeof content) {
      content = this.isDev && JSON.stringify(content) || config.defaultAlertMessage
    }
    wx.showModal({
      title: title,
      content: content
    })
  },
  getStorageData(key, cb){
    let self = this 
    wx.getStorage({
      key: key,
      success(res) {
        cb && cb(res.data)
      },
      fail(err) {
        let msg = err.errMsg || '';
        if(/getStorage:fail/.test(msg)) {
          self.getStorageData(key)
        }
      }
    })
  },
  setStorageData(key, value = '', cb){
    wx.setStorage({
      key: key,
      data: value,
      success(){
        cb && cb();
      }
    })
  },
  // 异步请求  很多请求相互联系   index.js 里面用promise
  // 所以封装此方法
  request(opt) {
    let{ url, data, header, method, dataType, mock = false} = opt
    //   封装请求                     mock=false 生产环境    开发环境换true
    // let url = opt.url... 缩写
    let self = this;      
    return new Promise((resolve, reject) =>{
      if(mock) {
        let res = {
          statusCOde: 200,
          data: Mock[url]
        }
        if(res && res.statusCOde == 200 && res.data){
          resolve(res.data)
        }else{
          self.alert('提示',res)
          reject(res)
        }
      }else {
        wx.request({
          url: url,
          data: data,
          header: header,
          method: method,
          dataType: dataType,
          success:function(res) {
            if(res && res.statusCOde == 200 && res.data){
              resolve(res.data)
            }else{
              self.alert('提示',res)
              reject(res)
            }
          },
          fail: function(err){
            self.log(err)
            self.alert('提示',res)
            reject(res)
          }
        })
      }
    })
  }
}

export default util


