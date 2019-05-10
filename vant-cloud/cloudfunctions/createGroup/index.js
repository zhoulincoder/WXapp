const cloud = require('wx-server-sdk')
const env = 'yun-func-x0xnp'
cloud.init()
const db = cloud.database({ env });  //获取数据库的句柄

// 云函数入口函数
exports.main = async (event, context) => {
  const userInfo = event.userInfo
  return await db.collection('group').add({
    data: {
      name: event.groupName,
      createBy: userInfo.openId,
      createTime: new Date(),
      deleted: false,
      updateTime: new Date()
    }
  })
    .then(res => {
      return db.collection('user-group').add({
        data: {
          groupId: res._id,
          userId: userInfo.openId,
          invalid: false
        }
      })
    })
}

