// pages/fileInDetails/fileInDetails.js
import http from "../../utils/api"
import {showTE,showTS} from "../../utils/util"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.globalData.imgUrl,
    date:'',
    dateEnd: new Date().getFullYear(),
    optionsItem:undefined,
    updateItem:undefined,
    annualList:[],
    annualIndex:null,
    listbyparentidList:[],
    typeIndex:null,
    images: [],
    imgId:[],
    reportBase:null,
    annualId:"",
    indicatorsThirdId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let optionsItem
    if(options.item !== undefined){
      optionsItem = JSON.parse(options.item)
      this.setData({
        optionsItem
      })
    }
    let updateItem
    if(options.updateItem !== undefined){
      updateItem = JSON.parse(options.updateItem)
      let images = this.data.images
      let imgId = updateItem.image
      for(let i in updateItem.image){
        images.push(this.data.imgUrl+updateItem.image[i])
      }
      this.setData({
        reportBase:updateItem.reportBase,
        updateItem,
        images,
        imgId
      }) 
    }
    //console.log(optionsItem)
    
    
    http.annualApi({
      success:res=>{
        if(optionsItem === undefined){
          for(let i in res){
            if(res[i].annualName === updateItem.annualName){
              this.setData({
                annualId:res[i].annualId,
                annualIndex:i
              })
            }
          }
        }
        this.setData({
          annualList:res
        })
      }
    })

    http.listbyparentidApi({
      data:{
        indicatorsId: optionsItem === undefined ? updateItem.indicatorsSecondId:optionsItem.indicatorsId
      },
      success:res=>{
        if(optionsItem === undefined){
          for(let i in res){
            if(res[i].indicatorsId === updateItem.indicatorsThirdId){
              this.setData({
                indicatorsThirdId:res[i].indicatorsId,
                typeIndex:i
              })
            }
          }
        }
        this.setData({
          listbyparentidList:res
        })
      }
    })
  },

  annualBindPickerChange: function (e) {
    this.setData({
      annualIndex: e.detail.value,
      annualId:this.data.annualList[e.detail.value].annualId
    })
  },

  inputClick(event){
    const {name,value} = event.detail
    this.setData({
      [name]:value
    })
  },

  bindPickerChange: function (e) {
    this.setData({
      typeIndex: e.detail.value,
      indicatorsThirdId:this.data.listbyparentidList[e.detail.value].indicatorsId
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

  submitClick(e){
    var rex = /^[0-9]+$/;
    const {annualId,indicatorsThirdId,reportBase,optionsItem,imgId,updateItem} = this.data
    let reportData = ""
    for(let i in imgId){
      if(Number(i) === imgId.length-1){
        reportData=reportData+imgId[i]
      }else{
        reportData=reportData+imgId[i]+','
      }
    }
    var flag = rex.test(reportBase);
    if(showTE(annualId,'请选择年度')) return
    if(showTE(indicatorsThirdId,'请选择类型')) return
    if(optionsItem === undefined ? updateItem.reportBase !== 0:optionsItem.integralType === 2) if(showTE(reportBase,'请输入上报基数')) return
    if(optionsItem === undefined ? updateItem.reportBase !== 0:optionsItem.integralType === 2) if(showTE(flag,'请输入数字')) return
    if(optionsItem === undefined ? updateItem.reportBase !== 0:optionsItem.integralType === 2) if(reportBase === '0' ? showTE('','基数不能为0'):'') return
    if(showTE(reportData,'请上传佐证材料')) return
    if(e.currentTarget.dataset.type === "true"){
      http.reportRecordApi({
        data:{
          annualId,indicatorsThirdId,reportBase,reportData
        },
        success:res=>{
          if(res.code === 200){
            showTS('','提交成功')
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1
              })
            },2000)
  
          }else{ 
            showTE('',res.msg)
          }
        }
      })
    }else{
      let indicatorsFristId = updateItem.indicatorsFristId
      let indicatorsSecondId = updateItem.indicatorsSecondId
      http.updatereportrecordApi({
        data:{
          indicatorsFristId,indicatorsSecondId,
          annualId,indicatorsThirdId,reportBase,reportData,
          reportState:0
        },
        success:res=>{
          showTS('','修改成功')
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1
              })
            },2000)
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