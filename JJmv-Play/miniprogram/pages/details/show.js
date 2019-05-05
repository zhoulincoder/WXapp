// miniprogram/pages/details/show.js
import {
  API_DETAIL
} from '../../config/api';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts: {

    },
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id;
    console.log(id)
    const url = `${API_DETAIL}/${id}`;
    // console.log(url)
    wx.request({
      url: API_DETAIL,
      success: (res) => {
        // console.log(res)
        console.log(res.data.data.Detail)
        const Detail =  res.data.data.Detail
         for(let i = 0; i < Detail.length; i++){
          if(id == Detail[i].id){
           var n = i
          }
        }
        this.setData({
          'posts': Detail[n]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})