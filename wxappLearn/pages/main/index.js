Page({
  data: {
    city: "南昌",
    imageUrl: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    items: []
  },
  onLoad() {
    let that = this
    wx.request({
      url: "https://www.easy-mock.com/mock/5cbeb473d2955f5e587f936d/",
      data: {},
      method: 'GET',
      header: {'Content-type': 'application/json'},
      success: function(res) {
        console.log(res)
        that.setData({
          items: res.data.data.movieList
        })
        
      }
    })
  }
})