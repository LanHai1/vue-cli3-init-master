<template>
  <div class="app-wrapper">
    <main class="main">
      <sidebar class="sidebar-container"></sidebar>
      <div class="main-container">
        <div class="header">1</div>
        <app-main></app-main>
      </div>
    </main>
  </div>
</template>
<script>
import AppMain from "@/views/layout/appMain/appMain"; //页面布局的右侧区域
import sidebar from "@/views/layout/appMain/components/sidebar"; //页面布局的左侧菜单

export default {
  name: "layout",
  components: {
    sidebar,
    AppMain
  }
};
</script>

<style scoped lang="scss">
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    min-height: 100vh;
    /deep/ .header {
      height: 40px;
      background-color: red;
      display: grid;
    }
  }
}
</style>
