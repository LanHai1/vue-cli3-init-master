<template>
  <section class="app-main">
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: "appMain"
};
</script>

<style scoped>
.app-main {
  flex: 1;
}
</style>