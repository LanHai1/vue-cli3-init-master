<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
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
  min-height: 100%;
}
</style>