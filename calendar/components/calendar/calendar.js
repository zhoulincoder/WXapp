// components/calendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //外部调用传入的数据
    defaultValue: {
      type: String,
      value: ''
    },
    lastMonth: {
      type: String,
      value: '◀'
    },
    nextMonth: {
      type: String,
      value: '▶'
    },
    weekText: {
      type:Array,
      value: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    title: '',
    year:  0,
    month: 0,
    date: 0,
    //常量，用于匹配是否为当天
    YEAR: 0,
    MONTH: 0,
    DATE: 0,

    emptyGridsBefore: [],
    thisMonthDays: [],
    emptyGridsAfter: [],
    //格式化日期
    format: ''
  },
  ready() {
    this.today()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //初始化方法
    display(year, month, date) {
      this.setData({
        year,
        month,
        date,
        //zero 方法 补充月份的0
        title: year + '年' + this.zero(month) + '月'
      })
      //
      this.createDays(year, month);
      this.createEmptyGrids(year, month)
    },
    //默认选中当天的方法
    today() {
      let DATE = this.data.defaultValue ? new Date(this.date.defaultValue) : new Date(),
          year = DATE.getFullYear(),
          month = DATE.getMonth() + 1,
          date = DATE.getDate(),
          select = year + '-' + this.zero(month) + '-' + this.zero(date);
          console.log(month)
          this.setData({
            format: select,
            select: select,

            year: year,
            month: month,
            date: date,

            YEAR: year,
            MONTH: month,
            DATE: date
          })
      this.display(year, month, date)
      //发送事件监听 ?
      this.triggerEvent('select', select)
    },
    //绘制当月天数
    createDays(year, month) {
      let thisMonthDays = [],
          days = this.getThisMonthDays(year, month);
          //遍历
      for( let i = 1; i <= days; i++) {
        thisMonthDays.push({
          date: i,
          dateFormat: this.zero(i),
          monthFormat: this.zero(month),
          week: this.data.weekText[new Date(Date.UTC(year, month-1, i)).getDate()]
        })
      }
      console.log(thisMonthDays)
      this.setData({
        thisMonthDays: thisMonthDays
      })
    },
    //获取当月天数
    getThisMonthDays(year, month) {
      return new Date(year, month, 0).getDate()  //传入年月返回传入月天数
    },
    select(e) {
      console.log(e);
      let date = e.currentTarget.dataset.date,
          select = this.data.year + '-' + this.zero(this.data.month) + '-' + this.zero(date);
      this.setData({
        title: this.data.year + '年' + this.zero(this.data.month) + '月' + this.zero(date) + '日',
        select: select,
        year: this.data.year,
        month: this.data.month,
        date: date
      })

      this.triggerEvent('select', select)
          
    },
    //上一个月
    lastMonth() {
      let month = this.data.month == 1 ? 12 : this.data.month - 1,
          year = this.data.month == 1 ? this.data.year -1 : this.data.year;
      this.display(year, month, 0)
    },
    //下个月
    nextMonth() {
      let month = this.data.month == 12 ? 1 : this.data.month + 1,
          year = this.data.month == 12 ? this.data.year + 1 : this.data.year;
      this.display(year, month, 0)
    },
    //获取当月空出的天数
    createEmptyGrids(year, month){
      //这一天对应的星期
      let week = new Date(Date.UTC(year, month - 1, 1)).getDay(), 
          emptyGridsBefore= [],
          emptyGridsAfter= [],
          emptyDays = (week == 0 ? 7 : week);
          // 获取当月天数
      let thisMonthDays = this.getThisMonthDays(year, month);
      let preMonthDays = month - 1 < 0 ? this.getThisMonthDays(year - 1, 12) : this.getThisMonthDays(year, month -1);
      for (let i = 1; i <= emptyDays; i++) {
        //减去上月空出的星期
        emptyGridsBefore.push(preMonthDays - ( emptyDays - i))
      }
      let after = (42 - thisMonthDays - emptyDays) - 7 >= 0 ? (42 - thisMonthDays - emptyDays) - 7 : (42 - thisMonthDays - emptyDays);
      for (let i =1; i <= after; i++) {
        emptyGridsAfter.push(i)
      }
      this.setData({
        emptyGridsBefore,
        emptyGridsAfter,
      })
    },
    zero(e) {
      return e >= 10 ? e : '0' + e;
    }
  }
})
