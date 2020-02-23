<template>
  <div class="area login_content">
    <div class="curr_left">
      <ul class="rightside">
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <!-- <router-view name="login_view" class="login_fill_box"/> -->
      <LoginFill class="login_fill_box"></LoginFill>
    </div>
    <div class="curr_right">
      <img src="../../assets/img/login/login_img@2x.png" width="497px" alt />
    </div>
  </div>
</template>

<script>
import LoginFill from "@/components/login/LoginFill";
export default {
  name: "login",
  data() {
    return {};
  },
  components: {
    LoginFill
  }
};
</script>

<style scoped lang="scss">
.login_content {
  background-color: #fff;
  height: 100%;
  // @include full_screen;
  display: flex;
  .curr_left,
  .curr_right {
    height: 100%;
  }
  .curr_left {
    width: 621px;
    position: relative;
    .rightside {
      width: 4px;
      height: 100%;
      position: absolute;
      left: 27px;
      li {
        width: 100%;
        height: 31.25%;
        background-color: #fff;
        margin-bottom: 23px;
        display: inline-block;
        border-radius: 2px;
        &:first-child {
          background: rgba(247, 247, 247, 1);
        }
        &:nth-child(2) {
          background: rgba(255, 234, 208, 1);
        }
        &:last-child {
          margin: 0;
          background: rgba(254, 152, 24, 1);
        }
      }
    }
    .login_fill_box {
      @include vertical_center(50%, 50%);
      height: 479px;
      width: 414px;
    }
  }
  .curr_right {
    flex: 1;
    position: relative;
    img {
      @include vertical_center(50%,50%);
    }
  }
}
</style>