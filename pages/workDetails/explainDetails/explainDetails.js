// pages/workDetails/explainDetails/explainDetails.js
import http from "../../../utils/api"
import {showTE} from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[],
    imgId:[],
    environmentalManagement:"",
    projectId:"",
    projectStatus:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      projectId:options.projectid,
      projectStatus:options.projectStatus
    })
  },

  inputClick(event){
    const {name,value} = event.detail
    this.setData({
      [name]:value
    })
  },

  chooseImage(e){
    let images = this.data.images
    let imgId = this.data.imgId
    images.push(e.detail.url)
    imgId.push(e.detail.imgId)
    this.setData({
      images,
      imgId
    })
  },

  deleteImage(e){
    let images = this.data.images
    let imgId = this.data.imgId
    images.splice(e.detail,1)
    imgId.splice(e.detail,1)
    this.setData({
      images,
      imgId
    })
  },

  submit(){
    const {imgId,projectId,environmentalManagement,projectStatus} = this.data
    let environmentalManagementPicture = ""
    for(let i in imgId){
      if(Number(i) === imgId.length-1){
        environmentalManagementPicture=environmentalManagementPicture+imgId[i]
      }else{
        environmentalManagementPicture=environmentalManagementPicture+imgId[i]+','
      }
    }
    if(showTE(environmentalManagement,'请输入办理情况')) return
    if(showTE(environmentalManagementPicture,'请上传附件')) return
    if(projectStatus === "超时"||projectStatus === "进行中"){
      http.couplebackApi({
        data:{
          projectId,
          environmentalManagement,
          environmentalManagementPicture
        },
        success:res=>{
          if(Object.keys(res).length === 0){
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })
            let pages = getCurrentPages();
              let prevPage = pages[pages.length - 2]; 
              prevPage.onLoad();
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1
              })
            },2000)

          }
        }
      })
    }else if(projectStatus === "整改"){
      http.reorganizeSituationApi({
          data:{
            projectId,
            reorganizeSituation:environmentalManagement,
            reorganizeSituationPicture:environmentalManagementPicture
          },
          success:res=>{
            console.log(res)
            if(Object.keys(res).length === 0){
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000
              })
              let pages = getCurrentPages();
                let prevPage = pages[pages.length - 2]; 
                prevPage.onLoad();
              setTimeout(()=>{
                wx.navigateBack({
                  delta: 1
                })
              },2000)
  
            }
          }
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