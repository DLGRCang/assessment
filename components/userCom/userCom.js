// components/userCom/userCom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userName:{
      type:String,
      value:""
    },
    userImg:{
      type:String,
      value:""
    },
    text1:{
      type:String,
      value:""
    },
    text2:{
      type:String,
      value:""
    },
    text3:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    userClick(e){
      this.triggerEvent('userClick',{
        state:e.currentTarget.dataset.state
      })
    }
  }
})
