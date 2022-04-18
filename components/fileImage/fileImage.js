import util from "../../utils/util"
const app = getApp()
Component({
  // 组件对外属性
  properties: {
    // 图片总数量
    count: {
      type: Number,
      value: 1
    },
    // 图片临时访问路径集合
    images: {
      type: Array,
      value: []
    },
    // 当前图片的位置下标
    currentIndex: {
      type: Number,
      value: 0,
    },
    title:{
      type:String,
      value:"上传图片"
    }
  },
  options:{
    addGlobalClass:true
  },
  // 组件内部属性
  data: {
    imgUrl:app.globalData.imgUrl
  },
  // 方法
  methods: {
    // 选择图片
    chooseImage() {
      let that = this
      var imgs=util.imgClick()
      imgs.then(res=>{
        that.triggerEvent('chooseImage',{url:that.data.imgUrl+res,imgId:res})
      })
    },
    // 预览图片
    previewImage(e) {
      wx.previewImage({
        current: e.currentTarget.dataset.url,
        urls:this.properties.images
      })
    },
    // 删除图片
    deleteImage(e){
      wx.showModal({
        title:"删除",
        content:"确定要删除此图片吗！",
        success:res=>{
          if (res.confirm) {
            this.triggerEvent('deleteImage',e.currentTarget.dataset.index)
          }
        }
      })
    }
  }
})