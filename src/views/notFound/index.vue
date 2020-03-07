<template>
    <div class="not_found_wrap">
        <div class="internal_box">
            <div class="left_text">
                <div class="left_inner">
                    <DynamicWord text="Oops!"></DynamicWord>
                    <h1 class="title">您访问的页面不存在</h1>
                    <h2 class="h1-title">We could not find the page you were looking for</h2>
                    <button class="go_back_btn btn btn-bubbles" @click="goback">返回上一页</button>
                </div>
            </div>
            <div class="right_img">
                <img :src="imgSrc" class="not_found_img" alt width="556px" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DynamicWord from "components/specialEffects/DynamicWord.vue"

@Component({
    components: {
        DynamicWord
    }
})
export default class NotFound extends Vue {
    public imgSrc = require("@/assets/404.png");

    /**
     * goback
     */
    public goback() {
        setTimeout(() => {
            this.$router.go(-1);
        }, 700);
    }
}
</script>


<style scoped lang="scss">
@import "../../assets/css/button/button.scss";
.not_found_wrap {
  @include full_screen;
  background: linear-gradient(to right, #fef0eb 30%, #054392 70%);
  .internal_box {
    display: flex;
    height: 100%;
    width: 1190px;
    margin: 0 auto;
    .left_text,
    .right_img {
      height: 100%;
    }
    .left_text {
      flex: 1;
      background-color: #fef0eb;
      position: relative;
      .left_inner {
        position: absolute;
        left: 72px;
        top: 50%;
        transform: translateY(-60%);
      }
      .title {
        font-size: 32px;
        font-weight: 500;
        color: rgba(38, 38, 38, 1);
        position: relative;
        z-index: 1;
        margin-top: 40px;
        &::before {
          content: "";
          position: absolute;
          width: 310px;
          height: 36px;
          background: rgba(254, 155, 66, 1);
          left: 0;
          top: 28px;
          z-index: -1;
        }
      }
      .h1-title {
        font-size: 19px;
        font-weight: 400;
        color: rgba(227, 179, 162, 1);
        margin-top: 36px;
        width: 310px;
        display: inline-block;
      }
      .go_back_btn {
        width: 160px;
        height: 48px;
        border-radius: 4px;
        margin-top: 100px;
        background-color: rgba(254, 155, 66, 1);
        font-size: 16px;
        font-weight: 500;
        color: #fef0eb;
        outline: none;
        cursor: pointer;
        border: none;
      }
    }
    .right_img {
      width: 735px;
      background-color: #064392;
      position: relative;
      .not_found_img {
        @include vertical_center(50%, 50%);
      }
    }
  }
}
</style>