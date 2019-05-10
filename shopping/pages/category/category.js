// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [
      { name: '果味', id: 'guowei' },
      { name: '蔬菜', id: 'shucai' },
      { name: '炒货', id: 'chaohuo' },
      { name: '点心', id: 'dianxin' },
      { name: '粗茶', id: 'cucha' },
      { name: '淡饭', id: 'danfan' }
    ],
    curIndex: 0,
    toView: 'guowei',
    isScoll: false
  },
  switchTab(e) {
    console.log(e)
    //绑定的点击事件 会打印自定的属性
    this.setData({
      curIndex: e.currentTarget.dataset.index,
      toView: e.currentTarget.dataset.id
    })
  },
  bindScroll(e) {
    const self = this;
    console.log(e.detail.scrollTop)
    if(e.detail.scrollTop > 0 && e.detail.scrollTop <= 240) {
      console.log(e.detail.scrollTop)
      self.setData({
        toView: 'guowei'
      })
    }
    if(e.detail.scrollTop > 240 && e.detail.scrollTop <= 555) {
      console.log(e.detail.scrollTop)
      self.setData({
        toView: 'shucai'
      })
    }
    if(e.detail.scrollTop > 555 && e.detail.scrollTop <= 1110) {
      console.log(e.detail.scrollTop)
      self.setData({
        toView: 'chaohuo'
      })
    }
    if(e.detail.scrollTop > 1110 && e.detail.scrollTop <= 1665) {
      console.log(e.detail.scrollTop)
      self.setData({
        toView: 'dianxin'
      })
    }
    if(e.detail.scrollTop > 1665 && e.detail.scrollTop <= 2220) {
      console.log(e.detail.scrollTop)
      self.setData({
        toView: 'cucha'
      })
    }
    if(e.detail.scrollTop > 2220 && e.detail.scrollTop <= 2775) {
      console.log(e.detail.scrollTop)
      self.setData({
        toView: 'danfan'
      })
    }
    
  },
  // toview 动 菜单栏添加on
  // scrollTop() {
  //   const categoryRight = document.getElementsByClassName('category-right');
  //   let num = categoryRight.scrollTop();
  //   console.log(num + 'px')
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(1)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let self = this;
    console.log(3);
    wx.request({
      url: 'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
      success(res) {
        self.setData({
          detail:res.data
        })
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(2)
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