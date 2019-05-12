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
    isScroll: false,
    detail: '',
    heightArr: [],
    lastActive: 0,
    conHeight: 0
  },
  switchTab(e) {
    this.setData({
      curIndex: e.target.dataset.index,
      toView: e.target.dataset.id
    })
  },
  switchContent(e) {
    let _this = this
    //console.log(e)
    console.log(e.detail.scrollTop);
    const scrollTop = e.detail.scrollTop;
    const scorllArr = this.data.heightArr;
    if (scrollTop >= scorllArr[scorllArr.length - 1] - (_this.data.conHeight / 2)) {
      //滚动条距离顶端的值 >= 高度数组最后一个值(滚动页面总高度3330px) - (当前可视区域高度1110rpx / 2)
      //此时页面滚到底部
      return;
    } else {
      for (let i = 0; i < scorllArr.length; i++) {
        //下面两个if 可以写成且？
        //lastActive 什么意思
        if (scrollTop >= 0 && scrollTop < scorllArr[0]) {
          // 垂直滚动条的位置 >= 零 并且小于等于高度数组中第一个值555这与下面的if条件冲突了
          //所以增加lastActive 判断
          //保证0页面和1页面的过渡自然
          if (0 != _this.data.lastActive) {
            _this.setData({
              curIndex: 0,
              lastActive: 0,
            })
          }
        } else if (scrollTop >= scorllArr[i - 1] -100 && scrollTop < scorllArr[i]) {
          //垂直滚动条的位置 >= 
          if (i != _this.data.lastActive) {
            console.log(i)
            _this.setData({
              curIndex: i,
              lastActive: i,
            })
          }

        }
      }
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth)
        let windowHeight = (res.windowHeight * (750 / res.windowWidth));
        //console.log(windowHeight) //最后获得转化后得rpx单位的窗口高度 1110rpx
        _this.setData({
          conHeight: windowHeight,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.request({
      url: 'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
      success: (res) => {
        // console.log(res)
        this.setData({
          detail: res.data
        })
        let _this = this
        let heightArr = [];
        let h = 0;
        //创建节点选择器
        const query = wx.createSelectorQuery();
        //选择id
        query.selectAll('.cate-box').boundingClientRect()
        query.exec(function (res) {
          console.log(res)
          //res就是 所有标签为cate-box的元素的信息 的数组
          res[0].forEach((item) => {
            h += item.height;
            heightArr.push(h);
          })
          _this.setData({
            heightArr: heightArr
          })
          console.log(_this.data.heightArr)
        })
      }
    })
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