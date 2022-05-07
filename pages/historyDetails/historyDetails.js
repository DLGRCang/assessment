// pages/tab/workToDo/workToDo.js
import http from "../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:[{indicatorsName:"全部",indicatorsId:""}],
    typeIndex:null,
    indicatorsThirdId:"",
    annualList:[{annualName:"全部",annualId:""}],
    annualIndex:"",
    annualId:"",
    tab:[
      {id:1,text:"通过"},
      {id:2,text:"未通过"}
    ],
    reportState:1,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.listbyparentidApi({
      data:{
        indicatorsId: "4c7df9d0-2a30-4f04-a904-c422c47ce863"
      },
      success:res=>{
        for(let i in res){
            this.listbyparentidList2(res[i].indicatorsId)
        }
      }
    })
    http.annualApi({
      success:res=>{
        //console.log(res)
        let annualList = this.data.annualList
        for(let i in res){
          annualList.push(res[i])
        }
        this.setData({
          annualList
        })
      }
    })
    this.reportRecordListArr()
  },

  reportRecordListArr(){
    let {reportState,annualId,indicatorsThirdId} = this.data
    http.reportRecordListApi({
      data:{
        reportState,annualId,indicatorsThirdId
      },
      success:res=>{
        //console.log(res)
        this.setData({
          list:res
        })
      }
    })
  },

  listbyparentidList2(id){
    http.listbyparentidApi({
      data:{
        indicatorsId: id,
        indicatorsType:1
      },
      success:res=>{
        for(let i in res){
          this.listbyparentidList3(res[i].indicatorsId)
        }
      }
    })
    
  },
  listbyparentidList3(id){
    http.listbyparentidApi({
      data:{
        indicatorsId: id
      },
      success:res=>{
        //console.log(res)
        let type = this.data.type
        for(let i in res){
          type.push(res[i])
        }
        this.setData({
          type
        })
      }
    })
    
    
  },

  tabClick(e){
    //console.log(e.currentTarget.dataset.id)
    this.setData({
      reportState:e.currentTarget.dataset.id
    })
    this.reportRecordListArr()
  },

  workClick(e){
    //console.log(e)
    let item = e.currentTarget.dataset.item
    if(item.reportState === 2){ 
      wx.navigateTo({
        url: '/pages/historyDetails/fileInDetails/fileInDetails?item='+JSON.stringify(item)
      })
    }
    
  },

  annualBindPickerChange: function (e) {
    this.setData({
      annualIndex: e.detail.value,
      annualId:this.data.annualList[e.detail.value].annualId
    })
    this.reportRecordListArr()
  },

  bindPickerChange: function (e) {
    this.setData({
      typeIndex: e.detail.value,
      indicatorsThirdId:this.data.type[e.detail.value].indicatorsId
    })
    this.reportRecordListArr()
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