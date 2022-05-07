// pages/tab/MyCore/MyCore.js
import utils from "../../../utils/util"
import http from "../../../utils/api"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.globalData.imgUrl,
    wxuser:undefined,
    resItem:undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  my_data(){
    if(utils.login()){
      wx.navigateTo({
        url: '/pages/tab/MyCore/MyData/MyData'
      })
    }
    
  },
  logonClick(){
    utils.login()
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
    this.setData({
      wxuser:wx.getStorageSync('wxuser')
    }) 
    if(wx.getStorageSync('token') !== ""){
      http.userInformationApi({
        success:res=>{
          //console.log(res)
          let userFullTimeList = []
          let userOnJobList = []
          if(res.userFullTimeQualification !== ""){
            let userFullTimeQualification = res.userFullTimeQualification.split('/')
            let userFullTimeGraduationAcademy = res.userFullTimeGraduationAcademy.split('/')
            for(let i in userFullTimeQualification){
              userFullTimeList.push({id:Number(i),userFullTimeQualification:userFullTimeQualification[i],userFullTimeGraduationAcademy:userFullTimeGraduationAcademy[i]})
            }
          }
          if(res.userOnJobQualification !== ""){
            let userOnJobQualification = res.userOnJobQualification.split('/')
            let userOnJobGraduationAcademy = res.userOnJobGraduationAcademy.split('/')
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
    }
    
  },

  lognClick(){
    if(this.data.resItem.userInformationId === ""){
      wx.navigateTo({
        url: '/pages/logon/logon'
      })
    }else{
      wx.navigateTo({
        url: '/pages/logon/logon?item='+JSON.stringify(this.data.resItem),
      })
    }
    
  },

  userClick(e){
    let state = e.currentTarget.dataset.state
    if(state === '1'){
      wx.navigateTo({
        url: '/pages/organization/unitRanking/unitRanking?item='+JSON.stringify(e.currentTarget.dataset.item),
      })
    }
    if(state === '2'){
      wx.navigateTo({
        url: '/pages/organization/departmentRanking/departmentRanking?item='+JSON.stringify(e.currentTarget.dataset.item),
      })
    }
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