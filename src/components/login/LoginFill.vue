<template>
  <div class="login_fill">
    <h1 class="login_title_1">Welcome to SFCP</h1>
    <h2 class="login_title_2">Silver Fox Cloud Plantform</h2>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="账号登录" name="ToLogin">
        <!-- 登陆表单 -->
        <el-form
          :model="numberValidateForm"
          ref="numberValidateForm"
          label-width="100px"
          class="login-ruleForm"
          label-position="top"
        >
          <div class="login_wrap">
            <el-form-item
              label="用户名"
              prop="username"
              :rules="[
      { required: true, message: '用户名不能为空'}
    ]"
            >
              <el-input
                v-model.trim="numberValidateForm.username"
                suffix-icon="el-icon-user"
                autocomplete="off"
                placeholder="请输入您的用户名"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="密码"
              prop="password"
              :rules="[
      { required: true, message: '密码不能为空'},
    ]"
            >
              <el-input
                show-password
                v-model.trim="numberValidateForm.password"
                suffix-icon="el-icon-lock"
                autocomplete="off"
                placeholder="请输入您的密码"
              ></el-input>
            </el-form-item>
          </div>
          <el-row class="chk_inner">
            <el-col :span="12">
              <el-checkbox v-model="checked">记住密码</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-link :underline="false">忘记密码?</el-link>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" class="login_btn" @click="submitForm('numberValidateForm')">登陆</el-button>
            <el-button class="register_btn" @click="registerForm" style="margin-left:24px;">注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="扫码登录" name="CodeLogin">
        <QrCodeLogin></QrCodeLogin>
      </el-tab-pane>
    </el-tabs>
    <div class="third_party_login">
      <span>第三方登录：</span>
      <ul class="third_icon clearfix">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
import QrCodeLogin from "./QrCodeLogin";
export default {
  name: "fill",
  data() {
    return {
      activeName: "ToLogin",
      numberValidateForm: {
        username: "admin",
        password: "123456"
      },
      checked: true
    };
  },
  components: {
    QrCodeLogin
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { username, password } = this.numberValidateForm;
          this.$axios({
            method: "get",
            url: "/mock/login",
            params: { username, password }
          }).then(response => {
            console.log(response, "success222");
            if (response.data.code == 200) {
              // 登陆成功
             return this.$router.push("/main");
            }
            // 登陆失败
            this.$notify.error({
              title: "错误",
              message: response.data.msg
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    registerForm() {
      this.$router.push("register");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/reset_el/reset_el.scss";
.login_fill {
  .login_title_1 {
    font-size: 26px;
    @include font_normal;
    color: rgba(197, 200, 205, 1);
  }
  .login_title_2 {
    font-size: 32px;
    @include font_normal;
    color: rgba(1, 7, 20, 1);
    margin-top: 8px;
  }

  .third_party_login {
    span {
      font-size: 14px;
      font-weight: normal;
      color: rgba(156, 160, 166, 1);
      float: left;
      position: relative;
      top: 5px;
    }
    .third_icon {
      display: inline-block;
      li {
        width: 30px;
        height: 30px;
        float: left;
        margin-right: 6px;
        cursor: pointer;

        &:first-child {
          background-image: url("../../assets/img/login/icon_qq.png");
          &:hover {
            background-image: url("../../assets/img/login/icon_qqpressed.png");
          }
        }

        &:nth-child(2) {
          background-image: url("../../assets/img/login/icon_wechat.png");
          &:hover {
            background-image: url("../../assets/img/login/icon_wechatpressed.png");
          }
        }

        &:last-child {
          background-image: url("../../assets/img/login/icon_wb.png");
          &:hover {
            background-image: url("../../assets/img/login/icon_wbpressed.png");
          }
        }
      }
    }
  }
}
</style>