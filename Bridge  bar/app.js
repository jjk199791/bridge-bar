//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.request({
            url: "http://videoclass.nat123.cc/wechat/authentication",
            data: {
              code: res.code
            },
            method: "POST",
            header: {
              'content-type': 'application/json',
            },
            success: function(res) {
              var wechatSystem;
              var sessionid = res.data.data.sessionid;
              //存储session
              wx.setStorage({
                key: "wechat_sessionid",
                data: sessionid
              })
              //获取手机系统
              wx.getSystemInfo({
                success(res) {
                  if (res.system.substr(0, 3) == "iOS") {
                    wechatSystem = 'ios';
                  } else if (res.system.substr(0, 7) == "Android") {
                    wechatSystem = 'android';
                  } else {
                    wechatSystem = res.system;
                  }
                }
              })
              //当用户点击授权登录后才会执行该方法
              wx.getUserInfo({
                success: res => {
                  // 保存用户信息到服务端
                  wx.request({
                    url: "http://videoclass.nat123.cc/wechat/updateUserInfo",
                    data: res.userInfo,
                    method: "POST",
                    header: {
                      'wechatSystem': wechatSystem,
                      'wechat_sessionid': sessionid,
                      'content-type': 'application/json',
                    },
                    success: function(res) {
                      console.log("success");
                    },
                    fail: function(error) {
                      console.log(error);
                    }
                  })
                }
              })

            },
            fail: function(error) {
              console.log(error);
            }
          })
        } else {
          console.log("error code " + res.errMsg);
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})