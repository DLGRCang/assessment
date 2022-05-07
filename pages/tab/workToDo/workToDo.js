// pages/tab/workToDo/workToDo.js
import http from "../../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:[
      {id:0,text:"正在督办"},
      {id:1,text:"已完结"}
    ],
    tabIndex:0,
    list:[],
    keywords:"",
    token : wx.getStorageSync('token')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  tabClick(e){
    //console.log(e.currentTarget.dataset.id)
    this.setData({
      tabIndex:e.currentTarget.dataset.id
    })
    this.listpageArr()
  },

  workClick(e){
    wx.navigateTo({
      url: '/pages/workDetails/workDetails?projectId='+e.currentTarget.dataset.projectid,
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
    this.setData({
      token:wx.getStorageSync('token')
    })
    if(wx.getStorageSync('token') !== ""){
      this.listpageArr()
    }
    
  },

  listpageArr(){
    http.listpageApi({ 
      data:{
        projectStatus:this.data.tabIndex === 0 ? "进行中":"已办结",
        keywords:this.data.keywords
      },
      success:res=>{
        if(res.length >= 0){
          this.setData({
            list:res
          })
        }
        
      }
    })
  },

  keywordsClick(e){
    this.setData({
      keywords:e.detail.value
    })
    this.listpageArr()
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