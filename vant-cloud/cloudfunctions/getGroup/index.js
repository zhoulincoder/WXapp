// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'yun-func-x0xnp';  //指出连接的环境id
cloud.init()
const db = cloud.database({env});  //获取数据库的句柄


// 云函数入口函数
exports.main = async (event, context) => {
  const openId = cloud.getWXContext.OPENID;  //数据库中获取openid
  console.log(openId)
  let groupList = await db.collection('user-group')
  .where({
    userId: openId
  })
  .get()
  let returnResult = [];
  for( let item of groupList.data){
    const oneGroup = await db.collection('group')
    .where({
      _id: item.groupId,
      deleted: false 
    })
    .get()
    if(oneGroup.data.length > 0) {
      const userInfo = await db.collection('user')
      .where({
        while () {
          openId: oneGroup.data[0].createBy
        }
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
  // console.log('getGroup' + event)
  // //先取出集合记录总数
  // const countResult = await db.collection('group').count()
  // const total = countResult.total
  // // 计算需分几次取
  // const batchTimes = Math.ceil(total / 100)
  // // 承载所有读操作的 promise 的数组
  // const tasks = []
  // for (let i = 0; i < batchTimes; i++) {
  //   const promise = db.collection('group').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
  //   tasks.push(promise)
  // }
  // // 等待所有
  // return (await Promise.all(tasks)).reduce((acc, cur) => ({
  //   data: acc.data.concat(cur.data),
  //   errMsg: acc.errMsg
  // }))

  // db.collection('group').doc('yun-func-x0xnp').get({
  //   success(res) {
  //     // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
  //     console.log(res.data)
  //   }
  // })
}