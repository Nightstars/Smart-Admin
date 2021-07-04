<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/logo.png" />
        <span class="title" style="color: #13c2c2">{{systemName}}</span>
      </div>
      <div class="desc"><h2 style="color: #13c2c2">An easier way to manage everything online</h2></div>
    </div>
    <div class="login">
      <a-form @submit="onSubmit" :form="form">
        <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
          <a-tab-pane tab="扫码登录" key="2">
            <br>
            <center>
              <h4>使用SmartAdmin app 扫码</h4>
              <br>
              <img
                  src="../../assets/img/36__374e494d82cfeaa319c285d3ea0adbfe_a15cc2e9916c3ed957e26b019a4c2656.png"
                  alt=""
                  width="200"
                  height="200"
                  style="margin-bottom: 20px;"
              >
            </center>
          </a-tab-pane>

          <a-tab-pane tab="账户密码登录" key="1">
            <a-alert type="error" :closable="true" v-if="error" :message="error" @close='onClose' showIcon style="margin-bottom: 24px;" />
            <a-form-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                placeholder="账户"
                v-decorator="['name', {rules: [{ required: true, message: '请输入账户名', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                placeholder="密码"
                autocomplete="autocomplete"
                type="password"
                v-decorator="['password', {rules: [{ required: true, message: '请输入密码', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
          </a-tab-pane>
<!--          <a-tab-pane tab="手机号登录" key="2">-->
<!--            <a-form-item>-->
<!--              <a-input size="large" placeholder="mobile number" >-->
<!--                <a-icon slot="prefix" type="mobile" />-->
<!--              </a-input>-->
<!--            </a-form-item>-->
<!--            <a-form-item>-->
<!--              <a-row :gutter="8" style="margin: 0 -4px">-->
<!--                <a-col :span="16">-->
<!--                  <a-input size="large" placeholder="captcha">-->
<!--                    <a-icon slot="prefix" type="mail" />-->
<!--                  </a-input>-->
<!--                </a-col>-->
<!--                <a-col :span="8" style="padding-left: 4px">-->
<!--                  <a-button style="width: 100%" class="captcha-button" size="large">获取验证码</a-button>-->
<!--                </a-col>-->
<!--              </a-row>-->
<!--            </a-form-item>-->
<!--          </a-tab-pane>-->
        </a-tabs>
        <div>
          <a-checkbox :checked="true" >自动登录</a-checkbox>
          <a style="float: right">忘记密码</a>
        </div>
        <a-form-item>
          <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">登录</a-button>
        </a-form-item>
<!--        <div>-->
<!--          其他登录方式-->
<!--          <a-icon class="icon" type="alipay-circle" />-->
<!--          <a-icon class="icon" type="taobao-circle" />-->
<!--          <a-icon class="icon" type="weibo-circle" />-->
<!--          <router-link style="float: right" to="/dashboard/workplace" >注册账户</router-link>-->
<!--        </div>-->
      </a-form>
    </div>

    <div v-show="visible" class='popContainer'>
      <div class="main">
<!--        <img  src="https://cdn.dribbble.com/users/46633/screenshots/1185889/civchoice-loading-gifs800x600.gif" width="200" height="150" alt="" >-->
<!--        <img  src="https://cdn.dribbble.com/users/846207/screenshots/5568468/gradient-circle-loading.gif" width="200" height="150" alt="" >-->
        <img  src="https://i.gifer.com/embedded/download/2zGr.gif" width="218" height="300" alt="" >
      </div>
    </div>

  </common-layout>
</template>

<script>
import CommonLayout from '@/layouts/CommonLayout'
// import {login, getRoutesConfig} from '@/services/user'
import {login, getRoutesConfig} from '@/services/user'
import {setAuthorization} from '@/utils/request'
// import {loadRoutes} from '@/utils/routerUtil'
import {mapMutations} from 'vuex'

export default {
  name: 'Login',
  components: {CommonLayout},
  data () {
    return {
      logging: false,
      visible: false,
      error: '',
      form: this.$form.createForm(this)
    }
  },
  computed: {
    systemName () {
      return this.$store.state.setting.systemName
    }
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    async onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = true
          const name = this.form.getFieldValue('name')
          const password = this.form.getFieldValue('password')
          this.visible = true
          login(name, password).then(res=>this.afterLogin(res))
        }
      })
    },
    afterLogin(res) {
      this.logging = false
      const loginRes = res.data
      if (loginRes.success) {
        // const {user, permissions, roles} = loginRes.data
        const {user} = loginRes.data
        this.setUser(user)
        //this.setPermissions(permissions)
        //this.setRoles(roles)
        setAuthorization({token: loginRes.data.accessToken, expireAt: new Date(loginRes.data.expireAt)})
        // 获取路由配置
        getRoutesConfig().then(result => {
          const routesConfig = result.data.data
          console.log(routesConfig)
          //loadRoutes(routesConfig)
          this.visible = false
          this.$router.push('/dashboard')
          this.$message.success(loginRes.msg, 3)
        })
      } else {
        this.error = loginRes.msg
      }
    },
    onClose() {
      this.error = false
    },

  }
}
</script>

<style lang="less" scoped>
  .common-layout{
    .top {
      text-align: center;
      .header {
        height: 44px;
        line-height: 44px;
        a {
          text-decoration: none;
        }
        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }
        .title {
          font-size: 33px;
          color: @title-color;
          font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: @text-color-second;
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
    .login{
      width: 368px;
      margin: 0 auto;
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button{
          font-size: 14px;
        }
      }
      .icon {
        font-size: 24px;
        color: @text-color-second;
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: @primary-color;
        }
      }
    }
  }

  .popContainer{
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    > img{
      //width: 150px;
      //height: 150px;
      object-fit: contain
    }
  }

  .main{
    text-align: center; /*让div内部文字居中*/
    width: 218px;
    height: 300px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

</style>
