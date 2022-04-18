// pages/signIn/signIn.js
import http from "../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    wxuser:undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  showFalse(){
    this.setData({
      show:false
    })
  },

  signClick(){
    let that = this
    wx.getUserProfile({
      desc: '完善用户资料',
      success:resu=>{
        this.setData({
          wxuser:resu.userInfo
        })
        
        wx.login({
          success: resa => {
            http.signApi({
              data:{
                jsCode:resa.code
              },
              success:res=>{
                let data = res.data.split('_')
                wx.setStorageSync('tokens',data[0])
                if(data[1] === "1"){
                  that.setData({
                    show:true
                  })
                }else{
                  wx.setStorageSync('wxuser',this.data.wxuser)
                wx.setStorageSync('token',data[0])
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000
                  })
                  setTimeout(()=>{
                    this.notTemporarily()
                  },2000)
                }
              }
            })
          }
        })
      }
    })
  },

  //不授权
  notTemporarily() {
    wx.navigateBack({
      delta: 1
    })
  },
  getPhoneNumber(e){
    http.updatePhoneApi({
      data:{
        encryptedData:e.detail.encryptedData,
        iv:e.detail.iv
      },
      success:resm=>{
        //console.log(resm)
        this.showFalse()
        let datas = resm.data.split('_')
        wx.setStorageSync('token',datas[0])
        wx.setStorageSync('wxuser',this.data.wxuser)
        wx.navigateTo({
          url: '/pages/logon/logon',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})