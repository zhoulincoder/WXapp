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
        if (res && res.status === 0 && res.data && res.data.length) {
          let articleData = res.data
          // 格式化原始数据
          let formatData = this.formatArticleDate(articleData)
          console.log(formatData)
          this.renderArticle(formatData);
        }
      })
  },
  //date
  dateConvert(dateStr) {
    if (!dateStr) {
      return ''
    }
    let today = new Date(),
      todayYear = today.getFullYear(),
      todayMonth = ('0' + (today.getMonth() + 1)).slice(-2),
      todayDay = ('0' + today.getDate()).slice(-2);
    console.log(today);
    let convertStr = '';
    let originYear = + dateStr.slice(0, 4);
    let todayFormat = `${todayYear}-${todayMonth}-${todayDay}`
    if (dateStr === todayFormat) {
      convertStr = '今日'
    } else if (originYear < todayYear) {
      let splitStr = dateStr.split('-')
      convertStr = `${splitStr[0]}年${splitStr[1]}月${splitStr[2]}日`
    } else {
      // convertStr = dateStr.replace('-', '月') + '日'
    }
    return convertStr
  },
  formatArticleDate(data) {
    let formatData = undefined
    if (data && data.length) {
      formatData = data.map((group) => {
        group.formateDate = this.dateConvert(group.date)
        // 在group上加一个属性formateData 
        if (group && group.articles) {
          let formatArticleItems = group.articles.map((item) => {
            item.hasVisited = this.isVisited(item.contentId)
            return item
          }) || []
          group.articles = formatArticleItems
        }
        return group
      })
    }
    return formatData
  },
  isVisited(contentId) {
    let vistedArticles = app.globalData && app.globalData.vistedArticles || ''
    return vistedArticles.indexOf(`${contentId}`) > -1
  },
  renderArticle(data) {
    if(data && data.length){
      let newList = this.data.articleList.concat(data)
      this.setData({
        articleList: newList,
        hiddenLoading: true
      })
    }
  },
  onReachBottom() {
    if(this.data.hasMore) {
      let nextPage = this.data.page + 1;
      this.setData({
        page: nextPage
      })
      this.requestArticle()
    }
  }
}
Page(handle);