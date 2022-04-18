// pages/tab/information/information.js
import http from "../../../utils/api"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.globalData.imgUrl,
    list:[
      // {id:1,text:"驻村",image:"../../../image/inform/1.png",url:"/pages/fileInDetails/fileInDetails"},
      // {id:2,text:"工作外派",image:"../../../image/inform/2.png",url:"/pages/fileInDetails/fileInDetails"},
      // {id:3,text:"道德荣誉",image:"../../../image/inform/3.png",url:"/pages/fileInDetails/fileInDetails"},
      // {id:4,text:"学历及职称",image:"../../../image/inform/4.png",url:"/pages/fileInDetails/fileInDetails"},
      // {id:5,text:"党支部活动",image:"../../../image/inform/5.png",url:"/pages/fileInDetails/fileInDetails"},
      // {id:6,text:"单位活动",image:"../../../image/inform/6.png",url:"/pages/fileInDetails/fileInDetails"},
      // {id:7,text:"单位会议",image:"../../../image/inform/7.png",url:"/pages/fileInDetails/fileInDetails"},
      // {id:8,text:"工作荣誉或学术成果",image:"../../../image/inform/8.png",url:"/pages/fileInDetails/fileInDetails"},
      // {id:9,text:"党风廉政",image:"../../../image/inform/9.png",url:"/pages/fileInDetails/fileInDetails"},
      // {id:10,text:"廉政教育活动",image:"../../../image/inform/10.png",url:"/pages/fileInDetails/fileInDetails"},
      // {id:11,text:"填报历史",image:"../../../image/inform/11.png",url:"/pages/historyDetails/historyDetails"},
    ],
    token:wx.getStorageSync('token')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  listbyparentidList2(id,isTrue){
    let list = this.data.list
    if(isTrue) list.push({indicatorsName:"填报历史",image:"../../../image/inform/11.png",url:"/pages/historyDetails/historyDetails"})
    http.listbyparentidApi({
      data:{
        indicatorsId: id,
        indicatorsType:1
      },
      success:res=>{
        for(let i in res){
          res[i].url = "/pages/fileInDetails/fileInDetails"
          res[i].image = this.data.imgUrl+res[i].indicatorsIcon
          list.push(res[i])
        }
        this.setData({
          list
        })
      }
    })
    
        
  },



  formClick(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url+'?item='+JSON.stringify(e.currentTarget.dataset.item)
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
      token : wx.getStorageSync('token')
    })
    let token = wx.getStorageSync('token')
    if(token === ""){

    }else{

      if(this.data.list.length === 0){
        http.listbyparentidApi({
          data:{
            indicatorsId: "4c7df9d0-2a30-4f04-a904-c422c47ce863"
          },
          success:res=>{
            //console.log(res)
              for(let i in res){
                if(Number(i) === (res.length-1)){
                  this.listbyparentidList2(res[i].indicatorsId,true)
                }else{
                  this.listbyparentidList2(res[i].indicatorsId,false)
                }
              }
          }
        })
      }
      
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