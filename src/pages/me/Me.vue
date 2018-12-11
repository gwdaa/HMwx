<template>
  <div class="container">
    <div class="userinfo">
        <img :src="userinfo.avatarUrl" alt="">
        <p>{{userinfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>  
    <button v-if="userinfo.openId" @click='scanBook' class="btn">添加图书</button>
    <button  v-else open-type="getUserInfo" lang='zh_CN' class="btn" @getuserinfo='login'>点击登陆</button>
  </div>
</template>
<script>
import qcloud from 'wafer2-client-sdk'
import config from '@/config'
import YearProgress from '@/components/YearProgress'
import {showSuccess,post,showModal} from '@/util'
export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userinfo: {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: ''
      }
    }
  },
  methods: {
    getWxLogin ({ encryptedData, iv, userinfo }) {
      wx.login({
        success: (loginResult) => {
          console.log('loginResult', loginResult)
          var loginParams = {
            code: loginResult.code,
            encryptedData: encryptedData,
            iv: iv
          }
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.login({
            loginParams,
            success: () => {
              qcloud.request({
                url: config.userUrl,
                login: true,
                success: (userRes) => {
                  showSuccess('登录成功')
                  wx.setStorageSync('userinfo', userRes.data.data)
                  this.userinfo = userRes.data.data
                }
              })
            },
            fail (error) {
              console.log(error)
              // showModal("登录失败", error);
            }
          })
        },
        fail (loginError) {
          // showModal("登录失败", loginError);
        }
      })
    },
    login (e) {
      // 查看是否授权
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            // 检查用户登陆是否过期
            wx.checkSession({
              success () {
                showSuccess('登陆成功')
              },
              fail: () => {
                // 过期了 重新登陆，先清除登陆的状态
                qcloud.clearSession()
                // 登陆状态已过期，需重新登陆
                // 登陆需要的加密信息
                var options = {
                  encryptedData: e.mp.detail.encryptedData,
                  iv: e.mp.detail.iv,
                  userinfo: e.mp.detail.userInfo
                }
                this.getWxLogin(options)
              }
            })
          } else {
            console.log('用户未授权')
            // showModal("用户未授权", e.mp.detail.errMsg);
          }
        }
      })
    },
    async addBook(isbn){
      const res = await post('/weapp/addbook',{
        isbn,
        openid:this.userinfo.openId
      })
      showModal('添加成功',`${res.title}添加成功`)
    },
    scanBook () {
      wx.scanCode({
        success: (res) => {
          if(res.result){
            this.addBook(res.result)
          }
          console.log(res)
        }
      })
    }
  },
  onShow () {
    wx.showShareMenu()
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  }
}
</script>
<style lang='scss'>
.container {
  padding: 0 30rpx;
  .userinfo {
    margin-top: 100rpx;
    text-align: center;
    img{
      width: 150rpx;
      height: 150rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
  }
}
</style>