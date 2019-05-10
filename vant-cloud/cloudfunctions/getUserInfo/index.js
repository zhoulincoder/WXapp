const cloud = require('wx-server-sdk')
const env = 'yun-func-x0xnp'
cloud.init()
const db = cloud.database({ env })
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const groupNum = await db.collection('user-group')
    .where({
      userId: cloud.getWXContext().OPENID
    })
    .get()

  const storeUser = await db.collection('user')
    .where({
      openId: cloud.getWXContext().OPENID
    })
    .get()

  return {
    groupNum: groupNum.data.length,
    storeUser: storeUser.data[0]
  }
}

