// pages/logon/logon.js
import http from "../../utils/api"
import {showTE} from "../../utils/util"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.globalData.imgUrl,
    userName:"",
    sex:[{id:1,name:'男'},{id:2,name:'女'}],
    userIndex:null,
    userSex:'',
    userBirthDay:'',
    dateEnd: new Date(),
    userPartyTime:'',
    userHaveJob:'',
    healthy:['健康','不健康'],
    userHealthCondition:'',
    userHealthConditionIndex:null,
    education:['小学','中学','高中','大专','本科','研究生'],
    loopList:[
      {education:"",major:"",userFullTimeQualificationIndex:null}
    ],
    loopList1:[
      {education:"",major:"",userOnJobQualificationIndex:null}
    ],
    userFamilyVOS:[
      {appellation:"",userName:"",userAge:"",politicalLandscape:"",workUnitsPosition:"",appellationIndex:null,politicalLandscapeIndex:null}
    ],
    face:['中共党员','中共预备党员','共青团员','群众','民革党员','民盟盟员','民建会员','民进会员','农工党党员','致公党党员','九三学社社员','台盟盟员','无党派人士'],
    appellation:['爸爸','妈妈'],
    images: [],
    imgId:[],
    nation:[],
    nationindex:'',
    userNation:'',
    userNativePlace:[],
    userBirthPlace:[],
    userProfessionalTechnologyPosition:"",
    userSpecialty:"",
    userFullTimeGraduationAcademy:"",
    userFullTimeQualification:"",
    userResume:"",
    userRewardsPunishmentsSituation:"",
    userCredentials:"",
    lognItem:undefined,
    updateTrue:false,
    userInformationId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.listallbyparentidApi({
      data:{
        listallbyparentid:'9fa4f1e3-2429-4e01-be4e-6e01e25276ba'
      },
      success:res=>{
        this.setData({
          nation:res
        })
        if(options.item !== undefined){
          let item = JSON.parse(options.item)
          let nationIndex = null
          for(let i in this.data.nation){
              if(this.data.nation[i].dataId === item.userNation){
                nationIndex = i
              }
          }
          let userIndex = null
          for(let i in this.data.sex){
            if(item.userSex === this.data.sex[i].name){
              userIndex = i
            }
          }
          let userHealthConditionIndex = null
          for(let i in this.data.healthy){
            if(item.userHealthCondition === this.data.healthy[i]){
              userHealthConditionIndex = i
            }
          }
          let loopList = this.data.loopList
          if(item.userFullTimeList.length !== 0){
            loopList = []
            for(let i in item.userFullTimeList){
              for(let n in this.data.education){
                if(item.userFullTimeList[i].userFullTimeQualification === this.data.education[n]){
                  loopList.push({education:item.userFullTimeList[i].userFullTimeQualification,major:item.userFullTimeList[i].userFullTimeGraduationAcademy,userFullTimeQualificationIndex:n})
                }
              }
            }
          }
          
          let loopList1 = this.data.loopList1
          if(item.userOnJobList.length !== 0){
            loopList1 = []
            for(let i in item.userOnJobList){
              for(let n in this.data.education){
                if(item.userOnJobList[i].userOnJobQualification === this.data.education[n]){
                  loopList1.push({education:item.userOnJobList[i].userOnJobQualification,major:item.userOnJobList[i].userOnJobGraduationAcademy,userOnJobQualificationIndex:n})
                }
              }
            }
          }
          
          if(item.userFamilyDTOS.length !== 0){
            for(let i in item.userFamilyDTOS){
              for(let n in this.data.face){
                if(item.userFamilyDTOS[i].politicalLandscape === this.data.face[n]){
                  item.userFamilyDTOS[i].politicalLandscapeIndex = n
                }
              }
              for(let m in this.data.appellation){
                  if(item.userFamilyDTOS[i].appellation === this.data.appellation[m]){
                    item.userFamilyDTOS[i].appellationIndex = m
                  }
              }
            }
          }
          
          let images = this.data.images
          let imgId = this.data.imgId
          if(item.userImage !== ''){
            imgId.push(item.userImage)
            images.push(this.data.imgUrl+item.userImage)
          }
          this.setData({
            userName:item.userName,
            userIndex:userIndex,
            userSex:item.userSex,
            userNation:item.userNation,
            userHealthCondition:item.userHealthCondition,
            userBirthDay:item.userBirthDay,
            nationIndex:nationIndex,
            userNativePlace:item.userNativePlace !== "" ? item.userNativePlace.split('-'):"",
            userBirthPlace:item.userBirthPlace !== "" ? item.userBirthPlace.split('-'):"",
            userPartyTime:item.userPartyTime,
            userHaveJob:item.userHaveJob,
            userHealthConditionIndex:userHealthConditionIndex,
            userProfessionalTechnologyPosition:item.userProfessionalTechnologyPosition,
            userSpecialty:item.userSpecialty,
            loopList:loopList,
            loopList1:loopList1,
            userResume:item.userResume,
            userRewardsPunishmentsSituation:item.userRewardsPunishmentsSituation,
            userCredentials:item.userCredentials,
            userFamilyVOS:item.userFamilyDTOS.length !== 0 ? item.userFamilyDTOS:this.data.userFamilyVOS,
            imgId:imgId,
            images:images,
            updateTrue:true,
            userInformationId:item.userInformationId
          })
        }
      }
    })
    
    
  },

  educationClick(){
    let loopList = this.data.loopList
    for(let i in loopList){
      if(Number(i) === (loopList.length-1)) {
        if(showTE(loopList[i].education,'请选择学历学位')) return
        if(showTE(loopList[i].major,'请输入专业')) return
          loopList.push({education:"",major:""})
          this.setData({
            loopList
          })
        
      }
    }
  },
  educationClick1(){
    let loopList1 = this.data.loopList1
    for(let i in loopList1){
      if(Number(i) === (loopList1.length-1)) {
        if(showTE(loopList1[i].education,'请选择学历学位')) return
        if(showTE(loopList1[i].major,'请输入专业')) return
          loopList1.push({education:"",major:""})
          this.setData({
            loopList1
          })
      }
    }
  },
  familyClick(){
    let userFamilyVOS = this.data.userFamilyVOS
    for(let i in userFamilyVOS){
      if(Number(i) === (userFamilyVOS.length-1)){
        if(showTE(userFamilyVOS[i].appellation,'请选择称谓')) return
        if(showTE(userFamilyVOS[i].userName,'请输入姓名')) return
        if(showTE(userFamilyVOS[i].userAge,'请输入年龄')) return
        if(showTE(userFamilyVOS[i].politicalLandscape,'请选择政治面貌')) return
          userFamilyVOS.push({appellation:"",userName:"",userAge:"",politicalLandscape:"",workUnitsPosition:""})
          this.setData({
            userFamilyVOS
          })
      }
    }
    
  },

  bindPickerChange: function (e) {
    let value = e.detail.value
    this.setData({
      userIndex: value,
      userSex:this.data.sex[value].name
    })
  },

  bindDateChange: function (e) {
    this.setData({
      userBirthDay: e.detail.value
    })
  },

  parttyBindDateChange: function (e) {
    this.setData({
      userPartyTime: e.detail.value
    })
  },

  workBindDateChange: function (e) {
    this.setData({
      userHaveJob: e.detail.value
    })
  },

  healthyBindPickerChange: function (e) {
    let value = e.detail.value
    this.setData({
      userHealthConditionIndex:value,
      userHealthCondition: this.data.healthy[value]
    })
  },

  educationBindPickerChange(e){
    let loopList = this.data.loopList
    let education = this.data.education
    loopList[e.currentTarget.dataset.i].education  = education[e.detail.value]
    loopList[e.currentTarget.dataset.i].userFullTimeQualificationIndex  = e.detail.value
    let userFullTimeQualification = ""
    for(let i in loopList){
      if(Number(i) === (loopList.length-1)){
        userFullTimeQualification = userFullTimeQualification+loopList[i].education
      }else{
        userFullTimeQualification = userFullTimeQualification+(loopList[i].education+'/')
      }
    }
    this.setData({
      loopList,
      userFullTimeQualification
    })
  },
  educationBindPickerChange1(e){
    let loopList1 = this.data.loopList1
    let education = this.data.education
    loopList1[e.currentTarget.dataset.i].education  = education[e.detail.value]
    loopList1[e.currentTarget.dataset.i].userOnJobQualificationIndex  = e.detail.value
    let userOnJobQualification = ""
    for(let i in loopList1){
      if(Number(i) === (loopList1.length-1)){
        userOnJobQualification = userOnJobQualification+loopList1[i].education
      }else{
        userOnJobQualification = userOnJobQualification+(loopList1[i].education+'/')
      }
    }
    this.setData({
      loopList1,
      userOnJobQualification
    })
  },

  majorInput(e){
    let loopList = this.data.loopList
    loopList[e.currentTarget.dataset.i].major  = e.detail.value
    let userFullTimeGraduationAcademy = ""
    for(let i in loopList){
      if(Number(i) === (loopList.length-1)){
        userFullTimeGraduationAcademy = userFullTimeGraduationAcademy+loopList[i].major
      }else{
        userFullTimeGraduationAcademy = userFullTimeGraduationAcademy+(loopList[i].major+'/')
      }
    }
    this.setData({
      loopList,
      userFullTimeGraduationAcademy
    })
  },
  majorInput1(e){
    let loopList1 = this.data.loopList1
    loopList1[e.currentTarget.dataset.i].major  = e.detail.value
    let userOnJobGraduationAcademy = ""
    for(let i in loopList1){
      if(Number(i) === (loopList1.length-1)){
        userOnJobGraduationAcademy = userOnJobGraduationAcademy+loopList1[i].major
      }else{
        userOnJobGraduationAcademy = userOnJobGraduationAcademy+(loopList1[i].major+'/')
      }
    }
    this.setData({
      loopList1,
      userOnJobGraduationAcademy
    })
  },

  appellationBindPickerChange(e){
    let userFamilyVOS = this.data.userFamilyVOS
    let appellation = this.data.appellation
    userFamilyVOS[e.currentTarget.dataset.i].appellation  = appellation[e.detail.value]
    userFamilyVOS[e.currentTarget.dataset.i].appellationIndex  = e.detail.value
    this.setData({
      userFamilyVOS
    })
  },
  nameInput(e){
    //console.log(e)
    let userFamilyVOS = this.data.userFamilyVOS
    userFamilyVOS[e.currentTarget.dataset.i].userName  = e.detail.value
    this.setData({ 
      userFamilyVOS
    })
  },
  ageInput(e){
    //console.log(e)
    let userFamilyVOS = this.data.userFamilyVOS
    userFamilyVOS[e.currentTarget.dataset.i].userAge  = e.detail.value
    this.setData({ 
      userFamilyVOS
    })
  },
  faceBindPickerChange(e){
    let userFamilyVOS = this.data.userFamilyVOS
    let face = this.data.face
    userFamilyVOS[e.currentTarget.dataset.i].politicalLandscape  = face[e.detail.value]
    userFamilyVOS[e.currentTarget.dataset.i].politicalLandscapeIndex  = e.detail.value
    this.setData({ 
      userFamilyVOS
    })
  },
  positionInput(e){
    //console.log(e)
    let userFamilyVOS = this.data.userFamilyVOS
    userFamilyVOS[e.currentTarget.dataset.i].workUnitsPosition  = e.detail.value
    this.setData({ 
      userFamilyVOS
    })
  },
  bindRegionChange: function (e) {
    let value = e.detail.value
    this.setData({
      userNativePlace:value
    })
  },
  bindBirthplaceChange: function (e) {
    let value = e.detail.value
    this.setData({
      userBirthPlace: value
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

  nationbindPickerChange(e){
    this.setData({
      nationIndex: e.detail.value,
      userNation:this.data.nation[e.detail.value].dataId
    })
  },



  submit(e) {
    const {userInformationId,userName,userSex,userBirthDay,userNation,userNativePlace,userBirthPlace,userPartyTime,userHaveJob,userHealthCondition,userProfessionalTechnologyPosition,userSpecialty,userFullTimeGraduationAcademy,userFullTimeQualification,userOnJobGraduationAcademy,userOnJobQualification,userResume,userRewardsPunishmentsSituation,userCredentials,userFamilyVOS,imgId} = this.data
    let userImage = imgId[0]
    let userNativePlaces = userNativePlace[0]+'-'+userNativePlace[1]+'-'+userNativePlace[2]
    let userBirthPlaces = userBirthPlace[0]+'-'+userBirthPlace[1]+'-'+userBirthPlace[2]
    if(showTE(userName,'请输入姓名')) return
    if(showTE(userSex,'请选择性别')) return
    if(showTE(userBirthDay,'请选择出生年月')) return
    if(showTE(userNation,'请选择民族')) return
    if(showTE(userNativePlaces,'请选择籍贯')) return
    if(showTE(userBirthPlaces,'请选择出生地')) return
    if(showTE(userPartyTime,'请选择入党时间')) return
    if(showTE(userHaveJob,'请选择参加工作时间')) return
    if(showTE(userHealthCondition,'请选择健康状况')) return
    if(showTE(userProfessionalTechnologyPosition,'请输入技术职务')) return
    if(showTE(userSpecialty,'请输入专业')) return
    if(showTE(userImage,'请上传照片')) return
    if(e.currentTarget.dataset.istrue){
      http.updateuserinformationApi({
        data:{
          userInformationId,userName,userSex,userBirthDay,userNation,userNativePlace:userNativePlaces,userBirthPlace:userBirthPlaces,userPartyTime,userHaveJob,userHealthCondition,userProfessionalTechnologyPosition,userSpecialty,
          userFullTimeGraduationAcademy,userFullTimeQualification,userOnJobGraduationAcademy,userOnJobQualification,userResume,userRewardsPunishmentsSituation,userCredentials,userFamilyVOS,userImage
        },
        success:res=>{
          if(Object.keys(res).length === 0){
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1
              })
            },2000)
          }else{
            wx.showToast({
              title: res.msg,
              icon: 'error',
              duration: 2000
            })
          }
        }
      })
    }else{
      http.saveApi({
        data:{
          userName,userSex,userBirthDay,userNation,userNativePlace:userNativePlaces,userBirthPlace:userBirthPlaces,userPartyTime,userHaveJob,userHealthCondition,userProfessionalTechnologyPosition,userSpecialty,
          userFullTimeGraduationAcademy,userFullTimeQualification,userOnJobGraduationAcademy,userOnJobQualification,userResume,userRewardsPunishmentsSituation,userCredentials,userFamilyVOS,userImage
        },
        success:res=>{
          if(Object.keys(res).length === 0){
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(()=>{
              wx.navigateBack({
                delta: 2
              })
            },2000)
          }else{
            wx.showToast({
              title: res.msg,
              icon: 'error',
              duration: 2000
            })
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