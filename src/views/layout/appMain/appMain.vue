<template>
  <el-scrollbar class="app-main" :native="false">
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </el-scrollbar>
</template>

<script>
export default {
  name: "appMain"
};
</script>

<style scoped>
.app-main {
  flex: 1;
  background: rgba(245, 246, 249, 1);
  padding: 32px 36px 0 36px;
  box-sizing: border-box;
  margin-top: 60px;
}
</style>