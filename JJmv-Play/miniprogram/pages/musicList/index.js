//index.js
const db = wx.cloud.database();
const app = getApp()

Page({
  data: {
    imageUrl: [
      'https://images.pexels.com/photos/556666/pexels-photo-556666.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/1262304/pexels-photo-1262304.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/257840/pexels-photo-257840.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    ],
    mvmsgs: []
  },
  onLoad: function(option) {
    wx.showLoading({
      title: '数据加载中'
    })

    db
      .collection('mvmsgs')
      .get({
        success: res => {
          console.log(res);
          if(res.data.length) {
            this.setData({
              mvmsgs: res.data
            });
          }
          wx.hideLoading();
        },
        error: err => {
          console.log('error')
        }
      })
  }

})

