// pages/tab/statistics/statistics.js
import wxCharts from "../../../utils/wxcharts-min"
import http from "../../../utils/api"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:[
      {id:'1',text:"性别占比统计"},
        {id:'2',text:"年龄统计"},
        {id:'3',text:"学历统计"},
        {id:'4',text:"政治面貌"},
        {id:'5',text:"职称"},
        {id:'6',text:"工作年限"}
        
    ],
    currentTab: 0,
    navScrollLeft: 0,
    columnCanvasLength:0,
    columnWindowWidth:0,
    pieCanvasSeries:[],
    token:wx.getStorageSync('token'),
    touchS : [0,0],
    touchE : [0,0],
    endTime:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  switchNav(event){
    //console.log(event)
    var cur = event.currentTarget.dataset.current;
    this.setData({
      currentTab: cur,
      navScrollLeft: cur * 60,
    });
    this.pieEcharts(this.data.tabList[this.data.currentTab].id)
},

  // 触摸开始事件
  touchStart: function(e){
    // console.log(e.touches[0].pageX)
    let sx = e.touches[0].pageX
    let sy = e.touches[0].pageY
    this.data.touchS = [sx,sy]
  },
  // 触摸滑动事件
  touchMove: function(e){
    let sx = e.touches[0].pageX;
    let sy = e.touches[0].pageY;
    this.data.touchE = [sx, sy]
  },
  // 触摸结束事件
  touchEnd: function(e){
    let start = this.data.touchS
    let end = this.data.touchE
     if(end[0] !== 0 && this.data.endTime !== end[0]){
       this.setData({
        endTime:end[0]
       })
      if(start[0] < end[0] - 60){
        if(this.data.currentTab !== 0){
          this.setData({
            currentTab:this.data.currentTab-1,
            navScrollLeft: (this.data.currentTab-1) * 60,
          })
          this.pieEcharts(this.data.tabList[this.data.currentTab].id)
        }
      }else if(start[0] > end[0] + 60){
        if(this.data.currentTab < this.data.tabList.length-1){
          this.setData({
            currentTab:this.data.currentTab+1,
            navScrollLeft: (this.data.currentTab+1) * 60,
          })
          this.pieEcharts(this.data.tabList[this.data.currentTab].id)
        }
  
      }else{
        // console.log('向上或向下滑动')
      }
     }
    
  },
  
  pieEcharts(id){
    let pieCanvasSeries = this.data.pieCanvasSeries
    http.personGeneralApi({
      data:{
        type:id
      },
      success:res=>{
        let forTime = 0
        pieCanvasSeries = []
        for(let i in res){
          forTime++
          if(id === '1'){
            if(i === 'female'){
              pieCanvasSeries.push({name: '女',data: res[i],color:"#276DF5",format() {
                return res[i] + '人';
              }})
            }else if(i === 'man'){
              pieCanvasSeries.push({name: '男',data: res[i],color:"#21C161",format() {
                return res[i] + '人';
              }})
            }
            if(forTime === 2){
              new wxCharts({
                animation: true,
                canvasId: 'pieCanvas',
                type: 'pie',
                series: pieCanvasSeries,
                width: (wx.getSystemInfoSync().windowWidth-40),
                height: 310,
              })
              forTime = 0
            }
            
          }
          if(id === '2'){
            if(i === 'above'){
              pieCanvasSeries.push({name: '三十五岁以上',data: res[i],color:"#21C161",format() {
                return res[i] + '人';
              }})
            }else if(i === 'below'){
              pieCanvasSeries.push({name: '三十五岁以下',data: res[i],color:"#FFB815",format() {
                return res[i] + '人';
              }})
            }
            if(forTime === 2){
              new wxCharts({
                animation: true,
                canvasId: 'pieCanvas',
                type: 'pie',
                series: pieCanvasSeries,
                width: (wx.getSystemInfoSync().windowWidth-40),
                height: 310,
              })
              forTime = 0
            }
          }
          if(id === '3'){
            if(i === 'highSchool'){
              pieCanvasSeries.push({name: '高中',data: res[i],color:"#276DF5",format() {
                return res[i] + '人';
              }})
            }else if(i === 'college'){
              pieCanvasSeries.push({name: '大专',data: res[i],color:"#21C161",format() {
                return res[i] + '人';
              }})
            }else if(i === 'undergraduateCourse'){
              pieCanvasSeries.push({name: '本科',data: res[i],color:"#FFB815",format() {
                return res[i] + '人';
              }})
            }else if(i === 'graduateStudent'){
              pieCanvasSeries.push({name: '研究生',data: res[i],color:"#FF838D",format() {
                return res[i] + '人';
              }})
            }else if(i === 'doctor'){
              pieCanvasSeries.push({name: '博士',data: res[i],color:"#419488",format() {
                return res[i] + '人';
              }})
            }
            if(forTime === 5){
              new wxCharts({
                animation: true,
                canvasId: 'pieCanvas',
                type: 'pie',
                series: pieCanvasSeries,
                width: (wx.getSystemInfoSync().windowWidth-40),
                height: 310,
              })
              forTime = 0
            }
          }
          if(id === '4'){
            if(i === 'partyMember'){
              pieCanvasSeries.push({name: '中共党员',data: res[i],color:"#276DF5",format() {
                return res[i] + '人';
              }})
            }else if(i === 'leagueMember'){
              pieCanvasSeries.push({name: '共青团员',data: res[i],color:"#21C161",format() {
                return res[i] + '人';
              }})
            }else if(i === 'crowd'){
              pieCanvasSeries.push({name: '群众',data: res[i],color:"#FFB815",format() {
                return res[i] + '人';
              }})
            }
            if(forTime === 3){
              new wxCharts({
                animation: true,
                canvasId: 'pieCanvas',
                type: 'pie',
                series: pieCanvasSeries,
                width: (wx.getSystemInfoSync().windowWidth-40),
                height: 310,
              })
              forTime = 0
            }
          }
          if(id === '5'){
            if(i === 'primary'){
              pieCanvasSeries.push({name: '初级',data: res[i],color:"#276DF5",format() {
                return res[i] + '人';
              }})
            }else if(i === 'intermediate'){
              pieCanvasSeries.push({name: '中级',data: res[i],color:"#21C161",format() {
                return res[i] + '人';
              }})
            }else if(i === 'deputyHigh'){
              pieCanvasSeries.push({name: '副高级',data: res[i],color:"#FFB815",format() {
                return res[i] + '人';
              }})
            }else if(i === 'advanced'){
              pieCanvasSeries.push({name: '正高级',data: res[i],color:"#FF838D",format() {
                return res[i] + '人';
              }})
            }
            if(forTime === 4){
              new wxCharts({
                animation: true,
                canvasId: 'pieCanvas',
                type: 'pie',
                series: pieCanvasSeries,
                width: (wx.getSystemInfoSync().windowWidth-40),
                height: 310,
              })
              forTime = 0
            }
          }
          if(id === '6'){
            if(i === 'fiveYears'){
              pieCanvasSeries.push({name: '5年以下',data: res[i],color:"#276DF5",format() {
                return res[i] + '人';
              }})
            }else if(i === 'fiveTenYears'){
              pieCanvasSeries.push({name: '5-10年',data: res[i],color:"#FF838D",format() {
                return res[i] + '人';
              }})
            }else if(i === 'tenFifteenYears'){
              pieCanvasSeries.push({name: '10-15年',data: res[i],color:"#21C161",format() {
                return res[i] + '人';
              }})
            }else if(i === 'fteenYears'){
              pieCanvasSeries.push({name: '15年以上',data: res[i],color:"#419488",format() {
                return res[i] + '人';
              }})
            }
            if(forTime === 4){
              new wxCharts({
                animation: true,
                canvasId: 'pieCanvas',
                type: 'pie',
                series: pieCanvasSeries,
                width: (wx.getSystemInfoSync().windowWidth-40),
                height: 310,
              })
              forTime = 0
            }
          }
          
        }
      }
    })
        
  },

  echarts(){ 
    let columnWindowWidth = wx.getSystemInfoSync().windowWidth-40
    http.personDistributionStatisticalApi({
      success:res=>{
        
        this.setData({
          columnCanvasLength:res.userConut.length,
          columnWindowWidth
        })
        //console.log(this.data.columnCanvasLength)
        new wxCharts({
          canvasId: 'columnCanvas',
          type: 'column',
          animation: true,
          legend :false,
          categories: res.departmentName,
          series: [{
            data: res.userConut,
            format: function (val, name) {
              return val + '人';
            },
            color:"#276DF5",
          }],
          yAxis: {
            format: function (val) {
              //return val + '万';
              return val; 
            },
            min: 0,
          },
          xAxis: {
            disableGrid: true,
            type: 'calibration'
          },
          extra: {
            column: {
              width: 10
            }
          },
          width: res.userConut.length <= 2 ? columnWindowWidth : res.userConut.length*200,
          height: 280,
        });
      }
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
    let token = wx.getStorageSync('token')
    this.setData({
      token
    })
    if(token !== ""){
      this.echarts()
      this.pieEcharts(this.data.tabList[0].id)
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