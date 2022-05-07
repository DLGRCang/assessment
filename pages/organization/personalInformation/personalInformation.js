// pages/organization/personalInformation/personalInformation.js
import http from "../../../utils/api"
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
  onLoad(options) {
    let item = JSON.parse(options.item)
    let userFullTimeList = []
    let userOnJobList = []
    let userFullTimeQualification = item.userFullTimeQualification.split('/')
    let userFullTimeGraduationAcademy = item.userFullTimeGraduationAcademy.split('/')
    let userOnJobQualification = item.userOnJobQualification.split('/')
    let userOnJobGraduationAcademy = item.userOnJobGraduationAcademy.split('/')
    if(item.userFullTimeQualification !== ""){
      for(let i in userFullTimeQualification){
        userFullTimeList.push({id:Number(i),userFullTimeQualification:userFullTimeQualification[i],userFullTimeGraduationAcademy:userFullTimeGraduationAcademy[i]})
      }
    }
    if(item.userOnJobQualification !== ""){
      for(let i in userOnJobQualification){
        userOnJobList.push({id:Number(i),userOnJobQualification:userOnJobQualification[i],userOnJobGraduationAcademy:userOnJobGraduationAcademy[i]})
      }
    }
    
    item.userFullTimeList = userFullTimeList
    item.userOnJobList = userOnJobList
    console.log(item)
    this.setData({
      resItem:item
    })
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})