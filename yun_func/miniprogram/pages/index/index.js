Page({
  http: function() {
    //从本地到云端
    wx.cloud.callFunction({
      name: 'http'
    })
    .then( res => {
      // 他是一个promise
      console.log(res);
    })     
  }
})