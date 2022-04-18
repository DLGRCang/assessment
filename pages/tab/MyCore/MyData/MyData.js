// pages/tab/MyCore/MyData/MyData.js
import http from "../../../../utils/api"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.globalData.imgUrl,
    resItem:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  lognClick(){
    wx.navigateTo({
      url: '/pages/logon/logon?item='+JSON.stringify(this.data.resItem),
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
    http.userInformationApi({
      success:res=>{
        let userFullTimeList = []
        let userOnJobList = []
        let userFullTimeQualification = res.userFullTimeQualification.split('/')
        let userFullTimeGraduationAcademy = res.userFullTimeGraduationAcademy.split('/')
        let userOnJobQualification = res.userOnJobQualification.split('/')
        let userOnJobGraduationAcademy = res.userOnJobGraduationAcademy.split('/')
        if(res.userFullTimeQualification !== ""){
          for(let i in userFullTimeQualification){
            userFullTimeList.push({id:Number(i),userFullTimeQualification:userFullTimeQualification[i],userFullTimeGraduationAcademy:userFullTimeGraduationAcademy[i]})
          }
        }
        if(res.userOnJobQualification !== ""){
          for(let i in userOnJobQualification){
            userOnJobList.push({id:Number(i),userOnJobQualification:userOnJobQualification[i],userOnJobGraduationAcademy:userOnJobGraduationAcademy[i]})
          }
        }
        
        res.userFullTimeList = userFullTimeList
        res.userOnJobList = userOnJobList
        //console.log(res)
        this.setData({
          resItem:res
        })
      }
    })
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