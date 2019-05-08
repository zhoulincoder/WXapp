// 云函数入口文件
const cloud = require('wx-server-sdk');
const env = 'yun-func-x0xnp';  //指出连接的环境id
cloud.init()
//获取数据库的句柄
const db = cloud.database({ env });

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  const userInfo = event.userInfo;
  //指向环境的集合
  return await db.collection('group').add({
    data: {
      name: event.groupName,
      createBy: userInfo.openId,
      createTime: new Date(),
      dlete: false,
      updateTime: new Date()
    }
  })
  .then(res => {
    return db.collection('user-group').add({
      data: {
        groupId: res._id,
        userId: userInfo.openId,
        invalid:false
      }
    })
  })
}