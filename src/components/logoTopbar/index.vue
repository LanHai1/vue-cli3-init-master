<template>
  <div class="logo_topbar">
    <img :src="imgSrc" width="46px" alt />
    <p class="title">SFCP</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LogoTopBar extends Vue {
    private imgSrc = require("assets/logo.png")
}
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