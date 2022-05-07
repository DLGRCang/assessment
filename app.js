// app.js
const {baseurl} = require('./utils/env').prod
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    this.globalData.imgUrl = baseurl+'/assessmentmanagement/route/file/download/false/'
  },
  globalData: {
    userInfo: null
  }
})
