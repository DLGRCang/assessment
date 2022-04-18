import utils from "../../utils/util"
Component({
  properties: {
    type:{
      type:String,
      value:""
    },
    signText:{
      type:String,
      value:"暂无登录请先登录"
    },
    missingText:{
      type:String,
      value:"暂无数据"
    }
  },
  data: {},
  methods: {
    signClick(){
      utils.login()
    }
  }
})