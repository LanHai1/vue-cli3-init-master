<template>
  <div class="qr_inner">
    <img :src="qrCode" alt="二维码" />
    <p>
      <span>请使用银狐客户端扫码</span>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class QrCode extends Vue {
  private qrCode = require("../../assets/img/login/qrCode.png");
}
</script>

<style scoped lang="scss">
.qr_inner {
  width: 220px;
  height: 220px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(231, 231, 231, 1);
  margin: 20px 0 82px;
  box-sizing: border-box;
  padding: 12px 22px 30px 21px;
  img {
    width: 177px;
    height: 178px;
  }
  p {
    text-align: center;
    line-height: 16px;
    span {
      font-size: 14px;
      font-weight: normal;
      color: rgba(3, 9, 22, 1);
    }
  }
}
</style>