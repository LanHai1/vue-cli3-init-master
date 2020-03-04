<template>
  <div class="not_found_wrap">
    <div class="internal_box">
      <div class="left_text">
          <DynamicWord text="Oops!"></DynamicWord>
      </div>
      <div class="right_img">
        <img :src="img_src" class="not_found_img" alt width="556px" />
      </div>
    </div>
  </div>
</template>

<script>
import DynamicWord from "components/specialEffects/DynamicWord"
export default {
  name: "notFound",
  data() {
    return {
      img_src: require("@/assets/404.png")
    };
  },
  components:{
      DynamicWord
  }
};
</script>

<style scoped lang="scss">

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