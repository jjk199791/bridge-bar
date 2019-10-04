// pages/looklesson/looklesson.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    albumList: {},

  },
  lessonMain(e) {
    var id = "";
    var data = e.currentTarget.dataset;
    console.log(data)
    console.log(id)
    wx: wx.navigateTo({
      url: '/pages/lessonMain/lessonMain?id=' + data.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    var that = this;
    that.setData({
      id: id
    })
    console.log(id)
    wx: wx.request({
      url: 'http://47.94.13.179:8090/videoclass/productTopic/getById?id=' + id,
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        console.log(res)
        // var itemsList = res.data.data;
        // var albumList = [];
        // for (let i in itemsList) {
        //   albumList.push(itemsList[i])
        // }
        // console.log(albumList)
        that.setData({
          albumList: res.data.data
        })

      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    page = page + 1;
    wx.request({
      url: 'https://xxx/?page=' + page,
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: function(res) {
        // 回调函数
        var moment_list = that.data.moment;
        const oldData = that.data.moment;
        that.setData({
          moment: oldData.concat(res.data.data)
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})