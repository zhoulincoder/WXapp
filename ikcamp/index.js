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
  }
}
