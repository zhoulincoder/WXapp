// 云函数入口文件
const cloud = require('wx-server-sdk');
const request = require('request');
const cheerio = require('cheerio');
cloud.init()
function spiderYouhui() {
  return new Promise((resolve, reject) => {
    request('https://www.smzdm.com/youhui/', (err, res) => {
      if(err) {
        reject(err);
      }
      if (!err) {
        //console.log(res.body);
        console.log(2)
        const $ = cheerio.load(res.body, {
          // decodeEntities 要不要解析 html entity(&nbsp,$lt,&gt)
          decodeEntities: false
        })
        let list = [];
        $('.list.list_preferential').each(function () {
          //限制在当前项中查找
          const price = $('.listTitle .red', this).text();
          let title = $('.itemName a', this).html();
          //取代 <span></span> 为空格
          title = title.replace(/<.*>.*<\/.*>/g, '');
          const img = $('.picLeft img', this).attr('src');
          const desc = $('.lrInfo', this).text().trim();
          console.log({ title, price, img, desc });
          list.push({ title, price, img, desc });
        })
        resolve(list);
      }
    })
  })
}
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  //当try 代码出错走catch
  try {
    // await 后面接promise  返回promise  resolve时候的值
    // 执行爬虫
    // 没有await 先1后2；  加了await 书写顺序就是执行顺序先2后1
    const youhuiLists = await spiderYouhui();
    // console.log(1);
    return {
      code:200,
      youhuiLists
    }
  } 
  catch (err) {
    return {
      code:500
    }
  }
}