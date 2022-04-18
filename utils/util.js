const {baseurl} = require('./env').dev
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

//校验登录
function login(){
  if(wx.getStorageSync('token') == ''){
          wx.navigateTo({
            url: "/pages/signIn/signIn"
          })
  }else{
    return true;
  }
}

//上传附件
const imgClick = function (){
  
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      success (res) {
        const tempFilePaths = res.tempFilePaths[0]
        wx.showLoading({
          title: '上传图片中',
        })
        wx.uploadFile({
          url: baseurl+'/assessmentmanagement/app/file/uploadimage',
          filePath: tempFilePaths,
          name: 'image',
          header: {
            token:wx.getStorageSync('token')
          },
          formData: {},
          success (resd){
            wx.hideLoading()
            var data = JSON.parse(resd.data)
            var img = data.data
            resolve(img)
          },
          fail (err){
            wx.hideLoading()
            console.log(err)
          }
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
  });
}

function showTS(cont,text){
  if(cont === "" || cont === undefined || cont === null || !cont || cont.length === 0){
    return wx.showToast({
      title: text,
      icon: 'success',
      duration: 2000
    })
  }else{
    return false
  }
}

function showTE(cont,text){
  if(cont === "" || cont === undefined || cont === null || !cont || cont.length === 0){
    return wx.showToast({
      title: text,
      icon: 'error',
      duration: 2000
    })
  }else{
    return false
  }
}

function showTL(cont,text){
  if(cont === "" || cont === undefined || cont === null || !cont || cont.length === 0){
    return wx.showToast({
      title: text,
      icon: 'loading',
      duration: 2000
    })
  }else{
    return false
  }
}

module.exports = {
  formatTime,
  login,
  imgClick,
  showTS,
  showTE,
  showTL
}
