const db = wx.cloud.database();
const userInfo = db.collection('userInfo');


Page({
  data: {
    userList: []
  },
  getUserInfo: function (e) {
    console.log(e);
    // 取用户的 openid 是有安全问题，这是前端拿不到，  所以去云端
    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        console.log(res);
        //数据库查询
        userInfo
          .where({
            _openid: res.result.openId
          }).count()
          //查询结果是一个？
          .then(res => {
            if (res.total == 0) {
              //新用户
              userInfo.add({
                data: e.detail.userInfo
              })
                .then(res => {
                  wx.navigateTo({
                    url: '../add/add'
                  })
                })
              // 把用户存到数据库中， database
              // 用户表， 核心表 
            } else {
              console.log('已经存在');
              wx.navigateTo({
                url: '../add/add'
              })
            }
          })
      }
    })

    // table === collection 

  },
  onLoad: function () {
    userInfo
      .get()
      .then(res => {
        console.log(res);
        this.setData({
          userList: res.data
        })
      })
  }
})
