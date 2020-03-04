<template>
  <header>
    <div class="header_warp">
      <el-input placeholder="搜索" class="search-inp" v-model="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <div class="user_bar">
        <a href="javascript:void(0);">退出</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "headerbar",
  data() {
    return {
      search: ""
    };
  }
};
</script>

<style scoped lang="scss">
header {
  height: 60px;
  background-color: #fff;
  position: fixed;
  width: 100%;
  z-index: 1;
  .header_warp {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .search-inp {
    width: 154px;
    height: 28px;
    position: absolute;
    top: 50%;
    left: 36px;
    transform: translateY(-50%);

    /deep/ {
      .el-input__inner {
        height: 28px;
        background: rgba(245, 246, 249, 1);
        border-radius: 14px;
        border: none;
        text-align: right;
      }
      .el-input__icon {
        line-height: 28px;
      }
    }
  }
  .user_bar {
    position: absolute;
    top: 50%;
    right: 216px;
    transform: translateY(-50%);
    font-size: 19px;
  }
}
</style>