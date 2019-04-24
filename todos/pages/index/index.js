Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:{},
    addShow: false,
    addText: '',
    todos: []
  },
  getUserInfo: function(e) {
    // console.log(e);
    this.setData({
      userInfo: e.detail.userInfo,
      // MVVM编程 响应式 状态
      hasUserInfo: true
    })
  },
  addTodoShow: function(e) {
    this.setData({
      addShow: true
    })
  },
  addTodoHide: function(e) {
    this.setData({
      addShow: false
    })
  },
  addInput: function(e) {
    this.setData({
      addText: e.detail.value
    })
  },
  addTodo: function() {
    //输入框有内容
    //todos  界面上wx:for      setData() 重新绘制页面
    // 退出输入状态
    
    if(!this.data.addText.trim()){
      return;
    } 
    let todos = this.data.todos
    todos.push({
      id:new Date().getTime(),
      title:this.data.addText,
      status: '0'
    })
    this.setData({
      todos
    });
    this.addTodoHide();
  }
})
