// pages/logon/logon.js
import http from "../../utils/api"
import {showTE,showTN} from "../../utils/util"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.globalData.imgUrl,
    userName:"",
    idCard:"",
    sex:[{id:1,name:'男'},{id:2,name:'女'}],
    userIndex:null,
    userSex:'',
    userBirthDay:'',
    dateEnd: new Date(),
    userPartyTime:[{id:1,name:"中共党员"},{id:2,name:"共青团员"},{id:3,name:"群众"}],
    userPartyTimeIndex:null,
    userHaveJob:'',
    healthy:['健康','不健康'],
    userHealthCondition:'',
    userHealthConditionIndex:null,
    education:['高中','大专','本科','研究生','博士'],
    loopList:[
      {education:"",major:"",userFullTimeQualificationIndex:null}
    ],
    loopList1:[
      {education:"",major:"",userOnJobQualificationIndex:null}
    ],
    userFamilyVOS:[
      {appellation:"",userName:"",userAge:"",politicalLandscape:"",workUnitsPosition:"",appellationIndex:null,politicalLandscapeIndex:null}
    ],
    face:['中共党员','共青团员','群众'],
    appellation:['爸爸','妈妈'],
    images: [],
    imgId:[],
    nation:[],
    nationindex:'',
    userNation:'',
    userNativePlace:[],
    userBirthPlace:[],
    userProfessionalTechnologyPosition:['初级','中级','副高级','正高级'],
    userProfessionalTechnologyPositionIndex:null,
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
              loopList.push({education:item.userFullTimeList[i].userFullTimeQualification === '1'?'高中':item.userFullTimeList[i].userFullTimeQualification === '2'?'大专':item.userFullTimeList[i].userFullTimeQualification === '3'?'本科':item.userFullTimeList[i].userFullTimeQualification === '4'?'研究生':item.userFullTimeList[i].userFullTimeQualification === '5'?'博士':'',major:item.userFullTimeList[i].userFullTimeGraduationAcademy,userFullTimeQualificationIndex:item.userFullTimeList[i].userFullTimeQualification === '1'? 0:item.userFullTimeList[i].userFullTimeQualification === '2'?1:item.userFullTimeList[i].userFullTimeQualification === '3'?2:item.userFullTimeList[i].userFullTimeQualification === '4'?3:item.userFullTimeList[i].userFullTimeQualification === '5'?4:null})
            }
          }
          
          let loopList1 = this.data.loopList1  
          if(item.userOnJobList.length !== 0){
            loopList1 = []
            for(let i in item.userOnJobList){
              loopList1.push({education:item.userOnJobList[i].userOnJobQualification === '1'?'高中':item.userOnJobList[i].userOnJobQualification === '2'?'大专':item.userOnJobList[i].userOnJobQualification === '3'?'本科':item.userOnJobList[i].userOnJobQualification === '4'?'研究生':item.userOnJobList[i].userOnJobQualification === '5'?'博士':'',major:item.userOnJobList[i].userOnJobGraduationAcademy,userOnJobQualificationIndex:item.userOnJobList[i].userOnJobQualification === '1'? 0:item.userOnJobList[i].userOnJobQualification === '2'?1:item.userOnJobList[i].userOnJobQualification === '3'?2:item.userOnJobList[i].userOnJobQualification === '4'?3:item.userOnJobList[i].userOnJobQualification === '5'?4:null})
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
            idCard:item.idCard,
            userIndex:item.userSex === '1' ? 0 : item.userSex === '2' ? 1:null,
            userNation:item.userNation,
            userHealthCondition:item.userHealthCondition,
            userBirthDay:item.userBirthDay,
            nationIndex:nationIndex,
            userNativePlace:item.userNativePlace !== "" ? item.userNativePlace.split('-'):"",
            userBirthPlace:item.userBirthPlace !== "" ? item.userBirthPlace.split('-'):"",
            userPartyTimeIndex:item.userPartyTime === '1' ? 0 : item.userPartyTime === '2' ? 1 : item.userPartyTime === '3' ? 2 : null,
            userHaveJob:item.userHaveJob,
            userHealthConditionIndex:userHealthConditionIndex,
            userProfessionalTechnologyPositionIndex:item.userProfessionalTechnologyPosition === '1' ? 0 : item.userProfessionalTechnologyPosition === '2' ? 1:item.userProfessionalTechnologyPosition === '3' ? 2:item.userProfessionalTechnologyPosition === '4' ? 3:null,
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
        if(showTN(loopList[i].education,'请选择全日制教育学历学位')) return
        if(showTN(loopList[i].major,'请输入全日制教育毕业院校系及专业')) return
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
        if(showTN(loopList1[i].education,'请选择在职教育学历学位')) return
        if(showTN(loopList1[i].major,'请输入在职育毕业院校系及专业')) return
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
        if(showTN(userFamilyVOS[i].appellation,'请选择家庭主要成员称谓')) return
        if(showTN(userFamilyVOS[i].userName,'请输入家庭主要成员姓名')) return
        if(showTN(userFamilyVOS[i].userAge,'请输入家庭主要成员年龄')) return
        if(showTN(userFamilyVOS[i].politicalLandscape,'请选择家庭主要成员政治面貌')) return
        if(showTN(userFamilyVOS[i].workUnitsPosition,'请选择家庭主要成员工作单位及职务')) return
          userFamilyVOS.push({appellation:"",userName:"",userAge:"",politicalLandscape:"",workUnitsPosition:""})
          this.setData({
            userFamilyVOS
          })
      }
    }
    
  },

  bindPickerChange: function (e) {
    let value = e.detail.value
    //console.log(value)
    this.setData({
      userIndex: Number(value),
      userSex:this.data.sex[value].name
    })
  },

  bindDateChange: function (e) {
    this.setData({
      userBirthDay: e.detail.value
    })
  },

  parttyBindDateChange: function (e) {
    let value = e.detail.value
    this.setData({
      userPartyTimeIndex: Number(value)
    })
  },

  userProfessionalTechnologyPositionChange:function(e){
    let value = e.detail.value
    this.setData({
      userProfessionalTechnologyPositionIndex: Number(value)
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
        userFullTimeQualification = userFullTimeQualification+(loopList[i].education === '高中'?'1':loopList[i].education === '大专'?'2':loopList[i].education === '本科'?'3':loopList[i].education === '研究生'?'4':'5')
      }else{
        userFullTimeQualification = userFullTimeQualification+((loopList[i].education === '高中'?'1':loopList[i].education === '大专'?'2':loopList[i].education === '本科'?'3':loopList[i].education === '研究生'?'4':'5')+'/')
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
        userOnJobQualification = userOnJobQualification+(loopList1[i].education === '高中'?'1':loopList1[i].education === '大专'?'2':loopList1[i].education === '本科'?'3':loopList1[i].education === '研究生'?'4':'5')
      }else{
        userOnJobQualification = userOnJobQualification+((loopList1[i].education === '高中'?'1':loopList1[i].education === '大专'?'2':loopList1[i].education === '本科'?'3':loopList1[i].education === '研究生'?'4':'5')+'/')
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
    const {userInformationId,userName,idCard,userIndex,userBirthDay,userNation,userNativePlace,userBirthPlace,userPartyTimeIndex,userHaveJob,userHealthCondition,userProfessionalTechnologyPositionIndex,userSpecialty,userFullTimeGraduationAcademy,userFullTimeQualification,userOnJobGraduationAcademy,userOnJobQualification,userResume,userRewardsPunishmentsSituation,userCredentials,userFamilyVOS,imgId} = this.data
    let userSex = userIndex === 0 ? '1':userIndex === 1 ? '2':null
    let userPartyTime = userPartyTimeIndex === 0 ? '1':userPartyTimeIndex === 1 ? '2':userPartyTimeIndex === 2 ? '3':null
    let userProfessionalTechnologyPosition = userProfessionalTechnologyPositionIndex === 0 ? '1' : userProfessionalTechnologyPositionIndex === 1 ? '2' : userProfessionalTechnologyPositionIndex === 2 ? '3' : userProfessionalTechnologyPositionIndex === 3 ? '4' : null 
    let userImage = imgId[0]
    let userNativePlaces = userNativePlace[0]+'-'+userNativePlace[1]+'-'+userNativePlace[2]
    let userBirthPlaces = userBirthPlace[0]+'-'+userBirthPlace[1]+'-'+userBirthPlace[2]
    
    let userFamilyVOSList = userFamilyVOS
    
    
    
    if(showTE(userName,'请输入姓名')) return
    if(showTE(idCard,'请输入身份证号')) return
    if(showTE(userSex,'请选择性别')) return
    if(showTE(userBirthDay,'请选择出生年月')) return
    if(showTE(userNation,'请选择民族')) return
    if(showTE(userNativePlaces,'请选择籍贯')) return
    if(showTE(userBirthPlaces,'请选择出生地')) return
    for(let i in userFamilyVOSList){
      if(userFamilyVOSList[i].appellation !== ''&&userFamilyVOSList[i].politicalLandscape !== ''&&userFamilyVOSList[i].userAge !== ''&&userFamilyVOSList[i].userName !== ''&&userFamilyVOSList[i].workUnitsPosition !== ''){
      }else{
        if(userFamilyVOSList[i].appellation !== ''||userFamilyVOSList[i].politicalLandscape !== ''||userFamilyVOSList[i].userAge !== ''||userFamilyVOSList[i].userName !== ''||userFamilyVOSList[i].workUnitsPosition !== ''){
          if(showTN(undefined,'请补全家庭成员信息')) return
        }
      }
    }
    if(showTE(userImage,'请上传照片')) return
    if(e.currentTarget.dataset.istrue){
      http.updateuserinformationApi({
        data:{
          userInformationId,userName,idCard,userSex,userBirthDay,userNation,userNativePlace:userNativePlaces,userBirthPlace:userBirthPlaces,userPartyTime,userHaveJob,userHealthCondition,userProfessionalTechnologyPosition,userSpecialty,
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
          userName,userSex,idCard,userBirthDay,userNation,userNativePlace:userNativePlaces,userBirthPlace:userBirthPlaces,userPartyTime,userHaveJob,userHealthCondition,userProfessionalTechnologyPosition,userSpecialty,
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