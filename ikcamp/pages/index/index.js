import util from "../../utils/index"
import config from "../../utils/config"

let app = getApp();
//避免使用page{}
let isDEV = config.isDev;
// 判断是什么环境  mock
let handle = {
  data: {
    page: 1,
    days: 3,
    pageSize: 4,
    //上拉加载更多   每次请求四条
    totalSize: 0,
    hasMore: true,
    //没有更多数据了， 
    articleList: [],
    // 数据存放 
    defaultImg: config.defaultImg,
    hiddenLoading: false
    // 显示loading
  },
  onLoad() {
    this.requestArticle()
  },
  requestArticle() {
    util.request({
      url: 'list',
      mock: true,
      data: {
        tag: '微信热门',
        start: this.data.page || 1,
        days: this.data.days || 3,
        pageSize: this.data.pageSize || 4,
        langs: config.appLang || 'en'
      }
    })
    .then(res => {
      console.log(res);
    })
  }
}
Page(handle);