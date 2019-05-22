const cloud = require('wx-server-sdk')
const env = 'yun-func-x0xnp';  //指出连接的环境id
cloud.init()
const db = cloud.database({ env });  //获取数据库的句柄


// 云函数入口函数
exports.main = async (event, context) => {
  const openId = cloud.getWXContext().OPENID;  //数据库中获取openid  这个openid指的是什么呢创建者id还是发起请求人的id?
  let groupList = await db.collection('user-group')
    .where({
      userId: openId
    })
    .get()

  let returnResult = []
  for (let item of groupList.data) {
    const oneGroup = await db.collection('group')
      .where({
        _id: item.groupId,
        deleted: false
      })
      .get()
      //往后不太理解
    if (oneGroup.data.length > 0) {
      const userInfo = await db.collection('user')
        .where({
          openId: oneGroup.data[0].createBy
        })
        .get()

      oneGroup.data[0].createBy = userInfo.data[0];  //添加属性createBy = userInfo.data[0]
      oneGroup.data[0].relateUserGroupId = item._id; // relateUserGroupId = item._id
      returnResult.push(oneGroup.data[0]);
    }
  }
  return returnResult.sort((a, b) => {
    a.createTime < b.createTime ? 1 : -1
  })
}