// pages/lessonMain/lessonMain.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    albumMain: [],
    selected1: true,
    selected2: false
  },
  selected1() {
    this.setData({
      selected1: true,
      selected2: false
    })
  },
  selected2() {
    this.setData({
      selected2: true,
      selected1: false
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
      url: 'http://47.94.13.179:8090/videoclass/productAlbum/getById?id=' + id,
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        console.log(res.data.data)
        that.setData({
          albumMain: res.data.data
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})