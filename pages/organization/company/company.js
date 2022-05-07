// pages/organization/company/company.js\
import http from "../../../utils/api"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.globalData.imgUrl,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item = JSON.parse(options.item)
    //console.log(item)
    http.departmentListApi({
      data:{
        departmentId:item.id
      },
      success:res=>{
        console.log(res)
        for(let i in res){
          if(res[i] !== null){
            if(res[i].unifiedUserId !== undefined){
              res[i].userImg = this.data.imgUrl+res[i].userImage
            }
          }
        }
        this.setData({
          list:res
        })
      }
    })
  },

  userClick(e){ 
    //console.log(e)
    let state = e.detail.state
    if(state === '0'||state === '2'){
      wx.navigateTo({
        url: '/pages/organization/personalInformation/personalInformation?item='+JSON.stringify(e.currentTarget.dataset.item),
      })
    }
    if(state === '1'){
      wx.navigateTo({
        url: '/pages/organization/unitRanking/unitRanking?item='+JSON.stringify(e.currentTarget.dataset.item),
      })
    }
    // if(state === '2'){
    //   wx.navigateTo({
    //     url: '/pages/organization/departmentRanking/departmentRanking?item='+JSON.stringify(e.currentTarget.dataset.item),
    //   })
    // }
  },

  organizationClick(e){
    //console.log(e.currentTarget.dataset.item)
    if(e.currentTarget.dataset.item.isParent){
      wx.navigateTo({
        url: '/pages/organization/company/company?item='+JSON.stringify(e.currentTarget.dataset.item),
      })
    }else{
      wx.navigateTo({
        url: '/pages/organization/department/department?item='+JSON.stringify(e.currentTarget.dataset.item),
      })
    }
    
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