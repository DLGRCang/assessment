import http from "../../../utils/api"
// pages/organization/department/department.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    imgUrl:app.globalData.imgUrl,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item = JSON.parse(options.item)

    http.departmentUserListApi({
      data:{
        departmentId:item.id
      },
      success:res=>{
        //console.log(res)
        for(let i in res){
          res[i].userImg = this.data.imgUrl+res[i].userImage
          if(Number(i) === (res.length-1)){
            this.setData({
              title:options.isTrue ? item.departmentName:item.name,
              list:res
            })
            //console.log(this.data.list)
          }
        }
        
      }
    })
  },

  userClick(e){ 
    //console.log(e)
    let state = e.detail.state
    if(state === '0'){
      wx.navigateTo({
        url: '/pages/organization/personalInformation/personalInformation?item='+JSON.stringify(e.currentTarget.dataset.item),
      })
    }
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