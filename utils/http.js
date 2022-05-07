const {baseurl} = require('./env').prod
module.exports = {
  http(url, method, params) {
    wx.showLoading({
      title: '加载中',
    })
    let data = {}
    if (params.data) { // 在这里判断一下data是否存在，params表示前端需要传递的数据，params是一个对象，有三组键值对，data：表示请求要发送的数据，success：成功的回调，fail：失败的回调，这三个字段可缺可无，其余字段会忽略
      for (let key in params.data) { // 在这里判断传过来的参数值为null，就删除这个属性
        if (params.data[key] == null || params.data[key] == 'null') {
          delete params.data[key]
        }
      }
      data = { ...data, ...params.data}
    }
    let token = wx.getStorageSync('token')
    let tokens = wx.getStorageSync('tokens')
    wx.request({
      url: baseurl + url, // 就是拼接上前缀,此接口域名是开放接口，可访问
      method: method, // 判断请求类型，除了值等于'post'外，其余值均视作get 其他的请求类型也可以自己加上的
      data,
      header: {
        'content-type': 'application/json',
        token:token === "" ? tokens:token
      },
      success(res) {
        wx.hideLoading()
        params.success && params.success(res.data)
      },
      fail(err) {
        wx.hideLoading()
        params.fail && params.fail(err)
      }
    })
  }
}