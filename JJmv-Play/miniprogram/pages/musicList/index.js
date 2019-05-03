//index.js
const db = wx.cloud.database();
const app = getApp()

Page({
  data: {
    imageUrl: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
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
              mvmsgs: res.data.reverse()
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