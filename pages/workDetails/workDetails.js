// pages/workDetails/workDetails.js
let wxParse = require('../../wxParse/wxParse')
import http from "../../utils/api"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.globalData.imgUrl,
    projectId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options !== undefined){
      this.setData({
        projectId:options.projectId
      })
    }
    let that=this;
    http.projectGetApi({
      data:{
        projectId:this.data.projectId
      },
      success:res=>{
        console.log(res)
        if(res.environmentalManagementPicture !== ""){
          res.environmentalManagementPictureImg = res.environmentalManagementPicture.split(',')
        }
        if(res.reorganizeSituationPicture !== ""){
          res.reorganizeSituationPictureImg = res.reorganizeSituationPicture.split(',')
        }
        this.setData({
          item:res
        })
        wxParse.wxParse('dataHtml','html',res.projectDescription,that, 5)
      }
    })
    
  },

  blqkClick(e){
    wx.navigateTo({
      url: '/pages/workDetails/explainDetails/explainDetails?projectid='+e.currentTarget.dataset.projectid+'&projectStatus='+e.currentTarget.dataset.projectstatus,
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