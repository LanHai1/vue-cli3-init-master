<template>
  <div class="logo_topbar">
    <img :src="img_src" width="46px" alt />
    <p class="title">SFCP</p>
  </div>
</template>

<script>
export default {
  name: "logoTopBar",
  data() {
    return {
      img_src: require("assets/logo.png")
    };
  }
};
</script>

<style lang="scss" scoped>
.logo_topbar {
  width: 100%;
  box-sizing: border-box;
  padding: 21px 0 15px 48px;
  .title {
    font-size: 16px;
    font-weight: normal;
    color: rgba(255, 255, 255, 1);
    margin-top: 4px;
    width: 46px;
    text-align-last: justify;
  }
}
</style>