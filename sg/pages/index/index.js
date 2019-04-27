// pages/index/index.js
import {
  API_BASE 
 } from '../../config/api'
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    entities:[],
    currentPage: 1,
    totalPages: 1,
    isLoading: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: API_BASE,
      success: (res) => {
        console.log(res)
        this.setData({
          isLoading: false,
          currentPage: 1,
          total: res.data.data.total,
          isEarth: false,
          totalPages: res.data.data.totalPages,
          entities: res.data.data.articles
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
  onPullDownRefresh () {
    // console.log('pulldown');
    this.data.currentPage =1
    wx.request({
      url: API_BASE,
      success: (response) => {
        const entities = response.data.data.articles;
        this.setData({
          entities,
          isLoading: false,
          total: response.data.data.total,
          totalPages: response.data.data.totalPages,
          currentPage: 1,
          isEarth: false
        });
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let { currentPage, totalPages, isLoading } = this.data
    // console.log(currentPage, totalPages, isLoading)
    if (currentPage >= totalPages || isLoading) {
      return
    }
    this.setData({
      isLoading: true
    });
    currentPage = currentPage + 1
    wx.request({
      url: API_BASE,
      success: (response) => {
        const entities = [...this.data.entities, ...response.data.data.articles];
        // console.log(entities);
        this.setData({
          entities,
          currentPage,
          isLoading: false,
          total: response.data.data.total,
          isEarth: currentPage >= totalPages,
          totalPages: response.data.data.totalPages,
          entities: entities
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})