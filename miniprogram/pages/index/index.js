//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    books:[
      {
        title:"书1",
        description:"书1的介绍",
      },
      {
        title:"书2",
        description:"书2的介绍",
      },
    ],
    IDX:1
  },

  onLoad: function() {
    //前端读取图书列表
    wx.cloud.callFunction({
      name:'getBooks',
    }).then((data)=>{
      console.log("图书打印")
      console.log(data)
      this.setData({books:data.result.data})
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  handleAdd(){
    //前端调用添加接口
    console.log("123456");
    wx.cloud.callFunction({
      name:'addBook',
      data:{
        title:'书'+this.data.IDX,
        description:'书'+this.data.IDX+"的介绍"
      }
    }).then((data)=>{
      console.log(data)
    })
  }

})
