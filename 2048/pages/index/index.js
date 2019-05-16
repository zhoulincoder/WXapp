//index.js
//获取应用实例
const app = getApp()
const GameManager = require('./game_manager.js')
Page({
  data: {
   score: 0,
   highscore: 0,
   grids:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  gameManager: null,
  onLoad: function () {
    this.gameManager = new GameManager(4);
    this.setData({
      grids: this.gameManager.setup()
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
